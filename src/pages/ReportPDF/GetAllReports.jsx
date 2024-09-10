import {
  useGetAllAppointmentReportsQuery,
  useGetCustomerAppointmentQuery,
  useGetAppointmentReportQuery,
  useGetTransactionPaymentQuery,
  useGetServiceTypeQuery,
  useGetAppointmentSaleQuery,
} from "@api";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function () {
  const { data: allAppointmentReports } = useGetAllAppointmentReportsQuery();
  const reports = allAppointmentReports?.details || [];

  const { data: customerAppoint } = useGetCustomerAppointmentQuery();
  const customer = customerAppoint?.details || [];

  const { data: appointmentData } = useGetAppointmentReportQuery();
  const appointment = appointmentData?.details;

  const { data: paymentData } = useGetTransactionPaymentQuery();
  const payment = paymentData?.details || [];

  const { data: serviceData } = useGetServiceTypeQuery();
  const service = serviceData?.details || [];

  const { data: sales } = useGetAppointmentSaleQuery();
  const appointmentSales = sales?.details;

  const allReportsPDF = () => {
    const doc = new jsPDF();

    const title = "Lhanlee Beauty Lounge";
    const address = "22 Calleja St., Central Signal Village, Taguig City";
    const phone = "+63956 802 8031";
    const reportTitle = "All Appointment Reports";

    doc.setFontSize(16);
    doc.text(title, 15, 20);

    doc.setFontSize(12);
    doc.text(address, 15, 30);
    doc.text(phone, 15, 40);

    doc.setFontSize(14);
    doc.text(reportTitle, 15, 50);

    const headers = [
      "Customer Name",
      "Description",
      "Service Name",
      "Beautician",
      "Service Type",
      "Price",
      "Appointment Date",
      "Appointment Time",
      "Payment Method",
      "Appointment Status",
      "Total Appointments",
    ];

    const tableData = reports?.flatMap((r) =>
      r?.customers?.map((c) => [
        c?.name,
        c?.description,
        c?.serviceName,
        c?.beautician,
        r?.type.join(", "),
        c?.price,
        r?.date,
        c?.time.join(", "),
        c?.paymentMethod,
        c?.status,
        r?.appointmentCount,
      ])
    );

    doc.autoTable({
      head: [headers],
      body: tableData,
      startY: 60,
      styles: {
        fontSize: 9,
      },
      headStyles: {
        fontSize: 7,
      },
      bodyStyles: {
        fontSize: 6,
      },
    });

    let finalY = doc.autoTable.previous.finalY || 60;

    const addNewPageIfNeeded = (currentY) => {
      if (currentY > 270) {
        doc.addPage();
        return 20;
      }
      return currentY;
    };

    doc.setFontSize(12);
    doc.text("Customer Description Reports", 15, finalY + 20);
    doc.setLineWidth(0.5);
    doc.line(15, finalY + 22, 200, finalY + 22);

    const customerData = customer?.map((c) => ({
      description: c?.description,
      count: c?.count,
    }));

    let currentY = finalY + 30;

    customerData.forEach((c) => {
      currentY = addNewPageIfNeeded(currentY);
      doc.setFontSize(9);
      doc.text(`Customer Description: ${c?.description}`, 15, currentY);
      doc.text(`Appointment Count: ${c?.count}`, 15, currentY + 10);
      currentY += 20;
    });

    currentY = addNewPageIfNeeded(currentY);
    doc.setFontSize(12);
    doc.text("Appointment Status Counts", 15, currentY + 10);
    doc.line(15, currentY + 12, 200, currentY + 12);

    currentY += 20;

    appointment?.forEach((a) => {
      currentY = addNewPageIfNeeded(currentY);
      doc.setFontSize(9);
      doc.text(`Completed Appointments: ${a?.completed}`, 15, currentY);
      doc.text(`Pending Appointments: ${a?.pending}`, 15, currentY + 10);
      doc.text(`Cancelled Appointments: ${a?.cancelled}`, 15, currentY + 20);
      currentY += 30;
    });

    currentY = addNewPageIfNeeded(currentY);
    doc.setFontSize(12);
    doc.text("Transaction Payment Methods", 15, currentY + 10);
    doc.line(15, currentY + 12, 200, currentY + 12);

    currentY += 20;

    payment?.forEach((p) => {
      currentY = addNewPageIfNeeded(currentY);
      doc.setFontSize(9);
      doc.text(`Payment Method: ${p?._id}`, 15, currentY);
      doc.text(`Total Count: ${p?.count}`, 15, currentY + 10);
      currentY += 20;
    });

    currentY = addNewPageIfNeeded(currentY);
    doc.setFontSize(12);
    doc.text("Service Counts", 15, currentY + 10);
    doc.line(15, currentY + 12, 200, currentY + 12);

    currentY += 20;

    service?.forEach((s) => {
      currentY = addNewPageIfNeeded(currentY);
      doc.setFontSize(9);
      doc.text(`Service: ${s?._id}`, 15, currentY);
      doc.text(`Total Appointments: ${s?.appointmentCount}`, 15, currentY + 10);
      currentY += 20;
    });

    currentY = addNewPageIfNeeded(currentY);
    doc.line(15, currentY + 5, 200, currentY + 5);

    currentY = addNewPageIfNeeded(currentY);
    if (appointmentSales?.total) {
      doc.setFontSize(12);
      doc.text(`Total Sales: ${appointmentSales?.total}`, 15, currentY + 15);
    }

    doc.save("AllReports.pdf");
  };

  return (
    <>
      <button
        onClick={allReportsPDF}
        className="xl:px-6 md:px-4 m-2 font-medium capitalize rounded-lg xl:text-xl lg:text-base md:text-[1rem] btn btn-primary text-light-default dark:text-dark-default"
      >
        APPOINTMENT REPORTS
      </button>
    </>
  );
}
