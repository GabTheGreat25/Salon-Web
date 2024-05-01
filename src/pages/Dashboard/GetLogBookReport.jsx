import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useGetLogBookReportQuery } from "@api";

export default function MyBarChart() {
  const { data } = useGetLogBookReportQuery();

  const chartData = React.useMemo(() => {
    if (data?.details) {
      const logBookData = data.details[0]; // Extract the logbook data from the array

      const barChartData = [
        { name: "Returned With Missing", quantity: logBookData.totalReturnedWithMissing || 0 },
        { name: "Returned With Damage", quantity: logBookData.totalReturnedWithDamage || 0 },
        { name: "Returned Damage & Missing", quantity: logBookData.totalReturnedDamageMissing || 0 },
      ];

      return barChartData;
    }
    return [];
  }, [data]);

  return (
    <ResponsiveContainer height={400}>
      <h3 className="text-center text-lg">LogBook Reports</h3>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="quantity" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}
