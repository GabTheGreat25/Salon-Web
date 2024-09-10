import { useGetCustomerAppointmentQuery } from "@api";

import jsPDF from "jspdf";
import "jspdf-autotable";

export default function () {
  const { data: customerAppoint } = useGetCustomerAppointmentQuery();
  const customer = customerAppoint?.details || [];

  const generateAppointmentCustomerPDF = () => {
    const doc = new jsPDF();

    const title = "Lhanlee Beauty Lounge";
    const address = "22 Calleja St., Central Signal Village, Taguig City";
    const phone = "+63956 802 8031";
    const reportTitle = "Appointment Customers Report";

    doc.setFontSize(16);
    doc.text(title, 15, 20);

    doc.setFontSize(12);
    doc.text(address, 15, 30);
    doc.text(phone, 15, 40);

    doc.setFontSize(14);
    doc.text(reportTitle, 15, 50);

    const tableData = customer?.flatMap((c) =>
      c?.customers.map((c) => [
        c?.name,
        c?.description,
        c?.beautician,
        new Date(c?.appointmentDate).toLocaleDateString(),
        c?.appointmentTime.join(", "),
        c?.serviceName,
      ])
    );

    doc.autoTable({
      head: [
        [
          "Customer Name",
          "Customer Description",
          "Beautician",
          "Appointment Date",
          "Appointment Time",
          "Service Name",
        ],
      ],
      body: tableData,
      startY: 60,
    });

    doc.text(
      `Customer Description Reports`,
      15,
      doc.autoTable.previous.finalY + 10
    );
    doc.text(
      `Customer Description: ${customer[0]?.description}`,
      15,
      doc.autoTable.previous.finalY + 20
    );
    doc.text(
      `Appointment Count: ${customer[0]?.count}`,
      15,
      doc.autoTable.previous.finalY + 30
    );

    doc.save("customerAppointment.pdf");
  };

  return (
    <div className="mx-2 border bg-primary-default p-4  m-2 mb-8 rounded-lg shadow h-72 w-72 overflow-y-auto">
      <h3 className="text-lg font-bold mb-4">Customer Description Reports</h3>
      {customer?.map((c) => (
        <div key={c._id} className="mb-4">
          <h4 className="text-md font-semibold">
            Customer Description: {c?.description}
          </h4>

          <div className="flex justify-between">
            <div className="flex-1 mr-4">
              <p>Total Appointments: {c?.count}</p>
            </div>
          </div>
          <hr className="my-2" />
        </div>
      ))}
      <button
        onClick={generateAppointmentCustomerPDF}
        className="xl:px-6 md:px-4 font-medium capitalize rounded-lg xl:text-xl lg:text-base md:text-[1rem] btn btn-primary text-dark-default light:text-light-default"
      >
        GENERATE PDF
      </button>
    </div>
  );
}
