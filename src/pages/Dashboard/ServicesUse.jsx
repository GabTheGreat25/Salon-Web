import React, { useRef, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useGetAppointmentsQuery } from "@api";
import randomColor from "randomcolor";

export default function () {
  const isFocused = useRef(true);

  const { data, refetch } = useGetAppointmentsQuery();

  useEffect(() => {
    const handleFocus = () => {
      isFocused.current = true;
      refetch();
    };

    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, [refetch]);

  const chartData = React.useMemo(() => {
    if (data?.details) {
      const serviceCounts = data?.details.reduce((acc, appointment) => {
        appointment.service.forEach((service) => {
          const { service_name } = service;
          const key = service_name;

          if (!acc[key]) {
            acc[key] = {
              name: service_name,
              quantity: 1,
            };
          } else {
            acc[key].quantity += 1;
          }
        });

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
    <>
      <ResponsiveContainer height={400}>
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
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS?.length]}
              />
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
    </>
  );
}
