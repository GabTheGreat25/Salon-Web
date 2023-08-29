import React from "react";
import LogoLight from "@assets/Logo-Light.png";

export default function ({ children }) {
  return (
    <>
      <div class="customCard">
        <div class="customCard__logo">
          <img src={LogoLight} alt="LogoLight" />
        </div>
        <div>
          <div class="customCard__children">{children}</div>
        </div>
      </div>
    </>
  );
}
