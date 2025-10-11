import { Card, Text } from "@mantine/core";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const TrendChart = ({ title, data, series, xAxisKey = "month" }) => {
  const colors = ["#228be6", "#40c057", "#fab005", "#e64980", "#9c36b5"];

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Text size="md" fw={600} mb="md">
        {title}
      </Text>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xAxisKey} />
          <YAxis />
          <Tooltip />
          <Legend />
          {series.map((s, index) => (
            <Line
              key={s.name}
              type="monotone"
              dataKey={s.name}
              stroke={s.color || colors[index % colors.length]}
              name={s.label || s.name}
              strokeWidth={2}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default TrendChart;

