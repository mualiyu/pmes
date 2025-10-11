import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const AreaChartComponent = ({ data, dataKeys = [], xAxisKey = "date" }) => {
  const colors = [
    "#228be6",
    "#40c057",
    "#fab005",
    "#fd7e14",
    "#e64980",
    "#be4bdb",
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <defs>
          {dataKeys.map((key, index) => (
            <linearGradient
              key={key.dataKey}
              id={`color${key.dataKey}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="5%"
                stopColor={colors[index % colors.length]}
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor={colors[index % colors.length]}
                stopOpacity={0}
              />
            </linearGradient>
          ))}
        </defs>
        <XAxis dataKey={xAxisKey} />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        {dataKeys.map((key, index) => (
          <Area
            key={key.dataKey}
            type="monotone"
            dataKey={key.dataKey}
            name={key.name || key.dataKey}
            stroke={colors[index % colors.length]}
            fillOpacity={1}
            fill={`url(#color${key.dataKey})`}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaChartComponent;

