'use strict';

/* ═══════════════════════════════════════════════
   1. DOMAINS
   ─────────────────────────────────────────────
   ➕ ADD NEW DOMAIN: copy one entry before the ];
═══════════════════════════════════════════════ */
const DOMAINS = [
  { id:'operations',  name:'Operations',      icon:'⚙', color:'#4f9cf9' },
  { id:'hr',          name:'Human Resources', icon:'◐', color:'#a78bfa' },
  { id:'finance',     name:'Finance',         icon:'◈', color:'#34d399' },
  { id:'procurement', name:'Procurement',     icon:'◉', color:'#fb923c' },
  // ➕ new domain here
];

/* ═══════════════════════════════════════════════
   2. PROCESSES
   ─────────────────────────────────────────────
   Stage ID convention: {prefix}-{stage}
   Prefixes: laptop- equip- onboard- offboard-
             vendor- billing- pr-
   ➕ ADD NEW PROCESS: copy one block before the ];
      Then add its stage entries to STAGES.
═══════════════════════════════════════════════ */
const PROCESSES = [
  // ── Operations ──────────────────────────────
  {
    id:'laptop-lifecycle', domain:'operations',
    name:'Laptop Lifecycle',
    description:'Full lifecycle management for employee laptops — from request through procurement, setup, delivery, and eventual decommission.',
    owner:'IT Operations', status:'active', activeCases:8, sla:'10 business days',
    stages:['laptop-req','laptop-approval','laptop-procurement','laptop-setup','laptop-delivery','laptop-in-use','laptop-return'],
  },
  {
    id:'equipment-return', domain:'operations',
    name:'Equipment Return',
    description:'Structured process for collecting and decommissioning equipment from departing employees.',
    owner:'IT Operations', status:'active', activeCases:3, sla:'5 business days',
    stages:['equip-initiation','equip-pickup','equip-assessment','equip-decommission','equip-closed'],
  },
  // ➕ new operations process here
  // ── Human Resources ─────────────────────────
  {
    id:'employee-onboarding', domain:'hr',
    name:'Employee Onboarding',
    description:'End-to-end process from signed offer letter to a fully operational new employee.',
    owner:'Human Resources', status:'active', activeCases:5, sla:'15 business days',
    stages:['onboard-offer','onboard-docs','onboard-it-setup','onboard-orientation','onboard-training','onboard-review','onboard-active'],
  },
  {
    id:'employee-offboarding', domain:'hr',
    name:'Employee Offboarding',
    description:'Managed exit process covering knowledge transfer, access revocation, and final payment.',
    owner:'Human Resources', status:'active', activeCases:2, sla:'7 business days',
    stages:['offboard-notice','offboard-knowledge','offboard-it-revoke','offboard-final-pay','offboard-closed'],
  },
  // ➕ new hr process here
  // ── Finance ─────────────────────────────────
  {
    id:'vendor-onboarding', domain:'finance',
    name:'Vendor Onboarding',
    description:'Compliance and approval process to register a new vendor across all operating countries (PE, CO, US, DO).',
    owner:'Finance / Legal', status:'active', activeCases:4, sla:'20 business days',
    stages:['vendor-req','vendor-due-diligence','vendor-approval','vendor-contract','vendor-active'],
  },
  {
    id:'billing-cycle', domain:'finance',
    name:'Monthly Billing Cycle',
    description:'Monthly process covering invoice generation, review, approval, and payment reconciliation.',
    owner:'Finance', status:'active', activeCases:12, sla:'5 business days',
    stages:['billing-invoice-gen','billing-invoice-review','billing-approval','billing-payment'],
  },
  // ➕ new finance process here
  // ── Procurement ─────────────────────────────
  {
    id:'purchase-request', domain:'procurement',
    name:'Purchase Request',
    description:'Request and approval process for business purchases from approved vendors.',
    owner:'Procurement / Finance', status:'active', activeCases:6, sla:'3 business days',
    stages:['pr-req','pr-approval','pr-po-issuance','pr-receipt'],
  },
  // ➕ new procurement process here
];

/* ═══════════════════════════════════════════════
   3. STAGES
   ─────────────────────────────────────────────
   Keyed by stage ID. All IDs are prefixed with
   their process abbreviation.

   Fields: name, icon, status (done|active|blocked|pending),
           cases (active count — drives badge),
           owner, system, evidence, nextAction,
           tasks (ordered array of TASKS keys)

   ➕ ADD NEW STAGE: add a key-object entry in the
      correct process section, then reference the
      key in PROCESSES.stages above.
═══════════════════════════════════════════════ */
const STAGES = {
  // ── Laptop Lifecycle ────────────────────────
  'laptop-req': {
    name:'Request', icon:'📋', status:'done', cases:0,
    owner:'Employee / Manager', system:'ITSM Portal',
    evidence:'Submitted request form with ticket number',
    nextAction:'Manager reviews and approves the request in ITSM within 1 business day.',
    tasks:['submit-laptop-req','manager-notify-laptop'],
  },
  'laptop-approval': {
    name:'Approval', icon:'✓', status:'done', cases:0,
    owner:'Direct Manager', system:'ITSM Portal',
    evidence:'Approval record in ITSM with manager name and timestamp',
    nextAction:'IT Procurement receives approved ticket to begin purchasing.',
    tasks:['approve-laptop-req','check-budget'],
  },
  'laptop-procurement': {
    name:'Procurement', icon:'🛒', status:'active', cases:3,
    owner:'IT Procurement', system:'ERP / SAP',
    evidence:'Purchase order number linked in ITSM ticket',
    nextAction:'Issue PO to preferred laptop supplier and get delivery confirmation.',
    tasks:['issue-po','vendor-confirm'],
  },
  'laptop-setup': {
    name:'Setup', icon:'⚙', status:'pending', cases:0,
    owner:'IT Operations', system:'MDM / Jamf',
    evidence:'Device serial number logged; enrolled and compliant in MDM',
    nextAction:'Image device, enroll in MDM, and install required applications.',
    tasks:['image-device','enroll-mdm','install-apps'],
  },
  'laptop-delivery': {
    name:'Delivery', icon:'📦', status:'pending', cases:0,
    owner:'IT Operations', system:'ITSM + Shipping Portal',
    evidence:'Shipping tracking number + asset tag in ITSM',
    nextAction:'Generate shipping label, log asset, and notify employee of shipment.',
    tasks:['gen-shipping-label','log-asset','notify-employee'],
  },
  'laptop-in-use': {
    name:'In Use', icon:'💻', status:'pending', cases:0,
    owner:'Employee', system:'ITSM Portal',
    evidence:'Employee acceptance form signed in ITSM',
    nextAction:'Employee confirms receipt and signs asset acceptance form.',
    tasks:['employee-accept'],
  },
  'laptop-return': {
    name:'Return', icon:'↩', status:'pending', cases:0,
    owner:'IT Operations', system:'ITSM',
    evidence:'Device returned + ITSM asset record closed',
    nextAction:'Collect device and close asset record in ITSM.',
    tasks:['collect-device','close-asset'],
  },
  // ➕ new laptop-lifecycle stage here

  // ── Equipment Return ────────────────────────
  'equip-initiation': {
    name:'Initiation', icon:'📋', status:'done', cases:0,
    owner:'HR / Manager', system:'ITSM',
    evidence:'Return ticket opened in ITSM',
    nextAction:'HR opens equipment return ticket and assigns to IT Operations.',
    tasks:['open-return-ticket'],
  },
  'equip-pickup': {
    name:'Pickup', icon:'🚚', status:'active', cases:2,
    owner:'IT Operations', system:'ITSM + Logistics',
    evidence:'Pickup confirmation with photo of equipment',
    nextAction:'Schedule and complete equipment pickup from employee address.',
    tasks:['schedule-pickup','confirm-pickup'],
  },
  'equip-assessment': {
    name:'Assessment', icon:'🔍', status:'pending', cases:0,
    owner:'IT Operations', system:'Asset Management',
    evidence:'Condition report attached to ITSM ticket',
    nextAction:'Assess device condition and update asset record accordingly.',
    tasks:['assess-condition','update-asset'],
  },
  'equip-decommission': {
    name:'Decommission', icon:'🗑', status:'pending', cases:0,
    owner:'IT Operations', system:'MDM + ITSM',
    evidence:'Wipe certificate and MDM removal confirmation',
    nextAction:'Wipe device data, remove from MDM, update disposal record.',
    tasks:['wipe-device','remove-mdm'],
  },
  'equip-closed': {
    name:'Closed', icon:'✓', status:'pending', cases:0,
    owner:'IT Operations', system:'ITSM',
    evidence:'Closed ITSM ticket',
    nextAction:'Close ITSM ticket and archive asset record.',
    tasks:['close-ticket-eq'],
  },
  // ➕ new equipment-return stage here

  // ── Employee Onboarding ─────────────────────
  'onboard-offer': {
    name:'Offer Accepted', icon:'🤝', status:'done', cases:0,
    owner:'HR', system:'HRIS / Workday',
    evidence:'Signed offer letter on file',
    nextAction:'HR creates employee record in HRIS and sends welcome email.',
    tasks:['create-emp-record','send-welcome'],
  },
  'onboard-docs': {
    name:'Documents', icon:'📄', status:'done', cases:0,
    owner:'HR / Legal', system:'DocuSign + HRIS',
    evidence:'All contracts and ID documents collected and validated',
    nextAction:'Employee completes and returns all required documentation.',
    tasks:['send-contracts','collect-id','tax-forms'],
  },
  'onboard-it-setup': {
    name:'IT Setup', icon:'💻', status:'active', cases:1,
    owner:'IT Operations', system:'ITSM + AD + MDM',
    evidence:'AD account created, laptop enrolled, credentials delivered to employee',
    nextAction:'Create AD account, provision laptop, and deliver credentials before start date.',
    tasks:['create-ad-account','provision-laptop','setup-email','deliver-credentials'],
  },
  'onboard-orientation': {
    name:'Orientation', icon:'🗺', status:'pending', cases:0,
    owner:'HR', system:'LMS / Calendly',
    evidence:'Orientation attendance confirmed in LMS',
    nextAction:'Schedule and conduct first-day orientation session.',
    tasks:['schedule-orientation','conduct-orientation'],
  },
  'onboard-training': {
    name:'Training', icon:'📚', status:'pending', cases:0,
    owner:'HR + Manager', system:'LMS',
    evidence:'Training completion certificate in LMS',
    nextAction:'Employee completes mandatory onboarding training modules.',
    tasks:['assign-training','complete-training'],
  },
  'onboard-review': {
    name:'30-Day Review', icon:'📊', status:'pending', cases:0,
    owner:'Manager', system:'HRIS',
    evidence:'Completed review form submitted in HRIS',
    nextAction:'Manager schedules and completes the 30-day check-in with the employee.',
    tasks:['schedule-review','submit-review'],
  },
  'onboard-active': {
    name:'Active', icon:'✓', status:'pending', cases:0,
    owner:'HR', system:'HRIS',
    evidence:'Employee status set to Active in HRIS',
    nextAction:'HR confirms all steps are complete and sets employee status to Active.',
    tasks:['confirm-active'],
  },
  // ➕ new employee-onboarding stage here

  // ── Employee Offboarding ────────────────────
  'offboard-notice': {
    name:'Notice', icon:'📋', status:'done', cases:0,
    owner:'HR / Manager', system:'HRIS',
    evidence:'Resignation letter on file in HRIS',
    nextAction:'HR logs notice date and initiates offboarding checklist.',
    tasks:['log-notice','initiate-checklist'],
  },
  'offboard-knowledge': {
    name:'Knowledge Transfer', icon:'🔄', status:'active', cases:2,
    owner:'Employee + Manager', system:'Confluence / Drive',
    evidence:'Handover documentation complete and approved by manager',
    nextAction:'Employee documents all active projects and completes knowledge handoff.',
    tasks:['document-projects','handoff-meeting'],
  },
  'offboard-it-revoke': {
    name:'IT Revoke', icon:'🔒', status:'blocked', cases:1,
    owner:'IT Operations', system:'AD + MDM + All Systems',
    evidence:'Access revocation checklist signed by IT Manager',
    nextAction:"IT revokes ALL system access on the employee's last working day.",
    tasks:['revoke-ad','revoke-systems','collect-equipment'],
  },
  'offboard-final-pay': {
    name:'Final Payment', icon:'💰', status:'pending', cases:0,
    owner:'Finance / HR', system:'HRIS + Payroll',
    evidence:'Final payslip issued and confirmed',
    nextAction:'Finance processes final payroll including all accruals and deductions.',
    tasks:['calculate-final-pay','process-payroll'],
  },
  'offboard-closed': {
    name:'Closed', icon:'✓', status:'pending', cases:0,
    owner:'HR', system:'HRIS',
    evidence:'Employee status set to Inactive in HRIS',
    nextAction:'HR marks employee as Inactive and archives all records.',
    tasks:['close-employee-record'],
  },
  // ➕ new employee-offboarding stage here

  // ── Vendor Onboarding ───────────────────────
  'vendor-req': {
    name:'Request', icon:'📋', status:'done', cases:0,
    owner:'Requesting Area', system:'Internal Portal',
    evidence:'Vendor request form with business justification',
    nextAction:'Submit vendor request with full justification to Finance team.',
    tasks:['submit-vendor-req'],
  },
  'vendor-due-diligence': {
    name:'Due Diligence', icon:'🔍', status:'active', cases:1,
    owner:'Finance / Legal', system:'Compliance Portal',
    evidence:'KYC docs validated + compliance check passed certificate',
    nextAction:'Collect and validate vendor compliance documents for each operating country.',
    tasks:['collect-kyc','compliance-check','legal-review'],
  },
  'vendor-approval': {
    name:'Approval', icon:'✓', status:'pending', cases:0,
    owner:'Finance Director', system:'ERP + Email',
    evidence:'Director approval email on record',
    nextAction:'Finance Director reviews and formally approves vendor registration.',
    tasks:['director-approval'],
  },
  'vendor-contract': {
    name:'Contract', icon:'📄', status:'pending', cases:0,
    owner:'Legal', system:'DocuSign',
    evidence:'Fully signed contract uploaded to DocuSign',
    nextAction:'Legal sends contract, negotiates terms, and obtains final signatures.',
    tasks:['draft-contract','sign-contract'],
  },
  'vendor-active': {
    name:'Active', icon:'✓', status:'pending', cases:0,
    owner:'Finance', system:'ERP / SAP',
    evidence:'Vendor master record created and verified in ERP',
    nextAction:'Create vendor master record in ERP and notify the requesting area.',
    tasks:['create-vendor-record','notify-area'],
  },
  // ➕ new vendor-onboarding stage here

  // ── Monthly Billing Cycle ───────────────────
  'billing-invoice-gen': {
    name:'Invoice Generation', icon:'📃', status:'active', cases:4,
    owner:'Finance', system:'ERP / SAP',
    evidence:'Invoice batch report with count and total',
    nextAction:'Run monthly invoice generation batch in ERP for all active clients.',
    tasks:['run-invoice-batch','review-exceptions'],
  },
  'billing-invoice-review': {
    name:'Review', icon:'🔍', status:'pending', cases:2,
    owner:'Finance Analyst', system:'ERP',
    evidence:'Reviewed invoice list with analyst sign-off',
    nextAction:'Finance analyst reviews each invoice for accuracy before approval.',
    tasks:['review-invoices','flag-exceptions'],
  },
  'billing-approval': {
    name:'Approval', icon:'✓', status:'pending', cases:0,
    owner:'Finance Manager', system:'ERP + Email',
    evidence:'Batch approval on record with manager name and timestamp',
    nextAction:'Finance Manager approves the full invoice batch for dispatch to clients.',
    tasks:['approve-batch'],
  },
  'billing-payment': {
    name:'Payment', icon:'💳', status:'pending', cases:1,
    owner:'Finance', system:'Banking / ERP',
    evidence:'Payment confirmation receipts reconciled in ERP',
    nextAction:'Process incoming payments and reconcile against bank statement.',
    tasks:['process-payments','reconcile'],
  },
  // ➕ new billing-cycle stage here

  // ── Purchase Request ────────────────────────
  'pr-req': {
    name:'Request', icon:'📋', status:'done', cases:0,
    owner:'Requesting Employee', system:'ERP / Internal Portal',
    evidence:'Purchase request form submitted in ERP',
    nextAction:'Submit purchase request with vendor, amount, and business justification.',
    tasks:['submit-pr'],
  },
  'pr-approval': {
    name:'Approval', icon:'✓', status:'active', cases:3,
    owner:'Manager + Finance', system:'ERP',
    evidence:'Dual approval recorded in ERP',
    nextAction:'Manager and Finance both approve the purchase request within 24 hours.',
    tasks:['manager-approve-pr','finance-approve-pr'],
  },
  'pr-po-issuance': {
    name:'PO Issuance', icon:'📄', status:'pending', cases:1,
    owner:'Procurement', system:'ERP / SAP',
    evidence:'Purchase order number issued and sent to vendor',
    nextAction:'Procurement issues official PO to the approved vendor.',
    tasks:['issue-po-pr'],
  },
  'pr-receipt': {
    name:'Receipt', icon:'✓', status:'pending', cases:0,
    owner:'Requesting Employee', system:'ERP',
    evidence:'Goods receipt confirmed in ERP',
    nextAction:'Employee confirms receipt of goods and closes the purchase request in ERP.',
    tasks:['confirm-receipt'],
  },
  // ➕ new purchase-request stage here
};

