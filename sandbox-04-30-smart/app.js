let DATA = {
  processes: [],
  tasks: [],
  cases: [],
  audit: []
};

let STATES = [];
let TRANSITIONS = [];

let currentView = "exec";

const content = document.getElementById("content");
const panelTitle = document.getElementById("panel-title");
const panelContent = document.getElementById("panel-content");

async function init() {
  await loadStateMachine();

  const [processes, tasks, cases, audit] = await Promise.all([
    fetch("data/processes.json").then(r => r.json()),
    fetch("data/tasks.json").then(r => r.json()),
    fetch("data/cases.json").then(r => r.json()),
    fetch("data/audit.json").then(r => r.json())
  ]);

  DATA = { processes, tasks, cases, audit };

  document.querySelectorAll(".nav-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentView = btn.dataset.view;
      render();
    });
  });

  document.getElementById("close-panel").addEventListener("click", resetPanel);

  render();
}

function render() {
  if (currentView === "exec") renderExec();
  if (currentView === "area") renderArea();
  if (currentView === "mine") renderMine();
  if (currentView === "flow") renderFlow();
}

function setHeader(title, subtitle) {
  document.getElementById("view-title").textContent = title;
  document.getElementById("view-subtitle").textContent = subtitle;
}

function badge(status) {
  return `<span class="badge ${status}">● ${status}</span>`;
}


function renderSmartIntake() {
  return `
    <div class="smart-intake">
      <div class="smart-title">⬡ Smart Process Intake</div>
      <div class="smart-box">
        <input id="smart-input" placeholder="What needs to happen? Example: offboard Sergio Vega, laptop expense LATAM, client unpaid invoice..." />
        <button onclick="runSmartMatch()">Analyze</button>
      </div>
      <div class="smart-examples">
        <span class="example-chip" onclick="fillSmart('Offboard Sergio Vega from IT')">Offboard employee</span>
        <span class="example-chip" onclick="fillSmart('We bought a 4k laptop for LATAM')">$4k laptop LATAM</span>
        <span class="example-chip" onclick="fillSmart('Client has not paid an invoice')">Unpaid invoice</span>
      </div>
      <div id="smart-result"></div>
    </div>
  `;
}

function fillSmart(text) {
  const input = document.getElementById("smart-input");
  input.value = text;
  runSmartMatch();
}

function classifyIntent(text) {
  const t = text.toLowerCase();

  if (t.includes("offboard") || t.includes("terminate") || t.includes("departure") || t.includes("remove access")) {
    return {
      trigger_domain: "hr",
      outcome_type: "access_change",
      object: "employee",
      spine_connection: "people_operations"
    };
  }

  if (t.includes("laptop") || t.includes("mac") || t.includes("computer") || t.includes("expense") || t.includes("purchase")) {
    return {
      trigger_domain: "procurement",
      outcome_type: "asset_change",
      object: "hardware",
      spine_connection: "cost_management"
    };
  }

  if (t.includes("invoice") || t.includes("paid") || t.includes("payment") || t.includes("client")) {
    return {
      trigger_domain: "finance",
      outcome_type: "payment",
      object: "invoice",
      spine_connection: "revenue_protection"
    };
  }

  return {
    trigger_domain: "unknown",
    outcome_type: "unknown",
    object: "unknown",
    spine_connection: "unknown"
  };
}

function scoreProcess(intent, process) {
  let score = 0;

  if (intent.trigger_domain === process.trigger_domain) score += 35;
  if (intent.outcome_type === process.outcome_type) score += 35;
  if (intent.spine_connection === process.spine_connection) score += 20;

  const name = process.name.toLowerCase();
  if (intent.object !== "unknown" && name.includes(intent.object)) score += 10;

  return score;
}

