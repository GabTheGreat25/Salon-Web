import React from "react";
import { block } from "million/react";
import Logo1 from "@assets/Logo-1.png";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();
  const BecomeEmployee = () => navigate(`/BecomeEmployee`);

  return (
    <>
      <div className="grid h-full">
        <div className="grid grid-cols-2">
          <div className="grid justify-center grid-flow-row-dense gap-y-6">
            <div className="grid items-end justify-start">
              <h1 className="text-5xl font-bold">
                Looking for a <br />
                Salon?
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
          <div className="relative grid items-start justify-center">
            <img src={Logo1} alt="Logo1" />
            <button
              className="absolute text-3xl transform -translate-y-1/2 right-10 top-1/2"
              onClick={BecomeEmployee}
            >
              <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const WelcomeBlock = block(Welcome);

export default WelcomeBlock;
