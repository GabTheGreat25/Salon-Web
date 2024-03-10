import React, { useEffect } from "react";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useParams } from "react-router-dom";
import { RandomServicesSidebar } from "@/components";
import { useGetTransactionByIdQuery } from "@api";
import { FadeLoader } from "react-spinners";
import jsPDF from "jspdf";

export default function () {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, isLoading } = useGetTransactionByIdQuery(id);
  const { appointment } = data?.details || {};

  const goBack = () => window.history.back();
  const home = () => navigate("/customer/history");

  const totalPrice = appointment?.service?.reduce(
    (acc, service) => acc + (service?.price || 0),
    0
  );
  const extraFeePrice = appointment?.option?.reduce(
    (acc, option) => acc + (option?.extraFee || 0),
    0
  );

  const TotalFee = totalPrice + extraFeePrice;

  const hasDiscount = data?.details?.hasDiscount;

  const generatePDF = () => {
    const doc = new jsPDF();

    const hexToRgb = (hex) => {
      hex = hex.replace(/^#/, "");
      const bigint = parseInt(hex, 16);
      const r = (bigint >> 16) & 255;
      const g = (bigint >> 8) & 255;
      const b = bigint & 255;
      return [r, g, b];
    };

    const pinkColor = hexToRgb("#FFB6C1");
    doc.setFillColor(pinkColor[0], pinkColor[1], pinkColor[2]);
    doc.rect(
      0,
      0,
      doc.internal.pageSize.width,
      doc.internal.pageSize.height,
      "F"
    );

    const qrCodeBase64 = data?.details?.qrCode || "";
    doc.addImage(qrCodeBase64, "PNG", 15, 15, 35, 35);

    doc.setTextColor(33, 33, 33);
    doc.setFont("times", "bold");
    doc.setFontSize(22);
    doc.text("Lhanlee Salon", 105, 25, { align: "center" });

    const appointmentDate = new Date(
      data?.details.appointment?.date
    ).toLocaleDateString();
    const appointmentTimes = data?.details.appointment?.time;
    let appointmentTime;

    if (Array.isArray(appointmentTimes) && appointmentTimes.length > 0) {
      if (appointmentTimes.length === 1) {
        appointmentTime = appointmentTimes[0];
      } else {
        appointmentTime = `${appointmentTimes[0]} to ${
          appointmentTimes[appointmentTimes.length - 1]
        }`;
      }
    }

    doc.setTextColor(33, 33, 33);
    doc.setFont("times", "normal");
    doc.setFontSize(14);
    doc.text(`Date: ${appointmentDate}`, 145, 20);
    doc.text(`Time: ${appointmentTime}`, 145, 30);

    doc.setFont("times", "bold");
    doc.setFontSize(18);
    doc.text("Transaction Receipt", 105, 75, { align: "center" });

    doc.setFont("times", "normal");
    doc.setFontSize(16);
    doc.text("Services:", 20, 105);
    let yOffset = 120;
    let maxServiceWidth = 0;
    const serviceColumns =
      data?.details.appointment?.service?.length > 1 ? 2 : 1;
    const serviceColumnWidth = 100;
    data?.details.appointment?.service?.forEach((service, index) => {
      const currentColumn = Math.floor(
        index / (data.details.appointment.service.length / serviceColumns)
      );
      const xPos = 30 + serviceColumnWidth * currentColumn;
      const yPos =
        yOffset +
        15 *
          (index % (data.details.appointment.service.length / serviceColumns));
      const width = doc.getTextWidth(`- ${service?.service_name}`);
      if (width > maxServiceWidth) {
        maxServiceWidth = width;
      }
      doc.text(`- ${service?.service_name}`, xPos, yPos);
    });

    doc.text(
      "Add Ons:",
      20,
      yOffset +
        15 *
          Math.ceil(
            data?.details.appointment?.service?.length / serviceColumns
          ) +
        10
    );
    let maxOptionWidth = 0;
    const optionColumns = data?.details.appointment?.option?.length > 1 ? 2 : 1;
    const optionColumnWidth = 100;
    const optionYOffset =
      yOffset +
      20 *
        Math.ceil(data?.details.appointment?.service?.length / serviceColumns) +
      20;
    data?.details.appointment?.option?.forEach((option, index) => {
      const currentColumn = Math.floor(
        index / (data.details.appointment.option.length / optionColumns)
      );
      const xPos = 30 + optionColumnWidth * currentColumn;
      const yPos =
        optionYOffset +
        15 * (index % (data.details.appointment.option.length / optionColumns));
      const width = doc.getTextWidth(`- ${option?.option_name}`);
      if (width > maxOptionWidth) {
        maxOptionWidth = width;
      }
      doc.text(`- ${option?.option_name}`, xPos, yPos);
    });

    doc.setLineWidth(0.5);
    const horizontalLineY =
      optionYOffset +
      15 * Math.ceil(data?.details.appointment?.option?.length / optionColumns);
    doc.line(10, horizontalLineY, 200, horizontalLineY);

    const totalCost =
      data?.details.appointment?.hasAppointmentFee === true
        ? TotalFee - (hasDiscount ? TotalFee * 0.2 : 0) - 150
        : TotalFee - (hasDiscount ? TotalFee * 0.2 : 0);

    doc.setFont("times", "normal");
    doc.setFontSize(14);
    const paymentX = 150;
    const paymentY = horizontalLineY + 10;
    doc.text(`Payment: ${data?.details?.payment}`, paymentX, paymentY + 10);
    doc.text(`Total Cost: ${totalCost.toFixed(0)} PHP`, paymentX, paymentY);

    doc.setTextColor(33, 33, 33);
    doc.setFont("times", "italic");
    doc.setFontSize(16);
    const thankYouY = paymentY + 35;
    doc.text(
      `Thank you for choosing us, ${data?.details.appointment?.customer?.name}!`,
      105,
      thankYouY,
      {
        align: "center",
      }
    );

    const beauticianNames = data?.details.appointment?.beautician?.map(
      (beautician) => beautician.name
    );

    if (beauticianNames && beauticianNames.length > 0) {
      doc.setFont("times", "normal");
      doc.setFontSize(14);

      const maxBeauticiansPerRow = 3;
      const beauticianWidth = 52;

      let currentY = horizontalLineY + 10;
      let currentX = 20;
      let columnCount = 0;

      beauticianNames.forEach((beauticianName, index) => {
        if (columnCount === maxBeauticiansPerRow) {
          currentY += 10;
          currentX = 20;
          columnCount = 0;
        }

        const text =
          columnCount === 0
            ? `Beautician: ${beauticianName}`
            : `, ${beauticianName}`;
        doc.text(text, currentX, currentY);

        currentX += beauticianWidth;
        columnCount++;
      });
    }

    doc.save("receipt.pdf");
  };

  useEffect(() => {
    if (data) {
      generatePDF();
    }
  }, [data]);

  return (
    <>
      {isLoading ? (
        <div className="loader">
          <FadeLoader color="#FFB6C1" loading={true} size={50} />
        </div>
      ) : (
        <>
          <div className="grid h-full grid-cols-[70%_30%]">
            <div className="flex-grow">
              <div className="grid items-center justify-center grid-flow-col-dense w-fit">
                <button className="p-10 text-3xl w-fit" onClick={goBack}>
                  <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <h1 className="text-3xl">Receipt</h1>
              </div>
              <div className="grid grid-flow-row-dense px-10 gap-y-8">
                {appointment?.service?.map((serviceData, index) => (
                  <div
                    key={index}
                    className="flex items-center px-8 py-6 rounded-lg bg-primary-default"
                  >
                    <div className="flex-grow">
                      <h2 className="pb-2 font-sans font-semibold lg:text-2xl md:text-base">
                        {`Lhanlee Salon | ${
                          (appointment?.date || "").split("T")[0]
                        }`}
                      </h2>
                      <hr className="mb-4 border-t border-dark-default dark:border-light-default" />
                      <div className="grid px-8">
                        <div className="grid xl:grid-cols-[25%_75%] md:grid-cols-[30%_70%] gap-x-2">
                          <div className="grid items-center justify-center">
                            {serviceData?.image &&
                              serviceData.image.length > 0 && (
                                <img
                                  className="object-cover 2xl:w-32 xl:w-28 xl:h-24 lg:w-20 lg:h-16 2xl:h-32 md:w-16 md:h-14 rounded-2xl"
                                  src={
                                    serviceData.image[
                                      Math.floor(
                                        Math.random() * serviceData.image.length
                                      )
                                    ]?.url
                                  }
                                  alt={
                                    serviceData.image[
                                      Math.floor(
                                        Math.random() * serviceData.image.length
                                      )
                                    ]?.originalname
                                  }
                                  key={
                                    serviceData.image[
                                      Math.floor(
                                        Math.random() * serviceData.image.length
                                      )
                                    ]?.public_id
                                  }
                                />
                              )}
                          </div>
                          <div>
                            <div className="grid grid-flow-col-dense">
                              <p className="font-semibold xl:text-lg lg:text-base md:text-sm">
                                Service: {serviceData.service_name}
                              </p>
                            </div>
                            <div className="grid grid-flow-col-dense">
                              <p className="font-semibold xl:text-lg lg:text-base md:text-sm">
                                Add Ons:
                                {appointment?.option
                                  ?.filter((option) =>
                                    option.service.some(
                                      (serv) => serv._id === serviceData._id
                                    )
                                  )
                                  .map((optionData, optionIndex, array) => (
                                    <span key={optionIndex} className="ml-2">
                                      {optionData.option_name} - ₱{" "}
                                      {optionData.extraFee}
                                      {optionIndex !== array.length - 1 && ","}
                                    </span>
                                  ))}
                                {appointment?.option?.filter((option) =>
                                  option.service.some(
                                    (serv) => serv._id === serviceData._id
                                  )
                                ).length === 0 && " None"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr className="my-4 border-t border-dark-default dark:border-light-default" />
                      <div className="grid justify-end gap-x-4">
                        <h1 className="text-xl">
                          Service Total:
                          <span className="pl-2 font-semibold">
                            ₱ {serviceData?.price}
                          </span>
                        </h1>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-flow-row-dense pb-10 pr-10 pt-28 gap-y-6">
              <div className="grid items-center justify-center">
                <div className="pb-8">
                  <img src={data?.details?.qrCode} alt="qrCode" />
                </div>
              </div>
              <div className="w-full h-full">
                <div className="grid grid-flow-row-dense">
                  <div className="px-8 py-10 rounded-lg bg-primary-default">
                    <div className="grid grid-flow-col-dense gap-x-8">
                      <span>
                        <h1 className="font-semibold xl:text-xl lg:text-lg md:text-base">
                          Order Summary
                        </h1>
                      </span>
                      <span className="text-end">
                        <h1>₱ {totalPrice}</h1>
                      </span>
                    </div>
                    <h1 className="pt-1 pb-10">
                      Subtotal ({appointment?.service?.length} items)
                    </h1>
                    <div className="grid grid-flow-col-dense gap-x-8">
                      <span>
                        <h1 className="font-semibold xl:text-xl lg:text-lg md:text-base">
                          Extra Fee
                        </h1>
                      </span>
                      <span className="text-end">
                        <h1>₱ {extraFeePrice}</h1>
                      </span>
                    </div>
                    {appointment.hasAppointmentFee === true ? (
                      <div className="grid grid-flow-col-dense gap-x-8">
                        <span>
                          <h1 className="font-semibold xl:text-xl lg:text-lg md:text-base">
                            Appointment Fee
                          </h1>
                        </span>
                        <span className="text-end">
                          <h1>- ₱ 150</h1>
                        </span>
                      </div>
                    ) : null}
                    {hasDiscount && (
                      <div className="grid grid-flow-col-dense gap-x-8">
                        <span>
                          <h1 className="font-semibold xl:text-xl lg:text-lg md:text-base">
                            Discount
                          </h1>
                        </span>
                        <span className="text-end">
                          <h1>- ₱ {(TotalFee * 0.2).toFixed(0)}</h1>
                        </span>
                      </div>
                    )}
                    <hr className="my-4 border-t border-dark-default dark:border-light-default" />
                    <div className="grid grid-flow-col-dense pb-16 gap-x-8">
                      <span>
                        <h1 className="font-semibold xl:text-xl lg:text-lg md:text-base">
                          Subtotal
                        </h1>
                      </span>
                      <span className="text-end">
                        <h1>
                          ₱{" "}
                          {appointment.hasAppointmentFee === true
                            ? (
                                TotalFee -
                                (hasDiscount ? TotalFee * 0.2 : 0) -
                                150
                              ).toFixed(0)
                            : (
                                TotalFee - (hasDiscount ? TotalFee * 0.2 : 0)
                              ).toFixed(0)}
                        </h1>
                      </span>
                    </div>
                    <div
                      onClick={home}
                      className="w-full py-3 text-center rounded-lg cursor-pointer xl:text-xl lg:text-lg md:text-base bg-light-default dark:bg-dark-default"
                    >
                      <button>Go Back</button>
                    </div>
                  </div>
                </div>
              </div>
              <span className="grid items-center justify-center">
                <RandomServicesSidebar />
              </span>
            </div>
          </div>
        </>
      )}
    </>
  );
}
