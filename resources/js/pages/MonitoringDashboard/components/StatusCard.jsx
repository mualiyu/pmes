import { Badge, Card, Group, Stack, Text } from "@mantine/core";

const StatusCard = ({ title, stats, color = "blue" }) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Text size="md" fw={600} mb="md">
        {title}
      </Text>
      <Stack gap="sm">
        {Object.entries(stats).map(([key, value]) => (
          <Group key={key} justify="space-between">
            <Text size="sm" c="dimmed" tt="capitalize">
              {key.replace(/_/g, " ")}
            </Text>
            <Badge color={color} variant="light" size="lg">
              {value}
            </Badge>
          </Group>
        ))}
      </Stack>
    </Card>
  );
};

export default StatusCard;

