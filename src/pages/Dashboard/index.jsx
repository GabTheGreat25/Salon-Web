import { React } from "react";
import GetAllUsers from "./GetAllUsers";
import ServicesUse from "./ServicesUse";
import MonthlySales from "./MonthlySales";
import GetBeauticianCustomers from "./GetBeauticianCustomers";
import TotalProfitPerYear from "./TotalProfitPerYear";
import GetAppointmentService from "./GetAppointmentService";
import GetAppointmentCustomer from "./GetAppointmentCustomer";
import GetLogBookReport from "./GetLogBookReport";
import EquipmentReportChart from "./EquipmentReport";
import AppointmentReportChart from "./AppointmentReport";
import DeliveryReportPieChart from "./DeliveryReports";
import ProductReportPieChart from "./GetProductCharts";
import CommentRating from "./GetCommentRating";
import PaymentPieChart from "./GetPayment";
import BrandProductChart from "./BrandProductChart";

export default function () {
  return (
    <>
      <section className="grid items-center justify-center w-full h-full p-10 dark:bg-dark-default ">
        <div className="flex overflow-auto flex-nowrap scrollbar-hide">
          <GetAllUsers />
        </div>
        <div className="overflow-auto scrollbar-hide">
          <MonthlySales />
        </div>

        <div className="flex overflow-auto scrollbar-hide">
          <ServicesUse />
          <GetBeauticianCustomers />
          <TotalProfitPerYear />
        </div>
        <div className="flex overflow-auto scrollbar-hide">
          <GetAppointmentService />
        </div>

        <div className="flex overflow-auto scrollbar-hide">
          <GetAppointmentCustomer />
        </div>

        <div className="flex overflow-auto scrollbar-hide">
          <GetLogBookReport />
        </div>

        <div className="flex overflow-auto scrollbar-hide">
          <EquipmentReportChart />
        </div>

        <div className="flex overflow-auto scrollbar-hide">
          <AppointmentReportChart />
          <ProductReportPieChart />
        </div>
        <div className="flex overflow-auto scrollbar-hide">
          <DeliveryReportPieChart />
        </div>
        <div className="flex overflow-auto scrollbar-hide">
          <CommentRating />
        </div>
        <div className="flex overflow-auto scrollbar-hide">
          <PaymentPieChart />
        </div>
        <div className="flex overflow-auto scrollbar-hide">
          <BrandProductChart />
        </div>
      </section>
    </>
  );
}
