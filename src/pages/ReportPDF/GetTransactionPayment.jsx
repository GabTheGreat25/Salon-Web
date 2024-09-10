import { useGetTransactionPaymentQuery } from "@api";

import jsPDF from "jspdf";
import "jspdf-autotable";

export default function () {
  const { data: paymentData } = useGetTransactionPaymentQuery();
  const payment = paymentData?.details || [];

  const generatePaymentMethodPDF = () => {
    const doc = new jsPDF();

    const title = "Lhanlee Beauty Lounge";
    const address = "22 Calleja St., Central Signal Village, Taguig City";
    const phone = "+63956 802 8031";
    const reportTitle = "Appointment Payment Method Reports";

    doc.setFontSize(16);
    doc.text(title, 15, 20);

    doc.setFontSize(12);
    doc.text(address, 15, 30);
    doc.text(phone, 15, 40);

    doc.setFontSize(14);
    doc.text(reportTitle, 15, 50);

    const tableData =
      payment?.flatMap((p) =>
        p?.appointments?.map((a) => [
          a?.customerName,
          a?.beautician,
          new Date(a?.date).toLocaleDateString(),
          a?.time.join(", "),
          a?.serviceName,
          a?.paymentMethod,
        ])
      ) || [];

    doc.autoTable({
      head: [
        [
          "Customer Name",
          "Beautician",
          "Appointment Date",
          "Appointment Time",
          "Service Name",
          "Payment Method",
        ],
      ],
      body: tableData,
      startY: 60,
    });

    const paymentSummary =
      payment?.reduce((acc, p) => {
        if (!acc[p?._id]) {
          acc[p?._id] = 0;
        }
        acc[p?._id] += p?.count;
        return acc;
      }, {}) || {};

    const summaryData = Object.entries(paymentSummary)?.map(
      ([method, count]) => [method, count]
    );

    doc.autoTable({
      head: [["Payment Method", "Total Counts"]],
      body: summaryData,
      startY: doc.previousAutoTable.finalY + 10,
    });

    doc.save("AppointmentPaymentMethodReport.pdf");
  };

  return (
    <div className="mx-2 border bg-primary-default p-4  m-2 mb-8 rounded-lg shadow h-72 w-72 overflow-y-auto">
      <h3 className="text-lg font-bold mb-4">
        Transaction Payment Method Report
      </h3>
      {payment?.map((p) => (
        <div key={p?._id} className="mb-4">
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
        className="xl:px-6 md:px-4 font-medium capitalize rounded-lg xl:text-xl lg:text-base md:text-[1rem] btn btn-primary text-dark-default light:text-light-default"
      >
        GENERATE PDF
      </button>
    </div>
  );
}
