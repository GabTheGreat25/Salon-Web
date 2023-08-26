import React from "react";
import NotFound from "@assets/404-Not-Found.png";

export default function () {
  const goBack = () => {
    window.history.back();
  };

  return (
    <>
      <h1 class="text-3xl font-bold underline">Hello world!</h1>
      <div>
        <h1>Not Found</h1>
        <h2>The requested page could not be found.</h2>
        <br />
        <button title="Go Back" onClick={goBack}>
          Go Back
        </button>
      </div>
    </>
  );
}
