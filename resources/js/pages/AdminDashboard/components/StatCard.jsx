import { Card, Group, Stack, Text } from "@mantine/core";

const StatCard = ({ title, value, subtitle, icon: Icon, color = "blue" }) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Group justify="space-between" mb="md">
        <Text size="sm" c="dimmed" fw={500}>
          {title}
        </Text>
        {Icon && <Icon size={24} color={color} />}
      </Group>
      <Text size="32px" fw={700} mb="xs">
        {value}
      </Text>
      {subtitle && (
        <Text size="xs" c="dimmed">
          {subtitle}
        </Text>
      )}
    </Card>
  );
};

export default StatCard;

