import React, { useRef, useEffect } from "react";
import {
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Bar,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { useGetAppointmentsQuery } from "@api";
import randomColor from "randomcolor";

export default function () {
  const isFocused = useRef(true);

  const { data, refetch } = useGetAppointmentsQuery();


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

  const groupedData = React.useMemo(() => {
    if (!data) return [];
    const result = data.details.reduce((acc, appointment) => {
      const beauticianName =
        appointment.beautician?.name || "Unknown Beautician";
      const customerName = appointment.customer?.name || "Unknown Customer";

      const existingBeautician = acc.find(
        (entry) => entry.beautician === beauticianName
      );

      if (existingBeautician) {
        const existingCustomer = existingBeautician.customers.find(
          (customer) => customer.name === customerName
        );

        if (!existingCustomer) {
          existingBeautician.customers.push({
            name: customerName,
            totalServices: 1,
          });
          existingBeautician.totalServices += 1;
        } else {
          existingCustomer.totalServices += 1;
        }
      } else {
        acc.push({
          beautician: beauticianName,
          customers: [{ name: customerName, totalServices: 1 }],
          totalServices: 1,
          color: randomColor({ luminosity: "bright" }),
        });
      }
      return acc;
    }, []);

    return result;
  }, [data]);

  const maxServices = React.useMemo(() => {
    if (groupedData?.length === 0) return 0;
    return Math.max(...groupedData.map((item) => item?.totalServices));
  }, [groupedData]);

  const renderCustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const customers = payload[0].payload.customers.map(
        (customer) => `${customer.name}`
      );
      const totalServices = payload[0].payload.customers.reduce(
        (total, customer) => total + customer.totalServices,
        0
      );

      return (
        <div className="text-lg font-bold">
          <div>{`${totalServices} service${
            totalServices === 1 ? " made" : "s made"
          }`}</div>
          <h2>{`Customers: ${customers.join(", ")}`}</h2>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <ResponsiveContainer height={425}>
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
          <XAxis dataKey="beautician" />
          <YAxis domain={[0, maxServices]} />
          <Tooltip content={renderCustomTooltip} />
          <Bar dataKey="totalServices" fill="#8884d8">
            {groupedData?.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}
