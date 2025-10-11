# Project Management & Monitoring Module Documentation

## Overview

This document outlines the comprehensive Project Management and Monitoring & Evaluation modules added to the NASENI Lara-Collab system. These modules provide full CRUD operations for milestones and budgets, along with a powerful monitoring dashboard for tracking project metrics and performance.

---

## Table of Contents

1. [Project Management Module](#project-management-module)
2. [Monitoring & Evaluation Dashboard](#monitoring--evaluation-dashboard)
3. [Database Schema](#database-schema)
4. [API Endpoints](#api-endpoints)
5. [Usage Examples](#usage-examples)

---

## Project Management Module

### Features

#### 1. **Milestones Management**
- Create, read, update, and delete project milestones
- Track milestone status (not started, in progress, completed, delayed, cancelled)
- Monitor progress percentage (0-100%)
- Set planned and actual dates
- Allocate budget to milestones
- Define deliverables
- Order milestones within a project

#### 2. **Budgets Management**
- Create and manage project budgets
- Track budget status (draft, approved, active, exceeded, closed)
- Monitor total, allocated, spent, and remaining amounts
- Multi-currency support
- Fiscal year tracking
- Automatic calculation of remaining amounts
- Budget utilization tracking

#### 3. **Enhanced Projects**
- Link projects to directorates
- Associate multiple milestones per project
- Manage multiple budgets per project
- Comprehensive project-directorate relationships

### Models & Relationships

#### Milestone Model
```php
App\Models\Milestone

Fields:
- id, project_id, name, description, status
- start_date, end_date
- actual_start_date, actual_end_date
- progress (0-100)
- budget_allocated
- deliverables, order
- timestamps, archived_at

Relationships:
- belongsTo: Project
- morphMany: Activity

Scopes:
- byProject, byStatus, completed, inProgress, delayed
```

#### Budget Model
```php
App\Models\Budget

Fields:
- id, project_id, name, description, status
- currency_id
- total_amount, allocated_amount, spent_amount, remaining_amount
- fiscal_year_start, fiscal_year_end
- notes
- timestamps, archived_at

Relationships:
- belongsTo: Project, Currency
- morphMany: Activity

Methods:
- calculateRemaining()
- updateSpentAmount($amount)
```

#### Updated Project Model
```php
Added relationships:
- hasMany: Milestone, Budget
- belongsTo: Directorate (ClientCompany)
```

### Controllers

#### MilestoneController
```php
App\Http\Controllers\Project\MilestoneController

Routes:
- GET    /projects/{project}/milestones          - List milestones
- GET    /projects/{project}/milestones/create   - Create form
- POST   /projects/{project}/milestones          - Store milestone
- GET    /projects/{project}/milestones/{id}/edit - Edit form
- PUT    /projects/{project}/milestones/{id}     - Update milestone
- DELETE /projects/{project}/milestones/{id}     - Archive milestone
- POST   /projects/{project}/milestones/{id}/restore - Restore milestone
```

#### BudgetController
```php
App\Http\Controllers\Project\BudgetController

Routes:
- GET    /projects/{project}/budgets          - List budgets
- GET    /projects/{project}/budgets/create   - Create form
- POST   /projects/{project}/budgets          - Store budget
- GET    /projects/{project}/budgets/{id}/edit - Edit form
- PUT    /projects/{project}/budgets/{id}     - Update budget
- DELETE /projects/{project}/budgets/{id}     - Archive budget
- POST   /projects/{project}/budgets/{id}/restore - Restore budget
```

### Validation

#### StoreMilestoneRequest
- project_id: required, exists in projects
- name: required, string, max 255
- status: required, enum (MilestoneStatus)
- start_date, end_date: nullable, date
- actual_start_date, actual_end_date: nullable, date
- progress: nullable, integer, 0-100
- budget_allocated: nullable, numeric, min 0
- deliverables: nullable, string
- order: nullable, integer, min 0

#### StoreBudgetRequest
- project_id: required, exists in projects
- name: required, string, max 255
- status: required, enum (BudgetStatus)
- currency_id: nullable, exists in currencies
- total_amount: required, numeric, min 0
- allocated_amount, spent_amount: nullable, numeric, min 0
- fiscal_year_start, fiscal_year_end: nullable, date
- notes: nullable, string

### Enums

#### MilestoneStatus
```php
App\Enums\MilestoneStatus

Values:
- NOT_STARTED = 'not_started'
- IN_PROGRESS = 'in_progress'
- COMPLETED = 'completed'
- DELAYED = 'delayed'
- CANCELLED = 'cancelled'
```

#### BudgetStatus
```php
App\Enums\BudgetStatus

Values:
- DRAFT = 'draft'
- APPROVED = 'approved'
- ACTIVE = 'active'
- EXCEEDED = 'exceeded'
- CLOSED = 'closed'
```

---

## Monitoring & Evaluation Dashboard

### Features

The M&E Dashboard provides comprehensive analytics and insights across the entire project management system.

#### 1. **Project Statistics**
- Total projects (active, archived)
- Average completion rate
- Projects by status (completed, in progress, not started)
- Completion rates per project
- Task completion metrics

#### 2. **Milestone Analytics**
- Total milestones by status
- Overall completion rate
- Average progress percentage
- Milestones due this month
- Overdue milestone tracking

#### 3. **Budget Monitoring**
- Total budgets by status
- Total allocated, spent, and remaining amounts
- Budget utilization rate
- Top budgets by project
- Multi-currency support

#### 4. **Directorate Performance**
- Project count per directorate
- Milestone completion rates
- Directorate-wise analytics
- Performance comparison

#### 5. **Trend Analysis**
- 6-month project creation trends
- Milestone completion trends
- Budget allocation and spending trends
- Historical performance tracking

### Service Layer

#### MonitoringDashboardService
```php
App\Services\MonitoringDashboardService

Methods:
- getDashboardStats(): array
  Returns comprehensive statistics including projects, milestones, 
  budgets, directorates, and trends

- getProjectStats(): array
  Detailed project metrics and completion rates

- getMilestoneStats(): array
  Milestone status, progress, and deadline tracking

- getBudgetStats(): array
  Budget allocation, spending, and utilization

- getDirectorateStats(): array
  Performance metrics by directorate

- getTrends(): array
  6-month historical trends

- getProjectPerformanceMetrics(): array
  Detailed performance metrics for all projects
```

### API Endpoints

```php
Main Dashboard:
GET /monitoring/dashboard - Full dashboard view (Inertia)

API Endpoints:
GET /api/monitoring/stats - Complete statistics
GET /api/monitoring/projects/performance - Project performance metrics
GET /api/monitoring/projects/stats - Project statistics only
GET /api/monitoring/milestones/stats - Milestone statistics only
GET /api/monitoring/budgets/stats - Budget statistics only
GET /api/monitoring/directorates/stats - Directorate statistics only
GET /api/monitoring/trends - Trend data (6 months)

All endpoints return JSON responses:
{
  "success": true,
  "data": { ... }
}
```

### React Components

#### MetricCard
Displays key metrics with optional progress bars
- Supports icons and color customization
- Shows value, subtitle, and progress

#### StatusCard
Shows status breakdowns with badges
- Displays statistics by category
- Color-coded badges

#### DirectorateTable
Tabular view of directorate performance
- Projects count
- Milestone completion
- Progress bars with color-coded status

#### TrendChart
Line charts for trend visualization
- Multiple data series support
- Interactive legends
- Natural curve interpolation

#### BudgetOverview
Comprehensive budget display
- Total, allocated, spent, remaining amounts
- Utilization progress bar
- Color-coded status indicators

---

## Database Schema

### Milestones Table
```sql
CREATE TABLE milestones (
    id BIGINT UNSIGNED PRIMARY KEY,
    project_id BIGINT UNSIGNED,
    name VARCHAR(255),
    description TEXT NULL,
    status VARCHAR(255) DEFAULT 'not_started',
    start_date DATE NULL,
    end_date DATE NULL,
    actual_start_date DATE NULL,
    actual_end_date DATE NULL,
    progress INT DEFAULT 0 COMMENT 'Progress percentage 0-100',
    budget_allocated DECIMAL(15,2) DEFAULT 0,
    deliverables TEXT NULL,
    order INT DEFAULT 0,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    archived_at TIMESTAMP NULL,
    
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);
```

### Budgets Table
```sql
CREATE TABLE budgets (
    id BIGINT UNSIGNED PRIMARY KEY,
    project_id BIGINT UNSIGNED,
    name VARCHAR(255),
    description TEXT NULL,
    status VARCHAR(255) DEFAULT 'draft',
    currency_id BIGINT UNSIGNED NULL,
    total_amount DECIMAL(15,2) DEFAULT 0,
    allocated_amount DECIMAL(15,2) DEFAULT 0,
    spent_amount DECIMAL(15,2) DEFAULT 0,
    remaining_amount DECIMAL(15,2) DEFAULT 0,
    fiscal_year_start DATE NULL,
    fiscal_year_end DATE NULL,
    notes TEXT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    archived_at TIMESTAMP NULL,
    
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (currency_id) REFERENCES currencies(id)
);
```

### Projects Table Update
```sql
ALTER TABLE projects 
ADD COLUMN directorate_id BIGINT UNSIGNED NULL AFTER client_company_id,
ADD FOREIGN KEY (directorate_id) REFERENCES client_companies(id);
```

---

## Usage Examples

### Creating a Milestone

```php
// Via Controller
POST /projects/1/milestones

{
    "name": "Phase 1 Completion",
    "description": "Complete initial research and planning",
    "status": "in_progress",
    "start_date": "2025-01-01",
    "end_date": "2025-03-31",
    "progress": 45,
    "budget_allocated": 5000000.00,
    "deliverables": "Research report, Project plan, Budget proposal",
    "order": 1
}
```

### Creating a Budget

```php
// Via Controller
POST /projects/1/budgets

{
    "name": "2025 Project Budget",
    "description": "Annual budget allocation",
    "status": "approved",
    "currency_id": 1,
    "total_amount": 50000000.00,
    "allocated_amount": 30000000.00,
    "spent_amount": 10000000.00,
    "fiscal_year_start": "2025-01-01",
    "fiscal_year_end": "2025-12-31",
    "notes": "Approved by management committee"
}
```

### Fetching Dashboard Statistics

```javascript
// React Component
import { usePage } from '@inertiajs/react';

const MonitoringDashboard = () => {
  const { stats } = usePage().props;
  
  // Access project statistics
  console.log(stats.projects.total);
  console.log(stats.projects.avg_completion_rate);
  
  // Access milestone statistics
  console.log(stats.milestones.by_status);
  console.log(stats.milestones.overdue);
  
  // Access budget statistics
  console.log(stats.budgets.utilization_rate);
  console.log(stats.budgets.total_remaining);
  
  // Access directorate performance
  console.log(stats.directorates.directorates);
  
  // Access trends
  console.log(stats.trends.projects);
};
```

### API Usage

```javascript
// Fetch statistics via API
const response = await fetch('/api/monitoring/stats');
const { success, data } = await response.json();

if (success) {
  console.log('Projects:', data.projects);
  console.log('Milestones:', data.milestones);
  console.log('Budgets:', data.budgets);
  console.log('Directorates:', data.directorates);
  console.log('Trends:', data.trends);
}

// Fetch specific statistics
const projectStats = await fetch('/api/monitoring/projects/stats');
const milestoneStats = await fetch('/api/monitoring/milestones/stats');
const budgetStats = await fetch('/api/monitoring/budgets/stats');
```

---

## Authorization

All endpoints use Laravel policies for authorization:

- **MilestonePolicy**: Controls access to milestone operations
- **BudgetPolicy**: Controls access to budget operations
- **Project Permissions**: View projects permission required for M&E Dashboard

Users must have appropriate permissions:
- `view projects` - View dashboard and statistics
- `create project` - Create milestones and budgets
- `edit project` - Update milestones and budgets
- `archive project` - Archive milestones and budgets
- `restore project` - Restore archived items

---

## File Structure

```
app/
├── Enums/
│   ├── MilestoneStatus.php
│   └── BudgetStatus.php
├── Models/
│   ├── Milestone.php
│   ├── Budget.php
│   └── Project.php (updated)
├── Http/
│   ├── Controllers/
│   │   ├── Project/
│   │   │   ├── MilestoneController.php
│   │   │   └── BudgetController.php
│   │   └── MonitoringDashboardController.php
│   ├── Requests/
│   │   ├── Milestone/
│   │   │   ├── StoreMilestoneRequest.php
│   │   │   └── UpdateMilestoneRequest.php
│   │   └── Budget/
│   │       ├── StoreBudgetRequest.php
│   │       └── UpdateBudgetRequest.php
│   └── Resources/
│       ├── Milestone/
│       │   └── MilestoneResource.php
│       └── Budget/
│           └── BudgetResource.php
├── Policies/
│   ├── MilestonePolicy.php
│   └── BudgetPolicy.php
└── Services/
    └── MonitoringDashboardService.php

database/migrations/
├── 2025_10_07_230827_create_milestones_table.php
├── 2025_10_07_230935_create_budgets_table.php
└── 2025_10_07_231040_add_directorate_id_to_projects_table.php

resources/js/pages/
└── MonitoringDashboard/
    ├── Index.jsx
    └── components/
        ├── MetricCard.jsx
        ├── StatusCard.jsx
        ├── DirectorateTable.jsx
        ├── TrendChart.jsx
        └── BudgetOverview.jsx

routes/
└── web.php (updated)
```

---

## Next Steps

### Recommended Enhancements

1. **Export Functionality**
   - Export dashboard data to PDF/Excel
   - Generate custom reports

2. **Notifications**
   - Alert on milestone deadlines
   - Notify on budget thresholds
   - Overdue milestone reminders

3. **Advanced Analytics**
   - Predictive analytics for project completion
   - Resource allocation optimization
   - Risk assessment metrics

4. **Custom Dashboards**
   - Per-directorate dashboards
   - Per-user customizable views
   - Role-based dashboard variants

5. **Integration**
   - Integration with task management
   - Link budgets to invoices
   - Milestone-task dependencies

---

## Support & Maintenance

### Running Migrations

```bash
php artisan migrate
```

### Checking Routes

```bash
php artisan route:list | grep milestone
php artisan route:list | grep budget
php artisan route:list | grep monitoring
```

### Testing Policies

```bash
php artisan tinker

$user = User::find(1);
$milestone = Milestone::find(1);
$user->can('view', $milestone);
$user->can('update', $milestone);
```

---

## Conclusion

This module provides a complete project management and monitoring solution for the NASENI M&E System, with:

- ✅ Full CRUD operations for milestones and budgets
- ✅ Comprehensive monitoring dashboard
- ✅ Real-time statistics and analytics
- ✅ Trend analysis and reporting
- ✅ Directorate performance tracking
- ✅ RESTful API endpoints
- ✅ Modern React UI with Mantine components
- ✅ Clean Laravel architecture
- ✅ Proper authorization and validation
- ✅ Auditable and archivable records

The system is fully extensible and follows Laravel best practices, making it easy to add new features or customize existing functionality.

