import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useGetCustomerAppointmentQuery } from "@api";
import randomColor from "randomcolor";

export default function MyPieChart() {
  const { data } = useGetCustomerAppointmentQuery();
  const chartData = React.useMemo(() => {
    if (data?.details) {
      const serviceCounts = data?.details.reduce((acc, item) => {
        const key = item._id;
        if (!acc[key]) {
          acc[key] = {
            name: item._id,
            quantity: item.count,
          };
        } else {
          acc[key].quantity += item.count;
        }

        return acc;
      }, {});

      const combinedData = Object.values(serviceCounts);

      return combinedData;
    }
    return [];
  }, [data]);

  const COLORS = React.useMemo(() => {
    return randomColor({ count: chartData?.length, luminosity: "bright" });
  }, [chartData]);

  return (
    <ResponsiveContainer height={400}>
      <h3 className="text-center text-lg">Appointment Customers</h3>
      <PieChart>
        <Pie
          data={chartData}
          dataKey="quantity"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={150}
          fill="#8884d8"
          label
        >
          {chartData?.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS?.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend
          align="center"
          verticalAlign="bottom"
          layout="horizontal"
          formatter={(value, entry) =>
            `${entry.payload.name} (${entry.payload.quantity})`
          }
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
