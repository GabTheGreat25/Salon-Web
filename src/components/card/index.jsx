import React from "react";
import { block } from "million/react";
import LogoLight from "@assets/Logo-Light.png";
import { FaArrowLeft } from "react-icons/fa";

const Card = ({ children }) => {
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
};

const CardBlock = block(Card);

export default CardBlock;
