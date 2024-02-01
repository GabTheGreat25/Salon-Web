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
  FaChartBar,
  FaClipboardList,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function () {
  const navigate = useNavigate();

  const home = () => {
    navigate("/admin");
  };

  const profile = () => {
    navigate("/admin/editAdminProfile");
  };

  const charts = () => {
    navigate("/admin/dashboard");
  };

  const applications = () => {
    navigate("/admin/confirmBeautician");
  };

  return (
    <>
      <footer className="w-full h-full px-10 pt-5 pb-20 bg-neutral-primary text-light-default dark:bg-light-default dark:text-dark-default">
        <div className="grid w-full grid-flow-col-dense justify-evenly">
          <div className="grid justify-center grid-flow-row-dense">
            <span className="lg:pb-4 md:pb-[.65rem] font-semibold xl:text-base lg:text-[.75rem] md:text-[.6rem] text-primary-default dark:text-dark-default">
              IMPORTANT INFORMATION
            </span>
            <a
              className="grid grid-flow-col-dense gap-x-2 w-fit items-center pb-2 no-underline link hover:text-primary-default hover:dark:text-neutral-secondary xl:text-base lg:text-[.75rem] md:text-[.6rem]"
              onClick={home}
            >
              <FaHome />
              <span className="relative top-[1px]">HOME</span>
            </a>
            <a
              className="grid grid-flow-col-dense gap-x-2 w-fit items-center py-2 no-underline link hover:text-primary-default hover:dark:text-neutral-secondary xl:text-base lg:text-[.75rem] md:text-[.6rem]"
              onClick={profile}
            >
              <FaUser />
              <span className="relative top-[1px]">PROFILE</span>
            </a>
            <a
              className="grid grid-flow-col-dense gap-x-2 w-fit items-center py-2 no-underline link hover:text-primary-default hover:dark:text-neutral-secondary xl:text-base lg:text-[.75rem] md:text-[.6rem]"
              onClick={charts}
            >
              <FaChartBar />
              <span className="relative top-[1px]">CHARTS</span>
            </a>
            <a
              className="grid grid-flow-col-dense gap-x-2 w-fit items-center py-2 no-underline link hover:text-primary-default hover:dark:text-neutral-secondary xl:text-base lg:text-[.75rem] md:text-[.6rem]"
              onClick={applications}
            >
              <FaClipboardList />
              <span className="relative top-[1px]">APPLICATIONS</span>
            </a>
          </div>
          <div className="grid justify-center grid-flow-row-dense h-fit">
            <span className="font-semibold xl:text-base lg:text-[.75rem] md:text-[.6rem] text-primary-default dark:text-dark-default lg:pb-4 md:pb-[.65rem]">
              DOWNLOAD
            </span>
            <div className="grid grid-flow-col-dense gap-x-2 w-fit items-center hover:text-primary-default hover:dark:text-neutral-secondary xl:text-base lg:text-[.75rem] md:text-[.6rem]">
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
              <a className="no-underline link "> +63956 802 8031</a>
            </div>
            <div className="relative grid items-center justify-start grid-flow-col-dense gap-2 bottom-[2.4rem] h-fit hover:text-primary-default hover:dark:text-neutral-secondary xl:text-base lg:text-[.75rem] md:text-[.6rem]">
              <FaRegEnvelope />
              <a className="no-underline link "> alexjijopea@gmail.com</a>
            </div>
          </div>
          <div className="grid justify-center grid-flow-row-dense">
            <span className="pb-3 font-semibold xl:text-base lg:text-[.75rem] md:text-[.6rem] text-primary-default dark:text-dark-default">
              CONNECT
            </span>
            <div className="relative grid items-center justify-start grid-flow-col-dense gap-2 bottom-4 h-fit hover:text-primary-default hover:dark:text-neutral-secondary xl:text-base lg:text-[.75rem] md:text-[.6rem]">
              <FaFacebookSquare />
              <a
                className="no-underline link"
                href="https://www.facebook.com/Lanleebeautylounge"
              >
                facebook.com/lhanleesalon
              </a>
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
