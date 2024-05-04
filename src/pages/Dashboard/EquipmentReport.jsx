import React from "react";
import {
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Bar,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { useGetEquipmentReportQuery } from "@api";
import randomColor from "randomcolor";

export default function EquipmentReportChart() {
  const { data } = useGetEquipmentReportQuery();

  const chartData = React.useMemo(() => {
    if (!data) return [];
    return [
      {
        name: "Missing",
        value: data?.details[0]?.totalMissing || 0,
        color: randomColor({ luminosity: "bright" }),
      },
      {
        name: "Damage",
        value: data?.details[0]?.totalDamage || 0,
        color: randomColor({ luminosity: "bright" }),
      },
      {
        name: "Borrowed",
        value: data?.details[0]?.totalBorrowed || 0,
        color: randomColor({ luminosity: "bright" }),
      },
    ];
  }, [data]);

  const maxCount = React.useMemo(() => {
    if (chartData?.length === 0) return 0;
    return Math.max(...chartData.map((item) => item?.value));
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
    <ResponsiveContainer height={425}>
        <h3 className="text-center lg">Equipment Reports</h3>
      <BarChart
        width={600}
        height={400}
        data={chartData}
        margin={{ top: 20, right: 30 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis domain={[0, maxCount]} />
        <Tooltip content={renderCustomTooltip} />
        <Bar dataKey="value" fill="#8884d8">
          {chartData?.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
