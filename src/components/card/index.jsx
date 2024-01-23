import React from "react";
import LogoLight from "@assets/Logo-Light.png";
import { FaArrowLeft } from "react-icons/fa";
import { reasonSlice } from "@reason";
import { useDispatch } from "react-redux";

export default function ({ children }) {
  const dispatch = useDispatch();

  const goBack = () => {
    window.history.back();
    dispatch(reasonSlice.actions.resetReason());
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
