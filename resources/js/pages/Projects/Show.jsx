import { redirectTo } from "@/utils/route";
import { usePage } from "@inertiajs/react";
import {
  Avatar,
  Badge,
  Button,
  Card,
  Grid,
  Group,
  Progress,
  Stack,
  Tabs,
  Text,
  Title,
} from "@mantine/core";
import {
  IconBuildingBank,
  IconChartBar,
  IconCurrencyDollar,
  IconEdit,
  IconFileText,
  IconPlus,
  IconTarget,
  IconUsers,
} from "@tabler/icons-react";
import Layout from "@/layouts/MainLayout";
import { getInitials } from "@/utils/user";

const ProjectShow = () => {
  const { project } = usePage().props;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status) => {
    const colors = {
      not_started: "gray",
      in_progress: "blue",
      completed: "green",
      delayed: "red",
      cancelled: "dark",
      draft: "gray",
      approved: "blue",
      active: "green",
      exceeded: "red",
      closed: "dark",
    };
    return colors[status] || "gray";
  };

  const taskCompletionRate =
    project.all_tasks_count > 0
      ? (project.completed_tasks_count / project.all_tasks_count) * 100
      : 0;

  const milestoneCompletionRate =
    project.total_milestones_count > 0
      ? (project.completed_milestones_count / project.total_milestones_count) * 100
      : 0;

  return (
    <>
      {/* Header */}
      <Grid justify="space-between" align="flex-start" mb="xl">
        <Grid.Col span="auto">
          <Group gap="md" align="flex-start">
            <div>
              <Title order={1} mb="xs">
                {project.name}
              </Title>
              <Group gap="md">
                <Text c="dimmed" size="sm">
                  <IconBuildingBank size={16} style={{ verticalAlign: "middle" }} />{" "}
                  {project.client_company?.name || "No client"}
                </Text>
                {project.directorate && (
                  <Text c="dimmed" size="sm">
                    <IconUsers size={16} style={{ verticalAlign: "middle" }} />{" "}
                    {project.directorate.name}
                  </Text>
                )}
              </Group>
            </div>
          </Group>
        </Grid.Col>
        <Grid.Col span="content">
          <Group>
            {can("edit project") && (
              <Button
                leftSection={<IconEdit size={16} />}
                variant="light"
                onClick={() => redirectTo("projects.edit", { project: project.id })}
              >
                Edit Project
              </Button>
            )}
            <Button
              leftSection={<IconFileText size={16} />}
              onClick={() => redirectTo("projects.tasks", { project: project.id })}
            >
              View Indicators
            </Button>
          </Group>
        </Grid.Col>
      </Grid>

      {/* Stats Overview */}
      <Grid mb="xl">
        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
              Indicators
            </Text>
            <Text size="32px" fw={700} mt="xs">
              {project.completed_tasks_count}/{project.all_tasks_count}
            </Text>
            <Progress value={taskCompletionRate} mt="md" color="blue" />
            <Text size="xs" c="dimmed" mt="xs">
              {taskCompletionRate.toFixed(1)}% completed
            </Text>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
              Milestones
            </Text>
            <Text size="32px" fw={700} mt="xs">
              {project.completed_milestones_count}/{project.total_milestones_count}
            </Text>
            <Progress value={milestoneCompletionRate} mt="md" color="green" />
            <Text size="xs" c="dimmed" mt="xs">
              {milestoneCompletionRate.toFixed(1)}% completed
            </Text>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
              Budgets
            </Text>
            <Text size="32px" fw={700} mt="xs">
              {project.total_budgets_count}
            </Text>
            <Text size="sm" c="dimmed" mt="md">
              Active budget plans
            </Text>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
              Overdue
            </Text>
            <Text size="32px" fw={700} mt="xs" c="red">
              {project.overdue_tasks_count}
            </Text>
            <Text size="sm" c="dimmed" mt="md">
              Overdue indicators
            </Text>
          </Card>
        </Grid.Col>
      </Grid>

      {/* Tabs */}
      <Tabs defaultValue="overview" variant="pills">
        <Tabs.List mb="xl">
          <Tabs.Tab value="overview" leftSection={<IconChartBar size={16} />}>
            Overview
          </Tabs.Tab>
          <Tabs.Tab value="milestones" leftSection={<IconTarget size={16} />}>
            Milestones ({project.total_milestones_count})
          </Tabs.Tab>
          <Tabs.Tab value="budgets" leftSection={<IconCurrencyDollar size={16} />}>
            Budgets ({project.total_budgets_count})
          </Tabs.Tab>
          <Tabs.Tab value="team" leftSection={<IconUsers size={16} />}>
            Team ({project.users?.length || 0})
          </Tabs.Tab>
        </Tabs.List>

        {/* Overview Tab */}
        <Tabs.Panel value="overview">
          <Grid>
            <Grid.Col span={{ base: 12, md: 8 }}>
              <Card shadow="sm" padding="lg" radius="md" withBorder mb="lg">
                <Title order={3} mb="md">
                  Project Description
                </Title>
                {project.description ? (
                  <Text>{project.description}</Text>
                ) : (
                  <Text c="dimmed" fs="italic">
                    No description provided
                  </Text>
                )}
              </Card>

              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Title order={3} mb="md">
                  Project Details
                </Title>
                <Stack gap="md">
                  <Group justify="space-between">
                    <Text fw={500}>Client/Company:</Text>
                    <Text>{project.client_company?.name || "N/A"}</Text>
                  </Group>
                  {project.directorate && (
                    <Group justify="space-between">
                      <Text fw={500}>Directorate:</Text>
                      <Text>{project.directorate.name}</Text>
                    </Group>
                  )}
                  {project.client_company?.email && (
                    <Group justify="space-between">
                      <Text fw={500}>Email:</Text>
                      <Text>{project.client_company.email}</Text>
                    </Group>
                  )}
                  {project.client_company?.phone && (
                    <Group justify="space-between">
                      <Text fw={500}>Phone:</Text>
                      <Text>{project.client_company.phone}</Text>
                    </Group>
                  )}
                  {project.client_company?.address && (
                    <Group justify="space-between">
                      <Text fw={500}>Address:</Text>
                      <Text>{project.client_company.address}</Text>
                    </Group>
                  )}
                </Stack>
              </Card>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 4 }}>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Title order={3} mb="md">
                  Team Members
                </Title>
                <Stack gap="md">
                  {project.users && project.users.length > 0 ? (
                    project.users.map((user) => (
                      <Group key={user.id}>
                        <Avatar src={user.avatar} radius="xl">
                          {getInitials(user.name)}
                        </Avatar>
                        <div>
                          <Text size="sm" fw={500}>
                            {user.name}
                          </Text>
                          <Text size="xs" c="dimmed">
                            {user.email}
                          </Text>
                        </div>
                      </Group>
                    ))
                  ) : (
                    <Text c="dimmed" fs="italic">
                      No team members assigned
                    </Text>
                  )}
                </Stack>
              </Card>
            </Grid.Col>
          </Grid>
        </Tabs.Panel>

        {/* Milestones Tab */}
        <Tabs.Panel value="milestones">
          <Group justify="space-between" mb="md">
            <div>
              <Title order={3}>Project Milestones</Title>
              <Text c="dimmed" size="sm">
                Track and manage project milestones
              </Text>
            </div>
            {can("create project") && (
              <Button
                leftSection={<IconPlus size={16} />}
                onClick={() =>
                  redirectTo("projects.milestones.create", { project: project.id })
                }
              >
                Add Milestone
              </Button>
            )}
          </Group>

          {project.milestones && project.milestones.length > 0 ? (
            <Stack gap="md">
              {project.milestones.map((milestone) => (
                <Card key={milestone.id} shadow="sm" padding="lg" radius="md" withBorder>
                  <Group justify="space-between" mb="md">
                    <div>
                      <Group gap="sm">
                        <Text fw={600} size="lg">
                          {milestone.name}
                        </Text>
                        <Badge color={getStatusColor(milestone.status)}>
                          {milestone.status.replace(/_/g, " ").toUpperCase()}
                        </Badge>
                      </Group>
                      {milestone.description && (
                        <Text c="dimmed" size="sm" mt="xs">
                          {milestone.description}
                        </Text>
                      )}
                    </div>
                    {can("edit project") && (
                      <Button
                        size="xs"
                        variant="light"
                        onClick={() =>
                          redirectTo("projects.milestones.edit", {
                            project: project.id,
                            milestone: milestone.id,
                          })
                        }
                      >
                        Edit
                      </Button>
                    )}
                  </Group>

                  <Grid>
                    <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                      <Text size="xs" c="dimmed" mb="xs">
                        Progress
                      </Text>
                      <Progress
                        value={milestone.progress}
                        color={
                          milestone.progress >= 75
                            ? "green"
                            : milestone.progress >= 50
                            ? "yellow"
                            : "orange"
                        }
                        size="lg"
                      />
                      <Text size="sm" mt="xs">
                        {milestone.progress}%
                      </Text>
                    </Grid.Col>

                    {milestone.start_date && (
                      <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                        <Text size="xs" c="dimmed">
                          Start Date
                        </Text>
                        <Text size="sm">{milestone.start_date}</Text>
                      </Grid.Col>
                    )}

                    {milestone.end_date && (
                      <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                        <Text size="xs" c="dimmed">
                          End Date
                        </Text>
                        <Text size="sm">{milestone.end_date}</Text>
                      </Grid.Col>
                    )}

                    {milestone.budget_allocated > 0 && (
                      <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                        <Text size="xs" c="dimmed">
                          Budget
                        </Text>
                        <Text size="sm" fw={500}>
                          {formatCurrency(milestone.budget_allocated)}
                        </Text>
                      </Grid.Col>
                    )}
                  </Grid>

                  {milestone.deliverables && (
                    <div style={{ marginTop: 16 }}>
                      <Text size="xs" c="dimmed" mb="xs">
                        Deliverables
                      </Text>
                      <Text size="sm">{milestone.deliverables}</Text>
                    </div>
                  )}
                </Card>
              ))}
            </Stack>
          ) : (
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Text c="dimmed" ta="center" fs="italic">
                No milestones created yet
              </Text>
              {can("create project") && (
                <Group justify="center" mt="md">
                  <Button
                    variant="light"
                    onClick={() =>
                      redirectTo("projects.milestones.create", { project: project.id })
                    }
                  >
                    Create First Milestone
                  </Button>
                </Group>
              )}
            </Card>
          )}
        </Tabs.Panel>

        {/* Budgets Tab */}
        <Tabs.Panel value="budgets">
          <Group justify="space-between" mb="md">
            <div>
              <Title order={3}>Project Budgets</Title>
              <Text c="dimmed" size="sm">
                Track and manage project budgets
              </Text>
            </div>
            {can("create project") && (
              <Button
                leftSection={<IconPlus size={16} />}
                onClick={() =>
                  redirectTo("projects.budgets.create", { project: project.id })
                }
              >
                Add Budget
              </Button>
            )}
          </Group>

          {project.budgets && project.budgets.length > 0 ? (
            <Stack gap="md">
              {project.budgets.map((budget) => {
                const utilization =
                  budget.total_amount > 0
                    ? (budget.spent_amount / budget.total_amount) * 100
                    : 0;

                return (
                  <Card key={budget.id} shadow="sm" padding="lg" radius="md" withBorder>
                    <Group justify="space-between" mb="md">
                      <div>
                        <Group gap="sm">
                          <Text fw={600} size="lg">
                            {budget.name}
                          </Text>
                          <Badge color={getStatusColor(budget.status)}>
                            {budget.status.toUpperCase()}
                          </Badge>
                        </Group>
                        {budget.description && (
                          <Text c="dimmed" size="sm" mt="xs">
                            {budget.description}
                          </Text>
                        )}
                      </div>
                      {can("edit project") && (
                        <Button
                          size="xs"
                          variant="light"
                          onClick={() =>
                            redirectTo("projects.budgets.edit", {
                              project: project.id,
                              budget: budget.id,
                            })
                          }
                        >
                          Edit
                        </Button>
                      )}
                    </Group>

                    <Grid>
                      <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                        <Text size="xs" c="dimmed">
                          Total Budget
                        </Text>
                        <Text size="lg" fw={600}>
                          {formatCurrency(budget.total_amount)}
                        </Text>
                      </Grid.Col>

                      <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                        <Text size="xs" c="dimmed">
                          Spent
                        </Text>
                        <Text size="lg" fw={600} c="red">
                          {formatCurrency(budget.spent_amount)}
                        </Text>
                      </Grid.Col>

                      <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                        <Text size="xs" c="dimmed">
                          Remaining
                        </Text>
                        <Text size="lg" fw={600} c="green">
                          {formatCurrency(budget.remaining_amount)}
                        </Text>
                      </Grid.Col>

                      <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                        <Text size="xs" c="dimmed" mb="xs">
                          Utilization
                        </Text>
                        <Progress
                          value={utilization}
                          color={
                            utilization >= 90
                              ? "red"
                              : utilization >= 70
                              ? "yellow"
                              : "green"
                          }
                          size="lg"
                        />
                        <Text size="sm" mt="xs">
                          {utilization.toFixed(1)}%
                        </Text>
                      </Grid.Col>
                    </Grid>

                    {(budget.fiscal_year_start || budget.fiscal_year_end) && (
                      <Group mt="md">
                        <Text size="xs" c="dimmed">
                          Fiscal Year:
                        </Text>
                        <Text size="sm">
                          {budget.fiscal_year_start} - {budget.fiscal_year_end}
                        </Text>
                      </Group>
                    )}

                    {budget.notes && (
                      <div style={{ marginTop: 16 }}>
                        <Text size="xs" c="dimmed" mb="xs">
                          Notes
                        </Text>
                        <Text size="sm">{budget.notes}</Text>
                      </div>
                    )}
                  </Card>
                );
              })}
            </Stack>
          ) : (
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Text c="dimmed" ta="center" fs="italic">
                No budgets created yet
              </Text>
              {can("create project") && (
                <Group justify="center" mt="md">
                  <Button
                    variant="light"
                    onClick={() =>
                      redirectTo("projects.budgets.create", { project: project.id })
                    }
                  >
                    Create First Budget
                  </Button>
                </Group>
              )}
            </Card>
          )}
        </Tabs.Panel>

        {/* Team Tab */}
        <Tabs.Panel value="team">
          <Title order={3} mb="md">
            Team Members
          </Title>
          {project.users && project.users.length > 0 ? (
            <Grid>
              {project.users.map((user) => (
                <Grid.Col key={user.id} span={{ base: 12, sm: 6, md: 4 }}>
                  <Card shadow="sm" padding="lg" radius="md" withBorder>
                    <Group>
                      <Avatar src={user.avatar} size="lg" radius="xl">
                        {getInitials(user.name)}
                      </Avatar>
                      <div>
                        <Text fw={600}>{user.name}</Text>
                        <Text size="sm" c="dimmed">
                          {user.email}
                        </Text>
                      </div>
                    </Group>
                  </Card>
                </Grid.Col>
              ))}
            </Grid>
          ) : (
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Text c="dimmed" ta="center" fs="italic">
                No team members assigned to this project
              </Text>
            </Card>
          )}
        </Tabs.Panel>
      </Tabs>
    </>
  );
};

ProjectShow.layout = (page) => <Layout title="Project Details">{page}</Layout>;

export default ProjectShow;
