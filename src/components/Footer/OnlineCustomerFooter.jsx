import React from "react";
import {
  FaGooglePlay,
  FaPhoneAlt,
  FaRegEnvelope,
  FaFacebookSquare,
  FaInstagramSquare,
  FaTwitterSquare,
  FaCopyright,
  FaHome,
  FaUser,
  FaFileAlt,
  FaShieldAlt,
  FaInfoCircle,
  FaComment  
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function () {
  const navigate = useNavigate();

  const home = () => {
    navigate("/");
  };

  const profile = () => {
    navigate("/onlineCustomer/editCustomerProfile");
  };

  const termsCondition = ()=>{
    navigate("/onlineCustomer/termsAndConditions");
  };

  const privacyPolicy = ()=>{
    navigate("/onlineCustomer/privacyPolicy")
  };

  const about = ()=>{
    navigate("/onlineCustomer/about")
  };

  const feedback = () => {
    navigate("/onlineCustomer/feedback");
  }

  return (
    <>
      <footer className="w-full h-full px-10 pt-5 pb-20 bg-neutral-primary text-light-default dark:bg-light-default dark:text-dark-default">
        <div className="grid w-full grid-flow-col-dense">
        <div className="grid justify-center grid-flow-row-dense">
            <span className="lg:pb-4 md:pb-[.65rem] font-semibold xl:text-base lg:text-[.75rem] md:text-[.6rem] text-primary-default dark:text-dark-default">
              IMPORTANT INFORMATION
            </span>
            <a className="flex items-center py-1 no-underline link hover:text-primary-default hover:dark:text-neutral-secondary xl:text-base lg:text-[.75rem] md:text-[.6rem]"
            onClick={home}
            >
            <FaHome/>
              HOME
            </a>
            <a className="flex items-center pt-2 pb-1 no-underline link hover:text-primary-default hover:dark:text-neutral-secondary xl:text-base lg:text-[.75rem] md:text-[.6rem]"
             onClick={profile}
            >
            <FaUser/>
              PROFILE
            </a>
            <a className="flex items-center pt-2 pb-1 no-underline link hover:text-primary-default hover:dark:text-neutral-secondary xl:text-base lg:text-[.75rem] md:text-[.6rem]"
            onClick={termsCondition}
            >
              <FaFileAlt />
              TERMS & CONDITIONS
            </a>
            <a className="flex items-center pt-2 pb-1 no-underline link hover:text-primary-default hover:dark:text-neutral-secondary xl:text-base lg:text-[.75rem] md:text-[.6rem]"
            onClick={privacyPolicy}
            >
              <FaShieldAlt />
              PRIVACY POLICY
            </a>
          </div>
          <div className="grid justify-center grid-flow-row-dense">
            <span className="font-semibold xl:text-base lg:text-[.75rem] md:text-[.6rem] text-primary-default dark:text-dark-default">
              RESOURCES
            </span>
            <a className="relative flex items-center lg:bottom-0 md:bottom-1 no-underline link hover:text-primary-default hover:dark:text-neutral-secondary xl:text-base lg:text-[.75rem] md:text-[.6rem]"
            onClick={about}
            >
            <FaInfoCircle /> 
             ABOUT US
            </a>
            <a className="relative flex items-center lg:bottom-0 md:bottom-1 no-underline link hover:text-primary-default hover:dark:text-neutral-secondary xl:text-base lg:text-[.75rem] md:text-[.6rem]"
            onClick={feedback}
            >
            <FaComment/>
              FEEDBACK
            </a>
          </div>
          <div className="grid justify-center grid-flow-row-dense">
            <span className="font-semibold xl:text-base lg:text-[.75rem] md:text-[.6rem] text-primary-default dark:text-dark-default">
              DOWNLOAD
            </span>
            <div className="relative grid items-center justify-start grid-flow-col-dense gap-2 bottom-8 h-fit hover:text-primary-default hover:dark:text-neutral-secondary xl:text-base lg:text-[.75rem] md:text-[.6rem]">
              <FaGooglePlay />
              <a className="no-underline link "> GOOGLE PLAY (ANDROID)</a>
            </div>
          </div>
          <div className="grid justify-center grid-flow-row-dense">
            <span className="pb-3 font-semibold xl:text-base lg:text-[.75rem] md:text-[.6rem] text-primary-default dark:text-dark-default">
              CONTACT US
            </span>
            <div className="relative grid items-center justify-start grid-flow-col-dense gap-2 bottom-[1.6rem] h-fit hover:text-primary-default hover:dark:text-neutral-secondary xl:text-base lg:text-[.75rem] md:text-[.6rem]">
              <FaPhoneAlt />
              <a className="no-underline link "> +63916 664 1849</a>
            </div>
            <div className="relative grid items-center justify-start grid-flow-col-dense gap-2 bottom-[2.4rem] h-fit hover:text-primary-default hover:dark:text-neutral-secondary xl:text-base lg:text-[.75rem] md:text-[.6rem]">
              <FaRegEnvelope />
              <a className="no-underline link "> lhanleesalon@gmail.com</a>
            </div>
          </div>
          <div className="grid justify-center grid-flow-row-dense">
            <span className="pb-3 font-semibold xl:text-base lg:text-[.75rem] md:text-[.6rem] text-primary-default dark:text-dark-default">
              CONNECT
            </span>
            <div className="relative grid items-center justify-start grid-flow-col-dense gap-2 bottom-4 h-fit hover:text-primary-default hover:dark:text-neutral-secondary xl:text-base lg:text-[.75rem] md:text-[.6rem]">
              <FaFacebookSquare />
              <a className="no-underline link ">facebook.com/lhanleesalon</a>
            </div>
            <div className="relative grid items-center justify-start grid-flow-col-dense gap-2 bottom-3 h-fit hover:text-primary-default hover:dark:text-neutral-secondary xl:text-base lg:text-[.75rem] md:text-[.6rem]">
              <FaTwitterSquare />
              <a className="no-underline link ">twitter.com/lhanleesalon</a>
            </div>
            <div className="relative grid items-center justify-start grid-flow-col-dense gap-2 bottom-2 h-fit hover:text-primary-default hover:dark:text-neutral-secondary xl:text-base lg:text-[.75rem] md:text-[.6rem]">
              <FaInstagramSquare />
              <a className="no-underline link ">@lhanleesalon2023</a>
            </div>
          </div>
        </div>
        <div className="grid justify-end py-8 pr-12">
          <p className="grid items-center justify-start grid-flow-col-dense gap-2 h-fit">
            Copyright
            <span>
              <FaCopyright />
            </span>
            2023 - TEAM LHANLEESALON TAGUIG
          </p>
        </div>
      </footer>
    </>
  );
}
