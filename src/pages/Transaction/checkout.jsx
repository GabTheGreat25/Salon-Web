import React, { useState } from "react";
import Gcash from "@assets/G-cash.png";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useGetUsersQuery, useAddAppointmentMutation } from "@api";
import { FadeLoader } from "react-spinners";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { clearAppointmentData } from "@appointment";

const timeSlots = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
];

const paymentMethods = ["Cash", "Gcash"];

export default function () {
  const { data, isLoading } = useGetUsersQuery();
  const beautician = data?.details || [];

  const activeBeautician = beautician.filter(
    (beautician) =>
      beautician?.roles?.includes("Beautician") && beautician?.active === true
  );

  const user = useSelector((state) => state.auth.user);
  const appointment = useSelector((state) => state?.appointment);

  const appointmentData = appointment?.appointmentData;
  const appointmentCount = appointment?.count;

  const [addAppointment, { isLoading: appointmentLoading }] =
    useAddAppointmentMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isOnlineCustomer = user?.roles?.includes("Online Customer");

  const goBack = () => {
    window.history.back();
  };

  const isWithinRange = (date) => {
    const today = new Date();
    const endOfNextMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 2,
      0
    );

    return date >= today && date <= endOfNextMonth;
  };

  const tileDisabled = ({ date }) => {
    const today = new Date();
    const endOfNextMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 2,
      0
    );

    return date < today || date > endOfNextMonth;
  };

  const handleDateChange = (date) => {
    const selectedDate = new Date(date);
    selectedDate.setDate(selectedDate.getDate() + 1);

    const formatted = selectedDate.toISOString().split("T")[0];
    formik.setFieldValue("date", formatted);
  };

  const [currentPage, setCurrentPage] = useState(0);

  const totalItems = activeBeautician?.length;

  const showNextItem = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % totalItems);
  };

  const showPreviousItem = () => {
    setCurrentPage((prevPage) =>
      prevPage - 1 < 0 ? totalItems - 1 : prevPage - 1
    );
  };

  const visibleItem = activeBeautician[currentPage];

  const handlePickBeautician = (beauticianId) => {
    formik.setFieldValue("beautician", beauticianId);
  };

  const handleTimeClick = (time) => {
    formik.setFieldValue("time", time);
  };

  const handleCheckboxChange = (selectedMethod) => {
    formik.setFieldValue("payment", selectedMethod);
    if (selectedMethod !== "Gcash") {
      formik.setFieldValue("image", []);
    }
  };

  const handleProofOfBillingChange = (e) => {
    formik.setFieldValue("image", Array.from(e.target.files));
  };

  const totalPrice = appointmentData
    ?.map((appointment) => appointment.price)
    .reduce((total, amount) => total + amount, 0);

  const totalExtraFee = appointmentData
    ?.map((appointment) => appointment.extraFee)
    .reduce((total, amount) => total + amount, 0);

  const formik = useFormik({
    initialValues: {
      beautician: "",
      customer: user?._id || "",
      service: appointmentData?.map((service) => service?.service_id) || [],
      date: isOnlineCustomer ? "" : new Date().toISOString().split("T")[0],
      time: "",
      payment: "",
      price: totalPrice || 0,
      extraFee: totalExtraFee || 0,
      note: appointmentData.note || "",
      status: "pending",
      image: [],
    },
    onSubmit: async (values) => {
      const formData = new FormData();

      formData.append("beautician", values?.beautician);
      formData.append("customer", values?.customer);
      if (Array.isArray(values?.service)) {
        values.service.forEach((serviceId) =>
          formData.append("service[]", serviceId)
        );
      } else formData.append("service", values?.service);
      formData.append("date", values.date);
      formData.append("time", values?.time);
      formData.append("payment", values?.payment);
      formData.append("price", values?.price);
      formData.append("extraFee", values?.extraFee);
      formData.append("note", values?.note);
      Array.from(values?.image).forEach((file) => {
        formData.append("image", file);
      });

      addAppointment(formData).then((response) => {
        const toastProps = {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
        };
        if (response?.data?.success === true) {
          toast.success(`${response?.data?.message}`, toastProps);
          dispatch(clearAppointmentData());
          navigate(
            `${
              isOnlineCustomer ? "/onlineCustomer" : "/walkInCustomer"
            }/schedule`
          );
        } else
          toast.error(`${response?.error?.data?.error?.message}`, toastProps);
      });
    },
  });

  return (
    <>
      {isLoading || appointmentLoading ? (
        <div className="loader">
          <FadeLoader color="#FDA7DF" loading={true} size={50} />
        </div>
      ) : (
        <>
          <form
            onSubmit={formik.handleSubmit}
            encType="multipart/form-data"
            className="grid w-full h-full grid-cols-[60%_40%] pb-10"
          >
            <div>
              <div className="grid items-center justify-center grid-flow-col-dense w-fit">
                <button
                  className="p-10 text-3xl w-fit"
                  onClick={(e) => {
                    e.preventDefault();
                    goBack();
                  }}
                >
                  <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <h1 className="text-3xl">Appointment List</h1>
              </div>
              <div className="grid grid-flow-row-dense px-10 gap-y-8">
                {appointmentData.map((appointment) => (
                  <div
                    key={appointment?.service_id}
                    className="flex items-center px-8 py-6 rounded-lg bg-primary-default"
                  >
                    <div className="flex-grow">
                      <h2 className="pb-2 font-sans font-semibold lg:text-2xl md:text-base">
                        {`${appointment.service_name}`}
                      </h2>
                      <hr className="mb-4 border-t border-dark-default dark:border-light-default" />
                      <div className="grid grid-cols-2 px-8">
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
                            <div className="grid grid-flow-row pr-8">
                              <h3 className="font-semibold xl:text-xl lg:text-lg md:text-base">
                                Product Use: {appointment.product_name}
                              </h3>
                              <p className="font-semibold xl:text-lg lg:text-base md:text-sm">
                                Description: {appointment.description}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="grid items-end justify-end w-full grid-flow-row-dense">
                            <h3 className="font-semibold xl:text-xl lg:text-lg md:text-base">
                              {formik.values.date?.toString()}
                            </h3>
                            <div className="grid items-center justify-end">
                              <h3 className="font-semibold xl:text-xl lg:text-lg md:text-base">
                                ₱{appointment.price}
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid items-center justify-center grid-flow-row-dense pt-9 h-fit">
              {isOnlineCustomer && (
                <div className="text-center">
                  <h1 className="text-3xl">Select Date and Time</h1>
                </div>
              )}
              <div className="py-10 lg:px-8 md:pr-4">
                {isOnlineCustomer && (
                  <Calendar
                    onChange={handleDateChange}
                    value={formik.values.date}
                    tileDisabled={tileDisabled}
                    className={`${
                      formik.values.date === formik.values.date
                        ? "bg-primary-accent"
                        : "bg-primary-variant"
                    } w-full text-center rounded-lg`}
                    tileClassName={({ date }) =>
                      isWithinRange(date)
                        ? "cursor-pointer hover:bg-primary-accent focus:bg-primary-accent active:bg-primary-accent !important"
                        : "bg-primary-default !important"
                    }
                  />
                )}
                <h1 className="py-10 text-3xl text-center">
                  Available Time Slot
                </h1>
                <div className="grid grid-flow-row-dense grid-cols-4 gap-y-6">
                  {timeSlots.map((time, index) => (
                    <div
                      key={index}
                      className={`cursor-pointer grid items-center justify-center py-3 2xl:mx-4 xl:mx-3 lg:mx-2 md:mx-1 rounded-xl text-light-default dark:text-dark-default ${
                        time === formik.values.time
                          ? "bg-primary-accent"
                          : "bg-primary-variant"
                      } rounded-xl`}
                      onClick={() => handleTimeClick(time)}
                    >
                      <h1 className="xl:text-base md:text-sm">{time}</h1>
                    </div>
                  ))}
                </div>
                <h1 className="pt-10 pb-5 text-3xl text-center">
                  Choose A Beautician
                </h1>
                <div className="grid items-center justify-end w-full">
                  {totalItems > 1 && (
                    <div className="flex items-end justify-end mb-4">
                      <button
                        className="px-3 py-1 mr-2 text-xl rounded-full bg-primary-default w-fit"
                        onClick={showPreviousItem}
                        disabled={currentPage === 0}
                      >
                        <FontAwesomeIcon icon={faArrowLeft} />
                      </button>
                      <button
                        className="px-3 py-1 ml-2 text-xl rounded-full bg-primary-default w-fit"
                        onClick={showNextItem}
                        disabled={currentPage === totalItems - 1}
                      >
                        <FontAwesomeIcon icon={faArrowRight} />
                      </button>
                    </div>
                  )}
                </div>
                <div className="grid w-full">
                  <div className="grid xl:items-start xl:justify-start md:items-center md:justify-center xl:grid-cols-[50%_50%] py-3 md:pr-6 rounded-xl bg-primary-default">
                    <span className="grid items-center justify-center">
                      <img
                        src={
                          visibleItem?.image[
                            Math.floor(
                              Math.random() * visibleItem?.image?.length
                            )
                          ]?.url
                        }
                        alt={visibleItem?.image?.originalname || ""}
                        key={visibleItem?.image?.public_id || ""}
                        className="pl-6 py-2 w-[22rem] h-[16rem]"
                      />
                    </span>
                    <div className="grid h-full grid-rows-[30%_70%] py-4 pr-6 xl:pl-2 md:pl-6">
                      <div className="grid items-start justify-start">
                        <span>
                          <h1 className="pb-2 font-semibold 2xl:text-2xl md:text-xl md:py-3 xl:py-0">
                            {visibleItem?.name}
                          </h1>
                        </span>
                        <span>
                          <h1 className="text-justify 2xl:text-lg xl:text-base">
                            {visibleItem?.age}
                          </h1>
                        </span>
                        <span>
                          <h1 className="text-justify 2xl:text-lg xl:text-base">
                            {visibleItem?.contact_number}
                          </h1>
                        </span>
                      </div>
                      <span className="grid items-end justify-end h-full">
                        <h1
                          onClick={() => handlePickBeautician(visibleItem?._id)}
                          className={`${
                            visibleItem?._id === formik.values.beautician
                              ? "bg-primary-accent"
                              : "bg-primary-variant"
                          } px-8 py-2 text-lg border rounded-lg cursor-pointer border-light-default dark:border-dark-default hover:bg-primary-accent`}
                        >
                          Pick
                        </h1>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-10 my-10 rounded-lg bg-primary-default">
                  <h1 className="pb-6 text-3xl">Select Payment Method</h1>
                  {paymentMethods.map((method) => (
                    <div
                      key={method}
                      className="grid items-center justify-center grid-flow-col pb-2 w-fit gap-x-4"
                    >
                      <input
                        className="p-4 border rounded border-light-default dark:border-dark-default focus:border-primary-default focus:ring-primary-default checked:bg-primary-default checked:dark:bg-dark-default"
                        type="checkbox"
                        name="paymentMethod"
                        value={method}
                        checked={formik.values.payment === method}
                        onChange={() => handleCheckboxChange(method)}
                      />

                      {method === "Gcash" && (
                        <div className="grid grid-flow-row-dense">
                          <div className="grid items-center justify-center grid-flow-col-dense w-fit">
                            <img
                              src={Gcash}
                              alt="Gcash"
                              className="object-cover w-16 h-16"
                            />
                            <label className="text-3xl">{method}</label>
                          </div>
                          {formik.values.payment === "Gcash" && (
                            <span className="pt-3">
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleProofOfBillingChange}
                                multiple
                                className="w-5/6"
                              />
                            </span>
                          )}
                        </div>
                      )}

                      {method !== "Gcash" && (
                        <label className="text-3xl">{method}</label>
                      )}
                    </div>
                  ))}
                </div>
                <div className="grid grid-flow-row-dense">
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
                            ?.map((appointment) => appointment.price)
                            .reduce((total, amount) => total + amount, 0)}
                        </h1>
                      </span>
                    </div>
                    <h1 className="pt-1 pb-10">
                      Subtotal ({appointmentCount} items)
                    </h1>
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
                            ?.map((appointment) => appointment.extraFee)
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
                                appointment.price + appointment.extraFee
                            )
                            .reduce((total, amount) => total + amount, 0)}
                        </h1>
                      </span>
                    </div>
                    <button
                      className="w-full py-3 text-center rounded-lg cursor-pointer xl:text-xl lg:text-lg md:text-base bg-light-default dark:bg-dark-default"
                      type="submit"
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </>
      )}
    </>
  );
}
