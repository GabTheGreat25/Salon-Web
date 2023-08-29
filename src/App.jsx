import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { ForgotPassword } from "@/pages";
import {
  RootLayout,
  NotFound,
  Welcome,
  WelcomeTwo,
  WelcomeThree,
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
        <Route path="/BecomeEmployee" element={<WelcomeTwo />} />
        <Route path="/BecomeCustomer" element={<WelcomeThree />} />
        <Route path="forgotPassword" element={<ForgotPassword />} />
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
