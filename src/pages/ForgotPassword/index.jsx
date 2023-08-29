import React from "react";
import { Card } from "@components";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function () {
  const navigate = useNavigate();
  const GoBack = () => navigate(`/`);
  return (
    <>
      <Card>
        <div className="relative grid items-center w-full h-full">
          <button
            className="absolute text-3xl transform -translate-y-1/2 top-10 text-light-default dark:text-dark-default"
            onClick={GoBack}
          >
            <FaArrowLeft />
          </button>
          <div>
            <h1 className="pb-12 text-3xl font-semibold lg:pl-20 md:pl-0 text-secondary-t2">
              Forgot Password?
            </h1>

            <h2 className="pb-6 text-xl font-semibold text-center text-light-default dark:text-dark-default">
              Recover your account
            </h2>
            <p className="pb-6 text-center text-light-default dark:text-dark-default">
              Please enter your email or mobile number <br /> to reset your
              password.
            </p>
            <div className="grid justify-center grid-flow-row-dense gap-y-10">
              <input
                type="text"
                class="text-light-default dark:text-dark-default bg-[#5e738a00] mt-0 block w-full border-0 border-b-2 border-light-default dark:border-dark-default focus:ring-0 focus:border-primary-default placeholder-white dark:placeholder-dark-default"
                placeholder="johndoe@gmail.com"
              />
              <span className="grid justify-center">
                <button className="px-12 py-4 text-xl font-medium transition-transform duration-300 ease-in-out text-light-default dark:text-dark-default hover:dark:text-dark-default text hover:animate-bounce animate-none highlight highlight-variant-12 after:bg-gradient-to-tr after:from-secondary-default after:to-primary-default">
                  Continue
                </button>
              </span>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}
