import React from "react";
import NotFound from "@assets/404-Not-Found.png";

export default function () {
  const goBack = () => {
    window.history.back();
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <img src={NotFound} alt="NotFound" className="w-[34rem]" />
        <h1 className="text-4xl font-semibold">Not Found</h1>
        <h2 className="text-xl">The requested page could not be found.</h2>
        <br />
        <button
          title="Go Back"
          onClick={goBack}
          className="px-12 py-4 text-xl font-medium hover:text-white hover:animate-bounce animate-none highlight highlight-variant-12 after:bg-gradient-to-tr after:from-secondary-default after:to-primary-default"
        >
          Go Back
        </button>
      </div>
    </>
  );
}
