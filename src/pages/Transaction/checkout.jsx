import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  useGetUsersQuery,
  useAddAppointmentMutation,
  useGetTimesQuery,
  useGetSchedulesQuery,
} from "@api";
import { FadeLoader } from "react-spinners";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { clearAppointmentData } from "@appointment";
import { ImagePreview } from "@/components";

const paymentMethods = ["Cash"];

export default function () {
  const { data: time, isLoading: timeLoading } = useGetTimesQuery();
  const { data, isLoading } = useGetUsersQuery();
  const beautician = data?.details || [];

  const activeBeautician = beautician.filter(
    (beautician) =>
      beautician?.roles?.includes("Beautician") && beautician?.active === true
  );

  const user = useSelector((state) => state.auth.user);

  const { data: allSchedules } = useGetSchedulesQuery();
  const schedules =
    allSchedules?.details.filter(
      (schedule) =>
        schedule.leaveNoteConfirmed === true ||
        schedule.status === "absent" ||
        schedule.status === "leave"
    ) || [];

  const [selectedAppointmentTypes, setSelectedAppointmentTypes] = useState([]);

  const getAvailableBeauticians = (selectedDate) => {
    return activeBeautician.filter((beautician) => {
      const beauticianSchedules = schedules.filter(
        (schedule) => schedule.beautician._id === beautician._id
      );

      const hasLeaveNoteConfirmed = beauticianSchedules.some(
        (schedule) =>
          (schedule.leaveNoteConfirmed ||
            schedule.status === "absent" ||
            schedule.status === "leave") &&
          new Date(schedule.date).toISOString().split("T")[0] === selectedDate
      );

      const jobType = beautician.requirement.job_type;

      const appointmentMatchesJobType =
        selectedAppointmentTypes.length &&
        (typeof jobType === "string"
          ? selectedAppointmentTypes.flat().includes(jobType)
          : jobType.some((type) =>
              selectedAppointmentTypes.flat().includes(type)
            ));

      return !hasLeaveNoteConfirmed && appointmentMatchesJobType;
    });
  };

  const handleAppointmentClick = (type) => {
    if (selectedAppointmentTypes.includes(type)) {
      setSelectedAppointmentTypes(
        selectedAppointmentTypes.filter((t) => t !== type)
      );
    } else {
      const uniqueAppointmentTypes = Array.from(new Set([type]));
      setSelectedAppointmentTypes(uniqueAppointmentTypes);
    }
    setCurrentPage(0);
  };

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

    const isMonday = date.getDay() === 1;

    return date < today || date > endOfNextMonth || isMonday;
  };

  const handlePickBeautician = (beauticianId) => {
    if (formik.values.beautician.includes(beauticianId)) {
      const updatedBeauticians = formik.values.beautician.filter(
        (id) => id !== beauticianId
      );
      formik.setFieldValue("beautician", updatedBeauticians);
    } else {
      const updatedBeauticians = [...formik.values.beautician, beauticianId];
      formik.setFieldValue("beautician", updatedBeauticians);
    }
  };

  const handleTimeClick = (selectedTime) => {
    const isSelected = formik.values.time?.includes(selectedTime);

    const totalDuration = appointmentData.reduce((total, service) => {
      const durationParts = service?.duration.split(" ");
      const minDuration = parseInt(durationParts[2]) || 0;

      const isMinutes = durationParts.includes("minutes");

      const durationInHours = isMinutes ? minDuration / 60 : minDuration;

      return total + (isNaN(durationInHours) ? 0 : durationInHours);
    }, 0);

    let updatedTimes;

    if (isSelected) {
      updatedTimes = formik.values.time?.filter(
        (time) => time !== selectedTime
      );
    } else {
      const currentTime = formik.values.time || [];

      const totalRoundedUp = Math.ceil(totalDuration);
      const hourText = totalRoundedUp === 1 ? "hour" : "hours";

      if (currentTime?.length + 1 <= totalRoundedUp) {
        const isConsecutive = checkConsecutive(currentTime, selectedTime);

        if (!isConsecutive) {
          toast.warning("Please select consecutive time slots", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
          });
          return;
        }

        updatedTimes = [...currentTime, selectedTime];
      } else {
        toast.warning(`Cannot select more than ${totalRoundedUp} ${hourText}`, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
        return;
      }
    }

    formik.setFieldValue("time", updatedTimes);
  };

  const checkConsecutive = (times, newTime) => {
    if (times?.length === 0) {
      return true;
    }

    const lastTime = times[times?.length - 1];

    const extractHour = (time) => {
      const [hours] = time.split(":");
      return parseInt(hours);
    };

    const lastTimeHour = extractHour(lastTime);
    const newTimeHour = extractHour(newTime);

    return newTimeHour === lastTimeHour + 1;
  };

  const handleCheckboxChange = (selectedMethod) => {
    formik.setFieldValue("payment", selectedMethod);
  };

  const totalPrice = appointmentData
    ?.map((appointment) => appointment.price)
    .reduce((total, amount) => total + amount, 0);

  const extraFee = appointmentData
    ?.map((appointment) => appointment.extraFee)
    .reduce((total, amount) => total + amount, 0);

  const formik = useFormik({
    initialValues: {
      beautician: [],
      customer: user?._id || "",
      service: appointmentData?.map((service) => service?.service_id) || [],
      option:
        appointmentData?.map((service) => {
          const optionIdsArray = Array.isArray(service.option_id)
            ? service.option_id?.map((id) => id?.trim())
            : [service.option_id?.trim()];
          return optionIdsArray;
        }) || [],
      date: isOnlineCustomer ? "" : new Date().toISOString().split("T")[0],
      time: [],
      payment: "",
      price: totalPrice + extraFee || 0,
      status: "pending",
      image: [],
    },
    onSubmit: async (values) => {
      const uniqueAppointmentTypes = new Set();
      appointmentData.forEach((appointment) => {
        appointment.type.forEach((type) => {
          uniqueAppointmentTypes.add(type);
        });
      });
      const requiredAppointmentTypes = Array.from(uniqueAppointmentTypes);
      if (values.beautician.length !== requiredAppointmentTypes.length) {
        toast.warning(
          `You must select exactly ${requiredAppointmentTypes.length} beauticians for the selected appointment`,
          {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000,
          }
        );
        return;
      }
      const selectedBeauticianTypes = values.beautician.map((beauticianId) => {
        const beautician = activeBeautician.find((b) => b._id === beauticianId);
        return beautician.requirement.job_type;
      });
      const missingAppointmentTypes = requiredAppointmentTypes.filter(
        (type) => !selectedBeauticianTypes.includes(type)
      );
      if (missingAppointmentTypes.length > 0) {
        toast.warning(
          `You must select a beautician for the following appointment: ${missingAppointmentTypes?.join(
            ", "
          )}`,
          {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000,
          }
        );
        return;
      }
      if (values.beautician?.length === 0) {
        toast.warning(
          "Please choose a beautician before confirming the appointment",
          {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000,
          }
        );
        return;
      }
      const formData = new FormData();
      if (Array.isArray(values?.beautician)) {
        values.beautician.forEach((item) =>
          formData.append("beautician[]", item)
        );
      } else formData.append("beautician", values?.beautician);
      formData.append("customer", values?.customer);
      if (Array.isArray(values?.service)) {
        values.service.forEach((item) => formData.append("service[]", item));
      } else formData.append("service", values?.service);
      values.option.forEach((optionArray) => {
        if (Array.isArray(optionArray)) {
          optionArray.forEach((optionId) =>
            formData.append("option[]", optionId)
          );
        } else {
          formData.append("option[]", optionArray);
        }
      });
      formData.append("date", values.date);
      if (Array.isArray(values?.time)) {
        values.time.forEach((item) => formData.append("time[]", item));
      } else formData.append("time", values?.time);
      formData.append("password", values?.password);
      formData.append("roles", values?.roles);
      formData.append("payment", values?.payment);
      formData.append("price", values?.price);
      formData.append("status", values?.status);
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

  const handleDateChange = (date) => {
    if (selectedAppointmentTypes.length === 0) {
      toast.warning("Please select an appointment before choosing a date", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
      return;
    }
    const selectedDate = new Date(date);
    selectedDate.setDate(selectedDate.getDate() + 1);
    const formatted = selectedDate.toISOString().split("T")[0];

    formik.setFieldValue("date", formatted);

    formik.setFieldValue("beautician", []);
    setCurrentPage(0);
  };

  const [currentPage, setCurrentPage] = useState(0);

  const availableBeauticians = getAvailableBeauticians(formik.values.date);

  const totalItems = availableBeauticians?.length;

  const visibleItem = availableBeauticians[currentPage];

  const showNextItem = (e) => {
    e.preventDefault();
    setCurrentPage((prevPage) => (prevPage + 1) % totalItems);
  };

  const showPreviousItem = (e) => {
    e.preventDefault();
    setCurrentPage((prevPage) =>
      prevPage - 1 < 0 ? totalItems - 1 : prevPage - 1
    );
  };

  return (
    <>
      {isLoading || appointmentLoading || timeLoading ? (
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
                <h3 className="text-base font-bold">
                  To Select a Beautician Click a Service
                </h3>
                {appointmentData.map((appointment) => (
                  <div
                    key={appointment?.service_id}
                    className={`flex items-center px-8 py-6 rounded-lg cursor-pointer ${
                      selectedAppointmentTypes.includes(appointment.type)
                        ? "bg-primary-accent"
                        : "bg-primary-default"
                    }`}
                    onClick={() => handleAppointmentClick(appointment.type)}
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
                      <div className="grid grid-cols-[85%_15%]">
                        <div className="grid xl:grid-cols-[25%_75%] md:grid-cols-[30%_70%] gap-x-2">
                          <div className="grid items-center justify-center">
                            {appointment?.image &&
                            appointment?.image?.length > 0 ? (
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
                                className="object-cover 2xl:w-32 xl:w-28 xl:h-24 md:w-24 md:h-20 2xl:h-32 rounded-2xl"
                              />
                            ) : (
                              <span>No image available</span>
                            )}
                          </div>
                          <div>
                            <div className="grid grid-flow-row pr-8">
                              <h3 className="font-semibold xl:text-xl lg:text-lg md:text-base">
                                Product Use: {appointment.product_name}
                              </h3>
                              <p className="font-semibold xl:text-lg lg:text-base md:text-sm">
                                Description: {appointment.description}
                              </p>
                              <p className="font-semibold xl:text-lg lg:text-base md:text-sm">
                                For: {appointment?.type?.join(", ")}
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
                <div className="grid grid-flow-row-dense grid-cols-3 gap-y-6">
                  {time?.details?.map(({ _id, time }) => (
                    <div
                      key={_id}
                      className={`cursor-pointer grid items-center justify-center py-3 2xl:mx-4 xl:mx-3 lg:mx-2 md:mx-1 rounded-xl text-dark-default dark:text-light-default ${
                        formik.values.time.includes(time)
                          ? "bg-primary-accent"
                          : "bg-primary-variant"
                      } rounded-xl`}
                      onClick={() => handleTimeClick(time)}
                    >
                      <h1 className="xl:text-base md:text-sm">{time}</h1>
                    </div>
                  ))}
                </div>
                {formik.values.date && selectedAppointmentTypes && (
                  <>
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
                      {totalItems === 0 ? (
                        <div className="text-xl text-dark-default dark:text-light-default">
                          No beautician available for the selected date.
                        </div>
                      ) : (
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
                                  Name: {visibleItem?.name}
                                </h1>
                              </span>
                              <span>
                                <h1 className="text-justify 2xl:text-lg xl:text-base">
                                  Works On: {visibleItem?.requirement?.job_type}
                                </h1>
                              </span>
                              <span>
                                <h1 className="text-justify 2xl:text-lg xl:text-base">
                                  Age: {visibleItem?.age}
                                </h1>
                              </span>
                              <span>
                                <h1 className="text-justify 2xl:text-lg xl:text-base">
                                  Contact Number: {visibleItem?.contact_number}
                                </h1>
                              </span>
                            </div>
                            <span className="grid items-end justify-end h-full">
                              <h1
                                id={visibleItem?._id}
                                onClick={() =>
                                  handlePickBeautician(visibleItem?._id)
                                }
                                className={`${
                                  formik.values.beautician.includes(
                                    visibleItem?._id
                                  )
                                    ? "bg-primary-accent text-light-default"
                                    : "bg-primary-variant text-dark-default"
                                } px-8 py-2 text-lg border rounded-lg cursor-pointer border-light-default dark:border-dark-default hover:bg-primary-accent`}
                              >
                                Pick
                              </h1>
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}

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

                      {method !== "Gcash" && (
                        <label className="text-3xl">{method}</label>
                      )}
                    </div>
                  ))}
                </div>

                <div className="p-10 my-10 rounded-lg bg-primary-default">
                  <h1 className="pb-6 text-3xl">Senior / PWD Discount</h1>
                  <h3 className="pb-6 text-justify xl:text-xl md:text-lg">
                    To avail the Senior / PWD Discount, kindly upload your
                    Senior / PWD ID for verification.
                  </h3>
                  <label className="block">
                    <span className={`xl:text-xl md:text-base font-semibold`}>
                      Upload Image:
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      id="image"
                      name="image"
                      onChange={(event) => {
                        formik.setFieldValue(
                          "image",
                          Array.from(event.currentTarget.files)
                        );
                      }}
                      multiple
                      className={`${
                        formik.touched.image && formik.errors.image
                          ? "border-red-600"
                          : "border-light-default"
                      } block pt-3 mb-2 ml-6 xl:text-xl md:text-base w-full`}
                    />
                    <span className="grid items-center justify-center grid-flow-row grid-cols-5 gap-2 mt-4 gap-x-2">
                      {formik.values.image && (
                        <ImagePreview images={formik.values.image} />
                      )}
                    </span>
                  </label>
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
                            ?.map((appointment) => appointment.price || 0)
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
                            ?.map((appointment) => appointment.extraFee || 0)
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
