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
        <h1 className="pb-6 text-6xl font-bold text-center">Privacy Policy</h1>
        <h3 className="font-light text-justify 2xl:text-4xl md:text-3xl">
          By registering as a beautician, you agree to the Lhanlee Beauty
          Lounge's Privacy Policy:
        </h3>
        <br />
        <br />
        <h3 className="font-light text-justify 2xl:text-4xl md:text-3xl">
          When you register and use the Lhanlee Lounge Salon’s Beautician
          Registration and Management System, we collect personal information
          necessary for the registration process.
        </h3>
        <br />
        <br />
        <h3 className="font-light text-justify 2xl:text-4xl md:text-3xl">
          This may include your name, contact details, and other relevant
          information. For the purpose of maintaining accurate records, we may
          also record transaction details if applicable, such as for
          administrative purposes.
        </h3>
        <br />
        <br />
        <h3 className="font-light text-justify 2xl:text-4xl md:text-3xl">
          The collected information is solely used to facilitate the beautician
          registration process, manage scheduling, and maintain essential
          records. We may use your contact information to communicate essential
          details such as appointment confirmations and other relevant
          communications related to the beautician registration and management
          process.
        </h3>
        <br />
        <br />
        <h3 className="font-light text-justify 2xl:text-4xl md:text-3xl">
          To safeguard your information from unauthorized access, disclosure,
          alteration, and destruction, we implement industry-standard security
          measures.
        </h3>
        <br />
        <br />
        <h3 className="font-light text-justify 2xl:text-4xl md:text-3xl">
          This Privacy Policy may be updated periodically, and users will be
          notified of any significant changes. Continued use of the Lhanlee
          Lounge Salon’s Beautician Registration and Management System
          constitutes acceptance of the updated policy.
        </h3>
      </div>
    </>
  );
}
