import React, { useState, useEffect } from "react";
import { useGetTransactionsQuery, useGetSchedulesQuery } from "@api";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { FadeLoader } from "react-spinners";
import { useSelector, useDispatch } from "react-redux";
import { openSlice } from "@open";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";

const localizer = momentLocalizer(moment);

const customMessages = {
  agenda: "Events",
};

export default function () {
  const { data, isLoading } = useGetTransactionsQuery();
  const transactions = data?.details || [];

  const completedAndPendingTransactions = transactions.filter(
    (transaction) =>
      transaction.status === "completed" || transaction.status === "pending"
  );

  const { data: allSchedules } = useGetSchedulesQuery();

  const leaveSchedules =
    allSchedules?.details.filter(
      (schedule) =>
        schedule.leaveNoteConfirmed === true && schedule.status === "leave"
    ) || [];

  const absentSchedules =
    allSchedules?.details.filter((schedule) => schedule.status === "absent") ||
    [];

  const events = completedAndPendingTransactions.map((transaction) => {
    const startTime = moment(
      `${transaction?.appointment?.date} ${transaction?.appointment?.time}`,
      "YYYY-MM-DD hh:mm A"
    );

    const endTime = startTime.clone().add(2, "hours");

    return {
      title: `Customer: ${
        transaction?.appointment?.customer?.name
      }, Services: ${transaction?.appointment?.service
        .map((s) => s?.service_name)
        .join(", ")}, Beautician: ${transaction?.appointment?.beautician
        ?.map((b) => b?.name)
        .join(", ")}`,
      start: startTime.toDate(),
      end: endTime.toDate(),
      transactionsData: transaction,
    };
  });

  const scheduleEvents = leaveSchedules.map((schedule) => {
    const startDate =
      schedule.date instanceof Date ? schedule.date : new Date(schedule.date);

    return {
      title: `Leave Day of ${schedule.beautician.name}`,
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

  const allEvents = [...events, ...scheduleEvents, ...scheduleAbsentEvents];

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
      {isLoading ? (
        <div className="loader">
          <FadeLoader color="#FDA7DF" loading={true} size={50} />
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
                      <p>
                        <span className="font-semibold">Beautician:</span>{" "}
                        {selectedEvent.transactionsData?.appointment?.beautician
                          ?.map((b) => b?.name)
                          .join(", ")}
                      </p>
                      <div className="mt-4 text-xl">
                        {selectedEvent.transactionsData?.status && (
                          <p>
                            <span className="font-semibold">Status:</span>{" "}
                            {selectedEvent.transactionsData?.status}
                          </p>
                        )}
                      </div>
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
                      {selectedEvent.transactionsData?.status ===
                        "completed" && (
                        <>
                          <h1 className="pt-4 text-lg font-semibold text-center">
                            Copy Of Customer's Receipt
                          </h1>
                          <div className="grid items-center justify-center pt-2">
                            <img
                              src={selectedEvent.transactionsData?.qrCode}
                              alt="qr code"
                              className="w-48 h-48 rounded-xl"
                            />
                          </div>
                        </>
                      )}
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
