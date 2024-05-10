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

export default function MyAreaChart() {
  const { data, refetch } = useGetCustomerAppointmentQuery();
  const isFocused = useRef(true);

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
    if (data?.details) {
      const serviceCounts = data?.details?.reduce((acc, item) => {
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

  const COLORS = useMemo(() => {
    return randomColor({ count: chartData?.length, luminosity: "bright" });
  }, [chartData]);

  return (
    <ResponsiveContainer height={400}>
      <h3 className="text-center text-lg">Appointment Customers</h3>
      <AreaChart data={chartData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend
          align="center"
          verticalAlign="bottom"
          layout="horizontal"
          formatter={(value, entry) =>
            `${entry?.payload?.name}`
          }
        />
        {chartData?.map((entry, index) => (
          <Area
            key={`area-${index}`}
            type="monotone"
            dataKey="quantity"
            name={entry.name}
            stroke={COLORS[index % COLORS?.length]}
            fill={COLORS[index % COLORS?.length]}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
}
