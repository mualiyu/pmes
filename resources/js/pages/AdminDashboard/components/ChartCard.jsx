import { Card, Text } from "@mantine/core";

const ChartCard = ({ title, children, height = 300 }) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Text size="lg" fw={600} mb="md">
        {title}
      </Text>
      <div style={{ height: `${height}px`, width: "100%" }}>{children}</div>
    </Card>
  );
};

export default ChartCard;

