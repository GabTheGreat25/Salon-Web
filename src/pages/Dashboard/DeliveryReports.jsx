import React from "react";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useGetDeliveryReportQuery } from "@api";
import randomColor from "randomcolor";

export default function DeliveryReportComposedChart() {
  const { data } = useGetDeliveryReportQuery();

  const chartData = React.useMemo(() => {
    if (!data) return [];
    return data?.details?.map((item) => ({
      name: `${item._id.type} - ${item._id.status}`,
      barValue: item.count || 0,
      lineValue: item.count || 0,
      color: randomColor({ luminosity: "bright" }),
    }));
  }, [data]);

  const COLORS = React.useMemo(() => {
    return chartData.map((entry) => entry.color);
  }, [chartData]);

  const renderCustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { name, value } = payload[0].payload;

      return (
        <div className="text-lg font-bold">
          <div>{`${name}`}</div>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer height={400}>
      <h3 className="text-center text-lg">Delivery Reports</h3>
      <ComposedChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={renderCustomTooltip} />
        <Bar dataKey="barValue" fill="#8884d8" />
        <Line type="monotone" dataKey="lineValue" stroke="#ff7300" />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
