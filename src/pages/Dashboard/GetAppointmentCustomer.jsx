import React, { useEffect, useMemo, useRef } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useGetCustomerAppointmentQuery } from "@api";
import randomColor from "randomcolor";

export default function () {
  const { data, refetch } = useGetCustomerAppointmentQuery();
  const isFocused = useRef(true);
  const customers = data?.details || [];

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
  const chartData = useMemo(() => {
    if (customers) {
      return customers?.map((i) => ({
        description: i?.description,
        count: i?.count,
      }));
    }
    return [];
  }, [data]);

  const COLORS = useMemo(() => {
    return randomColor({ count: chartData?.length, luminosity: "bright" });
  }, [chartData]);

  return (
    <ResponsiveContainer height={400}>
      <h3 className="text-center text-lg">Appointment Customers</h3>
      <AreaChart data={chartData}>
        <XAxis dataKey="description" />
        <YAxis />
        <Tooltip />
        <Legend
          align="center"
          verticalAlign="bottom"
          layout="horizontal"
          formatter={(value, entry) => `${entry?.payload?.description}`}
        />
        {chartData?.map((entry, index) => (
          <Area
            key={`area-${index}`}
            type="monotone"
            dataKey="count"
            name={entry?.description}
            stroke={COLORS[index % COLORS?.length]}
            fill={COLORS[index % COLORS?.length]}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
}
