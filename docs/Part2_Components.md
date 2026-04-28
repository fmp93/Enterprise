# Enterprise OS — Part 2: Components

## 1. Purpose

This document defines all reusable UI components required to build Enterprise OS.

Developers must build these components first before assembling any view.

All views must reuse these components.

---

## 2. Component Principles

All components must be:

- Reusable
- Consistent
- Lightweight
- Visually aligned with screenshots
- Easy to extend

Do NOT hardcode data inside components.

---

## 3. KPI Card Component

### Purpose

Display high-level metrics (CEO and Area views).

### Fields

- Title
- Value
- Status (optional)
- Trend (optional)

### Example

Revenue: $120K  
SLA: 92%  
Blocked Tasks: 14

### Behavior

- Static display (no click required for now)
- Color based on status:
  - Green → good
  - Yellow → warning
  - Red → critical

---

## 4. Case Card Component

### Purpose

Display an active case or process instance.

### Fields

- Title (e.g. "ACME Onboarding")
- Process name
- Status
- Owner
- Due date

### Behavior

- Click → opens Right Panel
- Must visually show status (color tag)

---

## 5. Status Tag Component

### Purpose

Show status across system.

### Types

- On Track → green
- At Risk → yellow
- Blocked → red
- Delayed → orange

### Usage

Used in:

- Tables
- Cards
- Alerts
- Right Panel

---

## 6. Progress Bar Component

### Purpose

Show workload or completion.

### Fields

- Percentage (0–100)

### Behavior

- Color:
  - Green (0–70%)
  - Yellow (70–90%)
  - Red (90–100%)

---

## 7. Table Component

### Purpose

Display structured data (Area View).

### Example Columns

- Name
- Capacity %
- Tasks
- SLA Status
- Active Cases

### Behavior

- Rows clickable (optional for future)
- Use StatusTag inside table

---

## 8. Sidebar Component

### Purpose

Global navigation.

### Includes

- View selector (CEO / Area / User / Process)
- Navigation items
- Active state highlight

### Behavior

- Always visible
- Click → changes main view

---

## 9. Tabs Component

### Purpose

Switch between categories inside a view.

### Example

- All
- Onboarding
- Offboarding
- Reviews

### Behavior

- Click → filters content
- Active tab highlighted

---

## 10. Alert Card Component

### Purpose

Display issues or warnings.

### Fields

- Severity (CRIT, WARN)
- Message
- Time indicator

### Behavior

- Click → opens Right Panel
- Color based on severity

---

## 11. Right Panel Component (STRUCTURE ONLY)

### Purpose

Universal interaction panel.

### Layout Sections

1. Header
2. Details
3. Tasks
4. Systems
5. Next Action
6. Blockers (optional)
7. Documents
8. Timeline

### Important

Only build structure in this phase.  
Logic will be defined in Part 4.

---

## 12. Button Component

### Types

- Primary
- Secondary
- Action

### Behavior

- Used across all views
- Consistent styling

---

## 13. Search Component

### Purpose

Global search (Process Navigator)

### Behavior

- Filter list
- No backend logic yet

---

## 14. Component Integration Rules

- Components must not depend on views
- Views depend on components
- Components must be reusable across all views

---

## 15. Folder Mapping

Each component must be created in:

frontend/components/

Example:

- KPIcard.js
- CaseCard.js
- Sidebar.js
- RightPanel.js
- Table.js
- StatusTag.js
- ProgressBar.js

---

## 16. Acceptance Criteria

This part is complete when:

- All components exist
- Components are reusable
- Components visually match reference
- No full views are built yet
- No business logic is implemented yet

---

## 17. Summary

Components are the building blocks of the system.

If components are correct, views will be easy to build.

If components are wrong, the entire system breaks.

Focus on accuracy and reusability.
