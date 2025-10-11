# Quick Start Guide - NASENI M&E Project Management Module

## 🚀 Getting Started in 5 Minutes

### 1. Access the Monitoring Dashboard
```
Navigate to: http://your-domain/monitoring/dashboard
```

This gives you instant access to:
- Project statistics and completion rates
- Milestone tracking and deadlines
- Budget monitoring and utilization
- Directorate performance metrics
- 6-month trend analysis

---

## 📋 Common Tasks

### Create a Milestone

**Via UI:**
1. Go to a project page
2. Click "Milestones" tab
3. Click "Create Milestone"
4. Fill in the form and submit

**Via API:**
```bash
curl -X POST http://your-domain/projects/1/milestones \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Phase 1 Completion",
    "status": "in_progress",
    "start_date": "2025-01-01",
    "end_date": "2025-03-31",
    "progress": 45,
    "budget_allocated": 5000000.00
  }'
```

### Create a Budget

**Via UI:**
1. Go to a project page
2. Click "Budgets" tab
3. Click "Create Budget"
4. Fill in the form and submit

**Via API:**
```bash
curl -X POST http://your-domain/projects/1/budgets \
  -H "Content-Type: application/json" \
  -d '{
    "name": "2025 Annual Budget",
    "status": "approved",
    "total_amount": 50000000.00,
    "currency_id": 1
  }'
```

### Fetch Dashboard Statistics

**Via API:**
```bash
# Get all statistics
curl http://your-domain/api/monitoring/stats

# Get project stats only
curl http://your-domain/api/monitoring/projects/stats

# Get milestone stats only
curl http://your-domain/api/monitoring/milestones/stats

# Get budget stats only
curl http://your-domain/api/monitoring/budgets/stats

# Get trends
curl http://your-domain/api/monitoring/trends
```

---

## 🎯 Available Routes

### Milestone Management
```
GET    /projects/{id}/milestones              List all milestones
GET    /projects/{id}/milestones/create       Show create form
POST   /projects/{id}/milestones              Create new milestone
GET    /projects/{id}/milestones/{mid}/edit   Show edit form
PUT    /projects/{id}/milestones/{mid}        Update milestone
DELETE /projects/{id}/milestones/{mid}        Archive milestone
POST   /projects/{id}/milestones/{mid}/restore Restore milestone
```

### Budget Management
```
GET    /projects/{id}/budgets              List all budgets
GET    /projects/{id}/budgets/create       Show create form
POST   /projects/{id}/budgets              Create new budget
GET    /projects/{id}/budgets/{bid}/edit   Show edit form
PUT    /projects/{id}/budgets/{bid}        Update budget
DELETE /projects/{id}/budgets/{bid}        Archive budget
POST   /projects/{id}/budgets/{bid}/restore Restore budget
```

### Monitoring Dashboard
```
GET /monitoring/dashboard                     Main dashboard view
GET /api/monitoring/stats                     All statistics (JSON)
GET /api/monitoring/projects/performance      Project performance (JSON)
GET /api/monitoring/projects/stats            Project stats (JSON)
GET /api/monitoring/milestones/stats          Milestone stats (JSON)
GET /api/monitoring/budgets/stats             Budget stats (JSON)
GET /api/monitoring/directorates/stats        Directorate stats (JSON)
GET /api/monitoring/trends                    6-month trends (JSON)
```

---

## 📊 Status Values

### Milestone Status
- `not_started` - Planning phase
- `in_progress` - Currently active
- `completed` - Successfully completed
- `delayed` - Behind schedule
- `cancelled` - No longer active

### Budget Status
- `draft` - Initial planning
- `approved` - Approved by management
- `active` - Currently in use
- `exceeded` - Over budget
- `closed` - Completed/closed

---

## 🔑 Required Fields

### Milestone
```json
{
  "project_id": "required|integer",
  "name": "required|string|max:255",
  "status": "required|enum:MilestoneStatus"
}
```

### Budget
```json
{
  "project_id": "required|integer",
  "name": "required|string|max:255",
  "status": "required|enum:BudgetStatus",
  "total_amount": "required|numeric|min:0"
}
```

---

## 💡 Pro Tips

### 1. Track Progress Automatically
Set milestone progress (0-100%) to automatically visualize completion in the dashboard.

### 2. Monitor Budget Utilization
The system automatically calculates:
- Remaining amount = Total - Spent
- Utilization rate = (Spent / Total) × 100

### 3. Use Directorate Filtering
Link projects to directorates to get departmental performance metrics.

### 4. Leverage Trends
Use the 6-month trend data to identify patterns and make informed decisions.

### 5. Archive vs Delete
Use archive instead of delete to maintain history and audit trails.

---

## 🐛 Troubleshooting

### Dashboard Not Loading?
Check permissions: User must have `view projects` permission.

### Can't Create Milestone/Budget?
Check permissions: User needs `create project` permission.

### API Returns 401?
Ensure you're authenticated via Sanctum token or session.

### Trends Not Showing?
Create some historical data first. Trends require at least one month of data.

---

## 📖 Documentation

- **Comprehensive Guide**: `PROJECT_MANAGEMENT_MODULE.md`
- **Implementation Details**: `IMPLEMENTATION_SUMMARY.md`
- **Quick Reference**: This file

---

## ✅ Feature Checklist

What you can do with this module:

- [x] Create and manage project milestones
- [x] Track milestone progress (0-100%)
- [x] Set planned and actual dates
- [x] Allocate budgets to milestones
- [x] Create and manage project budgets
- [x] Track budget utilization
- [x] Multi-currency budget support
- [x] Link projects to directorates
- [x] View comprehensive dashboard
- [x] Monitor project completion rates
- [x] Track milestone deadlines and overdue items
- [x] Analyze budget spending patterns
- [x] Compare directorate performance
- [x] View 6-month historical trends
- [x] Export data via API
- [x] Archive/restore functionality
- [x] Full audit trail

---

## 🎓 Next Steps

1. **Explore the Dashboard**: Visit `/monitoring/dashboard`
2. **Create Test Data**: Add milestones and budgets to existing projects
3. **Review API**: Test endpoints using curl or Postman
4. **Customize**: Extend components as needed
5. **Integrate**: Use API endpoints in external applications

---

## 🤝 Need Help?

- Read the full documentation in `PROJECT_MANAGEMENT_MODULE.md`
- Check API examples in this guide
- Review code comments in controllers and services
- Test endpoints using the provided curl commands

---

**That's it! You're ready to use the Project Management & Monitoring Module.** 🎉

Happy monitoring! 📊