function runSmartMatch() {
  const input = document.getElementById("smart-input");
  const result = document.getElementById("smart-result");
  const text = input.value.trim();

  if (!text) {
    result.innerHTML = "";
    return;
  }

  const intent = classifyIntent(text);
  const ranked = DATA.processes
    .map(p => ({ process: p, score: scoreProcess(intent, p) }))
    .sort((a,b) => b.score - a.score);

  const best = ranked[0];

  if (best && best.score >= 85) {
    result.innerHTML = `
      <div class="match-card">
        <div class="match-head">✓ Found: ${best.process.name}</div>
        <div class="match-sub">
          ${best.score}% match · ${best.process.domain} · ${best.process.stages.length} stages · SLA ${best.process.sla}<br>
          Based on: ${intent.trigger_domain}, ${intent.outcome_type}, ${intent.spine_connection}
        </div>
        <div class="match-actions">
          <button class="mini-btn primary" onclick="startCaseFromMatch('${best.process.id}', '${safe(text)}')">Start Case</button>
          <button class="mini-btn" onclick="showProcess('${best.process.id}')">See Process</button>
        </div>
      </div>
    `;
    return;
  }

  if (best && best.score >= 60) {
    result.innerHTML = `
      <div class="match-card partial">
        <div class="match-head">≈ Similar process found: ${best.process.name}</div>
        <div class="match-sub">
          ${best.score}% match · This may fit, but might need a subprocess or variation.<br>
          Based on: ${intent.trigger_domain}, ${intent.outcome_type}, ${intent.spine_connection}
        </div>
        <div class="match-actions">
          <button class="mini-btn primary" onclick="startCaseFromMatch('${best.process.id}', '${safe(text)}')">Use Existing</button>
          <button class="mini-btn" onclick="createDraftProcess('${safe(text)}')">Create Draft Process</button>
          <button class="mini-btn" onclick="showProcess('${best.process.id}')">Inspect Match</button>
        </div>
      </div>
    `;
    return;
  }

  result.innerHTML = `
    <div class="match-card new">
      <div class="match-head">+ New process candidate detected</div>
      <div class="match-sub">
        No strong match found. The system can create a T3 draft process for architect review.<br>
        Detected: ${intent.trigger_domain}, ${intent.outcome_type}, ${intent.spine_connection}
      </div>
      <div class="match-actions">
        <button class="mini-btn primary" onclick="createDraftProcess('${safe(text)}')">Generate Draft Process</button>
      </div>
    </div>
  `;
}

function startCaseFromMatch(processId, text) {
  const process = DATA.processes.find(p => p.id === processId);

  const newCase = {
    id: "case-smart-" + Date.now(),
    processId,
    title: text,
    person: text,
    owner: process.owner,
    status: "active",
    priority: "normal",
    system: (process.systems_touched || []).join(" + "),
    source: "Smart Process Intake",
    sourceUrl: "#",
    integrations: process.systems_touched || [],
    blocker: "No blocker yet.",
    nextAction: "Review the matched process and complete the first required task.",
    suggestedMessage: "New case started from Smart Process Intake. Please review ownership and next action.",
    slaDays: 5,
    daysInStage: 0
  };

  DATA.cases.unshift(newCase);
  addAuditEvent(newCase.id, "Case created from Smart Process Intake.", "User", "human");
  renderExec();
  showCase(newCase.id);
}

function createDraftProcess(text) {
  const draftId = "draft-process-" + Date.now();

  const draft = {
    id: draftId,
    domain: "draft",
    name: "Draft Process — " + text,
    owner: "Process Architect Review",
    status: "active",
    sla: "To be defined",
    description: "T3 draft generated from Smart Process Intake. Requires architect review before promotion.",
    stages: ["intake", "review", "approval", "execution", "closure"],
    trigger_type: "event",
    trigger_domain: "unknown",
    outcome_type: "unknown",
    spine_connection: "unknown",
    systems_touched: ["Manual Review"]
  };

  DATA.processes.unshift(draft);
  renderFlow();
  showProcess(draftId);
}

function renderExec() {
  setHeader("Executive View", "Company-wide live operating system: risks, owners, SLAs and active process cases.");

  const blocked = DATA.cases.filter(c => ["blocked", "overdue"].includes(c.status)).length;
  const active = DATA.tasks.filter(t => t.status === "active").length;
  const processes = DATA.processes.length;
  const cases = DATA.cases.length;

  content.innerHTML = `
    ${renderSmartIntake()}
    <div class="grid kpi-grid">
      ${kpi("Processes", processes, "Core operating flows")}
      ${kpi("Live Cases", cases, "Running work in motion")}
      ${kpi("Active Tasks", active, "Currently being executed")}
      ${kpi("Risks", blocked, "Blocked or overdue")}
    </div>

    <button class="action-btn" onclick="createNewCase()">+ Create New Live Case</button>

    <div class="section-title">Critical live cases</div>
    ${DATA.cases.map(renderCaseRow).join("")}

    <div class="section-title">Core process library</div>
    ${DATA.processes.map(renderProcessRow).join("")}
  `;

  bindRows();
}

function renderArea() {
  setHeader("Area View", "Grouped by operating domain: HR, Operations, Finance and ownership.");

  const domains = [...new Set(DATA.processes.map(p => p.domain))];

  content.innerHTML = domains.map(domain => {
    const processes = DATA.processes.filter(p => p.domain === domain);
    return `
      <div class="section-title">${domain}</div>
      ${processes.map(renderProcessRow).join("")}
    `;
  }).join("");

  bindRows();
}

