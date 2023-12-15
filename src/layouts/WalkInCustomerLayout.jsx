import React from "react";
import { WalkInCustomerNavbar, Footer } from "@components";
import { Outlet } from "react-router-dom";
import { block } from "million/react";

const WalkInCustomerLayout = () => {
  return (
    <main>
      <span className="z-[1000] sticky top-0 bg-light-default text-dark-default dark:bg-dark-default dark:text-light-default">
        <WalkInCustomerNavbar />
      </span>
      <div>
        <Outlet />
      </div>
      <Footer />
    </main>
  );
};

const WalkInCustomerLayoutBlock = block(WalkInCustomerLayout);

export default WalkInCustomerLayoutBlock;
