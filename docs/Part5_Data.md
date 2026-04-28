# Enterprise OS — Part 5: Data & Connections

## 1. Purpose

This document defines the data model of Enterprise OS.

It explains:

- What entities exist
- How they relate
- What data each component needs
- How data flows through the system

This ensures consistency across all views and components.

---

## 2. Core Data Entities

The system is built around the following entities:

- User
- Domain
- Process
- Case
- Task
- KPI
- Alert

---

## 3. Entity Definitions

### 3.1 User

Represents a person using the system.

Fields:

- id
- name
- role (CEO, Manager, User)
- domain
- email
- capacity %

---

### 3.2 Domain

Represents a business area.

Examples:

- Sales
- Delivery
- Finance
- HR
- IT
- Legal

Fields:

- id
- name
- owner
- activeCases
- slaStatus

---

### 3.3 Process

Represents a repeatable workflow.

Examples:

- Client Onboarding
- Invoice Validation
- Offboarding

Fields:

- id
- name
- domain
- steps
- owner
- status

---

### 3.4 Case

Represents a live instance of a process.

Example:

Process: Client Onboarding  
Case: "ACME Corp Onboarding"

Fields:

- id
- name
- processId
- status
- owner
- dueDate
- domain

---

### 3.5 Task

Represents a specific action inside a case.

Fields:

- id
- name
- caseId
- processId
- assignedTo
- status
- dueDate
- system
- instructions

---

### 3.6 KPI

Represents a metric displayed in dashboards.

Fields:

- id
- name
- value
- status
- trend

---

### 3.7 Alert

Represents a warning or issue.

Fields:

- id
- type (CRIT, WARN)
- message
- relatedCase
- relatedProcess
- domain
- timestamp

---

## 4. Relationships

Core relationships:

- Domain → has many Processes
- Process → has many Cases
- Case → has many Tasks
- Task → belongs to User
- Case → belongs to Domain
- Alert → linked to Case or Process

---

## 5. Data Flow

### Example Flow

Process → Case → Task → User

Example:

1. Process created: "Client Onboarding"
2. Case created: "ACME Onboarding"
3. Tasks generated:
   - Create account
   - Send email
4. Tasks assigned to users
5. User completes task
6. Case progresses

---

## 6. Component Data Mapping

Each component requires specific data.

---

### KPI Card

Needs:

- name
- value
- status

---

### Case Card

Needs:

- name
- process
- status
- owner
- dueDate

---

### Table (Area View)

Needs:

- user list
- capacity %
- task count
- SLA status

---

### Task List (User View)

Needs:

- task name
- process
- system
- instructions
- dueDate

---

### Right Panel

Needs:

- full case details
- task list
- systems
- documents (optional)
- next action

---

## 7. Mock Data Requirement

For this phase:

- Use mock data only
- Store mock data in:

frontend/data/mockData.js

---

### Example Mock Data

Users:

- John (HR Manager)
- Ana (Finance)
- Mike (Delivery)

Cases:

- ACME Onboarding
- Invoice 1023
- Employee Offboarding

Tasks:

- Validate invoice
- Create account
- Send contract

---

## 8. Static vs Dynamic Data

For now:

- All data is static (mock)
- No backend required

Future:

- API integration
- Real-time updates
- Database

---

## 9. Data Consistency Rules

Developers must:

- Use the same field names across system
- Not rename entities
- Not duplicate data structures
- Not create alternative models

---

## 10. Future Integrations (Reference Only)

Systems that may be connected later:

- Jira
- Slack
- Outlook
- Salesforce
- Zoho
- DocuSign
- HRIS
- Google Drive

No integration required in this phase.

---

## 11. Acceptance Criteria

This part is complete when:

- All entities are defined
- Relationships are respected
- Components receive correct data
- Mock data is used consistently
- No conflicting data models exist

---

## 12. Summary

Enterprise OS is a data-driven system.

Everything is connected through:

Process → Case → Task → User

If data structure is inconsistent, the system breaks.

Data must be clean, consistent and reusable.
