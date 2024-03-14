import React from "react";
import { faArrowLeft, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { decreaseCount } from "@appointment";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function () {
  const appointment = useSelector((state) => state?.appointment);

  const appointmentData = appointment?.appointmentData;
  const appointmentCount = appointment?.count;

  const goBack = () => {
    window.history.back();
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const walkincheckout = () => {
    navigate("/receptionist/checkout");
  };

  const handleTrashClick = (serviceId) => {
    dispatch(decreaseCount(serviceId));
    toast.success("Successfully Remove In Cart", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
    });
  };

  return (
    <>
      <div className="grid w-full h-full grid-cols-[60%_40%] pb-10">
        <div>
          <button className="p-10 text-3xl w-fit" onClick={goBack}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <div className="grid grid-flow-row-dense px-10 gap-y-8">
            {appointmentData?.map((appointment) => (
              <div
                key={appointment?.service_id}
                className="flex items-center px-8 py-6 rounded-lg bg-primary-default"
              >
                <div className="flex-grow">
                  <div className="grid grid-flow-col-dense">
                    <h2 className="pb-2 font-sans font-semibold lg:text-2xl md:text-base">
                      {`${appointment?.service_name}`}
                    </h2>
                    <div className="grid justify-end">
                      <h1 className="pb-2 font-sans font-semibold lg:text-2xl md:text-base">
                        {`${appointment?.duration}`}
                      </h1>
                    </div>
                  </div>
                  <hr className="mb-4 border-t border-dark-default dark:border-light-default" />
                  <div className="grid grid-cols-[80%_auto] px-8">
                    <div className="grid xl:grid-cols-[25%_75%] md:grid-cols-[30%_70%] gap-x-2">
                      <div className="grid items-center justify-center">
                        <img
                          src={
                            appointment?.image[
                              Math.floor(
                                Math.random() * appointment?.image?.length
                              )
                            ]?.url
                          }
                          alt={appointment?.image?.originalname || ""}
                          key={appointment?.image?.public_id || ""}
                          className="object-cover 2xl:w-32 xl:w-28 xl:h-24 lg:w-20 lg:h-16 2xl:h-32 md:w-16 md:h-14 rounded-2xl"
                        />
                      </div>
                      <div>
                        <div className="grid grid-flow-row">
                          <h3 className="font-semibold xl:text-xl lg:text-lg md:text-base">
                            Product Use: {appointment?.product_name}
                          </h3>
                          <p className="font-semibold xl:text-lg lg:text-base md:text-sm">
                            Description: {appointment?.description}
                          </p>
                          <p className="font-semibold xl:text-lg lg:text-base md:text-sm">
                            For: {appointment?.type.join(", ")}
                          </p>
                          <p className="font-semibold xl:text-lg lg:text-base md:text-sm">
                            Add Ons:{" "}
                            {appointment?.option_name?.length > 0
                              ? appointment?.option_name
                                  .split(", ")
                                  .map((option, index) => (
                                    <span key={index}>
                                      {option} - ₱
                                      {appointment?.per_price[index]}
                                      {index !==
                                        appointment?.option_name.split(", ")
                                          .length -
                                          1 && ", "}
                                    </span>
                                  ))
                              : "None"}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="grid items-start justify-end grid-flow-col-dense">
                      <div className="w-fit">
                        <h3 className="mb-2 font-semibold xl:text-xl lg:text-lg md:text-base">
                          ₱{appointment?.price}
                        </h3>
                        <div className="grid items-center justify-end">
                          <span
                            onClick={() =>
                              handleTrashClick(appointment?.service_id)
                            }
                          >
                            <button className="text-3xl cursor-pointer">
                              <FontAwesomeIcon icon={faTrash} color="red" />
                            </button>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-flow-row-dense px-10 pt-28 h-fit">
          <div className="px-8 py-10 rounded-lg bg-primary-default">
            <div className="grid grid-flow-col-dense gap-x-8">
              <span>
                <h1 className="font-semibold xl:text-xl lg:text-lg md:text-base">
                  Order Summary
                </h1>
              </span>
              <span className="text-end">
                <h1>
                  ₱
                  {appointmentData
                    ?.map((appointment) => appointment?.price)
                    .reduce((total, amount) => total + amount, 0)}
                </h1>
              </span>
            </div>
            <h1 className="pt-1 pb-10">Subtotal ({appointmentCount} items)</h1>
            <div className="grid grid-flow-col-dense gap-x-8">
              <span>
                <h1 className="font-semibold xl:text-xl lg:text-lg md:text-base">
                  Extra Fee
                </h1>
              </span>
              <span className="text-end">
                <h1>
                  ₱
                  {appointmentData
                    ?.map((appointment) => appointment?.extraFee)
                    .reduce((total, amount) => total + amount, 0)}
                </h1>
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
                <h1>
                  ₱
                  {appointmentData
                    ?.map(
                      (appointment) =>
                        appointment?.price + appointment?.extraFee
                    )
                    .reduce((total, amount) => total + amount, 0)}
                </h1>
              </span>
            </div>
            <div
              onClick={walkincheckout}
              className="w-full py-3 text-center rounded-lg cursor-pointer xl:text-xl lg:text-lg md:text-base bg-light-default dark:bg-dark-default"
            >
              <button>Proceed On Checkout</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
