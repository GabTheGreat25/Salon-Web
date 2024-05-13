import React from "react";
import { FaArrowLeft } from "react-icons/fa";

export default function () {
  const goBack = () => {
    window.history.back();
  };
  return (
    <>
      <div className="items-center justify-center min-h-screen px-10 py-5">
        <button onClick={goBack}>
          <FaArrowLeft size={30} />
        </button>
        <h1 className="pb-6 text-6xl font-bold text-center">
          Terms And Conditions
        </h1>
        <h3 className="font-light text-justify 2xl:text-4xl md:text-3xl">
          By utilizing our Salon Appointment System, you acknowledge and agree
          to the following terms and conditions.
        </h3>
        <br />
        <br />
        <h3 className="font-light text-justify 2xl:text-4xl md:text-3xl">
          To secure your appointment, a non-refundable reservation fee of 30%
          from total price of your checkouts must be paid through Maya or in
          cash at the salon.
        </h3>
        <br />
        <br />
        <h3 className="font-light text-justify 2xl:text-4xl md:text-3xl">
          Ensure the payment of the reservation fee is completed at least a day
          before your scheduled appointment time to avoid cancellation. The
          reservation fee is non-refundable, even in the case of appointment
          cancellation, though you may reschedule based on availability. Please
          adhere to salon policies during your appointment, as failure to comply
          may result in termination without refund.
        </h3>
        <br />
        <br />
        <h2 className="font-light text-justify 2xl:text-4xl md:text-3xl">
          Appointment Schedule
        </h2>
        <br />
        <h3 className="font-light text-justify 2xl:text-4xl md:text-3xl">
          For Online Appointment a fee of 30% from total price of your checkouts
          must be paid through Maya, or in cash at the salon. For Walk-in
          appointments, We accepted on a first-come, first-served basis without
          the requirement of a reservation fee of 30%.
        </h3>
        <br />
        <h3 className="font-light text-justify 2xl:text-4xl md:text-3xl">
          You are required to be physically present at the salon for at least an
          hour. before your desired appointment time for online appointments,
          while for walk-in appointments, the customer should be present 30
          minutes before their scheduled appointment.
        </h3>
        <br />
        <h3 className="font-light text-justify 2xl:text-4xl md:text-3xl">
          By using our Lhanlee Beauty Lounge Appointment/Management System, you
          confirm that you have read and agree to the Salon Appointment System
          Terms and Conditions and understand the non-refundable nature of the
          reservation fee.
        </h3>
      </div>
    </>
  );
}
