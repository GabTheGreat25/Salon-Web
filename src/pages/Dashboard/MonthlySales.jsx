import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useGetTransactionsQuery } from "@api";
import { FadeLoader } from "react-spinners";
import { MONTHS } from "@/constants";

export default function () {
  const { data, isLoading } = useGetTransactionsQuery();

  const groupedData = data?.details
    ? data?.details?.reduce((acc, transaction) => {
        if (
          transaction.status !== "pending" &&
          transaction.status !== "completed" &&
          transaction.product
        ) {
          const month = new Date(transaction?.date).getMonth();

          const totalCost = transaction.product.reduce(
            (sum, product) => sum + product?.price,
            0
          );

          acc[month] = (acc[month] || 0) + totalCost;
        }
        return acc;
      }, {})
    : {};

  const chartData = MONTHS?.map((monthName, index) => ({
    month: monthName,
    sales: groupedData[index] || 0,
  }));

  return (
    <>
      {isLoading ? (
        <div className="loader">
          <FadeLoader color="#FDA7DF" loading={true} size={50} />
        </div>
      ) : !data ? null : (
        <>
          {groupedData.length !== 0 && (
            <AreaChart data={chartData} width={1200} height={400}>
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
          )}
        </>
      )}
    </>
  );
}