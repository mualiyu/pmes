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
  IconCurrencyDollar,
  IconEdit,
  IconTrash,
} from "@tabler/icons-react";

const BudgetsGlobalIndex = () => {
  const { items } = usePage().props;
  const { isAdmin } = useAuthorization();

  const search = (search) => reloadWithQuery({ search });

  const getStatusColor = (status) => {
    const colors = {
      draft: "gray",
      approved: "blue",
      active: "green",
      exceeded: "red",
      closed: "dark",
    };
    return colors[status] || "gray";
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

  const getUtilizationColor = (utilization) => {
    if (utilization >= 90) return "red";
    if (utilization >= 70) return "yellow";
    return "green";
  };

  return (
    <>
      <Grid justify="space-between" align="flex-end" gutter="xl" mb="lg">
        <Grid.Col span="auto">
          <Title order={1}>All Budgets</Title>
          <Text c="dimmed" size="sm">
            View and manage budgets across all projects
          </Text>
        </Grid.Col>
      </Grid>

      <Grid justify="space-between" align="center" mb="xl">
        <Grid.Col span="content">
          <Group>
            <SearchInput placeholder="Search budgets" search={search} />
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
                <Table.Th>Budget</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Total</Table.Th>
                <Table.Th>Spent</Table.Th>
                <Table.Th>Remaining</Table.Th>
                <Table.Th>Utilization</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {items.map((item) => {
                const utilization =
                  item.total_amount > 0
                    ? (item.spent_amount / item.total_amount) * 100
                    : 0;

                return (
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
                        {item.status.toUpperCase()}
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      <Text size="sm" fw={500}>
                        {formatCurrency(item.total_amount)}
                      </Text>
                    </Table.Td>
                    <Table.Td>
                      <Text size="sm" c="red">
                        {formatCurrency(item.spent_amount)}
                      </Text>
                    </Table.Td>
                    <Table.Td>
                      <Text size="sm" c="green">
                        {formatCurrency(item.remaining_amount)}
                      </Text>
                    </Table.Td>
                    <Table.Td>
                      <div style={{ width: 120 }}>
                        <Progress
                          value={utilization}
                          color={getUtilizationColor(utilization)}
                          size="md"
                          radius="xl"
                        />
                        <Text size="xs" c="dimmed" mt={4}>
                          {utilization.toFixed(1)}%
                        </Text>
                      </div>
                    </Table.Td>
                    <Table.Td>
                      <Group gap="xs">
                        {can("edit project") && (
                          <ActionIcon
                            variant="light"
                            color="blue"
                            onClick={() =>
                              redirectTo("projects.budgets.edit", {
                                project: item.project_id,
                                budget: item.id,
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
                                route("projects.budgets.destroy", {
                                  project: item.project_id,
                                  budget: item.id,
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
                );
              })}
            </Table.Tbody>
          </Table>
        </Card>
      ) : (
        <Center mih={400}>
          <EmptyWithIcon
            title="No budgets found"
            subtitle="Budgets will appear here once created"
            icon={IconCurrencyDollar}
          />
        </Center>
      )}
    </>
  );
};

BudgetsGlobalIndex.layout = (page) => (
  <Layout title="All Budgets">{page}</Layout>
);

export default BudgetsGlobalIndex;

