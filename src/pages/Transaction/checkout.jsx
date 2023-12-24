import React, { useState } from "react";
import FaceWash from "@assets/FaceWash.png";
import Gcash from "@assets/G-cash.png";
import Beautician from "@assets/Beautician.png";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const data = [
  {
    salon: "Lhanlee Beauty Salon",
    item: {
      image: FaceWash,
      name: "Face Wash",
      variation: "Face Service",
      price: "₱ 1,300.00",
      schedule: "Appointment by 5 Feb 2023 11:00am Tue",
    },
  },
  {
    salon: "Lhanlee Beauty Salon",
    item: {
      image: FaceWash,
      name: "Face Wash",
      variation: "Face Service",
      price: "₱ 1,300.00",
      schedule: "Appointment by 5 Feb 2023 11:00am Tue",
    },
  },
  {
    salon: "Lhanlee Beauty Salon",
    item: {
      image: FaceWash,
      name: "Face Wash",
      variation: "Face Service",
      price: "₱ 1,300.00",
      schedule: "Appointment by 5 Feb 2023 11:00am Tue",
    },
  },
  {
    salon: "Lhanlee Beauty Salon",
    item: {
      image: FaceWash,
      name: "Face Wash",
      variation: "Face Service",
      price: "₱ 1,300.00",
      schedule: "Appointment by 5 Feb 2023 11:00am Tue",
    },
  },
  {
    salon: "Lhanlee Beauty Salon",
    item: {
      image: FaceWash,
      name: "Face Wash",
      variation: "Face Service",
      price: "₱ 1,300.00",
      schedule: "Appointment by 5 Feb 2023 11:00am Tue",
    },
  },
];

const beauticianData = [
  {
    name: "Raul",
    description:
      "Lorem ipsum dolor, consectetur adipiscing elit. Jorem ipsum dolor, consectetur adipiscing elit. Jorem ipsum dolor, consectetur adipiscing elit.",
  },
  {
    name: "Maria",
    description:
      "Lorem ipsum dolor, consectetur adipiscing elit. Jorem ipsum dolor, consectetur adipiscing elit. Jorem ipsum dolor, consectetur adipiscing elit.",
  },
  {
    name: "John",
    description:
      "Lorem ipsum dolor, consectetur adipiscing elit. Jorem ipsum dolor, consectetur adipiscing elit. Jorem ipsum dolor, consectetur adipiscing elit.",
  },
];

const timeSlots = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
];

const paymentMethods = ["Cash", "GCash"];

