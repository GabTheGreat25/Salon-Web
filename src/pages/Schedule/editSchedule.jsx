import React, { useState } from "react";
import { Card, CardImage } from "@components";
import {
  useUpdateScheduleAppointmentMutation,
  useGetAppointmentByIdQuery,
  useGetTimesQuery,
  useGetUsersQuery,
  useGetSchedulesQuery,
} from "@api";
import { editScheduleValidation } from "@validation";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FadeLoader } from "react-spinners";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { countSlice } from "@count";
import { useDispatch } from "react-redux";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { reasonSlice } from "@reason";

export default function () {
  const { data: time, isLoading: timeLoading } = useGetTimesQuery();
  const reason = useSelector((state) => state.reason);

  const { data: allSchedules } = useGetSchedulesQuery();
  const schedules =
    allSchedules?.details.filter(
      (schedule) => schedule.leaveNoteConfirmed === true
    ) || [];

  const handleTimeClick = (time) => {
    formik.setFieldValue("time", time);
    formik.setFieldTouched("time", true);
  };

  const isWithinRange = (date) => {
    const today = new Date();
    const endOfNextMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 2,
      0
    );

    const isMonday = date.getDay() === 1;

    return isMonday || date >= today && date <= endOfNextMonth;
  };

  const tileDisabled = ({ date }) => {
    const today = new Date();
    const endOfNextMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 2,
      0
    );

    const isMonday = date.getDate() === 1;

    return date < today || date > endOfNextMonth || isMonday;
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth.user);

  const isOnlineCustomer = auth?.roles?.includes("Online Customer");

  const [updateAppointment] = useUpdateScheduleAppointmentMutation();
  const { id } = useParams();

  const { data, isLoading } = useGetAppointmentByIdQuery(id);
  const appointments = data?.details;

  const { data: user, isLoading: userLoading } = useGetUsersQuery();
  const beautician = user?.details || [];

  const activeBeautician = beautician.filter(
    (beautician) =>
      beautician?.roles?.includes("Beautician") && beautician?.active === true
  );

  const handlePickBeautician = (beauticianId) => {
    formik.setFieldValue("beautician", beauticianId);
  };

  const getAvailableBeauticians = (selectedDate) => {
    return activeBeautician.filter((beautician) => {
      const beauticianSchedules = schedules.filter(
        (schedule) => schedule.beautician._id === beautician._id
      );

      const hasLeaveNoteConfirmed = beauticianSchedules.some(
        (schedule) =>
          schedule.leaveNoteConfirmed &&
          new Date(schedule.date).toISOString().split("T")[0] === selectedDate
      );

      return !hasLeaveNoteConfirmed;
    });
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      // beautician: appointments?.beautician?._id || "",
      date: appointments?.date || "",
      // time: appointments?.time || "",
      rebookReason: reason.reasonData.rebookReason || "",
      messageReason: reason.reasonData.messageReason || "",
    },
    // validationSchema: editScheduleValidation,
    onSubmit: async (values) => {
      updateAppointment({ id: appointments._id, payload: values }).then(
        (response) => {
          const toastProps = {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000,
          };
          if (response?.data?.success === true) {
            navigate(
              `${
                isOnlineCustomer ? "/onlineCustomer" : "/walkInCustomer"
              }/schedule`
            );
            toast.success(`${response?.data?.message}`, toastProps);
            dispatch(
              countSlice.actions.setEditedTransactionIds([appointments._id])
            );
            dispatch(reasonSlice.actions.resetReason());
          } else
            toast.error(`${response?.error?.data?.error?.message}`, toastProps);
        }
      );
    },
  });

  const handleDateChange = (date) => {
    const selectedDate = new Date(date);
    selectedDate.setDate(selectedDate.getDate() + 1);
    const formatted = selectedDate.toISOString().split("T")[0];

    formik.setFieldValue("date", formatted);

    const availableBeauticians = getAvailableBeauticians(formatted);

    if (availableBeauticians.length === 0) {
      const toastProps = {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      };
      toast.warning(
        "No beauticians available for the selected date.",
        toastProps
      );
    }
    setCurrentPage(0);
  };

  const [currentPage, setCurrentPage] = useState(0);

  const availableBeauticians = getAvailableBeauticians(formik.values.date);

  const totalItems = availableBeauticians.length;

  const visibleItem = activeBeautician[currentPage];

  const showNextItem = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % totalItems);
  };

  const showPreviousItem = () => {
    setCurrentPage((prevPage) =>
      prevPage - 1 < 0 ? totalItems - 1 : prevPage - 1
    );
  };

  return (
    <>
      {isLoading || userLoading ? (
        <div className="loader">
          <FadeLoader color="#FDA7DF" loading={true} size={50} />
        </div>
      ) : (
        <>
          <Card>
            <div className="grid w-full h-full text-light-default dark:text-dark-default">
              <span className="grid items-end md:gap-y-10 justify-center 2xl:grid-rows-[80%_20%] xl:grid-rows-[70%_30%] md:grid-rows-[60%_40%]">
                <h1 className="text-3xl font-semibold text-center">
                  Edit Schedule Appointment
                </h1>
                <p className="text-xl text-center lg:px-12 text-light-default dark:text-dark-default">
                  Edit & Update {appointments?.beautician?.name} Schedule Details
                </p>
              </span>
              <div className="overflow-x-hidden grid grid-cols-[50%_50%] items-center justify-start pt-20 pb-6 gap-x-6 2xl:pr-0 md:pr-14">
                <CardImage />
                <form
                  onSubmit={formik.handleSubmit}
                  className="grid items-end justify-center w-full h-full grid-flow-row-dense pr-12"
                >
                  <label className="block">
                    <span
                      className={`xl:text-xl md:text-base font-semibold ${
                        formik.touched.date && formik.errors.date
                          ? "text-red-600"
                          : ""
                      }`}
                    >
                      Select Date:
                    </span>
                    <Calendar
                      onChange={handleDateChange}
                      value={formik.values.date}
                      tileDisabled={tileDisabled}
                      className={`${
                        formik.touched.date && formik.errors.date
                          ? "border-red-600"
                          : "border-light-default"
                      } block my-2 xl:text-lg lg:text-[1rem] bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full`}
                      tileClassName={({ date }) =>
                        isWithinRange(date)
                          ? "cursor-pointer hover:bg-primary-accent focus:bg-primary-accent active:bg-primary-accent !important"
                          : "bg-primary-default !important"
                      }
                    />
                    {formik.touched.date && formik.errors.date && (
                      <div className="text-lg font-semibold text-red-600">
                        {formik.errors.date}
                      </div>
                    )}
                  </label>
                  <label className="block">
                    <span
                      className={`xl:text-xl md:text-base font-semibold ${
                        formik.touched.time && formik.errors.time
                          ? "text-red-600"
                          : ""
                      }`}
                    >
                      Time:
                    </span>
                    <div className="grid grid-flow-row-dense grid-cols-3 pt-2 gap-y-6">
                      {time.details?.map(({ _id, time }) => (
                        <div
                          key={_id}
                          className={`cursor-pointer grid items-center justify-center py-3 2xl:mx-2 md:mx-1 rounded-xl text-dark-default dark:text-light-default ${
                            time === formik.values.time
                              ? "bg-primary-accent"
                              : "bg-primary-variant"
                          } rounded-xl`}
                          onClick={() => handleTimeClick(time)}
                        >
                          <h1
                            className={`2xl:text-base md:text-sm cursor-pointer`}
                          >
                            {time}
                          </h1>
                        </div>
                      ))}
                    </div>
                    {formik.touched.time && formik.errors.time && (
                      <div className="pt-3 text-lg font-semibold text-red-600">
                        {formik.errors.time}
                      </div>
                    )}
                  </label>
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
                      <div className="text-xl text-center text-dark-default dark:text-light-default">
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
                              onClick={() =>
                                handlePickBeautician(visibleItem?._id)
                              }
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
                    )}
                  </div>
                  <span className="grid items-center justify-center">
                    <button
                      type="submit"
                      disabled={!formik.isValid}
                      className={`xl:px-6 md:px-4 font-medium capitalize rounded-lg xl:text-xl lg:text-[1rem] md:text-xs lg:text-base md:text-[.75rem] btn btn-primary text-light-default dark:text-dark-default md:mt-10 xl:mt-5 ${
                        !formik.isValid && "opacity-50 cursor-not-allowed"
                      }`}
                    >
                      Submit
                    </button>
                  </span>
                </form>
              </div>
            </div>
          </Card>
        </>
      )}
    </>
  );
}
