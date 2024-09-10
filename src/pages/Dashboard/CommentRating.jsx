import React, { useEffect, useMemo, useRef } from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useGetCommentRating } from "@api";
import randomColor from "randomcolor";

export default function() {
  const { data, refetch } = useGetCommentRating();
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
    if (!data) return [];
    return data?.details?.map((i) => ({
      name: i?._id || "No Rating",
      value: i?.count || 0,
      color: randomColor({ luminosity: "bright" }),
    }));
  }, [data]);

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
      <h3 className="text-center text-lg">Comments</h3>
      <PieChart>
        <Tooltip content={renderCustomTooltip} />
        <Legend />
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={150}
          fill="#8884d8"
          label
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
