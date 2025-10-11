# Admin Dashboard

## Overview
A comprehensive system admin dashboard with advanced analytics and data visualizations has been implemented for administrators to monitor the entire system's performance and activities.

## Features

### Analytics & Statistics
The admin dashboard provides the following key metrics:

#### Overview Cards
- **Total Projects**: Total count with breakdown of active and archived projects
- **Total Tasks**: Total count with breakdown of completed and overdue tasks
- **Total Users**: Total count with breakdown of active and archived users
- **Total Revenue**: Sum of all paid invoices with pending invoice count
- **Time Logged**: Total hours tracked across all projects
- **Total Clients**: Number of client companies
- **Total Invoices**: Count of all invoices with pending status
- **Completed Tasks**: Task completion rate percentage

### Charts & Visualizations

#### 1. Projects Overview (Line Chart)
- Last 12 months of project creation and archival trends
- Helps identify project throughput and lifecycle management

#### 2. Revenue Trend (Area Chart)
- Monthly revenue tracking for the last 12 months
- Visual representation of business growth

#### 3. Tasks Analytics (Bar Chart)
- Last 30 days of task creation vs completion
- Helps identify task management efficiency

#### 4. Active vs Archived Projects (Pie Chart)
- Visual breakdown of active vs archived projects
- Shows percentage distribution

#### 5. Time Logged (Line Chart)
- Last 7 days of time tracking
- Monitors team productivity

#### 6. Users by Role (Bar Chart)
- Distribution of users across different roles
- Helps with resource allocation planning

### Data Tables

#### Top Performers
- Lists top 10 team members by completed tasks
- Shows hours logged per user
- Displays user avatars and job titles

#### Clients Overview
- Lists all client companies
- Shows project count per client
- Displays number of users per company

#### Recent Activities
- Real-time feed of recent projects and tasks
- Shows who created what and when
- Helps monitor system activity

## Technical Implementation

### Backend (Laravel)

#### Controller
- **File**: `app/Http/Controllers/AdminDashboardController.php`
- **Route**: `GET /admin/dashboard` (named route: `admin.dashboard`)
- **Authorization**: Only accessible to users with admin role
- **Methods**:
  - `index()` - Main dashboard data endpoint
  - `getStatistics()` - Overview statistics
  - `getProjectsOverview()` - 12-month project trends
  - `getTasksAnalytics()` - 30-day task analytics
  - `getUserActivityData()` - User distribution by role
  - `getRevenueData()` - 12-month revenue trends
  - `getTimeLogData()` - 7-day time logging data
  - `getProjectStatusDistribution()` - Project status breakdown
  - `getTopPerformers()` - Top 10 performing team members
  - `getRecentActivities()` - Latest system activities
  - `getClientsOverview()` - Client company statistics

### Frontend (React + Inertia.js)

#### Main Component
- **File**: `resources/js/pages/AdminDashboard/Index.jsx`
- **Layout**: Uses MainLayout
- **UI Framework**: Mantine UI components
- **Charts Library**: Recharts

#### Reusable Components
1. **StatCard** (`components/StatCard.jsx`)
   - Displays key metrics with icons
   - Supports custom colors and subtitles

2. **ChartCard** (`components/ChartCard.jsx`)
   - Wrapper for chart components
   - Consistent styling and spacing

3. **LineChartComponent** (`components/LineChartComponent.jsx`)
   - Multi-line chart support
   - Responsive design
   - Interactive tooltips

4. **BarChartComponent** (`components/BarChartComponent.jsx`)
   - Multi-bar chart support
   - Color-coded data series
   - Legend support

5. **PieChartComponent** (`components/PieChartComponent.jsx`)
   - Percentage-based visualization
   - Custom color palette
   - Interactive labels

6. **AreaChartComponent** (`components/AreaChartComponent.jsx`)
   - Gradient-filled area charts
   - Multiple data series support
   - Smooth animations

### Navigation
- Added to sidebar navigation with chart icon
- Visible only to users with admin permissions
- Uses `can("view users")` permission check

## Access Control
- Dashboard is protected at both route and controller level
- Only users with 'admin' role can access
- Returns 403 error for unauthorized access attempts

## Dependencies
- **recharts**: ^2.x (installed for chart visualizations)
- **@mantine/core**: UI components
- **@tabler/icons-react**: Icons

## Usage

### For Administrators
1. Log in with an admin account
2. Navigate to "Admin Dashboard" from the sidebar
3. View comprehensive analytics and metrics
4. Use charts to identify trends and patterns
5. Monitor top performers and recent activities
6. Track revenue and project progress

### For Developers
To add new analytics:
1. Add data fetching method in `AdminDashboardController.php`
2. Pass data to Inertia render in `index()` method
3. Create chart component if needed
4. Add visualization in `AdminDashboard/Index.jsx`

## Future Enhancements
Possible improvements:
- Date range filters for charts
- Export functionality (PDF/Excel)
- Custom dashboard widgets
- Real-time data updates via WebSockets
- Drill-down capabilities for detailed views
- Team performance comparisons
- Custom alert thresholds
- Scheduled reports via email

