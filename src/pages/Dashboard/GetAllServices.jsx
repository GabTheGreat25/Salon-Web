import React from "react";
import {
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Bar,
  Cell,
} from "recharts";
import { groupBy } from "lodash";
import { useGetServicesQuery } from "@api";
import randomColor from "randomcolor";
import { FadeLoader } from "react-spinners";

export default function () {
  const { data, isLoading } = useGetServicesQuery();

  const groupedData = React.useMemo(() => {
    if (!data) return [];
    const grouped = groupBy(data?.details, (value) => value?.product?.product_name);
    const result = Object.keys(grouped)?.map((name, index) => {
      const serviceProducts = grouped[name];
      const ServiceNames = serviceProducts?.map(
        (service) => service?.service_name
      );
      return {
        name,
        services: ServiceNames,
        totalServices: serviceProducts?.filter((product) => product?.status !== 1)
          .length,
        color: randomColor({ luminosity: "bright" }),
      };
    });
    return result;
  }, [data]);

  const maxServices = React.useMemo(() => {
    if (groupedData.length === 0) return 0;
    return Math.max(...groupedData.map((item) => item?.totalServices));
  }, [groupedData]);

  const renderCustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const services = payload[0]?.payload?.services.join(", ");
      return (
        <div>
          <div>{`${payload[0].value} service${
            payload[0].value === 1 ? "" : "s"
          }`}</div>
          <h1>{`Service: ${services}`}</h1>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      {isLoading ? (
        <div className="loader">
          <FadeLoader color="#FDA7DF" loading={true} size={50} />
        </div>
      ) : !data ? null : (
        <>
          {groupedData.length !== 0 && (
            <BarChart
              width={600}
              height={400}
              data={groupedData}
              margin={{
                top: 20,
                right: 30,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, maxServices]} />
              <Tooltip content={renderCustomTooltip} />
              <Bar dataKey="totalServices" fill="#8884d8">
                {groupedData?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          )}
        </>
      )}
    </>
  );
}
