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
  Profile,
  History,
  Favorites,
  Schedule,
  EditProfile,
  ChangePassword,
  TermsAndConditions,
  WalkInCustomerSignUp,
} from "@/pages";
import {
  RootLayout,
  NotFound,
  Welcome,
  WelcomeTwo,
  WelcomeThree,
  MainLayout,
} from "@/layouts";
import {
  FacebookMessenger,
  MobileChecker,
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
        <Route path="/about" element={<About />} />
        <Route path="/history" element={<History />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/changepassword" element={<ChangePassword />} />
        <Route path="/comment" element={<Comment />} />
        <Route path="/termsAndConditions" element={<TermsAndConditions />} />
        <Route
          path="/walkInCustomerSignUp"
          element={<WalkInCustomerSignUp />}
        />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Private Routes */}
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
