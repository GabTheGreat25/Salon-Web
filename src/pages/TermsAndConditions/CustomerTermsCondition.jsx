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
          Thank you for choosing our salon for your beauty needs. Before
          proceeding with your appointment booking, please read and understand
          the following terms and conditions:
        </h3>
        <br />
        <h2 className="font-light text-justify 2xl:text-4xl md:text-3xl">
          1. Reservation Fee
        </h2>
        <br />
        <h3 className="font-light text-justify 2xl:text-4xl md:text-3xl">
          To secure your appointment, a non-refundable reservation fee of 150
          pesos must be paid through Maya, other online banks by scanning the QR
          code, or in cash at the salon.
        </h3>
        <br />
        <br />
        <h3 className="font-light text-justify 2xl:text-4xl md:text-3xl">
          Upon successful payment, you will receive a unique QR code containing
          your appointment details, which must be presented for verification.
        </h3>
        <br />
        <br />
        <h3 className="font-light text-justify 2xl:text-4xl md:text-3xl">
          Ensure the payment of the reservation fee is completed at least one
          hour before your scheduled appointment time to avoid cancellation.
        </h3>
        <br />
        <br />
        <h3 className="font-light text-justify 2xl:text-4xl md:text-3xl">
          Please adhere to salon policies during your appointment, as failure to
          comply may result in termination without refund. These terms may be
          modified, and continued use of the system constitutes acceptance of
          updated terms.
        </h3>
        <br />
        <h2 className="font-light text-justify 2xl:text-4xl md:text-3xl">
          2. Cancellation and Rescheduling
        </h2>
        <br />
        <h3 className="font-light text-justify 2xl:text-4xl md:text-3xl">
          The reservation fee is non-refundable, even in the case of appointment
          cancellation.
        </h3>
        <br />
        <br />
        <h3 className="font-light text-justify 2xl:text-4xl md:text-3xl">
          If you wish to reschedule your appointment, we will allow one
          rescheduling with no additional charges. The new appointment date must
          be near your previous appointment date
        </h3>
        <br />
        <br />

        <h3 className="font-light text-justify 2xl:text-4xl md:text-3xl">
          By Agreeing the Terms & Condition of Lhanlee Beauty Lounge, you
          confirm that you have read and agree to the Salon Appointment Terms
          and Conditions and understand the non-refundable nature of the
          reservation fee.
        </h3>
        <br />
        <h2 className="font-light text-justify 2xl:text-4xl md:text-3xl">
          3. Service Warranty
        </h2>
        <br />
        <h3 className="font-light text-justify 2xl:text-4xl md:text-3xl">
          Every service provided by our salon comes with a warranty period in
          terms of hours and days, depending on the service. This warranty
          ensures the quality and satisfaction of the service you receive.
        </h3>
        <br />
        <br />
        <h3 className="font-light text-justify 2xl:text-4xl md:text-3xl">
          The specific warranty period for each service will be included in
          their descriptions.
        </h3>
        <br />
        <h2 className="font-light text-justify 2xl:text-4xl md:text-3xl">
          4. General Policies
        </h2>
        <br />
        <h3 className="font-light text-justify 2xl:text-4xl md:text-3xl">
          Please arrive at the salon at least 30 minutes before your scheduled
          appointment time to ensure a smooth and timely experience.
        </h3>
        <br />
        <br />
        <h3 className="font-light text-justify 2xl:text-4xl md:text-3xl">
          Late arrivals within your appointment time will automatically be
          considered a cancellation unless you reschedule it one time with no
          additional charge.
        </h3>
        <br />
        <h2 className="font-light text-justify 2xl:text-4xl md:text-3xl">
          5. COVID-19 Safety Measures:
        </h2>
        <br />
        <h3 className="font-light text-justify 2xl:text-4xl md:text-3xl">
          In adherence to health and safety guidelines, all clients are required
          to wear masks during their salon visit.
        </h3>
        <br />
        <br />
        <h3 className="font-light text-justify 2xl:text-4xl md:text-3xl">
          Please sanitize your hands upon entering the salon premises.
        </h3>
        <br />
        <br />
        <h3 className="font-light text-justify 2xl:text-4xl md:text-3xl">
          We regularly sanitize and disinfect all salon equipment and surfaces
          to ensure a clean and safe environment for our clients and staff.
        </h3>
        <br />
        <br />
        <h3 className="font-light text-justify 2xl:text-4xl md:text-3xl">
          By booking an appointment with our salon, you agree to abide by these
          terms and conditions. We appreciate your cooperation and look forward
          to providing you with exceptional service.
        </h3>
        <br />
      </div>
    </>
  );
}
