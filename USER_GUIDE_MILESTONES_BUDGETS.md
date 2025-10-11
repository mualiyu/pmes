# User Guide: Adding Milestones & Budgets to Projects

## 📋 Quick Navigation
- [Adding Milestones](#adding-milestones-to-a-project)
- [Adding Budgets](#adding-budgets-to-a-project)
- [Viewing & Managing](#viewing-and-managing)
- [Tips & Best Practices](#tips--best-practices)

---

## 🎯 Adding Milestones to a Project

### **Method 1: Via Project Card (Fastest)**

1. **Navigate to Projects Page**
   - Click "**Projects**" in the sidebar
   - You'll see all your project cards

2. **Click the Milestone Icon**
   - Find your project card
   - Click the **blue milestone icon (🎯)** at the bottom of the card
   - This takes you to that project's milestone list

3. **Create New Milestone**
   - Click the "**Create Milestone**" button (top right)
   - Fill in the milestone form:

#### **Required Fields:**
- ✅ **Name** - e.g., "Phase 1 Completion", "Prototype Delivery"
- ✅ **Status** - Select from dropdown:
  - `Not Started` - Planning phase
  - `In Progress` - Currently working
  - `Completed` - Finished
  - `Delayed` - Behind schedule
  - `Cancelled` - No longer pursuing

#### **Optional Fields:**
- **Description** - Details about the milestone
- **Progress** - Percentage complete (0-100%)
- **Start Date** - When milestone begins
- **End Date** - Target completion date
- **Actual Start Date** - When you actually started
- **Actual End Date** - When you actually finished
- **Budget Allocated** - Amount allocated to this milestone (₦)
- **Order** - For sorting (lower numbers appear first)
- **Deliverables** - What will be delivered

4. **Save**
   - Click "**Create Milestone**" button
   - Success! Your milestone is created

---

### **Method 2: Via Navigation Menu**

1. **Open Projects Menu**
   - Click "**Project Management**" in sidebar
   - Click "**All Milestones**"

2. **Note**: From here you can:
   - View all milestones across all projects
   - Edit existing milestones
   - But to **create** a new milestone, you need to:
     - Go back to specific project (Method 1)
     - Or use Method 3 below

---

### **Method 3: Via Direct URL**

If you know the project ID:
```
URL: /projects/{project-id}/milestones
```

Example: `/projects/5/milestones`

Then click "**Create Milestone**" button.

---

## 💰 Adding Budgets to a Project

### **Method 1: Via Project Card (Fastest)**

1. **Navigate to Projects Page**
   - Click "**Projects**" in the sidebar

2. **Click the Budget Icon**
   - Find your project card
   - Click the **green budget icon (💰)** at the bottom of the card
   - This takes you to that project's budget list

3. **Create New Budget**
   - Click the "**Create Budget**" button (top right)
   - Fill in the budget form:

#### **Required Fields:**
- ✅ **Name** - e.g., "2025 Annual Budget", "Q1 Budget"
- ✅ **Status** - Select from dropdown:
  - `Draft` - Initial planning
  - `Approved` - Approved by management
  - `Active` - Currently in use
  - `Exceeded` - Over budget
  - `Closed` - Completed/closed
- ✅ **Total Amount** - Total budget (₦)

#### **Optional Fields:**
- **Description** - Budget details
- **Currency** - Select currency (defaults to NGN)
- **Allocated Amount** - Amount allocated so far
- **Spent Amount** - Amount already spent
- **Remaining Amount** - Auto-calculated (Total - Spent)
- **Fiscal Year Start** - Budget period start date
- **Fiscal Year End** - Budget period end date
- **Notes** - Additional information

4. **Save**
   - Click "**Create Budget**" button
   - Success! Your budget is created

---

### **Method 2: Via Navigation Menu**

1. **Open Projects Menu**
   - Click "**Project Management**" in sidebar
   - Click "**All Budgets**"

2. **Note**: Similar to milestones:
   - You can view all budgets
   - Edit existing budgets
   - But to create new, use Method 1 or 3

---

### **Method 3: Via Direct URL**

If you know the project ID:
```
URL: /projects/{project-id}/budgets
```

Example: `/projects/5/budgets`

Then click "**Create Budget**" button.

---

## 📊 Viewing and Managing

### **View Project-Specific Milestones**

**Option A: Quick Access**
```
Projects Page → Click 🎯 Icon → View Milestones
```

**Option B: Direct Navigation**
```
1. Go to Projects
2. Click on project name
3. In project view, access milestones tab
```

### **View All Milestones (Global View)**

```
Sidebar → Project Management → All Milestones
```

**What you'll see:**
- Table showing ALL milestones from ALL projects
- Project name in first column
- Status, progress, dates, budget
- Search and filter options
- Quick edit/delete actions

---

### **View Project-Specific Budgets**

**Option A: Quick Access**
```
Projects Page → Click 💰 Icon → View Budgets
```

**Option B: Direct Navigation**
```
1. Go to Projects
2. Click on project name
3. In project view, access budgets tab
```

### **View All Budgets (Global View)**

```
Sidebar → Project Management → All Budgets
```

**What you'll see:**
- Table showing ALL budgets from ALL projects
- Project name in first column
- Status, amounts, utilization
- Search and filter options
- Quick edit/delete actions

---

## ✏️ Editing Milestones & Budgets

### **Edit a Milestone**

1. Navigate to milestones (any method above)
2. Find the milestone you want to edit
3. Click the **blue edit icon (✏️)**
4. Update the form
5. Click "**Update Milestone**"

### **Edit a Budget**

1. Navigate to budgets (any method above)
2. Find the budget you want to edit
3. Click the **blue edit icon (✏️)**
4. Update the form
5. Click "**Update Budget**"

---

## 🗑️ Deleting (Archiving)

### **Delete/Archive an Item**

1. Navigate to the list view
2. Find the item
3. Click the **red trash icon (🗑️)**
4. Confirm deletion

**Note**: Items are archived, not permanently deleted. Admins can restore them.

### **Restore Archived Items**

1. Admin users: Click the "**Archived**" filter button
2. Find the archived item
3. Click "**Restore**" button

---

## 💡 Tips & Best Practices

### **For Milestones:**

1. **Use Clear Names**
   ✅ Good: "Phase 1: Research & Planning Complete"
   ❌ Bad: "Milestone 1"

2. **Set Realistic Dates**
   - Plan for buffer time
   - Consider dependencies
   - Update actual dates as you progress

3. **Track Progress Regularly**
   - Update progress percentage weekly
   - Change status as milestones evolve
   - Use "Delayed" status to flag issues early

4. **Document Deliverables**
   - List specific outputs
   - Makes tracking easier
   - Helps with reporting

5. **Order Milestones**
   - Use the order field (0, 1, 2...)
   - Lower numbers appear first
   - Helps visualize project timeline

### **For Budgets:**

1. **Separate Budgets by Period**
   ✅ Good: "2025 Q1 Budget", "2025 Q2 Budget"
   ❌ Bad: One budget for entire year

2. **Update Spent Amount Regularly**
   - Weekly or monthly updates
   - Helps identify overspending early
   - Remaining amount auto-calculates

3. **Use Status Progression**
   ```
   Draft → Approved → Active → Closed
   ```
   - Mark as "Exceeded" if over budget
   - Helps with auditing and reporting

4. **Set Fiscal Year Dates**
   - Helps with annual reporting
   - Tracks budget periods clearly

5. **Monitor Utilization**
   - Green bar: < 70% spent (good)
   - Yellow bar: 70-90% spent (caution)
   - Red bar: > 90% spent (alert!)

---

## 🔍 Search & Filter

### **Search Functionality**

**Available on all list pages:**
- Type in search box
- Searches milestone/budget names
- Searches descriptions
- Real-time filtering

### **Status Filters**

**Milestones:**
```
?status=in_progress
?status=completed
?status=delayed
```

**Budgets:**
```
?status=active
?status=exceeded
?status=approved
```

### **Archive Filter (Admin Only)**

- Click "Archived" button to toggle
- Shows only archived items
- Can restore from this view

---

## 📸 Visual Guide

### **Project Card with Action Buttons**

```
┌─────────────────────────────────────────┐
│ Project Name                          ⭐ │
│ Client Company                           │
│                                          │
│ Description text here...                 │
│                                          │
│ Completed indicators: 15 / 30            │
│ [████████░░░░░░░░░░░░] Progress Bar      │
│                                          │
│ 👤👤👤 Users      🎯 💰 ⋮ Actions        │
└─────────────────────────────────────────┘
                       │  │  └─ More Options
                       │  └─ Budget (Green)
                       └─ Milestone (Blue)
```

### **Milestone Form Fields**

```
┌────────────────────────────────────────┐
│ Name: [Phase 1 Completion           ] │
│ Description: [Textarea for details   ] │
│                                        │
│ Status: [In Progress ▼]  Progress: [45%] │
│                                        │
│ Start Date: [2025-01-01]              │
│ End Date:   [2025-03-31]              │
│                                        │
│ Budget Allocated: [₦ 5,000,000]      │
│ Order: [1]                             │
│                                        │
│ Deliverables: [Textarea for list    ] │
│                                        │
│              [Create Milestone]        │
└────────────────────────────────────────┘
```

### **Budget Form Fields**

```
┌────────────────────────────────────────┐
│ Name: [2025 Annual Budget           ] │
│ Description: [Textarea for details   ] │
│                                        │
│ Status: [Active ▼]  Currency: [NGN ▼] │
│                                        │
│ Total Amount:     [₦ 50,000,000]     │
│ Allocated Amount: [₦ 30,000,000]     │
│ Spent Amount:     [₦ 15,000,000]     │
│ Remaining:        [₦ 35,000,000]     │
│                   (auto-calculated)    │
│                                        │
│ Fiscal Year Start: [2025-01-01]      │
│ Fiscal Year End:   [2025-12-31]      │
│                                        │
│ Notes: [Textarea for notes          ] │
│                                        │
│              [Create Budget]           │
└────────────────────────────────────────┘
```

---

## ⚠️ Common Issues & Solutions

### **Issue: Can't see Create button**
**Solution**: Check permissions - you need "create project" permission

### **Issue: Can't find milestone/budget after creating**
**Solution**: Check if it was accidentally archived - use Archive filter

### **Issue: Remaining amount not updating**
**Solution**: It auto-calculates on save. Update spent amount, then save.

### **Issue: Progress bar not showing**
**Solution**: Ensure progress value is between 0-100

### **Issue: Can't delete milestone/budget**
**Solution**: Check permissions - you need "archive project" permission

---

## 🎓 Example Workflow

### **Setting up a New Project**

**Step 1: Create Project**
```
1. Projects → Create → Fill form → Save
```

**Step 2: Add Milestones**
```
1. Click 🎯 icon on project card
2. Create Milestone:
   - Name: "Requirement Gathering"
   - Status: In Progress
   - Progress: 25%
   - Dates: Set start and target end
   
3. Create Milestone:
   - Name: "Design Phase"
   - Status: Not Started
   - Order: 2
   
4. Create Milestone:
   - Name: "Development"
   - Status: Not Started
   - Order: 3
   
5. Create Milestone:
   - Name: "Testing & Deployment"
   - Status: Not Started
   - Order: 4
```

**Step 3: Add Budget**
```
1. Click 💰 icon on project card
2. Create Budget:
   - Name: "2025 Project Budget"
   - Status: Approved
   - Total: ₦50,000,000
   - Fiscal Year: Jan 1 - Dec 31
```

**Step 4: Track Progress**
```
1. Update milestone progress weekly
2. Update budget spent amount monthly
3. Monitor utilization in global views
4. Mark milestones complete as you finish
```

---

## 📞 Quick Reference

### **URLs to Remember**

```
Projects:              /projects
Project Milestones:    /projects/{id}/milestones
Project Budgets:       /projects/{id}/budgets
All Milestones:        /milestones
All Budgets:           /budgets
M&E Dashboard:         /monitoring/dashboard
```

### **Required Permissions**

```
View:    "view projects"
Create:  "create project"
Edit:    "edit project"
Delete:  "archive project"
Restore: "restore project"
```

### **Keyboard Shortcuts**

```
Search:  Click search box or Tab to focus
Escape:  Close modals/dialogs
Enter:   Submit forms
```

---

## ✅ Checklist for New Projects

Use this checklist when setting up a new project:

- [ ] Create the project
- [ ] Add team members
- [ ] Define 3-5 key milestones
- [ ] Set milestone dates
- [ ] Create annual budget
- [ ] Set fiscal year dates
- [ ] Allocate budget to milestones (optional)
- [ ] Set initial milestone progress
- [ ] Review in M&E Dashboard

---

## 🎯 Summary

**To Add Milestones:**
1. Go to Projects page
2. Click blue 🎯 icon on project card
3. Click "Create Milestone"
4. Fill form and save

**To Add Budgets:**
1. Go to Projects page
2. Click green 💰 icon on project card
3. Click "Create Budget"
4. Fill form and save

**To View All:**
- Sidebar → Project Management → All Milestones/Budgets

**Easy, fast, and intuitive!** 🚀

---

**Need help?** Check the comprehensive documentation:
- `PROJECT_MANAGEMENT_MODULE.md` - Technical details
- `UI_IMPLEMENTATION_COMPLETE.md` - UI guide
- `QUICK_START_GUIDE.md` - API reference

**Happy project management!** 📊

