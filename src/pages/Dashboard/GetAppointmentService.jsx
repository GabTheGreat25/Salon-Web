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

export default function () {
  const { data, refetch } = useGetServiceTypeQuery();
  const isFocused = useRef(true);

  const service = data?.details || [];

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
    if (service) {
      return service?.map((i) => ({
        name: i?._id[0], 
        appointmentCount: i?.appointmentCount,
        color: randomColor({ luminosity: "bright" }),
      }));
    }
    return [];
  }, [data]);

  const renderCustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { name, appointmentCount } = payload[0]?.payload ?? {};

      return (
        <div className="text-lg font-bold">
          <div>{`${appointmentCount} Appointments for ${name}`}</div>
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
            name={entry?.name}
            dataKey="appointmentCount"
            stroke={entry?.color}
            fill={entry?.color}
            fillOpacity={0.6}
          />
        ))}
      </RadarChart>
    </ResponsiveContainer>
  );
}
