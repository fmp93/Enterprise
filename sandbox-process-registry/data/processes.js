/**
 * DFX5 Enterprise OS — Process Registry
 * Version: 1.0 · May 2026
 * 26 mapped processes · Full metadata layer
 * ─────────────────────────────────────────
 * This file is the single source of truth for all process intelligence.
 * Every view, filter, and dashboard queries this registry.
 */

const DOMAIN_CONFIG = {
  "Revenue Value Chain":   { color: "#6366F1", light: "#EEF2FF", badge: "RVC", booklet: "Booklet 1" },
  "Mobilize to Complete":  { color: "#0EA5E9", light: "#E0F2FE", badge: "M2C", booklet: "Booklet 2" },
  "Delivery Execution":    { color: "#10B981", light: "#ECFDF5", badge: "DEX", booklet: "Booklet 3" },
  "Data to Decision":      { color: "#F59E0B", light: "#FFFBEB", badge: "D2D", booklet: "Booklet 3" },
  "People Operations":     { color: "#EC4899", light: "#FDF2F8", badge: "POP", booklet: "Booklet 5" },
  "Workplace Enablement":  { color: "#8B5CF6", light: "#F5F3FF", badge: "WEN", booklet: "Booklet 3" },
  "Access Governance":     { color: "#EF4444", light: "#FEF2F2", badge: "ACG", booklet: "Booklet 7" },
  "Record to Report":      { color: "#14B8A6", light: "#F0FDFA", badge: "R2R", booklet: "Booklet 6" }
};

const STAGE_COLORS = [
  "#7C3AED", // Stage 1 — Purple
  "#6D28D9", // Stage 2 — Purple deep
  "#0D9488", // Stage 3 — Teal
  "#DB2777", // Stage 4 — Pink
  "#BE185D", // Stage 5 — Deep Pink
  "#9D174D", // Stage 6 — Magenta
  "#059669", // Stage 7 — Green
  "#065F46"  // Stage 8 — Dark Green
];

