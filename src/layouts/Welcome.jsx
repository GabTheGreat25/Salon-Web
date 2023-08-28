import React from "react";
import { block } from "million/react";

const Welcome = () => {
  return (
    <>
      <div className="h-screen">Welcome To Lanlee Salon</div>
    </>
  );
};

const WelcomeBlock = block(Welcome);

export default WelcomeBlock;
