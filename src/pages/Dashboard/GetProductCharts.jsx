import React, { useEffect, useMemo, useRef } from "react";
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
import { useGetProductTypeQuery } from "@api";
import randomColor from "randomcolor";

export default function ProductBarChart() {
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
      color: randomColor({ luminosity: "bright" }),
    }));
  }, [data]);

  const COLORS = useMemo(() => {
    return chartData?.map((entry) => entry.color);
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
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={renderCustomTooltip} />
        <Legend />
        <Bar dataKey="value" fill={COLORS} />
      </BarChart>
    </ResponsiveContainer>
  );
}
