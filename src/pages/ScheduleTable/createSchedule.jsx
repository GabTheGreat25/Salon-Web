import React from "react";
import { Card, CardImage } from "@components";
import { useAddScheduleMutation, useGetUsersQuery } from "@api";
import { createProductValidation } from "@validation";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FadeLoader } from "react-spinners";
import { useFormik } from "formik";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function () {
  const navigate = useNavigate();

  const [addSchedule, isLoading] = useAddScheduleMutation();
  const { data: user, isLoading: userLoading } = useGetUsersQuery();
  const beautician = user?.details || [];

  const activeBeautician = beautician.filter(
    (beautician) =>
      beautician?.roles?.includes("Beautician") && beautician?.active === true
  );

  const handleDateChange = (date) => {
    const selectedDate = new Date(date);
    selectedDate.setDate(selectedDate.getDate() + 1);

    const formatted = selectedDate.toISOString().split("T")[0];
    formik.setFieldValue("date", formatted);
  };

  const tileDisabled = ({ date }) => {
    const today = new Date();
    const endOfNextMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 2,
      0
    );

    const isMonday = date.getDay() === 1;

    return date > endOfNextMonth || date < today || isMonday;
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

  const formik = useFormik({
    initialValues: {
      beautician: "",
      isLeave: false,
      leaveNoteConfirmed: false,
      leaveNote: "",
      date: "",
    },
    validationSchema: createProductValidation,
    onSubmit: async (values) => {
      addSchedule(values).then((response) => {
        const toastProps = {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
        };
        if (response?.data?.success === true) {
          navigate("/admin/schedules");
          toast.success(`${response?.data?.message}`, toastProps);
        } else
          toast.error(`${response?.error?.data?.error?.message}`, toastProps);
      });
    },
  });

  return (
    <>
      {!isLoading || userLoading ? (
        <div className="loader">
          <FadeLoader color="#FDA7DF" loading={true} size={50} />
        </div>
      ) : (
        <>
          <Card>
            <div className="grid w-full h-full text-light-default dark:text-dark-default">
              <span className="grid items-end md:gap-y-10 justify-center 2xl:grid-rows-[90%_10%] xl:grid-rows-[80%_20%] md:grid-rows-[75%_25%]">
                <h1 className="text-3xl font-semibold text-center">
                  Create Schedule
                </h1>
                <p className="text-xl text-center lg:px-12 text-light-default dark:text-dark-default">
                  Create Schedule for Beauticians/Stylist in Lhanlee Beauty
                  Lounge
                </p>
              </span>
              <div className="overflow-x-hidden grid grid-cols-[50%_50%] items-center justify-start pt-20 pb-6 gap-x-6 2xl:pr-0 md:pr-10">
                <CardImage />
                <form
                  onSubmit={formik.handleSubmit}
                  className="grid items-end justify-center w-full grid-flow-row-dense pr-12 2xl:h-5/6 xl:h-full gap-y-4"
                >
                  <label className="block">
                    <span
                      className={`${
                        formik.touched.beautician &&
                        formik.errors.beautician &&
                        "text-red-600"
                      } xl:text-xl lg:text-[1rem] md:text-xs font-semibold`}
                    >
                      Beautician:
                    </span>
                    <select
                      id="beautician"
                      name="beautician"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.beautician}
                      className={` ${
                        formik.touched.beautician && formik.errors.beautician
                          ? "border-red-600"
                          : "border-light-default"
                      } block mb-2 ml-6 xl:text-lg lg:text-[1rem] placeholder-white border-0 border-b-2 bg-card-input  dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full`}
                    >
                      <option value="" disabled>
                        Select a Beautician
                      </option>
                      {activeBeautician?.map((b) => (
                        <option
                          key={b?._id}
                          value={b?._id}
                          className="font-semibold  text-dark-default  dark:text-dark-default"
                        >
                          {b?.name}
                        </option>
                      ))}
                    </select>
                    {formik.touched.beautician && formik.errors.beautician && (
                      <div className="text-lg font-semibold text-red-600">
                        {formik.errors.beautician}
                      </div>
                    )}
                  </label>

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
                      className={`${
                        formik.touched.leaveNote &&
                        formik.errors.leaveNote &&
                        "text-red-600"
                      } font-semibold xl:text-xl lg:text-[.8rem] md:text-[.55rem]`}
                    >
                      <p>Leave Note</p>
                    </span>
                    <textarea
                      id="leaveNote"
                      name="leaveNote"
                      autoComplete="off"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.leaveNote}
                      placeholder="Beautician's Leave Note"
                      className="resize-none block my-4 xl:text-xl lg:text-[1rem] md:text-sm placeholder-white border-2 bg-card-input w-full border-light-default dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default rounded-lg"
                      rows="8"
                    ></textarea>
                    {formik.touched.leaveNote && formik.errors.leaveNote && (
                      <div className="text-lg font-semibold text-red-600">
                        {formik.errors.leaveNote}
                      </div>
                    )}
                  </label>
                  <label className="block">
                    <span
                      className={`xl:text-xl lg:text-[1rem] md:text-xs font-semibold`}
                    >
                      On Leave?
                    </span>
                    <input
                      type="checkbox"
                      id="isLeave"
                      name="isLeave"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      checked={formik.values.isLeave}
                      className="ml-6 px-5 py-5 rounded border-primary-default focus:border-primary-default focus:ring-primary-default checked:bg-primary-default checked:dark:bg-dark-default"
                    />
                  </label>

                  <label className="block">
                    <span
                      className={`xl:text-xl lg:text-[1rem] md:text-xs font-semibold`}
                    >
                      Confirmed Leave Note
                    </span>
                    <input
                      type="checkbox"
                      id="leaveNoteConfirmed"
                      name="leaveNoteConfirmed"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      checked={formik.values.leaveNoteConfirmed}
                      className="ml-6 px-5 py-5 rounded border-primary-default focus:border-primary-default focus:ring-primary-default checked:bg-primary-default checked:dark:bg-dark-default"
                    />
                  </label>
                  <span className="grid items-center justify-center">
                    <button
                      type="submit"
                      disabled={!formik.isValid}
                      className={`xl:px-6 md:px-4 font-medium capitalize rounded-lg xl:text-xl lg:text-[1rem] md:text-xs lg:text-base md:text-[.75rem] btn btn-primary text-light-default dark:text-dark-default ${
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
