import { useGetAppointmentSaleQuery } from "@api";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function () {
  const { data: sales } = useGetAppointmentSaleQuery();
  const appointmentSales = sales?.details || [];

  const generateSalesPDF = () => {
    const doc = new jsPDF();

    const title = "Lhanlee Beauty Lounge";
    const address = "22 Calleja St., Central Signal Village, Taguig City";
    const phone = "+63956 802 8031";
    const reportTitle = "Lhanlee Salon Appointment Sales Report";

    doc.setFontSize(16);
    doc.text(title, 15, 20);

    doc.setFontSize(12);
    doc.text(address, 15, 30);
    doc.text(phone, 15, 40);

    doc.setFontSize(14);
    doc.text(reportTitle, 15, 50);

    const headers = [
      "Customer Name",
      "Beautician",
      "Appointment Date",
      "Appointment Time",
      "Service",
      "Payment",
      "Price",
    ];

    const tableData = appointmentSales?.appointments?.map((a) => [
      a?.customer,
      a?.beautician,
      new Date(a?.date).toLocaleDateString(),
      a?.time.join(", "),
      a?.service,
      a?.paymentMethod,
      a?.price,
    ]);

    doc.autoTable({
      head: [headers],
      body: tableData,
      startY: 60,
    });

    const finalY = doc.autoTable.previous.finalY;

    doc.setFontSize(12);
    doc.text(`Total Sales: ${appointmentSales?.total}`, 15, finalY + 10);

    doc.save("AppointmentSalesReport.pdf");
  };

  return (
    <div className="mx-2 border bg-primary-default p-4 m-2 mb-8 rounded-lg shadow h-72 w-72 overflow-y-auto">
      <h3 className="text-lg font-bold mb-4">Service Appointments Sales</h3>
      <div className="mb-4">
        <p>Appointment Total Sales: {appointmentSales?.total}</p>
      </div>

      <button
        onClick={generateSalesPDF}
        className="xl:px-6 md:px-4 font-medium capitalize rounded-lg xl:text-xl lg:text-base md:text-[1rem] btn btn-primary text-dark-default light:text-light-default"
      >
        GENERATE PDF
      </button>
    </div>
  );
}
