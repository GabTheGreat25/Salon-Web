import React from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { useGetAppointmentReportQuery } from "@api";
import randomColor from "randomcolor";

export default function() {
  const { data } = useGetAppointmentReportQuery();

  const chartData = React.useMemo(() => {
    if (!data) return [];
    return [
      {
        name: data?.details[0]?._id || "Unknown",
        value: data?.details[0]?.count || 0,
        color: randomColor({ luminosity: "bright" }),
      },
    ];
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
        <h3 className="text-center lg">Appointment Reports</h3>
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
