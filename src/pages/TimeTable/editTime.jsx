import React, { useEffect } from "react";
import { useFormik } from "formik";
import { Card, CardImage } from "@components";
import { useUpdateTimeMutation, useGetTimeByIdQuery } from "@api";
import { editTimeValidation } from "@validation";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FadeLoader } from "react-spinners";

export default function () {
  const navigate = useNavigate();
  const [updateTime] = useUpdateTimeMutation();
  const { id } = useParams();
  const { data, isLoading } = useGetTimeByIdQuery(id);
  const time = data?.details;

  const convertToServerFormat = (userInput) => {
    const [hours, minutes] = userInput.split(":");
    let period = "AM";
    let formattedHours = parseInt(hours, 10);

    if (formattedHours >= 12) {
      period = "PM";
      formattedHours = formattedHours === 12 ? 12 : formattedHours - 12;
    } else formattedHours = formattedHours === 0 ? 12 : formattedHours;

    const formattedTime = `${formattedHours
      .toString()
      .padStart(2, "0")}:${minutes} ${period}`;

    return formattedTime;
  };

  const convertToClientFormat = (serverTime) => {
    if (!serverTime) return "";

    const [time, period] = serverTime.split(" ");
    const [hours, minutes] = time.split(":");
    const formattedHours =
      period === "PM" ? parseInt(hours, 10) + 12 : parseInt(hours, 10);
    const formattedTime = `${formattedHours
      .toString()
      .padStart(2, "0")}:${minutes}`;
    return formattedTime;
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      time: convertToClientFormat(time?.time) || "",
    },
    validationSchema: editTimeValidation,
    onSubmit: async (values) => {
      const serverFormattedTime = convertToServerFormat(values.time);

      const [formattedHours, formattedMinutes, period] = serverFormattedTime
        .split(/:| /)
        .map((value) => (isNaN(value) ? value : Number(value)));

      const hours24 = period === "PM" ? formattedHours + 12 : formattedHours;

      if (
        hours24 < 9 ||
        (hours24 === 9 && formattedMinutes < 0) ||
        (hours24 === 18 && formattedMinutes > 0) ||
        hours24 > 18
      ) {
        toast.error("Please choose a time between 9:00 AM and 6:00 PM.", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
        });
        return;
      }

      updateTime({ id: time._id, payload: { time: serverFormattedTime } }).then(
        (response) => {
          const toastProps = {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000,
          };
          if (response?.data?.success === true) {
            navigate("/admin/times");
            toast.success(`${response?.data?.message}`, toastProps);
          } else {
            toast.error(`${response?.error?.data?.error?.message}`, toastProps);
          }
        }
      );
    },
  });

  return (
    <>
      {isLoading ? (
        <div className="loader">
          <FadeLoader color="#FFB6C1" loading={true} size={50} />
        </div>
      ) : (
        <>
          <Card>
            <div className="grid w-full h-full text-light-default dark:text-dark-default">
              <span className="grid items-end md:gap-y-5 2xl:gap-y-10 justify-center 2xl:grid-rows-[90%_10%] xl:grid-rows-[80%_20%] md:grid-rows-[75%_25%]">
                <h1 className="pt-6 font-semibold text-center xl:text-3xl md:text-2xl">
                  Edit Appointment Time
                </h1>
                <p className="text-center xl:text-xl md:text-lg lg:px-12 text-light-default dark:text-dark-default">
                  Edit Appointment Time Details
                </p>
              </span>
              <div className="overflow-x-hidden grid grid-cols-[50%_50%] items-start justify-start pt-20 pb-6 gap-x-6 2xl:pr-0 md:pr-10">
                <CardImage />
                <form
                  onSubmit={formik.handleSubmit}
                  className="grid items-end justify-center w-full grid-flow-row-dense pt-20 pr-12 h-fit gap-y-4"
                >
                  <label className="block">
                    <span
                      className={`${
                        formik.touched.time && formik.errors.time
                          ? "text-red-600"
                          : "xl:text-xl md:text-[1rem] font-semibold"
                      }`}
                    >
                      Time:
                    </span>
                    <input
                      type="time"
                      id="time"
                      name="time"
                      autoComplete="off"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.time}
                      className={`${
                        formik.touched.time && formik.errors.time
                          ? "border-red-600"
                          : "border-light-default"
                      } block mb-2 ml-6 xl:text-lg md:text-[1rem] placeholder-white border-0 border-b-2 bg-card-input  dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full`}
                    />
                    {formik.touched.time && formik.errors.time && (
                      <div className="text-lg font-semibold text-red-600">
                        {formik.errors.time}
                      </div>
                    )}
                  </label>

                  <span className="grid items-center justify-center">
                    <button
                      type="submit"
                      disabled={!formik.isValid}
                      className={`xl:px-6 md:px-4 font-medium capitalize rounded-lg xl:text-xl lg:text-base md:text-[1rem]  btn btn-primary text-light-default dark:text-dark-default ${
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