/* ═══════════════════════════════════════════════
   4. TASKS
   ─────────────────────────────────────────────
   Keyed by task ID. Referenced from STAGES.tasks.
   Fields: name, owner, system, status, priority,
           sla, whatToDo, whereToDoIt, evidence,
           suggestedMessage (null if none), nextStep

   ➕ ADD NEW TASK: add a key-object entry in the
      correct process section, then reference the
      key in STAGES.tasks above.
═══════════════════════════════════════════════ */
const TASKS = {
  // ── Laptop Lifecycle ────────────────────────
  'submit-laptop-req': {
    name:'Submit Laptop Request', owner:'Employee', system:'ITSM Portal',
    status:'done', priority:'Normal', sla:'1 day',
    whatToDo:"Log into the ITSM portal and complete the New Hardware Request form. Select \"Laptop\" as equipment type. Include your department, business justification, and preferred specifications from the approved catalog.",
    whereToDoIt:'ITSM Portal → New Request → Hardware → Laptop',
    evidence:'Screenshot of submitted request with ticket number visible',
    suggestedMessage:'Hi [Manager Name], I submitted a laptop request in ITSM (Ticket #[ID]). Could you please review and approve at your earliest convenience? I need it for [Project/Role].',
    nextStep:'Your manager receives an automatic ITSM notification. Approval expected within 1 business day.',
  },
  'manager-notify-laptop': {
    name:'Manager Notification (Automatic)', owner:'System — Automatic', system:'ITSM Portal',
    status:'done', priority:'Low', sla:'Automatic',
    whatToDo:"This step is fully automated. The ITSM system sends an approval notification to the employee's direct manager.",
    whereToDoIt:'Automated — no manual action required',
    evidence:'ITSM notification log', suggestedMessage:null,
    nextStep:'Manager reviews and approves or rejects in ITSM.',
  },
  'approve-laptop-req': {
    name:'Approve Request', owner:'Direct Manager', system:'ITSM Portal',
    status:'done', priority:'High', sla:'1 day',
    whatToDo:'Open the pending approval in ITSM. Review the business justification and confirm the request aligns with department budget. Approve or reject and add a comment.',
    whereToDoIt:'ITSM → My Approvals → [Ticket ID] → Approve / Reject',
    evidence:'Approval recorded in ITSM with manager name and timestamp',
    suggestedMessage:'Approved. Equipment is justified for [role/project]. Please proceed with procurement per standard specifications.',
    nextStep:'IT Procurement receives automatic notification to begin purchasing.',
  },
  'check-budget': {
    name:'Verify Budget Availability', owner:'Finance', system:'ERP / Budget Module',
    status:'done', priority:'Normal', sla:'1 day',
    whatToDo:'Check the department hardware budget in the ERP to confirm funds are available for the requested equipment.',
    whereToDoIt:'ERP → Budget Control → [Department] → Hardware Line',
    evidence:'Budget confirmation note attached to the ITSM ticket', suggestedMessage:null,
    nextStep:'If budget confirmed, procurement proceeds automatically. If insufficient, Finance flags for Director approval.',
  },
  'issue-po': {
    name:'Issue Purchase Order', owner:'IT Procurement', system:'ERP / SAP',
    status:'active', priority:'High', sla:'2 days',
    whatToDo:'Create a purchase order in the ERP for the approved laptop. Use the preferred vendor from the approved catalog. Reference the ITSM ticket number in the PO description field.',
    whereToDoIt:'ERP → Procurement → New PO → Hardware Category',
    evidence:'PO number recorded in ITSM ticket and sent to vendor',
    suggestedMessage:'Hi [Vendor Name], please find attached PO #[Number] for 1x [Laptop Model] for employee [Name]. Delivery required by [Date]. Please confirm receipt and estimated delivery.',
    nextStep:'Vendor confirms order and provides estimated delivery date. Log confirmation in ITSM.',
  },
  'vendor-confirm': {
    name:'Vendor Order Confirmation', owner:'IT Procurement', system:'Email / ERP',
    status:'active', priority:'Normal', sla:'1 day',
    whatToDo:'Follow up with vendor to confirm receipt of PO and obtain estimated delivery date. Log the confirmation in the ITSM ticket.',
    whereToDoIt:'Email vendor contact → Log response in ITSM ticket notes',
    evidence:'Vendor confirmation email attached to ITSM ticket',
    suggestedMessage:'Hi [Vendor], please confirm receipt of PO #[Number] and provide your estimated delivery date to [Office/Employee Address]. If any issues, contact us at [email].',
    nextStep:'Await delivery. Escalate to procurement manager if no vendor response within 24 hours.',
  },
  'image-device': {
    name:'Image Device', owner:'IT Operations', system:'MDM / Deployment Tool',
    status:'pending', priority:'High', sla:'1 day',
    whatToDo:"On receipt of the laptop from the vendor, run the standard OS deployment image using the deployment tool. Apply the standard company configuration profile for the employee's department.",
    whereToDoIt:'IT Lab → Deployment Station → Select Profile → Deploy',
    evidence:'Device serial number logged; imaging completion confirmed in MDM', suggestedMessage:null,
    nextStep:"Enroll device in MDM and install required applications for the employee's role.",
  },
  'enroll-mdm': {
    name:'Enroll in MDM', owner:'IT Operations', system:'Jamf / Intune',
    status:'pending', priority:'High', sla:'1 hour',
    whatToDo:'Enroll the device in the company MDM platform. Assign to the correct employee profile. Verify that all security and compliance policies are applied correctly before proceeding.',
    whereToDoIt:'MDM Console → Devices → Enroll → Assign to [Employee Profile]',
    evidence:'Device shows as enrolled and compliant in MDM dashboard', suggestedMessage:null,
    nextStep:'Install required applications based on employee role.',
  },
  'install-apps': {
    name:'Install Required Applications', owner:'IT Operations', system:'MDM / Software Center',
    status:'pending', priority:'Normal', sla:'2 hours',
    whatToDo:"Deploy all mandatory applications via MDM policy based on the employee's department and role. Verify all apps are installed and properly licensed before shipping.",
    whereToDoIt:'MDM → Devices → [Device] → App Deployment → Apply Role Policy',
    evidence:'App deployment report showing all required apps installed and licensed', suggestedMessage:null,
    nextStep:'Generate shipping label and arrange delivery to the employee.',
  },
  'gen-shipping-label': {
    name:'Generate Shipping Label', owner:'IT Operations', system:'ITSM + Shipping Portal',
    status:'pending', priority:'Normal', sla:'1 hour',
    whatToDo:'Confirm the delivery address with the employee via ITSM. Create a shipping label in the shipping portal and pack the device securely with all accessories.',
    whereToDoIt:'Shipping Portal → Create Shipment → Paste Tracking → Attach to ITSM Ticket',
    evidence:'Shipping label generated and tracking number logged in ITSM',
    suggestedMessage:'Hi [Employee Name], your laptop is packed and ready to ship. Please confirm your delivery address: [Address]. Expected delivery: [Date].',
    nextStep:'Drop off with carrier or arrange courier pickup.',
  },
  'log-asset': {
    name:'Log Asset in ITSM', owner:'IT Operations', system:'ITSM Asset Management',
    status:'pending', priority:'High', sla:'30 minutes',
    whatToDo:'Record the device in the ITSM asset management module. Link to the employee record. Log serial number, model, purchase date, assigned user, and department.',
    whereToDoIt:'ITSM → Asset Management → New Asset → Link to [Employee]',
    evidence:'Asset record created with all required fields completed', suggestedMessage:null,
    nextStep:'Notify employee of shipment with tracking details.',
  },
  'notify-employee': {
    name:'Notify Employee', owner:'IT Operations', system:'ITSM / WhatsApp Business / Email',
    status:'pending', priority:'Normal', sla:'1 hour',
    whatToDo:'Send the employee a shipment notification with tracking details and basic setup instructions. Include the IT helpdesk contact for any problems.',
    whereToDoIt:'ITSM → Ticket → Send Notification   OR   WhatsApp Business → Employee Contact',
    evidence:'Delivery notification sent and logged in ITSM ticket',
    suggestedMessage:"Hi [Employee Name], your laptop has shipped! 📦 Tracking number: [Number]. Estimated delivery: [Date]. For setup help, contact IT at [helpdesk]. We'll follow up once you confirm receipt.",
    nextStep:'Employee receives the device and confirms acceptance in ITSM.',
  },
  'employee-accept': {
    name:'Employee Acceptance', owner:'Employee', system:'ITSM Portal',
    status:'pending', priority:'Normal', sla:'1 day after delivery',
    whatToDo:'Log into the ITSM portal and confirm receipt of the laptop. Sign the IT Asset Acceptance form acknowledging personal responsibility for the device.',
    whereToDoIt:'ITSM Portal → My Assets → Confirm Receipt → Sign Acceptance',
    evidence:'Signed acceptance form recorded in ITSM', suggestedMessage:null,
    nextStep:'Asset record is updated to "In Use." The case is closed. Device is now active.',
  },
  'collect-device': {
    name:'Collect Device', owner:'IT Operations', system:'ITSM + Logistics',
    status:'pending', priority:'Normal', sla:'2 days',
    whatToDo:'Coordinate equipment pickup from the employee. Confirm all accessories (charger, bag, peripherals) are returned. Check off items against the original asset record.',
    whereToDoIt:'Coordinate via ITSM ticket → Physical pickup or courier',
    evidence:'Pickup confirmation with checklist of all returned items', suggestedMessage:null,
    nextStep:'Bring equipment to IT lab for assessment.',
  },
  'close-asset': {
    name:'Close Asset Record', owner:'IT Operations', system:'ITSM Asset Management',
    status:'pending', priority:'Normal', sla:'1 day',
    whatToDo:'Update the asset record in ITSM to "Returned" status. Unlink from the employee. Close the return ticket.',
    whereToDoIt:'ITSM → Asset Management → [Asset] → Update Status → Returned',
    evidence:'Asset record closed in ITSM', suggestedMessage:null,
    nextStep:'Asset is logged as available or for decommission.',
  },
  // ➕ new laptop-lifecycle task here

  // ── Equipment Return ────────────────────────
  'open-return-ticket': {
    name:'Open Return Ticket', owner:'HR / Manager', system:'ITSM',
    status:'done', priority:'Normal', sla:'Same day',
    whatToDo:'Open an equipment return ticket in ITSM for the departing employee. List all assigned assets (laptop, phone, peripherals) and set the pickup deadline based on the last working day.',
    whereToDoIt:'ITSM → New Ticket → Equipment Return → Fill Asset List → Assign to IT Ops',
    evidence:'ITSM ticket number created and assigned to IT Operations', suggestedMessage:null,
    nextStep:'IT Operations contacts the employee to schedule a pickup date.',
  },
  'schedule-pickup': {
    name:'Schedule Pickup', owner:'IT Operations', system:'ITSM + Logistics',
    status:'active', priority:'High', sla:'2 days',
    whatToDo:'Contact the departing employee to agree on a pickup date and time. Confirm the device address and assign a courier or IT team member to complete the collection.',
    whereToDoIt:'ITSM Ticket → Add Pickup Details → Email or call employee → Log confirmed date',
    evidence:'Pickup date confirmed and logged in ITSM ticket with address',
    suggestedMessage:"Hi [Name], I'm following up to arrange the return of your company equipment. Could you confirm your availability for a pickup at [Address]? Please suggest a date this week.",
    nextStep:'IT team or courier completes the physical pickup on the agreed date.',
  },
  'confirm-pickup': {
    name:'Confirm Pickup Completion', owner:'IT Operations', system:'ITSM',
    status:'pending', priority:'High', sla:'Same day as pickup',
    whatToDo:'After pickup, confirm all listed assets were collected. Take a photo of the returned equipment. Update the ITSM ticket with the confirmation and any missing items.',
    whereToDoIt:'ITSM Ticket → Update Status → Upload Photo → Mark Assets Collected',
    evidence:'Pickup confirmation with photo and asset checklist attached to ITSM ticket', suggestedMessage:null,
    nextStep:'Equipment goes to IT assessment to determine condition and disposition.',
  },
  'assess-condition': {
    name:'Assess Device Condition', owner:'IT Operations', system:'Asset Management',
    status:'pending', priority:'Normal', sla:'2 days',
    whatToDo:'Physically inspect the returned device. Power it on, check for damage, and assess whether it can be redeployed, repaired, or must be decommissioned. Document the condition rating.',
    whereToDoIt:'IT Lab → Physical Inspection → Asset Management System → Condition Report',
    evidence:'Condition report (Excellent / Good / Damaged / Decommission) attached to asset record', suggestedMessage:null,
    nextStep:'Update the asset record with the condition assessment and decide on disposition.',
  },
  'update-asset': {
    name:'Update Asset Record', owner:'IT Operations', system:'Asset Management',
    status:'pending', priority:'Normal', sla:'1 day',
    whatToDo:'Update the asset record in the Asset Management System to reflect the return and condition. Unassign the device from the employee profile. Set the status to Available, In Repair, or Decommission.',
    whereToDoIt:'Asset Management → Device Record → Update Employee → Update Status → Save',
    evidence:'Asset record updated with new status and unlinked from departing employee', suggestedMessage:null,
    nextStep:'If decommission: proceed to wipe and disposal. If redeployable: move to IT inventory.',
  },
  'wipe-device': {
    name:'Wipe Device Data', owner:'IT Operations', system:'MDM + ITSM',
    status:'pending', priority:'Critical', sla:'Same day',
    whatToDo:'Perform a full factory reset or MDM remote wipe of the device. Ensure all company data, applications, and credentials are completely removed before the device is redeployed or disposed of.',
    whereToDoIt:'MDM (Jamf / Intune) → Device Profile → Remote Wipe → Confirm → Log Wipe Certificate',
    evidence:'Wipe certificate generated by MDM and attached to the ITSM ticket', suggestedMessage:null,
    nextStep:'Remove device from MDM enrollment and update the asset record.',
  },
  'remove-mdm': {
    name:'Remove from MDM', owner:'IT Operations', system:'MDM / Jamf / Intune',
    status:'pending', priority:'High', sla:'Same day as wipe',
    whatToDo:'Remove the device from MDM enrollment after confirming the wipe is complete. This prevents ghost devices from appearing in the MDM console.',
    whereToDoIt:'MDM Console → Devices → [Device Name] → Remove from MDM → Confirm',
    evidence:'Device removed from MDM device list — confirmed in MDM console', suggestedMessage:null,
    nextStep:'Close the ITSM ticket and archive the asset record.',
  },
  'close-ticket-eq': {
    name:'Close ITSM Ticket', owner:'IT Operations', system:'ITSM',
    status:'pending', priority:'Normal', sla:'1 day',
    whatToDo:'Close the equipment return ITSM ticket after confirming all steps are complete: pickup done, condition assessed, wipe confirmed, MDM removed, asset record updated.',
    whereToDoIt:'ITSM → Equipment Return Ticket → Mark Complete → Add Closure Notes → Close',
    evidence:'ITSM ticket closed with closure notes and all sub-tasks checked', suggestedMessage:null,
    nextStep:'Equipment return process is complete. Asset available for redeployment or disposal.',
  },
  // ➕ new equipment-return task here

  // ── Employee Onboarding ─────────────────────
  'create-emp-record': {
    name:'Create Employee Record', owner:'HR', system:'HRIS / Workday',
    status:'done', priority:'High', sla:'Day of offer acceptance',
    whatToDo:"Create the new employee's record in the HRIS. Enter all personal details, role, department, manager, start date, and compensation. Assign the employee ID.",
    whereToDoIt:'Workday → Workers → Add Worker → Fill All Required Fields → Activate',
    evidence:'Employee ID generated and record status set to Pre-Hire in HRIS', suggestedMessage:null,
    nextStep:'Send the welcome email with onboarding instructions and document checklist.',
  },
  'send-welcome': {
    name:'Send Welcome Email', owner:'HR', system:'HRIS / Email',
    status:'done', priority:'Normal', sla:'24 hours after offer',
    whatToDo:"Send the official welcome email to the new employee's personal address. Include the start date, location, dress code, document checklist, and an onboarding portal link.",
    whereToDoIt:'HRIS → Employee Profile → Send Welcome Email → Confirm Sent',
    evidence:'Welcome email sent and logged in HRIS communication history',
    suggestedMessage:"Welcome to [Company]! We're thrilled to have you joining us on [Start Date]. Please complete the attached document checklist and access your onboarding portal here: [Link]. Reach out to [HR Name] with any questions.",
    nextStep:'Employee completes and submits required documents via DocuSign.',
  },
  'send-contracts': {
    name:'Send Contracts via DocuSign', owner:'HR / Legal', system:'DocuSign',
    status:'done', priority:'High', sla:'2 days before start',
    whatToDo:'Prepare and send all required employment contracts and NDAs via DocuSign. Include the employment agreement, data processing consent, code of conduct, and any country-specific addenda.',
    whereToDoIt:'DocuSign → New Envelope → Select Template → Add Recipient → Send',
    evidence:'DocuSign completion certificate with all documents signed by employee and HR', suggestedMessage:null,
    nextStep:'Collect and validate government-issued ID and any other required personal documents.',
  },
  'collect-id': {
    name:'Collect Government ID', owner:'HR', system:'HRIS + DocuSign',
    status:'done', priority:'High', sla:'5 days before start',
    whatToDo:"Request and collect a copy of the employee's valid government-issued ID (passport, national ID, or equivalent). Verify it is not expired and matches the name on the employment contract.",
    whereToDoIt:'DocuSign Document Request → Employee Portal → Upload ID → HR Verification',
    evidence:'Valid ID copy uploaded and verified in HRIS document vault',
    suggestedMessage:'Please upload a copy of your valid government-issued ID (passport or national ID) to your onboarding portal before [Date]. This is required to complete your employment registration.',
    nextStep:'HR completes tax forms and payroll registration.',
  },
  'tax-forms': {
    name:'Complete Tax Registration', owner:'HR / Finance', system:'HRIS + Payroll',
    status:'done', priority:'High', sla:'5 days before start',
    whatToDo:"Complete the required tax registration forms for the employee based on their country of employment. Ensure payroll is set up correctly before the first pay run.",
    whereToDoIt:'HRIS → Payroll → New Employee → Tax Details → Country-Specific Forms → Save',
    evidence:'Tax registration completed and payroll record created in HRIS', suggestedMessage:null,
    nextStep:'IT Setup begins: AD account, laptop provisioning, email setup.',
  },
  'create-ad-account': {
    name:'Create Active Directory Account', owner:'IT Operations', system:'Active Directory / Azure AD',
    status:'active', priority:'High', sla:'1 day before start date',
    whatToDo:"Create the new employee's Active Directory account. Assign to the correct OU, security groups, and distribution lists based on their department and role.",
    whereToDoIt:'Active Directory Users & Computers → [Department OU] → New User → Assign Groups',
    evidence:'AD account created and confirmed accessible; notification sent to HR',
    suggestedMessage:'Hi HR, the Active Directory account for [Employee Name] ([email]) is ready. Laptop provisioning is underway and credentials will be delivered before [Start Date].',
    nextStep:'Set up email account and provision laptop in parallel.',
  },
  'provision-laptop': {
    name:'Provision Laptop for New Employee', owner:'IT Operations', system:'MDM / ITSM',
    status:'active', priority:'High', sla:'2 days',
    whatToDo:"Image a laptop from the available hardware pool, enroll it in MDM under the new employee's profile, and install all department-specific applications.",
    whereToDoIt:'See: Image Device → Enroll MDM → Install Apps tasks',
    evidence:'Laptop enrolled in MDM, assigned to [Employee], apps verified', suggestedMessage:null,
    nextStep:'Deliver credentials and laptop to employee on start date.',
  },
  'setup-email': {
    name:'Set Up Email Account', owner:'IT Operations', system:'Microsoft 365 / Google Workspace',
    status:'active', priority:'High', sla:'1 day before start date',
    whatToDo:'Create the employee email account in M365 or Google Workspace. Configure email signature template. Add to relevant distribution lists and Teams/Slack channels.',
    whereToDoIt:'M365 Admin Center / Google Admin → Users → Add New User → Assign License',
    evidence:'Email account active and accessible; license assigned', suggestedMessage:null,
    nextStep:'Include email credentials in the credentials delivery package.',
  },
  'deliver-credentials': {
    name:'Deliver Credentials', owner:'IT Operations', system:'ITSM / Secure Channel',
    status:'pending', priority:'High', sla:'By start date',
    whatToDo:"Prepare and deliver the new employee's login credentials (AD, email, VPN) via a secure method. Do not send credentials via unsecured email.",
    whereToDoIt:'ITSM Secure Message → Employee personal email OR direct on-site handover',
    evidence:'Credential delivery confirmed and logged in ITSM',
    suggestedMessage:"Hi [Employee Name], welcome! Your credentials for [Company] systems are ready. Your username is [email]. You'll receive a temporary password via [secure method]. Please change it on first login.",
    nextStep:'Employee logs in on start date. IT checks for any access issues.',
  },
  'schedule-orientation': {
    name:'Schedule Orientation Session', owner:'HR', system:'LMS / Calendly',
    status:'pending', priority:'Normal', sla:'2 days before start',
    whatToDo:'Schedule the first-day orientation session for the new employee. Include introductions to the team, a company overview, and a walkthrough of key tools and systems.',
    whereToDoIt:'Calendly / Calendar → New Event → Orientation Template → Invite Manager + New Hire',
    evidence:'Orientation calendar invite accepted by new employee and manager',
    suggestedMessage:'Welcome again! Your first-day orientation is scheduled for [Date] at [Time]. Agenda: company overview, team introductions, and system walkthrough. Your manager [Name] will be joining. See you then!',
    nextStep:'Conduct the orientation on start date.',
  },
  'conduct-orientation': {
    name:'Conduct Orientation', owner:'HR', system:'LMS',
    status:'pending', priority:'Normal', sla:'Day 1',
    whatToDo:'Run the scheduled orientation session. Cover company values, key contacts, office layout (or remote tools), IT systems overview, and HR policies. Log attendance in the LMS.',
    whereToDoIt:'LMS → Attendance → Mark Complete → Add Notes',
    evidence:'Orientation attendance confirmed in LMS with date and facilitator name', suggestedMessage:null,
    nextStep:'Assign mandatory training modules in the LMS.',
  },
  'assign-training': {
    name:'Assign Training Modules', owner:'HR', system:'LMS',
    status:'pending', priority:'Normal', sla:'Day 1',
    whatToDo:'Assign the mandatory onboarding training modules to the new employee in the LMS. Modules include: data security, code of conduct, compliance basics, and role-specific training.',
    whereToDoIt:'LMS → Learning Plans → New Employee → Assign Modules → Set Completion Deadline',
    evidence:"Training modules assigned and visible in employee's LMS dashboard", suggestedMessage:null,
    nextStep:'Employee completes all training modules within the first week.',
  },
  'complete-training': {
    name:'Confirm Training Completion', owner:'HR + Manager', system:'LMS',
    status:'pending', priority:'Normal', sla:'Day 7',
    whatToDo:'Confirm that the new employee has completed all mandatory training modules. Chase incomplete modules before the 7-day deadline. Download completion certificates from the LMS.',
    whereToDoIt:'LMS → Reports → Employee Training → Check Completion Status → Download Certificates',
    evidence:'Training completion certificate downloaded and saved to employee record',
    suggestedMessage:'Hi [Name], just a reminder that your onboarding training modules are due by [Date]. You can access them here: [LMS Link]. Please reach out if you need any help.',
    nextStep:'Manager schedules the 30-day check-in.',
  },
  'schedule-review': {
    name:'Schedule 30-Day Review', owner:'Manager', system:'HRIS / Calendar',
    status:'pending', priority:'Normal', sla:'Day 25',
    whatToDo:'Schedule the 30-day check-in meeting with the new employee. This is a two-way feedback session to assess integration, flag any issues, and agree on short-term goals.',
    whereToDoIt:'Calendar → New Meeting → 30-Day Check-In Template → Invite Employee',
    evidence:'30-day review meeting confirmed in calendar for both manager and employee', suggestedMessage:null,
    nextStep:'Conduct the 30-day review meeting and submit the feedback form in HRIS.',
  },
  'submit-review': {
    name:'Submit 30-Day Review', owner:'Manager', system:'HRIS',
    status:'pending', priority:'Normal', sla:'Day 30',
    whatToDo:"After the check-in meeting, complete and submit the 30-day review form in HRIS. Rate the employee's integration, document agreed goals, and flag any performance concerns.",
    whereToDoIt:'HRIS → Performance → New Review → 30-Day Template → Fill & Submit',
    evidence:'30-day review form submitted in HRIS with manager signature', suggestedMessage:null,
    nextStep:'HR confirms all onboarding steps are complete and activates the employee record.',
  },
  'confirm-active': {
    name:'Confirm Employee Active', owner:'HR', system:'HRIS',
    status:'pending', priority:'Normal', sla:'Day 30',
    whatToDo:'Verify that all onboarding milestones are complete: documents, IT setup, orientation, training, and 30-day review. Update the employee status from Pre-Hire/Onboarding to Active in HRIS.',
    whereToDoIt:'HRIS → Employee Record → Status → Change to Active → Save',
    evidence:'Employee status set to Active in HRIS with date of confirmation', suggestedMessage:null,
    nextStep:'Onboarding is complete. Employee enters normal operations.',
  },
  // ➕ new employee-onboarding task here

  // ── Employee Offboarding ────────────────────
  'log-notice': {
    name:'Log Resignation Notice', owner:'HR / Manager', system:'HRIS',
    status:'done', priority:'High', sla:'Same day',
    whatToDo:'Log the resignation or termination notice in HRIS. Record the notice date, last working day, and reason for departure. Attach the resignation letter or termination document.',
    whereToDoIt:'HRIS → Employee Record → Offboarding → Log Notice → Attach Document → Save',
    evidence:'Notice date and last working day recorded in HRIS with document attached', suggestedMessage:null,
    nextStep:'Initiate the offboarding checklist and notify all relevant teams.',
  },
  'initiate-checklist': {
    name:'Initiate Offboarding Checklist', owner:'HR', system:'HRIS + ITSM',
    status:'done', priority:'High', sla:'Day of notice',
    whatToDo:"Open the offboarding checklist in HRIS and notify IT, Finance, and the employee's manager. Create ITSM tickets for IT revocation and equipment return. Set deadlines for each team.",
    whereToDoIt:'HRIS → Offboarding → Initiate Checklist → Auto-Notify Teams → Create Sub-Tickets',
    evidence:'Offboarding checklist created with sub-tickets assigned to IT and Finance',
    suggestedMessage:"Hi team, [Employee Name] has submitted their notice and their last day is [Date]. Please action the assigned offboarding tasks in ITSM by [Deadline]. Contact HR for any questions.",
    nextStep:'Employee begins knowledge transfer with their manager.',
  },
  'document-projects': {
    name:'Document Active Projects', owner:'Employee + Manager', system:'Confluence / Google Drive',
    status:'active', priority:'High', sla:'5 days',
    whatToDo:'The departing employee must document all active projects, ongoing responsibilities, key contacts, and critical institutional knowledge. Use the standard handover template.',
    whereToDoIt:'Confluence → Handover Template → Fill All Sections → Share with Manager for Review',
    evidence:'Completed handover document in Confluence, shared with manager', suggestedMessage:null,
    nextStep:'Manager reviews the handover document and provides sign-off.',
  },
  'handoff-meeting': {
    name:'Conduct Handoff Meeting', owner:'Employee + Manager', system:'Confluence / Calendar',
    status:'active', priority:'High', sla:'3 days before last day',
    whatToDo:'Schedule and conduct a formal handoff meeting with the manager and the person(s) inheriting the work. Walk through the handover document and answer all questions.',
    whereToDoIt:'Calendar → Handoff Meeting → Invite Manager + Successor → Link Handover Doc',
    evidence:'Handoff meeting completed — manager sign-off on handover document', suggestedMessage:null,
    nextStep:'IT Revoke stage: all system access must be revoked on the last working day.',
  },
  'revoke-ad': {
    name:'Revoke Active Directory Access', owner:'IT Operations', system:'Active Directory',
    status:'blocked', priority:'Critical', sla:'Last working day — EOD',
    whatToDo:"Disable the employee's Active Directory account on their last working day. Do not delete the account — disable it and move to the Leavers OU to preserve audit trail for 90 days.",
    whereToDoIt:'Active Directory → Find User → Disable Account → Move to Leavers OU → Log in ITSM',
    evidence:'AD account disabled — confirmed in Active Directory and logged in ITSM', suggestedMessage:null,
    nextStep:'Revoke all other system access (email, VPN, SaaS tools).',
  },
  'revoke-systems': {
    name:'Revoke All System Access', owner:'IT Operations', system:'AD + MDM + All Systems',
    status:'blocked', priority:'Critical', sla:'Last working day — EOD',
    whatToDo:"Revoke the employee's access to all company systems: email, VPN, Slack, ERP, CRM, code repositories, cloud storage, and any other SaaS tools. Use the system access checklist.",
    whereToDoIt:'IT Revocation Checklist → Tick each system → Log access removal date → Manager countersign',
    evidence:'Full system revocation checklist completed and signed off by IT Manager', suggestedMessage:null,
    nextStep:'Collect all physical equipment from the employee.',
  },
  'collect-equipment': {
    name:'Collect Company Equipment', owner:'IT Operations', system:'ITSM + Asset Management',
    status:'blocked', priority:'High', sla:'Last working day',
    whatToDo:'Collect all company equipment from the departing employee: laptop, phone, access cards, keys, and any peripherals. Verify each item against the asset register. Issue a receipt.',
    whereToDoIt:'ITSM Equipment Return Ticket → Asset Checklist → Confirm Receipt → Update Asset Status',
    evidence:'Equipment receipt signed by both IT and employee; asset records updated', suggestedMessage:null,
    nextStep:'Equipment moves to assessment and decommission. IT Revoke stage closes.',
  },
  'calculate-final-pay': {
    name:'Calculate Final Payment', owner:'Finance / HR', system:'HRIS + Payroll',
    status:'pending', priority:'High', sla:'Last working day',
    whatToDo:"Calculate the employee's final payment including outstanding salary, accrued holiday pay, any notice period payment, and applicable deductions. Verify against the employment contract.",
    whereToDoIt:'HRIS → Payroll → Off-Cycle Run → Final Pay Calculator → Review → Submit to Payroll',
    evidence:'Final pay calculation sheet signed by Finance Manager', suggestedMessage:null,
    nextStep:'Process final payroll and issue the payslip to the employee.',
  },
  'process-payroll': {
    name:'Process Final Payroll', owner:'Finance', system:'HRIS + Payroll + Banking',
    status:'pending', priority:'High', sla:'Within 5 days of last day',
    whatToDo:"Run the off-cycle payroll for the departing employee. Confirm the payment amount, bank account details, and issue the final payslip. Ensure it reaches the employee's account by the legal deadline.",
    whereToDoIt:'Payroll System → Off-Cycle Payroll → Select Employee → Confirm → Submit to Bank',
    evidence:'Final payslip issued and payment confirmed in bank statement', suggestedMessage:null,
    nextStep:'HR closes the employee record in HRIS.',
  },
  'close-employee-record': {
    name:'Close Employee Record', owner:'HR', system:'HRIS',
    status:'pending', priority:'Normal', sla:'Day of departure',
    whatToDo:"Set the employee's status to Inactive in HRIS after confirming all offboarding steps are complete. Archive all records and retain data per the company's data retention policy.",
    whereToDoIt:'HRIS → Employee Record → Status → Change to Inactive → Archive → Save',
    evidence:'Employee status set to Inactive in HRIS with departure date confirmed', suggestedMessage:null,
    nextStep:'Offboarding is complete. All access revoked, equipment returned, final pay issued.',
  },
  // ➕ new employee-offboarding task here

  // ── Vendor Onboarding ───────────────────────
  'submit-vendor-req': {
    name:'Submit Vendor Request', owner:'Requesting Area', system:'Internal Portal',
    status:'done', priority:'Normal', sla:'Same day',
    whatToDo:"Submit a vendor registration request via the internal portal. Include the vendor's legal name, country of registration, services to be provided, estimated annual spend, and business justification.",
    whereToDoIt:'Internal Portal → New Vendor Request → Fill All Fields → Business Justification → Submit',
    evidence:'Vendor request form submitted with a confirmation number from the portal', suggestedMessage:null,
    nextStep:'Finance receives the request and initiates the due diligence process.',
  },
  'collect-kyc': {
    name:'Collect Vendor KYC Documents', owner:'Finance', system:'Compliance Portal',
    status:'active', priority:'High', sla:'5 days',
    whatToDo:'Request and collect Know Your Customer (KYC) documents from the vendor. Required documents vary by country: RUC/NIT/RNC (tax ID), commercial registration, beneficial ownership declaration, and bank account details. Validate that all documents are current (not expired).',
    whereToDoIt:'Compliance Portal → New Vendor → Request Documents → Upload & Validate',
    evidence:'All required documents uploaded, validated, and not expired in Compliance Portal',
    suggestedMessage:'Dear [Vendor Name], to complete your registration as an approved supplier, please provide the following documents by [Date]: [List by country]. Upload here: [Portal Link]. Contact [Name] for assistance.',
    nextStep:'Legal reviews documents for compliance. Estimated 3 business days.',
  },
  'compliance-check': {
    name:'Run Compliance Check', owner:'Finance / Legal', system:'Compliance Portal',
    status:'active', priority:'High', sla:'3 days',
    whatToDo:'Run a compliance screening against international sanction lists and internal blacklists. Verify that all submitted documents match the vendor registration details.',
    whereToDoIt:'Compliance Portal → Vendor Profile → Run Screening → Review Results',
    evidence:'Compliance check passed certificate generated by portal', suggestedMessage:null,
    nextStep:'If passed, proceed to Finance Director approval. If flagged, escalate to Legal immediately.',
  },
  'legal-review': {
    name:'Legal Document Review', owner:'Legal', system:'Compliance Portal + DocuSign',
    status:'active', priority:'High', sla:'3 days',
    whatToDo:'Legal reviews all submitted vendor documents for compliance with local laws in each operating country (PE, CO, US, DO). Flag any missing, expired, or suspicious documents.',
    whereToDoIt:'Compliance Portal → Vendor Profile → Legal Review Tab → Add Comments → Approve / Flag',
    evidence:'Legal review completed — approval or rejection recorded in Compliance Portal', suggestedMessage:null,
    nextStep:'If approved, proceed to Finance Director approval. If flagged, return to vendor for corrections.',
  },
  'director-approval': {
    name:'Finance Director Approval', owner:'Finance Director', system:'ERP + Email',
    status:'pending', priority:'High', sla:'2 days',
    whatToDo:'Finance Director reviews the vendor registration request, KYC documents, and legal clearance. Provides formal approval or rejection. Approval must be documented in the ERP.',
    whereToDoIt:'ERP → Vendor Approvals → [Vendor Name] → Review → Approve / Reject',
    evidence:'Director approval email on record and approval status updated in ERP', suggestedMessage:null,
    nextStep:'Legal prepares and sends the vendor contract for signing.',
  },
  'draft-contract': {
    name:'Draft Vendor Contract', owner:'Legal', system:'DocuSign + Legal Template Library',
    status:'pending', priority:'High', sla:'3 days',
    whatToDo:'Draft the vendor contract using the approved template. Include payment terms, SLA obligations, data processing clauses, termination conditions, and country-specific legal addenda.',
    whereToDoIt:'Legal Template Library → Select Contract Type → Customize Terms → Send for Internal Review',
    evidence:'Contract draft reviewed and signed off by Legal Manager before sending to vendor', suggestedMessage:null,
    nextStep:'Send contract to vendor for review and signature via DocuSign.',
  },
  'sign-contract': {
    name:'Execute Contract Signatures', owner:'Legal + Vendor', system:'DocuSign',
    status:'pending', priority:'High', sla:'5 days',
    whatToDo:'Send the final contract to the vendor via DocuSign for signature. Chase promptly if not signed within 2 days. Obtain the authorised company countersignature once the vendor has signed.',
    whereToDoIt:'DocuSign → Send Envelope → Vendor Contact → Company Signatory → Complete',
    evidence:'Fully executed contract (all parties signed) stored in DocuSign and vendor file',
    suggestedMessage:'Dear [Vendor], please find attached the service agreement for your review and signature. Please sign by [Date]. Contact [Legal Name] with any questions.',
    nextStep:'Finance creates the vendor master record in ERP.',
  },
  'create-vendor-record': {
    name:'Create Vendor Master Record', owner:'Finance', system:'ERP / SAP',
    status:'pending', priority:'Normal', sla:'2 days',
    whatToDo:"Create the vendor's master record in the ERP. Enter legal name, registration number, address, bank account, payment terms, and applicable tax withholding rates for each country.",
    whereToDoIt:'ERP → Vendors → New Vendor → Fill Master Data → Link Contract → Activate',
    evidence:'Vendor master record created in ERP with vendor ID number assigned', suggestedMessage:null,
    nextStep:'Notify the requesting area that the vendor is now active and ready to receive purchase orders.',
  },
  'notify-area': {
    name:'Notify Requesting Area', owner:'Finance', system:'Email / ITSM',
    status:'pending', priority:'Normal', sla:'Same day as activation',
    whatToDo:'Notify the area that submitted the vendor request that the vendor is now active in ERP. Provide the vendor ID number and confirm they can now raise purchase orders.',
    whereToDoIt:'ITSM Ticket → Close with Comment → Email Requesting Area → Include Vendor ID',
    evidence:'Notification email sent and ITSM ticket closed',
    suggestedMessage:'Hi [Requester], [Vendor Name] has been approved and activated in ERP. Their vendor ID is [ID]. You can now raise purchase orders against this vendor. Contact Finance for any questions.',
    nextStep:'Vendor onboarding is complete.',
  },
  // ➕ new vendor-onboarding task here

  // ── Monthly Billing Cycle ───────────────────
  'run-invoice-batch': {
    name:'Run Invoice Generation Batch', owner:'Finance', system:'ERP / SAP',
    status:'active', priority:'Critical', sla:'1st business day of month',
    whatToDo:'Run the monthly invoice generation batch job in the ERP for all clients with active billing agreements. Review the exceptions report before confirming the batch.',
    whereToDoIt:'ERP → Finance Module → Billing → Run Monthly Batch → Review Exceptions → Confirm',
    evidence:'Batch completion report showing invoice count, total amount, and exception list', suggestedMessage:null,
    nextStep:'Finance analyst reviews each generated invoice for accuracy within 2 business days.',
  },
  'review-exceptions': {
    name:'Review Invoice Exceptions', owner:'Finance', system:'ERP / SAP',
    status:'active', priority:'High', sla:'Same day as batch',
    whatToDo:'Review the exceptions report generated after the invoice batch. Investigate any invoices flagged for missing contract data, incorrect amounts, or system errors. Resolve or escalate each exception.',
    whereToDoIt:'ERP → Finance → Billing → Exceptions Report → Review Each → Resolve or Escalate',
    evidence:'Exceptions report cleared — all items resolved or escalated with notes', suggestedMessage:null,
    nextStep:'Finance analyst begins individual invoice review.',
  },
  'review-invoices': {
    name:'Review Individual Invoices', owner:'Finance Analyst', system:'ERP',
    status:'pending', priority:'High', sla:'2 business days',
    whatToDo:'Review each generated invoice against the client contract: verify the service period, line items, amounts, and currency. Flag any discrepancy for correction before sending to clients.',
    whereToDoIt:'ERP → Invoices → Review Queue → Open Each Invoice → Verify vs Contract → Approve or Flag',
    evidence:'Reviewed invoice list with analyst initials and any flagged items noted', suggestedMessage:null,
    nextStep:'Finance Manager approves the reviewed invoice batch.',
  },
  'flag-exceptions': {
    name:'Flag Invoice Exceptions', owner:'Finance Analyst', system:'ERP',
    status:'pending', priority:'High', sla:'Same day as review',
    whatToDo:'For any invoice that does not match the contract, flag it in the ERP with a reason code and escalate to Finance Manager. Do not send flagged invoices to clients.',
    whereToDoIt:'ERP → Invoice → Flag for Review → Add Reason Code → Notify Finance Manager',
    evidence:'Flagged invoices listed in ERP with reason codes and escalation timestamp', suggestedMessage:null,
    nextStep:'Finance Manager reviews flagged invoices and decides: correct or hold.',
  },
  'approve-batch': {
    name:'Approve Invoice Batch', owner:'Finance Manager', system:'ERP + Email',
    status:'pending', priority:'High', sla:'1 business day',
    whatToDo:'Finance Manager reviews the final invoice list after analyst sign-off. Confirms no outstanding exceptions. Approves the batch for dispatch to clients.',
    whereToDoIt:'ERP → Billing Batch → Manager Approval → Review List → Approve → Send to Dispatch',
    evidence:'Batch approval confirmation in ERP with manager name and timestamp', suggestedMessage:null,
    nextStep:'ERP dispatches invoices to client contacts automatically.',
  },
  'process-payments': {
    name:'Process Incoming Payments', owner:'Finance', system:'Banking / ERP',
    status:'pending', priority:'High', sla:'Within 5 days of due date',
    whatToDo:'Monitor the bank account for incoming client payments. Match each payment to the corresponding invoice in ERP. Flag any payments that are over 5 days past their due date for follow-up.',
    whereToDoIt:'Banking Portal → Incoming Payments → ERP → Match to Invoice → Confirm Payment',
    evidence:'Payment confirmation logged against each invoice in ERP', suggestedMessage:null,
    nextStep:'Reconcile all payments against the bank statement.',
  },
  'reconcile': {
    name:'Reconcile Against Bank Statement', owner:'Finance', system:'ERP + Banking',
    status:'pending', priority:'Normal', sla:'Within 3 days of month end',
    whatToDo:'Reconcile all invoice payments against the monthly bank statement. Identify any discrepancies between ERP records and actual bank transactions.',
    whereToDoIt:'ERP → Finance → Bank Reconciliation → Import Statement → Match → Review Discrepancies',
    evidence:'Bank reconciliation report completed and signed off by Finance Manager', suggestedMessage:null,
    nextStep:'Billing cycle is complete. Report to Finance Director.',
  },
  // ➕ new billing-cycle task here

  // ── Purchase Request ────────────────────────
  'submit-pr': {
    name:'Submit Purchase Request', owner:'Requesting Employee', system:'ERP / Internal Portal',
    status:'done', priority:'Normal', sla:'Same day',
    whatToDo:'Submit a purchase request in the ERP including vendor name, item description, amount, business justification, and required delivery date.',
    whereToDoIt:'ERP → Procurement → New Purchase Request → Fill All Fields → Submit',
    evidence:'Purchase request number confirmed in ERP',
    suggestedMessage:'Hi [Manager], I submitted PR #[Number] in the ERP for [Item] from [Vendor] — €[Amount]. Needed by [Date]. Please review and approve when possible.',
    nextStep:'Manager and Finance receive approval request. SLA: 24 hours for approval.',
  },
  'manager-approve-pr': {
    name:'Manager Approval', owner:'Direct Manager', system:'ERP',
    status:'active', priority:'High', sla:'24 hours',
    whatToDo:'Review the purchase request in the ERP. Confirm the business justification is valid and the purchase is necessary. Approve or reject with a comment.',
    whereToDoIt:'ERP → My Approvals → [PR Number] → Approve / Reject',
    evidence:'Manager approval recorded in ERP', suggestedMessage:null,
    nextStep:'Finance team receives the PR for second approval.',
  },
  'finance-approve-pr': {
    name:'Finance Approval', owner:'Finance Team', system:'ERP',
    status:'active', priority:'High', sla:'24 hours',
    whatToDo:'Review the purchase request for budget availability and compliance with spending policy. Approve or reject with a comment.',
    whereToDoIt:'ERP → My Approvals → [PR Number] → Budget Check → Approve / Reject',
    evidence:'Finance approval recorded in ERP with budget line reference', suggestedMessage:null,
    nextStep:'Procurement receives approval to issue Purchase Order to vendor.',
  },
  'issue-po-pr': {
    name:'Issue Purchase Order', owner:'Procurement', system:'ERP / SAP',
    status:'pending', priority:'High', sla:'1 business day',
    whatToDo:'Issue the official Purchase Order to the approved vendor in the ERP. Include item description, quantity, agreed price, delivery date, and billing address. Send the PO to the vendor contact.',
    whereToDoIt:'ERP → Procurement → New PO → Link to Approved PR → Fill PO Details → Issue → Email to Vendor',
    evidence:'PO number generated in ERP and sent to vendor — confirmation email on file',
    suggestedMessage:'Dear [Vendor], please find attached Purchase Order [PO Number] for [Item Description]. Total: €[Amount]. Please confirm receipt and expected delivery date by [Date].',
    nextStep:'Vendor delivers goods. Employee confirms receipt in ERP.',
  },
  'confirm-receipt': {
    name:'Confirm Goods Receipt', owner:'Requesting Employee', system:'ERP',
    status:'pending', priority:'Normal', sla:'Day of delivery',
    whatToDo:'When goods arrive, inspect them against the Purchase Order and confirm receipt in ERP. Note any damaged or missing items. Do not confirm partial deliveries as complete.',
    whereToDoIt:'ERP → Procurement → My POs → [PO Number] → Confirm Receipt → Add Notes → Save',
    evidence:'Goods receipt confirmed in ERP — linked to the original PO', suggestedMessage:null,
    nextStep:'Purchase request is complete. ERP triggers payment to vendor per agreed terms.',
  },
  // ➕ new purchase-request task here
};

