import React, { useState, useRef, useEffect } from "react";
import {
  useUpdateScheduleAppointmentMutation,
  useGetAppointmentByIdQuery,
  useGetTimesQuery,
  useGetUsersQuery,
  useGetSchedulesQuery,
  useGetOptionsQuery,
} from "@api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FadeLoader } from "react-spinners";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useDispatch } from "react-redux";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { reasonSlice } from "@reason";

export default function () {
  const isFocused = useRef(true);

  const { data: time, isLoading: timeLoading, refetch } = useGetTimesQuery();
  const {
    data: options,
    isLoading: optionsLoading,
    refetch: refetchOptions,
  } = useGetOptionsQuery();

  const [updateAppointment] = useUpdateScheduleAppointmentMutation();
  const { id } = useParams();

  const {
    data,
    isLoading,
    refetch: refetchAppointments,
  } = useGetAppointmentByIdQuery(id);
  const appointments = data?.details;

  const {
    data: user,
    isLoading: userLoading,
    refetch: refetchUser,
  } = useGetUsersQuery();
  const beautician = user?.details || [];

  const {
    data: allSchedules,
    isLoading: schedulesLoading,
    refetch: refetchSchedules,
  } = useGetSchedulesQuery();

  const schedules =
    allSchedules?.details.filter(
      (schedule) =>
        schedule.leaveNoteConfirmed === true ||
        schedule.status === "absent" ||
        schedule.status === "leave"
    ) || [];

  useEffect(() => {
    const handleFocus = async () => {
      isFocused.current = true;
      await Promise.all([
        refetch(),
        refetchOptions(),
        refetchUser(),
        refetchSchedules(),
        refetchAppointments(),
      ]);
    };

    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, [
    refetch,
    refetchOptions,
    refetchUser,
    refetchSchedules,
    refetchAppointments,
  ]);

  const filteredOptions = options?.details.filter(
    (option) =>
      appointments &&
      appointments.option?.some(
        (appointmentOption) => appointmentOption?._id === option?._id
      )
  );

  const reason = useSelector((state) => state.reason);

  const [selectedAppointmentTypes, setSelectedAppointmentTypes] = useState([]);

  const handleTimeClick = (selectedTime) => {
    const isSelected = formik.values.time?.includes(selectedTime);

    const totalDuration = appointments?.service?.reduce((total, service) => {
      const durationParts = service?.duration?.split(" ");
      const minDuration = parseInt(durationParts[2]) || 0;

      const isMinutes = durationParts?.includes("minutes");

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

  const isWithinRange = (date) => {
    const today = new Date();
    const twoWeeksFromNow = new Date(
      today.getTime() + 14 * 24 * 60 * 60 * 1000
    );

    return date >= today && date <= twoWeeksFromNow;
  };

  const tileDisabled = ({ date }) => {
    const today = new Date();
    const twoWeeksFromNow = new Date(
      today.getTime() + 14 * 24 * 60 * 60 * 1000
    );

    const threeDaysAfterToday = new Date(today);
    threeDaysAfterToday.setDate(today.getDate() + 3);

    return (
      date < today ||
      date < threeDaysAfterToday ||
      date > twoWeeksFromNow
      
    );
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const activeBeautician = beautician.filter(
    (beautician) =>
      beautician?.roles?.includes("Beautician") && beautician?.active === true
  );

  const handlePickBeautician = (beauticianId) => {
    if (formik.values.beautician?.includes(beauticianId)) {
      const updatedBeauticians = formik.values.beautician.filter(
        (id) => id !== beauticianId
      );
      formik.setFieldValue("beautician", updatedBeauticians);
    } else {
      const updatedBeauticians = [...formik.values.beautician, beauticianId];
      formik.setFieldValue("beautician", updatedBeauticians);
    }
  };

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
    const isSelected = selectedAppointmentTypes.includes(type);

    setSelectedAppointmentTypes((prevTypes) =>
      isSelected ? prevTypes.filter((t) => t !== type) : [type]
    );

    setCurrentPage(0);

    const otherAppointmentTypes = appointments?.service
      .map((service) => service.type)
      .filter((t) => t !== type);

    setSelectedAppointmentTypes((prevTypes) =>
      isSelected
        ? prevTypes.filter((t) => otherAppointmentTypes.includes(t))
        : prevTypes
    );
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      beautician:
        appointments?.beautician?.map((beautician) => beautician._id) || [],
      date: appointments?.date || "",
      time: appointments?.time || "",
      rebookReason: reason.reasonData.rebookReason || "",
      messageReason: reason.reasonData.messageReason || "",
      isRescheduled: true,
    },
    onSubmit: async (values) => {
      const uniqueAppointmentTypes = new Set();
      appointments?.service?.forEach((appointment) => {
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
      updateAppointment({ id: appointments._id, payload: values }).then(
        (response) => {
          const toastProps = {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000,
          };
          if (response?.data?.success === true) {
            navigate("/customer/schedule");
            toast.success(`${response?.data?.message}`, toastProps);
            dispatch(reasonSlice.actions.resetReason());
          } else
            toast.error(`${response?.error?.data?.error?.message}`, toastProps);
        }
      );
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

  const goBack = () => {
    window.history.back();
    dispatch(reasonSlice.actions.resetReason());
  };

  return (
    <>
      {isLoading ||
      userLoading ||
      timeLoading ||
      optionsLoading ||
      schedulesLoading ? (
        <div className="loader">
          <FadeLoader color="#FFB6C1" loading={true} size={50} />
        </div>
      ) : (
        <>
          <form
            onSubmit={formik.handleSubmit}
            encType="multipart/form-data"
            className="grid w-full h-full grid-cols-[55%_45%] pb-10"
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
                <h1 className="text-3xl">Edit Your Scheduled Appoinment</h1>
              </div>
              <div className="grid grid-flow-row-dense px-10 gap-y-8">
                <h3 className="text-xl font-bold">
                  To Select a Beautician Click a Service
                </h3>
                {appointments?.service?.map((service) => (
                  <div
                    key={service._id}
                    className={`flex items-center px-8 py-6 rounded-lg cursor-pointer ${
                      selectedAppointmentTypes.includes(service.type)
                        ? "bg-primary-accent"
                        : "bg-primary-default"
                    }`}
                    onClick={() => handleAppointmentClick(service.type)}
                  >
                    <div className="flex-grow">
                      <div className="grid grid-flow-col-dense">
                        <h2 className="pb-2 font-sans font-semibold xl:text-2xl md:text-xl">
                          {service.service_name}
                        </h2>
                        <div className="grid justify-end">
                          <h1 className="pb-2 font-sans font-semibold xl:text-2xl md:text-xl">
                            {service.duration}
                          </h1>
                        </div>
                      </div>
                      <hr className="mb-4 border-t border-dark-default dark:border-light-default" />
                      <div className="grid">
                        <div className="grid xl:grid-cols-[25%_75%] md:grid-cols-[30%_70%] gap-x-2">
                          <div className="grid items-center justify-center">
                            <div>
                              {service?.image && service?.image.length > 0 ? (
                                <img
                                  src={
                                    service?.image[
                                      Math.floor(
                                        Math.random() * service?.image?.length
                                      )
                                    ]?.url
                                  }
                                  alt={service?.image?.originalname || ""}
                                  key={service?.image?.public_id || ""}
                                  className="object-cover 2xl:w-32 xl:w-28 xl:h-24 md:w-24 md:h-20 2xl:h-32 rounded-2xl"
                                />
                              ) : (
                                <span>No image available</span>
                              )}
                            </div>
                          </div>
                          <div className="grid justify-end grid-cols-2">
                            <div className="grid grid-flow-row">
                              <h3 className="font-semibold xl:text-lg lg:text-sm md:text-[.85rem]">
                                Product Use:{" "}
                                {service.product.map((product, index) => (
                                  <React.Fragment key={index}>
                                    {product.product_name}
                                  </React.Fragment>
                                ))}
                              </h3>
                              <p className="font-semibold xl:text-lg lg:text-sm md:text-[.85rem]">
                                Description: {service.description}
                              </p>
                              <p className="font-semibold xl:text-lg lg:text-sm md:text-[.85rem]">
                                For: {service.type?.join(", ")}
                              </p>
                              <p className="font-semibold xl:text-lg lg:text-sm md:text-[.85rem]">
                                Add Ons:{" "}
                                {filteredOptions &&
                                filteredOptions?.some((option) =>
                                  option.service?.some(
                                    (s) => s._id === service._id
                                  )
                                ) ? (
                                  filteredOptions
                                    ?.filter((option) =>
                                      option.service?.some(
                                        (s) => s._id === service._id
                                      )
                                    )
                                    ?.map((option) => (
                                      <React.Fragment key={option._id}>
                                        {Array.isArray(option.option_name)
                                          ? option.option_name.join(", ")
                                          : option.option_name}
                                      </React.Fragment>
                                    ))
                                ) : (
                                  <React.Fragment>None</React.Fragment>
                                )}
                              </p>
                            </div>
                            <div>
                              <div className="grid items-end justify-end w-full grid-flow-row-dense">
                                <h3 className="font-semibold xl:text-xl md:text-base">
                                  {formik.values.date &&
                                    new Date(formik.values.date)
                                      .toISOString()
                                      .split("T")[0]}
                                </h3>
                                <div className="grid items-center justify-end">
                                  <h3 className="font-semibold xl:text-xl lg:text-lg md:text-base">
                                    ₱{service.price}
                                  </h3>
                                </div>
                              </div>
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
              <div className="text-center">
                <h1 className="text-3xl">Select Date and Time</h1>
              </div>
              <div className="py-10 lg:px-8 md:pr-4">
                <Calendar
                  onChange={handleDateChange}
                  value={formik.values.date}
                  d={tileDisabled}
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
                <h1 className="py-10 text-3xl text-center">
                  Available Time Slot
                </h1>
                <div className="grid grid-flow-row-dense grid-cols-3 gap-y-6">
                  {time?.details?.map(({ _id, time }) => (
                    <div
                      key={_id}
                      className={`cursor-pointer grid items-center justify-center py-3 2xl:mx-4 xl:mx-3 lg:mx-2 md:mx-1 rounded-xl text-dark-default dark:text-light-default ${
                        formik.values.time?.includes(time)
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
                                  Mobile Number: {visibleItem?.contact_number}
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
                                  formik.values.beautician?.includes(
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
              </div>
              <div className="px-12 pt-10">
                <button
                  className="w-full py-3 text-center rounded-lg cursor-pointer xl:text-2xl lg:text-xl md:text-lg bg-primary-default"
                  type="submit"
                >
                  Confirm
                </button>
              </div>
            </div>
          </form>
        </>
      )}
    </>
  );
}
