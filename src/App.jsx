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
  EditCustomerProfile,
  History,
  Schedule,
  CustomerServicesRelevance,
  CustomerServicesSort,
  CustomerServicesPopular,
  CustomerServicesLatest,
  CustomerServicesBudget,
  ServiceGetById,
  Cart,
  Checkout,
  Receipt,
  EditBeauticianProfile,
  Feedback,
  CreateComment,
  EditComment,
  ProductTable,
  CreateProduct,
  EditProduct,
  ServiceTable,
  CreateService,
  EditService,
  AppointmentTable,
  EditAppointment,
  TransactionTable,
  EditTransaction,
  UserTable,
  EditUser,
  ConfirmBeautician,
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

const MOBILE_BREAKPOINT = 949;

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
          path="/walkInCustomerSignUp"
          element={
            <UnprotectedRoute>
              <WalkInCustomerSignUp />
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
        <Route
          path="/termsAndConditions"
          element={
            <UnprotectedRoute>
              <TermsAndConditions />
            </UnprotectedRoute>
          }
        />
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
        <Route
          path="products"
          element={
            <ProtectedRoute userRoles={["Admin"]}>
              <ProductTable />
            </ProtectedRoute>
          }
        />
        <Route
          path="product/create"
          element={
            <ProtectedRoute userRoles={["Admin"]}>
              <CreateProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="product/edit/:id"
          element={
            <ProtectedRoute userRoles={["Admin"]}>
              <EditProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="services"
          element={
            <ProtectedRoute userRoles={["Admin"]}>
              <ServiceTable />
            </ProtectedRoute>
          }
        />
        <Route
          path="service/create"
          element={
            <ProtectedRoute userRoles={["Admin"]}>
              <CreateService />
            </ProtectedRoute>
          }
        />
        <Route
          path="service/edit/:id"
          element={
            <ProtectedRoute userRoles={["Admin"]}>
              <EditService />
            </ProtectedRoute>
          }
        />
        <Route
          path="appointments"
          element={
            <ProtectedRoute userRoles={["Admin"]}>
              <AppointmentTable />
            </ProtectedRoute>
          }
        />
        <Route
          path="appointment/edit/:id"
          element={
            <ProtectedRoute userRoles={["Admin"]}>
              <EditAppointment />
            </ProtectedRoute>
          }
        />
        <Route
          path="transactions"
          element={
            <ProtectedRoute userRoles={["Admin"]}>
              <TransactionTable />
            </ProtectedRoute>
          }
        />
        <Route
          path="transaction/edit/:id"
          element={
            <ProtectedRoute userRoles={["Admin"]}>
              <EditTransaction />
            </ProtectedRoute>
          }
        />
        <Route
          path="users"
          element={
            <ProtectedRoute userRoles={["Admin"]}>
              <UserTable />
            </ProtectedRoute>
          }
        />
        <Route
          path="confirmBeautician"
          element={
            <ProtectedRoute userRoles={["Admin"]}>
              <ConfirmBeautician />
            </ProtectedRoute>
          }
        />
        <Route
          path="user/edit/:id"
          element={
            <ProtectedRoute userRoles={["Admin"]}>
              <EditUser />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Beautician Routes */}
      <Route path="beautician" element={<BeauticianLayout />}>
        <Route
          index
          element={
            <ProtectedRoute userRoles={["Beautician"]}>
              <BeauticianWelcome />
            </ProtectedRoute>
          }
        />
        <Route
          path="editBeauticianProfile"
          element={
            <ProtectedRoute userRoles={["Beautician"]}>
              <EditBeauticianProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="changePassword"
          element={
            <ProtectedRoute userRoles={["Beautician"]}>
              <ChangePassword />
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
          path="editCustomerProfile"
          element={
            <ProtectedRoute userRoles={["Online Customer"]}>
              <EditCustomerProfile />
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
          path="customerServicesRelevance"
          element={
            <ProtectedRoute userRoles={["Online Customer"]}>
              <CustomerServicesRelevance />
            </ProtectedRoute>
          }
        />
        <Route
          path="customerServicesSort"
          element={
            <ProtectedRoute userRoles={["Online Customer"]}>
              <CustomerServicesSort />
            </ProtectedRoute>
          }
        />
        <Route
          path="customerServicesPopular"
          element={
            <ProtectedRoute userRoles={["Online Customer"]}>
              <CustomerServicesPopular />
            </ProtectedRoute>
          }
        />
        <Route
          path="customerServicesLatest"
          element={
            <ProtectedRoute userRoles={["Online Customer"]}>
              <CustomerServicesLatest />
            </ProtectedRoute>
          }
        />
        <Route
          path="customerServicesBudget"
          element={
            <ProtectedRoute userRoles={["Online Customer"]}>
              <CustomerServicesBudget />
            </ProtectedRoute>
          }
        />
        <Route
          path="service/:id"
          element={
            <ProtectedRoute userRoles={["Online Customer"]}>
              <ServiceGetById />
            </ProtectedRoute>
          }
        />
        <Route
          path="cart"
          element={
            <ProtectedRoute userRoles={["Online Customer"]}>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="checkout"
          element={
            <ProtectedRoute userRoles={["Online Customer"]}>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route
          path="receipt"
          element={
            <ProtectedRoute userRoles={["Online Customer"]}>
              <Receipt />
            </ProtectedRoute>
          }
        />
        <Route
          path="comment"
          element={
            <ProtectedRoute userRoles={["Online Customer"]}>
              <Comment />
            </ProtectedRoute>
          }
        />
        <Route
          path="comment/create"
          element={
            <ProtectedRoute userRoles={["Online Customer"]}>
              <CreateComment />
            </ProtectedRoute>
          }
        />
        <Route
          path="comment/edit/:id"
          element={
            <ProtectedRoute userRoles={["Online Customer"]}>
              <EditComment />
            </ProtectedRoute>
          }
        />
        <Route
          path="termsAndConditions"
          element={
            <ProtectedRoute userRoles={["Online Customer"]}>
              <TermsAndConditions />
            </ProtectedRoute>
          }
        />
        <Route
          path="privacyPolicy"
          element={
            <ProtectedRoute userRoles={["Online Customer"]}>
              <PrivacyPolicy />
            </ProtectedRoute>
          }
        />
        <Route
          path="feedback"
          element={
            <ProtectedRoute userRoles={["Online Customer"]}>
              <Feedback />
            </ProtectedRoute>
          }
        />
        <Route
          path="receipt/:id"
          element={
            <ProtectedRoute userRoles={["Online Customer"]}>
              <Receipt />
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
        <Route
          path="about"
          element={
            <ProtectedRoute userRoles={["Walk-in Customer"]}>
              <About />
            </ProtectedRoute>
          }
        />
        <Route
          path="editCustomerProfile"
          element={
            <ProtectedRoute userRoles={["Walk-in Customer"]}>
              <EditCustomerProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="changePassword"
          element={
            <ProtectedRoute userRoles={["Walk-in Customer"]}>
              <ChangePassword />
            </ProtectedRoute>
          }
        />
        <Route
          path="history"
          element={
            <ProtectedRoute userRoles={["Walk-in Customer"]}>
              <History />
            </ProtectedRoute>
          }
        />
        <Route
          path="schedule"
          element={
            <ProtectedRoute userRoles={["Walk-in Customer"]}>
              <Schedule />
            </ProtectedRoute>
          }
        />
        <Route
          path="customerServicesRelevance"
          element={
            <ProtectedRoute userRoles={["Walk-in Customer"]}>
              <CustomerServicesRelevance />
            </ProtectedRoute>
          }
        />
        <Route
          path="customerServicesSort"
          element={
            <ProtectedRoute userRoles={["Walk-in Customer"]}>
              <CustomerServicesSort />
            </ProtectedRoute>
          }
        />
        <Route
          path="customerServicesPopular"
          element={
            <ProtectedRoute userRoles={["Walk-in Customer"]}>
              <CustomerServicesPopular />
            </ProtectedRoute>
          }
        />
        <Route
          path="customerServicesLatest"
          element={
            <ProtectedRoute userRoles={["Walk-in Customer"]}>
              <CustomerServicesLatest />
            </ProtectedRoute>
          }
        />
        <Route
          path="customerServicesBudget"
          element={
            <ProtectedRoute userRoles={["Walk-in Customer"]}>
              <CustomerServicesBudget />
            </ProtectedRoute>
          }
        />
        <Route
          path="service/:id"
          element={
            <ProtectedRoute userRoles={["Walk-in Customer"]}>
              <ServiceGetById />
            </ProtectedRoute>
          }
        />
        <Route
          path="cart"
          element={
            <ProtectedRoute userRoles={["Walk-in Customer"]}>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="checkout"
          element={
            <ProtectedRoute userRoles={["Walk-in Customer"]}>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route
          path="receipt"
          element={
            <ProtectedRoute userRoles={["Walk-in Customer"]}>
              <Receipt />
            </ProtectedRoute>
          }
        />
        <Route
          path="comment"
          element={
            <ProtectedRoute userRoles={["Walk-in Customer"]}>
              <Comment />
            </ProtectedRoute>
          }
        />
        <Route
          path="comment/create"
          element={
            <ProtectedRoute userRoles={["Walk-in Customer"]}>
              <CreateComment />
            </ProtectedRoute>
          }
        />
        <Route
          path="comment/edit/:id"
          element={
            <ProtectedRoute userRoles={["Walk-in Customer"]}>
              <EditComment />
            </ProtectedRoute>
          }
        />
        <Route
          path="termsAndConditions"
          element={
            <ProtectedRoute userRoles={["Walk-in Customer"]}>
              <TermsAndConditions />
            </ProtectedRoute>
          }
        />
        <Route
          path="privacyPolicy"
          element={
            <ProtectedRoute userRoles={["Walk-in Customer"]}>
              <PrivacyPolicy />
            </ProtectedRoute>
          }
        />
        <Route
          path="feedback"
          element={
            <ProtectedRoute userRoles={["Walk-in Customer"]}>
              <Feedback />
            </ProtectedRoute>
          }
        />
        <Route
          path="receipt/:id"
          element={
            <ProtectedRoute userRoles={["Walk-in Customer"]}>
              <Receipt />
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
