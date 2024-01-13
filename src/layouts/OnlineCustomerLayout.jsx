import React from "react";
import { CustomerNavbar, OnlineCustomerFooter } from "@components";
import { Outlet } from "react-router-dom";
import { block } from "million/react";

const OnlineCustomerLayout = () => {
  return (
    <main>
      <span className="z-[1000] sticky top-0 bg-light-default text-dark-default dark:bg-dark-default dark:text-light-default">
        <CustomerNavbar />
      </span>
      <div>
        <Outlet />
      </div>
      <OnlineCustomerFooter />
    </main>
  );
};

const OnlineCustomerLayoutBlock = block(OnlineCustomerLayout);

export default OnlineCustomerLayoutBlock;
