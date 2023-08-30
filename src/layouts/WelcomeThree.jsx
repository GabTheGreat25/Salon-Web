import React from "react";
import { block } from "million/react";
import Logo3 from "@assets/Logo-3.png";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const WelcomeThree = () => {
  const navigate = useNavigate();
  const becomeEmployee = () => navigate(`/becomeEmployee`);
  const ChooseRole = () => navigate(`/ChooseRole`);

  return (
    <>
      <div className="grid h-full ">
        <div className="grid grid-cols-2">
          <div className="relative grid justify-center grid-flow-row-dense gap-y-6">
            <div className="grid items-end justify-end">
              <button
                className="absolute text-3xl transform -translate-y-1/2 lg:left-10 mg:left-8 top-1/2"
                onClick={becomeEmployee}
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
                <button
                  onClick={ChooseRole}
                  className="px-12 py-4 text-xl font-medium transition-transform duration-300 ease-in-out text-dark-default dark:text-light-default hover:dark:text-light-default text hover:animate-bounce animate-none highlight highlight-variant-12 after:bg-gradient-to-tr after:from-secondary-default after:to-primary-default"
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>
          <div className="grid items-center justify-center">
            <img src={Logo3} alt="Logo3" />
          </div>
        </div>
      </div>
    </>
  );
};

const WelcomeThreeBlock = block(WelcomeThree);

export default WelcomeThreeBlock;
