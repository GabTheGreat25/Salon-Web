import { useGetDeliveryReportQuery, useGetDeliveryTypeCountQuery } from "@api";

import jsPDF from "jspdf";
import "jspdf-autotable";

export default function () {
  const { data: deliveryData } = useGetDeliveryReportQuery();
  const delivery = deliveryData?.details || [];

  const { data: deliveryCountData } = useGetDeliveryTypeCountQuery();
  const count = deliveryCountData?.details || [];

  const generateDeliveryPDF = () => {
    const doc = new jsPDF();

    const title = "Lhanlee Beauty Lounge";
    const address = "22 Calleja St., Central Signal Village, Taguig City";
    const phone = "+63956 802 8031";
    const reportTitle = "Delivery Reports";

    doc.setFontSize(16);
    doc.text(title, 15, 20);

    doc.setFontSize(12);
    doc.text(address, 15, 30);
    doc.text(phone, 15, 40);

    doc.setFontSize(14);
    doc.text(reportTitle, 15, 50);

    const tableData =
      delivery?.map((d) => [
        new Date(d?.date).toLocaleDateString(),
        d?.product,
        d?.type,
        d?.status,
        d?.payment ? d?.payment : "No payment",
        d?.count,
      ]) || [];

    doc.autoTable({
      head: [
        [
          "Delivery Date",
          "Product Name",
          "Product Type",
          "Status",
          "Payment",
          "No. of Deliveries",
        ],
      ],
      body: tableData,
      startY: 60,
    });

    doc.save("DeliveryReports.pdf");
  };

  return (
    <div className="mx-2 border bg-primary-default p-4  m-2 mb-8 rounded-lg shadow h-72 w-72 overflow-y-auto">
      <h3 className="text-lg font-bold mb-4">Delivery Product Report</h3>
      {count?.map((d, index) => (
        <div key={index} className="mb-4">
          <h4 className="text-md font-semibold">
            {`${d?.type}`}
          </h4>

          <div className="flex justify-between">
            <div className="flex-1 mr-4">
              <p>No. of Deliveries: {d?.totalCount}</p>
            </div>
          </div>
          <hr className="my-2" />
        </div>
      ))}
      <button
        onClick={generateDeliveryPDF}
        className="xl:px-6 md:px-4 font-medium capitalize rounded-lg xl:text-xl lg:text-base md:text-[1rem] btn btn-primary text-dark-default light:text-light-default"
      >
        GENERATE PDF
      </button>
    </div>
  );
}