export default function () {
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  const isOnlineCustomer = user.roles.includes("Online Customer");

  const receipt = () => {
    navigate(
      `${isOnlineCustomer ? "/onlineCustomer" : "/walkInCustomer"}/receipt`
    );
  };

  const goBack = () => {
    window.history.back();
  };

  const [selectedDate, setSelectedDate] = useState(new Date());

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
    setSelectedDate(date);
  };

  const [currentPage, setCurrentPage] = useState(0);

  const totalItems = beauticianData.length;

  const showNextItem = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % totalItems);
  };

  const showPreviousItem = () => {
    setCurrentPage((prevPage) =>
      prevPage - 1 < 0 ? totalItems - 1 : prevPage - 1
    );
  };

  const visibleItem = beauticianData[currentPage];

  const [selectedTime, setSelectedTime] = useState(null);

  const handleTimeClick = (time) => {
    setSelectedTime(time);
  };

  const [selectedPayment, setSelectedPayment] = useState("");

  const handleCheckboxChange = (value) => {
    setSelectedPayment(value === selectedPayment ? "" : value);
  };

  return (
    <>
      <div className="grid w-full h-full grid-cols-[60%_40%] pb-10">
        <div>
          <div className="grid items-center justify-center grid-flow-col-dense w-fit">
            <button className="p-10 text-3xl w-fit" onClick={goBack}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <h1 className="text-3xl">Appointment List</h1>
          </div>
          <div className="grid grid-flow-row-dense px-10 gap-y-8">
            {data.map((entry, index) => (
              <div
                key={index}
                className="flex items-center px-8 py-6 rounded-lg bg-primary-default"
              >
                <div className="flex-grow">
                  <h2 className="pb-2 font-sans font-semibold lg:text-2xl md:text-base">
                    {`${entry.salon}`}
                  </h2>
                  <hr className="mb-4 border-t border-dark-default dark:border-light-default" />
                  <div className="grid grid-cols-2 px-8">
                    <div className="grid xl:grid-cols-[25%_75%] md:grid-cols-[30%_70%] gap-x-2">
                      <div className="grid items-center justify-center">
                        <img
                          src={entry.item.image}
                          alt={entry.item.name}
                          className="object-cover 2xl:w-32 xl:w-28 xl:h-24 lg:w-20 lg:h-16 2xl:h-32 md:w-16 md:h-14 rounded-2xl"
                        />
                      </div>
                      <div>
                        <div className="grid grid-flow-row pr-8">
                          <h3 className="font-semibold xl:text-xl lg:text-lg md:text-base">
                            {entry.item.name}
                          </h3>
                          <p className="font-semibold xl:text-lg lg:text-base md:text-sm">
                            Variation: {entry.item.variation}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="grid items-end justify-end w-full grid-flow-row-dense">
                        <h3 className="font-semibold xl:text-xl lg:text-lg md:text-base">
                          {entry.item.schedule}
                        </h3>
                        <div className="grid items-center justify-end">
                          <h3 className="font-semibold xl:text-xl lg:text-lg md:text-base">
                            {entry.item.price}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="grid items-center justify-center grid-flow-row-dense pt-9 h-fit">
          <div className="text-center">
            <h1 className="text-3xl">Select Date and Time</h1>
          </div>

          <div className="py-10 lg:px-8 md:px-4">
            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
              tileDisabled={tileDisabled}
              className={`w-full text-center rounded-lg`}
              tileClassName={({ date }) =>
                isWithinRange(date)
                  ? "cursor-pointer hover:bg-primary-accent focus:bg-primary-accent active:bg-primary-accent !important"
                  : "bg-primary-default !important"
              }
            />
            <h1 className="py-10 text-3xl text-center">Available Time Slot</h1>
            <div className="grid grid-flow-row-dense grid-cols-4 gap-y-6">
              {timeSlots.map((time, index) => (
                <div
                  key={index}
                  className={`cursor-pointer grid items-center justify-center py-3 2xl:mx-4 xl:mx-3 lg:mx-2 md:mx-1 rounded-xl text-light-default dark:text-dark-default ${
                    time === selectedTime
                      ? "bg-primary-accent"
                      : "bg-primary-variant"
                  } rounded-xl`}
                  onClick={() => handleTimeClick(time)}
                >
                  <button className="xl:text-base md:text-sm">{time}</button>
                </div>
              ))}
            </div>
            <h1 className="pt-10 text-3xl text-center">Choose A Beautician</h1>
            <div className="grid items-center justify-end w-full">
              {totalItems > 1 && (
                <div className="flex items-end justify-end mb-4">
                  <button
                    className="px-3 py-1 mr-2 text-xl rounded-full bg-primary-default w-fit"
                    onClick={showPreviousItem}
                    disabled={currentPage === 0}
                  >
                    <FontAwesomeIcon icon={faArrowLeft} />
                  </button>
                  <button
                    className="px-3 py-1 ml-2 text-xl rounded-full bg-primary-default w-fit"
                    onClick={showNextItem}
                    disabled={currentPage === totalItems - 1}
                  >
                    <FontAwesomeIcon icon={faArrowRight} />
                  </button>
                </div>
              )}
            </div>
            <div className="grid w-full">
              <div className="grid items-start justify-start xl:grid-cols-[50%_50%] py-3 rounded-xl bg-primary-default">
                <span className="grid items-center justify-center">
                  <img
                    src={Beautician}
                    alt="Beautician"
                    className="w-[22rem] h-[16rem]"
                  />
                </span>
                <div className="grid h-full grid-rows-[30%_70%] py-4 pr-6 xl:pl-2 md:pl-6">
                  <div className="grid items-start justify-start">
                    <span>
                      <h1 className="pb-2 font-semibold 2xl:text-2xl md:text-xl md:py-3 xl:py-0">
                        {visibleItem.name}
                      </h1>
                    </span>
                    <span>
                      <h1 className="text-justify 2xl:text-lg xl:text-base">
                        {visibleItem.description}
                      </h1>
                    </span>
                  </div>
                  <span className="grid items-end justify-end h-full">
                    <button className="px-8 py-2 text-lg border rounded-lg border-light-default dark:border-dark-default">
                      Pick
                    </button>
                  </span>
                </div>
              </div>
            </div>
            <div className="p-10 my-10 rounded-lg bg-primary-default">
              <h1 className="pb-6 text-3xl">Select Payment Method</h1>

              {paymentMethods.map((method) => (
                <div
                  key={method}
                  className="grid items-center justify-center grid-flow-col pb-2 w-fit gap-x-4"
                >
                  <input
                    className="p-4 border rounded border-light-default dark:border-dark-default focus:border-primary-default focus:ring-primary-default checked:bg-primary-default checked:dark:bg-dark-default"
                    type="checkbox"
                    name="paymentMethod"
                    value={method.toLowerCase()}
                    checked={selectedPayment === method.toLowerCase()}
                    onChange={() => handleCheckboxChange(method.toLowerCase())}
                  />
                  {method === "GCash" ? (
                    <div className="grid items-center justify-start grid-flow-col-dense w-fit">
                      <img
                        src={Gcash}
                        alt="Gcash"
                        className="object-cover w-16 h-16"
                      />
                      <label className="text-3xl">{method}</label>
                    </div>
                  ) : (
                    <label className="text-3xl">{method}</label>
                  )}
                </div>
              ))}
            </div>
            <div className="grid grid-flow-row-dense">
              <div className="px-8 py-10 rounded-lg bg-primary-default">
                <div className="grid grid-flow-col-dense gap-x-8">
                  <span>
                    <h1 className="font-semibold xl:text-xl lg:text-lg md:text-base">
                      Order Summary
                    </h1>
                  </span>
                  <span className="text-end">
                    <h1>₱ 1300.00</h1>
                  </span>
                </div>
                <h1 className="pt-1 pb-10">Subtotal (5 items)</h1>
                <div className="grid grid-flow-col-dense gap-x-8">
                  <span>
                    <h1 className="font-semibold xl:text-xl lg:text-lg md:text-base">
                      Extra Fee
                    </h1>
                  </span>
                  <span className="text-end">
                    <h1>₱ 00.00</h1>
                  </span>
                </div>
                <hr className="my-4 border-t border-dark-default dark:border-light-default" />
                <div className="grid grid-flow-col-dense pb-16 gap-x-8">
                  <span>
                    <h1 className="font-semibold xl:text-xl lg:text-lg md:text-base">
                      Subtotal
                    </h1>
                  </span>
                  <span className="text-end">
                    <h1>₱ 1300.00</h1>
                  </span>
                </div>
                <div
                  onClick={receipt}
                  className="w-full py-3 text-center rounded-lg cursor-pointer xl:text-xl lg:text-lg md:text-base bg-light-default dark:bg-dark-default"
                >
                  <button>Confirm</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
