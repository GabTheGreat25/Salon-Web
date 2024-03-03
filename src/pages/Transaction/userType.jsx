import React from "react";
import { useDispatch } from "react-redux";
import Logo1 from "@assets/Logo-1.png";
import Logo3 from "@assets/Logo-3.png";
import { feeSlice } from "@fee";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AppointmentType() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOnlineAppointment = () => {
    dispatch(feeSlice.actions.hasFee());
    navigate("/customer/checkout");
  };

  const handleWalkInAppointment = () => {
    const currentDate = new Date();

    const currentHourPH = currentDate.getUTCHours() + 8;
    const currentMinutePH = currentDate.getUTCMinutes();

    if (
      (currentHourPH === 18 && currentMinutePH >= 1) ||
      currentHourPH < 8 ||
      currentHourPH >= 20
    ) {
      toast.warning(
        "Same Day appointments are not available between 6:00 PM and 8:00 AM. Thank you for your understanding.",
        {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
        }
      );
    } else {
      dispatch(feeSlice.actions.hasNoFee());
      navigate("/customer/checkout");
    }
  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <>
      <div className="grid items-center w-full min-h-screen p-8 justify-stretch">
        <div className="grid grid-cols-[5%_95%] items-start">
          <button className="px-8 text-4xl" onClick={goBack}>
            <FaArrowLeft />
          </button>
          <h1 className="pb-10 font-medium text-center xl:text-6xl md:text-5xl">
            Choose Your Appointment Type
          </h1>
        </div>
        <div className="grid grid-cols-[47.5%_auto_47.5%] px-6">
          <div className="bg-primary-default rounded-xl">
            <span className="grid items-center justify-center">
              <img
                src={Logo1}
                alt="Logo1"
                className="w-full h-full md:w-auto md:h-auto object-center"
              />
            </span>
            <div className="items-center px-3 pt-6 pb-3 rounded-b-lg text-dark-default h-[14rem]">
              <h1 className="pb-3 font-semibold text-center dark:text-light-default xl:text-4xl lg:text-2xl md:text-lg">
                Online Appointment
              </h1>
              <p className="text-center xl:text-base lg:text-lg md:text-base text-neutral-primary dark:text-light-default">
                Choose a date and time for your appointment and pay a fine of
                150 pesos for the reservation fee directly at the salon or using
                your E-Wallet.
              </p>
              <span className="grid items-center justify-center py-6">
                <button
                  onClick={handleOnlineAppointment}
                  className="py-2 font-medium capitalize rounded-lg xl:px-6 lg:px-4 md:px-2 2xl:text-2xl md:text-lg bg-secondary-default text-dark-default dark:text-ligh-default"
                >
                  Continue To Checkout
                </button>
              </span>
            </div>
          </div>
          <div className="grid items-center justify-center w-full h-full">
            <h1 className="text-4xl font-medium">or</h1>
          </div>
          <div className="bg-primary-default rounded-xl">
            <span className="grid items-center justify-center">
              <img
                src={Logo3}
                alt="Logo1"
                className="w-full h-full md:w-auto md:h-auto object-center"
              />
            </span>
            <div className="items-center px-3 pt-6 pb-3 rounded-b-lg text-dark-default h-[14rem]">
              <h1 className="pb-3 font-semibold text-center dark:text-light-default xl:text-4xl lg:text-2xl md:text-lg">
                Same Day Appointment
              </h1>
              <p className="text-center xl:text-base lg:text-lg md:text-base text-neutral-primary dark:text-light-default">
                Have your appointment today and pay the full amount of the
                service directly at the salon or using your E-Wallet.
              </p>
              <span className="grid items-center justify-center py-6">
                <button
                  onClick={handleWalkInAppointment}
                  className="py-2 font-medium capitalize rounded-lg xl:px-6 lg:px-4 md:px-2 2xl:text-2xl md:text-lg bg-secondary-default text-dark-default dark:text-ligh-default"
                >
                  Continue To Checkout
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
