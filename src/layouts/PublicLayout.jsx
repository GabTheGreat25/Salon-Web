import React from "react";
import { Navbar, Footer } from "@components";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <main>
      <span className="z-[1000] sticky top-0">
        <Navbar />
      </span>
      <div>
        <Outlet />
      </div>
      <Footer />
    </main>
  );
}
