import React, { useEffect, useMemo, useRef } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useGetServiceTypeQuery } from "@api";
import randomColor from "randomcolor";

export default function() {
  const { data, refetch } = useGetServiceTypeQuery();
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
    if (data?.details) {
      const serviceCounts = data?.details?.reduce((acc, item) => {
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


  const renderCustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { name, quantity } = payload[0]?.payload ?? {};

      return (
        <div className="text-lg font-bold">
          <div>{`${quantity ?? ''} ${name ?? ''}`}</div>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer height={400}>
      <h3 className="text-center text-lg">Appointment Service Types</h3>
      <RadarChart data={chartData}>
        <PolarGrid />
        <PolarAngleAxis dataKey="name" />
        <PolarRadiusAxis />
        <Tooltip content={renderCustomTooltip} />
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
