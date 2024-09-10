import React, { useMemo, useRef } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { useGetAppointmentReportQuery } from "@api";
import randomColor from "randomcolor";

export default function() {
  const isFocused = useRef(true);
  const { data, refetch } = useGetAppointmentReportQuery();
  const reports = data?.details || [];

  const chartData = useMemo(() => {
    if (!reports || reports?.length === 0) return [];
    return reports[0]?.statuses?.map((s) => ({
      name: s?.status,
      value: s?.count,
      color: randomColor({ luminosity: "bright" }),
    })) || [];
  }, [reports]);

  const renderCustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { name, value } = payload[0]?.payload;

      return (
        <div className="text-lg font-bold">
          <div>{`${name}: ${value}`}</div>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={renderCustomTooltip} />
        <Bar dataKey="value">
          {chartData?.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}