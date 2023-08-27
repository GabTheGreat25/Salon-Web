import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Test } from "@/pages";
import {
  RootLayout,
  NotFound,
  Welcome,
  PublicLayout,
  DashboardLayout,
} from "@/layouts";
import { FacebookMessenger } from "@/components";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route index element={<Welcome />} />
        <Route path="test" element={<Test />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Private Routes */}
    </Route>
  )
);

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <FacebookMessenger />
    </>
  );
}
