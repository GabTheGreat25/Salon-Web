import React from "react";
import { Card, CardImage } from "@components";
import {
  useUpdateScheduleAppointmentMutation,
  useGetAppointmentByIdQuery,
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

export default function () {
  const handleTimeClick = (time) => {
    formik.setFieldValue("time", time);
    formik.setFieldTouched("time", true);
    formik.handleChange();
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

  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth.user);

  const isOnlineCustomer = auth?.roles?.includes("Online Customer");

  const [updateAppointment] = useUpdateScheduleAppointmentMutation();
  const { id } = useParams();

  const { data, isLoading } = useGetAppointmentByIdQuery(id);
  const appointments = data?.details;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      date: appointments?.date || "",
      time: appointments?.time || "",
    },
    validationSchema: editScheduleValidation,
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
          } else
            toast.error(`${response?.error?.data?.error?.message}`, toastProps);
        }
      );
    },
  });

  return (
    <>
      {isLoading ? (
        <div className="loader">
          <FadeLoader color="#FDA7DF" loading={true} size={50} />
        </div>
      ) : (
        <>
          <Card>
            <div className="grid w-full h-full text-light-default dark:text-dark-default">
              <span className="grid items-end md:gap-y-10 justify-center 2xl:grid-rows-[90%_10%] xl:grid-rows-[80%_20%] md:grid-rows-[75%_25%]">
                <h1 className="text-3xl font-semibold text-center">
                  Edit Schedule Appointment
                </h1>
                <p className="text-xl text-center lg:px-12 text-light-default dark:text-dark-default">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Excepturi, laborum!
                </p>
              </span>
              <div className="overflow-x-hidden grid grid-cols-[50%_50%] items-center justify-start pt-20 pb-6 gap-x-6 2xl:pr-0 md:pr-10">
                <CardImage />
                <form
                  onSubmit={formik.handleSubmit}
                  className="grid items-end justify-center w-full grid-flow-row-dense pr-12 2xl:h-3/4 xl:h-full"
                >
                  <label className="block">
                    <span
                      className={`xl:text-xl lg:text-[1rem] md:text-xs font-semibold ${
                        formik.touched.date && formik.errors.date
                          ? "text-red-600"
                          : ""
                      }`}
                    >
                      Select Date:
                    </span>
                    <Calendar
                      onChange={(date) => {
                        formik.setFieldValue("date", date);
                      }}
                      value={formik.values.date}
                      tileDisabled={tileDisabled}
                      className={`${
                        formik.touched.date && formik.errors.date
                          ? "border-red-600"
                          : "border-light-default"
                      } block my-2 xl:text-lg lg:text-[1rem] bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-fit`}
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
                      className={`xl:text-xl lg:text-[1rem] md:text-xs font-semibold ${
                        formik.touched.time && formik.errors.time
                          ? "text-red-600"
                          : ""
                      }`}
                    >
                      Time:
                    </span>
                    <div className="grid grid-flow-row-dense grid-cols-4 pt-2 gap-y-6">
                      {timeSlots.map((time, index) => (
                        <div
                          key={index}
                          className={`cursor-pointer grid items-center justify-center py-3 2xl:mx-3 xl:mx-2  md:mx-1 rounded-xl text-light-default dark:text-dark-default ${
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
