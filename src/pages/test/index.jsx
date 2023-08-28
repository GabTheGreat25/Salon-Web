import React from "react";
import { block } from "million/react";

const Test = () => {
  return (
    <>
      <div className="h-screen">Test</div>
    </>
  );
};

const TestBlock = block(Test);

export default TestBlock;
