import React, { useState, useEffect } from "react";
import { BeauticianSidebar } from "@/components";
import {
  useGetSchedulesQuery,
  useUpdateScheduleMutation,
  useDeleteScheduleMutation,
} from "@api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { createExcuseValidation } from "@validation";
import { useSelector } from "react-redux";
import { FadeLoader } from "react-spinners";
import { addDeletedItemId, getDeletedItemIds } from "../.././utils/DeleteItem";

export default function () {
  const { user } = useSelector((state) => state.auth);
  const { data: allSchedules } = useGetSchedulesQuery();
  const deletedScheduleIds = getDeletedItemIds("schedule");

  const schedules =
    allSchedules?.details.filter(
      (schedule) =>
        schedule.beautician._id === user?._id &&
        schedule.isLeave === true &&
        schedule.leaveNoteConfirmed === false &&
        !deletedScheduleIds?.includes(schedule._id)
    ) || [];

  const [updateSchedule] = useUpdateScheduleMutation();
  const [deleteSchedule, { isLoading: isDeleting }] =
    useDeleteScheduleMutation();

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this Leave Date?")) {
      const response = await deleteSchedule(id);

      const toastProps = {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      };
      if (response?.data?.success === true) {
        toast.success(`${response?.data?.message}`, toastProps);
        addDeletedItemId("schedule", id);
      } else
        toast.error(`${response?.error?.data?.error?.message}`, toastProps);
    }
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  const formikExcuse = useFormik({
    enableReinitialize: true,
    initialValues: {
      date: selectedSchedule?.date || "",
      leaveNote: selectedSchedule?.leaveNote || "",
    },
    validationSchema: createExcuseValidation,
    onSubmit: async (values) => {
      updateSchedule({ id: selectedSchedule._id, payload: values }).then(
        (response) => {
          const toastProps = {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000,
          };
          if (response?.data?.success === true) {
            setModalOpen(false);
            toast.success(`${response?.data?.message}`, toastProps);
          } else
            toast.error(`${response?.error?.data?.error?.message}`, toastProps);
        }
      );
    },
  });

  const isWithinRange = (date) => {
    const today = new Date();
    const next7Days = new Date(today);
    next7Days.setDate(today.getDate() + 7);

    const isMonday = date.getDay() === 1;

    return isMonday || date > today && date <= next7Days;
  };

  const tileDisabled = ({ date }) => {
    const today = new Date();
    const endOfCurrentWeek = new Date(today);
    endOfCurrentWeek.setDate(today.getDate() + 7 - today.getDay());

    const isMonday = date.getDay() === 1;


    return date <= endOfCurrentWeek || isMonday;
  };

  const handleDateChange = (date) => {
    const selectedDate = new Date(date);
    selectedDate.setDate(selectedDate.getDate() + 1);

    const formatted = selectedDate.toISOString().split("T")[0];
    formikExcuse.setFieldValue("date", formatted);
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "short",
    };
    return new Date(dateString).toLocaleDateString("en-PH", options);
  };

  const openModal = (schedule) => {
    setSelectedSchedule(schedule);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedSchedule(null);
    setModalOpen(false);
  };

  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [modalOpen]);

  return (
    <>
      {isDeleting ? (
        <div className="mt-8 loader">
          <FadeLoader color="#FDA7DF" loading={true} size={50} />
        </div>
      ) : (
        <>
          <div className="flex h-full">
            <BeauticianSidebar />
            <div className="grid items-start flex-1 min-h-screen gap-6 p-10">
              <div className="h-full p-10 bg-primary-default rounded-xl">
                <h1 className="pb-6 text-2xl font-semibold text-dark-default dark:text-light-default">
                  Schedule Of Leave
                </h1>
                <div className="grid grid-flow-row-dense gap-y-6">
                  {schedules.map((schedule) => (
                    <div
                      key={schedule._id}
                      className="p-4 rounded-lg shadow-lg bg-light-default dark:bg-dark-default"
                    >
                      <h2 className="mb-2 text-2xl">
                        Date of Leave:{" "}
                        <span className="font-semibold ">
                          {formatDate(schedule.date)}
                        </span>
                      </h2>
                      <p className="text-base text-dark-default dark:text-light-default">
                        Reason:{" "}
                        <span className="font-semibold ">
                          {schedule.leaveNote}
                        </span>
                      </p>
                      <div className="float-right mt-4 ">
                        <button
                          onClick={() => openModal(schedule)}
                          className="px-10 py-2 mr-4 text-lg font-medium bg-blue-500 rounded-md hover:bg-primary-dark-default"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(schedule._id)}
                          className="px-10 py-2 text-lg font-medium bg-red-500 rounded-md hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {modalOpen && selectedSchedule && (
            <div className="z-[1000] fixed inset-0 flex items-center justify-center mt-20 bg-opacity-60 bg-neutral-primary">
              <div className="w-full p-8 m-48 rounded-lg shadow-lg bg-light-default dark:bg-dark-default">
                <div className="pb-4 text-2xl font-semibold text-dark-default dark:text-light-default">
                  Leave Date
                </div>
                <form onSubmit={formikExcuse.handleSubmit}>
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
                  <div className="pt-4 text-2xl font-semibold text-dark-default dark:text-light-default">
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
                  <div className="grid float-right grid-flow-col-dense mt-4 gap-x-4">
                    <button
                      type="submit"
                      className="px-4 py-2 text-2xl rounded-lg bg-secondary-default"
                    >
                      Submit
                    </button>
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-4 py-2 text-2xl rounded-lg bg-primary-default hover:bg-primary-dark-default"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