/* ═══════════════════════════════════════════════
   5. CASES
   ─────────────────────────────────────────────
   Single source of truth for all active cases.
   Drives both the FLOW tab stage roster and
   the CEO Running Cases panel (showInCeo:true).

   Fields:
     id         — unique kebab-case ID
     processId  — must match a PROCESSES id
     stageId    — must match a STAGES key
     name       — short name shown in FLOW roster
     meta       — 'Process · Area' subtitle line
     initials   — 2-char avatar label
     days       — days in current stage (integer)
     sla        — color state: 'ok' | 'warn' | 'overdue'
     showInCeo  — true → appears in CEO Running Cases
     title      — CEO list title  (required if showInCeo)
     stage      — CEO list stage name (required if showInCeo)
     owner      — CEO list owner (required if showInCeo)
     slaLabel   — CEO list SLA text: '3 days', 'SLA breached'
     status     — CEO list pill: 'active'|'blocked'|'warn'
     detail     — right-panel object (both views share this)

   ➕ ADD NEW CASE: copy one block, give it a
      descriptive id, set processId + stageId,
      fill the fields, set showInCeo as needed.
═══════════════════════════════════════════════ */
const CASES = [

  // ── Laptop Lifecycle · Procurement ──────────
  {
    id:'case-carlos-mendez',
    processId:'laptop-lifecycle', stageId:'laptop-procurement',
    name:'Carlos Mendez', meta:'Laptop Lifecycle · IT',
    initials:'CM', days:2, sla:'ok', showInCeo:false,
    detail:{
      title:'Carlos Mendez — Laptop Request',
      owner:'IT Procurement', status:'Active',
      process:'Laptop Lifecycle → Procurement', system:'ERP / SAP',
      priority:'Normal · 2 days in stage',
      description:'Standard laptop replacement for Carlos Mendez (Finance Analyst, Lima). PO being drafted with Dell — unit available in local inventory.',
      nextAction:'Issue PO in SAP today and get vendor delivery confirmation by EOD.',
    },
  },
  {
    id:'case-q2-hardware-batch',
    processId:'laptop-lifecycle', stageId:'laptop-procurement',
    name:'IT Batch — Q2 Hardware', meta:'Laptop Lifecycle · IT',
    initials:'IB', days:4, sla:'warn', showInCeo:false,
    detail:{
      title:'Q2 Hardware Batch — IT Procurement',
      owner:'IT Procurement', status:'Watch',
      process:'Laptop Lifecycle → Procurement', system:'ERP / SAP',
      priority:'High · 4 days in stage · SLA is today',
      description:'Batch of 3 laptops for Q2 new hires (Bogotá office). PO requires Finance countersignature which is delayed.',
      nextAction:'Chase Finance countersignature today — this PO is blocking 3 onboarding timelines.',
      suggestedMessage:'Hi Francisco, the Q2 laptop batch PO (REF-2026-0041) needs your countersignature today to avoid impacting new hire start dates. Can you approve by 3 PM?',
    },
  },
  {
    id:'case-sofia-paredes',
    processId:'laptop-lifecycle', stageId:'laptop-procurement',
    name:'Sofia Paredes', meta:'Laptop Lifecycle · HR',
    initials:'SP', days:1, sla:'ok', showInCeo:false,
    detail:{
      title:'Sofia Paredes — Laptop Request',
      owner:'IT Procurement', status:'Active',
      process:'Laptop Lifecycle → Procurement', system:'ERP / SAP',
      priority:'Normal · 1 day in stage',
      description:'New laptop for Sofia Paredes (Legal, Santo Domingo). Approved yesterday. Vendor quote received.',
      nextAction:'Issue PO and confirm delivery address with Sofia — she is remote.',
    },
  },

  // ── Equipment Return · Pickup ────────────────
  {
    id:'case-luis-torres',
    processId:'equipment-return', stageId:'equip-pickup',
    name:'Luis Torres', meta:'Equipment Return · HR',
    initials:'LT', days:5, sla:'overdue',
    showInCeo:true, title:'Equipment Return — Luis Torres',
    stage:'Pickup', owner:'IT Operations', slaLabel:'2 days', status:'active',
    detail:{
      title:'Luis Torres — Equipment Return',
      owner:'IT Operations', status:'Overdue',
      process:'Equipment Return → Pickup', system:'ITSM + Logistics',
      priority:'Critical · 5 days in stage · SLA breached',
      description:'Luis Torres left the company 5 days ago. Equipment pickup (MacBook Pro + iPhone) has not been scheduled. Device location confirmed: home address on file.',
      blocker:'Pickup unscheduled — 5 days past SLA. Risk of data loss if device is not recovered.',
      nextAction:'Call Luis directly and schedule pickup for tomorrow morning. Escalate to HR if no response within 2 hours.',
      suggestedMessage:"Hi Luis, I'm following up on the return of your company equipment. Could we arrange a pickup for tomorrow between 9–11 AM? Please confirm your availability.",
    },
  },
  {
    id:'case-roberto-quispe',
    processId:'equipment-return', stageId:'equip-pickup',
    name:'Roberto Quispe', meta:'Equipment Return · Ops',
    initials:'RQ', days:1, sla:'ok', showInCeo:false,
    detail:{
      title:'Roberto Quispe — Equipment Return',
      owner:'IT Operations', status:'Active',
      process:'Equipment Return → Pickup', system:'ITSM + Logistics',
      priority:'Normal · 1 day in stage',
      description:'Roberto Quispe (Operations, Lima) returned equipment after internal transfer. Pickup scheduled for tomorrow at Lima office.',
      nextAction:'Confirm pickup with courier and notify Roberto of the time window.',
    },
  },

  // ── Employee Onboarding · IT Setup ──────────
  {
    id:'case-ana-ruiz',
    processId:'employee-onboarding', stageId:'onboard-it-setup',
    name:'Ana Ruiz', meta:'Employee Onboarding · HR',
    initials:'AR', days:3, sla:'warn',
    showInCeo:true, title:'Employee Onboarding — Ana Ruiz',
    stage:'IT Setup', owner:'IT Operations', slaLabel:'3 days', status:'active',
    detail:{
      title:'Ana Ruiz — Employee Onboarding',
      owner:'IT Operations', status:'Watch',
      process:'Employee Onboarding → IT Setup', system:'ITSM + AD + MDM',
      priority:'High · 3 days in stage · Start date is tomorrow',
      description:'Ana Ruiz starts tomorrow as Marketing Manager (Bogotá). AD account created, but laptop provisioning is 1 day behind — MDM enrollment not yet completed.',
      blocker:'Laptop not yet enrolled in MDM. If not completed today, Ana will not have a working device on Day 1.',
      nextAction:'Complete MDM enrollment and app installation today. Deliver credentials to Ana before 5 PM.',
      suggestedMessage:'Hi Ana, your laptop is being finalised today. You will receive your login credentials and setup instructions by 5 PM. Looking forward to having you join tomorrow!',
    },
  },

  // ── Employee Offboarding · Knowledge ────────
  {
    id:'case-daniel-mora',
    processId:'employee-offboarding', stageId:'offboard-knowledge',
    name:'Daniel Mora', meta:'Employee Offboarding · Ops',
    initials:'DM', days:7, sla:'overdue', showInCeo:false,
    detail:{
      title:'Daniel Mora — Knowledge Transfer',
      owner:'Daniel Mora + Manager', status:'Overdue',
      process:'Employee Offboarding → Knowledge Transfer', system:'Confluence / Drive',
      priority:'High · 7 days in stage · SLA breached',
      description:'Daniel Mora (Operations Lead) is offboarding. Knowledge transfer is 7 days in — SLA is 5 days. Handover doc incomplete; manager has not signed off.',
      blocker:'Manager sign-off missing. Handover document is 60% complete — critical process knowledge for Peru ops not documented.',
      nextAction:'Schedule an urgent handover session with Daniel and his manager today. Set Friday as hard close deadline.',
      suggestedMessage:"Daniel, could we block 2 hours today to complete the handover document? Your last day is Friday and we need the manager sign-off before then.",
    },
  },
  {
    id:'case-isabella-cruz',
    processId:'employee-offboarding', stageId:'offboard-knowledge',
    name:'Isabella Cruz', meta:'Employee Offboarding · HR',
    initials:'IC', days:2, sla:'ok', showInCeo:false,
    detail:{
      title:'Isabella Cruz — Knowledge Transfer',
      owner:'Isabella Cruz + Manager', status:'Active',
      process:'Employee Offboarding → Knowledge Transfer', system:'Confluence / Drive',
      priority:'Normal · 2 days in stage',
      description:'Isabella Cruz (HR Coordinator) is completing her knowledge transfer. Handover document is 80% complete and on track.',
      nextAction:'Review handover doc by EOD and get manager sign-off.',
    },
  },

  // ── Employee Offboarding · IT Revoke ────────
  {
    id:'case-sergio-vega',
    processId:'employee-offboarding', stageId:'offboard-it-revoke',
    name:'Sergio Vega', meta:'Employee Offboarding · IT',
    initials:'SV', days:3, sla:'overdue', showInCeo:false,
    detail:{
      title:'Sergio Vega — IT Access Revocation',
      owner:'IT Operations', status:'Blocked',
      process:'Employee Offboarding → IT Revoke', system:'AD + MDM + All Systems',
      priority:'Critical · 3 days past deadline · Security risk',
      description:"Sergio Vega's last day was 3 days ago. IT access revocation is blocked — his AD account is still active. Security policy requires same-day revocation.",
      blocker:'AD account still active 3 days post-departure. This is a compliance and security violation requiring immediate escalation.',
      nextAction:'Revoke AD access NOW. Escalate to IT Manager immediately. Log the delay in the audit trail.',
      suggestedMessage:"Escalation required: Sergio Vega's AD account has not been revoked 3 days after his departure. Please authorise emergency revocation immediately.",
    },
  },

  // ── Vendor Onboarding · Due Diligence ───────
  {
    id:'case-acme-corp',
    processId:'vendor-onboarding', stageId:'vendor-due-diligence',
    name:'ACME Corp', meta:'Vendor Onboarding · Finance',
    initials:'AC', days:12, sla:'overdue',
    showInCeo:true, title:'Vendor Onboarding — ACME Supplier',
    stage:'Due Diligence', owner:'Finance', slaLabel:'SLA breached', status:'blocked',
    detail:{
      title:'ACME Corp — Vendor Due Diligence',
      owner:'Finance / Legal', status:'Overdue',
      process:'Vendor Onboarding → Due Diligence', system:'Compliance Portal',
      priority:'High · 12 days in stage · SLA breached',
      description:'ACME Corp vendor registration is stalled — NIT (tax ID) document expired. Finance has sent 3 reminders over 12 days with no response.',
      blocker:'Expired NIT document. ACME has not responded to compliance requests in 12 days.',
      nextAction:'Issue final notice to ACME: submit updated NIT within 48 hours or the registration will be cancelled.',
      suggestedMessage:'Dear ACME, this is a final reminder: your NIT document (expired March 2026) must be resubmitted by April 30 to proceed with vendor registration. Failure to comply will result in cancellation of this request.',
    },
  },

  // ── Billing Cycle · Invoice Generation ──────
  {
    id:'case-auna-invoice-gen',
    processId:'billing-cycle', stageId:'billing-invoice-gen',
    name:'AUNA Group', meta:'Billing Cycle · Finance',
    initials:'AG', days:2, sla:'ok', showInCeo:false,
    detail:{
      title:'AUNA Group — Invoice Generation',
      owner:'Finance', status:'Active',
      process:'Monthly Billing → Invoice Generation', system:'ERP / SAP',
      priority:'Normal · April cycle',
      description:'April invoice for AUNA Group. Service period: April 1–30. Amount: €18,400. Being generated in ERP batch run.',
      nextAction:'Confirm invoice details match contract terms before batch finalisation.',
    },
  },
  {
    id:'case-pichincha-invoice-gen',
    processId:'billing-cycle', stageId:'billing-invoice-gen',
    name:'Pichincha Bank', meta:'Billing Cycle · Finance',
    initials:'PB', days:2, sla:'ok', showInCeo:false,
    detail:{
      title:'Pichincha Bank — Invoice Generation',
      owner:'Finance', status:'Active',
      process:'Monthly Billing → Invoice Generation', system:'ERP / SAP',
      priority:'Normal · April cycle',
      description:'April invoice for Pichincha Bank. Amount: €12,200. Standard monthly retainer.',
      nextAction:'Include new SLA report attachment per the April contract amendment.',
    },
  },
  {
    id:'case-techgroup-invoice-gen',
    processId:'billing-cycle', stageId:'billing-invoice-gen',
    name:'TechGroup SAC', meta:'Billing Cycle · Finance',
    initials:'TG', days:2, sla:'ok', showInCeo:false,
    detail:{
      title:'TechGroup SAC — Invoice Generation',
      owner:'Finance', status:'Active',
      process:'Monthly Billing → Invoice Generation', system:'ERP / SAP',
      priority:'Normal · April cycle',
      description:'April invoice for TechGroup SAC (Peru). Amount: €7,800.',
      nextAction:'Verify PEN/EUR exchange rate applied matches the April 1 rate per contract.',
    },
  },
  {
    id:'case-grupo-norte-invoice-gen',
    processId:'billing-cycle', stageId:'billing-invoice-gen',
    name:'Grupo Norte', meta:'Billing Cycle · Finance',
    initials:'GN', days:2, sla:'ok', showInCeo:false,
    detail:{
      title:'Grupo Norte — Invoice Generation',
      owner:'Finance', status:'Active',
      process:'Monthly Billing → Invoice Generation', system:'ERP / SAP',
      priority:'Normal · April cycle',
      description:'April invoice for Grupo Norte (Colombia). Amount: €5,600.',
      nextAction:"Confirm billing address has been updated per last month's request.",
    },
  },
  // CEO-level billing summary (no stage-roster counterpart)
  {
    id:'case-april-billing',
    processId:'billing-cycle', stageId:'billing-invoice-gen',
    name:'April Billing Cycle', meta:'Billing Cycle · Finance',
    initials:'AB', days:2, sla:'ok',
    showInCeo:true, title:'Monthly Billing — April 2026',
    stage:'Invoice Generation', owner:'Finance', slaLabel:'4 days', status:'active',
    detail:{
      title:'Monthly Billing Cycle — April 2026',
      owner:'Finance Team', status:'In Progress',
      process:'Monthly Billing Cycle → Invoice Generation', system:'ERP / SAP',
      priority:'High · 4 days SLA remaining',
      description:'April billing cycle underway. 47 invoices generated. 12 under review. 3 exceptions flagged for correction before approval.',
      nextAction:'Finance analyst to complete review of the 47 generated invoices by EOD.',
      evidence:'Invoice review sign-off from Finance Analyst',
    },
  },

  // ── Billing Cycle · Invoice Review ──────────
  {
    id:'case-auna-inv0042-review',
    processId:'billing-cycle', stageId:'billing-invoice-review',
    name:'AUNA — INV-0042', meta:'Billing Cycle · Finance',
    initials:'AU', days:3, sla:'warn', showInCeo:false,
    detail:{
      title:'AUNA INV-0042 — Invoice Review',
      owner:'Finance Analyst', status:'Watch',
      process:'Monthly Billing → Review', system:'ERP',
      priority:'High · 3 days in review · Overdue payment flag',
      description:'INV-0042 for AUNA Group (€18,400) is under review. Amount matches contract but payment for last month\'s invoice (INV-0038) is still outstanding — 15 days overdue.',
      nextAction:"Flag the outstanding INV-0038 balance in the review notes. Do not hold this invoice — send it with a payment reminder for both.",
    },
  },
  {
    id:'case-pichincha-inv0038-review',
    processId:'billing-cycle', stageId:'billing-invoice-review',
    name:'Pichincha INV-0038', meta:'Billing Cycle · Finance',
    initials:'PI', days:1, sla:'ok', showInCeo:false,
    detail:{
      title:'Pichincha INV-0038 — Invoice Review',
      owner:'Finance Analyst', status:'Active',
      process:'Monthly Billing → Review', system:'ERP',
      priority:'Normal · 1 day in review',
      description:'INV-0038 for Pichincha Bank (€12,200). Straightforward review — no discrepancies found.',
      nextAction:'Sign off and submit to Finance Manager for approval.',
    },
  },

  // ── Billing Cycle · Payment ──────────────────
  {
    id:'case-auna-inv0038-payment',
    processId:'billing-cycle', stageId:'billing-payment',
    name:'AUNA — INV-0038', meta:'Billing Cycle · Finance',
    initials:'AU', days:15, sla:'overdue', showInCeo:false,
    detail:{
      title:'AUNA INV-0038 — Payment Overdue',
      owner:'Finance', status:'Overdue',
      process:'Monthly Billing → Payment', system:'Banking / ERP',
      priority:'Critical · 15 days overdue · €18,400',
      description:'INV-0038 issued to AUNA Group on April 14 for €18,400. Payment due April 19. Now 15 days overdue with no payment received.',
      blocker:'No payment received despite two reminders sent on April 22 and April 26.',
      nextAction:'Escalate to Account Manager. Issue formal overdue notice with 5-day payment ultimatum.',
      suggestedMessage:'Dear AUNA Finance Team, INV-0038 (€18,400) issued April 14 remains unpaid as of today. Please arrange payment within 5 business days to avoid late fees as per contract clause 8.2.',
    },
  },

  // ── Purchase Request · Approval ──────────────
  {
    id:'case-office-supplies',
    processId:'purchase-request', stageId:'pr-approval',
    name:'Office Supplies Q2', meta:'Purchase Request · Admin',
    initials:'OS', days:1, sla:'ok', showInCeo:false,
    detail:{
      title:'Office Supplies Q2 — PR Approval',
      owner:'Manager + Finance', status:'Active',
      process:'Purchase Request → Approval', system:'ERP',
      priority:'Normal · €1,200',
      description:'Q2 office supplies order (Lima office). Vendor: Staples Perú. Amount: €1,200. Manager approved — awaiting Finance countersignature.',
      nextAction:'Finance to countersign in ERP today.',
    },
  },
  {
    id:'case-monitor-x4',
    processId:'purchase-request', stageId:'pr-approval',
    name:'Monitor x4 — IT', meta:'Purchase Request · IT',
    initials:'MO', days:2, sla:'warn', showInCeo:false,
    detail:{
      title:'Monitor x4 — IT Purchase Approval',
      owner:'Manager + Finance', status:'Watch',
      process:'Purchase Request → Approval', system:'ERP',
      priority:'High · €2,800 · 2 days pending',
      description:'4 monitors for the Bogotá IT team. Vendor: LG Colombia. Amount: €2,800. Manager approved on Day 1. Finance has not yet acted — SLA is today.',
      nextAction:'Remind Finance to approve before EOD — this is blocking IT desk setup for 2 new hires.',
      suggestedMessage:'Hi Francisco, the monitor purchase PR (REF-2026-0048, €2,800) is awaiting your approval in ERP. New hire desk setups depend on this. Can you approve today?',
    },
  },
  {
    id:'case-chairs-x8',
    processId:'purchase-request', stageId:'pr-approval',
    name:'Ergonomic Chairs x8', meta:'Purchase Request · HR',
    initials:'EC', days:1, sla:'ok', showInCeo:false,
    detail:{
      title:'Ergonomic Chairs x8 — PR Approval',
      owner:'Manager + Finance', status:'Active',
      process:'Purchase Request → Approval', system:'ERP',
      priority:'Normal · €3,600',
      description:'8 ergonomic chairs for the Santo Domingo office. HR-initiated. Amount: €3,600. Submitted yesterday — on track.',
      nextAction:'Both manager and Finance to approve within today.',
    },
  },

  // ── Purchase Request · PO Issuance ───────────
  {
    id:'case-laptop-batch-po',
    processId:'purchase-request', stageId:'pr-po-issuance',
    name:'Laptop x3 — IT Batch', meta:'Laptop Lifecycle · IT',
    initials:'LB', days:2, sla:'ok', showInCeo:false,
    detail:{
      title:'Laptop x3 — PO Issuance',
      owner:'Procurement', status:'Active',
      process:'Laptop Lifecycle → PO Issuance', system:'ERP / SAP',
      priority:'High · 2 days · New hire dependency',
      description:'PO being issued for 3 laptops (Dell XPS 15) for Q2 new hires. Vendor confirmed delivery in 5 business days.',
      nextAction:'Issue official PO in SAP and email vendor confirmation to IT for tracking.',
    },
  },

  // ➕ new case here
];

