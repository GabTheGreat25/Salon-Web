import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { useGetServiceTypeQuery } from "@api";
import randomColor from "randomcolor";

export default function MyRadarChart() {
  const { data } = useGetServiceTypeQuery();

  const chartData = React.useMemo(() => {
    if (data?.details) {
      const serviceCounts = data?.details.reduce((acc, item) => {
        item._id.forEach((serviceName) => {
          const key = serviceName;

          if (!acc[key]) {
            acc[key] = {
              name: serviceName,
              quantity: item.count,
              color: randomColor({ luminosity: "bright" }),
            };
          } else {
            acc[key].quantity += item.count;
          }
        });

        return acc;
      }, {});

      const combinedData = Object.values(serviceCounts);

      return combinedData;
    }
    return [];
  }, [data]);

  return (
    <ResponsiveContainer height={400}>
      <h3 className="text-center text-lg">Appointment Service Types</h3>
      <RadarChart data={chartData}>
        <PolarGrid />
        <PolarAngleAxis dataKey="name" />
        <PolarRadiusAxis />
        {chartData?.map((entry, index) => (
          <Radar
            key={`radar-${index}`}
            name={entry.name}
            dataKey="quantity"
            stroke={entry.color}
            fill={entry.color}
            fillOpacity={0.6}
          />
        ))}
      </RadarChart>
    </ResponsiveContainer>
  );
}
