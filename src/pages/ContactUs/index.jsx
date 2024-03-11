import React from "react";
import { Card, CardImage } from "@components";

export default function () {
  return (
    <>
      <Card>
        <div className="grid w-full h-full text-light-default dark:text-dark-default">
          <span className="grid items-end justify-center">
            <h1 className="font-semibold lg:text-5xl md:text-4xl">
              Let's Talk!
            </h1>
          </span>
          <div className="grid grid-cols-[40%_60%] items-start justify-start pt-12 gap-x-6">
            <CardImage />
            <div className="grid justify-center grid-flow-row-dense gap-y-4">
              <label className="block">
                <span className="xl:text-xl md:text-[1rem] font-semibold">
                  Full name
                </span>
                <input
                  type="text"
                  autoComplete="off"
                  className="block mb-10 xl:text-xl md:text-[1rem] placeholder-white border-0 border-b-2 bg-card-input w-full border-light-default dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default"
                  placeholder="johndoe"
                />
              </label>
              <label className="block">
                <span className="xl:text-xl md:text-[1rem] font-semibold">
                  Email address
                </span>
                <input
                  type="email"
                  autoComplete="off"
                  className="block mb-10 xl:text-xl md:text-[1rem] placeholder-white border-0 border-b-2 bg-card-input w-full border-light-default dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default"
                  placeholder="johndoe@gmail.com"
                />
              </label>
              <label className="block">
                <span className="xl:text-xl md:text-[1rem] font-semibold">
                  Mobile Number
                </span>
                <input
                  type="text"
                  autoComplete="off"
                  className="block mb-10 xl:text-xl md:text-[1rem] placeholder-white border-0 border-b-2 bg-card-input w-full border-light-default dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default"
                  placeholder="09123456789"
                />
              </label>
              <label className="block">
                <span className="xl:text-xl md:text-[1rem] font-semibold">
                  What would you like to discuss?
                </span>
                <textarea
                  className="resize-none block mb-10 mt-4 xl:text-xl md:text-[1rem] placeholder-white border-2 bg-card-input w-full border-light-default dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default"
                  rows="6"
                ></textarea>
              </label>
              <span className="grid">
                <button className="text-xl capitalize btn btn-primary text-light-default dark:text-dark-default">
                  Submit
                </button>
              </span>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}
