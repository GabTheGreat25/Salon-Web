import React from "react";
import { block } from "million/react";
import Logo3 from "@assets/Logo-3.png";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const WelcomeThree = () => {
  const navigate = useNavigate();
  const BecomeEmployee = () => navigate(`/BecomeEmployee`);

  return (
    <>
      <div className="grid h-full ">
        <div className="grid grid-cols-2">
          <div className="relative grid justify-center grid-flow-row-dense gap-y-6">
            <div className="grid items-end justify-end">
              <button
                className="absolute text-3xl transform -translate-y-1/2 lg:left-10 mg:left-8 top-1/2"
                onClick={BecomeEmployee}
              >
                <FaArrowLeft />
              </button>
              <h1 className="text-5xl font-bold">
                Become a Lanlee <br />
                Customer!
              </h1>
            </div>
            <div className="h-fit">
              <div className="grid items-start justify-start">
                <p className="text-neutral-secondary">
                  Lorem ipsum dolor sit amet, consectetur
                  <br />
                  adipiscing elit. Ut erat mauris, rhoncus br non
                  <br />
                  nibh in, commodo viverra elit.
                </p>
              </div>
              <div className="grid items-center justify-start pt-8">
                <button className="btn btn-primary text-light-default">
                  Learn More
                </button>
              </div>
            </div>
          </div>
          <div className="grid items-start justify-center">
            <img src={Logo3} alt="Logo3" />
          </div>
        </div>
      </div>
    </>
  );
};

const WelcomeThreeBlock = block(WelcomeThree);

export default WelcomeThreeBlock;
