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
  TermsAndConditions,
  Dashboard,
  CustomerWelcome,
  PrivacyPolicy,
  EditAdminProfile,
  ChangePassword,
  EditCustomerProfile,
  History,
  Schedule,
  CustomerServicesAllServices,
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
  FeedbackTable,
  DeliveryTable,
  CreateDelivery,
  EditDelivery,
  CommentTable,
  Calendar,
  BeauticianAppointment,
  BeauticianAppointmentHistory,
  ResetPassword,
  BeauticianTermsCondition,
  BeauticianRegisterTermsCondition,
  BeauticianPrivacyPolicy,
  CustomerTermsCondition,
  EditSchedule,
  Hiring,
  BrandTable,
  CreateBrand,
  EditBrand,
  CustomerInfo,
  BeauticianCalendar,
  FeedbackInfo,
  FeedbackSection,
  TimeTable,
  CreateTime,
  EditTime,
  Shift,
  EditShift,
  ScheduleConfirm,
  ViewComment,
  ScheduleTable,
  CreateSchedule,
  GetServiceById,
  GetScheduleById,
  GetAppointmentById,
  ConfirmAppointment,
  EditAbsence,
  Body,
  Face,
  Hair,
  Feet,
  Hands,
  Waiver,
  CustomerWaiver,
  OptionsTable,
  CreateOption,
  EditOption,
  ExclusionTable,
  CreateExclusion,
  EditExclusion,
  MonthTable,
  CreateMonth,
  EditMonth,
  ViewDeliveryById,
  AppointmentSchedule,
  EditBeauticianAppointment,
  ViewOptionById,
  ViewRescheduleAppointment,
  GetProductById,
  GetTransactionById,
  GetBrandById,
  GetTimeById,
  GetUserById,
  GetConfirmBeauticianById,
  UserType,
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
  CustomerLayout,
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
          path="/resetPassword"
          element={
            <UnprotectedRoute>
              <ResetPassword />
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
          path="/customerSignUp"
          element={
            <UnprotectedRoute>
              <CustomerSignUp />
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
        <Route
          path="/beauticianTermsAndConditions"
          element={
            <UnprotectedRoute>
              <BeauticianRegisterTermsCondition />
            </UnprotectedRoute>
          }
        />
        <Route
          path="/customerTermsCondition"
          element={
            <UnprotectedRoute>
              <CustomerTermsCondition />
            </UnprotectedRoute>
          }
        />
        <Route
          path="/feedbackSection"
          element={
            <UnprotectedRoute>
              <FeedbackSection />
            </UnprotectedRoute>
          }
        />
        <Route
          path="/body"
          element={
            <UnprotectedRoute>
              <Body />
            </UnprotectedRoute>
          }
        />
        <Route
          path="/face"
          element={
            <UnprotectedRoute>
              <Face />
            </UnprotectedRoute>
          }
        />
        <Route
          path="/hair"
          element={
            <UnprotectedRoute>
              <Hair />
            </UnprotectedRoute>
          }
        />
        <Route
          path="/feet"
          element={
            <UnprotectedRoute>
              <Feet />
            </UnprotectedRoute>
          }
        />
        <Route
          path="/hands"
          element={
            <UnprotectedRoute>
              <Hands />
            </UnprotectedRoute>
          }
        />
        <Route
          path="/waiver"
          element={
            <UnprotectedRoute>
              <Waiver />
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
              <Calendar />
            </ProtectedRoute>
          }
        />
        <Route
          path="dashboard"
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
          path="appointment/schedule/edit/:id"
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
        <Route
          path="feedbacks"
          element={
            <ProtectedRoute userRoles={["Admin"]}>
              <FeedbackTable />
            </ProtectedRoute>
          }
        />
        <Route
          path="deliveries"
          element={
            <ProtectedRoute userRoles={["Admin"]}>
              <DeliveryTable />
            </ProtectedRoute>
          }
        />
        <Route
          path="delivery/create"
          element={
            <ProtectedRoute userRoles={["Admin"]}>
              <CreateDelivery />
            </ProtectedRoute>
          }
        />
        <Route
          path="delivery/edit/:id"
          element={
            <ProtectedRoute userRoles={["Admin"]}>
              <EditDelivery />
            </ProtectedRoute>
          }
        />
        <Route
          path="comments"
          element={
            <ProtectedRoute userRoles={["Admin"]}>
              <CommentTable />
            </ProtectedRoute>
          }
        />
        <Route
          path="hiring"
          element={
            <ProtectedRoute userRoles={["Admin"]}>
              <Hiring />
            </ProtectedRoute>
          }
        />
        <Route
          path="brands"
          element={
            <ProtectedRoute userRoles={["Admin"]}>
              <BrandTable />
            </ProtectedRoute>
          }
        />
        <Route
          path="brand/create"
          element={
            <ProtectedRoute userRoles={["Admin"]}>
              <CreateBrand />
            </ProtectedRoute>
          }
        />
        <Route
          path="brand/edit/:id"
          element={
            <ProtectedRoute userRoles={["Admin"]}>
              <EditBrand />
            </ProtectedRoute>
          }
        />
        <Route
          path="feedback/:id"
          element={
            <ProtectedRoute userRoles={["Admin"]}>
              <FeedbackInfo />
            </ProtectedRoute>
          }
        />
        <Route
          path="times"
          element={
            <ProtectedRoute userRoles={["Admin"]}>
              <TimeTable />
            </ProtectedRoute>
          }
        />
        <Route
          path="time/create"
          element={
            <ProtectedRoute userRoles={["Admin"]}>
              <CreateTime />
            </ProtectedRoute>
          }
        />
        <Route
          path="time/edit/:id"
          element={
            <ProtectedRoute userRoles={["Admin"]}>
              <EditTime />
            </ProtectedRoute>
          }
        />
        <Route
          path="scheduleConfirm"
          element={
            <ProtectedRoute userRoles={["Admin"]}>
              <ScheduleConfirm />
            </ProtectedRoute>
          }
        />
        <Route
          path="comment/:id"
          element={
            <ProtectedRoute userRoles={["Admin"]}>
              <ViewComment />
            </ProtectedRoute>
          }
        />
        <Route
          path="schedules"
          element={
            <ProtectedRoute userRoles={["Admin"]}>
              <ScheduleTable />
            </ProtectedRoute>
          }
        />
        <Route
          path="schedule/create"
          element={
            <ProtectedRoute userRoles={["Admin"]}>
              <CreateSchedule />
            </ProtectedRoute>
          }
        />
        <Route
          path="service/:id"
          element={
            <ProtectedRoute userRoles={["Admin"]}>
              <GetServiceById />
            </ProtectedRoute>
          }
        />
        <Route
          path="schedule/:id"
          element={
            <ProtectedRoute userRoles={["Admin"]}>
              <GetScheduleById />
            </ProtectedRoute>
          }
        />
        <Route
          path="appointment/:id"
          element={
            <ProtectedRoute userRoles={["Admin"]}>
              <GetAppointmentById />
            </ProtectedRoute>
          }
        />
        <Route
          path="confirmAppointment"
          element={
            <ProtectedRoute userRoles={["Admin"]}>
              <ConfirmAppointment />
            </ProtectedRoute>
          }
        />
        <Route
          path="schedule/edit/admin/:id"
          element={
            <ProtectedRoute userRoles={["Admin"]}>
              <EditAbsence />
            </ProtectedRoute>
          }
        />
        <Route
          path="customer/waiver"
          element={
            <ProtectedRoute userRoles={["Admin"]}>
              <CustomerWaiver />
            </ProtectedRoute>
          }
        />
        <Route
          path="options"
          element={
            <ProtectedRoute userRoles={["Admin"]}>
              <OptionsTable />
            </ProtectedRoute>
          }
        />
        <Route
          path="option/create"
          element={
            <ProtectedRoute userRoles={["Admin"]}>
              <CreateOption />
            </ProtectedRoute>
          }
        />
        <Route
          path="option/edit/:id"
          element={
            <ProtectedRoute userRoles={["Admin"]}>
              <EditOption />
            </ProtectedRoute>
          }
        />
        <Route
          path="exclusions"
          element={
            <ProtectedRoute userRoles={["Admin"]}>
              <ExclusionTable />
            </ProtectedRoute>
          }
        />
        <Route
          path="exclusion/create"
          element={
            <ProtectedRoute userRoles={["Admin"]}>
              <CreateExclusion />
            </ProtectedRoute>
          }
        />
        <Route
          path="exclusion/edit/:id"
          element={
            <ProtectedRoute userRoles={["Admin"]}>
              <EditExclusion />
            </ProtectedRoute>
          }
        />
        <Route
          path="months"
          element={
            <ProtectedRoute userRoles={["Admin"]}>
              <MonthTable />
            </ProtectedRoute>
          }
        />
        <Route
          path="month/create"
          element={
            <ProtectedRoute userRoles={["Admin"]}>
              <CreateMonth />
            </ProtectedRoute>
          }
        />
        <Route
          path="month/edit/:id"
          element={
            <ProtectedRoute userRoles={["Admin"]}>
              <EditMonth />
            </ProtectedRoute>
          }
        />
        <Route
          path="delivery/:id"
          element={
            <ProtectedRoute userRoles={["Admin"]}>
              <ViewDeliveryById />
            </ProtectedRoute>
          }
        />
        <Route
          path="appointment/Schedules"
          element={
            <ProtectedRoute userRoles={["Admin"]}>
              <AppointmentSchedule />
            </ProtectedRoute>
          }
        />
        <Route
          path="appointment/reschedule/:id"
          element={
            <ProtectedRoute userRoles={["Admin"]}>
              <ViewRescheduleAppointment />
            </ProtectedRoute>
          }
        />
        <Route
          path="appointment/beautician/edit/:id"
          element={
            <ProtectedRoute userRoles={["Admin"]}>
              <EditBeauticianAppointment />
            </ProtectedRoute>
          }
        />
        <Route
          path="option/:id"
          element={
            <ProtectedRoute userRoles={["Admin"]}>
              <ViewOptionById />
            </ProtectedRoute>
          }
        />
        <Route
          path="product/:id"
          element={
            <ProtectedRoute userRoles={["Admin"]}>
              <GetProductById />
            </ProtectedRoute>
          }
        />
        <Route
          path="transaction/:id"
          element={
            <ProtectedRoute userRoles={["Admin"]}>
              <GetTransactionById />
            </ProtectedRoute>
          }
        />
        <Route
          path="brand/:id"
          element={
            <ProtectedRoute userRoles={["Admin"]}>
              <GetBrandById />
            </ProtectedRoute>
          }
        />
        <Route
          path="time/:id"
          element={
            <ProtectedRoute userRoles={["Admin"]}>
              <GetTimeById />
            </ProtectedRoute>
          }
        />
        <Route
          path="user/:id"
          element={
            <ProtectedRoute userRoles={["Admin"]}>
              <GetUserById />
            </ProtectedRoute>
          }
        />
        <Route
          path="confirmBeautician/:id"
          element={
            <ProtectedRoute userRoles={["Admin"]}>
              <GetConfirmBeauticianById />
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
              <BeauticianCalendar />
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
        <Route
          path="termsAndConditions"
          element={
            <ProtectedRoute userRoles={["Beautician"]}>
              <TermsAndConditions />
            </ProtectedRoute>
          }
        />
        <Route
          path="privacyPolicy"
          element={
            <ProtectedRoute userRoles={["Beautician"]}>
              <PrivacyPolicy />
            </ProtectedRoute>
          }
        />
        <Route
          path="appointment/beautician/:id"
          element={
            <ProtectedRoute userRoles={["Beautician"]}>
              <BeauticianAppointment />
            </ProtectedRoute>
          }
        />
        <Route
          path="appointment/history/:id"
          element={
            <ProtectedRoute userRoles={["Beautician"]}>
              <BeauticianAppointmentHistory />
            </ProtectedRoute>
          }
        />
        <Route
          path="beauticianTermsCondition"
          element={
            <ProtectedRoute userRoles={["Beautician"]}>
              <BeauticianTermsCondition />
            </ProtectedRoute>
          }
        />
        <Route
          path="beauticianPrivacyPolicy"
          element={
            <ProtectedRoute userRoles={["Beautician"]}>
              <BeauticianPrivacyPolicy />
            </ProtectedRoute>
          }
        />
        <Route
          path="customer/:id"
          element={
            <ProtectedRoute userRoles={["Beautician"]}>
              <CustomerInfo />
            </ProtectedRoute>
          }
        />
        <Route
          path="leave"
          element={
            <ProtectedRoute userRoles={["Beautician"]}>
              <Shift />
            </ProtectedRoute>
          }
        />
        <Route
          path="editShift"
          element={
            <ProtectedRoute userRoles={["Beautician"]}>
              <EditShift />
            </ProtectedRoute>
          }
        />
      </Route>

      {/*  Customer Routes */}
      <Route path="customer" element={<CustomerLayout />}>
        <Route
          index
          element={
            <ProtectedRoute userRoles={["Customer"]}>
              <CustomerWelcome />
            </ProtectedRoute>
          }
        />
        <Route
          path="about"
          element={
            <ProtectedRoute userRoles={["Customer"]}>
              <About />
            </ProtectedRoute>
          }
        />
        <Route
          path="editCustomerProfile"
          element={
            <ProtectedRoute userRoles={["Customer"]}>
              <EditCustomerProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="changePassword"
          element={
            <ProtectedRoute userRoles={["Customer"]}>
              <ChangePassword />
            </ProtectedRoute>
          }
        />
        <Route
          path="history"
          element={
            <ProtectedRoute userRoles={["Customer"]}>
              <History />
            </ProtectedRoute>
          }
        />
        <Route
          path="schedule"
          element={
            <ProtectedRoute userRoles={["Customer"]}>
              <Schedule />
            </ProtectedRoute>
          }
        />
        <Route
          path="customerServicesAllServices"
          element={
            <ProtectedRoute userRoles={["Customer"]}>
              <CustomerServicesAllServices />
            </ProtectedRoute>
          }
        />
        <Route
          path="customerServicesPopular"
          element={
            <ProtectedRoute userRoles={["Customer"]}>
              <CustomerServicesPopular />
            </ProtectedRoute>
          }
        />
        <Route
          path="customerServicesLatest"
          element={
            <ProtectedRoute userRoles={["Customer"]}>
              <CustomerServicesLatest />
            </ProtectedRoute>
          }
        />
        <Route
          path="customerServicesBudget"
          element={
            <ProtectedRoute userRoles={["Customer"]}>
              <CustomerServicesBudget />
            </ProtectedRoute>
          }
        />
        <Route
          path="service/:id"
          element={
            <ProtectedRoute userRoles={["Customer"]}>
              <ServiceGetById />
            </ProtectedRoute>
          }
        />
        <Route
          path="cart"
          element={
            <ProtectedRoute userRoles={["Customer"]}>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="checkout"
          element={
            <ProtectedRoute userRoles={["Customer"]}>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route
          path="userType"
          element={
            <ProtectedRoute userRoles={["Customer"]}>
              <UserType />
            </ProtectedRoute>
          }
        />
        <Route
          path="comment"
          element={
            <ProtectedRoute userRoles={["Customer"]}>
              <Comment />
            </ProtectedRoute>
          }
        />
        <Route
          path="comment/create"
          element={
            <ProtectedRoute userRoles={["Customer"]}>
              <CreateComment />
            </ProtectedRoute>
          }
        />
        <Route
          path="comment/edit/:id"
          element={
            <ProtectedRoute userRoles={["Customer"]}>
              <EditComment />
            </ProtectedRoute>
          }
        />
        <Route
          path="termsAndConditions"
          element={
            <ProtectedRoute userRoles={["Customer"]}>
              <TermsAndConditions />
            </ProtectedRoute>
          }
        />
        <Route
          path="privacyPolicy"
          element={
            <ProtectedRoute userRoles={["Customer"]}>
              <PrivacyPolicy />
            </ProtectedRoute>
          }
        />
        <Route
          path="feedback"
          element={
            <ProtectedRoute userRoles={["Customer"]}>
              <Feedback />
            </ProtectedRoute>
          }
        />
        <Route
          path="receipt/:id"
          element={
            <ProtectedRoute userRoles={["Customer"]}>
              <Receipt />
            </ProtectedRoute>
          }
        />
        <Route
          path="receipt"
          element={
            <ProtectedRoute userRoles={["Customer"]}>
              <Receipt />
            </ProtectedRoute>
          }
        />
        <Route
          path="schedule/edit/:id"
          element={
            <ProtectedRoute userRoles={["Customer"]}>
              <EditSchedule />
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
