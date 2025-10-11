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
    tasksAnalytics,
    userActivityData,
    revenueData,
    timeLogData,
    projectStatusDistribution,
    topPerformers,
    recentActivities,
    clientsOverview,
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
            title="Total Tasks"
            value={statistics.totalTasks}
            subtitle={`${statistics.completedTasks} completed, ${statistics.overdueTasks} overdue`}
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
            title="Total Clients"
            value={statistics.totalClients}
            subtitle="Client companies"
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
            title="Completed Tasks"
            value={statistics.completedTasks}
            subtitle={`${((statistics.completedTasks / statistics.totalTasks) * 100).toFixed(1)}% completion rate`}
            icon={IconListCheck}
            color="#20c997"
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

        {/* Tasks Analytics */}
        <Grid.Col span={{ base: 12, lg: 8 }}>
          <ChartCard title="Tasks Created vs Completed (Last 30 Days)" height={350}>
            <BarChartComponent
              data={tasksAnalytics}
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
                  <Table.Th>Agent</Table.Th>
                  <Table.Th>Role</Table.Th>
                  <Table.Th>Tasks</Table.Th>
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

        {/* Clients Overview */}
        <Grid.Col span={{ base: 12, lg: 6 }}>
          <Paper shadow="sm" p="lg" radius="md" withBorder>
            <Title order={3} mb="md">
              Clients Overview
            </Title>
            <Table>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Client Company</Table.Th>
                  <Table.Th>Projects</Table.Th>
                  <Table.Th>Users</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {clientsOverview.slice(0, 10).map((client) => (
                  <Table.Tr key={client.id}>
                    <Table.Td>
                      <Text size="sm" fw={500}>
                        {client.name}
                      </Text>
                    </Table.Td>
                    <Table.Td>
                      <Badge color="blue" variant="light">
                        {client.projects_count}
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      <Badge color="green" variant="light">
                        {client.clients_count}
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
                          ? activity.client
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
    </Stack>
  );
};

AdminDashboard.layout = (page) => (
  <Layout title="Admin Dashboard">{page}</Layout>
);

export default AdminDashboard;

