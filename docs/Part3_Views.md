# Enterprise OS — Part 3: Views

## 1. Purpose

This document defines the three main role-based views of Enterprise OS:

1. CEO View
2. Area / Domain View
3. User View

Each view must use the same global layout:

- Left Sidebar
- Main Content Area
- Right Detail Panel

---

## 2. View Rules

All views must follow these rules:

1. Use the same sidebar.
2. Use the same right panel.
3. Use reusable components from Part 2.
4. Do not redesign the layout per view.
5. Each view shows different data, not a different product.
6. Details open in the right panel, not in a new page.

---

# 3. CEO View

## 3.1 Purpose

The CEO View is the company-level control tower.

It should answer:

- Is the company healthy?
- Where are the bottlenecks?
- What needs executive attention?
- Which clients, processes or payments are at risk?

---

## 3.2 CEO View Layout

Sections:

1. Header
2. KPI Cards
3. Revenue Spine
4. Running Cases
5. Critical Alerts
6. Domain Summary

---

## 3.3 Header

Must include:

- Title: CEO View
- Subtitle: Company-level control tower
- Optional filters:
  - Today
  - This Week
  - This Month
  - Live

---

## 3.4 KPI Cards

Recommended KPIs:

- Total Revenue
- Open Cases
- SLA Health
- Blocked Tasks
- Active Clients
- Payments at Risk

Each KPI uses the KPI Card component.

---

## 3.5 Revenue Spine

This is a core feature.

The Revenue Spine shows the business flow:

Lead → Qualified → Contract → Delivery → Invoice → Payment

Each node must show:

- Node name
- Count
- Status
- Optional warning

Example:

Contract  
12 active  
2 blocked

Clicking a node opens the right panel with related details.

---

## 3.6 Running Cases

Shows active company-level operational cases.

Each case uses the Case Card component.

Fields:

- Case title
- Process
- Status
- Owner
- Due date

Clicking a case opens the right panel.

---

## 3.7 Critical Alerts

Shows high-priority issues.

Examples:

- Payment overdue
- Client at risk
- SLA breached
- Contract blocked
- Delivery delayed

Clicking an alert opens the right panel.

---

## 3.8 Domain Summary

Shows high-level status by business domain.

Domains may include:

- Sales
- Presales
- Delivery
- Finance
- HR
- IT / Operations
- Legal
- Compliance

Each domain should show:

- Active cases
- SLA status
- Blockers
- Owner

---

# 4. Area / Domain View

## 4.1 Purpose

The Area View is for managers or domain owners.

It should answer:

- What is happening in my area?
- Who is overloaded?
- Which processes are blocked?
- Which tasks are at risk?
- What needs my attention?

---

## 4.2 Area View Layout

Sections:

1. Header
2. Domain KPI Cards
3. Team Workload Table
4. Running Cases by Process
5. Blockers
6. SLA Status

---

## 4.3 Header

Must include:

- Domain name
- Subtitle: Manager control panel
- Optional filters:
  - Team
  - Process
  - Status
  - Time period

Example:

HR Area View  
Manager control panel

---

## 4.4 Domain KPI Cards

Recommended KPIs:

- Team Members
- Active Cases
- SLA at Risk
- Blocked Cases
- Due This Week
- Average Capacity

---

## 4.5 Team Workload Table

Columns:

- Name
- Role
- Capacity %
- Active Tasks
- Active Cases
- SLA Status

Rules:

- Capacity uses Progress Bar component.
- SLA uses Status Tag component.
- If capacity is above 90%, status should show risk.

---

## 4.6 Running Cases by Process

Must support tabs.

Example tabs for HR:

- All
- Onboarding
- Offboarding
- Reviews
- Requests

Each case uses the Case Card component.

---

## 4.7 Blockers Section

Shows area-specific blockers.

Examples:

- Missing approval
- Waiting for document
- IT access pending
- Finance validation pending
- Manager not responding

Clicking a blocker opens the right panel.

---

## 4.8 SLA Status

Shows processes or cases close to breaching SLA.

Fields:

- Process
- Case
- Owner
- Due date
- SLA status

---

# 5. User View

## 5.1 Purpose

The User View is the execution layer.

It should answer:

- What do I need to do today?
- Where do I do it?
- Which system do I use?
- What document or draft do I need?
- What is the next step?

This view must be simple and action-focused.

---

## 5.2 User View Layout

Sections:

1. Header
2. My Tasks
3. Due Today
4. Waiting on Me
5. Step-by-Step Task Detail
6. Documents / Drafts
7. Related Systems

---

## 5.3 Header

Must include:

- User name
- Role
- Today’s task count
- Urgent items count

Example:

My Work  
5 tasks due today

---

## 5.4 My Tasks

Each task must show:

- Task name
- Process
- Case
- Status
- Due date
- System
- Next action

Clicking a task opens the right panel.

---

## 5.5 Step-by-Step Task Detail

Each task must include clear instructions.

Example:

Task: Validate invoice

Steps:

1. Open Zoho.
2. Search invoice number.
3. Compare invoice amount with contract.
4. Confirm client name and due date.
5. Mark invoice as validated.
6. Notify Finance if mismatch exists.

Each step should include:

- Step number
- Action
- System
- Output expected

---

## 5.6 Documents / Drafts

The User View may show:

- Email draft
- Slack draft
- Contract template
- Checklist
- SOP
- Required attachment

Documents should be linked or listed.

---

## 5.7 Related Systems

Each task must show where the user needs to work.

Examples:

- Jira
- Slack
- Outlook
- Salesforce
- Zoho
- DocuSign
- HRIS
- Notion
- Google Drive

---

## 5.8 User View Simplicity Rule

The User View should not show unnecessary executive information.

Users only need:

- What to do
- How to do it
- Where to do it
- When it is due
- Who is involved

---

# 6. Shared View Behavior

All views share:

- Sidebar
- Main content area
- Right panel
- Search
- Status tags
- Case cards
- Alerts
- Process access
- Map access

---

# 7. View Switching

Switching views must not reload the entire application.

Expected behavior:

1. User clicks view in sidebar.
2. Main content changes.
3. Sidebar remains visible.
4. Right panel closes unless an item is selected.
5. Active view is highlighted.

---

# 8. Screenshot References

Screenshots must be stored in:

assets/images/

Recommended files:

- ceo-view-reference.png
- area-view-reference.png
- user-view-reference.png

The visual design should follow the screenshots closely.

---

# 9. Acceptance Criteria

This part is complete when:

- CEO View structure is implemented.
- Area View structure is implemented.
- User View structure is implemented.
- All views use shared components.
- Right panel opens from all views.
- Sidebar works across all views.
- No view uses a separate layout.
- No unnecessary redesign is introduced.

---

# 10. Summary

The three views represent three operational levels:

CEO View = decision layer  
Area View = management layer  
User View = execution layer

Together, they create the operating system of the company.