function renderMine() {
  setHeader("My Work", "Tasks assigned to this user or team, with system, SLA, evidence and next action.");

  content.innerHTML = `
    <div class="section-title">My active tasks</div>
    ${DATA.tasks.map(renderTaskRow).join("")}
  `;

  bindRows();
}

function renderFlow() {
  setHeader("Flow — Process Navigator", "End-to-end taxonomy: Domain → Process → Stage → Task → Case → Owner → System.");

  content.innerHTML = DATA.processes.map(process => `
    <div class="card clickable" data-type="process" data-id="${process.id}">
      <div class="row-title">${process.name}</div>
      <div class="row-sub">${process.description}</div>
      <div class="flow-line">
        ${process.stages.map((stage, i) => `
          <div class="stage">${stage}</div>
          ${i < process.stages.length - 1 ? `<div class="arrow">→</div>` : ""}
        `).join("")}
      </div>
    </div>
  `).join("");

  bindRows();
}

function kpi(label, value, note) {
  return `
    <div class="card">
      <div class="kpi-label">${label}</div>
      <div class="kpi-value">${value}</div>
      <div class="kpi-note">${note}</div>
    </div>
  `;
}

function renderProcessRow(process) {
  return `
    <div class="row" data-type="process" data-id="${process.id}">
      <div>
        <div class="row-title">${process.name}</div>
        <div class="row-sub">${process.domain} · Owner: ${process.owner} · SLA: ${process.sla}</div>
      </div>
      ${badge(process.status)}
    </div>
  `;
}

function renderTaskRow(task) {
  return `
    <div class="row" data-type="task" data-id="${task.id}">
      <div>
        <div class="row-title">${task.name}</div>
        <div class="row-sub">${task.owner} · ${task.system} · SLA: ${task.sla}</div>
      </div>
      ${badge(task.status)}
    </div>
  `;
}

function renderCaseRow(item) {
  return `
    <div class="row" data-type="case" data-id="${item.id}">
      <div>
        <div class="row-title">${item.title}</div>
        <div class="row-sub">${item.owner} · ${item.system} · ${item.daysInStage} days in stage</div>
        <div class="live-source">Source: ${item.source || "Manual Case"}</div>
      </div>
      ${badge(item.status)}
    </div>
  `;
}

function bindRows() {
  document.querySelectorAll("[data-type]").forEach(el => {
    el.addEventListener("click", () => {
      const type = el.dataset.type;
      const id = el.dataset.id;

      if (type === "process") showProcess(id);
      if (type === "task") showTask(id);
      if (type === "case") showCase(id);
    });
  });
}

function showProcess(id) {
  const p = DATA.processes.find(x => x.id === id);
  const tasks = DATA.tasks.filter(t => t.processId === id);
  const cases = DATA.cases.filter(c => c.processId === id);

  panelTitle.textContent = p.name;
  panelContent.innerHTML = `
    ${detail("Domain", p.domain)}
    ${detail("Owner", p.owner)}
    ${detail("Status", badge(p.status))}
    ${detail("SLA", p.sla)}
    ${detail("Description", p.description)}
    ${detail("Stages", p.stages.join(" → "))}
    ${detail("Connected Tasks", tasks.length)}
    ${detail("Live Cases", cases.length)}
  `;
}

function showTask(id) {
  const t = DATA.tasks.find(x => x.id === id);

  panelTitle.textContent = t.name;
  panelContent.innerHTML = `
    ${detail("Owner", t.owner)}
    ${detail("Process", t.processId)}
    ${detail("Stage", t.stage)}
    ${detail("System", t.system)}
    ${detail("Status", badge(t.status))}
    ${detail("Priority", t.priority)}
    ${detail("SLA", t.sla)}
    ${detail("Evidence Required", t.evidence)}
    ${detail("Next Action", t.nextAction)}
    <button class="action-btn" onclick="copyText('${safe(t.nextAction)}')">Copy Next Action</button>
  `;
}

