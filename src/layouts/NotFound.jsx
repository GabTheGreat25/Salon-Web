import React from "react";
export default function () {
  const goBack = () => {
    window.history.back();
  };

  return (
    <>
      <div>
        <h1>Not Found</h1>
        <h2>The requested page could not be found.</h2>
        <br />
        <button title="Go Back" onClick={goBack}></button>
      </div>
    </>
  );
}
