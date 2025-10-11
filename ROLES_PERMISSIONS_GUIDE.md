# NASENI PMES - Roles & Permissions Guide

## Overview

The PMES (Project Monitoring & Evaluation System) for NASENI uses a comprehensive role-based access control (RBAC) system with 9 predefined roles, each with specific permissions tailored to their responsibilities.

---

## Roles & Descriptions

### 1. **System Administrator** 👨‍💼
**Full system access** - Manages the entire system, users, and configurations.

**Responsibilities:**
- System configuration and maintenance
- User and role management
- Complete oversight of all projects and data
- System-wide reporting and analytics

**Key Permissions:**
- ✅ All user management operations
- ✅ All organization/vendor/directorate management
- ✅ All project, milestone, and budget operations
- ✅ All indicator operations
- ✅ Invoice management
- ✅ Access to both Admin and Monitoring dashboards
- ✅ View all reports and activities

---

### 2. **Program Director** 🎯
**Strategic oversight** - Oversees programs and makes strategic decisions.

**Responsibilities:**
- Program strategy and planning
- High-level project oversight
- Resource allocation decisions
- Budget approvals
- Strategic reporting to leadership

**Key Permissions:**
- ✅ View all users
- ✅ Create/edit organizations, vendors, and directorates
- ✅ Full project management (create, edit, archive, restore, user access)
- ✅ Full milestone and budget management
- ✅ Full indicator management
- ✅ Invoice management (create, edit, change status, download)
- ✅ Access to both Admin and Monitoring dashboards
- ✅ View all reports and activities

**Limitations:**
- ❌ Cannot manage system users (except view)
- ❌ Cannot manage roles and permissions
- ❌ Cannot archive/restore invoices

---

### 3. **M&E Officer** 📊
**Core M&E specialist** - Primary monitoring and evaluation activities.

**Responsibilities:**
- Design and implement M&E frameworks
- Manage indicators and data collection
- Monitor project progress
- Prepare M&E reports
- Ensure data quality

**Key Permissions:**
- ✅ View organizations, vendors, directorates
- ✅ Create and edit projects
- ✅ Create and edit milestones
- ✅ View budgets
- ✅ Full indicator management (create, edit, complete, reorder)
- ✅ Manage indicator groups
- ✅ Time logging
- ✅ Access to Monitoring dashboard
- ✅ View all reports and activities

**Limitations:**
- ❌ Cannot manage users
- ❌ Cannot create/edit budgets
- ❌ Cannot manage invoices
- ❌ Cannot archive projects or milestones
- ❌ No Admin dashboard access

---

### 4. **Project Coordinator** 🔧
**Day-to-day project management** - Manages individual projects.

**Responsibilities:**
- Coordinate project activities
- Manage project timelines
- Track indicator completion
- Coordinate with team members
- Report project status

**Key Permissions:**
- ✅ View organizations, vendors, directorates
- ✅ View and edit projects (not create)
- ✅ Create and edit milestones
- ✅ View budgets
- ✅ Create and edit task groups
- ✅ Indicator management (create, edit, complete)
- ✅ Time logging
- ✅ View reports
- ✅ Access to Monitoring dashboard

**Limitations:**
- ❌ Cannot create projects
- ❌ Cannot manage budgets
- ❌ Cannot archive/restore
- ❌ Cannot manage invoices
- ❌ No Admin dashboard access

---

### 5. **Data Officer** 📝
**Data collection and entry** - Focuses on data collection and input.

**Responsibilities:**
- Collect field data
- Enter data into indicators
- Update indicator progress
- Maintain data quality
- Support M&E activities

**Key Permissions:**
- ✅ View organizations, vendors, directorates
- ✅ View projects and milestones
- ✅ View budgets
- ✅ Create and edit indicators
- ✅ Time logging
- ✅ View comments and time logs
- ✅ View reports
- ✅ Access to Monitoring dashboard

**Limitations:**
- ❌ Cannot create/edit projects or milestones
- ❌ Cannot manage budgets or invoices
- ❌ Cannot archive or complete indicators
- ❌ Cannot manage task groups
- ❌ No Admin dashboard access

---

### 6. **Finance Officer** 💰
**Financial management** - Manages budgets and invoices.

**Responsibilities:**
- Budget planning and tracking
- Invoice generation and management
- Financial reporting
- Vendor payment coordination
- Budget utilization monitoring

**Key Permissions:**
- ✅ View organizations and directorates
- ✅ Create and edit vendors
- ✅ View projects and milestones
- ✅ Create and edit budgets
- ✅ Full invoice management
- ✅ View indicators and time logs
- ✅ View reports
- ✅ Access to Monitoring dashboard

**Limitations:**
- ❌ Cannot manage projects or milestones
- ❌ Cannot create/edit indicators
- ❌ Cannot manage task groups
- ❌ No Admin dashboard access

---

### 7. **Directorate Head** 👔
**Department oversight** - Views their directorate's projects (view-only).

**Responsibilities:**
- Monitor directorate projects
- Review progress reports
- Strategic oversight
- Stakeholder reporting

