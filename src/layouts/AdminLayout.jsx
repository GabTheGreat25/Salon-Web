import React from "react";
import { AdminNavbar, Footer } from "@components";
import { Outlet } from "react-router-dom";
import { block } from "million/react";

const AdminLayout = () => {
  return (
    <main>
      <span className="z-[1000] sticky top-0 bg-light-default text-dark-default dark:bg-dark-default dark:text-light-default">
        <AdminNavbar />
      </span>
      <div>
        <Outlet />
      </div>
      <Footer />
    </main>
  );
};

const AdminLayoutBlock = block(AdminLayout);

export default AdminLayoutBlock;
