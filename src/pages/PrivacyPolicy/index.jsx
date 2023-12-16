import { React } from "react";
import { FaArrowLeft } from "react-icons/fa";

export default function () {
  const goBack = () => {
    window.history.back();
  };
  return (
    <>
      <div className="bg-pink-400 h-full mt-6 mb-6 flex flex-col">
        <div className="flex justify-start text-white items-center mt-6 mb-6 ml-4">
          <button onClick={goBack}>
            <FaArrowLeft size={30} />
          </button>
          <h1 className="text-center text-4xl text-white font-bold flex-grow">
            Privacy Policy
          </h1>
        </div>
        <div className="block mb-6 ml-2 mr-2">
          <p className="text-white p-1 text-xl leading-8 font-normal">
            When you register and use the Lhanlee Beauty Lounge
            Appointment/Management System, we collect personal information such
            as your name, contact details, and other relevant details necessary
            for appointment scheduling. For users choosing to pay through GCash,
            we may collect payment details, including transaction information.
            For cash payments at the salon, we may record the transaction
            details. We use the collected information to facilitate appointment
            scheduling, generate QR codes, and verify appointments at the salon.
            Payment information is used solely for processing reservation fees
            and related transactions. We may use your contact information to
            send appointment confirmations, reminders, and other essential
            communications related to your appointments. We implement
            industry-standard security measures to protect customer information
            from unauthorized access, disclosure, alteration, and destruction.
            The reservation fee is non-refundable, and no customer information
            is retained for refund purposes. We retain customer information for
            the duration necessary for the purpose for which it was collected
            and in compliance with legal obligations. We may update this Privacy
            Policy as needed. Users will be notified of any significant changes,
            and continued use of the system constitutes acceptance of the
            updated policy. By using our Lhanlee Beauty Lounge
            Appointment/Management System, you agree to the terms outlined in
            this Privacy Policy.
          </p>
        </div>
      </div>
    </>
  );
}
