import React from "react";
import { Navbar, Footer } from "@components";
import { Outlet } from "react-router-dom";

export default function () {
  return (
    <>
      <main>
        <Navbar />
        <Outlet />
        <Footer />
      </main>
    </>
  );
}
