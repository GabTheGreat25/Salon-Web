import React, { useState, useEffect } from "react";
import { BeauticianSidebar } from "@/components";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useGetTimesQuery } from "@api";
import { FadeLoader } from "react-spinners";

export default function () {
  const { data: time, isLoading: timeLoading } = useGetTimesQuery();
  const today = new Date();

  const getNextDays = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const nextDay = new Date();
      nextDay.setDate(today.getDate() + i);
      const nextDayOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      days.push({
        dayOfWeek: nextDay.toLocaleDateString("en-PH", nextDayOptions),
      });
    }
    return days;
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

  const handleDateChange = (date) => {
    const selectedDate = new Date(date);
    selectedDate.setDate(selectedDate.getDate() + 1);

    const formatted = selectedDate.toISOString().split("T")[0];
    console.log(formatted);
  };

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedTimes, setSelectedTimes] = useState([]);

  const openModal = () => {
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
    if (selectedTimes.includes(time)) {
      setSelectedTimes(
        selectedTimes.filter((selectedTime) => selectedTime !== time)
      );
    } else {
      setSelectedTimes([...selectedTimes, time]);
    }
  };

  return (
    <>
      {timeLoading ? (
        <div className="loader">
          <FadeLoader color="#FDA7DF" loading={true} size={50} />
        </div>
      ) : (
        <>
          <div className="flex h-full">
            <BeauticianSidebar />
            <div className="grid items-start flex-1 min-h-screen gap-6 p-10 xl:grid-cols-[42.5%_57.5%]">
              <div className="h-full p-10 bg-primary-default rounded-xl">
                <h1 className="pb-10 text-2xl font-semibold text-dark-default dark:text-light-default">
                  My Shifts
                </h1>
                <div className="grid grid-flow-row-dense gap-y-8">
                  {getNextDays().map((day, index) => (
                    <div
                      key={index}
                      className="grid px-8 rounded-lg 2xl:py-2 md:py-6 2xl:grid-cols-[60%_auto] bg-secondary-default  gap-x-4"
                    >
                      <div className="text-light-default dark:text-dark-default">
                        <h1 className="text-base font-semibold">
                          {day.dayOfWeek}
                        </h1>
                        <h3>5 hours</h3>
                      </div>
                      <div
                        type="button"
                        onClick={openModal}
                        className="cursor-pointer grid items-center justify-center my-[.35rem] bg-secondary-variant rounded-xl md:h-full 2xl:h-3/4 w-full font-semibold text-dark-default dark:text-light-default"
                      >
                        <button>Add Shift</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="h-full p-10 bg-primary-default rounded-xl">
                <h1 className="pb-6 text-2xl font-semibold text-dark-default dark:text-light-default">
                  File Leave
                </h1>
                <div className="grid grid-flow-row-dense gap-y-6">
                  <Calendar
                    onChange={handleDateChange}
                    tileDisabled={tileDisabled}
                    className={`w-fit text-center border-dark-default dark:border-light-default border-2 !important`}
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
                    id="description"
                    name="description"
                    autoComplete="off"
                    placeholder="Leave a note about your reason of leave here..."
                    className="resize-none block my-4 xl:text-xl lg:text-[1rem] md:text-sm placeholder-dark-default dark:placeholder-light-default border-2 bg-card-input w-full border-dark-default dark:border-light-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 rounded-lg"
                    rows="6"
                  ></textarea>
                  <button className="grid items-center justify-center py-2 text-2xl rounded-lg 2xl:mx-48 xl:mx-32 lg:mx-24 md:mx-16 bg-secondary-default">
                    Submit
                  </button>
                </div>
              </div>
            </div>
            {isModalOpen && (
              <>
                <div className="fixed inset-0 flex items-center justify-center bg-opacity-60 bg-neutral-primary">
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
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}
