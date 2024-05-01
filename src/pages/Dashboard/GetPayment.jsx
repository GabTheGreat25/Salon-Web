import React from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { useGetTransactionPaymentQuery } from "@api";
import randomColor from "randomcolor";

export default function PaymentPieChart() {
  const { data } = useGetTransactionPaymentQuery();

  const chartData = React.useMemo(() => {
    if (!data) return [];
    return data.details.map((item) => ({
      name: item._id || "Unknown",
      value: item.count || 0,
      color: randomColor({ luminosity: "bright" }),
    }));
  }, [data]);

  const COLORS = React.useMemo(() => {
    return chartData.map((entry) => entry.color);
  }, [chartData]);

  const renderCustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const { name, value } = payload[0].payload;

      return (
        <div className="text-lg font-bold">
          <div>{`${value} ${name}`}</div>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer height={400}>
      <h3 className="text-center text-lg">Payment Methods</h3>
      <PieChart>
        <Tooltip content={renderCustomTooltip} />
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={150}
          fill="#8884d8"
          label
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
