import GetServiceReport from "./GetServiceReport";
import GetCustomerAppointment from "./GetCustomerAppointment";
import GetLogBookReports from "./GetLogBookReports";
import GetAppointmentStatus from "./GetAppointmentStatus";
import GetAppointmentSale from "./GetAppointmentSale";
import GetDeliveryReport from "./GetDeliveryReport";
import GetTransactionPayment from "./GetTransactionPayment";
import GetBrandReport from "./GetBrandReport";
import GetAllReports from "./GetAllReports";

export default function () {
  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <GetServiceReport />
      <GetCustomerAppointment />
      <GetLogBookReports />
      <GetAppointmentStatus />
      <GetAppointmentSale />
      <GetDeliveryReport />
      <GetTransactionPayment />
      <GetBrandReport />
      <GetAllReports />
    </div>
  );
}