const DFX5_PROCESSES = [

  // ─── BOOKLET 1 · REVENUE VALUE CHAIN ───────────────────────────────────

  {
    id: "P001",
    name: "Lead Intake & Qualification",
    booklet: "Booklet 1",
    domain: "Revenue Value Chain",
    version: "v1.0",
    date: "May 2026",
    image: "assets/processes/P001.png",
    primaryOwners: ["Pre-Sales", "Sales", "Delivery"],
    tools: ["Salesforce", "LinkedIn", "Slack", "Email", "Microsoft 365", "Jira"],
    triggerEvent: "Inbound or referred lead received",
    outputGate: "Opportunity-ready lead",
    feedsFrom: ["Marketing", "Referrals", "Partnerships", "Outbound Prospecting"],
    feedsInto: ["P002 · Opportunity Management", "Proposal / Scope Preparation", "Tech Validation"],
    stages: [
      { num: 1, name: "Lead Received",        owner: "Pre-Sales",           output: "Lead captured" },
      { num: 2, name: "Lead Logged",           owner: "Pre-Sales",           output: "Clean lead record" },
      { num: 3, name: "Lead Routed",           owner: "Pre-Sales / Sales",   output: "Owner assigned" },
      { num: 4, name: "Initial Review",        owner: "Pre-Sales",           output: "Fit assessed" },
      { num: 5, name: "Qualification",         owner: "Pre-Sales / Delivery",output: "Qualification basis approved" },
      { num: 6, name: "Discovery Set",         owner: "Pre-Sales",           output: "Discovery meeting scheduled" },
      { num: 7, name: "Qualified",             owner: "Sales / Delivery",    output: "Qualified lead" },
      { num: 8, name: "Ready for Opportunity", owner: "Sales",               output: "Opportunity-ready lead ✓" }
    ],
    rules: {
      stageGate:  "A lead cannot advance until required intake fields, owner assignment, and minimum qualification data are complete in Salesforce.",
      secondary:  "Missing Data Rule — If source, company, contact, or qualification details are missing, the lead is returned to the intake owner within 1 business day for correction.",
      escalation: "Routing Rule — Every lead must have one clear owner. Strategic or unclear leads are escalated for routing review before moving into opportunity management."
    },
    automationReadiness: "High",
    agentOpportunities: ["Lead de-duplication & logging", "Initial qualification scoring", "Owner routing by territory"],
    slaExpectations: "Lead logged same day. Owner assigned within 1 business day. Discovery meeting set within 3 business days.",
    status: "Active"
  },

  {
    id: "P002",
    name: "Opportunity Management",
    booklet: "Booklet 1",
    domain: "Revenue Value Chain",
    version: "v1.0",
    date: "May 2026",
    image: "assets/processes/P002.png",
    primaryOwners: ["Pre-Sales", "Sales", "Delivery"],
    tools: ["Salesforce", "Slack", "Microsoft 365", "Jira", "Email"],
    triggerEvent: "Qualified lead converted to opportunity in Salesforce",
    outputGate: "Proposal-ready opportunity",
    feedsFrom: ["P001 · Lead Intake & Qualification"],
    feedsInto: ["P003 · Proposal / Scope Preparation", "Tech Validation", "P004 · Contract / SOW Validation"],
    stages: [
      { num: 1, name: "Opportunity Created",   owner: "Pre-Sales / Sales", output: "Opportunity created" },
      { num: 2, name: "Opportunity Logged",    owner: "Sales",             output: "Clean opportunity record" },
      { num: 3, name: "Opportunity Assigned",  owner: "Sales",             output: "Owner assigned" },
      { num: 4, name: "Discovery Reviewed",    owner: "Sales",             output: "Need and timing validated" },
      { num: 5, name: "Internal Alignment",    owner: "Sales / Delivery",  output: "Internal alignment achieved" },
      { num: 6, name: "Opportunity Strategy",  owner: "Sales",             output: "Strategy defined" },
      { num: 7, name: "Opportunity Confirmed", owner: "Sales / Delivery",  output: "Qualified active opportunity" },
      { num: 8, name: "Ready for Proposal",    owner: "Sales",             output: "Proposal-ready opportunity ✓" }
    ],
    rules: {
      stageGate:  "An opportunity cannot move to proposal until core fields, owner assignment, discovery context, and internal alignment are complete in Salesforce.",
      secondary:  "Missing Data Rule — If expected value, client need, owner, timeline, or basic scope context is missing, the opportunity returns to the owner within 1 business day for correction.",
      escalation: "Opportunity Rule — Every opportunity must have one clear commercial owner and an explicit next step. Strategic or unclear opportunities are escalated before proposal work starts."
    },
    automationReadiness: "Medium",
    agentOpportunities: ["CRM field validation", "Next-step reminders", "Opportunity scoring"],
    slaExpectations: "Opportunity logged within 1 business day. Owner confirmed within 2 business days. Strategy defined before proposal.",
    status: "Active"
  },

  {
    id: "P003",
    name: "Proposal / Scope Preparation",
    booklet: "Booklet 1",
    domain: "Revenue Value Chain",
    version: "v1.0",
    date: "May 2026",
    image: "assets/processes/P003.png",
    primaryOwners: ["Sales", "Delivery", "Finance", "Legal"],
    tools: ["Salesforce", "Microsoft 365", "Jira", "Kantata", "DocuSign", "Email", "Slack"],
    triggerEvent: "Opportunity accepted and approved to enter proposal preparation",
    outputGate: "Proposal sent to client",
    feedsFrom: ["P002 · Opportunity Management", "Tech Validation"],
    feedsInto: ["P004 · Contract / SOW Validation", "P005 · Sales to Delivery Handoff", "P006 · Client / Project Onboarding"],
    stages: [
      { num: 1, name: "Opportunity Accepted", owner: "Sales",             output: "Proposal request opened" },
      { num: 2, name: "Proposal Intake",      owner: "Sales",             output: "Complete proposal brief" },
      { num: 3, name: "Scope Framing",        owner: "Sales / Delivery",  output: "Scope baseline defined" },
      { num: 4, name: "Delivery Sizing",      owner: "Delivery",          output: "Sizing input approved" },
      { num: 5, name: "Commercial Build",     owner: "Sales / Finance",   output: "Commercial basis ready" },
      { num: 6, name: "Proposal Draft",       owner: "Sales",             output: "Draft proposal ready" },
      { num: 7, name: "Internal Review",      owner: "Sales / Delivery / Legal", output: "Approved proposal package" },
      { num: 8, name: "Proposal Sent",        owner: "Sales",             output: "Proposal sent to client ✓" }
    ],
    rules: {
      stageGate:  "A proposal cannot be sent until the scope baseline, delivery sizing, commercial basis, and internal review are complete.",
      secondary:  "Missing Data Rule — If scope assumptions, effort inputs, pricing logic, or client requirements are missing, the proposal returns to the owner within 1 business day for correction.",
      escalation: "Proposal Rule — Non-standard pricing, legal terms, or delivery models require explicit internal review before the proposal is sent to the client."
    },
    automationReadiness: "Medium",
    agentOpportunities: ["Scope template generation", "Rate card application", "Proposal document assembly"],
    slaExpectations: "Scope framed within 3 business days of intake. Proposal sent within agreed response window.",
    status: "Active"
  },

  {
    id: "P004",
    name: "Contract / SOW Validation Before Delivery Start",
    booklet: "Booklet 1",
    domain: "Revenue Value Chain",
    version: "v1.0",
    date: "May 2026",
    image: "assets/processes/P004.png",
    primaryOwners: ["Sales", "Legal", "Ops", "Delivery"],
    tools: ["Salesforce", "DocuSign", "Microsoft 365", "Slack", "Email", "Legal Docs"],
    triggerEvent: "Proposal approved and client has accepted commercial basis",
    outputGate: "Delivery start authorized",
    feedsFrom: ["P003 · Proposal / Scope Preparation", "P002 · Opportunity Management"],
    feedsInto: ["P005 · Sales to Delivery Handoff", "P006 · Client / Project Onboarding", "P007 · Project Creation in Kantata"],
    stages: [
      { num: 1, name: "Proposal Approved",    owner: "Sales",          output: "Contract request opened" },
      { num: 2, name: "Contract Request",     owner: "Sales / Ops",    output: "Complete contract request" },
      { num: 3, name: "Draft Prepared",       owner: "Legal",          output: "Draft agreement ready" },
      { num: 4, name: "Commercial Review",    owner: "Sales / Delivery",output: "Commercial draft approved" },
      { num: 5, name: "Legal Review",         owner: "Legal",          output: "Signature-ready agreement" },
      { num: 6, name: "Client Signature",     owner: "Sales / Legal",  output: "Signed by client" },
      { num: 7, name: "Execution Confirmed",  owner: "Legal / Ops",    output: "Executed agreement logged" },
      { num: 8, name: "Start Gate Cleared",   owner: "Ops / Delivery", output: "Delivery start authorized ✓" }
    ],
    rules: {
      stageGate:  "No delivery work may start until a signed agreement or approved exception is recorded in the system of record.",
      secondary:  "Missing Data Rule — If scope terms, pricing, legal clauses, or signature details are missing, the agreement returns to the owner within 1 business day for correction.",
      escalation: "Contract Rule — Non-standard clauses, redlines, or unsigned agreements require explicit Legal review before the project can move into delivery."
    },
    automationReadiness: "Low",
    agentOpportunities: ["Contract status tracking", "Signature chase reminders", "Clause flagging"],
    slaExpectations: "Draft prepared within 3 business days. Legal review within 2 business days. Escalate if unsigned after agreed deadline.",
    status: "Active"
  },

  {
    id: "P005",
    name: "Sales to Delivery Handoff",
    booklet: "Booklet 1",
    domain: "Revenue Value Chain",
    version: "v1.0",
    date: "May 2026",
    image: "assets/processes/P005.png",
    primaryOwners: ["Sales", "Delivery", "Finance", "Ops"],
    tools: ["Salesforce", "Kantata", "Jira", "Microsoft 365", "DocuSign", "Slack", "Zoho", "Email"],
    triggerEvent: "Deal marked Closed Won in Salesforce",
    outputGate: "Kickoff ready, forecast visible",
    feedsFrom: ["P002 · Opportunity Management", "P003 · Proposal / Scope Preparation", "P004 · Contract / SOW Validation"],
    feedsInto: ["P006 · Client / Project Onboarding", "P007 · Project Creation in Kantata", "P015 · Revenue Forecast Update", "P012 · Invoice Creation & Sending"],
    stages: [
      { num: 1, name: "Closed Won",         owner: "Sales",                        output: "Signed deal, handoff required" },
      { num: 2, name: "Handoff Package",    owner: "Sales",                        output: "Complete commercial handoff package" },
      { num: 3, name: "Handoff Submitted",  owner: "Sales / Ops",                  output: "Handoff logged, owners assigned" },
      { num: 4, name: "Delivery Review",    owner: "Delivery",                     output: "Delivery accepted or issues list" },
      { num: 5, name: "Financial Review",   owner: "Finance",                      output: "Billing / forecast basis approved" },
      { num: 6, name: "Project Setup",      owner: "Ops",                          output: "Project created, systems aligned" },
      { num: 7, name: "Live Handoff",       owner: "Ops / Sales / Delivery / Finance", output: "Shared alignment, no critical blockers" },
      { num: 8, name: "Ready for Kickoff",  owner: "Delivery / Finance",           output: "Kickoff ready, forecast visible ✓" }
    ],
    rules: {
      stageGate:  "A project cannot move to kickoff until the signed agreement, handoff package, delivery review, and mandatory financial fields are complete in the system of record.",
      secondary:  "Missing Data Rule — Missing commercial terms, payment milestones, rate cards, or scope assumptions send the handoff back to Sales within 24 hours for correction.",
      escalation: "Handoff Rule — Sales, Delivery, Finance, and Ops must confirm receipt and readiness. Non-standard deals require a live handoff review before kickoff."
    },
    automationReadiness: "Medium",
    agentOpportunities: ["Handoff package completeness check", "Owner notification", "Financial fields validation"],
    slaExpectations: "Handoff package submitted within 1 business day of close. Delivery review within 2 business days. Kickoff cleared same week.",
    status: "Active"
  },

  {
    id: "P006",
    name: "Client / Project Onboarding",
    booklet: "Booklet 1",
    domain: "Revenue Value Chain",
    version: "v1.0",
    date: "May 2026",
    image: "assets/processes/P006.png",
    primaryOwners: ["Ops", "Sales", "Delivery", "Finance"],
    tools: ["Salesforce", "Kantata", "Microsoft 365", "Slack", "SharePoint", "Jira", "Email"],
    triggerEvent: "Sales-to-Delivery handoff package accepted and contract gate cleared",
    outputGate: "Kickoff-ready project",
    feedsFrom: ["P005 · Sales to Delivery Handoff", "P004 · Contract / SOW Validation"],
    feedsInto: ["P007 · Project Creation in Kantata", "P009 · Delivery Kickoff", "P012 · Invoice Creation & Sending"],
    stages: [
      { num: 1, name: "Handoff Accepted",     owner: "Ops",              output: "Onboarding request opened" },
      { num: 2, name: "Onboarding Intake",    owner: "Ops",              output: "Complete onboarding record" },
      { num: 3, name: "Client Setup Review",  owner: "Ops / Sales",      output: "Client data approved" },
      { num: 4, name: "Delivery Setup",       owner: "Delivery",         output: "Delivery setup aligned" },
      { num: 5, name: "Financial Setup",      owner: "Finance / Ops",    output: "Financial basis confirmed" },
      { num: 6, name: "Systems Ready",        owner: "Ops",              output: "Project workspace ready" },
      { num: 7, name: "Kickoff Prepared",     owner: "Delivery / Finance",output: "Kickoff plan approved" },
      { num: 8, name: "Onboarding Complete",  owner: "Delivery / Ops",   output: "Kickoff-ready project ✓" }
    ],
    rules: {
      stageGate:  "A project cannot move to kickoff until the handoff package, client data, delivery setup, and financial setup are complete in the system of record.",
      secondary:  "Missing Data Rule — If client contacts, billing details, scope assumptions, or ownership data are missing, onboarding returns to the owner within 1 business day for correction.",
      escalation: "Onboarding Rule — Delivery, Finance, and Ops must confirm readiness before kickoff. Any non-standard dependency or blocker must be logged and assigned."
    },
    automationReadiness: "Medium",
    agentOpportunities: ["Onboarding record creation", "Missing data alerts", "System workspace provisioning"],
    slaExpectations: "Onboarding opened within 1 business day. All setup complete before kickoff date.",
    status: "Active"
  },

  {
    id: "P007",
    name: "Project Creation in Kantata",
    booklet: "Booklet 1",
    domain: "Revenue Value Chain",
    version: "v1.0",
    date: "May 2026",
    image: "assets/processes/P007.png",
    primaryOwners: ["Ops", "Delivery", "Finance"],
    tools: ["Kantata", "Salesforce", "Microsoft 365", "Slack", "Jira", "SharePoint"],
    triggerEvent: "Client / project onboarding complete and kickoff readiness approved",
    outputGate: "Control-ready project",
    feedsFrom: ["P006 · Client / Project Onboarding", "P005 · Sales to Delivery Handoff"],
    feedsInto: ["Resource Allocation", "P015 · Revenue Forecast Update", "P016 · Project Margin / Profitability Review"],
    stages: [
      { num: 1, name: "Onboarding Complete",  owner: "Ops",              output: "Project setup request opened" },
      { num: 2, name: "Creation Request",     owner: "Ops",              output: "Complete creation request" },
      { num: 3, name: "Core Project Setup",   owner: "Ops / Delivery",   output: "Core project record created" },
      { num: 4, name: "Financial Fields",     owner: "Finance / Ops",    output: "Financial setup completed" },
      { num: 5, name: "Delivery Structure",   owner: "Delivery",         output: "Delivery structure aligned" },
      { num: 6, name: "Validation Review",    owner: "Delivery / Finance / Ops", output: "Validated project setup" },
      { num: 7, name: "Project Activated",    owner: "Ops",              output: "Active project published" },
      { num: 8, name: "Ready for Control",    owner: "Finance / Delivery",output: "Control-ready project ✓" }
    ],
    rules: {
      stageGate:  "A project cannot go active in Kantata until core metadata, financial fields, and delivery structure are complete in the system of record.",
      secondary:  "Missing Data Rule — If mandatory project, financial, or staffing fields are missing, the setup returns to the owner within 1 business day for correction.",
      escalation: "Kantata Rule — Kantata must contain the required fields for forecast, revenue, and margin visibility before the project is used for operational or financial reporting."
    },
    automationReadiness: "High",
    agentOpportunities: ["Project record creation", "Field validation", "Financial field population from handoff data"],
    slaExpectations: "Project created same week as onboarding. Active and ready for control before first delivery milestone.",
    status: "Active"
  },

  // ─── BOOKLET 2 · MOBILIZE TO COMPLETE ──────────────────────────────────

  {
    id: "P008",
    name: "Sales to Delivery Handoff",
    booklet: "Booklet 2",
    domain: "Mobilize to Complete",
    version: "v1.0",
    date: "May 2026",
    image: "assets/processes/P008.png",
    primaryOwners: ["Sales", "Ops", "Delivery", "HR", "Finance"],
    tools: ["Salesforce", "Kantata", "Jira", "Microsoft 365", "Slack", "SharePoint", "DocuSign"],
    triggerEvent: "Deal received — Closed Won package ready from Sales",
    outputGate: "Live project, tracking started",
    feedsFrom: ["Booklet 1 — Lead to Cash"],
    feedsInto: ["Booklet 3 — Delivery Execution", "Booklet 6 — Record to Report"],
    stages: [
      { num: 1, name: "Deal Received",       owner: "Sales / Ops",       output: "Closed Won package received" },
      { num: 2, name: "Handoff Review",      owner: "Ops / Delivery",    output: "Accepted handoff / gap list" },
      { num: 3, name: "Project Setup",       owner: "Ops",               output: "Project created in systems" },
      { num: 4, name: "Resource Alignment",  owner: "Delivery / HR",     output: "Team aligned / risks flagged" },
      { num: 5, name: "Internal Kickoff",    owner: "Delivery / Ops",    output: "Internal readiness confirmed" },
      { num: 6, name: "Client Kickoff",      owner: "Delivery / Sales",  output: "Kickoff completed / client aligned" },
      { num: 7, name: "Delivery Ready",      owner: "Delivery",          output: "Execution plan active" },
      { num: 8, name: "Live Project",        owner: "Delivery / Finance", output: "Project live, tracking started ✓" }
    ],
    rules: {
      stageGate:  "A project cannot move to kickoff unless scope, commercial terms, owner and core setup fields are complete.",
      secondary:  "Handoff Rule — Sales owns completeness of the deal package; Ops validates the setup; Delivery accepts execution readiness.",
      escalation: "Escalation Rule — If staffing, scope clarity or key inputs are missing, escalate within 24 hours and keep the gap visible until resolved."
    },
    automationReadiness: "Low",
    agentOpportunities: ["Handoff completeness validation", "Resource availability check", "Gap tracking"],
    slaExpectations: "Handoff review within 2 business days. Project setup same week. Client kickoff within 5 business days of setup.",
    status: "Active"
  },

  // ─── BOOKLET 3 · DELIVERY EXECUTION ────────────────────────────────────

  {
    id: "P009",
    name: "Delivery Kickoff",
    booklet: "Booklet 1",
    domain: "Revenue Value Chain",
    version: "v1.0",
    date: "May 2026",
    image: "assets/processes/P009.png",
    primaryOwners: ["Delivery", "Ops", "Finance"],
    tools: ["Kantata", "Microsoft 365", "Slack", "Jira", "SharePoint", "Email", "Salesforce"],
    triggerEvent: "Project approved for launch — onboarding complete",
    outputGate: "Project launched",
    feedsFrom: ["P006 · Client / Project Onboarding", "P007 · Project Creation in Kantata"],
    feedsInto: ["Resource Allocation", "P016 · Project Margin / Profitability Review", "P012 · Invoice Creation & Sending"],
    stages: [
      { num: 1, name: "Kickoff Trigger",    owner: "Delivery",          output: "Kickoff request opened" },
      { num: 2, name: "Kickoff Intake",     owner: "Ops",               output: "Complete kickoff package" },
      { num: 3, name: "Internal Readiness", owner: "Delivery",          output: "Internal readiness confirmed" },
      { num: 4, name: "Client Readiness",   owner: "Delivery / Ops",    output: "Client kickoff confirmed" },
      { num: 5, name: "Kickoff Agenda",     owner: "Delivery",          output: "Agenda and materials ready" },
      { num: 6, name: "Kickoff Meeting",    owner: "Delivery",          output: "Kickoff delivered" },
      { num: 7, name: "Action Alignment",   owner: "Delivery / Finance",output: "Post-kickoff actions assigned" },
      { num: 8, name: "Kickoff Complete",   owner: "Delivery / Ops",    output: "Project launched ✓" }
    ],
    rules: {
      stageGate:  "A project cannot move into active delivery until kickoff inputs, attendees, agenda, and initial governance are confirmed.",
      secondary:  "Blocker Rule — If scope, client contacts, or launch dependencies are missing, kickoff returns to the owner within 1 business day for correction.",
      escalation: "Kickoff Rule — Delivery must publish notes, action owners, and next milestones after the kickoff meeting. Critical blockers must be logged and escalated."
    },
    automationReadiness: "Low",
    agentOpportunities: ["Kickoff package completeness check", "Meeting notes publishing", "Action item assignment"],
    slaExpectations: "Internal readiness confirmed before client kickoff. Kickoff meeting within 5 business days of setup. Actions published same day.",
    status: "Active"
  },

  {
    id: "P010",
    name: "Milestone Approval",
    booklet: "Booklet 3",
    domain: "Delivery Execution",
    version: "v1.0",
    date: "May 2026",
    image: "assets/processes/P010.png",
    primaryOwners: ["Delivery", "Ops", "Sales", "Finance"],
    tools: ["Kantata", "Jira", "SharePoint", "Microsoft 365", "Slack", "Zoho", "Email"],
    triggerEvent: "Milestone deliverable completed according to SOW and project plan",
    outputGate: "Finance handoff completed",
    feedsFrom: ["P008 · Sales to Delivery Handoff (Booklet 2)"],
    feedsInto: ["P011 · Invoice Readiness Validation", "P013 · Accounts Receivable Follow-up", "P015 · Revenue Forecast Update", "Booklet 6 — Record to Report"],
    stages: [
      { num: 1, name: "Deliverable Ready",    owner: "Delivery",          output: "Milestone package prepared" },
      { num: 2, name: "Internal Review",      owner: "Delivery / Ops",    output: "Internally validated milestone" },
      { num: 3, name: "Evidence Collected",   owner: "Delivery",          output: "Approval evidence complete" },
      { num: 4, name: "Client Submission",    owner: "Delivery / Sales",  output: "Approval request sent" },
      { num: 5, name: "Client Review",        owner: "Sales / Delivery",  output: "Client response tracked" },
      { num: 6, name: "Approval Confirmed",   owner: "Delivery",          output: "Approved milestone recorded" },
      { num: 7, name: "Billing Trigger Logged",owner: "Finance / Delivery",output: "Invoiceable milestone logged" },
      { num: 8, name: "Finance Notified",     owner: "Finance / Ops",     output: "Finance handoff completed ✓" }
    ],
    rules: {
      stageGate:  "No milestone can be sent to the client unless the deliverable, supporting evidence and contractual billing trigger are clearly validated.",
      secondary:  "Approval Rule — Billing can only proceed once written client approval, accepted deliverable or equivalent proof of acceptance is stored and linked to the milestone.",
      escalation: "Escalation Rule — If client approval is delayed, rejected or unclear, escalate within 24 hours and keep the blocker visible until resolved."
    },
    automationReadiness: "Medium",
    agentOpportunities: ["Evidence package assembly", "Client approval follow-up", "Billing trigger logging"],
    slaExpectations: "Internal review within 2 business days. Client follow-up every 3 business days. Billing trigger logged within 1 business day of approval.",
    status: "Active"
  },

  {
    id: "P011",
    name: "Invoice Readiness Validation",
    booklet: "Booklet 1",
    domain: "Revenue Value Chain",
    version: "v1.0",
    date: "May 2026",
    image: "assets/processes/P011.png",
    primaryOwners: ["Finance", "Delivery", "Ops", "Sales"],
    tools: ["Kantata", "Salesforce", "Zoho", "Microsoft 365", "Slack", "Email"],
    triggerEvent: "Billing event identified — milestone completion, recurring schedule, or approved event",
    outputGate: "Invoice-ready package",
    feedsFrom: ["P009 · Delivery Kickoff", "P007 · Project Creation in Kantata", "P010 · Milestone Approval"],
    feedsInto: ["P012 · Invoice Creation & Sending", "P013 · Accounts Receivable Follow-up", "P015 · Revenue Forecast Update"],
    stages: [
      { num: 1, name: "Validation Trigger",   owner: "Finance",           output: "Validation request opened" },
      { num: 2, name: "Readiness Intake",     owner: "Finance",           output: "Complete validation package" },
      { num: 3, name: "Delivery Evidence",    owner: "Delivery / Ops",    output: "Delivery basis confirmed" },
      { num: 4, name: "Billing Basis Check",  owner: "Finance / Sales",   output: "Billing basis approved" },
      { num: 5, name: "Financial Validation", owner: "Finance",           output: "Financial readiness confirmed" },
      { num: 6, name: "Exception Resolution", owner: "Finance / Delivery / Ops", output: "Exceptions resolved" },
      { num: 7, name: "Approval to Invoice",  owner: "Finance / Ops",     output: "Approved for invoicing" },
      { num: 8, name: "Ready for Billing",    owner: "Finance",           output: "Invoice-ready package ✓" }
    ],
    rules: {
      stageGate:  "No invoice can be created until the billing trigger, delivery evidence, contractual basis, financial checks, and required client details are complete in the system of record.",
      secondary:  "Missing Data Rule — If milestone evidence, PO details, invoice instructions, amounts, or approval inputs are missing, the package returns to the owner within 1 business day for correction.",
      escalation: "Validation Rule — Invoice Readiness Validation is the control step between delivery completion and invoice creation. Finance keeps the package visible until it is released to billing."
    },
    automationReadiness: "High",
    agentOpportunities: ["Billing trigger detection", "Evidence completeness check", "Financial field validation"],
    slaExpectations: "Validation triggered same day as billing event. Ready for billing within 2 business days.",
    status: "Active"
  },

  {
    id: "P012",
    name: "Invoice Creation & Sending",
    booklet: "Booklet 1",
    domain: "Revenue Value Chain",
    version: "v1.0",
    date: "May 2026",
    image: "assets/processes/P012.png",
    primaryOwners: ["Finance", "Delivery", "Ops"],
    tools: ["Zoho", "Kantata", "Salesforce", "Microsoft 365", "Slack", "Email", "Bank"],
    triggerEvent: "Invoice-ready package confirmed from readiness validation",
    outputGate: "Ready for AR follow-up",
    feedsFrom: ["P005 · Sales to Delivery Handoff", "P006 · Client / Project Onboarding", "P007 · Project Creation in Kantata", "P015 · Revenue Forecast Update"],
    feedsInto: ["P013 · Accounts Receivable Follow-up", "P014 · Payment Reconciliation", "P016 · Project Margin / Profitability Review"],
    stages: [
      { num: 1, name: "Billing Trigger",  owner: "Delivery / Finance", output: "Valid billing trigger" },
      { num: 2, name: "Billing Package",  owner: "Finance",            output: "Complete billing package" },
      { num: 3, name: "Validation",       owner: "Finance / Delivery", output: "Billing data approved" },
      { num: 4, name: "Invoice Draft",    owner: "Finance",            output: "Invoice draft ready" },
      { num: 5, name: "Approval",         owner: "Finance / Ops",      output: "Approved to send" },
      { num: 6, name: "Invoice Sent",     owner: "Finance",            output: "Invoice sent to client" },
      { num: 7, name: "Revenue Logged",   owner: "Finance / Ops",      output: "Revenue visibility updated" },
      { num: 8, name: "AR Handoff",       owner: "Finance",            output: "Ready for follow-up ✓" }
    ],
    rules: {
      stageGate:  "No invoice can be sent until the billing trigger, commercial terms, amount validation, and required client data are complete in the system of record.",
      secondary:  "Missing Data Rule — Missing PO numbers, milestone evidence, tax details, client entity data, or payment instructions return the package to the owner within 1 business day for correction.",
      escalation: "Invoice Rule — Every sent invoice must be logged with send date, due date, amount, and owner. Finance keeps the invoice visible for AR follow-up and forecast reporting."
    },
    automationReadiness: "High",
    agentOpportunities: ["Invoice draft generation", "Client entity & PO validation", "Revenue logging automation"],
    slaExpectations: "Invoice drafted and sent within 1 business day of package approval. AR handoff same day.",
    status: "Active"
  },

  {
    id: "P013",
    name: "Accounts Receivable Follow-up",
    booklet: "Booklet 1",
    domain: "Revenue Value Chain",
    version: "v1.0",
    date: "May 2026",
    image: "assets/processes/P013.png",
    primaryOwners: ["Finance", "Ops", "Sales", "Legal"],
    tools: ["Zoho", "Salesforce", "Kantata", "Microsoft 365", "Slack", "Email"],
    triggerEvent: "Invoice enters follow-up control queue",
    outputGate: "AR case closed",
    feedsFrom: ["P012 · Invoice Creation & Sending"],
    feedsInto: ["P014 · Payment Reconciliation", "P015 · Revenue Forecast Update", "P016 · Project Margin / Profitability Review"],
    stages: [
      { num: 1, name: "Invoice Logged",  owner: "Finance",              output: "Tracked invoice in AR queue" },
      { num: 2, name: "AR Queue",        owner: "Finance",              output: "Follow-up case opened" },
      { num: 3, name: "Due Tracking",    owner: "Finance",              output: "Invoice status monitored" },
      { num: 4, name: "Reminder",        owner: "Finance",              output: "Reminder sent to client" },
      { num: 5, name: "Follow-up",       owner: "Finance / Ops",        output: "Collection action updated" },
      { num: 6, name: "Escalation",      owner: "Finance / Sales / Legal", output: "Escalation owner assigned" },
      { num: 7, name: "Payment Check",   owner: "Finance",              output: "Payment confirmed" },
      { num: 8, name: "Case Closed",     owner: "Finance",              output: "AR case closed ✓" }
    ],
    rules: {
      stageGate:  "Every invoice in follow-up must have owner, due date, client contact, aging status, and next action logged in the system of record.",
      secondary:  "Overdue Rule — Invoices that pass due date without payment or clear commitment move to overdue follow-up and require escalation according to the defined cadence.",
      escalation: "AR Rule — Finance maintains visibility of invoice aging, follow-up status, expected payment date, and escalations until the receivable is resolved."
    },
    automationReadiness: "High",
    agentOpportunities: ["Automated payment reminders", "Aging bucket monitoring", "Escalation trigger based on aging rules"],
    slaExpectations: "First reminder at or before due date. Overdue escalation within defined aging threshold. Case closed within 5 business days of payment confirmed.",
    status: "Active"
  },

  {
    id: "P014",
    name: "Payment Reconciliation",
    booklet: "Booklet 1",
    domain: "Revenue Value Chain",
    version: "v1.0",
    date: "May 2026",
    image: "assets/processes/P014.png",
    primaryOwners: ["Finance", "Ops"],
    tools: ["Bank", "Zoho", "Salesforce", "Kantata", "Microsoft 365", "Slack", "Email"],
    triggerEvent: "Incoming client payment identified in bank account",
    outputGate: "Payment reconciled",
    feedsFrom: ["P012 · Invoice Creation & Sending", "P013 · Accounts Receivable Follow-up"],
    feedsInto: ["P015 · Revenue Forecast Update", "P016 · Project Margin / Profitability Review"],
    stages: [
      { num: 1, name: "Payment Received",       owner: "Finance", output: "Incoming payment identified" },
      { num: 2, name: "Remittance Captured",    owner: "Finance", output: "Payment package logged" },
      { num: 3, name: "Match Attempt",          owner: "Finance", output: "Match proposed" },
      { num: 4, name: "Exception Review",       owner: "Finance / Ops", output: "Exception path defined" },
      { num: 5, name: "Internal Validation",    owner: "Finance", output: "Reconciliation approved" },
      { num: 6, name: "System Update",          owner: "Finance", output: "Payment applied in system" },
      { num: 7, name: "Reconciliation Posted",  owner: "Finance", output: "Reconciled payment posted" },
      { num: 8, name: "Case Closed",            owner: "Finance", output: "Payment reconciled ✓" }
    ],
    rules: {
      stageGate:  "A payment cannot be closed until funds, remittance support, invoice match, and final status are recorded in the system of record.",
      secondary:  "Exception Rule — If payment amount, client reference, or invoice allocation cannot be confirmed, the reconciliation stays open and is routed for investigation within 1 business day.",
      escalation: "Reconciliation Rule — Finance maintains visibility of payment status, invoice application, and unresolved differences until the payment is fully reconciled or formally escalated."
    },
    automationReadiness: "High",
    agentOpportunities: ["Bank feed reconciliation matching", "Short-payment detection", "Remittance data extraction"],
    slaExpectations: "Payment matched within 1 business day of receipt. Exceptions resolved within 2 business days. Case closed same day as final reconciliation.",
    status: "Active"
  },

  // ─── BOOKLET 3 / 6 · DATA TO DECISION / RECORD TO REPORT ──────────────

  {
    id: "P015",
    name: "Revenue Forecast Update",
    booklet: "Booklet 3",
    domain: "Data to Decision",
    version: "v1.0",
    date: "May 2026",
    image: "assets/processes/P015.png",
    primaryOwners: ["Finance", "Delivery", "CEO Ops", "Process Ops"],
    tools: ["Kantata", "QuickSight", "Excel", "Slack", "Email"],
    triggerEvent: "Weekly refresh — Monday AM data extract cycle",
    outputGate: "Updated forecast + actions published",
    feedsFrom: ["P010 · Milestone Approval", "P011 · Invoice Readiness Validation", "P007 · Project Creation in Kantata"],
    feedsInto: ["Executive KPI Reporting", "Weekly Ops Review", "P016 · Project Margin / Profitability Review"],
    stages: [
      { num: 1, name: "Data Extract",        owner: "Finance",            output: "Forecast source dataset" },
      { num: 2, name: "Validate Projects",   owner: "Delivery / Finance", output: "Clean project baseline" },
      { num: 3, name: "Billing Triggers",    owner: "Delivery",           output: "Milestone readiness view" },
      { num: 4, name: "Finance Inputs",      owner: "Finance",            output: "Finance-validated forecast" },
      { num: 5, name: "Build Forecast",      owner: "Finance / CEO Ops",  output: "Monthly revenue forecast" },
      { num: 6, name: "Confidence Score",    owner: "Process Ops / Finance", output: "Forecast confidence layer" },
      { num: 7, name: "CEO Review",          owner: "CEO Ops / Finance",  output: "CEO-approved action list" },
      { num: 8, name: "Publish Actions",     owner: "Process Ops / Finance", output: "Updated forecast + actions ✓" }
    ],
    rules: {
      stageGate:  "Forecast Gate Rule — No number is shown to CEO unless project, amount, month and owner are validated or explicitly marked as Low Confidence.",
      secondary:  "Confidence Rule — High = amount/date/trigger confirmed. Medium = partial data with owner. Low = missing trigger, amount, invoice status or owner.",
      escalation: "Handoff Rule — Delivery owns milestone truth; Finance owns forecast amount and cash timing; ProcessOps owns gaps, actions and data-quality visibility."
    },
    automationReadiness: "High",
    agentOpportunities: ["Automated data extract from Kantata", "Confidence scoring algorithm", "Exception flagging and routing"],
    slaExpectations: "Weekly cycle — data extracted Monday AM. CEO review completed before Wednesday. Actions published within 24 hrs of review.",
    status: "Active"
  },

  {
    id: "P016",
    name: "Project Margin / Profitability Review",
    booklet: "Booklet 6",
    domain: "Record to Report",
    version: "v1.0",
    date: "May 2026",
    image: "assets/processes/P016.png",
    primaryOwners: ["Ops", "Finance", "Delivery", "Process"],
    tools: ["Kantata", "QuickSight", "Excel", "Zoho", "Salesforce", "Slack", "Email"],
    triggerEvent: "Weekly / before review cycle — project data pull initiated",
    outputGate: "Profitability report published",
    feedsFrom: ["P010 · Milestone Approval", "P015 · Revenue Forecast Update"],
    feedsInto: ["Booklet 1 — Lead to Cash", "Executive KPI Reporting"],
    stages: [
      { num: 1, name: "Project Data Pulled",     owner: "Ops / Finance",    output: "Project margin dataset ready" },
      { num: 2, name: "Revenue Validated",       owner: "Finance / Delivery",output: "Revenue view validated" },
      { num: 3, name: "Costs Reviewed",          owner: "Delivery / Finance",output: "Cost baseline confirmed" },
      { num: 4, name: "Margin Calculated",       owner: "Finance",           output: "Margin metrics calculated" },
      { num: 5, name: "Variance Analyzed",       owner: "Process / Finance", output: "Variance drivers identified" },
      { num: 6, name: "Profitability Reviewed",  owner: "Finance / Ops",     output: "Priority projects agreed" },
      { num: 7, name: "Actions Defined",         owner: "Ops / Delivery / Finance", output: "Recovery action plan active" },
      { num: 8, name: "Report Published",        owner: "Finance / Process", output: "Profitability report published ✓" }
    ],
    rules: {
      stageGate:  "No project margin review is considered complete unless revenue, costs and current forecast assumptions have been validated.",
      secondary:  "Margin Rule — Any project below target margin must have a documented driver, named owner and recovery action or explicit leadership decision.",
      escalation: "Escalation Rule — If margin drops materially, turns negative or data quality prevents a reliable view, escalate within 24 hours and keep the issue visible until resolved."
    },
    automationReadiness: "Medium",
    agentOpportunities: ["Margin variance detection", "At-risk project flagging", "Action plan template generation"],
    slaExpectations: "Data pulled weekly before review cycle. Report published same day as review. Recovery actions defined within 24 hours.",
    status: "Active"
  },

  {
    id: "P017",
    name: "Forecast Data Quality Validation",
    booklet: "Booklet 6",
    domain: "Record to Report",
    version: "v1.0",
    date: "May 2026",
    image: "assets/processes/P017.png",
    primaryOwners: ["Finance", "Ops", "Delivery", "Process"],
    tools: ["Kantata", "QuickSight", "Excel", "Salesforce", "Zoho", "Slack", "Email"],
    triggerEvent: "Weekly / before forecast cycle — forecast inputs pulled",
    outputGate: "Forecast quality dataset approved",
    feedsFrom: ["P015 · Revenue Forecast Update", "P010 · Milestone Approval"],
    feedsInto: ["P016 · Project Margin / Profitability Review", "Executive KPI Reporting"],
    stages: [
      { num: 1, name: "Forecast Inputs Pulled",     owner: "Finance / Ops",    output: "Validation dataset prepared" },
      { num: 2, name: "Critical Fields Checked",    owner: "Finance / Process", output: "Critical field gaps identified" },
      { num: 3, name: "Project Status Validated",   owner: "Delivery / Finance",output: "Project status confirmed" },
      { num: 4, name: "Billing Data Matched",       owner: "Finance",           output: "Forecast-to-billing match complete" },
      { num: 5, name: "Exceptions Reviewed",        owner: "Process / Finance", output: "Exception log validated" },
      { num: 6, name: "Quality Score Assigned",     owner: "Finance / Process", output: "Data quality score applied" },
      { num: 7, name: "Corrections Confirmed",      owner: "Ops / Delivery / Finance", output: "Corrections and actions confirmed" },
      { num: 8, name: "Dataset Approved",           owner: "Finance / Process", output: "Forecast quality dataset approved ✓" }
    ],
    rules: {
      stageGate:  "No forecast dataset is considered review-ready unless core fields, project status and billing alignment have been validated.",
      secondary:  "Quality Rule — Any forecast line with missing core data, unresolved mismatch or low confidence must remain visibly flagged until corrected or explicitly accepted.",
      escalation: "Escalation Rule — If data quality issues materially affect the forecast view or executive decisions, escalate within 24 hours and keep ownership visible until resolved."
    },
    automationReadiness: "High",
    agentOpportunities: ["Automated field completeness checks", "Duplicate row detection", "Quality score calculation"],
    slaExpectations: "Validation completed within 1 business day of forecast pull. Dataset approved before forecast is published.",
    status: "Active"
  },

  // ─── BOOKLET 5 · PEOPLE OPERATIONS ─────────────────────────────────────

  {
    id: "P018",
    name: "Recruiting Request Intake",
    booklet: "Booklet 5",
    domain: "People Operations",
    version: "v1.0",
    date: "May 2026",
    image: "assets/processes/P018.png",
    primaryOwners: ["HR", "Delivery", "Ops"],
    tools: ["Jira Service Management", "BambooHR", "LinkedIn", "Slack", "Email", "Microsoft 365"],
    triggerEvent: "Hiring request received with business reason, project/client context, and urgency",
    outputGate: "Search live / intake complete",
    feedsFrom: ["Workforce Planning", "Resource Alignment"],
    feedsInto: ["P019 · Candidate Evaluation Pipeline", "Interview & Selection"],
    stages: [
      { num: 1, name: "Request Received",      owner: "HR / Delivery",    output: "Recruiting request received" },
      { num: 2, name: "Role Clarified",        owner: "HR / Ops",         output: "Role scope clarified" },
      { num: 3, name: "Approval Confirmed",    owner: "HR / Ops",         output: "Approved hiring request" },
      { num: 4, name: "Intake Logged",         owner: "HR",               output: "Intake record created" },
      { num: 5, name: "Job Brief Completed",   owner: "HR / Delivery",    output: "Job brief approved" },
      { num: 6, name: "Recruitment Path Set",  owner: "HR",               output: "Sourcing strategy defined" },
      { num: 7, name: "Recruiter Assigned",    owner: "HR / Ops",         output: "Recruiting owner assigned" },
      { num: 8, name: "Search Opened",         owner: "HR / Delivery",    output: "Search live / intake complete ✓" }
    ],
    rules: {
      stageGate:  "No recruiting request can move forward unless the business need, role scope, named hiring manager and approval path are clearly defined.",
      secondary:  "Intake Rule — Every intake must include role profile, urgency, location, seniority, start date and interview ownership before sourcing begins.",
      escalation: "Escalation Rule — If approval, scope or hiring ownership is missing, escalate within 24 hours and keep the request visible until resolved."
    },
    automationReadiness: "Medium",
    agentOpportunities: ["Intake form validation", "Approval routing", "Job brief template generation"],
    slaExpectations: "Request acknowledged within 1 business day. Role clarified within 2 business days. Search opened same week as intake logged.",
    status: "Active"
  },

  {
    id: "P019",
    name: "Candidate Evaluation Pipeline",
    booklet: "Booklet 5",
    domain: "People Operations",
    version: "v1.0",
    date: "May 2026",
    image: "assets/processes/P019.png",
    primaryOwners: ["HR", "Delivery", "Ops"],
    tools: ["LinkedIn", "BambooHR", "Jira Service Management", "Slack", "Email", "Microsoft 365"],
    triggerEvent: "Candidate received from sourcing channel, referral or direct application",
    outputGate: "Candidate moved forward / pipeline updated",
    feedsFrom: ["P018 · Recruiting Request Intake"],
    feedsInto: ["Interview & Selection"],
    stages: [
      { num: 1, name: "Candidate Received",          owner: "HR / Delivery", output: "Candidate record created" },
      { num: 2, name: "Profile Reviewed",            owner: "HR",            output: "Initial fit assessed" },
      { num: 3, name: "Minimum Criteria Checked",    owner: "HR / Ops",      output: "Minimum fit confirmed" },
      { num: 4, name: "Recruiter Screen Completed",  owner: "HR",            output: "Recruiter assessment completed" },
      { num: 5, name: "Hiring Manager Review",       owner: "HR / Delivery", output: "Manager decision captured" },
      { num: 6, name: "Evaluation Logged",           owner: "HR / Delivery", output: "Candidate evaluation updated" },
      { num: 7, name: "Next Step Confirmed",         owner: "HR / Ops",      output: "Next action assigned" },
      { num: 8, name: "Candidate Advanced",          owner: "HR / Delivery", output: "Candidate moved forward / pipeline updated ✓" }
    ],
    rules: {
      stageGate:  "No candidate can move forward unless role linkage, minimum criteria and owner visibility are clearly validated.",
      secondary:  "Evaluation Rule — Every reviewed candidate must have a documented recommendation, current status and named next-step owner before advancing.",
      escalation: "Escalation Rule — If hiring-manager feedback or next-step ownership is delayed, escalate within 24 hours and keep the candidate visible in the pipeline."
    },
    automationReadiness: "Medium",
    agentOpportunities: ["CV screening against job brief", "Duplicate profile detection", "Pipeline status notifications"],
    slaExpectations: "Candidate received within 1 business day. Recruiter screen within 3 business days. Hiring manager review same week.",
    status: "Active"
  },

  {
    id: "P020",
    name: "New Hire Onboarding",
    booklet: "Booklet 5",
    domain: "People Operations",
    version: "v1.0",
    date: "May 2026",
    image: "assets/processes/P020.png",
    primaryOwners: ["HR", "Delivery", "Ops", "IT"],
    tools: ["BambooHR", "Microsoft 365", "Jira Service Management", "Slack", "AWS", "GitHub", "Email"],
    triggerEvent: "Final hire confirmation received with role, manager, country, start date and employment type",
    outputGate: "Onboarding complete",
    feedsFrom: ["P019 · Candidate Evaluation Pipeline"],
    feedsInto: ["Employee Lifecycle Management", "Access Governance"],
    stages: [
      { num: 1, name: "Handoff Received",          owner: "HR / Delivery", output: "Onboarding request received" },
      { num: 2, name: "Employee Record Created",   owner: "HR",            output: "Employee record created" },
      { num: 3, name: "Preboarding Started",       owner: "HR / Ops",      output: "Preboarding checklist active" },
      { num: 4, name: "Accounts Requested",        owner: "IT / HR",       output: "Access requests submitted" },
      { num: 5, name: "Equipment & Access Ready",  owner: "IT / Ops",      output: "Work environment ready" },
      { num: 6, name: "Day 1 Completed",           owner: "HR / Delivery", output: "Day 1 onboarding completed" },
      { num: 7, name: "First Week Follow-up",      owner: "HR / Delivery / IT", output: "First-week readiness confirmed" },
      { num: 8, name: "Onboarding Closed",         owner: "HR / Ops",      output: "Onboarding complete ✓" }
    ],
    rules: {
      stageGate:  "No onboarding can be considered complete unless the employee record, critical access, equipment and mandatory Day 1 tasks are fully confirmed.",
      secondary:  "Access Rule — Any new hire requiring corporate access must have named owners for provisioning, approvals and issue resolution before the start date.",
      escalation: "Escalation Rule — If laptop delivery, system access or onboarding ownership is at risk, escalate within 24 hours and keep the blocker visible until resolved."
    },
    automationReadiness: "Medium",
    agentOpportunities: ["Onboarding checklist automation", "Access request triggering", "Day 1 schedule generation"],
    slaExpectations: "Employee record created within 1 business day of hire confirmation. Access requests at least 3 business days before start. Day 1 session confirmed before start date.",
    status: "Active"
  },

  // ─── BOOKLET 7 · ACCESS GOVERNANCE ─────────────────────────────────────

  {
    id: "P021",
    name: "Access Provisioning",
    booklet: "Booklet 7",
    domain: "Access Governance",
    version: "v1.0",
    date: "May 2026",
    image: "assets/processes/P021.png",
    primaryOwners: ["IT", "HR", "Delivery", "Ops"],
    tools: ["Jira Service Management", "Microsoft 365", "Slack", "AWS", "GitHub", "BambooHR", "Email"],
    triggerEvent: "Onboarding or business request requiring system access received",
    outputGate: "Access live / provisioning complete",
    feedsFrom: ["P020 · New Hire Onboarding"],
    feedsInto: ["Employee Lifecycle Management", "Access Governance"],
    stages: [
      { num: 1, name: "Request Received",        owner: "HR / IT",       output: "Access request received" },
      { num: 2, name: "Access Scope Confirmed",  owner: "IT / Delivery", output: "Access scope clarified" },
      { num: 3, name: "Ticket Logged",           owner: "IT",            output: "Provisioning ticket created" },
      { num: 4, name: "Approval Validated",      owner: "IT / Ops",      output: "Provisioning approved" },
      { num: 5, name: "Accounts Provisioned",    owner: "IT / HR",       output: "Accounts provisioned" },
      { num: 6, name: "Access Tested",           owner: "IT / Delivery", output: "Access readiness confirmed" },
      { num: 7, name: "User Notified",           owner: "IT / HR",       output: "User communication sent" },
      { num: 8, name: "Access Active",           owner: "IT / Delivery", output: "Access live / provisioning complete ✓" }
    ],
    rules: {
      stageGate:  "No access request can be considered complete unless the request scope, approvals, key systems and user readiness have been fully confirmed.",
      secondary:  "Access Rule — Any provisioning request involving privileged, financial or restricted systems must have named approvers, documented ownership and a tracked ticket before activation.",
      escalation: "Escalation Rule — If approval, licensing, user identity or system readiness is at risk, escalate within 24 hours and keep the blocker visible until resolved."
    },
    automationReadiness: "High",
    agentOpportunities: ["Account creation automation", "License assignment", "Access testing validation"],
    slaExpectations: "Request acknowledged within 1 business day. Accounts provisioned according to SLA by system type. Access tested before handover.",
    status: "Active"
  },

  // ─── BOOKLET 3 · WORKPLACE ENABLEMENT ──────────────────────────────────

  {
    id: "P022",
    name: "Laptop / Equipment Request",
    booklet: "Booklet 3",
    domain: "Workplace Enablement",
    version: "v1.0",
    date: "May 2026",
    image: "assets/processes/P022.png",
    primaryOwners: ["Requester", "Manager", "IT", "Ops"],
    tools: ["Jira Service Management", "Slack", "BambooHR", "Microsoft 365", "Intune/Jamf", "Procurement Portal", "Email"],
    triggerEvent: "New hire, replacement, or upgrade request submitted in Jira portal",
    outputGate: "Request closed, user productive",
    feedsFrom: ["New Hire Onboarding", "Replacement Need", "Upgrade Request"],
    feedsInto: ["P021 · Access Provisioning", "Onboarding Completion", "Asset Inventory"],
    stages: [
      { num: 1, name: "Request Raised",      owner: "Requester",   output: "Complete request logged" },
      { num: 2, name: "Manager Approval",    owner: "Manager",     output: "Approved request + cost center" },
      { num: 3, name: "IT Review",           owner: "IT",          output: "Fulfillment path confirmed" },
      { num: 4, name: "Procurement",         owner: "Ops",         output: "PO created or stock reserved" },
      { num: 5, name: "Order Placed",        owner: "Ops",         output: "Device in transit" },
      { num: 6, name: "Asset Setup",         owner: "IT",          output: "Configured device ready" },
      { num: 7, name: "Delivery / Handover", owner: "IT",          output: "Equipment delivered" },
      { num: 8, name: "Ready to Use",        owner: "Requester",   output: "Request closed, user productive ✓" }
    ],
    rules: {
      stageGate:  "No purchase or stock assignment starts until manager approval, cost center, and delivery details are complete. If blocked, requester updates the ticket within 24 hrs.",
      secondary:  "Standard Device Rule — IT must use the approved device catalog unless an exception is justified by role, country, or security need. Non-standard requests require explicit approval.",
      escalation: "Handoff Rule — Every status change must be updated in Jira. Delivery / Handover requires explicit receipt confirmation. For new hires, sync completion with onboarding and access provisioning."
    },
    automationReadiness: "Medium",
    agentOpportunities: ["Stock availability check", "PO creation", "Asset registration in inventory"],
    slaExpectations: "Manager approval within 1 business day. Procurement within 2 business days if purchase needed. Asset setup within 1 business day of receipt.",
    status: "Active"
  },

  {
    id: "P023",
    name: "AWS APN Access Certification Update",
    booklet: "Booklet 3",
    domain: "Workplace Enablement",
    version: "v1.0",
    date: "May 2026",
    image: "assets/processes/P023.png",
    primaryOwners: ["IT", "Ops", "HR"],
    tools: ["AWS", "Jira Service Management", "BambooHR", "Slack", "Email", "Microsoft 365"],
    triggerEvent: "APN certification renewal cycle or new certification requirement identified",
    outputGate: "APN access and certifications confirmed and updated",
    feedsFrom: ["HR Records", "AWS APN Portal", "Compliance Review"],
    feedsInto: ["Access Governance", "Compliance Evidence", "Asset Inventory"],
    stages: [
      { num: 1, name: "Certification Review",     owner: "IT / Ops",     output: "Certification review opened" },
      { num: 2, name: "APN Record Check",         owner: "IT",           output: "APN record validated" },
      { num: 3, name: "Staff Mapping",            owner: "HR / IT",      output: "Staff certification mapped" },
      { num: 4, name: "Gaps Identified",          owner: "IT / Ops",     output: "Gap list confirmed" },
      { num: 5, name: "Update Submitted",         owner: "IT",           output: "APN submission complete" },
      { num: 6, name: "Confirmation Received",    owner: "IT",           output: "AWS confirmation logged" },
      { num: 7, name: "Internal Records Updated", owner: "HR / IT",      output: "Internal records aligned" },
      { num: 8, name: "Certification Active",     owner: "Ops",          output: "APN certification current ✓" }
    ],
    rules: {
      stageGate:  "No APN submission is made until internal staff certification records are validated against current AWS requirements.",
      secondary:  "Compliance Rule — All APN-required certifications must be current and linked to named individuals before submission. Lapsed certifications must be flagged immediately.",
      escalation: "Escalation Rule — If certification gaps affect APN tier status or client-facing credentials, escalate within 24 hours to Ops and HR leadership."
    },
    automationReadiness: "Medium",
    agentOpportunities: ["Certification expiry monitoring", "APN record comparison", "Gap report generation"],
    slaExpectations: "Certification review initiated 60 days before renewal deadline. Gaps resolved within 30 days. Submission confirmed 2 weeks before deadline.",
    status: "Active"
  },

  {
    id: "P024",
    name: "Employee Offboarding",
    booklet: "Booklet 3",
    domain: "Workplace Enablement",
    version: "v1.0",
    date: "May 2026",
    image: "assets/processes/P024.png",
    primaryOwners: ["Manager", "HR", "IT", "Ops", "Finance"],
    tools: ["Jira Service Management", "BambooHR", "Microsoft 365", "Slack", "Intune/Jamf", "Asset Inventory", "Payroll", "Email"],
    triggerEvent: "Resignation, termination, or contract end — offboarding request submitted in Jira portal",
    outputGate: "Case closed, employee fully offboarded",
    feedsFrom: ["Resignation", "Termination", "Contract End"],
    feedsInto: ["P025 · Access Removal / Deprovisioning", "Asset Inventory", "Payroll Closure"],
    stages: [
      { num: 1, name: "Offboarding Request",        owner: "Manager",         output: "Complete offboarding request logged" },
      { num: 2, name: "Manager Confirmation",       owner: "Manager",         output: "Manager-approved offboarding plan" },
      { num: 3, name: "HR Review",                  owner: "HR",              output: "HR checklist activated" },
      { num: 4, name: "IT Deprovisioning",          owner: "IT",              output: "Access revoked" },
      { num: 5, name: "Asset Return",               owner: "IT",              output: "Assets recovered or exception logged" },
      { num: 6, name: "Knowledge / Finance Closure",owner: "Ops / Finance",   output: "Operational and financial closure confirmed" },
      { num: 7, name: "Final Confirmation",         owner: "HR",              output: "All offboarding controls complete" },
      { num: 8, name: "Closed",                     owner: "HR",              output: "Case closed, employee fully offboarded ✓" }
    ],
    rules: {
      stageGate:  "No offboarding starts without a validated last working day, business owner, and termination context. If urgent separation is required, manager must flag immediate access removal.",
      secondary:  "Access Rule — IT access removal must follow the approved timing. Privileged, financial, and client-facing access must be checked explicitly before closure.",
      escalation: "Handoff Rule — Asset return, knowledge transfer, and payroll closure must all be confirmed in Jira before the case can be closed. Exceptions require documented ownership."
    },
    automationReadiness: "Medium",
    agentOpportunities: ["Offboarding checklist orchestration", "Access revocation triggers", "Asset return tracking"],
    slaExpectations: "Request acknowledged within 4 hours. Manager confirmation within 1 business day. IT deprovisioning by final day or immediately if urgent.",
    status: "Active"
  },

  {
    id: "P025",
    name: "Access Removal / Deprovisioning",
    booklet: "Booklet 3",
    domain: "Workplace Enablement",
    version: "v1.0",
    date: "May 2026",
    image: "assets/processes/P025.png",
    primaryOwners: ["Manager", "HR", "IT", "Ops"],
    tools: ["Jira Service Management", "BambooHR", "Microsoft 365", "Slack", "Intune/Jamf", "Identity Provider", "Email"],
    triggerEvent: "Access removal / deprovisioning request submitted — offboarding, role change, leave, or security exception",
    outputGate: "Case closed, access removed",
    feedsFrom: ["P024 · Employee Offboarding", "Role Change", "Security Request"],
    feedsInto: ["Access Audit", "Asset Inventory", "Compliance Evidence"],
    stages: [
      { num: 1, name: "Request Raised",           owner: "Manager",    output: "Complete request logged" },
      { num: 2, name: "Manager Confirmation",     owner: "Manager",    output: "Approved scope + removal timing" },
      { num: 3, name: "HR / Status Validation",   owner: "HR",         output: "Status and eligibility confirmed" },
      { num: 4, name: "Core Access Removal",      owner: "IT",         output: "Core access revoked" },
      { num: 5, name: "Privileged Access Review", owner: "IT",         output: "Privileged access removed" },
      { num: 6, name: "Device / Token Recovery",  owner: "IT",         output: "Assets recovered or exception logged" },
      { num: 7, name: "Final Confirmation",       owner: "HR",         output: "Deprovisioning controls complete" },
      { num: 8, name: "Closed",                   owner: "Ops",        output: "Case closed, access removed ✓" }
    ],
    rules: {
      stageGate:  "No access removal begins without a validated request, owner, and effective removal date. Urgent removals must be clearly flagged by the manager.",
      secondary:  "Security Rule — Privileged, financial, and client-facing access must be explicitly checked. Shared credentials and tokens require documented rotation or disablement.",
      escalation: "Handoff Rule — Ticket closure requires confirmation that core access, privileged access, and asset recovery were completed or formally documented as exceptions."
    },
    automationReadiness: "High",
    agentOpportunities: ["Automated access revocation across systems", "Credential rotation triggers", "Compliance evidence logging"],
    slaExpectations: "Request acknowledged within 4 hours. Core access removed by effective date or immediately if urgent. Case closed same day after final confirmation.",
    status: "Active"
  },

  {
    id: "P026",
    name: "Internal Service Desk Intake",
    booklet: "Booklet 3",
    domain: "Workplace Enablement",
    version: "v1.0",
    date: "May 2026",
    image: "assets/processes/P026.png",
    primaryOwners: ["Requester", "Ops", "Owner"],
    tools: ["Jira Service Management", "Slack", "Microsoft 365", "Confluence", "Email"],
    triggerEvent: "Internal request submitted in Jira portal — IT, HR, Ops, Delivery, or Handoff category",
    outputGate: "Case closed, data complete",
    feedsFrom: ["Employee Requests", "Access Issues", "HR Questions", "Delivery Support", "Handoffs"],
    feedsInto: ["Request Resolution", "SLA Reporting", "Knowledge Base", "Process Improvement"],
    stages: [
      { num: 1, name: "Request Raised",          owner: "Requester", output: "Complete request logged" },
      { num: 2, name: "Intake Review",           owner: "Ops",       output: "Intake validated" },
      { num: 3, name: "Category Validation",     owner: "Ops",       output: "Routing path confirmed" },
      { num: 4, name: "Owner Assignment",        owner: "Ops",       output: "Owner + SLA assigned" },
      { num: 5, name: "Clarification / Triage",  owner: "Owner",     output: "Ready for execution" },
      { num: 6, name: "Work in Progress",        owner: "Owner",     output: "Resolution completed" },
      { num: 7, name: "Resolution Confirmation", owner: "Requester", output: "Resolution accepted" },
      { num: 8, name: "Closed",                  owner: "Ops",       output: "Case closed, data complete ✓" }
    ],
    rules: {
      stageGate:  "No work begins until the ticket is complete enough to route and owns a clear requester, category, and urgency. Incomplete requests are returned for clarification.",
      secondary:  "Routing Rule — Every ticket must have one primary owner and one accountable queue. Cross-team dependencies must be documented inside the ticket, not handled informally.",
      escalation: "Handoff Rule — Closure requires a resolution summary and either requester confirmation or a documented auto-close rule. Reopened tickets must keep the same history."
    },
    automationReadiness: "High",
    agentOpportunities: ["Ticket categorization", "Owner routing by category", "SLA monitoring and escalation triggers"],
    slaExpectations: "Request acknowledged within 4 hours. Intake review within 1 business day. Resolution per SLA by category type.",
    status: "Active"
  }

];

// ─── Derived helpers used by the app ───────────────────────────────────────

function getProcessById(id) {
  return DFX5_PROCESSES.find(p => p.id === id) || null;
}

function getProcessesByDomain(domain) {
  return DFX5_PROCESSES.filter(p => p.domain === domain);
}

function searchProcesses(query) {
  const q = query.toLowerCase().trim();
  if (!q) return DFX5_PROCESSES;
  return DFX5_PROCESSES.filter(p =>
    p.id.toLowerCase().includes(q) ||
    p.name.toLowerCase().includes(q) ||
    p.domain.toLowerCase().includes(q) ||
    p.primaryOwners.some(o => o.toLowerCase().includes(q)) ||
    p.tools.some(t => t.toLowerCase().includes(q)) ||
    p.stages.some(s => s.name.toLowerCase().includes(q))
  );
}

function getAllDomains() {
  return [...new Set(DFX5_PROCESSES.map(p => p.domain))];
}

function getAutomationReadinessCounts() {
  return DFX5_PROCESSES.reduce((acc, p) => {
    acc[p.automationReadiness] = (acc[p.automationReadiness] || 0) + 1;
    return acc;
  }, {});
}
