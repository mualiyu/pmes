import { Card, Group, Progress, Stack, Text } from "@mantine/core";

const BudgetOverview = ({ budgetStats }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Text size="md" fw={600} mb="md">
        Budget Overview
      </Text>
      <Stack gap="md">
        <div>
          <Group justify="space-between" mb="xs">
            <Text size="sm" c="dimmed">
              Total Budget
            </Text>
            <Text size="sm" fw={600}>
              {formatCurrency(budgetStats.total_budget)}
            </Text>
          </Group>
          <Group justify="space-between" mb="xs">
            <Text size="sm" c="dimmed">
              Allocated
            </Text>
            <Text size="sm" fw={600} c="blue">
              {formatCurrency(budgetStats.total_allocated)}
            </Text>
          </Group>
          <Group justify="space-between" mb="xs">
            <Text size="sm" c="dimmed">
              Spent
            </Text>
            <Text size="sm" fw={600} c="red">
              {formatCurrency(budgetStats.total_spent)}
            </Text>
          </Group>
          <Group justify="space-between" mb="md">
            <Text size="sm" c="dimmed">
              Remaining
            </Text>
            <Text size="sm" fw={600} c="green">
              {formatCurrency(budgetStats.total_remaining)}
            </Text>
          </Group>
        </div>

        <div>
          <Text size="sm" c="dimmed" mb="xs">
            Utilization Rate
          </Text>
          <Progress
            value={budgetStats.utilization_rate}
            color={
              budgetStats.utilization_rate >= 90
                ? "red"
                : budgetStats.utilization_rate >= 70
                ? "yellow"
                : "green"
            }
            size="xl"
            radius="xl"
          />
          <Text size="xs" c="dimmed" mt={4}>
            {budgetStats.utilization_rate}% of total budget spent
          </Text>
        </div>
      </Stack>
    </Card>
  );
};

export default BudgetOverview;

