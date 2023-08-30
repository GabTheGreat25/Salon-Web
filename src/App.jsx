import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import {
  ForgotPassword,
  ChooseRole,
  EmployeeSignUp,
  CustomerSignUp,
} from "@/pages";
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
        <Route path="/becomeEmployee" element={<WelcomeTwo />} />
        <Route path="/becomeCustomer" element={<WelcomeThree />} />
        <Route path="forgotPassword" element={<ForgotPassword />} />
        <Route path="chooseRole" element={<ChooseRole />} />
        <Route path="employeeSignUp" element={<EmployeeSignUp />} />
        <Route path="customerSignUp" element={<CustomerSignUp />} />
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
