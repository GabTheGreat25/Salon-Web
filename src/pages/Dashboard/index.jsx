import React from "react";
import GetAllUsers from "./GetAllUsers";
import ServicesUse from "./ServicesUse";
import MonthlySales from "./MonthlySales";
import GetBeauticianCustomers from "./GetBeauticianCustomers";
import TotalProfitPerYear from "./TotalProfitPerYear";

export default function () {
  return (
    <>
      <section className="grid items-center justify-center w-full h-full p-10 dark:bg-dark-default ">
        <div className="flex overflow-auto flex-nowrap scrollbar-hide">
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
      </section>
    </>
  );
}
