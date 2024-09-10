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
import { useGetDeliveryReportQuery } from "@api";
import randomColor from "randomcolor";

export default function DeliveryReport() {
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
    
    const typeCount = data?.details?.reduce((acc, item) => {
      if (item?.status === "completed") {
        acc[item?.type] = (acc[item?.type] || 0) + item?.count;
      }
      return acc;
    }, {});

    return Object.keys(typeCount).map((type) => ({
      type,
      count: typeCount[type],
      color: randomColor({ luminosity: "bright" }),
    }));
  }, [data]);

  const COLORS = useMemo(() => {
    return chartData?.map((entry) => entry.color);
  }, [chartData]);

  const renderCustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const { type, count } = payload[0]?.payload;

      return (
        <div className="text-lg font-bold">
          <div>{`${type}: ${count}`}</div>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer height={400}>
      <h3 className="text-center text-lg">Delivery Reports by Type</h3>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="type" />
        <YAxis />
        <Tooltip content={renderCustomTooltip} />
        <Legend />
        <Bar dataKey="count" fill="#8884d8">
          {chartData?.map((entry, index) => (
            <cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}