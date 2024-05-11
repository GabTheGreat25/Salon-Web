import React, { useEffect, useMemo, useRef } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useGetProductTypeQuery } from "@api";
import randomColor from "randomcolor";

export default function ProductPieChart() {
  const isFocused = useRef(true);
  const { data, refetch } = useGetProductTypeQuery();

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
    if (!data) return [];
    return data?.details?.map((item) => ({
      name: item._id || "Unknown",
      value: item.count || 0,
    }));
  }, [data]);

  const COLORS = useMemo(() => {
    return chartData?.map(() => randomColor({ luminosity: "bright" }));
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
      <h3 className="text-center text-lg">Products Body Type Reports</h3>
      <PieChart>
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
          {chartData?.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={renderCustomTooltip} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
