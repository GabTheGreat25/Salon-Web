import React from "react";
import { Card } from "@components";
import ChairImg from "@assets/Chair.png";

export default function () {
  return (
    <>
      <Card>
        <div className="w-full h-full text-light-default dark:text-dark-default">
          <h1 className="pt-[4.5rem] text-3xl font-semibold text-center text-secondary-t2">
            Sign Up
          </h1>
          <p className="text-center text-light-default dark:text-dark-default">
            Get us some of your information to get a free access to our Lhanlee
            Beauty Lounge website.
          </p>
          <div className="grid grid-cols-[50%_50%] items-start justify-center w-full h-[calc(100vh-10rem)] pt-6 gap-x-6">
            <img src={ChairImg} alt="ChairImg" className="w-full h-full" />
            <div className="grid items-end justify-end grid-flow-row-dense gap-4">
              <label className="block">
                <span className="text-lg font-semibold text-secondary-t2">
                  Full name
                </span>
                <input
                  type="text"
                  class="bg-card-input mt-0 ml-6 block w-fit border-0 mb-10 border-b-2 border-light-default dark:border-dark-default focus:ring-0 focus:border-primary-default placeholder-white dark:placeholder-dark-default"
                  placeholder="John Doe"
                />
              </label>
              <label className="block">
                <span className="text-lg font-semibold text-secondary-t2">
                  Email address
                </span>
                <input
                  type="text"
                  class="bg-card-input mt-0 ml-6 block w-fit border-0 mb-10 border-b-2 border-light-default dark:border-dark-default focus:ring-0 focus:border-primary-default placeholder-white dark:placeholder-dark-default"
                  placeholder="johndoe@gmail.com"
                />
              </label>
              <label className="block">
                <span className="text-lg font-semibold text-secondary-t2">
                  Job role
                </span>
                <input
                  type="text"
                  class="bg-card-input mt-0 ml-6 block w-fit border-0 mb-10 border-b-2 border-light-default dark:border-dark-default focus:ring-0 focus:border-primary-default placeholder-white dark:placeholder-dark-default"
                  placeholder="Parlorist"
                />
              </label>
              <label className="block">
                <span className="text-lg font-semibold text-secondary-t2">
                  Full name
                </span>
                <input
                  type="text"
                  class="bg-card-input mt-0 ml-6 block w-fit border-0 mb-10 border-b-2 border-light-default dark:border-dark-default focus:ring-0 focus:border-primary-default placeholder-white dark:placeholder-dark-default"
                  placeholder="John Doe"
                />
              </label>
              <label className="block">
                <span className="text-lg font-semibold text-secondary-t2">
                  Contact number
                </span>
                <input
                  type="text"
                  class="bg-card-input mt-0 ml-6 block w-fit border-0 mb-10 border-b-2 border-light-default dark:border-dark-default focus:ring-0 focus:border-primary-default placeholder-white dark:placeholder-dark-default"
                  placeholder="09123456789"
                />
              </label>
              <label className="block">
                <span className="text-lg font-semibold text-secondary-t2">
                  Password
                </span>
                <input
                  type="text"
                  class="bg-card-input mt-0 ml-6 block w-fit border-0 mb-6 border-b-2 border-light-default dark:border-dark-default focus:ring-0 focus:border-primary-default placeholder-white dark:placeholder-dark-default"
                  placeholder="********"
                />
              </label>
              <div className="grid items-center grid-cols-[10%_auto] pb-2 font-semibold">
                <input type="checkbox" class="checkbox checkbox-accent" />
                <p className="text-[0.725rem]">
                  I agree with Lhanlee Beauty Lounge
                  <button className="pl-2 hover:text-secondary-t2 hover:underline">
                    terms & conditions
                  </button>
                </p>
              </div>
              <span className="grid justify-center">
                <button className="px-12 py-4 text-xl font-medium transition-transform duration-300 ease-in-out hover:dark:text-dark-default text hover:animate-bounce animate-none highlight highlight-variant-12 after:bg-gradient-to-tr after:from-secondary-default after:to-primary-default">
                  Sign up
                </button>
              </span>
              <p className="text-base font-semibold">
                Do you have an account already?
                <button className="pl-2 hover:underline hover:text-secondary-t2">
                  Log in here
                </button>
              </p>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}
