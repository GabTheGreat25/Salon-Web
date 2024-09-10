import { useGetAppointmentReportQuery } from "@api";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function () {
  const { data: appointmentData } = useGetAppointmentReportQuery();
  const appointment = appointmentData?.details || [];

  const generateAppointmentStatusPDF = () => {
    const doc = new jsPDF();

    const title = "Lhanlee Beauty Lounge";
    const address = "22 Calleja St., Central Signal Village, Taguig City";
    const phone = "+63956 802 8031";
    const reportTitle = "Appointment Status Reports";

    doc.setFontSize(16);
    doc.text(title, 15, 20);

    doc.setFontSize(12);
    doc.text(address, 15, 30);
    doc.text(phone, 15, 40);

    doc.setFontSize(14);
    doc.text(reportTitle, 15, 50);

    const tableData = appointment.flatMap((a) =>
      a?.statuses?.flatMap((status) =>
        status?.appointments?.map((a) => [
          status?.status,
          new Date(a?.date).toLocaleDateString(),
          a?.time.join(", "),
          a?.customerName,
          a?.beautician,
          a?.serviceName,
        ])
      )
    );

    doc.autoTable({
      head: [
        [
          "Appointment Status",
          "Appointment Date",
          "Appointment Time",
          "Customer Name",
          "Beautician",
          "Service Name",
        ],
      ],
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

    const finalY = doc.previousAutoTable.finalY + 10;

    doc.setFontSize(14);
    doc.text("Appointment Status Summary", 15, finalY);

    const statusSummary = appointment?.flatMap((a) =>
      a?.statuses?.map((s) => ({
        status: s.status,
        count: s.count,
      }))
    );

    const summaryData = statusSummary?.map((sum) => [sum?.status, sum?.count]);

    doc.autoTable({
      head: [["Appointment Status", "Total Counts"]],
      body: summaryData,
      startY: finalY + 10,
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

    const finalSummaryY = doc.previousAutoTable.finalY + 10;
    doc.setFontSize(12);

    doc.save("AppointmentReports.pdf");
  };
  return (
    <div className="mx-2 border bg-primary-default p-4  mb-8 rounded-lg shadow h-72 w-72 overflow-y-auto">
      <h3 className="text-lg font-bold mb-4">Appointments Status Report</h3>
      {appointment?.map((a) => (
        <div key={a?._id} className="mb-4">
          <h4 className="text-md font-semibold m-1">
            Completed Appointments: {a?.completed}
          </h4>
          <h4 className="text-md font-semibold m-1">
            Pending Appointments: {a?.pending}
          </h4>
          <h4 className="text-md font-semibold m-1">
            Cancelled Appointments: {a?.cancelled}
          </h4>
          <hr className="my-2" />
        </div>
      ))}
      <button
        onClick={generateAppointmentStatusPDF}
        className="xl:px-6 md:px-4 font-medium capitalize rounded-lg xl:text-xl lg:text-base md:text-[1rem] btn btn-primary text-dark-default light:text-light-default"
      >
        GENERATE PDF
      </button>
    </div>
  );
}
