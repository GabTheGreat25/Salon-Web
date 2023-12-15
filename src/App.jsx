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
  CustomerSignUp,
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
} from "@/pages";
import {
  RootLayout,
  NotFound,
  Welcome,
  WelcomeTwo,
  WelcomeThree,
  MainLayout,
} from "@/layouts";
import { FacebookMessenger, MobileChecker } from "@/components";
import { useMediaQuery } from "react-responsive";

const MOBILE_BREAKPOINT = 767;

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      {/* Public Routes */}
      <Route element={<MainLayout />}>
        <Route index element={<Welcome />} />
        <Route path="/becomeBeautician" element={<WelcomeTwo />} />
        <Route path="/becomeCustomer" element={<WelcomeThree />} />
        <Route path="forgotPassword" element={<ForgotPassword />} />
        <Route path="chooseRole" element={<ChooseRole />} />
        <Route path="beauticianSignUp" element={<BeauticianSignUp />} />
        <Route path="customerSignUp" element={<CustomerSignUp />} />
        <Route path="login" element={<Login />} />
        <Route path="contactUs" element={<ContactUs />} />
        <Route path="/about" element={<About />} />
        <Route path="/history" element={<History />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/changepassword" element={<ChangePassword />} />
        <Route path="comment" element={<Comment />} />
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
