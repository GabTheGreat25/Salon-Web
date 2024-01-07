import React, { useEffect } from "react";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RandomServicesSidebar } from "@/components";
import { useGetTransactionByIdQuery } from "@api";
import { FadeLoader } from "react-spinners";
import jsPDF from "jspdf";

export default function () {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, isLoading } = useGetTransactionByIdQuery(id);
  const { appointment } = data?.details || {};

  const user = useSelector((state) => state.auth.user);
  const isOnlineCustomer = user?.roles?.includes("Online Customer");

  const goBack = () => window.history.back();
  const home = () =>
    navigate(isOnlineCustomer ? "/onlineCustomer" : "/walkInCustomer");

  const totalPrice = appointment?.service?.reduce(
    (acc, service) => acc + (service?.price || 0),
    0
  );
  const extraFeePrice = appointment?.service?.reduce(
    (acc, service) => acc + (service?.extraFee || 0),
    0
  );

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

    const pinkColor = hexToRgb("#FDA7DF");
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
    doc.text("Lhanlee Salon", 81, 18);

    const appointmentDate = new Date(
      data?.details.appointment?.date
    ).toLocaleDateString();
    const appointmentTime = data?.details.appointment?.time;

    doc.setFont("times", "normal");
    doc.setFontSize(14);
    doc.text(`Date: ${appointmentDate}`, 160, 20);
    doc.text(`Time: ${appointmentTime}`, 160, 30);

    doc.setTextColor(33, 33, 33);
    doc.setFont("times", "bold");
    doc.setFontSize(18);
    doc.text("Transaction Receipt", 105, 55, { align: "center" });

    doc.setFont("times", "normal");
    doc.setFontSize(16);
    doc.text("Service:", 20, 75);
    let yOffset = 90;
    data?.details.appointment?.service?.forEach((service) => {
      doc.text(`- ${service?.service_name}`, 30, yOffset);
      yOffset += 15;
    });

    doc.setFont("times", "normal");
    doc.text(
      `Beautician: ${data?.details.appointment?.beautician?.name}`,
      20,
      yOffset
    );

    doc.setLineWidth(0.5);
    doc.line(10, yOffset + 15, 200, yOffset + 15);

    const totalPrice = data?.details.appointment?.price || 0;
    const extraFee = data?.details.appointment?.extraFee || 0;
    const totalCost = totalPrice + extraFee;

    doc.setFont("times", "normal");
    doc.setFontSize(14);
    const paymentX = 150;
    const paymentY = yOffset + 25;
    doc.text(`Payment: ${data?.details?.payment}`, paymentX, paymentY + 10);
    doc.text(`Total Cost: ${totalCost.toFixed(2)}`, paymentX, paymentY);

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
          <FadeLoader color="#FDA7DF" loading={true} size={50} />
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
                {appointment?.service?.map((service) => (
                  <div
                    key={service?._id}
                    className="flex items-center px-8 py-6 rounded-lg bg-primary-default"
                  >
                    <div className="flex-grow">
                      <h2 className="pb-2 font-sans font-semibold lg:text-2xl md:text-base">
                        {`Lhanlee Salon | ${
                          (appointment?.date || "").split("T")[0]
                        }`}
                      </h2>
                      <hr className="mb-4 border-t border-dark-default dark:border-light-default" />
                      <div className="grid grid-cols-2 px-8">
                        <div className="grid xl:grid-cols-[25%_75%] md:grid-cols-[30%_70%] gap-x-2">
                          <div className="grid items-center justify-center">
                            {service?.image?.map((image) => (
                              <img
                                key={image?.public_id}
                                src={image?.url}
                                alt={image?.originalname}
                                className="object-cover 2xl:w-32 xl:w-28 xl:h-24 lg:w-20 lg:h-16 2xl:h-32 md:w-16 md:h-14 rounded-2xl"
                              />
                            ))}
                          </div>
                          <div className="grid grid-flow-row">
                            <p className="font-semibold xl:text-lg lg:text-base md:text-sm">
                              Services: {service?.service_name}
                            </p>
                          </div>
                        </div>
                      </div>
                      <hr className="my-4 border-t border-dark-default dark:border-light-default" />
                      <div className="grid justify-end gap-x-4">
                        <h1 className="text-xl">
                          Service Total:
                          <span className="pl-2 font-semibold">
                            ₱{service?.price || 0}
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
                        <h1>₱{totalPrice}</h1>
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
                        <h1>₱{extraFeePrice}</h1>
                      </span>
                    </div>
                    <hr className="my-4 border-t border-dark-default dark:border-light-default" />
                    <div className="grid grid-flow-col-dense pb-16 gap-x-8">
                      <span>
                        <h1 className="font-semibold xl:text-xl lg:text-lg md:text-base">
                          Subtotal
                        </h1>
                      </span>
                      <span className="text-end">
                        <h1>₱{totalPrice + extraFeePrice}</h1>
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
