import React from "react";
import { Card } from "@components";

export default function () {
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
                class="bg-card-input block xl:text-xl lg:text-lg md:text-base w-full border-0 border-b-2 border-light-default dark:border-dark-default focus:ring-0 focus:border-primary-default placeholder-white dark:placeholder-dark-default"
                placeholder="johndoe@gmail.com"
              />
              <span className="grid justify-center">
                <button className="px-12 text-xl font-medium capitalize rounded-3xl btn btn-primary text-light-default dark:text-dark-default">
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