/* ═══════════════════════════════════════════════
   6. AUDIT TRAILS
   ─────────────────────────────────────────────
   Keyed by stage ID or case ID.
   Dot colors: system=blue  human=green
               alert=orange blocked=red  done=grey

   Stage-level: cross-case activity for that stage.
   Case-level:  lifecycle history for one case.

   ➕ ADD STAGE TRAIL: key = exact stage ID
      e.g. 'laptop-procurement'
   ➕ ADD CASE TRAIL:  key = exact case ID
      e.g. 'case-ana-ruiz'
═══════════════════════════════════════════════ */
const AUDIT_TRAILS = {
  // ── Stage-level ──────────────────────────────
  'laptop-procurement': [
    { time:'Apr 29, 11:42', actor:'ERP / SAP · Auto',      action:'PO draft REF-2026-0041 created for Q2 hardware batch',      type:'system'  },
    { time:'Apr 29, 09:15', actor:'Jordan Davis · IT Ops', action:'Vendor quote accepted — Dell unit confirmed in local stock', type:'human'   },
    { time:'Apr 28, 16:50', actor:'ITSM · Auto',           action:'3 procurement tickets escalated to IT Procurement queue',    type:'system'  },
    { time:'Apr 28, 14:30', actor:'Finance · Auto',        action:'Budget check passed on all 3 open requests',                type:'done'    },
    { time:'Apr 27, 10:05', actor:'Manager Portal · Auto', action:'Approval recorded for Carlos Mendez request',               type:'done'    },
  ],
  'onboard-it-setup': [
    { time:'Apr 29, 10:20', actor:'Jordan Davis · IT Ops',  action:'MDM enrollment pending — blocked on laptop physical delivery', type:'alert'  },
    { time:'Apr 29, 08:45', actor:'Active Directory · Auto',action:'AD account created: a.ruiz@company.com',                      type:'system' },
    { time:'Apr 28, 17:00', actor:'IT Operations',          action:'Laptop assigned from inventory — serial SN-2026-0089',        type:'human'  },
    { time:'Apr 28, 14:10', actor:'ITSM · Auto',            action:'IT setup ticket opened — linked to onboarding case #HR-441', type:'system' },
    { time:'Apr 27, 09:30', actor:'HR · Workday',           action:'Onboarding milestone: Documents stage completed',             type:'done'   },
  ],
  'offboard-it-revoke': [
    { time:'Apr 29, 12:00', actor:'System · Security Scan', action:'ALERT: Active AD account detected 3 days post-departure',    type:'blocked'},
    { time:'Apr 29, 09:00', actor:'IT Manager',             action:'Escalation raised — awaiting emergency revocation approval', type:'alert'  },
    { time:'Apr 28, 08:30', actor:'IT Operations',          action:'Revocation checklist sent — no response received',           type:'alert'  },
    { time:'Apr 27, 08:30', actor:'IT Operations',          action:'First revocation attempt — manager approval not obtained',   type:'blocked'},
    { time:'Apr 26, 17:00', actor:'HRIS · Auto',            action:'Offboarding milestone: IT Revoke stage entered',             type:'system' },
  ],
  'offboard-knowledge': [
    { time:'Apr 29, 11:15', actor:'Daniel Mora',           action:'Handover document updated — 60% complete',                  type:'human'  },
    { time:'Apr 28, 15:30', actor:'HR · Auto',             action:'SLA breach flag raised — knowledge transfer now overdue',   type:'blocked'},
    { time:'Apr 27, 10:00', actor:'Manager',               action:'First review of handover doc — feedback sent to employee',  type:'human'  },
    { time:'Apr 25, 09:00', actor:'HR · Confluence',       action:'Handover template shared with Daniel Mora',                 type:'system' },
    { time:'Apr 24, 14:00', actor:'HRIS · Auto',           action:'Offboarding milestone: Knowledge Transfer stage entered',   type:'done'   },
  ],
  'vendor-due-diligence': [
    { time:'Apr 29, 09:00', actor:'Maria Gonzalez · Finance', action:'Third reminder sent to ACME — no response',              type:'blocked'},
    { time:'Apr 26, 10:30', actor:'Compliance Portal · Auto', action:'NIT document flagged as expired (March 2026)',            type:'alert'  },
    { time:'Apr 24, 14:00', actor:'Maria Gonzalez · Finance', action:'Second reminder sent — document resubmission requested', type:'alert'  },
    { time:'Apr 21, 11:00', actor:'Maria Gonzalez · Finance', action:'KYC documents requested from ACME vendor contact',       type:'human'  },
    { time:'Apr 17, 09:30', actor:'Internal Portal · Auto',   action:'Vendor request approved — due diligence stage entered',  type:'done'   },
  ],
  'billing-invoice-gen': [
    { time:'Apr 29, 08:00', actor:'ERP / SAP · Scheduler', action:'April billing batch initiated — 4 clients queued',         type:'system' },
    { time:'Apr 29, 08:02', actor:'ERP / SAP · Auto',      action:'AUNA Group invoice INV-0042 generated — €18,400',          type:'system' },
    { time:'Apr 29, 08:03', actor:'ERP / SAP · Auto',      action:'Pichincha Bank invoice INV-0043 generated — €12,200',      type:'system' },
    { time:'Apr 29, 08:04', actor:'ERP / SAP · Auto',      action:'TechGroup SAC invoice INV-0044 generated — €7,800',        type:'system' },
    { time:'Apr 29, 08:05', actor:'ERP / SAP · Auto',      action:'Grupo Norte invoice INV-0045 generated — €5,600',          type:'system' },
    { time:'Apr 29, 08:06', actor:'ERP / SAP · Auto',      action:'Batch complete — 4 invoices queued for review',            type:'done'   },
  ],
  'pr-approval': [
    { time:'Apr 29, 10:45', actor:'ERP · Auto',            action:'Finance notified of pending countersignature — Monitor x4', type:'alert'  },
    { time:'Apr 29, 09:00', actor:'ERP · Auto',            action:'SLA warning: Monitor x4 PR approaching 48h limit',          type:'alert'  },
    { time:'Apr 28, 16:30', actor:'Manager · ERP',         action:'Manager approved: Monitor x4 purchase (€2,800)',            type:'human'  },
    { time:'Apr 28, 14:00', actor:'Procurement Coord.',    action:'PR submitted: Ergonomic Chairs x8 — €3,600',               type:'done'   },
    { time:'Apr 28, 11:20', actor:'IT Operations',         action:'PR submitted: Monitor x4 for Bogotá team — €2,800',        type:'done'   },
  ],
  'billing-payment': [
    { time:'Apr 29, 09:00', actor:'Finance · Auto',        action:'Second overdue reminder sent to AUNA — INV-0038',           type:'blocked'},
    { time:'Apr 26, 09:00', actor:'Finance · Auto',        action:'First overdue reminder sent — no payment received',         type:'alert'  },
    { time:'Apr 22, 00:00', actor:'ERP · Auto',            action:'Payment due date passed — INV-0038 marked overdue',         type:'alert'  },
    { time:'Apr 19, 14:30', actor:'ERP / SAP · Auto',      action:'Invoice INV-0038 dispatched to AUNA finance contact',       type:'system' },
    { time:'Apr 14, 08:10', actor:'ERP / SAP · Auto',      action:'Invoice INV-0038 generated and approved — €18,400',        type:'done'   },
  ],
  // ➕ new stage trail here

  // ── Case-level ───────────────────────────────
  'case-carlos-mendez': [
    { time:'Apr 29, 09:15', actor:'Jordan Davis · IT Ops', action:'Vendor quote accepted — Dell in stock, PO being drafted',   type:'human'  },
    { time:'Apr 28, 14:30', actor:'Finance · ERP',         action:'Budget check passed — €1,200 approved',                     type:'done'   },
    { time:'Apr 28, 10:00', actor:'Manager · ITSM',        action:'Laptop request approved by line manager',                   type:'done'   },
    { time:'Apr 27, 16:45', actor:'Carlos Mendez',         action:'Laptop request submitted via ITSM Portal',                  type:'done'   },
  ],
  'case-q2-hardware-batch': [
    { time:'Apr 29, 11:42', actor:'ERP / SAP · Auto',      action:'PO REF-2026-0041 draft created — awaiting countersignature',type:'alert'  },
    { time:'Apr 29, 10:00', actor:'IT Operations',         action:'Finance countersignature chased — no response yet',         type:'alert'  },
    { time:'Apr 28, 16:00', actor:'Manager · ITSM',        action:'Q2 hardware batch approved by IT Manager',                  type:'done'   },
    { time:'Apr 25, 09:00', actor:'IT Operations',         action:'Batch request submitted — 3 laptops for Q2 new hires',      type:'done'   },
  ],
  'case-sofia-paredes': [
    { time:'Apr 29, 08:50', actor:'Jordan Davis · IT Ops', action:'Vendor quote received — PO to be issued today',            type:'human'  },
    { time:'Apr 28, 17:00', actor:'Manager · ITSM',        action:'Request approved by line manager',                          type:'done'   },
    { time:'Apr 28, 15:30', actor:'Sofia Paredes',         action:'Laptop request submitted via ITSM Portal',                  type:'done'   },
  ],
  'case-luis-torres': [
    { time:'Apr 29, 12:00', actor:'IT Operations',         action:'Third pickup attempt — Luis Torres not responding',         type:'blocked'},
    { time:'Apr 28, 09:00', actor:'ITSM · Auto',           action:'SLA breach logged — pickup 4 days overdue',                 type:'blocked'},
    { time:'Apr 27, 14:00', actor:'IT Operations',         action:'Second pickup attempt — no answer at address',              type:'alert'  },
    { time:'Apr 26, 10:00', actor:'IT Operations',         action:'Pickup scheduled — address confirmed with HR',              type:'human'  },
    { time:'Apr 25, 08:30', actor:'HR · ITSM',             action:'Equipment return ticket opened for Luis Torres',            type:'done'   },
    { time:'Apr 24, 17:00', actor:'HRIS · Auto',           action:'Offboarding completed — equipment return triggered',        type:'done'   },
  ],
  'case-roberto-quispe': [
    { time:'Apr 29, 11:00', actor:'IT Operations',         action:'Courier notified — Lima office pickup confirmed for Apr 30',type:'human'  },
    { time:'Apr 29, 09:30', actor:'HR · ITSM',             action:'Return ticket opened — internal transfer case',             type:'done'   },
  ],
  'case-ana-ruiz': [
    { time:'Apr 29, 10:20', actor:'Jordan Davis · IT Ops',  action:'MDM enrollment pending — laptop in transit to office',    type:'alert'  },
    { time:'Apr 29, 08:45', actor:'Active Directory · Auto',action:'AD account created: a.ruiz@company.com',                  type:'system' },
    { time:'Apr 28, 17:00', actor:'IT Operations',          action:'Laptop SN-2026-0089 assigned and imaged',                 type:'human'  },
    { time:'Apr 28, 14:10', actor:'ITSM · Auto',            action:'IT setup ticket #IT-2026-441 created',                    type:'system' },
    { time:'Apr 27, 16:00', actor:'HR · DocuSign',          action:'All documents signed and validated',                      type:'done'   },
    { time:'Apr 25, 09:00', actor:'HR · Workday',           action:'Ana Ruiz onboarding record created',                      type:'done'   },
  ],
  'case-daniel-mora': [
    { time:'Apr 29, 11:15', actor:'Daniel Mora',           action:'Handover document updated — 60% complete, key gaps remain', type:'alert'  },
    { time:'Apr 28, 15:30', actor:'HRIS · Auto',           action:'SLA breach — knowledge transfer stage exceeded 5-day limit',type:'blocked'},
    { time:'Apr 27, 10:00', actor:'Manager',               action:'First review completed — 3 sections still missing',         type:'human'  },
    { time:'Apr 25, 09:00', actor:'HR · Confluence',       action:'Handover template sent to Daniel Mora',                    type:'done'   },
    { time:'Apr 24, 14:00', actor:'HRIS · Auto',           action:'Offboarding initiated — Daniel Mora, Operations Lead',     type:'done'   },
  ],
  'case-isabella-cruz': [
    { time:'Apr 29, 10:00', actor:'Isabella Cruz',         action:'Handover document 80% complete — final review pending',    type:'human'  },
    { time:'Apr 28, 09:00', actor:'Manager',               action:'First review completed — minor additions requested',        type:'human'  },
    { time:'Apr 27, 14:00', actor:'HR · Confluence',       action:'Handover template completed and submitted',                 type:'done'   },
    { time:'Apr 27, 09:00', actor:'HRIS · Auto',           action:'Offboarding initiated — Isabella Cruz, HR Coordinator',    type:'done'   },
  ],
  'case-sergio-vega': [
    { time:'Apr 29, 12:00', actor:'Security Scan · Auto',  action:'CRITICAL: AD account active 3 days post-departure',        type:'blocked'},
    { time:'Apr 29, 09:00', actor:'IT Manager',            action:'Escalation raised — emergency revocation requested',        type:'blocked'},
    { time:'Apr 28, 08:30', actor:'IT Operations',         action:'Revocation checklist resent — no manager approval received',type:'alert'  },
    { time:'Apr 27, 08:30', actor:'IT Operations',         action:'Revocation attempt failed — manager approval required',     type:'blocked'},
    { time:'Apr 26, 17:00', actor:'HRIS · Auto',           action:'Last working day logged — IT Revoke stage entered',         type:'done'   },
    { time:'Apr 26, 09:00', actor:'HR',                    action:'Offboarding finalised — Sergio Vega departure confirmed',   type:'done'   },
  ],
  'case-acme-corp': [
    { time:'Apr 29, 09:00', actor:'Maria Gonzalez',        action:'Final notice issued — ACME must respond by Apr 30',        type:'blocked'},
    { time:'Apr 26, 10:30', actor:'Compliance Portal',     action:'ACME NIT document expired March 2026 — flag raised',       type:'blocked'},
    { time:'Apr 24, 14:00', actor:'Maria Gonzalez',        action:'Second reminder sent — no response in 3 days',             type:'alert'  },
    { time:'Apr 21, 11:00', actor:'Maria Gonzalez',        action:'KYC package sent to ACME compliance contact',              type:'human'  },
    { time:'Apr 17, 09:30', actor:'Procurement',           action:'Vendor request approved — ACME Corp (Colombia supplier)',   type:'done'   },
  ],
  'case-auna-invoice-gen': [
    { time:'Apr 29, 08:02', actor:'ERP / SAP · Auto',      action:'Invoice INV-0042 generated — €18,400 · April service period',type:'system'},
    { time:'Apr 28, 00:00', actor:'ERP · Scheduler',       action:'AUNA queued for April billing run',                         type:'done'  },
    { time:'Mar 31, 12:00', actor:'Finance',               action:'March invoice INV-0038 sent — payment pending (overdue)',   type:'alert'  },
  ],
  'case-auna-inv0042-review': [
    { time:'Apr 29, 09:00', actor:'Finance Analyst',       action:'Review started — March outstanding balance flagged',        type:'alert'  },
    { time:'Apr 29, 08:02', actor:'ERP / SAP · Auto',      action:'INV-0042 queued for review after batch generation',         type:'system' },
    { time:'Apr 26, 09:00', actor:'Finance · Auto',        action:'Reminder 2 sent for INV-0038 — still unpaid',              type:'alert'  },
  ],
  'case-auna-inv0038-payment': [
    { time:'Apr 29, 09:00', actor:'Finance · Auto',        action:'Overdue reminder 2 sent to AUNA finance contact',          type:'blocked'},
    { time:'Apr 26, 09:00', actor:'Finance · Auto',        action:'Overdue reminder 1 sent — 7 days past due',                type:'alert'  },
    { time:'Apr 22, 00:00', actor:'ERP · Auto',            action:'Payment due date passed — INV-0038 flagged overdue',        type:'alert'  },
    { time:'Apr 19, 14:30', actor:'ERP / SAP · Auto',      action:'Invoice INV-0038 dispatched to AUNA billing contact',      type:'system' },
    { time:'Apr 14, 08:10', actor:'Finance Manager',       action:'Invoice batch approved — INV-0038 signed off',              type:'done'   },
  ],
  'case-office-supplies': [
    { time:'Apr 29, 08:00', actor:'ERP · Auto',            action:'Finance notified of pending approval',                     type:'human'  },
    { time:'Apr 28, 16:00', actor:'Office Manager',        action:'PR submitted — Q2 office supplies, Lima office',            type:'done'   },
  ],
  'case-monitor-x4': [
    { time:'Apr 29, 10:45', actor:'ERP · Auto',            action:'SLA warning: Finance countersignature overdue',             type:'alert'  },
    { time:'Apr 28, 16:30', actor:'IT Manager · ERP',      action:'Manager approval recorded',                                 type:'done'   },
    { time:'Apr 28, 11:20', actor:'Jordan Davis · IT Ops', action:'PR submitted — 4 monitors for Bogotá team',                 type:'done'   },
  ],
  'case-chairs-x8': [
    { time:'Apr 29, 08:30', actor:'ERP · Auto',            action:'Manager and Finance notified of pending approvals',         type:'human'  },
    { time:'Apr 28, 14:00', actor:'HR Coordinator',        action:'PR submitted — ergonomic chairs, Santo Domingo office',     type:'done'   },
  ],
  'case-laptop-batch-po': [
    { time:'Apr 29, 11:00', actor:'Jordan Davis · IT Ops', action:'Vendor confirmed 5-day delivery window',                   type:'human'  },
    { time:'Apr 29, 09:30', actor:'ERP / SAP · Auto',      action:'PO draft ready — awaiting final issuance',                 type:'system' },
    { time:'Apr 28, 15:00', actor:'Finance · ERP',         action:'Dual approval complete — PO authorised',                   type:'done'   },
    { time:'Apr 27, 10:00', actor:'IT Operations',         action:'Laptop batch PR submitted for Q2 new hires',                type:'done'   },
  ],
  // ➕ new case trail here
};

