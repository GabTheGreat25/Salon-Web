import React from "react";
import { CustomerNavbar, CustomerFooter } from "@components";
import { Outlet } from "react-router-dom";
import { block } from "million/react";

const WalkInCustomerLayout = () => {
  return (
    <main>
      <span className="z-[1000] sticky top-0 bg-light-default text-dark-default dark:bg-dark-default dark:text-light-default">
        <CustomerNavbar />
      </span>
      <div>
        <Outlet />
      </div>
      <CustomerFooter />
    </main>
  );
};

const WalkInCustomerLayoutBlock = block(WalkInCustomerLayout);

export default WalkInCustomerLayoutBlock;
