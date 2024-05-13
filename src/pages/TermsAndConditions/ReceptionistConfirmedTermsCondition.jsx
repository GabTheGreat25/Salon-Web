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
          By registering as a beautician on our platform, you acknowledge and
          agree to the following terms and conditions.
        </h3>
        <br />
        <br />
        <h3 className="font-light text-justify 2xl:text-4xl md:text-3xl">
          Upon acceptance into Lhanlee Lounge Salon, I, as a receptionist,
          willingly commit to upholding the terms and conditions outlined for my
          membership.
        </h3>
        <br />
        <br />
        <h3 className="font-light text-justify 2xl:text-4xl md:text-3xl">
          Recognizing the importance of confidentiality, I pledge to safeguard
          all proprietary and confidential information pertaining to the salon's
          business practices, client details, and trade secrets.
        </h3>
        <br />
        <br />
        <h3 className="font-light text-justify 2xl:text-4xl md:text-3xl">
          Furthermore, I acknowledge that any intellectual property generated
          during my affiliation with the salon, be it individually or
          collaboratively, remains the exclusive property of the salon,
          encompassing branding, marketing materials, and unique service
          methodologies.
        </h3>
        <br />
        <br />
        <h3 className="font-light text-justify 2xl:text-4xl md:text-3xl">
          I am cognizant that any breach of these terms and conditions,
          violation of confidentiality, unprofessional conduct, or actions
          deemed detrimental to the salon's reputation may result in the
          termination of my association with Lhanlee Lounge Salon.
        </h3>
        <br />
        <br />
        <h3 className="font-light text-justify 2xl:text-4xl md:text-3xl">
          Lhanlee Lounge Salon reserves the right to modify these terms and conditions,
          with notification of any changes provided.
        </h3>
        <br />
        <br />
        <h3 className="font-light text-justify 2xl:text-4xl md:text-3xl">
          My continued affiliation with the salon implies acceptance of any
          updated terms.
        </h3>
        <br />
        <br />
        <h3 className="font-light text-justify 2xl:text-4xl md:text-3xl">
          Lhanlee By endorsing my continued association with Lhanlee Lounge
          Salon, I affirm that I have read, understood, and agree to abide by
          these Beautician Membership Terms and Conditions.
        </h3>
      </div>
    </>
  );
}
