import React, { useRef, useEffect } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useGetTransactionsQuery } from "@api";
import { MONTHS } from "@/constants";

export default function () {
  const isFocused = useRef(true);

  const { data, refetch } = useGetTransactionsQuery();

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

  const groupedData = data?.details
    ? data?.details
        .filter(
          (transaction) =>
            transaction.status === "completed" && transaction.appointment
        )
        .reduce((acc, transaction) => {
          const appointment = transaction?.appointment;

          const month = new Date(appointment?.date).getMonth();

          const totalCost = appointment?.price || 0;

          acc[month] = (acc[month] || 0) + totalCost;
          return acc;
        }, {})
    : {};

  const chartData = MONTHS?.map((monthName, index) => ({
    month: monthName,
    sales: groupedData[index] || 0,
  }));

  return (
    <>
      <AreaChart data={chartData} width={1800} height={400}>
        <defs>
          <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#33B2DF" stopOpacity={1} />
            <stop offset="95%" stopColor="#33B2DF" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="month" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="sales"
          stroke="#33B2DF"
          fillOpacity={1}
          fill="url(#colorSales)"
        />
      </AreaChart>
    </>
  );
}
