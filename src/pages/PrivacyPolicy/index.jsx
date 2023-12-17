import React from "react";
import { FaArrowLeft } from "react-icons/fa";

export default function () {
  const goBack = () => {
    window.history.back();
  };
  return (
    <>
      <div className="items-center justify-center h-full px-10 py-5">
        <button onClick={goBack}>
          <FaArrowLeft size={30} />
        </button>
        <h1 className="pb-6 text-6xl font-bold text-center">Privacy Policy</h1>
        <h3 className="text-3xl font-light text-justify">
          When you register and use the Lhanlee Beauty Lounge
          Appointment/Management System, we collect personal information such as
          your name, contact details, and other relevant details necessary for
          appointment scheduling. For users choosing to pay through GCash, we
          may collect payment details, including transaction information. For
          cash payments at the salon, we may record the transaction details. We
          use the collected information to facilitate appointment scheduling,
          generate QR codes, and verify appointments at the salon. Payment
          information is used solely for processing reservation fees and related
          transactions. We may use your contact information to send appointment
          confirmations, reminders, and other essential communications related
          to your appointments. We implement industry-standard security measures
          to protect customer information from unauthorized access, disclosure,
          alteration, and destruction. The reservation fee is non-refundable,
          and no customer information is retained for refund purposes. We retain
          customer information for the duration necessary for the purpose for
          which it was collected and in compliance with legal obligations. We
          may update this Privacy Policy as needed. Users will be notified of
          any significant changes, and continued use of the system constitutes
          acceptance of the updated policy.
        </h3>
        <br />
        <br />
        <h3 className="text-3xl font-light 2xl:text-center md:text-justify">
          By using our Lhanlee Beauty Lounge Appointment/Management System, you
          agree to the terms outlined in this Privacy Policy.
        </h3>
      </div>
    </>
  );
}