/* ═══════════════════════════════════════════════
   7. DASHBOARD DATA
   ─────────────────────────────────────────────
   Static display data for CEO, Area, and User.
   CEO_DATA.cases is auto-populated from CASES
   in section 8 — do not set it manually here.
═══════════════════════════════════════════════ */
const CEO_DATA = {
  kpis: [
    { id:'revenue', label:'Revenue Today', value:'€247K', delta:'↑ 12% vs yesterday', trend:'up',
      detail:{ title:'Revenue — Today', owner:'Finance', status:'On Track', process:'Monthly Billing Cycle', system:'ERP / SAP', priority:'High',
        nextAction:'Review open invoices for AUNA and Pichincha. Confirm Pichincha payment has cleared.',
        description:'Total invoiced revenue for today across all active clients. Up 12% vs same day yesterday, driven by Pichincha bulk payment confirmation received this morning.' }},
    { id:'cases', label:'Open Cases', value:'34', delta:'Across 7 processes', trend:'neutral',
      detail:{ title:'Open Cases — All Processes', owner:'Operations', status:'34 Active', process:'All Processes', system:'ITSM + ERP', priority:'Medium',
        nextAction:'Review the 7 blocked cases requiring decisions. Assign owners to the 3 unowned blocked tasks.',
        description:'34 active cases across 7 processes. 7 are blocked and need immediate attention. 3 are past their SLA deadline.' }},
    { id:'sla', label:'SLA Compliance', value:'87%', delta:'↓ 4% vs last week', trend:'down',
      detail:{ title:'SLA Compliance — Company Wide', owner:'Operations', status:'At Risk', process:'All Processes', system:'ITSM', priority:'High',
        nextAction:'Investigate the 3 SLA failures: IT Revoke (Offboarding), Vendor Onboarding (ACME), and Equipment Return (Torres).',
        description:'Company-wide SLA compliance at 87%, down 4% from last week. Primary causes: Employee Offboarding IT Revoke past deadline (3 days), ACME Vendor Onboarding stalled at Due Diligence (12 days), and Equipment Return pickup delayed.' }},
    { id:'blocked', label:'Blocked Tasks', value:'7', delta:'Immediate action needed', trend:'down',
      detail:{ title:'Blocked Tasks — Immediate Action', owner:'Multiple Owners', status:'Blocked', process:'Multiple', system:'ITSM + ERP', priority:'Critical',
        nextAction:'Assign owner to 3 unowned tasks. Follow up on vendor NIT document. Escalate IT Revoke delay.',
        description:'7 tasks blocked across 4 processes. 3 have no assigned owner. Key blockers: missing vendor KYC document (Finance), 2 purchase requests awaiting Finance approval past SLA, and 1 IT access revocation waiting on Legal sign-off.',
        blocker:'3 blocked tasks have no assigned owner' }},
    { id:'clients', label:'Active Clients', value:'12', delta:'3 at risk', trend:'neutral',
      detail:{ title:'Active Clients — Risk Summary', owner:'Finance / Account Management', status:'3 at Risk', process:'Billing Cycle', system:'ERP + CRM', priority:'High',
        nextAction:'Contact AUNA about overdue invoice. Confirm Pichincha payment. Follow up on third client contract renewal.',
        description:'12 active clients. 3 flagged at risk: AUNA (invoice INV-0042, €18,400 overdue 15 days), Pichincha (payment confirmation pending), and one client with contract renewal past due.' }},
  ],
  pipeline: [
    { stage:'Lead',        count:8,  label:'prospects' },
    { stage:'Proposal',    count:5,  label:'in review'  },
    { stage:'Negotiation', count:3,  label:'active'     },
    { stage:'Contract',    count:2,  label:'signing'    },
    { stage:'Active',      count:12, label:'clients'    },
  ],
  alerts: [
    { id:'a1', level:'critical', title:'Vendor Onboarding Stalled — ACME', desc:'Due Diligence pending · 12 days overdue',
      detail:{ title:'Vendor Onboarding Stalled — ACME Supplier', owner:'Maria Gonzalez · Finance', status:'Blocked', process:'Vendor Onboarding → Due Diligence', system:'Compliance Portal', priority:'Critical · 12 days overdue',
        nextAction:'Finance contacts ACME today to resubmit the expired NIT (Colombia). Escalate to Finance Director if not resolved by EOD.',
        evidence:'Valid NIT document (issued < 6 months ago) uploaded to Compliance Portal',
        description:"ACME Supplier's registration is stalled because the NIT (Colombian tax ID) submitted was expired. The vendor was notified 5 days ago but has not resubmitted.",
        suggestedMessage:'Dear ACME team, the NIT document submitted on [Date] was rejected — it expired on [Date]. Please upload a valid NIT (issued within the last 6 months) to our portal by [Date + 2 days] to avoid further delays in your registration.',
        blocker:'Expired NIT document — vendor has not resubmitted after notification' }},
    { id:'a2', level:'critical', title:'SLA Breach — IT Access Not Revoked', desc:'Employee Offboarding · 3 days past deadline',
      detail:{ title:'IT Access Revocation SLA Breach', owner:'Carlos Mendez · IT Operations', status:'Blocked', process:'Employee Offboarding → IT Revoke', system:'Active Directory + All Systems', priority:'Critical · SLA breached 3 days ago',
        nextAction:'IT Operations must complete full access revocation today. Escalate to IT Manager in 2 hours if not done.',
        evidence:'Access revocation checklist signed by IT Manager — all systems confirmed removed',
        description:'IT access revocation for a departed employee has not been completed 3 days after their last working date. This is a live security and compliance risk.',
        blocker:'IT Operations task not assigned to specific technician. No owner.' }},
    { id:'a3', level:'warn', title:'Purchase Requests Awaiting Finance', desc:'2 PRs · Finance approval >48 hours',
      detail:{ title:'Purchase Requests Pending Finance Approval', owner:'Finance Team', status:'Pending', process:'Purchase Request → Approval', system:'ERP', priority:'High · 48h+ waiting',
        nextAction:'Finance team to review and approve or reject PR #1823 and PR #1824 today. SLA is 24 hours.',
        evidence:'Approval decisions recorded in ERP for both PRs',
        description:'Two purchase requests (PR #1823 and PR #1824) have been waiting for Finance approval for more than 48 hours, exceeding the 24-hour SLA for this stage.' }},
    { id:'a4', level:'warn', title:'AUNA Invoice Overdue — €18,400', desc:'Invoice INV-0042 · 15 days overdue',
      detail:{ title:'AUNA Invoice Overdue — INV-0042', owner:'Finance / Account Manager', status:'Overdue', process:'Monthly Billing Cycle', system:'ERP + Banking', priority:'High · 15 days overdue',
        nextAction:'Finance sends final payment reminder today. If no payment commitment by [Date + 3], escalate to Director for formal collection notice.',
        evidence:'Payment confirmation from AUNA banking portal or wire transfer receipt',
        description:'Invoice INV-0042 for €18,400 sent to AUNA remains unpaid after 15 days. Two standard reminders have been sent.',
        suggestedMessage:'Dear AUNA Finance team, we write regarding invoice INV-0042 (€18,400) dated [Date], now 15 days overdue. Please arrange payment and send confirmation by [Date + 3 days] to avoid interruption of services.' }},
    { id:'a5', level:'info', title:'3 Laptops Pending Setup', desc:'Hardware received · Setup not started',
      detail:{ title:'3 Laptops Pending Setup', owner:'IT Operations', status:'Pending', process:'Laptop Lifecycle → Setup', system:'MDM / Jamf', priority:'Normal · 1 day remaining in SLA',
        nextAction:'Assign an IT technician to begin imaging all 3 devices today.',
        evidence:'Device imaging completion report with serial numbers',
        description:'3 laptops received from vendor yesterday are in the IT lab pending setup. Setup SLA is 1 business day — action needed today to stay on track for the 3 assigned employees.' }},
  ],
  cases: [], // ← auto-built from CASES in section 8
};

