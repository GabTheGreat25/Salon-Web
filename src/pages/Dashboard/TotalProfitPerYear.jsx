import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useGetTransactionsQuery } from "@api";

export default function () {
  const { data } = useGetTransactionsQuery();

  const transactionsWithTotalSales =
    data?.details
      ?.map((transaction) => {
        if (transaction.status === "completed" && transaction?.appointment) {
          const totalSales = Array.isArray(transaction?.appointment)
            ? transaction?.appointment.reduce(
                (acc, appointment) => acc + (appointment?.price || 0),
                0
              )
            : transaction.appointment.price || 0;

          return { ...transaction, totalSales };
        }
        return null;
      })
      .filter(Boolean) || [];

  const groupedData = transactionsWithTotalSales?.reduce((acc, transaction) => {
    const year = new Date(transaction?.appointment?.date).getFullYear();
    const sales = transaction.totalSales || 0;

    acc[year] = (acc[year] || 0) + sales;
    return acc;
  }, {});

  const chartData = Object.entries(groupedData)?.map(([year, sales]) => ({
    year,
    sales,
  }));

  return (
    <>
      <ResponsiveContainer height={425}>
        <LineChart
          width={600}
          height={400}
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 30,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip
            formatter={(value, name) => [value + " PHP", "Total Sales"]}
          />
          <Line
            type="monotone"
            dataKey="sales"
            stroke="#8884d8"
            strokeWidth={2}
            dot={{ strokeWidth: 0 }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}
