import ArchivedFilterButton from "@/components/ArchivedFilterButton";
import EmptyWithIcon from "@/components/EmptyWithIcon";
import SearchInput from "@/components/SearchInput";
import useAuthorization from "@/hooks/useAuthorization";
import Layout from "@/layouts/MainLayout";
import { redirectTo, reloadWithQuery } from "@/utils/route";
import { usePage } from "@inertiajs/react";
import {
  ActionIcon,
  Badge,
  Card,
  Center,
  Grid,
  Group,
  Progress,
  Stack,
  Table,
  Text,
  Title,
} from "@mantine/core";
import {
  IconEdit,
  IconTarget,
  IconTrash,
} from "@tabler/icons-react";

const MilestonesGlobalIndex = () => {
  const { items } = usePage().props;
  const { isAdmin } = useAuthorization();

  const search = (search) => reloadWithQuery({ search });

  const getStatusColor = (status) => {
    const colors = {
      not_started: "gray",
      in_progress: "blue",
      completed: "green",
      delayed: "red",
      cancelled: "dark",
    };
    return colors[status] || "gray";
  };

  const getProgressColor = (progress) => {
    if (progress >= 75) return "green";
    if (progress >= 50) return "yellow";
    if (progress >= 25) return "orange";
    return "red";
  };

  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <>
      <Grid justify="space-between" align="flex-end" gutter="xl" mb="lg">
        <Grid.Col span="auto">
          <Title order={1}>All Milestones</Title>
          <Text c="dimmed" size="sm">
            View and manage milestones across all projects
          </Text>
        </Grid.Col>
      </Grid>

      <Grid justify="space-between" align="center" mb="xl">
        <Grid.Col span="content">
          <Group>
            <SearchInput placeholder="Search milestones" search={search} />
            {isAdmin() && <ArchivedFilterButton />}
          </Group>
        </Grid.Col>
      </Grid>

      {items.length ? (
        <Card shadow="sm" padding="0" radius="md" withBorder>
          <Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Project</Table.Th>
                <Table.Th>Milestone</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Progress</Table.Th>
                <Table.Th>Start Date</Table.Th>
                <Table.Th>End Date</Table.Th>
                <Table.Th>Budget</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {items.map((item) => (
                <Table.Tr key={item.id}>
                  <Table.Td>
                    <Text size="sm" fw={500} c="blue">
                      {item.project?.name || "N/A"}
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <Stack gap="xs">
                      <Text size="sm" fw={500}>
                        {item.name}
                      </Text>
                      {item.description && (
                        <Text size="xs" c="dimmed" lineClamp={1}>
                          {item.description}
                        </Text>
                      )}
                    </Stack>
                  </Table.Td>
                  <Table.Td>
                    <Badge
                      color={getStatusColor(item.status)}
                      variant="light"
                      size="sm"
                    >
                      {item.status.replace(/_/g, " ").toUpperCase()}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    <div style={{ width: 120 }}>
                      <Progress
                        value={item.progress}
                        color={getProgressColor(item.progress)}
                        size="md"
                        radius="xl"
                      />
                      <Text size="xs" c="dimmed" mt={4}>
                        {item.progress}%
                      </Text>
                    </div>
                  </Table.Td>
                  <Table.Td>
                    <Text size="sm">{formatDate(item.start_date)}</Text>
                  </Table.Td>
                  <Table.Td>
                    <Text size="sm">{formatDate(item.end_date)}</Text>
                  </Table.Td>
                  <Table.Td>
                    <Text size="sm">
                      {item.budget_allocated > 0
                        ? formatCurrency(item.budget_allocated)
                        : "N/A"}
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <Group gap="xs">
                      {can("edit project") && (
                        <ActionIcon
                          variant="light"
                          color="blue"
                          onClick={() =>
                            redirectTo("projects.milestones.edit", {
                              project: item.project_id,
                              milestone: item.id,
                            })
                          }
                        >
                          <IconEdit size={16} />
                        </ActionIcon>
                      )}
                      {can("archive project") && (
                        <ActionIcon
                          variant="light"
                          color="red"
                          onClick={() =>
                            router.delete(
                              route("projects.milestones.destroy", {
                                project: item.project_id,
                                milestone: item.id,
                              })
                            )
                          }
                        >
                          <IconTrash size={16} />
                        </ActionIcon>
                      )}
                    </Group>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Card>
      ) : (
        <Center mih={400}>
          <EmptyWithIcon
            title="No milestones found"
            subtitle="Milestones will appear here once created"
            icon={IconTarget}
          />
        </Center>
      )}
    </>
  );
};

MilestonesGlobalIndex.layout = (page) => (
  <Layout title="All Milestones">{page}</Layout>
);

export default MilestonesGlobalIndex;

