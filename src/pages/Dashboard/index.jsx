import React from "react";
import GetAllUsers from "./GetAllUsers";
import ServicesUse from "./ServicesUse";
import MonthlySales from "./MonthlySales";
import GetBeauticianCustomers from "./GetBeauticianCustomers";
import TotalProfitPerYear from "./TotalProfitPerYear";

export default function () {
  return (
    <div className="grid justify-center items-center h-full w-full dark:bg-dark-default p-10 ">
      <div className="flex flex-nowrap overflow-auto scrollbar-hide">
        <GetAllUsers />
      </div>
      <div className="overflow-auto scrollbar-hide">
        <MonthlySales />
      </div>
      <div className="flex overflow-auto scrollbar-hide">
        <ServicesUse />
        <GetBeauticianCustomers />
        <TotalProfitPerYear />
      </div>
    </div>
  );
}
