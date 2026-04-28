# Enterprise OS — Part 1: Foundation

## 1. Purpose

Enterprise OS is an AI-powered Command Center designed to help companies operate faster, with more visibility and less manual coordination.

The goal is to transform scattered operations across tools like Slack, Jira, email, spreadsheets, CRM and HR systems into one clear operational interface.

Core concept:

> Run 8 hours of operational work in 8 minutes.

---

## 2. Scope of This Implementation

This version includes the base operational navigation and the three main views:

1. CEO View
2. Area / Domain View
3. User View

It also includes two shared navigation features:

1. Process Navigator
2. Map Navigator

All views must use the same global layout.

---

## 3. Global Layout

The application must follow a 3-zone layout:

1. Left Sidebar
2. Main Content Area
3. Right Detail Panel

### 3.1 Left Sidebar

The sidebar is always visible.

It contains:

- Main navigation
- View selector
- Process access
- Map access
- Settings

The sidebar must not disappear when switching views.

### 3.2 Main Content Area

The main content changes depending on the selected view.

Examples:

- CEO View shows company-level KPIs and risks.
- Area View shows domain-level workload, active cases and blockers.
- User View shows personal tasks and step-by-step execution guidance.

### 3.3 Right Detail Panel

The right panel is hidden by default.

It opens when the user clicks:

- A case
- A task
- A process
- A map node
- An alert

The right panel shows contextual information and next actions.

---

## 4. Main Views

### 4.1 CEO View

Purpose:

Give executives a company-level control tower.

The CEO View must show:

- Company health KPIs
- Revenue spine
- Active cases
- Critical alerts
- Blockers
- Risks
- High-level performance by domain

The CEO should not see too much operational detail by default. Details open in the right panel.

---

### 4.2 Area / Domain View

Purpose:

Give each department manager visibility into their domain.

Examples of domains:

- HR
- Finance
- Sales
- Delivery
- IT / Operations
- Legal
- Compliance
- Customer Success

The Area View must show:

- Domain KPIs
- Team workload
- Active cases
- SLA status
- Blockers
- Process performance
- Tasks assigned to the area

---

### 4.3 User View

Purpose:

Give each individual user a clear execution dashboard.

The User View must show:

- My Tasks
- What to do next
- Where to do it
- Which system to use
- Who is responsible
- Required documents
- Drafts or templates
- Due dates
- Status

The User View must be simple and execution-focused.

---

## 5. Shared Features

### 5.1 Process Navigator

Purpose:

Allow users to browse all company processes.

It must include:

- Search
- Filter by domain
- Process list
- Process status
- Process owner
- Click to open process details in the right panel

---

### 5.2 Map Navigator

Purpose:

Show how business processes connect visually.

The first map should focus on the Revenue Spine.

Revenue Spine example:

Lead → Qualified → Contract → Delivery → Invoice → Payment

Each node must be clickable.

When clicking a node, the right panel opens and shows:

- Related processes
- Active cases
- Responsible area
- Current blockers
- Related systems

---

## 6. Navigation Rules

The navigation must follow these rules:

1. Sidebar always remains visible.
2. Clicking a sidebar item updates the main content area.
3. Clicking a case, task, alert, process or node opens the right panel.
4. The right panel must not replace the main view.
5. Users must always understand where they are.
6. Active navigation item must be visually highlighted.
7. Do not create additional navigation patterns without approval.

---

## 7. User Roles

The system must support three role perspectives.

### CEO

Needs:

- Company overview
- Risks
- KPIs
- Revenue spine
- Strategic alerts

### Area Manager

Needs:

- Team workload
- Active cases
- SLA risks
- Blockers
- Domain performance

### User

Needs:

- Personal tasks
- Step-by-step instructions
- Documents
- Systems
- Next action

---

## 8. Universal Interaction Model

All major interactions follow this pattern:

User clicks item → Main view stays open → Right panel opens → User reviews details → User takes next action.

This interaction model applies to:

- Cases
- Tasks
- Alerts
- Processes
- Map nodes
- KPI cards

---

## 9. Required Screenshots

The developers must use the provided screenshots as visual reference.

Screenshots should be stored in:

assets/images/

Recommended names:

- ceo-view-reference.png
- area-view-reference.png
- user-view-reference.png
- right-panel-reference.png
- process-map-reference.png

Screenshots are visual references, but this document defines the implementation rules.

---

## 10. Implementation Rules

Developers must follow these rules:

1. Do not redesign the layout.
2. Do not rename core views.
3. Do not remove the right panel.
4. Do not replace the sidebar navigation.
5. Do not create unrelated components.
6. Do not assume missing logic.
7. Ask before changing structure.
8. Extend the existing structure only.

---

## 11. Current Folder Structure

The project structure is:

frontend/
- components/
- views/
- layout/
- data/

assets/
- images/
- icons/

docs/
- Part1_Foundation.md
- Part2_Components.md
- Part3_Views.md
- Part4_Logic.md
- Part5_Data.md

README.md

---

## 12. Acceptance Criteria for Part 1

This part is complete when:

- The global layout is understood.
- The three main views are defined.
- The shared navigation model is clear.
- The right panel behavior is understood.
- Developers understand not to redesign the system.
- The folder structure is respected.

---

## 13. Summary

Enterprise OS is not just a dashboard.

It is an operational command center with:

- One sidebar
- Three role-based views
- One process navigator
- One map navigator
- One universal right panel
- One connected operating logic

The goal is clarity, speed and execution.
