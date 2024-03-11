import React from "react";
import { ReceptionistNavbar, ReceptionistFooter } from "@components";
import { Outlet } from "react-router-dom";
import { block } from "million/react";

const ReceptionistLayout = () => {
  return (
    <>
      <main>
        <span className="z-[1000] sticky top-0 bg-light-default text-dark-default dark:bg-dark-default dark:text-light-default">
          <ReceptionistNavbar />
        </span>
        <div>
          <Outlet />
        </div>
        <ReceptionistFooter />
      </main>
    </>
  );
};

const ReceptionistLayoutBlock = block(ReceptionistLayout);

export default ReceptionistLayoutBlock;
