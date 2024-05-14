import React from "react";
import QrCode from "@assets/qrCode.png";

export default function () {
  return (
    <>
      <div className="fixed z-[1000] transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        <p className="pb-4 text-xl font-semibold text-center text-primary-accent">
          Please download our mobile app <br /> for a better experience.
        </p>
        <div className="grid items-center justify-center">
          <img src={QrCode} alt="qr code" className="w-fit h-fit rounded-xl" />
        </div>
      </div>
    </>
  );
}
