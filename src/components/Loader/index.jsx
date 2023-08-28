import React from "react";
import Loader from "@assets/Loading-Screen.png";

export default function () {
  return (
    <>
      <div className="loading-container">
        <img className="loading-img" src={Loader} alt="Loading" />
      </div>
    </>
  );
}
