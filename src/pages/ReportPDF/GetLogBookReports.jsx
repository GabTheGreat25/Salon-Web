import { useGetLogBookReportQuery, useGetEquipmentReportQuery } from "@api";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function () {
  const { data: logbookData } = useGetLogBookReportQuery();
  const logbook = logbookData?.details || [];

  const { data: equipmentReport } = useGetEquipmentReportQuery();
  const equipments = equipmentReport?.details || [];

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

  const logbookPDF = () => {
    const doc = new jsPDF();

    const title = "Lhanlee Beauty Lounge";
    const address = "22 Calleja St., Central Signal Village, Taguig City";
    const phone = "+63956 802 8031";
    const reportTitle = "Equipment Reports";

    const xPosition = 15;

    doc.setFontSize(16);
    doc.text(title, xPosition, 20);

    doc.setFontSize(12);
    doc.text(address, xPosition, 30);
    doc.text(phone, xPosition, 40);

    doc.setFontSize(14);
    doc.text(reportTitle, xPosition, 60);

    const headers = [
      "Equipment Name",
      "Total Missing",
      "Total Damage",
      "Total Borrowed",
    ];

    const tableData = equipments?.map((equipment) => [
      equipment.equipmentName,
      equipment.totalMissing,
      equipment.totalDamage,
      equipment.totalBorrowed,
    ]);

    doc.autoTable({
      head: [headers],
      body: tableData,
      startY: 70,
    });

    doc.save("equipments.pdf");
  };

  return (
    <div className="mx-2 border bg-primary-default p-4 m-2 mb-8 rounded-lg shadow h-72 w-72 overflow-y-auto">
      <h3 className="text-lg font-bold mb-4">Equipment Reports</h3>
      <div className="mb-4">
        <div className="flex justify-between">
          <div className="flex-1 mr-4">
            {equipments?.map((e, index) => (
              <div key={index} className="mb-4">
                <h4 className="font-semibold">{e?.equipmentName}</h4>
                <p>Total Missing: {e?.totalMissing}</p>
                <p>Total Damage: {e?.totalDamage}</p>
                <p>Total Borrowed: {e?.totalBorrowed}</p>
              </div>
            ))}
          </div>
        </div>
        <hr className="my-2" />
      </div>
      <button
        onClick={logbookPDF}
        className="xl:px-6 md:px-4 font-medium capitalize rounded-lg xl:text-xl lg:text-base md:text-[1rem] btn btn-primary text-dark-default light:text-light-default"
      >
        GENERATE PDF
      </button>
    </div>
  );
}
