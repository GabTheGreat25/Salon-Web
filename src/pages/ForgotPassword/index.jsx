import React from "react";
import { Card } from "@components";
import { useNavigate } from "react-router-dom";

export default function () {
  const navigate = useNavigate();
  const login = () => {
    navigate("/login");
  };

  return (
    <>
      <Card>
        <div className="grid items-center w-full h-full text-light-default dark:text-dark-default">
          <div>
            <h1 className="font-semibold xl:pb-12 lg:pb-10 md:pb-8 xl:text-4xl lg:text-3xl md:text-2xl lg:pl-20 md:pl-0">
              Forgot Password?
            </h1>

            <h2 className="pb-6 font-semibold text-center xl:text-3xl lg:text-2xl md:text-xl">
              Recover your account
            </h2>
            <p className="pb-6 text-center xl:text-xl lg:text-lg md:text-base">
              Please enter your email or mobile number <br /> to reset your
              password.
            </p>
            <div className="grid justify-center grid-flow-row-dense gap-y-10">
              <input
                type="text"
                className="block w-full placeholder-white border-0 border-b-2 bg-card-input xl:text-xl lg:text-lg md:text-base border-light-default dark:border-dark-default focus:ring-0 focus:border-primary-default dark:placeholder-dark-default"
                placeholder="johndoe@gmail.com"
              />
              <span className="grid justify-center">
                <button
                  onClick={login}
                  className="px-12 text-xl font-medium capitalize rounded-3xl btn btn-primary text-light-default dark:text-dark-default"
                >
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
