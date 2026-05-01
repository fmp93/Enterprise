// ============================================================
// COMMAND CENTER OS — HR PROCESSES 4–8
// File: hr-processes-4-8.js
//
// INSTRUCTIONS FOR CHATGPT:
// This file defines 5 HR processes following the same taxonomy
// as the existing demo processes (Laptop Lifecycle, Equipment
// Return, Employee Onboarding). Each process object contains:
//   - id, name, domain, description, states, departments, tasks
// Please merge these into the existing processes data array/object
// in the demo, matching the exact field names and structure your
// code already uses. If field names differ, map them accordingly.
// ============================================================

const hrProcesses = [

  // ─────────────────────────────────────────
  // PROCESS 4: PAYROLL PROCESSING
  // ─────────────────────────────────────────
  {
    id: "payroll-processing",
    name: "Payroll Processing",
    domain: "HR",
    description: "Monthly payroll cycle from data collection to payment and record archiving.",
    stateCount: 6,
    currentState: "collecting",
    sla: "Closed by last business day of the month",
    hitl: true,
    hitlStage: "approval",
    system: "Payroll Software / Bank",
    owner: "HR Manager + Accountant",

    states: [
      { id: "open",        label: "Open",           description: "Payroll cycle started, awaiting data." },
      { id: "collecting",  label: "Collecting",     description: "Hours, absences, and variables being gathered." },
      { id: "under-review",label: "Under Review",   description: "Payroll calculated and sent to approver." },
      { id: "approved",    label: "Approved",       description: "Payroll confirmed by authorized approver. HITL required." },
      { id: "paid",        label: "Paid",           description: "Payments executed via bank transfer." },
      { id: "archived",    label: "Archived",       description: "Payslips delivered and records stored." }
    ],

    transitions: [
      { from: "open",         to: "collecting",   event: "cycle_started",       condition: "First day of payroll period" },
      { from: "collecting",   to: "under-review",  event: "data_submitted",      condition: "All variable data received" },
      { from: "under-review", to: "approved",      event: "approval_given",      condition: "Authorized approver signs off — HITL" },
      { from: "under-review", to: "collecting",    event: "approval_rejected",   condition: "Errors found, return to collect" },
      { from: "approved",     to: "paid",          event: "payment_executed",    condition: "Bank transfer confirmed" },
      { from: "paid",         to: "archived",      event: "records_stored",      condition: "Payslips sent + records archived" }
    ],

    departments: [
      {
        id: "hr",
        name: "HR",
        icon: "◐",
        color: "hr",
        stage: "Data Collection",
        responsibilities: [
          "Open the payroll cycle on the first working day",
          "Collect attendance, overtime, absences, and bonuses",
          "Confirm new hires, terminations, and salary changes",
          "Submit complete data file to accountant by agreed deadline"
        ],
        systemsUsed: ["BambooHR", "Google Sheets", "Payroll Software"],
        notifies: ["Accountant (Francisco)", "Department Managers"],
        whatHappensAfter: "Accountant runs payroll calculation and sends draft for review.",
        relatedPolicies: ["Payroll Policy", "Overtime Policy", "Bonus Guidelines"]
      },
      {
        id: "finance",
        name: "Finance",
        icon: "◈",
        color: "finance",
        stage: "Calculation & Approval",
        responsibilities: [
          "Run payroll calculation from HR data",
          "Validate totals, deductions, and tax withholdings",
          "Send draft payroll to HR Manager for approval",
          "Execute bank transfers once approved",
          "Archive payroll records and issue payslips"
        ],
        systemsUsed: ["Payroll Software", "Bank Portal", "Accounting System"],
        notifies: ["HR Manager", "CEO (if total exceeds threshold)"],
        whatHappensAfter: "Payslips delivered to employees. Cycle marked Archived.",
        relatedPolicies: ["Financial Controls Policy", "Tax Compliance Policy"]
      }
    ],

    tasks: [
      {
        id: "open-cycle",
        name: "Open payroll cycle",
        stage: "Data Collection",
        assignedTo: "HR Manager",
        system: "Payroll Software",
        whatToDo: "Log into payroll system and open a new monthly cycle. Set the period dates.",
        whereToDo: "Payroll Software → New Cycle",
        whoToNotify: "Finance / Accountant",
        suggestedMessage: "Hi Francisco, payroll cycle for [month] is now open. Please prepare calculation once I submit the data file.",
        evidenceRequired: "Screenshot of open cycle with correct period dates",
        whatHappensNext: "HR begins collecting variable payroll data",
        sla: "Day 1 of payroll month",
        hitl: false
      },
      {
        id: "collect-variables",
        name: "Collect variable data",
        stage: "Data Collection",
        assignedTo: "HR Manager",
        system: "BambooHR / Google Sheets",
        whatToDo: "Gather overtime hours, absences, bonuses, commissions, new hires, terminations, and salary changes from all departments.",
        whereToDo: "BambooHR → Reports + Department Manager inputs",
        whoToNotify: "Department Managers",
        suggestedMessage: "Please confirm your team's overtime and absence data for [month] by [deadline].",
        evidenceRequired: "Completed variable data spreadsheet signed off by each manager",
        whatHappensNext: "Submit complete data to accountant",
        sla: "Day 3 of payroll month",
        hitl: false
      },
      {
        id: "submit-data",
        name: "Submit payroll data to accountant",
        stage: "Data Collection",
        assignedTo: "HR Manager",
        system: "Email / Shared Drive",
        whatToDo: "Send finalized data file to accountant. Include any special notes on exceptions.",
        whereToDo: "Email + Google Drive",
        whoToNotify: "Accountant (Francisco)",
        suggestedMessage: "Hi Francisco, attached is the complete payroll data for [month]. Please flag any questions before running the calculation.",
        evidenceRequired: "Sent email confirmation + file upload timestamp",
        whatHappensNext: "Accountant calculates payroll and sends draft for HR approval",
        sla: "Day 5 of payroll month",
        hitl: false
      },
      {
        id: "review-approve-payroll",
        name: "Review and approve payroll",
        stage: "Calculation & Approval",
        assignedTo: "HR Manager",
        system: "Payroll Software",
        whatToDo: "Review the payroll draft produced by the accountant. Verify totals, individual amounts, deductions, and any flagged exceptions. Approve or return for correction.",
        whereToDo: "Payroll Software → Draft Review",
        whoToNotify: "Accountant (Francisco)",
        suggestedMessage: "Payroll approved for [month]. Please proceed with bank transfers.",
        evidenceRequired: "Signed approval record in system (HITL checkpoint)",
        whatHappensNext: "Finance executes bank transfers",
        sla: "Within 24h of receiving draft",
        hitl: true
      },
      {
        id: "execute-payments",
        name: "Execute bank payments",
        stage: "Calculation & Approval",
        assignedTo: "Accountant (Francisco)",
        system: "Bank Portal",
        whatToDo: "Upload payment file to bank portal and execute all employee salary transfers.",
        whereToDo: "Bank Portal → Batch Payment Upload",
        whoToNotify: "HR Manager",
        suggestedMessage: "Transfers submitted for [month] payroll. Expected settlement: [date].",
        evidenceRequired: "Bank transfer confirmation number",
        whatHappensNext: "Payslips generated and sent to employees",
        sla: "Last business day of the month",
        hitl: false
      },
      {
        id: "deliver-archive",
        name: "Deliver payslips and archive records",
        stage: "Calculation & Approval",
        assignedTo: "HR Manager",
        system: "BambooHR / Email",
        whatToDo: "Generate and distribute payslips to all employees. Archive payroll records for the closed month.",
        whereToDo: "BambooHR → Payslip Generator",
        whoToNotify: "All employees",
        suggestedMessage: "Your payslip for [month] is now available in BambooHR.",
        evidenceRequired: "Delivery confirmation + archive timestamp",
        whatHappensNext: "Cycle marked Archived. Process closed.",
        sla: "Within 2 business days of payment",
        hitl: false
      }
    ]
  },


  // ─────────────────────────────────────────
  // PROCESS 5: LEAVE MANAGEMENT
  // ─────────────────────────────────────────
  {
    id: "leave-management",
    name: "Leave Management",
    domain: "HR",
    description: "Employee leave request lifecycle from submission to return confirmation.",
    stateCount: 6,
    currentState: "requested",
    sla: "Manager response within 48 hours of request",
    hitl: true,
    hitlStage: "manager-approval",
    system: "BambooHR / Google Calendar",
    owner: "Employee → Manager → HR",

    states: [
      { id: "requested",        label: "Requested",        description: "Employee submitted a leave request." },
      { id: "pending-approval", label: "Pending Approval", description: "Awaiting manager decision." },
      { id: "approved",         label: "Approved",         description: "Manager approved. HR registering." },
      { id: "rejected",         label: "Rejected",         description: "Manager rejected the request." },
      { id: "active",           label: "Active",           description: "Employee currently on leave." },
      { id: "returned",         label: "Returned",         description: "Employee back. Leave closed." }
    ],

    transitions: [
      { from: "requested",        to: "pending-approval", event: "request_submitted",   condition: "Employee submits form in BambooHR" },
      { from: "pending-approval", to: "approved",         event: "manager_approved",    condition: "Manager approves — HITL" },
      { from: "pending-approval", to: "rejected",         event: "manager_rejected",    condition: "Manager rejects with reason" },
      { from: "approved",         to: "active",           event: "leave_started",       condition: "Leave start date reached" },
      { from: "active",           to: "returned",         event: "employee_returned",   condition: "Employee confirms return" },
      { from: "rejected",         to: "requested",        event: "resubmitted",         condition: "Employee adjusts dates and resubmits" }
    ],

    departments: [
      {
        id: "employee",
        name: "Employee",
        icon: "◉",
        color: "user",
        stage: "Request Submission",
        responsibilities: [
          "Submit leave request in BambooHR with dates and type",
          "Provide coverage plan or handover notes if applicable",
          "Confirm return on the first day back"
        ],
        systemsUsed: ["BambooHR"],
        notifies: ["Direct Manager"],
        whatHappensAfter: "Manager receives notification and reviews the request.",
        relatedPolicies: ["Leave Policy", "PTO Guidelines"]
      },
      {
        id: "manager",
        name: "Manager",
        icon: "⊞",
        color: "manager",
        stage: "Manager Approval",
        responsibilities: [
          "Review leave request within 48 hours",
          "Check team coverage and project timelines",
          "Approve or reject with written reason",
          "Arrange coverage if approved"
        ],
        systemsUsed: ["BambooHR", "Google Calendar"],
        notifies: ["HR Manager", "Employee"],
        whatHappensAfter: "HR registers the approved leave and updates calendar.",
        relatedPolicies: ["Leave Policy", "Team Coverage Guidelines"]
      },
      {
        id: "hr",
        name: "HR",
        icon: "◐",
        color: "hr",
        stage: "Registration & Tracking",
        responsibilities: [
          "Register approved leave in HR system",
          "Update company calendar",
          "Track leave balances",
          "Confirm employee return and close the record"
        ],
        systemsUsed: ["BambooHR", "Google Calendar"],
        notifies: ["Payroll / Accountant (if unpaid leave)"],
        whatHappensAfter: "Leave marked Active. HR monitors return date.",
        relatedPolicies: ["Leave Balance Policy", "Unpaid Leave Guidelines"]
      }
    ],

    tasks: [
      {
        id: "submit-leave-request",
        name: "Submit leave request",
        stage: "Request Submission",
        assignedTo: "Employee",
        system: "BambooHR",
        whatToDo: "Log in to BambooHR and submit a leave request. Select leave type, start date, end date, and add any notes.",
        whereToDo: "BambooHR → Time Off → Request",
        whoToNotify: "Direct Manager (automatic from system)",
        suggestedMessage: "Hi [Manager], I've submitted a leave request for [dates]. Please let me know if you need any handover from my side.",
        evidenceRequired: "BambooHR submission confirmation",
        whatHappensNext: "Manager receives notification and has 48h to respond",
        sla: "Submit at least 5 business days in advance (except emergencies)",
        hitl: false
      },
      {
        id: "approve-reject-leave",
        name: "Approve or reject leave",
        stage: "Manager Approval",
        assignedTo: "Manager",
        system: "BambooHR",
        whatToDo: "Review the leave request. Check team calendar for conflicts. Approve or reject with a written reason.",
        whereToDo: "BambooHR → Time Off → Pending Requests",
        whoToNotify: "Employee + HR Manager",
        suggestedMessage: "Hi [Employee], your leave request for [dates] has been [approved/rejected]. [Reason if rejected].",
        evidenceRequired: "Approved or rejected status in BambooHR with timestamp",
        whatHappensNext: "HR registers the leave and updates the calendar",
        sla: "Within 48 hours of request submission",
        hitl: true
      },
      {
        id: "register-leave",
        name: "Register leave in HR system",
        stage: "Registration & Tracking",
        assignedTo: "HR Manager",
        system: "BambooHR / Google Calendar",
        whatToDo: "Confirm the approved leave is reflected in BambooHR. Update the company-wide calendar. Notify payroll if leave is unpaid.",
        whereToDo: "BambooHR → Time Off + Google Calendar",
        whoToNotify: "Accountant (Francisco) if unpaid leave",
        suggestedMessage: "Leave registered for [Employee] — [dates]. Balance updated.",
        evidenceRequired: "Calendar event created + balance deducted in BambooHR",
        whatHappensNext: "Leave goes Active on start date",
        sla: "Within 24h of manager approval",
        hitl: false
      },
      {
        id: "confirm-return",
        name: "Confirm employee return",
        stage: "Registration & Tracking",
        assignedTo: "HR Manager",
        system: "BambooHR",
        whatToDo: "On the employee's return date, confirm they are back. Mark the leave record as closed in BambooHR.",
        whereToDo: "BambooHR → Time Off → Active Leaves",
        whoToNotify: "Manager",
        suggestedMessage: "[Employee] has returned from leave. Record closed.",
        evidenceRequired: "Leave status updated to Returned in BambooHR",
        whatHappensNext: "Process closed. No further action.",
        sla: "Same day as return date",
        hitl: false
      }
    ]
  },


  // ─────────────────────────────────────────
  // PROCESS 6: PERFORMANCE REVIEW
  // ─────────────────────────────────────────
  {
    id: "performance-review",
    name: "Performance Review",
    domain: "HR",
    description: "Structured performance evaluation cycle including self-assessment, manager review, calibration, and goal setting.",
    stateCount: 7,
    currentState: "not-started",
    sla: "Full cycle completed within 30 days of cycle open",
    hitl: true,
    hitlStage: "calibration",
    system: "BambooHR / Google Docs",
    owner: "HR + Direct Manager",

    states: [
      { id: "not-started",       label: "Not Started",       description: "Review cycle open but employee not yet started." },
      { id: "self-assessment",   label: "Self-Assessment",   description: "Employee completing their own review." },
      { id: "manager-review",    label: "Manager Review",    description: "Manager reviewing and scoring." },
      { id: "calibration",       label: "Calibration",       description: "HR and leadership aligning on ratings. HITL." },
      { id: "feedback-delivered",label: "Feedback Delivered",description: "Manager held feedback meeting with employee." },
      { id: "goals-set",         label: "Goals Set",         description: "Next-period goals agreed and documented." },
      { id: "closed",            label: "Closed",            description: "Review cycle complete and archived." }
    ],

    transitions: [
      { from: "not-started",        to: "self-assessment",    event: "cycle_opened",         condition: "HR opens review cycle and notifies employees" },
      { from: "self-assessment",    to: "manager-review",     event: "self_assessment_done",  condition: "Employee submits self-assessment" },
      { from: "manager-review",     to: "calibration",        event: "manager_review_done",   condition: "Manager submits scoring" },
      { from: "calibration",        to: "feedback-delivered", event: "calibration_approved",  condition: "Leadership aligns on ratings — HITL" },
      { from: "feedback-delivered", to: "goals-set",          event: "feedback_meeting_held", condition: "Manager confirms meeting occurred" },
      { from: "goals-set",          to: "closed",             event: "goals_documented",      condition: "Goals recorded in system" }
    ],

    departments: [
      {
        id: "hr",
        name: "HR",
        icon: "◐",
        color: "hr",
        stage: "Cycle Management",
        responsibilities: [
          "Open review cycle and set deadlines",
          "Send communication to all employees and managers",
          "Monitor completion rates by department",
          "Run calibration session with leadership",
          "Archive all reviews once cycle closes"
        ],
        systemsUsed: ["BambooHR", "Google Docs", "Email"],
        notifies: ["All employees", "All managers", "CEO / Leadership"],
        whatHappensAfter: "Cycle closes, results archived, compensation recommendations flagged.",
        relatedPolicies: ["Performance Management Policy", "Compensation Review Policy"]
      },
      {
        id: "employee",
        name: "Employee",
        icon: "◉",
        color: "user",
        stage: "Self-Assessment",
        responsibilities: [
          "Complete self-assessment form honestly and on time",
          "Highlight key achievements and areas for growth",
          "Propose goals for the next review period"
        ],
        systemsUsed: ["BambooHR", "Google Docs"],
        notifies: ["Direct Manager (automatic on submission)"],
        whatHappensAfter: "Manager receives self-assessment and begins their review.",
        relatedPolicies: ["Performance Management Policy"]
      },
      {
        id: "manager",
        name: "Manager",
        icon: "⊞",
        color: "manager",
        stage: "Manager Review & Feedback",
        responsibilities: [
          "Read employee self-assessment before scoring",
          "Score employee on agreed competencies and objectives",
          "Submit review to HR for calibration",
          "Hold structured feedback meeting with employee",
          "Document agreed goals for next period"
        ],
        systemsUsed: ["BambooHR", "Google Docs", "Calendar"],
        notifies: ["HR Manager", "Employee"],
        whatHappensAfter: "Goals documented in system. Record moves to Closed.",
        relatedPolicies: ["Feedback Guidelines", "Goal Setting Framework"]
      }
    ],

    tasks: [
      {
        id: "open-review-cycle",
        name: "Open review cycle",
        stage: "Cycle Management",
        assignedTo: "HR Manager",
        system: "BambooHR",
        whatToDo: "Open the performance review cycle in BambooHR. Set start and end dates. Send communication to all employees and managers with instructions and deadline.",
        whereToDo: "BambooHR → Performance → Cycles",
        whoToNotify: "All employees + all managers",
        suggestedMessage: "The [Q/Annual] performance review cycle is now open. Please complete your self-assessment by [date]. Instructions attached.",
        evidenceRequired: "Cycle opened in system with correct dates and all participants added",
        whatHappensNext: "Employees begin self-assessments",
        sla: "Day 1 of review cycle",
        hitl: false
      },
      {
        id: "complete-self-assessment",
        name: "Complete self-assessment",
        stage: "Self-Assessment",
        assignedTo: "Employee",
        system: "BambooHR / Google Docs",
        whatToDo: "Complete the self-assessment form. Reflect on achievements, challenges, and areas for growth. Propose 3–5 goals for the next period.",
        whereToDo: "BambooHR → Performance → My Review",
        whoToNotify: "Direct Manager (on submission)",
        suggestedMessage: "Hi [Manager], I've submitted my self-assessment for this cycle. Happy to discuss before your review.",
        evidenceRequired: "Self-assessment submitted and locked in BambooHR",
        whatHappensNext: "Manager begins their review",
        sla: "Within 7 days of cycle opening",
        hitl: false
      },
      {
        id: "complete-manager-review",
        name: "Complete manager review",
        stage: "Manager Review & Feedback",
        assignedTo: "Manager",
        system: "BambooHR",
        whatToDo: "Review the employee's self-assessment. Score each competency. Add written comments. Submit to HR for calibration.",
        whereToDo: "BambooHR → Performance → Team Reviews",
        whoToNotify: "HR Manager (on submission)",
        suggestedMessage: "Hi [HR], I've submitted my review for [Employee]. Ready for calibration.",
        evidenceRequired: "Manager review submitted in BambooHR with scores and comments",
        whatHappensNext: "HR schedules calibration session",
        sla: "Within 7 days of receiving self-assessment",
        hitl: false
      },
      {
        id: "run-calibration",
        name: "Run calibration session",
        stage: "Cycle Management",
        assignedTo: "HR Manager",
        system: "Google Meet / Google Docs",
        whatToDo: "Facilitate calibration meeting with department heads and leadership. Align on final ratings, flag outliers, and ensure consistency across the organization.",
        whereToDo: "Google Meet + calibration spreadsheet",
        whoToNotify: "All managers + leadership",
        suggestedMessage: "Calibration session scheduled for [date/time]. Please review your team's draft ratings beforehand.",
        evidenceRequired: "Calibration spreadsheet with final agreed ratings signed off by HR and leadership (HITL)",
        whatHappensNext: "Managers notified of final ratings and instructed to schedule feedback meetings",
        sla: "Within 5 days of all manager reviews submitted",
        hitl: true
      },
      {
        id: "hold-feedback-meeting",
        name: "Hold feedback meeting",
        stage: "Manager Review & Feedback",
        assignedTo: "Manager",
        system: "Google Calendar / Google Meet",
        whatToDo: "Schedule and hold a 1:1 meeting with the employee. Share final rating, specific feedback, and discuss proposed goals. Be constructive and forward-focused.",
        whereToDo: "In person or Google Meet",
        whoToNotify: "HR Manager (confirm meeting held)",
        suggestedMessage: "Hi [HR], feedback meeting with [Employee] held on [date]. Goals being documented now.",
        evidenceRequired: "Meeting confirmed in BambooHR + employee acknowledgement",
        whatHappensNext: "Goals documented in system",
        sla: "Within 5 days of calibration",
        hitl: false
      },
      {
        id: "document-goals",
        name: "Document goals for next period",
        stage: "Manager Review & Feedback",
        assignedTo: "Manager + Employee",
        system: "BambooHR / Google Docs",
        whatToDo: "Record 3–5 agreed SMART goals for the next review period. Both manager and employee confirm in the system.",
        whereToDo: "BambooHR → Performance → Goals",
        whoToNotify: "HR Manager",
        suggestedMessage: "Goals documented and confirmed by both parties for [Employee].",
        evidenceRequired: "Goals visible in BambooHR, confirmed by both manager and employee",
        whatHappensNext: "HR closes the review cycle. Record archived.",
        sla: "Within 2 days of feedback meeting",
        hitl: false
      }
    ]
  },


  // ─────────────────────────────────────────
  // PROCESS 7: TRAINING & DEVELOPMENT
  // ─────────────────────────────────────────
  {
    id: "training-development",
    name: "Training & Development",
    domain: "HR",
    description: "Training need identification through enrollment, completion, and certification recording.",
    stateCount: 5,
    currentState: "identified",
    sla: "Enrollment within 5 business days of approval",
    hitl: false,
    hitlStage: null,
    system: "LMS / BambooHR",
    owner: "HR + Employee + Manager",

    states: [
      { id: "identified", label: "Identified",  description: "Training need raised by employee, manager, or HR." },
      { id: "enrolled",   label: "Enrolled",    description: "Employee enrolled in the training program." },
      { id: "in-progress",label: "In Progress", description: "Employee currently attending or completing training." },
      { id: "completed",  label: "Completed",   description: "Training finished. Awaiting certification." },
      { id: "certified",  label: "Certified",   description: "Certification recorded. Record closed." }
    ],

    transitions: [
      { from: "identified",  to: "enrolled",    event: "enrollment_confirmed", condition: "Manager approves + employee enrolled in LMS" },
      { from: "enrolled",    to: "in-progress", event: "training_started",     condition: "Training start date reached" },
      { from: "in-progress", to: "completed",   event: "training_finished",    condition: "Employee marks complete in LMS" },
      { from: "completed",   to: "certified",   event: "certificate_uploaded", condition: "Certificate uploaded to BambooHR" },
      { from: "identified",  to: "identified",  event: "resubmitted",          condition: "Different program selected" }
    ],

    departments: [
      {
        id: "employee",
        name: "Employee",
        icon: "◉",
        color: "user",
        stage: "Request & Completion",
        responsibilities: [
          "Identify training needs based on role or development goals",
          "Submit training request with program details and cost",
          "Complete training within agreed timeline",
          "Upload certificate or proof of completion"
        ],
        systemsUsed: ["BambooHR", "LMS", "Email"],
        notifies: ["Direct Manager"],
        whatHappensAfter: "Manager approves and HR enrolls the employee.",
        relatedPolicies: ["Learning & Development Policy", "Training Budget Policy"]
      },
      {
        id: "manager",
        name: "Manager",
        icon: "⊞",
        color: "manager",
        stage: "Approval",
        responsibilities: [
          "Review training request for relevance and budget",
          "Approve or reject with reason",
          "Confirm employee availability for training dates"
        ],
        systemsUsed: ["Email", "BambooHR"],
        notifies: ["HR Manager", "Employee"],
        whatHappensAfter: "HR proceeds with enrollment and scheduling.",
        relatedPolicies: ["Training Approval Guidelines", "Budget Policy"]
      },
      {
        id: "hr",
        name: "HR",
        icon: "◐",
        color: "hr",
        stage: "Enrollment & Record",
        responsibilities: [
          "Enroll employee in LMS or coordinate external provider",
          "Track training completion and deadlines",
          "Record certification in employee file",
          "Update training log for compliance reporting"
        ],
        systemsUsed: ["LMS", "BambooHR", "Google Drive"],
        notifies: ["Employee", "Manager", "Compliance team if required"],
        whatHappensAfter: "Training record archived. Development log updated.",
        relatedPolicies: ["Compliance Training Policy", "Certification Records Policy"]
      }
    ],

    tasks: [
      {
        id: "submit-training-request",
        name: "Submit training request",
        stage: "Request & Completion",
        assignedTo: "Employee",
        system: "BambooHR / Email",
        whatToDo: "Submit a training request with program name, provider, cost, dates, and how it relates to your role.",
        whereToDo: "BambooHR → Training → Request OR email to manager",
        whoToNotify: "Direct Manager",
        suggestedMessage: "Hi [Manager], I'd like to request enrollment in [Program Name] offered by [Provider]. Cost: [amount]. Dates: [dates]. It will help me develop [skill]. Please let me know if you approve.",
        evidenceRequired: "Training request submitted with program details",
        whatHappensNext: "Manager reviews and approves or rejects",
        sla: "No fixed SLA — submit as need arises",
        hitl: false
      },
      {
        id: "approve-training",
        name: "Approve training request",
        stage: "Approval",
        assignedTo: "Manager",
        system: "Email / BambooHR",
        whatToDo: "Review the training request. Assess relevance, cost, and timing. Approve or reject with clear feedback.",
        whereToDo: "BambooHR → Training → Pending Approvals OR email reply",
        whoToNotify: "HR Manager + Employee",
        suggestedMessage: "Hi [HR], [Employee]'s training request for [Program] is approved. Please proceed with enrollment.",
        evidenceRequired: "Approval confirmation in BambooHR or email",
        whatHappensNext: "HR enrolls employee and sets up access",
        sla: "Within 3 business days of request",
        hitl: false
      },
      {
        id: "enroll-employee",
        name: "Enroll employee in program",
        stage: "Enrollment & Record",
        assignedTo: "HR Manager",
        system: "LMS / Provider Portal",
        whatToDo: "Enroll the employee in the LMS or contact the external provider. Confirm access, dates, and any materials needed.",
        whereToDo: "LMS Admin → Add Learner OR external provider enrollment portal",
        whoToNotify: "Employee",
        suggestedMessage: "Hi [Employee], you're now enrolled in [Program]. Access details: [link/instructions]. Start date: [date].",
        evidenceRequired: "Enrollment confirmation from LMS or provider",
        whatHappensNext: "Employee begins training on start date",
        sla: "Within 5 business days of manager approval",
        hitl: false
      },
      {
        id: "complete-training",
        name: "Complete training",
        stage: "Request & Completion",
        assignedTo: "Employee",
        system: "LMS",
        whatToDo: "Attend and complete all required modules or sessions. Pass any assessments required.",
        whereToDo: "LMS → My Courses OR external training venue",
        whoToNotify: "HR Manager (on completion)",
        suggestedMessage: "Hi [HR], I've completed [Program Name]. Certificate attached.",
        evidenceRequired: "LMS completion record OR certificate from provider",
        whatHappensNext: "HR records certification in employee file",
        sla: "Per program timeline agreed at enrollment",
        hitl: false
      },
      {
        id: "record-certification",
        name: "Record certification",
        stage: "Enrollment & Record",
        assignedTo: "HR Manager",
        system: "BambooHR / Google Drive",
        whatToDo: "Upload certificate to employee file in BambooHR. Update training log. Mark record as Certified and closed.",
        whereToDo: "BambooHR → Employee File → Documents",
        whoToNotify: "Manager",
        suggestedMessage: "Training record for [Employee] — [Program] is now certified and archived.",
        evidenceRequired: "Certificate uploaded in BambooHR with date",
        whatHappensNext: "Process closed. Training log updated.",
        sla: "Within 2 business days of completion",
        hitl: false
      }
    ]
  },


  // ─────────────────────────────────────────
  // PROCESS 8: DISCIPLINARY ACTION
  // ─────────────────────────────────────────
  {
    id: "disciplinary-action",
    name: "Disciplinary Action",
    domain: "HR",
    description: "Structured disciplinary process from incident report through investigation, formal action, legal review, and resolution.",
    stateCount: 6,
    currentState: "reported",
    sla: "Initial HR response within 24 hours of incident report",
    hitl: true,
    hitlStage: "legal-review",
    system: "Internal Document System / Legal Files",
    owner: "HR Manager + Legal (Enrique)",

    states: [
      { id: "reported",          label: "Reported",           description: "Incident formally reported to HR." },
      { id: "under-investigation",label: "Under Investigation",description: "HR gathering facts and interviewing parties." },
      { id: "warning-issued",    label: "Warning Issued",     description: "Verbal or written warning issued to employee." },
      { id: "legal-review",      label: "Legal Review",       description: "Case escalated for legal review. HITL required." },
      { id: "resolved",          label: "Resolved",           description: "Disciplinary process concluded." },
      { id: "archived",          label: "Archived",           description: "All records stored and case closed." }
    ],

    transitions: [
      { from: "reported",           to: "under-investigation",  event: "investigation_opened",   condition: "HR acknowledges report and opens case" },
      { from: "under-investigation",to: "warning-issued",       event: "warning_issued",         condition: "HR determines warning is appropriate action" },
      { from: "under-investigation",to: "legal-review",         event: "escalated_to_legal",     condition: "Severity requires legal input" },
      { from: "warning-issued",     to: "legal-review",         event: "further_action_needed",  condition: "Behavior continues or severity escalates" },
      { from: "warning-issued",     to: "resolved",             event: "case_resolved",          condition: "Employee acknowledges warning, issue resolved" },
      { from: "legal-review",       to: "resolved",             event: "legal_decision_made",    condition: "Legal team provides guidance — HITL" },
      { from: "resolved",           to: "archived",             event: "records_archived",       condition: "All documentation stored per policy" }
    ],

    departments: [
      {
        id: "hr",
        name: "HR",
        icon: "◐",
        color: "hr",
        stage: "Investigation & Action",
        responsibilities: [
          "Acknowledge incident report within 24 hours",
          "Open formal case and assign case number",
          "Interview all relevant parties confidentially",
          "Document findings objectively",
          "Determine appropriate action (warning, suspension, termination)",
          "Issue formal warning letter if applicable",
          "Archive all records upon resolution"
        ],
        systemsUsed: ["Internal Document System", "Email", "BambooHR"],
        notifies: ["Legal (Enrique) if escalation needed", "CEO if severe", "Involved parties"],
        whatHappensAfter: "Case resolved with documented outcome. Records archived per retention policy.",
        relatedPolicies: ["Disciplinary Policy", "Code of Conduct", "Confidentiality Policy"]
      },
      {
        id: "legal",
        name: "Legal",
        icon: "⚖",
        color: "legal",
        stage: "Legal Review",
        responsibilities: [
          "Review case facts and HR's proposed action",
          "Assess legal risk and compliance with labor law",
          "Provide written legal recommendation",
          "Draft or review termination letters if applicable",
          "Advise on next steps"
        ],
        systemsUsed: ["Legal Document System", "Email"],
        notifies: ["HR Manager", "CEO if termination involved"],
        whatHappensAfter: "HR implements legal recommendation and closes the case.",
        relatedPolicies: ["Labor Law Compliance", "Termination Guidelines", "Legal Hold Policy"]
      },
      {
        id: "manager",
        name: "Manager",
        icon: "⊞",
        color: "manager",
        stage: "Reporting & Support",
        responsibilities: [
          "Report incident to HR immediately and objectively",
          "Provide any documentation or evidence",
          "Cooperate with HR investigation without bias",
          "Implement HR decision regarding the employee"
        ],
        systemsUsed: ["Email", "Internal Document System"],
        notifies: ["HR Manager"],
        whatHappensAfter: "Manager informed of outcome and next steps for their team.",
        relatedPolicies: ["Manager Responsibilities Policy", "Code of Conduct"]
      }
    ],

    tasks: [
      {
        id: "report-incident",
        name: "Report incident to HR",
        stage: "Reporting & Support",
        assignedTo: "Manager or Employee",
        system: "Email / Internal Form",
        whatToDo: "Submit a formal incident report to HR describing what happened, when, who was involved, and any witnesses or evidence available.",
        whereToDo: "Email to HR Manager OR internal incident report form",
        whoToNotify: "HR Manager",
        suggestedMessage: "I'm formally reporting an incident that occurred on [date] involving [party]. Details: [summary]. Please advise on next steps.",
        evidenceRequired: "Written incident report with date, parties, and description",
        whatHappensNext: "HR acknowledges within 24h and opens formal case",
        sla: "Report submitted as soon as incident occurs",
        hitl: false
      },
      {
        id: "open-case",
        name: "Open formal case",
        stage: "Investigation & Action",
        assignedTo: "HR Manager",
        system: "Internal Document System",
        whatToDo: "Acknowledge the report. Assign a case number. Notify the involved parties that an investigation is underway. Begin document trail.",
        whereToDo: "Internal Document System → New Disciplinary Case",
        whoToNotify: "Involved parties + their manager + Legal (Enrique) if severity warrants",
        suggestedMessage: "We have received your report and opened case [#ID]. An investigation is underway. All parties will be contacted individually. This process is strictly confidential.",
        evidenceRequired: "Case file created with case number, date, and parties listed",
        whatHappensNext: "HR conducts interviews and gathers evidence",
        sla: "Within 24 hours of incident report",
        hitl: false
      },
      {
        id: "conduct-investigation",
        name: "Conduct investigation",
        stage: "Investigation & Action",
        assignedTo: "HR Manager",
        system: "Internal Document System / Email",
        whatToDo: "Interview all relevant parties separately. Collect any evidence (emails, logs, witness statements). Document findings objectively. Do not share information between parties during investigation.",
        whereToDo: "In person or video call + internal document system",
        whoToNotify: "No external parties during investigation",
        suggestedMessage: "We'd like to schedule a confidential interview with you as part of our investigation. This is standard procedure.",
        evidenceRequired: "Signed interview notes from each party + evidence inventory",
        whatHappensNext: "HR determines appropriate action based on findings",
        sla: "Investigation completed within 5 business days",
        hitl: false
      },
      {
        id: "issue-warning",
        name: "Issue formal warning",
        stage: "Investigation & Action",
        assignedTo: "HR Manager",
        system: "Internal Document System",
        whatToDo: "Draft and issue a formal verbal or written warning letter. Include: nature of the issue, expected behavior change, consequences if behavior continues, and signature from both employee and HR.",
        whereToDo: "Internal Document System → Warning Letter Template",
        whoToNotify: "Employee + their Manager + Legal if written warning",
        suggestedMessage: "Following our investigation of case [#ID], we are issuing a formal [verbal/written] warning. Details are outlined in the attached letter.",
        evidenceRequired: "Signed warning letter filed in employee record",
        whatHappensNext: "Case monitored. If resolved, move to Resolved. If behavior continues, escalate.",
        sla: "Issued within 2 business days of investigation conclusion",
        hitl: false
      },
      {
        id: "legal-review",
        name: "Legal review and recommendation",
        stage: "Legal Review",
        assignedTo: "Legal (Enrique)",
        system: "Legal Document System / Email",
        whatToDo: "Review the full case file, investigation findings, and proposed HR action. Assess legal compliance. Provide written recommendation on appropriate course of action.",
        whereToDo: "Legal Document System + case file review",
        whoToNotify: "HR Manager + CEO (if termination or serious legal risk)",
        suggestedMessage: "Legal review of case [#ID] complete. Recommendation: [action]. Written guidance attached.",
        evidenceRequired: "Written legal recommendation signed by legal counsel (HITL checkpoint)",
        whatHappensNext: "HR implements legal recommendation and moves case to Resolved",
        sla: "Legal recommendation within 3 business days of escalation",
        hitl: true
      },
      {
        id: "close-and-archive",
        name: "Close case and archive records",
        stage: "Investigation & Action",
        assignedTo: "HR Manager",
        system: "BambooHR / Internal Document System",
        whatToDo: "Document the final resolution. File all records (incident report, interview notes, warning letters, legal recommendation) in the employee file and case archive. Update employee record in BambooHR.",
        whereToDo: "BambooHR → Employee File + Internal Document Archive",
        whoToNotify: "Involved manager",
        suggestedMessage: "Case [#ID] is now closed and archived. Outcome: [summary]. All records filed per retention policy.",
        evidenceRequired: "All documents filed. Case marked Archived in system.",
        whatHappensNext: "No further action unless behavior recurs.",
        sla: "Within 2 business days of resolution",
        hitl: false
      }
    ]
  }

];

// ============================================================
// EXPORT — adapt to your module system as needed
// If your demo uses ES modules:
//   export default hrProcesses;
// If your demo uses a global variable pattern:
//   window.hrProcesses = hrProcesses;
// If your demo uses CommonJS:
//   module.exports = hrProcesses;
// ============================================================

// Example: if your existing processes live in a const called
// `allProcesses`, merge like this:
//   const allProcesses = [...existingProcesses, ...hrProcesses];
