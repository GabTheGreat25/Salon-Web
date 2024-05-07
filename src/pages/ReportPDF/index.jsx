import { react } from "react";
import {
  useGetServiceTypeQuery,
  useGetCustomerAppointmentQuery,
  useGetLogBookReportQuery,
  useGetEquipmentReportQuery,
  useGetAppointmentReportQuery,
  useGetAppointmentSaleQuery,
  useGetDeliveryReportQuery,
  useGetProductTypeQuery,
  useGetScheduleTypeQuery,
  useGetCommentRatingQuery,
  useGetTransactionPaymentQuery,
  useGetFeedbackReportQuery,
  useGetBrandProductQuery,
  useGetAnonymousCommentQuery,
  useGetAnonymousFeedbackQuery,
  useGetInventoriesQuery,
} from "@api";

import jsPDF from "jspdf";
import "jspdf-autotable";

export default function () {
  const { data: serviceData } = useGetServiceTypeQuery();
  const service = serviceData?.details || [];

  const { data: customerAppoint } = useGetCustomerAppointmentQuery();
  const customer = customerAppoint?.details || [];

  const { data: logbookData } = useGetLogBookReportQuery();
  const logbook = logbookData?.details || [];

  const { data: deliveryData } = useGetDeliveryReportQuery();
  const delivery = deliveryData?.details || [];

  const { data: paymentData } = useGetTransactionPaymentQuery();
  const payment = paymentData?.details || [];

  const logbookCount = {
    allBorrowed: 0,
    allReturned: 0,
    allMissing: 0,
    allDamage: 0,
  };

  logbook?.forEach((l) => {
    logbookCount.allBorrowed += l.totalBorrowed || 0;
    logbookCount.allReturned += l.totalReturned || 0;
    logbookCount.allMissing += l.totalReturnedWithMissing || 0;
    logbookCount.allDamage += l.totalReturnedWithDamage || 0;
  });

  const { data: appointmentData } = useGetAppointmentReportQuery();
  const appointment = appointmentData?.details;

  const { data: sales } = useGetAppointmentSaleQuery();
  const appointmentSales = sales?.details;

  const { data: brandData } = useGetBrandProductQuery();
  const brand = brandData?.details;

  const generateServiceAppointmentPDF = () => {
    const doc = new jsPDF();

    const title = "Service Appointment Report";
    const titleWidth = doc.getTextWidth(title);
    const xPosition = (doc.internal.pageSize.getWidth() - titleWidth) / 2;
    doc.text(title, xPosition, 15);

    doc.autoTable({
      head: [["Service Type", "Total Appointments"]],
      body: service?.map((s) => [s?._id, s?.count]),
      startY: 25,
    });

    doc.save("serviceAppointments.pdf");
  };

  const generateAppointmentCustomerPDF = () => {
    const doc = new jsPDF();

    const title = "Appointment Customers Report";
    const titleWidth = doc.getTextWidth(title);
    const xPosition = (doc.internal.pageSize.getWidth() - titleWidth) / 2;
    doc.text(title, xPosition, 15);

    doc.autoTable({
      head: [["Customer Description", "Total Appointments"]],
      body: customer?.map((customerItem) => [
        customerItem?._id,
        customerItem?.count,
      ]),
      startY: 25,
    });

    doc.save("customerAppointment.pdf");
  };

  const logbookPDF = () => {
    const doc = new jsPDF();
  
    const title = "Equipment Reports";
    const titleWidth = doc.getTextWidth(title);
    const xPosition = (doc.internal.pageSize.getWidth() - titleWidth) / 2;
    doc.text(title, xPosition, 15);
  
    const headers = ["Equipment Status", "Quantity"];
  
    const tableData = logbookData?.details?.map((logbook) => {
      let quantity = 0;
      if (logbook._id.includes("Borrowed")) {
        quantity = logbook.totalBorrowed || 0;
      } else if (logbook._id.includes("Returned")) {
        if (logbook._id.includes("Missing")) {
          quantity = logbook.totalReturnedWithMissing || 0;
        } else if (logbook._id.includes("Damage")) {
          quantity = logbook.totalReturnedWithDamage || 0;
        } else {
          quantity = logbook.totalReturned || 0;
        }
      }
  
      return [logbook._id, quantity];
    });
  
    doc.autoTable({
      head: [headers],
      body: tableData,
      startY: 25, 
    });
  
    doc.save("logbook.pdf");
  };

  const generateAppointmentStatusPDF = () => {
    const doc = new jsPDF();

    const title = "Appointment Status Reports";
    const titleWidth = doc.getTextWidth(title);
    const xPosition = (doc.internal.pageSize.getWidth() - titleWidth) / 2;
    doc.text(title, xPosition, 15);

    doc.autoTable({
      head: [["Appointment Status", "Total Appointments"]],
      body: appointment?.map((a) => [a?._id, a?.count]),
      startY: 25, 
    });

    doc.save("AppointmentReports.pdf");
  };

  const generateSalesPDF = () => {
    const doc = new jsPDF();

    const title = "Lhanlee Salon Appointment  Sales Report";
    const titleWidth = doc.getTextWidth(title);
    const xPosition = (doc.internal.pageSize.getWidth() - titleWidth) / 2;
    doc.text(title, xPosition, 15);

    doc.autoTable({
      head: [["Total Appointments Sales"]],
      body: appointmentSales?.map((a) => [a?.total]),
      startY: 25,
    });

    doc.save("AppointmentReports.pdf");
  };

  const generateDeliveryPDF = () => {
    const doc = new jsPDF();

    const title = "Delivery Reports";
    const titleWidth = doc.getTextWidth(title);
    const xPosition = (doc.internal.pageSize.getWidth() - titleWidth) / 2;
    doc.text(title, xPosition, 15);


    doc.autoTable({
      head: [["Delivery Date", "Product Type", "Status", "Total Appointments"]],
      body: delivery?.map((d) => [
        new Date(d?._id?.date).toLocaleDateString(),
        d?._id?.type,
        d?._id?.status,
        d?.count,
      ]),
      startY: 25,
    });

    doc.save("deliveryAppointments.pdf");
  };

  const generatePaymentMethodPDF = () => {
    const doc = new jsPDF();

    const title = "Appointment Payment Method Reports";
    const titleWidth = doc.getTextWidth(title);
    const xPosition = (doc.internal.pageSize.getWidth() - titleWidth) / 2;
    doc.text(title, xPosition, 15);

    doc.autoTable({
      head: [["Payment Mehod", "Total Count"]],
      body: payment?.map((p) => [p?._id, p?.count]),
      startY: 25,
    });

    doc.save("AppointmentPayment.pdf");
  };

  const generateBrandReportsPDF = () => {
    const doc = new jsPDF();

    const title = "Product Brand Reports";
    const titleWidth = doc.getTextWidth(title);
    const xPosition = (doc.internal.pageSize.getWidth() - titleWidth) / 2;
    doc.text(title, xPosition, 15);

    doc.autoTable({
      head: [["Brand Name", "No. of Products"]],
      body: brand?.map((p) => [p?.brandName, p?.productCount]),
      startY: 25,
    });

    doc.save("brandReports.pdf");
  };

  const generalReportPDF = () => {
    const doc = new jsPDF();
  
    const title = "Lhanlee Salon General Reports";
    const titleFontSize = 16;
    const titleWidth = doc.getTextWidth(title);
    const xPosition = (doc.internal.pageSize.getWidth() - titleWidth) / 2;
    const yPosition = 25;
  
    doc.setFontSize(titleFontSize);
    doc.text(title, xPosition, yPosition);
  
    
    const tableStartY = yPosition + titleFontSize + 10; 
  
    doc.autoTable({
      startY: tableStartY,
      head: [["Customer Description", "Total Appointments"]],
      body: customer?.map((customerItem) => [customerItem?._id, customerItem?.count]),
    });
  
    doc.autoTable({
      startY: doc.previousAutoTable.finalY + 10, 
      head: [["Appointment Service Type", "Total Appointments"]],
      body: service?.map((s) => [s?._id, s?.count]),
    });
  
    doc.autoTable({
      startY: doc.previousAutoTable.finalY + 10, 
      head: [["Appointment Status", "Total Appointments"]],
      body: appointment?.map((a) => [a?._id, a?.count]),
    });
  
    doc.autoTable({
      startY: doc.previousAutoTable.finalY + 10, 
      head: [["Total Appointments Sales"]],
      body: appointmentSales?.map((a) => [a?.total]),
    });
  
    doc.save("GeneralReports.pdf");
  };
  
  

  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <div className="mx-2 border bg-primary-default p-4  m-2 mb-8 rounded-lg shadow h-72 w-72 overflow-y-auto">
        <h3 className="text-lg font-bold mb-4">Service Appointments Report</h3>
        <div className="flex flex-col items-center justify-between">
        {service?.map((s) => (
          <div key={s._id} className="mb-4">
            <h4 className="text-md font-semibold">{s?._id}</h4>

            <div className="flex justify-between">
              <div className="flex-1 mr-4">
                <p>Total Appointments: {s?.count}</p>
              </div>
            </div>
            <hr className="my-2" />
          </div>
        ))}
        <div>
        <button
          onClick={generateServiceAppointmentPDF}
          className="xl:px-6 md:px-4 font-medium capitalize rounded-lg xl:text-xl lg:text-base md:text-[1rem] btn btn-primary text-light-default dark:text-dark-default"
        >
          GENERATE PDF
        </button>
        </div>
        </div>
        
      </div>

      <div className="mx-2 border bg-primary-default p-4  m-2 mb-8 rounded-lg shadow h-72 w-72 overflow-y-auto">
        <h3 className="text-lg font-bold mb-4">Customer Appointment Reports</h3>
        {customer?.map((customerItem) => (
          <div key={customerItem._id} className="mb-4">
            <h4 className="text-md font-semibold">
              Customer Description: {customerItem?._id}
            </h4>

            <div className="flex justify-between">
              <div className="flex-1 mr-4">
                <p>Total Appointments: {customerItem?.count}</p>
              </div>
            </div>
            <hr className="my-2" />
          </div>
        ))}
        <button
          onClick={generateAppointmentCustomerPDF}
          className="xl:px-6 md:px-4 font-medium capitalize rounded-lg xl:text-xl lg:text-base md:text-[1rem] btn btn-primary text-light-default dark:text-dark-default"
        >
          GENERATE PDF
        </button>
      </div>

      <div className="mx-2 border bg-primary-default p-4 m-2 mb-8 rounded-lg shadow h-72 w-72 overflow-y-auto">
        <h3 className="text-lg font-bold mb-4">Equipment Reports</h3>
        <div className="mb-4">
          <div className="flex justify-between">
            <div className="flex-1 mr-4">
              <p>Borrowed: {logbookCount.allBorrowed}</p>
              <p>Returned: {logbookCount.allReturned}</p>
              <p>Returned Missing: {logbookCount.allMissing}</p>
              <p>Returned Damage: {logbookCount.allDamage}</p>
            </div>
          </div>
          <hr className="my-2" />
        </div>
        <button
          onClick={logbookPDF}
          className="xl:px-6 md:px-4 font-medium capitalize rounded-lg xl:text-xl lg:text-base md:text-[1rem] btn btn-primary text-light-default dark:text-dark-default"
        >
          GENERATE PDF
        </button>
      </div>

      <div className="mx-2 border bg-primary-default p-4  mb-8 rounded-lg shadow h-72 w-72 overflow-y-auto">
        <h3 className="text-lg font-bold mb-4">Appointments Status Report</h3>
        {appointment?.map((a) => (
          <div key={a?._id} className="mb-4">
            <h4 className="text-md font-semibold">{a?._id}</h4>

            <div className="flex justify-between">
              <div className="flex-1 mr-4">
                <p> Total Appointments: {a?.count}</p>
              </div>
            </div>
            <hr className="my-2" />
          </div>
        ))}
        <button
          onClick={generateAppointmentStatusPDF}
          className="xl:px-6 md:px-4 font-medium capitalize rounded-lg xl:text-xl lg:text-base md:text-[1rem] btn btn-primary text-light-default dark:text-dark-default"
        >
          GENERATE PDF
        </button>
      </div>

      <div className="mx-2 border bg-primary-default p-4  m-2 mb-8 rounded-lg shadow h-72 w-72 overflow-y-auto">
        <h3 className="text-lg font-bold mb-4">Service Appointments Report</h3>
        {appointmentSales?.map((a) => (
          <div key={a?._id} className="mb-4">
            <h4 className="text-md font-semibold">{a?._id}</h4>

            <div className="flex justify-between">
              <div className="flex-1 mr-4">
                <p> Appointment TotalSales: {a?.total}</p>
              </div>
            </div>
            <hr className="my-2" />
          </div>
        ))}
        <button
          onClick={generateSalesPDF}
          className="xl:px-6 md:px-4 font-medium capitalize rounded-lg xl:text-xl lg:text-base md:text-[1rem] btn btn-primary text-light-default dark:text-dark-default"
        >
          GENERATE PDF
        </button>
      </div>

      <div className="mx-2 border bg-primary-default p-4  m-2 mb-8 rounded-lg shadow h-72 w-72 overflow-y-auto">
        <h3 className="text-lg font-bold mb-4">Delivery Product Report</h3>
        {delivery?.map((d, index) => (
          <div key={index} className="mb-4">
            <h4 className="text-md font-semibold">
              {`${d?._id?.type} (${d?._id?.status})`}
            </h4>

            <div className="flex justify-between">
              <div className="flex-1 mr-4">
                <p>No. of Deliveries: {d?.count}</p>
              </div>
            </div>
            <hr className="my-2" />
          </div>
        ))}
        <button
          onClick={generateDeliveryPDF}
          className="xl:px-6 md:px-4 font-medium capitalize rounded-lg xl:text-xl lg:text-base md:text-[1rem] btn btn-primary text-light-default dark:text-dark-default"
        >
          GENERATE PDF
        </button>
      </div>

      <div className="mx-2 border bg-primary-default p-4  m-2 mb-8 rounded-lg shadow h-72 w-72 overflow-y-auto">
        <h3 className="text-lg font-bold mb-4">Transaction Payment Method Report</h3>
        {payment?.map((p) => (
          <div key={p._id} className="mb-4">
            <h4 className="text-md font-semibold">{p?._id}</h4>

            <div className="flex justify-between">
              <div className="flex-1 mr-4">
                <p> Total Count: {p?.count}</p>
              </div>
            </div>
            <hr className="my-2" />
          </div>
        ))}
        <button
          onClick={generatePaymentMethodPDF}
          className="xl:px-6 md:px-4 font-medium capitalize rounded-lg xl:text-xl lg:text-base md:text-[1rem] btn btn-primary text-light-default dark:text-dark-default"
        >
          GENERATE PDF
        </button>
      </div>

      <div className="mx-2 border bg-primary-default p-4  m-2 mb-8 rounded-lg shadow h-72 w-72 overflow-y-auto">
        <h3 className="text-lg font-bold mb-4">Brand Reports</h3>
        {brand?.map((b, index) => (
          <div key={index} className="mb-4">
            <h4 className="text-md font-semibold">{b?.brandName}</h4>

            <div className="flex justify-between">
              <div className="flex-1 mr-4">
                <p> No. of Products: {b?.productCount}</p>
              </div>
            </div>
            <hr className="my-2" />
          </div>
        ))}
        <button
          onClick={generateBrandReportsPDF}
          className="xl:px-6 md:px-4 font-medium capitalize rounded-lg xl:text-xl lg:text-base md:text-[1rem] btn btn-primary text-light-default dark:text-dark-default"
        >
          GENERATE PDF
        </button>
      </div>
      <button
        onClick={generalReportPDF}
        className="xl:px-6 md:px-4 m-2 font-medium capitalize rounded-lg xl:text-xl lg:text-base md:text-[1rem] btn btn-primary text-light-default dark:text-dark-default"
      >
        GENERAL REPORTS
      </button>
    </div>
  );
}
