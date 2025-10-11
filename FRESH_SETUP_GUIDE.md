# Fresh Database Setup Guide - NASENI PMES

This guide will help you set up the PMES database from scratch with demo data.

## Prerequisites

- Database created and configured in `.env`
- Composer dependencies installed
- Node dependencies installed

## Step-by-Step Instructions

### 1. Drop All Tables (Fresh Start)

```bash
php artisan migrate:fresh
```

**OR** if you want to drop and seed in one command:

```bash
php artisan migrate:fresh --seed
```

### 2. Run Migrations with Seeders (if not done in step 1)

```bash
php artisan migrate --seed
```

When prompted:
- **"Seed demo data? (2 projects with complete features)"** → Answer **yes**

### 3. Clear All Caches

```bash
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear
php artisan optimize:clear
```

### 4. Start Development Server

```bash
npm run dev
```

In another terminal:
```bash
php artisan serve
```

## What Gets Created

### Organizations
- **1 Vendor**: TechVision Solutions Ltd
- **2 Directorates**: 
  - Engineering Infrastructure Development
  - Renewable Energy and Power

### Users (9 users, one for each role)
| Role | Name | Email | Password |
|------|------|-------|----------|
| System Administrator | System Administrator | admin@naseni.gov.ng | password |
| Program Director | Adewale Ogunleye | director@naseni.gov.ng | password |
| M&E Officer | Chioma Nwankwo | me@naseni.gov.ng | password |
| Project Coordinator | Ibrahim Musa | coordinator@naseni.gov.ng | password |
| Data Officer | Fatima Abdullahi | data@naseni.gov.ng | password |
| Finance Officer | Oluwaseun Adebayo | finance@naseni.gov.ng | password |
| Directorate Head | Dr. Emeka Okafor | directorate@naseni.gov.ng | password |
| Vendor Representative | Blessing Okonkwo | vendor@naseni.gov.ng | password |
| Stakeholder | John Stakeholder | stakeholder@naseni.gov.ng | password |

### Projects (2 complete projects)

#### Project 1: National Solar Energy Infrastructure Program
- **Directorate**: Engineering Infrastructure Development
- **3 Milestones**: Planning (Completed), Infrastructure (In Progress), Testing (Not Started)
- **2 Budgets**: Annual budget (₦210M), Q2 Operational (₦25M)
- **5 Indicators** with various statuses
- Time logs, comments, and labels

#### Project 2: Advanced Manufacturing Technology Initiative
- **Directorate**: Renewable Energy and Power
- **2 Milestones**: Technology Transfer (Completed), Facility Setup (In Progress)
- **1 Budget**: Manufacturing Initiative (₦325M)
- **4 Indicators** with various statuses
- Time logs, comments, and labels

### System Data
- **12 Labels**: Priority levels, categories (Data Collection, Field Work, Documentation, etc.)
- **249 Countries** in the database
- **159 Currencies** in the database
- **9 Roles** with comprehensive permissions
- **Owner Company**: NASENI

## Verify Setup

1. **Login** as admin: `admin@naseni.gov.ng` / `password`
2. **Check Dashboard** - Should show 2 projects
3. **Check Admin Dashboard** - Should show all statistics
4. **Check Monitoring Dashboard** - Should show milestones and budgets
5. **Navigate to Projects** - Should see both projects
6. **Open a project** - Should see milestones, budgets, and indicators

## Troubleshooting

### "Seed demo data?" not appearing
Make sure you're running `migrate:fresh --seed` or `migrate --seed`

### Permission errors
Run:
```bash
php artisan cache:clear
php artisan config:clear
```

### Database connection errors
Check your `.env` file for correct database credentials:
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=pmes
DB_USERNAME=root
DB_PASSWORD=your_password
```

### Roles not working
Ensure the migration and seeder ran successfully:
```bash
php artisan migrate:status
```

## Next Steps

1. **Customize** the owner company info in Settings → Company
2. **Add more users** as needed
3. **Create additional projects**
4. **Explore dashboards** to see system capabilities
5. **Test different roles** by logging in with different accounts

## Production Setup

For production deployment, answer **no** when asked to seed demo data. This will:
- Create only the system administrator account
- Create basic labels and system data
- Skip demo projects and organizations

---

**Ready to start!** 🚀

Run: `php artisan migrate:fresh --seed` and answer **yes** to seed demo data.

