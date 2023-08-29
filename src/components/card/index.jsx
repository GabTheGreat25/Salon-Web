import React from "react";
import { block } from "million/react";
import LogoLight from "@assets/logo-Light.png";

const Card = () => {
  return (
    <>
      <div className="grid h-full grid-cols-2 bg-primary-variant">
        <div className="grid items-center justify-end object-contain w-auto h-auto max-w-full max-h-full ml-3">
          <img src={LogoLight} alt="LogoLight" />
        </div>
        <div>
          <div className="h-full p-4 bg-white rounded-bl-[2.75rem] shadow-lg rounded-tl-[2.75rem]"></div>
        </div>
      </div>
    </>
  );
};

const CardBlock = block(Card);

export default CardBlock;