const AREA_DATA = {
  hr: {
    title:'HR Area View', sub:'Human Resources · Manager control panel',
    kpis: [
      { id:'hr-team',    label:'Team Members', value:'8',  delta:'2 at capacity',   trend:'neutral', detail:{ title:'HR Team Workload',   owner:'HR Manager', status:'2 at Capacity',   description:'8 total HR team members. Ana Martinez and Carlos Reyes are at capacity this week due to simultaneous onboarding and offboarding cases.' }},
      { id:'hr-cases',   label:'Active Cases',  value:'14', delta:'Across HR processes', trend:'neutral', detail:{ title:'Active HR Cases',  owner:'HR Team',    status:'14 Active',       description:'14 cases: Employee Onboarding (5), Employee Offboarding (2), HR Compliance (7).' }},
      { id:'hr-sla',     label:'SLA at Risk',   value:'3',  delta:'Due within 24h',  trend:'down',    detail:{ title:'SLA at Risk — HR',   owner:'HR Manager', status:'Needs Attention',  nextAction:'Immediate action required: IT Revoke for departing employee is 3 days past SLA.', description:'3 cases approaching or past SLA deadline within 24 hours.' }},
      { id:'hr-blocked', label:'Blocked',       value:'2',  delta:'Immediate action', trend:'down',    detail:{ title:'Blocked HR Cases',   owner:'HR Manager', status:'Blocked', blocker:'IT Revoke waiting on Legal sign-off; New hire ID documents not yet submitted', description:'2 cases blocked: IT Revoke for departing employee (waiting on Legal), and Onboarding documents for new hire (employee has not submitted ID).' }},
    ],
    team: [
      { name:'Ana Martinez',  role:'HR Generalist',  tasks:8, sla:'at-risk', cases:3, detail:{ title:'Ana Martinez — HR Generalist',  owner:'HR Manager', status:'At Capacity', description:'3 active cases: 2 onboardings and 1 offboarding. SLA at risk on Ruiz onboarding IT Setup.', nextAction:'Coordinate with IT to ensure Ana Ruiz IT setup completes today.' }},
      { name:'Carlos Reyes',  role:'HR Coordinator', tasks:6, sla:'ok',      cases:2, detail:{ title:'Carlos Reyes — HR Coordinator', owner:'HR Manager', status:'On Track',    description:'2 onboarding cases at document and orientation stages. Both on track.', nextAction:'Send orientation schedule to new hires starting next Monday.' }},
      { name:'Sofia Luna',    role:'HR Analyst',     tasks:4, sla:'ok',      cases:2, detail:{ title:'Sofia Luna — HR Analyst',       owner:'HR Manager', status:'On Track',    description:'Compliance documentation and 2 active cases. On track.', nextAction:'Complete compliance review for 2 cases by Thursday.' }},
      { name:'Miguel Torres', role:'HR Specialist',  tasks:5, sla:'warn',    cases:3, detail:{ title:'Miguel Torres — HR Specialist', owner:'HR Manager', status:'Watch',       description:'3 cases including 1 offboarding nearing SLA. Knowledge transfer stage at risk.', nextAction:'Check in with departing employee to ensure handover documentation is complete.' }},
    ],
    processes: [
      { name:'Employee Onboarding',  cases:5, status:'active'  },
      { name:'Employee Offboarding', cases:2, status:'blocked' },
      { name:'HR Compliance',        cases:7, status:'active'  },
    ],
  },
  operations: {
    title:'Operations Area View', sub:'IT Operations · Manager control panel',
    kpis: [
      { id:'ops-team',    label:'Team Members', value:'6',  delta:'1 at capacity',     trend:'neutral', detail:{ title:'IT Operations Team', owner:'IT Manager', status:'1 at Capacity',   description:'6 IT Operations team members. Jordan Davis is at capacity managing laptop setup and equipment return simultaneously.' }},
      { id:'ops-cases',   label:'Active Cases',  value:'11', delta:'Across IT processes', trend:'neutral', detail:{ title:'Active IT Cases',  owner:'IT Team',    status:'11 Active',       description:'11 cases: Laptop Lifecycle (8), Equipment Return (3).' }},
      { id:'ops-sla',     label:'SLA at Risk',   value:'2',  delta:'Equipment Return',  trend:'down',    detail:{ title:'IT SLA at Risk',    owner:'IT Manager', status:'Needs Attention', nextAction:'Equipment return for Torres must be scheduled today. 1 laptop setup past SLA by 1 day.', description:'2 equipment return cases approaching SLA. 1 laptop setup already past SLA.' }},
      { id:'ops-blocked', label:'Blocked',       value:'3',  delta:'Pending approvals', trend:'down',    detail:{ title:'Blocked IT Tasks',  owner:'IT Manager', status:'Blocked', blocker:'2 awaiting manager approval in ITSM; 1 awaiting Legal for access revocation', description:'3 blocked tasks across two processes.' }},
    ],
    team: [
      { name:'Jordan Davis', role:'IT Operations Lead', tasks:12, sla:'warn', cases:4, detail:{ title:'Jordan Davis — IT Operations Lead', owner:'IT Manager', status:'At Capacity', description:'4 cases: 3 laptop setups + 1 equipment return. SLA watch on 2 cases.', nextAction:'Prioritize equipment return for Torres — pickup must be scheduled today.' }},
      { name:'Pedro Alves',  role:'IT Technician',      tasks:7,  sla:'ok',   cases:3, detail:{ title:'Pedro Alves — IT Technician',      owner:'IT Manager', status:'On Track',    description:'3 cases in setup/delivery stage. On track.', nextAction:'Complete MDM enrollment for 2 pending devices by EOD.' }},
    ],
    processes: [
      { name:'Laptop Lifecycle', cases:8, status:'active' },
      { name:'Equipment Return', cases:3, status:'warn'   },
    ],
  },
  finance: {
    title:'Finance Area View', sub:'Finance · Manager control panel',
    kpis: [
      { id:'fin-team',    label:'Team Members',    value:'5',  delta:'All operational',   trend:'up',      detail:{ title:'Finance Team',           owner:'Finance Manager', status:'Operational',    description:'5 finance team members. No capacity issues this week.' }},
      { id:'fin-cases',   label:'Active Cases',    value:'16', delta:'Billing + Vendors',  trend:'neutral', detail:{ title:'Active Finance Cases',   owner:'Finance Team',    status:'16 Active',      description:'16 cases: Billing Cycle (12), Vendor Onboarding (4).' }},
      { id:'fin-sla',     label:'SLA at Risk',     value:'1',  delta:'Vendor onboarding',  trend:'down',    detail:{ title:'Finance SLA at Risk',    owner:'Finance Manager', status:'Needs Attention', nextAction:'ACME vendor onboarding past SLA by 12 days. Escalation required.', description:'ACME vendor onboarding is 12 days past SLA and blocked on KYC document.' }},
      { id:'fin-overdue', label:'Overdue Invoices', value:'1', delta:'€18,400 · AUNA',     trend:'down',    detail:{ title:'Overdue Invoice — AUNA', owner:'Finance',         status:'Overdue',         nextAction:'Send final payment demand to AUNA today.', blocker:'Invoice 15 days overdue — client has not committed to payment date', description:'AUNA invoice INV-0042 (€18,400) is 15 days overdue. Escalation in progress.' }},
    ],
    team: [
      { name:'Maria Gonzalez', role:'Finance Analyst',       tasks:9, sla:'at-risk', cases:5, detail:{ title:'Maria Gonzalez — Finance Analyst', owner:'Finance Manager', status:'At Risk',  description:'5 cases. ACME vendor onboarding blocked past SLA.', nextAction:'Follow up with ACME vendor for NIT document — set a hard deadline of today.' }},
      { name:'Francisco',      role:'Accountant (Contador)', tasks:6, sla:'ok',      cases:4, detail:{ title:'Francisco — Accountant',           owner:'Finance Manager', status:'On Track', description:'Managing April billing cycle cases. All on track for month close.', nextAction:'Complete invoice review batch by EOD.' }},
    ],
    processes: [
      { name:'Monthly Billing Cycle', cases:12, status:'active'  },
      { name:'Vendor Onboarding',     cases:4,  status:'blocked' },
    ],
  },
};

