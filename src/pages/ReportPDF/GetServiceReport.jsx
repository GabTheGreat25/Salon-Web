import { useGetServiceTypeQuery } from "@api";

import jsPDF from "jspdf";
import "jspdf-autotable";

export default function () {
  const { data: serviceData } = useGetServiceTypeQuery();
  const service = serviceData?.details || [];

  const generateServiceAppointmentPDF = () => {
    const doc = new jsPDF();

    const title = "Lhanlee Beauty Lounge";
    const address = "22 Calleja St., Central Signal Village, Taguig City";
    const phone = "+63956 802 8031";
    const reportTitle = "Service Appointment Reports";

    doc.setFontSize(16);
    doc.text(title, 15, 20);

    doc.setFontSize(12);
    doc.text(address, 15, 30);
    doc.text(phone, 15, 40);

    doc.setFontSize(14);
    doc.text(reportTitle, 15, 50);

    const tableData =
      service?.flatMap((s) =>
        s?.customers?.map((c) => [
          c.name,
          new Date(c?.date).toISOString().split("T")[0],
          c?.beautician,
          c?.service_name,
          s?._id[0],
        ])
      ) || [];

    doc.autoTable({
      head: [
        [
          "Customer",
          "Appointment Date",
          "Beautician",
          "Service Name",
          "Service Type",
        ],
      ],
      body: tableData,
      startY: 60,
    });

    const secondTableData =
      service?.map((s) => [s?._id[0], s?.appointmentCount]) || [];

    doc.autoTable({
      head: [["Service Type", "Total Appointments"]],
      body: secondTableData,
      startY: doc.lastAutoTable.finalY + 10,
    });

    doc.save("serviceAppointments.pdf");
  };

  return (
    <div className="mx-2 border bg-primary-default p-4  m-2 mb-8 rounded-lg shadow h-72 w-72 overflow-y-auto">
      <h3 className="text-lg font-bold mb-4">Service Appointments Report</h3>
      <div className="flex flex-col items-center justify-between">
        {service?.map((s) => (
          <div key={s?._id} className="mb-4">
            <h4 className="text-md font-semibold">{s?._id}</h4>

            <div className="flex justify-between">
              <div className="flex-1 mr-4">
                <p>Total Appointments: {s?.appointmentCount}</p>
              </div>
            </div>
            <hr className="my-2" />
          </div>
        ))}
        <div>
          <button
            onClick={generateServiceAppointmentPDF}
            className="xl:px-6 md:px-4 font-medium capitalize rounded-lg xl:text-xl lg:text-base md:text-[1rem] btn btn-primary text-dark-default light:text-light-default"
          >
            GENERATE PDF
          </button>
        </div>
      </div>
    </div>
  );
};
