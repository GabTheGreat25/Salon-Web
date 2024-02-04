import React from "react";
import { BeauticianSidebar } from "@/components";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useAddScheduleMutation } from "@api";
import { FadeLoader } from "react-spinners";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import { createExcuseValidation } from "@validation";

export default function () {
  const [addSchedule, isLoading] = useAddScheduleMutation();
  const { user } = useSelector((state) => state.auth);

  const getDefaultDate = () => {
    const today = new Date();
    const next8Days = new Date(today);
    next8Days.setDate(today.getDate() + 8);

    return next8Days;
  };

  const formikExcuse = useFormik({
    initialValues: {
      beautician: user?._id,
      date: getDefaultDate().toISOString().split("T")[0],
      isLeave: true,
      leaveNote: "",
      isAvailable: [],
    },
    validationSchema: createExcuseValidation,
    onSubmit: async (values) => {
      addSchedule(values).then((response) => {
        const toastProps = {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
        };
        if (response?.data?.success === true) {
          formikExcuse.resetForm();
          toast.success(`${response?.data?.message}`, toastProps);
        } else
          toast.error(`${response?.error?.data?.error?.message}`, toastProps);
      });
    },
  });

  const isWithinRange = (date) => {
    const today = new Date();
    const next7Days = new Date(today);
    next7Days.setDate(today.getDate() + 7);

    return date >= today && date <= next7Days;
  };

  const tileDisabled = ({ date }) => {
    const today = new Date();
    const next7Days = new Date(today);
    next7Days.setDate(today.getDate() + 7);

    const isMonday = date.getDay() === 1;

    return date < today || date <= next7Days || isMonday;
  };

  const handleDateChange = (date) => {
    const selectedDate = new Date(date);
    selectedDate.setDate(selectedDate.getDate() + 1);

    const formatted = selectedDate.toISOString().split("T")[0];
    formikExcuse.setFieldValue("date", formatted);
  };

  return (
    <>
      {!isLoading ? (
        <div className="loader">
          <FadeLoader color="#FDA7DF" loading={true} size={50} />
        </div>
      ) : (
        <>
          <div className="flex h-full">
            <BeauticianSidebar />
            <div className="grid items-start flex-1 min-h-screen gap-6 xl:p-10 md:p-20">
              <div className="h-full p-10 bg-primary-default rounded-xl">
                <h1 className="pb-6 text-2xl font-semibold text-dark-default dark:text-light-default">
                  Leave Date
                </h1>
                <form onSubmit={formikExcuse.handleSubmit}>
                  <div className="grid grid-flow-row-dense gap-y-4">
                    <Calendar
                      onChange={handleDateChange}
                      value={formikExcuse.values.date}
                      tileDisabled={tileDisabled}
                      className={`w-full text-center border-dark-default dark:border-light-default border-2 !important`}
                      tileClassName={({ date }) =>
                        isWithinRange(date)
                          ? "cursor-pointer hover:bg-primary-accent focus:bg-primary-accent active:bg-primary-accent !important"
                          : "bg-primary-default !important"
                      }
                    />
                    <div className="text-2xl font-semibold text-dark-default dark:text-light-default">
                      Leave Note
                    </div>
                    <textarea
                      id="leaveNote"
                      name="leaveNote"
                      autoComplete="off"
                      placeholder="Leave a note about your reason for leave here..."
                      className="resize-none block my-4 xl:text-xl lg:text-[1rem] md:text-sm placeholder-dark-default dark:placeholder-light-default border-2 bg-card-input w-full border-dark-default dark:border-light-default focus:ring-0 focus:border-secondary-default rounded-lg"
                      rows="6"
                      onChange={formikExcuse.handleChange}
                      onBlur={formikExcuse.handleBlur}
                      value={formikExcuse.values.leaveNote}
                    ></textarea>
                    {formikExcuse.errors.leaveNote &&
                      formikExcuse.touched.leaveNote && (
                        <div className="text-red-500">
                          {formikExcuse.errors.leaveNote}
                        </div>
                      )}
                    <button
                      type="submit"
                      className="grid items-center justify-center py-2 text-2xl rounded-lg 2xl:mx-[30rem] xl:mx-72 lg:mx-48 md:mx-32 bg-secondary-default"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