**Key Permissions:**
- ✅ View organizations and directorates
- ✅ View projects, milestones, and budgets
- ✅ View indicators, time logs, and comments
- ✅ View logged time reports
- ✅ Access to Monitoring dashboard

**Limitations:**
- ❌ Cannot create or edit anything
- ❌ View-only access
- ❌ No Admin dashboard access

---

### 8. **Vendor Representative** 🤝
**Vendor liaison** - Limited access to vendor-related projects.

**Responsibilities:**
- View assigned projects
- Update indicator status
- Coordinate with project teams
- Report on vendor activities

**Key Permissions:**
- ✅ View organizations and vendors
- ✅ View projects and milestones
- ✅ View and edit assigned indicators
- ✅ View comments

**Limitations:**
- ❌ Very limited permissions
- ❌ Can only edit indicators assigned to them
- ❌ Cannot view budgets, reports, or dashboards
- ❌ Cannot create new items

---

### 9. **Stakeholder** 👁️
**External partner** - View-only access for partners and stakeholders.

**Responsibilities:**
- Monitor project progress
- Review public information
- Provide feedback
- Generate reports for their organization

**Key Permissions:**
- ✅ View organizations and directorates
- ✅ View projects, milestones, and budgets
- ✅ View indicators and comments
- ✅ Access to Monitoring dashboard

**Limitations:**
- ❌ View-only access
- ❌ Cannot create or edit anything
- ❌ Cannot view time logs
- ❌ Cannot view invoices
- ❌ No Admin dashboard access

---

## Permission Categories

### User Management
- View users, create user, edit user, archive user, restore user
- View user rate (hourly rates)

### System Settings
- View/create/edit labels
- View/create/edit roles
- View/edit owner company

### Organizations
- **General Organizations**: view, create, edit, archive, restore client companies
- **Vendors**: view, create, edit, archive, restore vendors
- **Directorates**: view, create, edit, archive, restore directorates
- **Organization Users**: view, create, edit, archive, restore client users

### Project Management
- **Projects**: view, create, edit, archive, restore, edit user access
- **Milestones**: view, create, edit, archive, restore
- **Budgets**: view, create, edit, archive, restore

### Indicators (Tasks)
- **Indicator Groups**: create, edit, archive, restore, reorder
- **Indicators**: view, create, edit, archive, restore, reorder, complete
- **Time Tracking**: add time log, delete time log, view time logs
- **Collaboration**: view comments

### Financial
- **Invoices**: view, create, edit, archive, restore, change status, download, print

### Reporting & Monitoring
- **Reports**: view logged time sum report, view daily logged time report
- **Dashboards**: view admin dashboard, view monitoring dashboard
- **Activities**: view activity logs

---

## Role Assignment Best Practices

### For NASENI Staff
- **Leadership**: System Administrator, Program Director
- **M&E Team**: M&E Officer, Data Officer
- **Project Teams**: Project Coordinator
- **Support**: Finance Officer

### For External Partners
- **Directorate Representatives**: Directorate Head
- **Vendors/Contractors**: Vendor Representative
- **Partners/Donors**: Stakeholder

---

## Managing Permissions

### Viewing Role Permissions
Navigate to: **Settings → Roles**

Each role can be viewed with its assigned permissions listed.

### Creating Custom Roles
1. Go to **Settings → Roles**
2. Click **Create Role**
3. Select desired permissions
4. Save

### Modifying Permissions
**Important**: The 9 default roles are managed via `PermissionService.php` and re-seeded. Custom modifications should be done through the UI for new roles.

---

## Security Considerations

### Production Deployment
1. ✅ Change all default passwords immediately
2. ✅ Update admin email in `.env` or config
3. ✅ Disable demo data seeding (answer "no" when prompted)
4. ✅ Set up proper authentication (2FA recommended)
5. ✅ Configure proper HTTPS
6. ✅ Set up database backups

### Permission Auditing
- All user actions are logged in the `audits` table
- Review audit logs regularly for security
- Use the Activity feed to monitor system usage

---

## Testing Different Roles

Login with different accounts to test role-specific access:

```bash
# M&E Officer - Can manage indicators and create projects
me@naseni.gov.ng / password

# Finance Officer - Can manage budgets and invoices
finance@naseni.gov.ng / password

# Directorate Head - View-only access to directorate projects
directorate@naseni.gov.ng / password

# Stakeholder - View-only access
stakeholder@naseni.gov.ng / password
```

---

## Quick Reference

| Need to... | Minimum Role Required |
|-----------|----------------------|
| Create projects | M&E Officer |
| Edit budgets | Finance Officer |
| Manage milestones | M&E Officer |
| Create indicators | Data Officer |
| View dashboards | Any role (except Vendor Rep) |
| Manage invoices | Finance Officer |
| Create users | System Administrator |
| Archive projects | Program Director |

---

## Support

For questions about roles and permissions:
1. Check this guide
2. Review `app/Services/PermissionService.php`
3. Test with demo accounts
4. Contact system administrator

---

**Last Updated**: October 11, 2025  
**System Version**: PMES v2.0 - NASENI Edition

