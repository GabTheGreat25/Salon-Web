import React from "react";
import { block } from "million/react";
import Logo2 from "@assets/Logo-2.png";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const WelcomeTwo = () => {
  const navigate = useNavigate();
  const Welcome = () => navigate(`/`);
  const BecomeCustomer = () => navigate(`/BecomeCustomer`);

  return (
    <>
      <div className="grid h-full ">
        <div className="grid grid-cols-2">
          <div className="relative grid justify-center grid-flow-row-dense gap-y-6">
            <button
              className="absolute text-3xl transform -translate-y-1/2 lg:left-10 mg:left-8 top-1/2"
              onClick={Welcome}
            >
              <FaArrowLeft />
            </button>
            <div className="grid items-end justify-end">
              <h1 className="text-5xl font-bold">
                Become a Lanlee <br />
                Employee!
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
            <img src={Logo2} alt="Logo2" />
            <button
              className="absolute text-3xl transform -translate-y-1/2 right-20 top-1/2"
              onClick={BecomeCustomer}
            >
              <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const WelcomeTwoBlock = block(WelcomeTwo);

export default WelcomeTwoBlock;
