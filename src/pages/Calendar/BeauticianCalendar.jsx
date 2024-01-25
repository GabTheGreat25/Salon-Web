import React, { useState, useEffect } from "react";
import { useGetTransactionsQuery } from "@api";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { FadeLoader } from "react-spinners";
import { useSelector } from "react-redux";

const localizer = momentLocalizer(moment);

const customMessages = {
  agenda: "Events",
};

export default function MyCalendar() {
  const { user } = useSelector((state) => state.auth);

  const { data, isLoading } = useGetTransactionsQuery();
  const transactions = data?.details || [];

  const userTransactions = transactions.filter(
    (transaction) => transaction.appointment.beautician._id === user._id
  );

  const completedTransactions = userTransactions.filter(
    (transaction) => transaction.status === "pending"
  );
  const events = completedTransactions.map((transactions) => {
    const startTime = moment(
      `${transactions?.appointment?.date} ${transactions?.appointment?.time}`,
      "YYYY-MM-DD hh:mm A"
    );

    const endTime = startTime.clone().add(2, "hours");

    return {
      title: `Customer: ${
        transactions?.appointment?.customer?.name
      }, Services: ${transactions?.appointment?.service
        .map((s) => s?.service_name)
        .join(", ")}`,
      start: startTime.toDate(),
      end: endTime.toDate(),
      transactionsData: transactions,
    };
  });

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
              events={events}
              startAccessor="start"
              endAccessor="end"
              onSelectEvent={handleSelectEvent}
              popup
              messages={customMessages}
            />
          </div>

          {selectedEvent && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-[999]">
              <div className="fixed w-full h-full opacity-75 bg-neutral-primary"></div>
              <div className="bg-light-default dark:bg-dark-default py-6 px-12 text-justify rounded-lg shadow-lg z-[1000] w-[30rem]">
                <div className="text-xl text-dark-default dark:text-light-default">
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
                </div>
                <div className="mt-4 text-xl">
                  <p className="font-semibold">
                    Start Time: {moment(selectedEvent.start).format("hh:mm A")}
                  </p>
                  <p className="font-semibold">
                    End Time: {moment(selectedEvent.end).format("hh:mm A")}
                  </p>
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