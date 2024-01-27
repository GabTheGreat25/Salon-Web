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
          By utilizing our Salon Appointment System for walk-in customers, you
          acknowledge and agree to the following terms and conditions.
        </h3>
        <br />
        <br />
        <h3 className="font-light text-justify 2xl:text-4xl md:text-3xl">
          Walk-in appointments are accepted on a first-come, first-served basis
          without the requirement of a reservation fee.{" "}
        </h3>
        <br />
        <br />
        <h3 className="font-light text-justify 2xl:text-4xl md:text-3xl">
          You are required to be physically present at the salon at least 30
          minutes before your desired appointment time. Late arrivals may result
          in the forfeiture of your appointment.{" "}
        </h3>
        <br />
        <br />
        <h3 className="font-light text-justify 2xl:text-4xl md:text-3xl">
          Appointments are subject to availability, and we cannot guarantee
          immediate service during peak hours.{" "}
        </h3>
        <br />
        <br />
        <h3 className="font-light text-justify 2xl:text-4xl md:text-3xl">
          Please adhere to salon policies during your appointment, as failure to
          comply may result in termination without refund. These terms may be
          modified, and continued use of the system constitutes acceptance of
          updated terms.
        </h3>
      </div>
    </>
  );
}
