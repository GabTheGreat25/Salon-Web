import React from "react";
import NotFoundImg from "@assets/404-Not-Found.png";
import { block } from "million/react";

const NotFound = () => {
  const goBack = () => {
    window.history.back();
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-full">
        <img
          src={NotFoundImg}
          alt="NotFoundImg"
          className="md:w-[26rem] lg:w-[30rem]"
        />
        <h1 className="text-4xl font-semibold">Not Found</h1>
        <h2 className="text-xl">The requested page could not be found.</h2>
        <br />
        <button
          title="Go Back"
          onClick={goBack}
          className="px-12 py-4 text-xl font-medium transition-transform duration-300 ease-in-out text-dark-default dark:text-light-default hover:dark:text-light-default text hover:animate-bounce animate-none highlight highlight-variant-12 after:bg-gradient-to-tr after:from-secondary-default after:to-primary-default"
        >
          Go Back
        </button>
      </div>
    </>
  );
};

const NotFoundBlock = block(NotFound);

export default NotFoundBlock;
