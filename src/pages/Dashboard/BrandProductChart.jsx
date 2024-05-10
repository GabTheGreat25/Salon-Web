import { React, useEffect, useMemo, useRef } from "react";
import {
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Bar,
  ResponsiveContainer,
} from "recharts";
import { useGetBrandProductQuery } from "@api";
import randomColor from "randomcolor";

export default function() {
  const { data, refetch } = useGetBrandProductQuery();

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
    if (!data) return [];
    return data?.details?.map((item) => ({
      brandName: item.brandName || "Unknown",
      productCount: item.productCount || 0,
      color: randomColor({ luminosity: "bright" }),
    }));
  }, [data]);

  const renderCustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const { brandName, productCount } = payload[0].payload;

      return (
        <div className="text-lg font-bold">
          <div>{`${productCount} products by ${brandName}`}</div>
        </div>
      );
    }
    return null;
  };


  return (
    <ResponsiveContainer height={400}>
      <h3 className="text-center lg">Brand Product Reports</h3>
      <BarChart
        width={600}
        height={400}
        data={chartData}
        margin={{ top: 20, right: 30 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="brandName" />
        <YAxis />
        <Tooltip content={renderCustomTooltip} />
        <Bar dataKey="productCount" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}
