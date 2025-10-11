import Layout from "@/layouts/MainLayout";
import { usePage } from "@inertiajs/react";
import { Grid, Stack, Title } from "@mantine/core";
import {
  IconChartBar,
  IconChecklist,
  IconCurrencyDollar,
  IconFolders,
  IconTarget,
  IconTrendingUp,
} from "@tabler/icons-react";
import BudgetOverview from "./components/BudgetOverview";
import DirectorateTable from "./components/DirectorateTable";
import MetricCard from "./components/MetricCard";
import StatusCard from "./components/StatusCard";
import TrendChart from "./components/TrendChart";

const MonitoringDashboard = () => {
  const { stats } = usePage().props;

  const { projects, milestones, budgets, directorates, trends } = stats;

  return (
    <Stack gap="xl">
      <Title>Monitoring & Evaluation Dashboard</Title>

      {/* Project Overview */}
      <Grid>
        <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
          <MetricCard
            title="Total Projects"
            value={projects.total}
            subtitle={`${projects.active} active, ${projects.archived} archived`}
            icon={IconFolders}
            color="#228be6"
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
          <MetricCard
            title="Avg Completion Rate"
            value={`${projects.avg_completion_rate}%`}
            subtitle={`${projects.with_tasks} projects with tasks`}
            icon={IconTrendingUp}
            color="#40c057"
            progress={projects.avg_completion_rate}
            progressLabel="Overall project progress"
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
          <MetricCard
            title="Total Milestones"
            value={milestones.total}
            subtitle={`${milestones.by_status.completed} completed`}
            icon={IconTarget}
            color="#fab005"
            progress={milestones.completion_rate}
            progressLabel={`${milestones.completion_rate}% completion rate`}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
          <MetricCard
            title="Total Budgets"
            value={budgets.total}
            subtitle={`${budgets.utilization_rate}% utilized`}
            icon={IconCurrencyDollar}
            color="#12b886"
            progress={budgets.utilization_rate}
            progressLabel="Budget utilization"
          />
        </Grid.Col>
      </Grid>

      {/* Status Breakdown */}
      <Grid>
        <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
          <StatusCard
            title="Projects by Status"
            stats={projects.by_status}
            color="blue"
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
          <StatusCard
            title="Milestones by Status"
            stats={milestones.by_status}
            color="orange"
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
          <StatusCard
            title="Budgets by Status"
            stats={budgets.by_status}
            color="green"
          />
        </Grid.Col>
      </Grid>

      {/* Key Metrics */}
      <Grid>
        <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
          <MetricCard
            title="Milestones Due This Month"
            value={milestones.due_this_month}
            subtitle={`${milestones.overdue} overdue milestones`}
            icon={IconChecklist}
            color="#e64980"
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
          <MetricCard
            title="Average Milestone Progress"
            value={`${milestones.avg_progress}%`}
            subtitle="Across all milestones"
            icon={IconChartBar}
            color="#9c36b5"
            progress={milestones.avg_progress}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
          <BudgetOverview budgetStats={budgets} />
        </Grid.Col>
      </Grid>

      {/* Trends */}
      <Grid>
        <Grid.Col span={{ base: 12, lg: 6 }}>
          <TrendChart
            title="Project Creation Trends"
            data={trends.projects}
            series={[
              { name: "created", label: "Created", color: "#228be6" },
              { name: "total", label: "Total", color: "#40c057" },
            ]}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, lg: 6 }}>
          <TrendChart
            title="Milestone Trends"
            data={trends.milestones}
            series={[
              { name: "completed", label: "Completed", color: "#40c057" },
              { name: "created", label: "Created", color: "#228be6" },
            ]}
          />
        </Grid.Col>
      </Grid>

      <Grid>
        <Grid.Col span={12}>
          <TrendChart
            title="Budget Trends"
            data={trends.budgets}
            series={[
              { name: "allocated", label: "Allocated", color: "#228be6" },
              { name: "spent", label: "Spent", color: "#fa5252" },
            ]}
          />
        </Grid.Col>
      </Grid>

      {/* Directorate Performance */}
      {directorates.directorates && directorates.directorates.length > 0 && (
        <Grid>
          <Grid.Col span={12}>
            <DirectorateTable directorates={directorates.directorates} />
          </Grid.Col>
        </Grid>
      )}
    </Stack>
  );
};

MonitoringDashboard.layout = (page) => <Layout children={page} title="M&E Dashboard" />;

export default MonitoringDashboard;

