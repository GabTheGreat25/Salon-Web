import React, { useState, useEffect } from "react";
import { BeauticianSidebar } from "@/components";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  useGetTimesQuery,
  useGetSchedulesQuery,
  useUpdateScheduleMutation,
} from "@api";
import { FadeLoader } from "react-spinners";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";

export default function () {
  const { data: time, isLoading: timeLoading } = useGetTimesQuery();
  const { user } = useSelector((state) => state.auth);
  const { data: allSchedules } = useGetSchedulesQuery();
  const schedules =
    allSchedules?.details.filter(
      (schedule) => schedule.beautician._id === user?._id && !schedule.isLeave
    ) || [];
  const [updateSchedule] = useUpdateScheduleMutation();

  const getNextDays = () => {
    const today = new Date().toISOString().split("T")[0];

    const days = schedules
      .slice(0, 6)
      .filter((schedule) => schedule.date.split("T")[0] !== today)
      .map((schedule) => {
        const formattedDate = schedule.date.split("T")[0];
        const nextDayOptions = {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        };

        return {
          dayOfWeek: new Date(schedule.date).toLocaleDateString(
            "en-PH",
            nextDayOptions
          ),
          date: formattedDate,
          _id: schedule._id,
        };
      });

    return days;
  };

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [selectedScheduleId, setSelectedScheduleId] = useState(null);

  const openModal = (scheduleId) => {
    console.log("Selected Schedule ID:", scheduleId);
    setSelectedScheduleId(scheduleId);
    const selectedSchedule = schedules.find(
      (schedule) => schedule._id === scheduleId
    );
    setSelectedTimes(selectedSchedule?.isAvailable || []);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedTimes([]);
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  const handleTimeClick = (time) => {
    setSelectedTimes((prevTimes) =>
      prevTimes.includes(time)
        ? prevTimes.filter((selectedTime) => selectedTime !== time)
        : [...prevTimes, time]
    );
  };

  const formikSchedule = useFormik({
    enableReinitialize: true,
    initialValues: {
      isAvailable: schedules.isAvailable || [],
    },
    onSubmit: async (values) => {
      if (values.isAvailable.length < 5) {
        const toastProps = {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
        };
        toast.warning("Minimum of 5 Shifts per day", toastProps);
        return;
      }
      values.isAvailable = selectedTimes;
      console.log(values);
      updateSchedule({ id: selectedScheduleId, payload: values }).then(
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

  return (
    <>
      <div className="flex h-full">
        <BeauticianSidebar />
        <div className="grid items-start flex-1 min-h-screen gap-6 p-10">
          <div className="h-full p-10 bg-primary-default rounded-xl">
            <h1 className="pb-10 text-2xl font-semibold text-dark-default dark:text-light-default">
              My Shifts
            </h1>
            <div className="grid grid-flow-row-dense gap-y-8">
              {getNextDays().map((day, index) => (
                <div
                  key={index}
                  className="grid px-8 rounded-lg py-2 md:py-6 grid-cols-[60%_auto] bg-secondary-default  gap-x-4"
                >
                  <div className="text-light-default dark:text-dark-default">
                    <h1 className="text-base font-semibold">{day.dayOfWeek}</h1>
                    <h3>5 hours</h3>
                  </div>
                  <div
                    type="button"
                    onClick={() => openModal(day._id)}
                    className="grid items-center justify-end    font-semibold text-dark-default dark:text-light-default"
                  >
                    <button className="bg-secondary-variant py-3 px-10 rounded-xl">
                      Edit Shift
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {isModalOpen && (
          <div className="z-[1000] fixed inset-0 flex items-center justify-center bg-opacity-60 bg-neutral-primary">
            <div className="px-3 py-6 bg-light-default dark:bg-dark-default rounded-xl">
              <h1 className="text-xl font-semibold text-center">
                Add Your Time Shift
              </h1>
              <div className="grid grid-flow-row-dense grid-cols-3 gap-6 p-8 rounded-lg ">
                {time?.details?.map(({ _id, time }) => (
                  <div
                    key={_id}
                    className={`${
                      selectedTimes.includes(time)
                        ? "bg-primary-accent"
                        : "hover:bg-primary-accent focus:bg-primary-accent active:bg-primary-accent"
                    } cursor-pointer grid items-center justify-center 2xl:mx-4 xl:mx-3 lg:mx-2 md:mx-1 rounded-xl text-dark-default dark:text-light-default border-dark-default dark:border-light-default border-2 p-3`}
                    onClick={() => handleTimeClick(time)}
                  >
                    <h1 className="xl:text-base md:text-sm">{time}</h1>
                  </div>
                ))}
              </div>
              <div className="grid items-center justify-center grid-flow-col-dense mt-4 gap-x-4">
                <button
                  type="submit"
                  onClick={() => {
                    formikSchedule.setFieldValue("isAvailable", selectedTimes);
                    formikSchedule.submitForm();
                  }}
                  className="px-6 py-2 font-semibold rounded-md bg-primary-default"
                >
                  Confirm
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-2 font-semibold border rounded-md border-primary-default hover:bg-primary-accent hover:text-light-accent dark:hover:bg-primary-accent dark:hover:text-light-accent"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
