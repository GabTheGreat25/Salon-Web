import React from "react";
import { Card, CardImage } from "@components";
import { useAddMonthMutation } from "@api";
import { createMonthValidation } from "@validation";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FadeLoader } from "react-spinners";
import { useFormik } from "formik";

export default function () {
  const navigate = useNavigate();

  const [addMonth, isLoading] = useAddMonthMutation();
  const monthCount = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  const getMonthName = (monthNumber) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return monthNames[monthNumber];
  };

  const formik = useFormik({
    initialValues: {
      month: "",
      message: "",
    },
    validationSchema: createMonthValidation,
    onSubmit: async (values) => {
      addMonth(values).then((response) => {
        const toastProps = {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
        };
        if (response?.data?.success === true) {
          navigate("/admin/months");
          toast.success(`${response?.data?.message}`, toastProps);
        } else
          toast.error(`${response?.error?.data?.error?.message}`, toastProps);
      });
    },
  });

  return (
    <>
      {!isLoading ? (
        <div className="loader">
          <FadeLoader color="#FFB6C1" loading={true} size={50} />
        </div>
      ) : (
        <>
          <Card>
            <div className="grid w-full h-full text-light-default dark:text-dark-default">
              <span className="grid items-end md:gap-y-5 2xl:gap-y-10 justify-center 2xl:grid-rows-[90%_10%] xl:grid-rows-[80%_20%] md:grid-rows-[75%_25%]">
                <h1 className="text-3xl font-semibold text-center">
                  Lhanlee Salon Month Event Details
                </h1>
                <p className="text-xl text-center lg:px-12 text-light-default dark:text-dark-default">
                  Create a New Month Event in Lhanlee Beauty Lounge
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
                        formik.touched.month &&
                        formik.errors.month &&
                        "text-red-600"
                      } xl:text-xl md:text-[1rem] font-semibold`}
                    >
                      Month:
                    </span>
                    <select
                      id="month"
                      name="month"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.month}
                      className={` ${
                        formik.touched.month && formik.errors.month
                          ? "border-red-600"
                          : "border-light-default"
                      } block mb-2 ml-6 xl:text-lg md:text-[1rem] placeholder-white border-0 border-b-2 bg-card-input  dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full`}
                    >
                      <option value="" disabled>
                        Select a Month
                      </option>
                      {monthCount?.map((m, index) => (
                        <option
                          key={index}
                          value={m}
                          className="font-semibold text-dark-default dark:text-dark-default"
                        >
                          {getMonthName(m)}
                        </option>
                      ))}
                    </select>
                    {formik.touched.month && formik.errors.month && (
                      <div className="text-lg font-semibold text-red-600">
                        {formik.errors.month}
                      </div>
                    )}
                  </label>
                  <label className="block">
                    <span
                      className={`${
                        formik.touched.message &&
                        formik.errors.message &&
                        "text-red-600"
                      } xl:text-xl md:text-[1rem] font-semibold`}
                    >
                      Message:
                    </span>
                    <input
                      type="text"
                      id="message"
                      name="message"
                      autoComplete="off"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.message}
                      className={`${
                        formik.touched.message && formik.errors.message
                          ? "border-red-600"
                          : "border-light-default"
                      } block mb-2 ml-6 xl:text-lg md:text-[1rem] placeholder-white border-0 border-b-2 bg-card-input  dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full`}
                      placeholder="Enter The Name"
                    />
                    {formik.touched.message && formik.errors.message && (
                      <div className="text-lg font-semibold text-red-600">
                        {formik.errors.message}
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
