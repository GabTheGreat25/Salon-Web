import React from "react";
import { Card } from "@components";
import ChairImg from "@assets/Chair.png";

export default function () {
  return (
    <>
      <Card>
        <div className="grid w-full h-full text-light-default dark:text-dark-default">
          <span className="grid items-end justify-center 2xl:grid-rows-[90%_10%] xl:grid-rows-[80%_20%] md:grid-rows-[75%_25%]">
            <h1 className="pb-6 text-3xl font-semibold text-center">Sign Up</h1>
            <p className="xl:text-xl lg:text-[1rem] text-center text-light-default dark:text-dark-default">
              Get us some of your information to get a free access to our
              Lhanlee Beauty Lounge website.
            </p>
          </span>
          <div className="grid grid-cols-[40%_60%] items-center justify-start pt-6 gap-x-6">
            <img
              src={ChairImg}
              alt="ChairImg"
              className="w-full h-full mx-auto"
            />
            <div className="grid justify-end grid-flow-row-dense pr-6 gap-y-4">
              <label className="block">
                <span className="xl:text-xl lg:text-[1rem] font-semibold">
                  Full name
                </span>
                <input
                  type="text"
                  className="block mb-10 ml-6 xl:text-lg lg:text-[1rem] placeholder-white border-0 border-b-2 bg-card-input w-fit border-light-default dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default"
                  placeholder="John Doe"
                />
              </label>
              <label className="block">
                <span className="xl:text-xl lg:text-[1rem] font-semibold">
                  Email address
                </span>
                <input
                  type="text"
                  className="block mb-10 ml-6 xl:text-lg lg:text-[1rem] placeholder-white border-0 border-b-2 bg-card-input w-fit border-light-default dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default"
                  placeholder="johndoe@gmail.com"
                />
              </label>
              <label className="block">
                <span className="xl:text-xl lg:text-[1rem] font-semibold">
                  Job role
                </span>
                <input
                  type="text"
                  className="block mb-10 ml-6 xl:text-lg lg:text-[1rem] placeholder-white border-0 border-b-2 bg-card-input w-fit border-light-default dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default"
                  placeholder="Parlorist"
                />
              </label>
              <label className="block">
                <span className="xl:text-xl lg:text-[1rem] font-semibold">
                  Contact number
                </span>
                <input
                  type="text"
                  className="block mb-10 ml-6 xl:text-lg lg:text-[1rem] placeholder-white border-0 border-b-2 bg-card-input w-fit border-light-default dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default"
                  placeholder="09123456789"
                />
              </label>
              <label className="block">
                <span className="xl:text-xl lg:text-[1rem] font-semibold">
                  Password
                </span>
                <input
                  type="text"
                  className="block mb-10 ml-6 xl:text-lg lg:text-[1rem] placeholder-white border-0 border-b-2 bg-card-input w-fit border-light-default dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default"
                  placeholder="********"
                />
              </label>
              <label className="block">
                <span className="xl:text-xl lg:text-[1rem] font-semibold">
                  Confirm Password
                </span>
                <input
                  type="text"
                  className="block mb-10 ml-6 xl:text-lg lg:text-[1rem] placeholder-white border-0 border-b-2 bg-card-input w-fit border-light-default dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default"
                  placeholder="********"
                />
              </label>
              <div className="relative lg:right-[4rem] md:right-5 grid items-center justify-center xl:grid-cols-[4%_auto] lg:grid-cols-[5%_auto] md:grid-cols-[6%_auto] gap-x-2 font-semibold">
                <input
                  type="checkbox"
                  className="rounded border-primary-default focus:border-primary-default focus:ring-primary-default checked:bg-primary-default checked:dark:bg-dark-default"
                />
                <p className="xl:text-sm lg:text-[.6rem] md:text-[.5rem]">
                  I agree with Lhanlee Beauty Lounge
                  <button className="font-bold xl:pl-2 md:pl-1 hover hover:underline hover:text-secondary-t3">
                    terms & conditions
                  </button>
                </p>
              </div>
              <span className="relative lg:right-[4rem] md:right-5 grid justify-center">
                <button className="xl:px-6 md:px-4 font-medium capitalize rounded-lg xl:text-xl lg:text-[1rem] lg:text-base md:text-[.75rem] btn btn-primary text-light-default dark:text-dark-default">
                  Sign up
                </button>
              </span>
              <p className="relative lg:right-[4rem] md:right-5 font-semibold text-center xl:text-base lg:text-sm md:text-[.6rem]">
                Do you have an account already?
                <button className="font-bold xl:pl-2 md:pl-1 hover:underline hover:text-secondary-t3">
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
