import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useGetProductsQuery } from "@api";
import { FadeLoader } from "react-spinners";
import randomColor from "randomcolor";

export default function () {
  const { data, isLoading } = useGetProductsQuery();

  const chartData = React.useMemo(() => {
    if (data?.details) {
      const productCounts = data?.details.reduce((acc, product) => {
        const { type } = product;
        const key = `${type}`;

        if (!acc[key]) {
          acc[key] = {
            name: `${type}`,
            quantity: 1,
          };
        } else {
          acc[key].quantity += 1;
        }

        return acc;
      }, {});

      const combinedData = Object.values(productCounts);

      return combinedData;
    }
    return [];
  }, [data]);

  const COLORS = React.useMemo(() => {
    return randomColor({ count: chartData.length, luminosity: "bright" });
  }, [chartData]);

  return (
    <>
      {isLoading ? (
        <div className="loader">
          <FadeLoader color="#4F6C42" loading={true} size={50} />
        </div>
      ) : !data ? null : (
        chartData.length !== 0 && (
          <PieChart width={550} height={400}>
            <Pie
              data={chartData}
              dataKey="quantity"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={150}
              fill="#8884d8"
              label
            >
              {chartData?.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        )
      )}
    </>
  );
}