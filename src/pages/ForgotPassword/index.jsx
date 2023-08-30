import React from "react";
import { Card } from "@components";

export default function () {
  return (
    <>
      <Card>
        <div className="grid items-center w-full h-full text-light-default dark:text-dark-default">
          <div>
            <h1 className="pb-12 text-3xl font-semibold lg:pl-20 md:pl-0 text-secondary-t2">
              Forgot Password?
            </h1>

            <h2 className="pb-6 text-xl font-semibold text-center">
              Recover your account
            </h2>
            <p className="pb-6 text-center">
              Please enter your email or mobile number <br /> to reset your
              password.
            </p>
            <div className="grid justify-center grid-flow-row-dense gap-y-10">
              <input
                type="text"
                class="bg-card-input mt-0 block w-full border-0 border-b-2 border-light-default dark:border-dark-default focus:ring-0 focus:border-primary-default placeholder-white dark:placeholder-dark-default"
                placeholder="johndoe@gmail.com"
              />
              <span className="grid justify-center">
                <button className="px-12 py-4 text-xl font-medium transition-transform duration-300 ease-in-out hover:dark:text-dark-default text hover:animate-bounce animate-none highlight highlight-variant-12 after:bg-gradient-to-tr after:from-secondary-default after:to-primary-default">
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
