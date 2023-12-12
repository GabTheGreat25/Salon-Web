import React from "react";
import LogoLight from "@assets/Logo-Light.png";
import { FaArrowLeft } from "react-icons/fa";

export default function ({ children }) {
  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="customCard">
      <div className="customCard__logo">
        <img src={LogoLight} alt="LogoLight" />
      </div>
      <div className="customCard__children">
        <button className="customCard__children--arrowLeft" onClick={goBack}>
          <FaArrowLeft />
        </button>
        {children}
      </div>
    </div>
  );
}
