import React from "react";
import QrCode from "@assets/qrCode.png";

export default function () {
  return (
    <div className="fixed z-50 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
      <p className="pb-4 text-lg font-semibold text-center">
        Please download our mobile app for a better experience.
      </p>
      <img src={QrCode} alt="qr code" className="w-64 h-64" />
    </div>
  );
}
