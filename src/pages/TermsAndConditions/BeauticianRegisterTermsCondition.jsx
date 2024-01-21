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
          By registering as a beautician, you agree to the following terms:
        </h3>
        <br />
        <br />
        <h3 className="font-light text-justify 2xl:text-4xl md:text-3xl">
          To initiate the process, you must complete the registration on our
          website, providing accurate and up-to-date information.
        </h3>
        <br />
        <br />
        <h3 className="font-light text-justify 2xl:text-4xl md:text-3xl">
          During registration, you will select available dates, specifically
          Mondays, for a face-to-face meeting with the salon owner.
        </h3>
        <br />
        <br />
        <h3 className="font-light text-justify 2xl:text-4xl md:text-3xl">
          It is your responsibility to be physically present at the salon for
          the scheduled meeting on the selected Monday, and failure to attend
          may result in the rejection of your hiring process.
        </h3>
        <br />
        <br />
        <h3 className="font-light text-justify 2xl:text-4xl md:text-3xl">
          Following the face-to-face meeting, the salon owner will review your
          application within 24 hours. If accepted, you will be notified via
          SMS, and you can proceed with the hiring process. In case of
          rejection, your registration may be deleted by the administrator or
          automatically removed after 7 days.
        </h3>
        <br />
        <br />
        <h3 className="font-light text-justify 2xl:text-4xl md:text-3xl">
          The availability of dates for face-to-face meetings is not guaranteed
          and may be subject to rescheduling or cancellation by the salon owner.
          The salon reserves the right to terminate the registration and hiring
          process at any stage if inaccurate information is provided or if there
          is a violation of salon policies, with termination occurring without
          notice.
        </h3>
        <br />
        <br />
        <h3 className="font-light text-justify 2xl:text-4xl md:text-3xl">
          The salon reserves the right to terminate the registration and hiring
          process at any stage if inaccurate information is provided or if there
          is a violation of salon policies, with termination occurring without
          notice.
        </h3>
        <br />
        <br />
        <h3 className="font-light text-justify 2xl:text-4xl md:text-3xl">
          Completion of the registration process confirms that you have read and
          agreed to these terms and conditions.
        </h3>
        <br />
        <br />
        <h3 className="font-light text-justify 2xl:text-4xl md:text-3xl">
          The salon also reserves the right to modify these terms, and continued
          use of the platform constitutes acceptance of any updated terms.{" "}
        </h3>
      </div>
    </>
  );
}
