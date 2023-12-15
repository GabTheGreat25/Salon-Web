import React from "react";
import { BeauticianNavbar, Footer } from "@components";
import { Outlet } from "react-router-dom";
import { block } from "million/react";

const BeauticianLayout = () => {
  return (
    <main>
      <span className="z-[1000] sticky top-0 bg-light-default text-dark-default dark:bg-dark-default dark:text-light-default">
        <BeauticianNavbar />
      </span>
      <div>
        <Outlet />
      </div>
      <Footer />
    </main>
  );
};

const BeauticianLayoutBlock = block(BeauticianLayout);

export default BeauticianLayoutBlock;
