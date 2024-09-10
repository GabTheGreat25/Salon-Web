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
import { useGetLogBookReportQuery } from "@api";
import randomColor from "randomcolor";


export default function() {
  const isFocused = useRef(true);

  const { data, refetch } = useGetLogBookReportQuery();
  const logbook = data?.details || [];

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
    if (logbook) {
      const logBookData = logbook[0];
      const barChartData = [
        {
          name: "Borrowed Equipment",
          quantity: logBookData?.totalBorrowed || 0,
        },
        {
          name: "Returned",
          quantity: logBookData?.totalReturned || 0,
        },
        {
          name: "Returned With Missing",
          quantity: logBookData?.totalReturnedWithMissing || 0,
        },
        {
          name: "Returned With Damage",
          quantity: logBookData?.totalReturnedWithDamage || 0,
        },
        {
          name: "Returned Damage & Missing",
          quantity: logBookData?.totalReturnedDamageMissing || 0,
        },
      ];

      return barChartData;
    }
    return [];
  }, [data]);

  return (
    <ResponsiveContainer height={400}>
      <h3 className="text-lg text-center">Equipment LogBook Reports</h3>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="quantity" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}
