import ForgotPassword from "./ForgotPassword";
import ChooseRole from "./ChooseRole";
import CustomerSignUp from "./CustomerSignUp";
import BeauticianSignUp from "./BeauticianSignUp";
import Login from "./Login";
import ContactUs from "./ContactUs";
import Comment from "./Comment";
import About from "./About";
import TermsAndConditions from "./TermsAndConditions";
import Dashboard from "./Dashboard";
import CustomerWelcome from "./CustomerWelcome";
import PrivacyPolicy from "./PrivacyPolicy";
import EditAdminProfile from "./EditProfile/EditAdminProfile";
import ChangePassword from "./User/ChangePassword";
import EditCustomerProfile from "./EditProfile/EditCustomerProfile";
import History from "./History";
import Schedule from "./Schedule";
import CustomerServicesAllServices from "./Services/CustomerServicesAllServices";
import CustomerServicesPopular from "./Services/CustomerServicesPopular";
import CustomerServicesLatest from "./Services/CustomerServicesLatest";
import CustomerServicesBudget from "./Services/CustomerServicesBudget";
import ServiceGetById from "./Services/ServiceGetById";
import Cart from "./Transaction/cart";
import Checkout from "./Transaction/checkout";
import Receipt from "./Transaction/receipt";
import EditBeauticianProfile from "./EditProfile/EditBeauticianProfile";
import Feedback from "./Feedback";
import CreateComment from "./Comment/CreateComment";
import EditComment from "./Comment/EditComment";
import ProductTable from "./ProductTable";
import CreateProduct from "./ProductTable/createProduct";
import EditProduct from "./ProductTable/editProduct";
import ServiceTable from "./ServiceTable";
import CreateService from "./ServiceTable/createService";
import EditService from "./ServiceTable/editService";
import AppointmentTable from "./AppointmentTable";
import EditAppointment from "./AppointmentTable/editAppointment";
import TransactionTable from "./TransactionTable";
import EditTransaction from "./TransactionTable/editTransaction";
import UserTable from "./UserTable";
import EditUser from "./UserTable/editUser";
import ConfirmBeautician from "./UserTable/confirmBeautician";
import FeedbackTable from "./FeedbackTable";
import DeliveryTable from "./DeliveryTable";
import CreateDelivery from "./DeliveryTable/createDelivery";
import EditDelivery from "./DeliveryTable/editDelivery";
import CommentTable from "./CommentTable";
import Calendar from "./Calendar";
import BeauticianAppointment from "./BeauticianAppointment";
import BeauticianAppointmentHistory from "./BeauticianAppointmentHistory";
import ResetPassword from "./ResetPassword";
import BeauticianTermsCondition from "./TermsAndConditions/BeauticianConfirmedTermsCondition";
import BeauticianRegisterTermsCondition from "./TermsAndConditions/BeauticianRegisterTermsCondition";
import BeauticianPrivacyPolicy from "./PrivacyPolicy/BeauticianPrivacyPolicy";
import CustomerTermsCondition from "./TermsAndConditions/CustomerTermsCondition";
import EditSchedule from "./Schedule/editSchedule";
import Hiring from "./Dashboard/Hiring";
import BrandTable from "./BrandTable";
import CreateBrand from "./BrandTable/createBrand";
import EditBrand from "./BrandTable/editBrand";
import CustomerInfo from "./CustomerInfo";
import BeauticianCalendar from "./Calendar/BeauticianCalendar";
import FeedbackInfo from "./FeedbackInfo";
import FeedbackSection from "./FeedbackSection";
import TimeTable from "./TimeTable";
import CreateTime from "./TimeTable/createTime";
import EditTime from "./TimeTable/editTime";
import Shift from "./Shift";
import EditShift from "./Shift/editShift";
import ScheduleConfirm from "./Schedule/scheduleConfirm";
import ViewComment from "./CommentInfo";
import ScheduleTable from "./ScheduleTable";
import CreateSchedule from "./ScheduleTable/createAbsent";
import GetServiceById from "./ServiceTable/getServiceById";
import GetScheduleById from "./ScheduleTable/getAbsentById";
import GetAppointmentById from "./AppointmentTable/getAppointmentById";
import ConfirmAppointment from "./AppointmentTable/confirmAppointment";
import EditAbsence from "./ScheduleTable/editAbsence";
import Body from "./Ingredients/Body";
import Face from "./Ingredients/Face";
import Hair from "./Ingredients/Hair";
import Feet from "./Ingredients/Feet";
import Hands from "./Ingredients/Hands";
import Waiver from "./Waiver";
import CustomerWaiver from "./User/waiver";
import OptionsTable from "./OptionsTable";
import CreateOption from "./OptionsTable/createOption";
import EditOption from "./OptionsTable/editOption";
import ExclusionTable from "./ExclusionTable";
import CreateExclusion from "./ExclusionTable/createExclusion";
import EditExclusion from "./ExclusionTable/editExclusion";
import MonthTable from "./MonthTable";
import CreateMonth from "./MonthTable/createMonth";
import EditMonth from "./MonthTable/editMonth";
import ViewDeliveryById from "./DeliveryTable/getDeliveryById";
import AppointmentSchedule from "./AppointmentSchedule";
import EditBeauticianAppointment from "./AppointmentSchedule/editBeauticianAppointment";
import ViewOptionById from "./OptionsTable/getOptionById";
import ViewRescheduleAppointment from "./AppointmentTable/getRescheduleAppointmentById";
import GetProductById from "./ProductTable/getProductById";
import GetTransactionById from "./TransactionTable/getTransactionById";
import GetBrandById from "./BrandTable/getBrandById";
import GetTimeById from "./TimeTable/getTimeById";
import GetUserById from "./UserTable/getUserById";
import GetConfirmBeauticianById from "./UserTable/viewConfirmBeauticianById";
import UserType from "./Transaction/userType";
import HasDiscount from "./TransactionTable/hasDiscount";
import EditHasDiscount from "./TransactionTable/editHasDiscount";

export {
  ForgotPassword,
  ChooseRole,
  CustomerSignUp,
  BeauticianSignUp,
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
  HasDiscount,
  EditHasDiscount,
};
