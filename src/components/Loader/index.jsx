import React from "react";
import LoaderImg from "@assets/Loading-Screen.png";
import { block } from "million/react";

const Loader = () => {
  return (
    <>
      <div className="loading-container">
        <img className="loading-img" src={LoaderImg} alt="Loading" />
      </div>
    </>
  );
};

const LoaderBlock = block(Loader);

export default LoaderBlock;
