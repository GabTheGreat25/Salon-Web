import React from "react";
import LoaderImg from "@assets/Loading-Screen.png";

export default function () {
  return (
    <>
      <div className="loading-container">
        <img className="loading-img" src={LoaderImg} alt="Loading" />
      </div>
    </>
  );
}
