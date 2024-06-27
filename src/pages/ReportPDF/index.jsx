import { react } from "react";
import {
  useGetServiceTypeQuery,
  useGetCustomerAppointmentQuery,
  useGetLogBookReportQuery,
  useGetEquipmentReportQuery,
  useGetAppointmentReportQuery,
  useGetAppointmentSaleQuery,
  useGetDeliveryReportQuery,
  useGetTransactionPaymentQuery,
  useGetBrandProductQuery,
  useGetAllAppointmentReportsQuery,
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

  const { data: equipmentReport } = useGetEquipmentReportQuery();
  const equipments = equipmentReport?.details || [];

  const { data: allAppointmentReports } = useGetAllAppointmentReportsQuery();
  const reports = allAppointmentReports?.details || [];

  const { data: appointmentData } = useGetAppointmentReportQuery();
  const appointment = appointmentData?.details;

  const { data: sales } = useGetAppointmentSaleQuery();
  const appointmentSales = sales?.details;

  const { data: brandData } = useGetBrandProductQuery();
  const brand = brandData?.details;

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
        c.name,
        c.description,
        c.serviceName,
        r.type.join(", "),
        c.price,
        r.date, 
        c?.time.join(", "),
        c.paymentMethod,
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
  
    const customerData = customer.map((c) => ({
      description: c.description,
      count: c.count,
    }));
  
    let currentY = finalY + 30;
  
    customerData.forEach((c) => {
      currentY = addNewPageIfNeeded(currentY);
      doc.setFontSize(9);
      doc.text(`Customer Description: ${c.description}`, 15, currentY);
      doc.text(`Appointment Count: ${c.count}`, 15, currentY + 10);
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
      doc.text(`Completed Appointments: ${a.completed}`, 15, currentY);
      doc.text(`Pending Appointments: ${a.pending}`, 15, currentY + 10);
      doc.text(`Cancelled Appointments: ${a.cancelled}`, 15, currentY + 20);
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
      doc.text(`Payment Method: ${p._id}`, 15, currentY);
      doc.text(`Total Count: ${p.count}`, 15, currentY + 10);
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
      doc.text(`Service: ${s._id}`, 15, currentY);
      doc.text(`Total Appointments: ${s.appointmentCount}`, 15, currentY + 10);
      currentY += 20; 
    });
  
    currentY = addNewPageIfNeeded(currentY);
    doc.line(15, currentY + 5, 200, currentY + 5); 
  
    currentY = addNewPageIfNeeded(currentY);
    if (appointmentSales?.total) {
      doc.setFontSize(12);
      doc.text(`Total Sales: ${appointmentSales.total}`, 15, currentY + 15);
    }
  
    doc.save("AllReports.pdf");
  };
  

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
          c?.service_name,
          s._id[0],
        ])
      ) || [];

    doc.autoTable({
      head: [["Customer", "Appointment Date", "Service Name", "Service Type"]],
      body: tableData,
      startY: 60,
    });

    const secondTableData =
      service?.map((s) => [s._id[0], s.appointmentCount]) || [];

    doc.autoTable({
      head: [["Service Type", "Total Appointments"]],
      body: secondTableData,
      startY: doc.lastAutoTable.finalY + 10,
    });

    doc.save("serviceAppointments.pdf");
  };

  const test = customer?.map((c) => {
    c?.customers
  });


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
    c?.customers.map(c => [
      c?.name,
      c?.description,
      new Date(c?.appointmentDate).toLocaleDateString(),
      c?.appointmentTime.join(", "),
      c?.serviceName,
    ])
  );

    doc.autoTable({
      head: [["Customer Name", "Customer Description", "Appointment Date", "Appointment Time", "Service Name"]],  
      body: tableData,
      startY: 60,
    });

    doc.text(`Customer Description Reports`, 15, doc.autoTable.previous.finalY + 10);
    doc.text(`Customer Description: ${customer[0]?.description}`, 15, doc.autoTable.previous.finalY + 20);
    doc.text(`Appointment Count: ${customer[0]?.count}`, 15, doc.autoTable.previous.finalY + 30);

    doc.save("customerAppointment.pdf");
  };

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

    const tableData = equipments.map((equipment) => [
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
      a?.statuses?.flatMap(status =>
        status?.appointments?.map((a) => [
          status?.status,
          new Date(a?.date).toLocaleDateString(),
          a?.time.join(", "),  
          a?.customerName,
          a?.serviceName
        ])
      )
    );
  
    doc.autoTable({
      head: [["Appointment Status", "Appointment Date", "Appointment Time", "Customer Name", "Service Name"]],
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
        count: s.count
      }))
    );
  
    const summaryData = statusSummary.map((sum) => [
      sum?.status,
      sum?.count
    ]);
  
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
      "Appointment Date",
      "Appointment Time",
      "Service",
      "Payment",
      "Price",
    ];

    const tableData = appointmentSales?.appointments?.map((a) => [
      a?.customer.join(", "),
      new Date(a?.date).toLocaleDateString(),
      a?.time.join(", "),
      a?.service.join(", "),
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
      head: [["Delivery Date", "Product Name", "Product Type", "Status", "Payment", "No. of Deliveries"]],
      body: tableData,
      startY: 60,
    });

    doc.save("DeliveryReports.pdf");
  };

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
          new Date(a.date).toLocaleDateString(),
          a?.time.join(", "),
          a?.serviceName,
          a?.paymentMethod,
        ])
      ) || [];

    doc.autoTable({
      head: [["Customer Name", "Appointment Date", "Appointment Time", "Service Name", "Payment Method"]],
      body: tableData,
      startY: 60,
    });

    const paymentSummary =
      payment?.reduce((acc, p) => {
        if (!acc[p._id]) {
          acc[p._id] = 0;
        }
        acc[p._id] += p.count;
        return acc;
      }, {}) || {};

    const summaryData = Object.entries(paymentSummary).map(
      ([method, count]) => [method, count]
    );

    doc.autoTable({
      head: [["Payment Method", "Total Counts"]],
      body: summaryData,
      startY: doc.previousAutoTable.finalY + 10,
    });

    doc.save("AppointmentPaymentMethodReport.pdf");
  };

  const generateBrandReportsPDF = () => {
    const doc = new jsPDF();

    const title = "Lhanlee Beauty Lounge";
    const address = "22 Calleja St., Central Signal Village, Taguig City";
    const phone = "+63956 802 8031";
    const reportTitle = "Product Brand Reports";

    doc.setFontSize(16);
    doc.text(title, 15, 20);

    doc.setFontSize(12);
    doc.text(address, 15, 30);
    doc.text(phone, 15, 40);

    doc.setFontSize(14);
    doc.text(reportTitle, 15, 50);

    const tableData = brand?.map((p) => [p?.brandName, p?.productCount]) || [];

    doc.autoTable({
      head: [["Brand Name", "No. of Products"]],
      body: tableData,
      startY: 60,
    });

    doc.save("BrandReports.pdf");
  };

  const generalReportPDF = () => {
    const doc = new jsPDF();

    const title = "Lhanlee Beauty Lounge";
    const address = "22 Calleja St., Central Signal Village, Taguig City";
    const phone = "+63956 802 8031";
    const reportTitle = "Lhanlee Salon General Reports";

    const titleFontSize = 16;
    const titleWidth = doc.getTextWidth(title);
    const xPosition = (doc.internal.pageSize.getWidth() - titleWidth) / 2;
    const yPosition = 25;

    doc.setFontSize(titleFontSize);
    doc.text(title, xPosition, yPosition);

    const infoFontSize = 12;
    doc.setFontSize(infoFontSize);
    doc.text(address, 15, yPosition + titleFontSize + 10);
    doc.text(phone, 15, yPosition + titleFontSize + 20);

    const reportTitleFontSize = 14;
    doc.setFontSize(reportTitleFontSize);
    doc.text(reportTitle, 15, yPosition + titleFontSize + 40);

    const tableStartY = yPosition + titleFontSize + 60;

    doc.autoTable({
      startY: tableStartY,
      head: [["Customer Description", "Total Appointments"]],
      body:
        customer?.map((customerItem) => [
          customerItem?._id,
          customerItem?.count,
        ]) || [],
    });

    doc.autoTable({
      startY: doc.previousAutoTable.finalY + 10,
      head: [["Appointment Service Type", "Total Appointments"]],
      body: service?.map((s) => [s?._id, s?.count]) || [],
    });

    doc.autoTable({
      startY: doc.previousAutoTable.finalY + 10,
      head: [["Appointment Status", "Total Appointments"]],
      body: appointment?.map((a) => [a?._id, a?.count]) || [],
    });

    // doc.autoTable({
    //   startY: doc.previousAutoTable.finalY + 10,
    //   head: [["Total Appointments Sales"]],
    //   body: appointmentSales?.map((a) => [a?.total]) || [],
    // });

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
                  <p>Total Appointments: {s?.appointmentCount}</p>
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
              {equipments.map((equipment, index) => (
                <div key={index} className="mb-4">
                  <h4 className="font-semibold">{equipment.equipmentName}</h4>
                  <p>Total Missing: {equipment.totalMissing}</p>
                  <p>Total Damage: {equipment.totalDamage}</p>
                  <p>Total Borrowed: {equipment.totalBorrowed}</p>
                </div>
              ))}
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
          className="xl:px-6 md:px-4 font-medium capitalize rounded-lg xl:text-xl lg:text-base md:text-[1rem] btn btn-primary text-light-default dark:text-dark-default"
        >
          GENERATE PDF
        </button>
      </div>

      <div className="mx-2 border bg-primary-default p-4 m-2 mb-8 rounded-lg shadow h-72 w-72 overflow-y-auto">
        <h3 className="text-lg font-bold mb-4">Service Appointments Sales</h3>
        <div className="mb-4">
          <p>Appointment Total Sales: {appointmentSales?.total}</p>
        </div>

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
              {`${d?.type} (${d?.status})`}
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
        <h3 className="text-lg font-bold mb-4">
          Transaction Payment Method Report
        </h3>
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
        onClick={allReportsPDF}
        className="xl:px-6 md:px-4 m-2 font-medium capitalize rounded-lg xl:text-xl lg:text-base md:text-[1rem] btn btn-primary text-light-default dark:text-dark-default"
      >
        APPOINTMENT REPORTS
      </button>
    </div>
  );
}
