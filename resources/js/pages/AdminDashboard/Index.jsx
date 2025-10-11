import Layout from "@/layouts/MainLayout";
import { usePage } from "@inertiajs/react";
import { Avatar, Badge, Grid, Group, Paper, Stack, Table, Text, Title } from "@mantine/core";
import {
  IconBriefcase,
  IconCheck,
  IconClipboardList,
  IconClock,
  IconCurrencyDollar,
  IconFileInvoice,
  IconListCheck,
  IconUsers,
} from "@tabler/icons-react";
import AreaChartComponent from "./components/AreaChartComponent";
import BarChartComponent from "./components/BarChartComponent";
import ChartCard from "./components/ChartCard";
import LineChartComponent from "./components/LineChartComponent";
import PieChartComponent from "./components/PieChartComponent";
import StatCard from "./components/StatCard";

const AdminDashboard = () => {
  const {
    statistics,
    projectsOverview,
    indicatorsAnalytics,
    userActivityData,
    revenueData,
    timeLogData,
    projectStatusDistribution,
    topPerformers,
    recentActivities,
    organizationsOverview,
    milestoneStatistics,
    budgetStatistics,
    vendorDirectorateStats,
  } = usePage().props;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  };

  const formatHours = (hours) => {
    return `${hours.toFixed(1)} hrs`;
  };

  return (
    <Stack gap="xl">
      <Title>System Admin Dashboard</Title>

      {/* Overview Statistics */}
      <Grid>
        <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
          <StatCard
            title="Total Projects"
            value={statistics.totalProjects}
            subtitle={`${statistics.activeProjects} active, ${statistics.archivedProjects} archived`}
            icon={IconBriefcase}
            color="#228be6"
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
          <StatCard
            title="Total Indicators"
            value={statistics.totalIndicators}
            subtitle={`${statistics.completedIndicators} completed, ${statistics.overdueIndicators} overdue`}
            icon={IconClipboardList}
            color="#40c057"
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
          <StatCard
            title="Total Users"
            value={statistics.totalUsers}
            subtitle={`${statistics.activeUsers} active, ${statistics.archivedUsers} archived`}
            icon={IconUsers}
            color="#fab005"
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
          <StatCard
            title="Total Revenue"
            value={formatCurrency(statistics.totalRevenue)}
            subtitle={`${statistics.pendingInvoices} pending invoices`}
            icon={() => <span style={{ fontSize: 24 }}>₦</span>}
            color="#12b886"
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
          <StatCard
            title="Time Logged"
            value={formatHours(statistics.totalTimeLogged / 60)}
            subtitle="Total hours tracked"
            icon={IconClock}
            color="#e64980"
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
          <StatCard
            title="Total Organizations"
            value={statistics.totalOrganizations}
            subtitle={`${statistics.totalVendors} vendors, ${statistics.totalDirectorates} directorates`}
            icon={IconBriefcase}
            color="#be4bdb"
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
          <StatCard
            title="Total Invoices"
            value={statistics.totalInvoices}
            subtitle={`${statistics.pendingInvoices} pending`}
            icon={IconFileInvoice}
            color="#fd7e14"
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
          <StatCard
            title="Completed Indicators"
            value={statistics.completedIndicators}
            subtitle={`${((statistics.completedIndicators / statistics.totalIndicators) * 100).toFixed(1)}% completion rate`}
            icon={IconListCheck}
            color="#20c997"
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
          <StatCard
            title="Total Milestones"
            value={statistics.totalMilestones}
            subtitle={`${statistics.completedMilestones} completed, ${statistics.overdueMilestones} overdue`}
            icon={IconCheck}
            color="#7950f2"
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
          <StatCard
            title="Total Budgets"
            value={statistics.totalBudgets}
            subtitle={`${statistics.activeBudgets} active, ${formatCurrency(statistics.totalBudgetAmount)} total`}
            icon={IconCurrencyDollar}
            color="#f59f00"
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
          <StatCard
            title="Budget Utilization"
            value={`${statistics.totalBudgetAmount > 0 ? ((statistics.totalSpentAmount / statistics.totalBudgetAmount) * 100).toFixed(1) : 0}%`}
            subtitle={`${formatCurrency(statistics.totalSpentAmount)} spent`}
            icon={() => <span style={{ fontSize: 24 }}>₦</span>}
            color="#e64980"
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
          <StatCard
            title="Comments & Labels"
            value={statistics.totalComments}
            subtitle={`${statistics.totalLabels} labels`}
            icon={IconClipboardList}
            color="#15aabf"
          />
        </Grid.Col>
      </Grid>

      {/* Charts Section */}
      <Grid>
        {/* Projects Overview */}
        <Grid.Col span={{ base: 12, lg: 6 }}>
          <ChartCard title="Projects Overview (Last 12 Months)" height={350}>
            <LineChartComponent
              data={projectsOverview}
              dataKeys={[
                { dataKey: "created", name: "Created" },
                { dataKey: "archived", name: "Archived" },
              ]}
              xAxisKey="month"
            />
          </ChartCard>
        </Grid.Col>

        {/* Revenue Trend */}
        <Grid.Col span={{ base: 12, lg: 6 }}>
          <ChartCard title="Revenue Trend (Last 12 Months)" height={350}>
            <AreaChartComponent
              data={revenueData}
              dataKeys={[{ dataKey: "revenue", name: "Revenue ($)" }]}
              xAxisKey="month"
            />
          </ChartCard>
        </Grid.Col>

        {/* Indicators Analytics */}
        <Grid.Col span={{ base: 12, lg: 8 }}>
          <ChartCard title="Indicators Created vs Completed (Last 30 Days)" height={350}>
            <BarChartComponent
              data={indicatorsAnalytics}
              dataKeys={[
                { dataKey: "created", name: "Created" },
                { dataKey: "completed", name: "Completed" },
              ]}
              xAxisKey="date"
            />
          </ChartCard>
        </Grid.Col>

        {/* Project Status Distribution */}
        <Grid.Col span={{ base: 12, lg: 4 }}>
          <ChartCard title="Active vs Archived Projects" height={350}>
            <PieChartComponent data={projectStatusDistribution} />
          </ChartCard>
        </Grid.Col>

        {/* Time Logged */}
        <Grid.Col span={{ base: 12, lg: 6 }}>
          <ChartCard title="Time Logged (Last 7 Days)" height={350}>
            <LineChartComponent
              data={timeLogData}
              dataKeys={[{ dataKey: "hours", name: "Hours" }]}
              xAxisKey="date"
            />
          </ChartCard>
        </Grid.Col>

        {/* User Activity by Role */}
        <Grid.Col span={{ base: 12, lg: 6 }}>
          <ChartCard title="Users by Role" height={350}>
            <BarChartComponent
              data={userActivityData}
              dataKeys={[{ dataKey: "count", name: "Users" }]}
              xAxisKey="role"
            />
          </ChartCard>
        </Grid.Col>

        {/* Milestone Completion Trend */}
        <Grid.Col span={{ base: 12, lg: 6 }}>
          <ChartCard title="Milestone Completion (Last 6 Months)" height={350}>
            <BarChartComponent
              data={milestoneStatistics.trends}
              dataKeys={[{ dataKey: "completed", name: "Completed" }]}
              xAxisKey="month"
            />
          </ChartCard>
        </Grid.Col>

        {/* Budget Allocation Trend */}
        <Grid.Col span={{ base: 12, lg: 6 }}>
          <ChartCard title="Budget Allocation (Last 6 Months)" height={350}>
            <AreaChartComponent
              data={budgetStatistics.trends}
              dataKeys={[{ dataKey: "allocated", name: "Allocated (₦)" }]}
              xAxisKey="month"
            />
          </ChartCard>
        </Grid.Col>
      </Grid>

      {/* Additional Data Tables */}
      <Grid>
        {/* Top Performers */}
        <Grid.Col span={{ base: 12, lg: 6 }}>
          <Paper shadow="sm" p="lg" radius="md" withBorder>
            <Title order={3} mb="md">
              Top Performers
            </Title>
            <Table>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Team Member</Table.Th>
                  <Table.Th>Role</Table.Th>
                  <Table.Th>Indicators</Table.Th>
                  <Table.Th>Hours</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {topPerformers.map((performer) => (
                  <Table.Tr key={performer.id}>
                    <Table.Td>
                      <Group gap="sm">
                        <Avatar src={performer.avatar} radius="xl" size="sm">
                          {performer.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </Avatar>
                        <Text size="sm" fw={500}>
                          {performer.name}
                        </Text>
                      </Group>
                    </Table.Td>
                    <Table.Td>
                      <Text size="sm" c="dimmed">
                        {performer.job_title}
                      </Text>
                    </Table.Td>
                    <Table.Td>
                      <Badge color="blue" variant="light">
                        {performer.completed_tasks}
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      <Badge color="green" variant="light">
                        {performer.hours_logged}h
                      </Badge>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Paper>
        </Grid.Col>

        {/* Organizations Overview */}
        <Grid.Col span={{ base: 12, lg: 6 }}>
          <Paper shadow="sm" p="lg" radius="md" withBorder>
            <Title order={3} mb="md">
              Organizations Overview
            </Title>
            <Table>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Organization</Table.Th>
                  <Table.Th>Type</Table.Th>
                  <Table.Th>Projects</Table.Th>
                  <Table.Th>Users</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {organizationsOverview.slice(0, 10).map((org) => (
                  <Table.Tr key={org.id}>
                    <Table.Td>
                      <Text size="sm" fw={500}>
                        {org.name}
                      </Text>
                    </Table.Td>
                    <Table.Td>
                      <Badge 
                        color={org.type === 'Vendor' ? 'grape' : org.type === 'Directorate' ? 'cyan' : 'gray'} 
                        variant="light"
                      >
                        {org.type}
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      <Badge color="blue" variant="light">
                        {org.projects_count}
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      <Badge color="green" variant="light">
                        {org.users_count}
                      </Badge>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Paper>
        </Grid.Col>

        {/* Recent Activities */}
        <Grid.Col span={12}>
          <Paper shadow="sm" p="lg" radius="md" withBorder>
            <Title order={3} mb="md">
              Recent Activities
            </Title>
            <Table>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Type</Table.Th>
                  <Table.Th>Name</Table.Th>
                  <Table.Th>Details</Table.Th>
                  <Table.Th>Created</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {recentActivities.map((activity, index) => (
                  <Table.Tr key={index}>
                    <Table.Td>
                      <Badge
                        color={activity.type === "project" ? "blue" : "green"}
                        variant="light"
                      >
                        {activity.type}
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      <Text size="sm" fw={500}>
                        {activity.name}
                      </Text>
                    </Table.Td>
                    <Table.Td>
                      <Text size="sm" c="dimmed">
                        {activity.type === "project"
                          ? activity.organization
                          : `${activity.project} - ${activity.assigned_to || "Unassigned"}`}
                      </Text>
                    </Table.Td>
                    <Table.Td>
                      <Text size="sm" c="dimmed">
                        {activity.created_at}
                      </Text>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Paper>
        </Grid.Col>
      </Grid>

      {/* Milestones & Budgets Section */}
      <Grid>
        {/* Milestone Status Breakdown */}
        <Grid.Col span={{ base: 12, lg: 6 }}>
          <Paper shadow="sm" p="lg" radius="md" withBorder>
            <Title order={3} mb="md">
              Milestone Status Breakdown
            </Title>
            <Stack gap="md">
              <Group justify="space-between">
                <Text size="sm">Total Milestones</Text>
                <Badge size="lg" color="blue" variant="filled">
                  {milestoneStatistics.total}
                </Badge>
              </Group>
              <Group justify="space-between">
                <Text size="sm">Average Progress</Text>
                <Badge size="lg" color="cyan" variant="light">
                  {milestoneStatistics.avg_progress}%
                </Badge>
              </Group>
              <Group justify="space-between">
                <Text size="sm">Completion Rate</Text>
                <Badge size="lg" color="green" variant="light">
                  {milestoneStatistics.completion_rate}%
                </Badge>
              </Group>
              <Group justify="space-between">
                <Text size="sm">Due This Month</Text>
                <Badge size="lg" color="orange" variant="light">
                  {milestoneStatistics.due_this_month}
                </Badge>
              </Group>
              <Group justify="space-between">
                <Text size="sm">Overdue</Text>
                <Badge size="lg" color="red" variant="light">
                  {milestoneStatistics.overdue}
                </Badge>
              </Group>
            </Stack>
            <Table mt="xl">
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Status</Table.Th>
                  <Table.Th>Count</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                <Table.Tr>
                  <Table.Td>Not Started</Table.Td>
                  <Table.Td>
                    <Badge color="gray" variant="light">
                      {milestoneStatistics.by_status.not_started}
                    </Badge>
                  </Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>In Progress</Table.Td>
                  <Table.Td>
                    <Badge color="blue" variant="light">
                      {milestoneStatistics.by_status.in_progress}
                    </Badge>
                  </Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>Completed</Table.Td>
                  <Table.Td>
                    <Badge color="green" variant="light">
                      {milestoneStatistics.by_status.completed}
                    </Badge>
                  </Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>Delayed</Table.Td>
                  <Table.Td>
                    <Badge color="orange" variant="light">
                      {milestoneStatistics.by_status.delayed}
                    </Badge>
                  </Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>Cancelled</Table.Td>
                  <Table.Td>
                    <Badge color="red" variant="light">
                      {milestoneStatistics.by_status.cancelled}
                    </Badge>
                  </Table.Td>
                </Table.Tr>
              </Table.Tbody>
            </Table>
          </Paper>
        </Grid.Col>

        {/* Budget Overview */}
        <Grid.Col span={{ base: 12, lg: 6 }}>
          <Paper shadow="sm" p="lg" radius="md" withBorder>
            <Title order={3} mb="md">
              Budget Overview
            </Title>
            <Stack gap="md">
              <Group justify="space-between">
                <Text size="sm">Total Budgets</Text>
                <Badge size="lg" color="blue" variant="filled">
                  {budgetStatistics.total}
                </Badge>
              </Group>
              <Group justify="space-between">
                <Text size="sm">Total Amount</Text>
                <Text size="sm" fw={600}>
                  {formatCurrency(budgetStatistics.total_amount)}
                </Text>
              </Group>
              <Group justify="space-between">
                <Text size="sm">Spent Amount</Text>
                <Text size="sm" fw={600} c="red">
                  {formatCurrency(budgetStatistics.spent_amount)}
                </Text>
              </Group>
              <Group justify="space-between">
                <Text size="sm">Remaining Amount</Text>
                <Text size="sm" fw={600} c="green">
                  {formatCurrency(budgetStatistics.remaining_amount)}
                </Text>
              </Group>
              <Group justify="space-between">
                <Text size="sm">Utilization Rate</Text>
                <Badge size="lg" color={budgetStatistics.utilization_rate > 80 ? "red" : "green"} variant="light">
                  {budgetStatistics.utilization_rate}%
                </Badge>
              </Group>
            </Stack>
            <Table mt="xl">
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Status</Table.Th>
                  <Table.Th>Count</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                <Table.Tr>
                  <Table.Td>Draft</Table.Td>
                  <Table.Td>
                    <Badge color="gray" variant="light">
                      {budgetStatistics.by_status.draft}
                    </Badge>
                  </Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>Approved</Table.Td>
                  <Table.Td>
                    <Badge color="cyan" variant="light">
                      {budgetStatistics.by_status.approved}
                    </Badge>
                  </Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>Active</Table.Td>
                  <Table.Td>
                    <Badge color="green" variant="light">
                      {budgetStatistics.by_status.active}
                    </Badge>
                  </Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>Exceeded</Table.Td>
                  <Table.Td>
                    <Badge color="red" variant="light">
                      {budgetStatistics.by_status.exceeded}
                    </Badge>
                  </Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>Closed</Table.Td>
                  <Table.Td>
                    <Badge color="dark" variant="light">
                      {budgetStatistics.by_status.closed}
                    </Badge>
                  </Table.Td>
                </Table.Tr>
              </Table.Tbody>
            </Table>
          </Paper>
        </Grid.Col>

        {/* Top Vendors */}
        <Grid.Col span={{ base: 12, lg: 6 }}>
          <Paper shadow="sm" p="lg" radius="md" withBorder>
            <Title order={3} mb="md">
              Top Vendors ({vendorDirectorateStats.vendors.total} Total)
            </Title>
            <Text size="sm" c="dimmed" mb="md">
              {vendorDirectorateStats.vendors.with_projects} vendors with active projects
            </Text>
            <Table>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Vendor Name</Table.Th>
                  <Table.Th>Projects</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {vendorDirectorateStats.vendors.top_vendors.map((vendor) => (
                  <Table.Tr key={vendor.id}>
                    <Table.Td>
                      <Text size="sm" fw={500}>
                        {vendor.name}
                      </Text>
                    </Table.Td>
                    <Table.Td>
                      <Badge color="grape" variant="light">
                        {vendor.projects_count}
                      </Badge>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Paper>
        </Grid.Col>

        {/* Top Directorates */}
        <Grid.Col span={{ base: 12, lg: 6 }}>
          <Paper shadow="sm" p="lg" radius="md" withBorder>
            <Title order={3} mb="md">
              Top Directorates ({vendorDirectorateStats.directorates.total} Total)
            </Title>
            <Text size="sm" c="dimmed" mb="md">
              {vendorDirectorateStats.directorates.with_projects} directorates with active projects
            </Text>
            <Table>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Directorate</Table.Th>
                  <Table.Th>Projects</Table.Th>
                  <Table.Th>Milestones</Table.Th>
                  <Table.Th>Progress</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {vendorDirectorateStats.directorates.top_directorates.map((directorate) => (
                  <Table.Tr key={directorate.id}>
                    <Table.Td>
                      <Text size="sm" fw={500}>
                        {directorate.name}
                      </Text>
                    </Table.Td>
                    <Table.Td>
                      <Badge color="cyan" variant="light">
                        {directorate.projects_count}
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      <Text size="sm">
                        {directorate.completed_milestones}/{directorate.total_milestones}
                      </Text>
                    </Table.Td>
                    <Table.Td>
                      <Badge 
                        color={directorate.milestone_completion_rate >= 80 ? "green" : directorate.milestone_completion_rate >= 50 ? "orange" : "red"} 
                        variant="light"
                      >
                        {directorate.milestone_completion_rate}%
                      </Badge>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Paper>
        </Grid.Col>

        {/* Top Projects by Budget */}
        <Grid.Col span={12}>
          <Paper shadow="sm" p="lg" radius="md" withBorder>
            <Title order={3} mb="md">
              Top Projects by Budget Allocation
            </Title>
            <Table>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Project Name</Table.Th>
                  <Table.Th>Total Budget</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {budgetStatistics.top_projects.map((project, index) => (
                  <Table.Tr key={index}>
                    <Table.Td>
                      <Text size="sm" fw={500}>
                        {project.project}
                      </Text>
                    </Table.Td>
                    <Table.Td>
                      <Text size="sm" fw={600} c="blue">
                        {formatCurrency(project.amount)}
                      </Text>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Paper>
        </Grid.Col>
      </Grid>
    </Stack>
  );
};

AdminDashboard.layout = (page) => (
  <Layout title="Admin Dashboard">{page}</Layout>
);

export default AdminDashboard;