const USER_DATA = {
  kpis: [
    { id:'u-total',    label:'Total Tasks',  value:'12', delta:'Across all processes', detail:{ title:'My Task Overview',              description:'12 tasks across 3 active processes. 5 completed this week, 4 in progress, 3 overdue needing immediate attention.' }},
    { id:'u-done',     label:'Completed',    value:'5',  delta:'This week',            detail:{ title:'Completed Tasks',               description:'5 tasks completed this week. Approvals logged, shipping confirmed, and 2 MDM enrollments done.' }},
    { id:'u-progress', label:'In Progress',  value:'4',  delta:'Due this week',        detail:{ title:'In Progress Tasks',             description:'4 tasks in progress, all due this week. Top priority: Issue PO for Laptop Lifecycle.', nextAction:'Issue PO for 3 laptops in ERP today.' }},
    { id:'u-overdue',  label:'Overdue',      value:'3',  delta:'Needs attention',      detail:{ title:'Overdue Tasks — Action Required', status:'Overdue', description:'3 overdue: Equipment pickup for Torres, MDM enrollment for 2 devices.', nextAction:'Schedule Torres equipment pickup today. Complete MDM enrollments before EOD.', blocker:'These tasks are blocking downstream stages for other team members' }},
  ],
  approvals: [
    { id:'ap1', title:'Laptop Request — Miguel Torres', process:'Laptop Lifecycle', sla:'Due today',
      detail:{ title:'Approval Required — Laptop Request (Miguel Torres)', owner:'Jordan Davis (you)', status:'Pending Your Approval', process:'Laptop Lifecycle → Approval', system:'ITSM Portal', priority:'Normal · Due today',
        nextAction:'Review request in ITSM and approve or reject. Add a comment if rejecting.',
        evidence:'Approval decision recorded in ITSM',
        description:'Miguel Torres (HR Specialist) has submitted a laptop request. Business justification: current device is 5 years old and failing. Finance has confirmed budget availability.' }},
  ],
  tasks: [
    { id:'t1', name:'Issue Purchase Order — Laptop x3',        process:'Laptop Lifecycle',    stage:'Procurement', status:'active',  priority:'High',     sla:'2 days',  system:'ERP / SAP',            taskId:'issue-po'          },
    { id:'t2', name:'Schedule Equipment Pickup — Luis Torres', process:'Equipment Return',     stage:'Pickup',      status:'overdue', priority:'Critical', sla:'Overdue', system:'ITSM + Logistics',      taskId:'schedule-pickup'   },
    { id:'t3', name:'Image Device — 3 pending laptops',        process:'Laptop Lifecycle',    stage:'Setup',       status:'pending', priority:'High',     sla:'1 day',   system:'MDM / Jamf',            taskId:'image-device'      },
    { id:'t4', name:'Enroll Devices in MDM',                   process:'Laptop Lifecycle',    stage:'Setup',       status:'pending', priority:'High',     sla:'1 day',   system:'Jamf / Intune',         taskId:'enroll-mdm'        },
    { id:'t5', name:'Create AD Account — Ana Ruiz',            process:'Employee Onboarding', stage:'IT Setup',    status:'active',  priority:'High',     sla:'1 day',   system:'Active Directory',       taskId:'create-ad-account' },
    { id:'t6', name:'Provision Laptop — Ana Ruiz',             process:'Employee Onboarding', stage:'IT Setup',    status:'active',  priority:'High',     sla:'2 days',  system:'MDM / ITSM',            taskId:'provision-laptop'  },
    { id:'t7', name:'Log Asset — 3 new laptops',               process:'Laptop Lifecycle',    stage:'Delivery',    status:'pending', priority:'Normal',   sla:'3 days',  system:'ITSM Asset Management',  taskId:'log-asset'         },
  ],
};

/* ═══════════════════════════════════════════════
   8. DERIVED LOOKUPS
   ─────────────────────────────────────────────
   Auto-built from CASES. Do not edit here —
   edit section 5 (CASES) above instead.
═══════════════════════════════════════════════ */

// CASE_ROSTER keyed by stageId — powers the FLOW tab stage roster
const CASE_ROSTER = {};
CASES.forEach(c => {
  if (!CASE_ROSTER[c.stageId]) CASE_ROSTER[c.stageId] = [];
  CASE_ROSTER[c.stageId].push(c);
});

// CEO Running Cases — auto-filtered from CASES where showInCeo === true
// slaLabel replaces sla so the CEO list shows display text, not the color enum
CEO_DATA.cases = CASES
  .filter(c => c.showInCeo)
  .map(c => ({ ...c, sla: c.slaLabel }));


/* ═══════════════════════════════════════════════
   STATE
   ═══════════════════════════════════════════════ */
let flowState = { domain:null, processId:null, stageId:null };

/* ═══════════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════════ */
const ST  = { active:'st-active', done:'st-done', pending:'st-pending', blocked:'st-blocked', warn:'st-warn', 'at-risk':'st-blocked', ok:'st-active', overdue:'st-blocked', critical:'st-blocked' };
const STL = { active:'Active', done:'Done', pending:'Pending', blocked:'Blocked', warn:'Watch', 'at-risk':'At Risk', ok:'On Track', overdue:'Overdue', critical:'Critical' };

function stCls(s){ return ST[s] || 'st-pending'; }
function stLbl(s){ return STL[s] || (s||'Pending'); }

function pColor(p){
  if (!p) return 'var(--text3)';
  const pl = p.toLowerCase();
  if (pl.includes('critical')) return 'var(--danger)';
  if (pl.includes('high'))     return 'var(--accent4)';
  return 'var(--accent3)';
}

function deselect(cls){ document.querySelectorAll('.'+cls+'.sel').forEach(e=>e.classList.remove('sel')); }
function sel(el, cls){ deselect(cls); if(el) el.classList.add('sel'); }

function renderPanel(d){
  if(!d) return;
  document.getElementById('panel-title').textContent = d.title || 'Detail';
  let h = '';
  if(d.description)     h += dr('Overview', d.description);
  if(d.owner)           h += dr('Owner', d.owner);
  if(d.status)          h += dr('Status', `<span class="st ${stCls((d.rawStatus||d.status).toLowerCase())}">${d.status}</span>`);
  if(d.process)         h += dr('Process', d.process);
  if(d.system)          h += dr('System', d.system);
  if(d.priority)        h += dr('Priority / SLA', `<span style="color:${pColor(d.priority)}">${d.priority}</span>`);
  if(d.evidence)        h += dr('Evidence Required', d.evidence);
  if(d.blocker)         h += `<div class="d-sep"></div><div class="d-row"><div class="d-lbl" style="color:var(--danger)">⊗ Blocker</div><div class="blocker-box">${d.blocker}</div></div>`;
  if(d.nextAction)      h += `<div class="d-sep"></div>` + dr('Next Action', `<strong>${d.nextAction}</strong>`);
  if(d.suggestedMessage)h += dr('Suggested Message', `<div class="msg-box">${d.suggestedMessage}</div>`);
  document.getElementById('panel-body').innerHTML = h;
}

function renderActionGuide(t){
  document.getElementById('panel-title').textContent = t.name;
  let h = '';
  h += dr('What to Do', t.whatToDo);
  h += '<div class="d-sep"></div>';
  h += dr('Where to Do It', `<code style="font-size:10px;color:var(--accent);font-family:monospace">${t.whereToDoIt}</code>`);
  h += dr('System', t.system);
  h += dr('Owner', t.owner);
  const prioHtml = `<span style="color:${pColor(t.priority)}">${t.priority}</span>${t.sla ? ` · <span style="color:var(--accent4)">${t.sla}</span>` : ''}`;
  h += dr('Priority / SLA', prioHtml);
  h += '<div class="d-sep"></div>';
  h += dr('Evidence Required', t.evidence);
  if(t.suggestedMessage) h += dr('Suggested Message', `<div class="msg-box">${t.suggestedMessage}</div>`);
  h += '<div class="d-sep"></div>';
  h += dr('What Happens Next', `<strong>${t.nextStep}</strong>`);
  document.getElementById('panel-body').innerHTML = h;
}

function dr(label, val){ return `<div class="d-row"><div class="d-lbl">${label}</div><div class="d-val">${val}</div></div>`; }

function appendAuditTrail(id){
  const events = AUDIT_TRAILS[id];
  if(!events || !events.length) return;
  let h = `<div class="audit-trail"><div class="at-label">Audit Trail</div>`;
  events.forEach((e, i) => {
    const isLast = i === events.length - 1;
    h += `<div class="at-event">
      <div class="at-dot-col">
        <div class="at-dot ${e.type}"></div>
        ${isLast ? '' : '<div class="at-line"></div>'}
      </div>
      <div class="at-body">
        <div class="at-time">${e.time}</div>
        <div class="at-action">${e.action}</div>
        <div class="at-actor">${e.actor}</div>
      </div>
    </div>`;
  });
  h += '</div>';
  document.getElementById('panel-body').innerHTML += h;
}

