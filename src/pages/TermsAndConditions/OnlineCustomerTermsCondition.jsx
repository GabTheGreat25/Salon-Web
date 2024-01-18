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
        By utilizing our Salon Appointment System, you acknowledge and agree to the following terms and conditions.
        </h3>
        <br />
        <br />
        <h3 className="font-light text-justify 2xl:text-4xl md:text-3xl">
        The reservation fee is non-refundable, even in the case of appointment cancellation, though you may reschedule based on availability.
        </h3>
        <br />
        <br />
        <h3 className="font-light text-justify 2xl:text-4xl md:text-3xl">
        Please adhere to salon policies during your appointment, as failure to comply may result in termination without refund.
        </h3>
        <br />
        <br />
        <h3 className="font-light text-justify 2xl:text-4xl md:text-3xl">
        These terms may be modified, and continued use of the system constitutes acceptance of updated terms. 
        </h3>
        <br />
        <br />
        <h3 className="font-light text-justify 2xl:text-4xl md:text-3xl">
        By Agreeing the Terms & Condition of Lhanlee Beauty Lounge, you confirm that you have read and agree to the Salon Appointment Terms and Conditions and understand the non-refundable nature of the reservation fee.
        </h3>
        <br />
        <br />
      </div>
    </>
  );
}