function showCase(id) {
  const c = DATA.cases.find(x => x.id === id);

  panelTitle.textContent = c.title;
  panelContent.innerHTML = `
    ${detail("Owner", c.owner)}
    ${detail("Process", c.processId)}
    ${detail("System", c.system)}
    ${detail("Status", badge(c.status))}
    ${detail("Priority", c.priority)}
    ${detail("Days in Stage", c.daysInStage)}
    ${detail("Source System", c.source || "Manual Case")}
    ${renderIntegrations(c)}
    <div class="detail-block">
      <div class="detail-label">Blocker</div>
      <div class="blocker-box">${c.blocker}</div>
    </div>
    ${detail("Next Action", c.nextAction)}
    <div class="detail-block">
      <div class="detail-label">Suggested Message</div>
      <div class="message-box">${c.suggestedMessage}</div>
    </div>
    <button class="action-btn" onclick="copyText('${safe(c.suggestedMessage)}')">Copy Escalation Message</button>
    <button class="action-btn" onclick="openSourceSystem('${safe(c.sourceUrl || "#")}')">Open Source System</button>
    ${renderAudit(c.id)}
  `;
}

function detail(label, value) {
  return `
    <div class="detail-block">
      <div class="detail-label">${label}</div>
      <div class="detail-value">${value}</div>
    </div>
  `;
}

function resetPanel() {
  panelTitle.textContent = "Detail";
  panelContent.innerHTML = `
    <div class="empty-state">
      Select a process, task or live case to inspect owner, system, status, blocker and next action.
    </div>
  `;
}

function safe(text) {
  return String(text || "").replace(/'/g, "\\'").replace(/\n/g, " ");
}

function copyText(text) {
  navigator.clipboard.writeText(text);
  alert("Copied to clipboard");
}


async function loadStateMachine() {
  STATES = await fetch("data/states.json").then(r => r.json());
  TRANSITIONS = await fetch("data/transitions.json").then(r => r.json());
}

function getAllowedTransitions(current) {
  const rule = TRANSITIONS.find(t => t.from === current);
  return rule ? rule.to : [];
}

function changeStatus(type, id, newStatus) {
  let item;

  if (type === "task") item = DATA.tasks.find(x => x.id === id);
  if (type === "case") item = DATA.cases.find(x => x.id === id);

  if (!item) return;

  const allowed = getAllowedTransitions(item.status);

  if (!allowed.includes(newStatus)) {
    alert("Invalid transition");
    return;
  }

  item.status = newStatus;
  render();
}




function renderIntegrations(c) {
  const integrations = c.integrations || [];
  if (!integrations.length) return "";

  return `
    <div class="detail-block">
      <div class="detail-label">Connected Integrations</div>
      <div class="integration-row">
        ${integrations.map(i => `<span class="integration-chip">${i}</span>`).join("")}
      </div>
    </div>
  `;
}

function openSourceSystem(url) {
  if (!url || url === "#") {
    alert("No source system URL configured yet.");
    return;
  }
  window.open(url, "_blank");
}

function renderAudit(caseId) {
  const record = DATA.audit.find(a => a.caseId === caseId);
  const events = record ? record.events : [];

  if (!events.length) {
    return `
      <div class="detail-block" style="margin-top:18px;">
        <div class="detail-label">Timeline</div>
        <div class="detail-value">No timeline events yet.</div>
      </div>
    `;
  }

  return `
    <div class="detail-block" style="margin-top:18px;">
      <div class="detail-label">Timeline / Audit Trail</div>
      ${events.map(e => `
        <div style="border-left:2px solid var(--border); padding:0 0 12px 10px; margin-left:4px;">
          <div style="font-size:10px; color:var(--dim);">${e.time} · ${e.actor}</div>
          <div style="font-size:12px; color:var(--text); line-height:1.45;">${e.action}</div>
          <div style="font-size:10px; color:var(--muted); text-transform:uppercase; margin-top:2px;">${e.type}</div>
        </div>
      `).join("")}
    </div>
  `;
}

function addAuditEvent(caseId, action, actor = "Enterprise OS", type = "system") {
  let record = DATA.audit.find(a => a.caseId === caseId);

  if (!record) {
    record = { caseId, events: [] };
    DATA.audit.push(record);
  }

  record.events.unshift({
    time: "Now",
    actor,
    action,
    type
  });
}

function createNewCase() {
  const newCase = {
    id: "case-auto-" + Date.now(),
    processId: "employee-offboarding",
    title: "New Employee Offboarding — IT Access Review",
    person: "New Employee",
    owner: "IT Operations",
    status: "active",
    priority: "normal",
    system: "AD + MDM + SaaS Apps",
    blocker: "No blocker yet.",
    nextAction: "Review account access and confirm revocation checklist.",
    suggestedMessage: "Hi IT team, please review this offboarding access checklist and confirm completion.",
    slaDays: 5,
    daysInStage: 0
  };

  DATA.cases.unshift(newCase);
  addAuditEvent(newCase.id, "New live case created from Executive View.", "User", "human");
  renderExec();
  showCase(newCase.id);
}

init();
