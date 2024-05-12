import React, { useState, useRef, useEffect } from "react";
import { useGetTransactionsQuery, useGetSchedulesQuery } from "@api";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { FadeLoader } from "react-spinners";
import { useSelector } from "react-redux";

const localizer = momentLocalizer(moment);

const customMessages = {
  agenda: "Events",
};

export default function () {
  const isFocused = useRef(true);
  const { user } = useSelector((state) => state.auth);

  const { data, isLoading, refetch } = useGetTransactionsQuery();
  const transactions = data?.details || [];

  const {
    data: allSchedules,
    isLoading: loadingSchedules,
    refetch: refetchSchedules,
  } = useGetSchedulesQuery();

  const schedules =
    allSchedules?.details.filter(
      (schedule) =>
        schedule.beautician._id === user?._id &&
        schedule.leaveNoteConfirmed == true
    ) || [];

  useEffect(() => {
    const handleFocus = async () => {
      isFocused.current = true;
      await Promise.all([refetch(), refetchSchedules()]);
    };

    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, [refetch, refetchSchedules]);

  const userTransactions = transactions.filter(
    (transaction) => transaction?.appointment?.beautician?._id === user._id
  );

  const completedTransactions = userTransactions.filter(
    (transaction) => transaction.status === "pending"
  );

  const transactionEvents = completedTransactions.map((transaction) => ({
    title: `Customer: ${
      transaction?.appointment?.customer?.name
    }, Services: ${transaction?.appointment?.service
      .map((s) => s?.service_name)
      .join(", ")}`,
    start: moment(
      `${transaction?.appointment?.date} ${transaction?.appointment?.time}`,
      "YYYY-MM-DD hh:mm A"
    ).toDate(),
    end: moment(
      `${transaction?.appointment?.date} ${transaction?.appointment?.time}`,
      "YYYY-MM-DD hh:mm A"
    )
      .add(2, "hours")
      .toDate(),
    transactionsData: transaction,
  }));

  const leaveEvents = schedules.map((schedule) => {
    const startDate =
      schedule.date instanceof Date ? schedule.date : new Date(schedule.date);

    return {
      title: `Leave Day`,
      start: new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate(),
        0,
        0,
        0
      ),
      end: new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate(),
        24,
        0,
        0
      ),
      scheduleData: schedule,
    };
  });

  const absentSchedules =
    allSchedules?.details.filter(
      (schedule) =>
        schedule.beautician._id === user?._id && schedule.status === "absent"
    ) || [];

  const scheduleAbsentEvents = absentSchedules.map((schedule) => {
    const startDate =
      schedule.date instanceof Date ? schedule.date : new Date(schedule.date);

    return {
      title: `Absent of ${schedule.beautician.name}`,
      start: new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate(),
        0,
        0,
        0
      ),
      end: new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate(),
        24,
        0,
        0
      ),
      scheduleData: schedule,
    };
  });

  const eventPropGetter = (event) => {
    const backgroundColorClass =
      event.transactionsData?.status === "completed"
        ? "bg-[#2ecc71]"
        : event.scheduleData
        ? event.scheduleData.status === "leave"
          ? "bg-[#3498db]"
          : "bg-[#e74c3c]"
        : "bg-[#f1c40f]";

    return {
      className: `${backgroundColorClass}`,
    };
  };

  const allEvents = [
    ...transactionEvents,
    ...leaveEvents,
    ...scheduleAbsentEvents,
  ];

  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  useEffect(() => {
    if (selectedEvent) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedEvent]);

  return (
    <>
      {isLoading || loadingSchedules ? (
        <div className="loader">
          <FadeLoader color="#FFB6C1" loading={true} size={50} />
        </div>
      ) : (
        <>
          <div className="rounded-2xl h-[1000px] m-10 px-2 py-10 bg-primary-default">
            <Calendar
              localizer={localizer}
              events={allEvents}
              startAccessor="start"
              endAccessor="end"
              onSelectEvent={handleSelectEvent}
              popup
              messages={customMessages}
              eventPropGetter={eventPropGetter}
            />
          </div>

          {selectedEvent && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-[999]">
              <div className="fixed w-full h-full opacity-75 bg-neutral-primary"></div>
              <div className="bg-light-default dark:bg-dark-default py-6 px-12 text-justify rounded-lg shadow-lg z-[1000] w-[30rem]">
                <div className="text-xl text-dark-default dark:text-light-default">
                  {selectedEvent.transactionsData ? (
                    <>
                      <p>
                        <span className="font-semibold">Customer:</span>{" "}
                        {
                          selectedEvent.transactionsData?.appointment?.customer
                            ?.name
                        }
                      </p>
                      <p>
                        <span className="font-semibold">Services:</span>{" "}
                        {selectedEvent.transactionsData?.appointment?.service
                          .map((s) => s?.service_name)
                          .join(", ")}
                      </p>
                      <div className="mt-4 text-xl">
                        <p className="font-semibold">
                          Start Time:{" "}
                          {moment(selectedEvent.start).format("hh:mm A")}
                        </p>
                        <p className="font-semibold">
                          End Time:{" "}
                          {moment(selectedEvent.end).format("hh:mm A")}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <p>
                        <span className="font-semibold">Reason:</span>{" "}
                        {selectedEvent.scheduleData.leaveNote ||
                          "No reason provided because beautician is absent"}
                      </p>
                    </>
                  )}
                </div>
                <span className="grid items-center justify-center">
                  <button
                    onClick={handleCloseModal}
                    className="w-full px-20 py-2 mt-6 border rounded border-primary-accent text-dark-default dark:text-light-default hover:bg-primary-default focus:outline-none"
                  >
                    Close
                  </button>
                </span>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
