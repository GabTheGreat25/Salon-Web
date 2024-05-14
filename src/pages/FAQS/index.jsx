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
          <span className="text-primary-default">FAQS</span> About{" "}
          <span className="text-primary-default">Lhanlee Salon</span>
        </h1>
        <br />
        <br />
        <h2 className="font-bold text-justify 2xl:text-4xl md:text-3xl text-primary-default">
          1.) About Lhanlee Salon
        </h2>
        <br />
        <br />
        <h3 className="font-light text-justify 2xl:text-4xl md:text-3xl">
          Nestled in the vibrant community of Taguig City, Lhanlee Beauty Lounge
          invites you to experience a haven of beauty and
          relaxation.Conveniently located at 22 Calleja Street, Central Signal
          Village, our salon is dedicated to providing an unparalled pampering
          experience tailored to your unique needs. Since 2019, Lhanlee Beauty
          Lounge has been a trusted destination for those seeking top tier
          beauty services.
        </h3>
        <br />
        <br />
        <h2 className="font-bold text-justify 2xl:text-4xl md:text-3xl text-primary-default">
          2.) Where is Lhanlee Salon Located ?
        </h2>
        <br />
        <br />
        <h3 className="font-light text-justify 2xl:text-4xl md:text-3xl">
          We are located at: 22 Calleja Street Central Signal Village, Taguig
          City Philippines.
        </h3>
        <br />
        <br />
        <h2 className="font-bold text-justify 2xl:text-4xl md:text-3xl text-primary-default">
          3.) What Services do you Offer ?
        </h2>
        <br />
        <br />
        <h3 className="font-light text-justify 2xl:text-4xl md:text-3xl">
          We Offer top tier services to work with your hands, hair feet, face
          body and eyelashes.
        </h3>
        <br />
        <br />
        <h2 className="font-bold text-justify 2xl:text-4xl md:text-3xl text-primary-default">
          4.) What Payment does Lhanlee Salon Accept ?
        </h2>
        <br />
        <br />
        <h3 className="font-light text-justify 2xl:text-4xl md:text-3xl">
          We Accept cash and e-wallet payments.
        </h3>
        <br />
        <br />
        <h2 className="font-bold text-justify 2xl:text-4xl md:text-3xl text-primary-default">
          5.) What are Lhanlee Salon's Business Hours ?
        </h2>
        <br />
        <br />
        <h3 className="font-light text-justify 2xl:text-4xl md:text-3xl">
          Lhanlee Salon's Business Hours run from monday through sunday,
          providing quality services from{" "}
          <span className="mr-2 transition duration-1000 ease-in-out cursor-pointer hover:text-primary-default">
            {" "}
            8:00 A.M to 6:00 P.M{" "}
          </span>{" "}
          each day.
        </h3>
        <br />
        <br />
        <h2 className="font-bold text-justify 2xl:text-4xl md:text-3xl text-primary-default">
          6.) How else i can cotact Lhanlee Salon ?
        </h2>
        <br />
        <br />
        <h3 className="font-light text-justify 2xl:text-4xl md:text-3xl">
          You can email us at:{" "}
          <span className="mr-2 transition duration-1000 ease-in-out cursor-pointer hover:text-primary-default">
            alexijiopeja@gmail.com
          </span>
          or contact us through phone{" "}
          <span className="mr-2 transition duration-1000 ease-in-out cursor-pointer hover:text-primary-default">
            {" "}
            +63 956 802 8031
          </span>
        </h3>
        <br />
        <br />
      </div>
    </>
  );
}
