import { React, useEffect, useMemo, useRef } from "react";
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
import { useGetCommentRatingQuery } from "@api";
import randomColor from "randomcolor";

export default function() {
  const { data, refetch } = useGetCommentRatingQuery();
  const comments = data?.details || [];

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

  const chartData = React?.useMemo(() => {
    if (!comments) return [];
    return comments?.map((i) => ({
      name: i?._id || "No Rating",
      value: i?.count || 0,
      color: randomColor({ luminosity: "bright" }),
    }));
  }, [data]);

  const COLORS = React?.useMemo(() => {
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
      <h3 className="text-center text-lg">Comments</h3>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={renderCustomTooltip} />
        <Legend />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}