function resetPanel(){
  document.getElementById('panel-title').textContent = 'Detail';
  document.getElementById('panel-body').innerHTML = `<div class="panel-empty"><div class="ico">◈</div><div class="msg">Select any item to see its owner, status, next action, evidence required, and suggested messages.</div></div>`;
}

/* ═══════════════════════════════════════════════
   VIEW SWITCHING
   ═══════════════════════════════════════════════ */
function switchView(v){
  document.querySelectorAll('.view').forEach(x=>x.classList.remove('active'));
  document.getElementById('view-'+v).classList.add('active');
  document.querySelectorAll('.nav-btn').forEach(x=>x.classList.remove('active'));
  document.getElementById('btn-'+v).classList.add('active');
  resetPanel();
}

/* ═══════════════════════════════════════════════
   CEO VIEW
   ═══════════════════════════════════════════════ */
function renderCEO(){
  const C = document.getElementById('ceo-body');
  let h = '';
  h += '<div class="kpi-row">';
  CEO_DATA.kpis.forEach(k=>{
    h += `<div class="kpi-card" onclick="pickKPI(this,'${k.id}')">
      <div class="kpi-label">${k.label}</div>
      <div class="kpi-value">${k.value}</div>
      <div class="kpi-delta ${k.trend}">${k.delta}</div>
    </div>`;
  });
  h += '</div>';
  h += `<div class="section"><div class="sec-hdr"><span class="sec-title">Revenue Spine — Lead → Payment</span></div><div class="pipeline">`;
  CEO_DATA.pipeline.forEach((p,i)=>{
    h += `<div class="pipe-st" onclick="pickPipe(this,'${p.stage}')">
      <div class="pipe-st-name">${p.stage}</div>
      <div class="pipe-st-count">${p.count}</div>
      <div class="pipe-st-lbl">${p.label}</div>
    </div>`;
    if(i<CEO_DATA.pipeline.length-1) h += '<div class="pipe-arrow">›</div>';
  });
  h += '</div></div>';
  h += '<div class="two-col">';
  h += `<div class="section"><div class="sec-hdr"><span class="sec-title">Critical Alerts</span><span class="sec-count">${CEO_DATA.alerts.length}</span></div>`;
  CEO_DATA.alerts.forEach(a=>{
    const c = a.level==='critical'?'var(--danger)':a.level==='warn'?'var(--accent4)':'var(--accent)';
    h += `<div class="alert-li" onclick="pickAlert(this,'${a.id}')">
      <div class="alert-dot" style="background:${c}"></div>
      <div class="li-body"><div class="li-name">${a.title}</div><div class="li-sub">${a.desc}</div></div>
    </div>`;
  });
  h += '</div>';
  h += `<div class="section"><div class="sec-hdr"><span class="sec-title">Running Cases</span><span class="sec-count">${CEO_DATA.cases.length} active</span></div>`;
  CEO_DATA.cases.forEach(c=>{
    h += `<div class="li" onclick="pickCase(this,'${c.id}')">
      <div class="li-body">
        <div class="li-name">${c.title}</div>
        <div class="li-sub">${c.stage} · ${c.owner} · SLA: ${c.sla}</div>
      </div>
      <span class="st ${stCls(c.status)}">${stLbl(c.status)}</span>
    </div>`;
  });
  h += '</div></div>';
  C.innerHTML = h;
}

function pickKPI(el,id){   sel(el,'kpi-card');  renderPanel(CEO_DATA.kpis.find(k=>k.id===id)?.detail); }
function pickAlert(el,id){ sel(el,'alert-li');  renderPanel(CEO_DATA.alerts.find(a=>a.id===id)?.detail); }
function pickCase(el,id){  sel(el,'li');        renderPanel(CEO_DATA.cases.find(c=>c.id===id)?.detail); }
function pickPipe(el,stage){
  const p = CEO_DATA.pipeline.find(x=>x.stage===stage);
  renderPanel({ title:`Revenue Spine — ${stage}`, owner:'Finance', description:`${p.count} ${p.label} at the ${stage} stage.`, nextAction:`Review ${stage} stage and ensure progression to the next stage.` });
}

/* ═══════════════════════════════════════════════
   AREA VIEW
   ═══════════════════════════════════════════════ */
let currentArea = 'hr';

function switchArea(a){ currentArea = a; renderArea(); resetPanel(); }

function renderArea(){
  const data = AREA_DATA[currentArea];
  document.getElementById('area-title').textContent = data.title;
  document.getElementById('area-sub').textContent   = data.sub;
  const C = document.getElementById('area-body');
  let h = '';
  h += '<div class="kpi-row">';
  data.kpis.forEach(k=>{
    h += `<div class="kpi-card" onclick="pickAreaKPI(this,'${k.id}')">
      <div class="kpi-label">${k.label}</div>
      <div class="kpi-value">${k.value}</div>
      <div class="kpi-delta ${k.trend}">${k.delta}</div>
    </div>`;
  });
  h += '</div>';
  h += `<div class="section"><div class="sec-hdr"><span class="sec-title">Team Workload</span><span class="sec-count">Click a row to see detail</span></div>
  <table class="dtable"><thead><tr><th>Name</th><th>Role</th><th>Tasks</th><th>SLA</th><th>Cases</th></tr></thead><tbody>`;
  data.team.forEach((m,i)=>{
    const lbl = m.sla==='at-risk'?'At Risk':m.sla==='warn'?'Watch':'On Track';
    const cls = m.sla==='at-risk'?'st-blocked':m.sla==='warn'?'st-warn':'st-active';
    h += `<tr class="row" onclick="pickTeam(this,${i})">
      <td><strong>${m.name}</strong></td>
      <td style="color:var(--text2)">${m.role}</td>
      <td>${m.tasks}</td>
      <td><span class="st ${cls}">${lbl}</span></td>
      <td>${m.cases}</td>
    </tr>`;
  });
  h += '</tbody></table></div>';
  h += `<div class="section"><div class="sec-hdr"><span class="sec-title">Cases by Process</span></div>`;
  data.processes.forEach((p,i)=>{
    h += `<div class="li" onclick="pickAreaProc(this,${i})">
      <div class="li-body"><div class="li-name">${p.name}</div><div class="li-sub">${p.cases} active cases</div></div>
      <span class="st ${stCls(p.status)}">${stLbl(p.status)}</span>
    </div>`;
  });
  h += '</div>';
  C.innerHTML = h;
}

function pickAreaKPI(el,id){ sel(el,'kpi-card'); renderPanel(AREA_DATA[currentArea].kpis.find(k=>k.id===id)?.detail); }
function pickTeam(el,i){     sel(el,'row');      renderPanel(AREA_DATA[currentArea].team[i]?.detail); }
function pickAreaProc(el,i){
  sel(el,'li');
  const p = AREA_DATA[currentArea].processes[i];
  renderPanel({ title:p.name, owner:AREA_DATA[currentArea].title, status:stLbl(p.status), description:`${p.cases} active cases in ${p.name}.`, nextAction:`Review all active ${p.name} cases and resolve any blockers.` });
}

/* ═══════════════════════════════════════════════
   USER VIEW
   ═══════════════════════════════════════════════ */
function renderUser(){
  const C = document.getElementById('user-body');
  let h = '';
  h += '<div class="kpi-row">';
  USER_DATA.kpis.forEach(k=>{
    h += `<div class="kpi-card" onclick="pickUserKPI(this,'${k.id}')">
      <div class="kpi-label">${k.label}</div>
      <div class="kpi-value">${k.value}</div>
      <div class="kpi-delta">${k.delta}</div>
    </div>`;
  });
  h += '</div>';
  if(USER_DATA.approvals.length){
    h += `<div class="section"><div class="sec-hdr"><span class="sec-title">Pending Approvals</span><span class="badge badge-warn">${USER_DATA.approvals.length} waiting</span></div>`;
    USER_DATA.approvals.forEach(a=>{
      h += `<div class="li" onclick="pickUserApproval(this,'${a.id}')">
        <div class="li-icon" style="background:rgba(251,146,60,.12);color:var(--accent4)">✓</div>
        <div class="li-body"><div class="li-name">${a.title}</div><div class="li-sub">${a.process} · SLA: ${a.sla}</div></div>
        <span class="st st-warn">Pending</span>
      </div>`;
    });
    h += '</div>';
  }
  h += `<div class="section"><div class="sec-hdr"><span class="sec-title">My Tasks</span><span class="sec-count">${USER_DATA.tasks.length} tasks</span></div>`;
  USER_DATA.tasks.forEach(t=>{
    const ico   = t.status==='overdue'?'⚠':t.status==='active'?'›':'○';
    const icoBg = t.status==='overdue'?'rgba(248,113,113,.12)':t.status==='active'?'rgba(79,156,249,.12)':'var(--border)';
    const icoC  = t.status==='overdue'?'var(--danger)':t.status==='active'?'var(--accent)':'var(--text3)';
    const slaCl = t.sla==='Overdue'?'color:var(--danger)':'color:var(--text3)';
    h += `<div class="li" onclick="pickUserTask(this,'${t.id}')">
      <div class="li-icon" style="background:${icoBg};color:${icoC}">${ico}</div>
      <div class="li-body"><div class="li-name">${t.name}</div><div class="li-sub">${t.process} · ${t.stage} · ${t.system}</div></div>
      <div style="text-align:right;flex-shrink:0">
        <span class="st ${stCls(t.status)}" style="font-size:9px">${stLbl(t.status)}</span>
        <div style="font-size:9px;margin-top:2px;${slaCl}">${t.sla}</div>
      </div>
    </div>`;
  });
  h += '</div>';
  C.innerHTML = h;
}

function pickUserKPI(el,id){      sel(el,'kpi-card'); renderPanel(USER_DATA.kpis.find(k=>k.id===id)?.detail); }
function pickUserApproval(el,id){ sel(el,'li');       renderPanel(USER_DATA.approvals.find(a=>a.id===id)?.detail); }
function pickUserTask(el,id){
  sel(el,'li');
  const t = USER_DATA.tasks.find(x=>x.id===id);
  if(!t) return;
  const task = TASKS[t.taskId];
  if(task) renderActionGuide(task);
  else renderPanel({ title:t.name, owner:'Assigned to you', status:stLbl(t.status), process:t.process, system:t.system, priority:`${t.priority} · ${t.sla}`, description:`Task in ${t.stage} stage of ${t.process}.` });
}

/* ═══════════════════════════════════════════════
   FLOW VIEW
   ═══════════════════════════════════════════════ */
function renderFlowDomains(){
  document.getElementById('flow-nav').innerHTML = DOMAINS.map(d=>{
    const active = flowState.domain===d.id;
    const style  = active ? `background:${d.color};color:#000` : '';
    return `<button class="domain-chip${active?' active':''}" style="${style}" onclick="pickDomain('${d.id}')">${d.icon} ${d.name}</button>`;
  }).join('');
}

function updateBC(){
  const bc = document.getElementById('flow-bc');
  const {domain, processId, stageId} = flowState;
  if(!domain){ bc.classList.remove('show'); return; }
  bc.classList.add('show');
  const dom  = DOMAINS.find(x=>x.id===domain);
  const proc = PROCESSES.find(x=>x.id===processId);
  const stg  = stageId ? STAGES[stageId] : null;
  let h = `<span class="bc-link" onclick="pickDomain('${domain}')">Flow</span>
           <span class="bc-sep">›</span>
           <span class="bc-link" onclick="pickDomain('${domain}')">${dom?.name||domain}</span>`;
  if(proc){ h += `<span class="bc-sep">›</span><span class="bc-link" onclick="pickProcess('${proc.id}')">${proc.name}</span>`; }
  if(stg)  { h += `<span class="bc-sep">›</span><span class="bc-cur">${stg.name}</span>`; }
  bc.innerHTML = h;
}

function pickDomain(id){
  flowState = { domain:id, processId:null, stageId:null };
  renderFlowDomains();
  updateBC();
  const procs = PROCESSES.filter(p=>p.domain===id);
  let h = '<div style="padding:14px 20px;display:flex;flex-direction:column;gap:6px;">';
  procs.forEach(p=>{
    h += `<div class="task-card" onclick="pickProcess('${p.id}')">
      <div class="tc-body">
        <div class="tc-name">${p.name}</div>
        <div class="tc-meta">${p.owner} · ${p.activeCases} active cases · SLA: ${p.sla}</div>
      </div>
      <span class="st ${stCls(p.status)}">${stLbl(p.status)}</span>
    </div>`;
  });
  h += '</div>';
  document.getElementById('flow-body').innerHTML = h;
  resetPanel();
}

function pickProcess(id){
  flowState.processId = id;
  flowState.stageId   = null;
  updateBC();
  const proc = PROCESSES.find(p=>p.id===id);
  renderPanel({
    title: proc.name, owner: proc.owner,
    status: stLbl(proc.status), rawStatus: proc.status,
    description: proc.description,
    process: DOMAINS.find(d=>d.id===proc.domain)?.name,
    priority: `SLA: ${proc.sla}`,
    nextAction: `${proc.activeCases} active cases. Click a stage below to see all tasks, owners, systems, and required evidence.`,
  });
  renderStages(proc);
}

function renderStages(proc){
  let h = `<div id="stages-row">`;
  proc.stages.forEach((sid,i)=>{
    const s = STAGES[sid];
    if(!s) return;
    const isSel = flowState.stageId===sid;
    const badge = (s.cases > 0)
      ? `<span class="stage-badge${s.status==='blocked'?' blocked':''}">${s.cases}</span>`
      : '';
    h += `<div class="stage-node${isSel?' sel':''}" onclick="pickStage('${sid}','${proc.id}')">
      <div class="stage-circle-wrap">
        <div class="stage-circle ${s.status}">${s.icon}</div>
        ${badge}
      </div>
      <div class="stage-name">${s.name}</div>
    </div>`;
    if(i<proc.stages.length-1) h += `<div class="stage-conn${s.status==='done'?' done':''}"></div>`;
  });
  h += '</div>';
  if(flowState.stageId){
    const s = STAGES[flowState.stageId];
    h += `<div class="task-list"><div class="task-lbl">Tasks in ${s.name}</div>`;
    (s.tasks||[]).forEach(tid=>{
      const t = TASKS[tid];
      if(!t) return;
      h += `<div class="task-card" onclick="pickFlowTask(this,'${tid}')">
        <div class="tc-body">
          <div class="tc-name">${t.name}</div>
          <div class="tc-meta">${t.owner} · ${t.system}</div>
        </div>
        <span class="st ${stCls(t.status)}">${stLbl(t.status)}</span>
      </div>`;
    });
    h += '</div>';
    const roster = CASE_ROSTER[flowState.stageId] || [];
    if(roster.length){
      h += `<div class="case-roster">
        <div class="case-roster-lbl">Cases in this stage &nbsp;<span style="opacity:.6">${roster.length} active</span></div>`;
      roster.forEach(c=>{
        const daysTxt  = c.days === 1 ? '1 day' : `${c.days} days`;
        const slaLabel = c.sla==='overdue' ? 'Overdue' : c.sla==='warn' ? 'At risk' : 'On track';
        h += `<div class="case-row" id="cr-row-${c.id}" onclick="pickFlowCase('${c.id}')">
          <div class="case-av ${c.sla}">${c.initials}</div>
          <div class="case-body">
            <div class="case-name">${c.name}</div>
            <div class="case-meta">${c.meta}</div>
          </div>
          <div class="case-right">
            <div class="case-days ${c.sla}">${daysTxt}</div>
            <span class="st ${c.sla==='overdue'?'st-blocked':c.sla==='warn'?'st-warn':'st-active'}" style="font-size:9px">${slaLabel}</span>
          </div>
        </div>`;
      });
      h += '</div>';
    }
  }
  document.getElementById('flow-body').innerHTML = h;
}

function pickStage(sid, procId){
  flowState.stageId = sid;
  updateBC();
  const s    = STAGES[sid];
  const proc = PROCESSES.find(p=>p.id===procId);
  renderPanel({
    title:    `Stage: ${s.name}`, owner: s.owner,
    status:   stLbl(s.status), rawStatus: s.status,
    process:  proc?.name, system: s.system,
    evidence: s.evidence, nextAction: s.nextAction,
    description: `${s.tasks?.length||0} tasks in this stage. Click a task below for the step-by-step action guide.`,
  });
  appendAuditTrail(sid);
  renderStages(proc);
}

function pickFlowTask(el, tid){
  const t = TASKS[tid];
  if(!t) return;
  document.querySelectorAll('.task-card.sel').forEach(e=>e.classList.remove('sel'));
  if(el) el.classList.add('sel');
  renderActionGuide(t);
}

function pickFlowCase(id){
  document.querySelectorAll('.case-row.sel').forEach(e=>e.classList.remove('sel'));
  document.querySelectorAll('.task-card.sel').forEach(e=>e.classList.remove('sel'));
  const row = document.getElementById('cr-row-'+id);
  if(row) row.classList.add('sel');
  let found = null;
  for(const sid of Object.keys(CASE_ROSTER)){
    const c = CASE_ROSTER[sid].find(x=>x.id===id);
    if(c){ found = c; break; }
  }
  if(found) { renderPanel(found.detail); appendAuditTrail(id); }
}

/* ═══════════════════════════════════════════════
   INIT
   ═══════════════════════════════════════════════ */
renderCEO();
renderArea();
renderUser();
renderFlowDomains();

document.getElementById('flow-body').innerHTML = `
  <div style="padding:48px 20px;text-align:center;color:var(--text3);">
    <div style="font-size:28px;margin-bottom:12px;opacity:.2">⬡</div>
    <div style="font-size:12px;line-height:1.6">Select a domain above to explore<br>processes, stages, and tasks.</div>
  </div>`;
