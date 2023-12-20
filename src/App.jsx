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
  BeauticianSignUp,
  OnlineCustomerSignUp,
  Login,
  ContactUs,
  Comment,
  About,
  TermsAndConditions,
  WalkInCustomerSignUp,
  Dashboard,
  CustomerWelcome,
  BeauticianWelcome,
  PrivacyPolicy,
  EditAdminProfile,
  ChangePassword,
  EditOnlineCustomerProfile,
  History,
  Schedule,
} from "@/pages";
import {
  RootLayout,
  NotFound,
  Welcome,
  WelcomeTwo,
  WelcomeThree,
  MainLayout,
  AdminLayout,
  BeauticianLayout,
  OnlineCustomerLayout,
  WalkInCustomerLayout,
} from "@/layouts";
import {
  FacebookMessenger,
  MobileChecker,
  ProtectedRoute,
  UnprotectedRoute,
} from "@/components";
import { useMediaQuery } from "react-responsive";

const MOBILE_BREAKPOINT = 767;

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      {/* Public Routes */}
      <Route element={<MainLayout />}>
        <Route
          index
          element={
            <UnprotectedRoute>
              <Welcome />
            </UnprotectedRoute>
          }
        />
        <Route
          path="/becomeBeautician"
          element={
            <UnprotectedRoute>
              <WelcomeTwo />
            </UnprotectedRoute>
          }
        />
        <Route
          path="/becomeCustomer"
          element={
            <UnprotectedRoute>
              <WelcomeThree />
            </UnprotectedRoute>
          }
        />
        <Route
          path="/forgotPassword"
          element={
            <UnprotectedRoute>
              <ForgotPassword />
            </UnprotectedRoute>
          }
        />
        <Route
          path="/chooseRole"
          element={
            <UnprotectedRoute>
              <ChooseRole />
            </UnprotectedRoute>
          }
        />
        <Route
          path="/beauticianSignUp"
          element={
            <UnprotectedRoute>
              <BeauticianSignUp />
            </UnprotectedRoute>
          }
        />
        <Route
          path="/onlineCustomerSignUp"
          element={
            <UnprotectedRoute>
              <OnlineCustomerSignUp />
            </UnprotectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <UnprotectedRoute>
              <Login />
            </UnprotectedRoute>
          }
        />
        <Route
          path="/contactUs"
          element={
            <UnprotectedRoute>
              <ContactUs />
            </UnprotectedRoute>
          }
        />
        <Route path="/comment" element={<Comment />} />
        <Route path="/termsAndConditions" element={<TermsAndConditions />} />
        <Route
          path="/walkInCustomerSignUp"
          element={<WalkInCustomerSignUp />}
        />
        <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
      </Route>

      {/* Private Routes */}

      {/* Admin Routes */}
      <Route path="admin" element={<AdminLayout />}>
        <Route
          index
          element={
            <ProtectedRoute userRoles={["Admin"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="editAdminProfile"
          element={
            <ProtectedRoute userRoles={["Admin"]}>
              <EditAdminProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="changePassword"
          element={
            <ProtectedRoute userRoles={["Admin"]}>
              <ChangePassword />
            </ProtectedRoute>
          }
        />
      </Route>
      {/* Beautician Routes */}
      <Route path="beautician" element={<BeauticianLayout />}>
        <Route
          index
          element={
            <ProtectedRoute>
              <BeauticianWelcome />
            </ProtectedRoute>
          }
        />
      </Route>
      {/* Online Customer Routes */}
      <Route path="onlineCustomer" element={<OnlineCustomerLayout />}>
        <Route
          index
          element={
            <ProtectedRoute userRoles={["Online Customer"]}>
              <CustomerWelcome />
            </ProtectedRoute>
          }
        />
        <Route
          path="about"
          element={
            <ProtectedRoute userRoles={["Online Customer"]}>
              <About />
            </ProtectedRoute>
          }
        />
        <Route
          path="editOnlineCustomerProfile"
          element={
            <ProtectedRoute userRoles={["Online Customer"]}>
              <EditOnlineCustomerProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="history"
          element={
            <ProtectedRoute userRoles={["Online Customer"]}>
              <History />
            </ProtectedRoute>
          }
        />
        <Route
          path="schedule"
          element={
            <ProtectedRoute userRoles={["Online Customer"]}>
              <Schedule />
            </ProtectedRoute>
          }
        />
        <Route
          path="changePassword"
          element={
            <ProtectedRoute userRoles={["Online Customer"]}>
              <ChangePassword />
            </ProtectedRoute>
          }
        />
      </Route>
      {/* WalkIn Customer Routes */}
      <Route path="walkInCustomer" element={<WalkInCustomerLayout />}>
        <Route
          index
          element={
            <ProtectedRoute>
              <CustomerWelcome />
            </ProtectedRoute>
          }
        />
      </Route>
      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

export default function App() {
  const isMobile = useMediaQuery({ maxWidth: MOBILE_BREAKPOINT });
  return (
    <>
      {isMobile ? (
        <MobileChecker />
      ) : (
        <>
          <RouterProvider router={router} />
          <FacebookMessenger />
        </>
      )}
    </>
  );
}
