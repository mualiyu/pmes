import { Card, Group, Progress, Stack, Text } from "@mantine/core";

const MetricCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  color = "blue",
  progress = null,
  progressLabel = null
}) => {
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
        <Text size="xs" c="dimmed" mb="sm">
          {subtitle}
        </Text>
      )}
      {progress !== null && (
        <Stack gap="xs">
          <Progress value={progress} color={color} size="sm" radius="xl" />
          {progressLabel && (
            <Text size="xs" c="dimmed">
              {progressLabel}
            </Text>
          )}
        </Stack>
      )}
    </Card>
  );
};

export default MetricCard;

