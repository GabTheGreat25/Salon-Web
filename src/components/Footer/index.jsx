import React from "react";
import {
  FaApple,
  FaGooglePlay,
  FaPhoneAlt,
  FaRegEnvelope,
  FaFacebookSquare,
  FaInstagramSquare,
  FaTwitterSquare,
  FaCopyright,
} from "react-icons/fa";
import { block } from "million/react";

const Footer = () => {
  return (
    <>
      <footer className="w-full px-10 pt-5 pb-20 h-fit bg-neutral-primary text-light-default dark:bg-light-default dark:text-dark-default">
        <div className="grid w-full grid-flow-col-dense">
          <div className="grid justify-center grid-flow-row-dense">
            <span className="footer-title">IMPORTANT INFORMATION</span>
            <a className="py-1 no-underline link hover:animate-bounce">
              About Lhanlee Salon
            </a>
            <a className="py-2 no-underline link hover:animate-bounce">
              Favorites
            </a>
            <a className="py-2 no-underline link hover:animate-bounce">
              Privacy Policy
            </a>
            <a className="py-1 no-underline link hover:animate-bounce">
              Terms & Conditions
            </a>
          </div>
          <div className="grid justify-center grid-flow-row-dense">
            <span className="footer-title">RESOURCES</span>
            <a className="no-underline link hover:animate-bounce">
              Help Center
            </a>
            <a className="no-underline link hover:animate-bounce">Feedback</a>
            <a className="no-underline link hover:animate-bounce">Services</a>
          </div>
          <div className="grid justify-center grid-flow-row-dense">
            <span className="footer-title">DOWNLOAD</span>
            <div className="grid items-center justify-start grid-flow-col-dense gap-2 h-fit hover:animate-bounce">
              <FaApple />
              <a className="no-underline link ">IOS (APPLE)</a>
            </div>
            <div className="grid items-center justify-start grid-flow-col-dense gap-2 h-fit hover:animate-bounce">
              <FaGooglePlay />
              <a className="no-underline link "> GOOGLE PLAY (ANDROID)</a>
            </div>
          </div>
          <div className="grid justify-center grid-flow-row-dense">
            <span className="footer-title">CONTACT US</span>
            <div className="grid items-center justify-start grid-flow-col-dense gap-2 h-fit hover:animate-bounce">
              <FaPhoneAlt />
              <a className="no-underline link "> +63916 664 1849</a>
            </div>
            <div className="grid items-center justify-start grid-flow-col-dense gap-2 h-fit hover:animate-bounce">
              <FaRegEnvelope />
              <a className="no-underline link "> lhanleesalon@gmail.com</a>
            </div>
          </div>
          <div className="grid justify-center grid-flow-row-dense">
            <span className="footer-title">CONNECT</span>
            <div className="grid items-center justify-start grid-flow-col-dense gap-2 h-fit hover:animate-bounce">
              <FaFacebookSquare />
              <a className="no-underline link ">facebook.com/lhanleesalon</a>
            </div>
            <div className="grid items-center justify-start grid-flow-col-dense gap-2 h-fit hover:animate-bounce">
              <FaTwitterSquare />
              <a className="no-underline link ">twitter.com/lhanleesalon</a>
            </div>
            <div className="grid items-center justify-start grid-flow-col-dense gap-2 h-fit hover:animate-bounce">
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
};

const FooterBlock = block(Footer);

export default FooterBlock;
