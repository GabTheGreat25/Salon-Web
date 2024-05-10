import React, { useEffect, useMemo, useRef } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useGetDeliveryReportQuery } from "@api";
import randomColor from "randomcolor";

export default function() {
  const { data, refetch } = useGetDeliveryReportQuery();
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
    return data?.details?.map((item) => ({
      name: `${item._id.type} - ${item._id.status}`,
      value: item.count || 0,
      color: randomColor({ luminosity: "bright" }),
    }));
  }, [data]);

  const COLORS = useMemo(() => {
    return chartData?.map((entry) => entry.color);
  }, [chartData]);

  const renderCustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { name, value } = payload[0].payload;

      return (
        <div className="text-lg font-bold">
          <div>{`${name}: ${value}`}</div>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer height={400}>
      <h3 className="text-center text-lg">Delivery Reports</h3>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={renderCustomTooltip} />
        <Legend />
        {chartData?.map((entry, index) => (
          <Line
            key={`line-${index}`}
            type="monotone"
            dataKey="value"
            name={entry.name}
            stroke={entry.color}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
