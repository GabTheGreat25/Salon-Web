import React from "react";
import { Card } from "@components";
import EmployeeImg from "@assets/Employee.png";
import CustomerImg from "@assets/Customer.png";
import { useNavigate } from "react-router-dom";

export default function () {
  const navigate = useNavigate();
  const EmployeeSignUp = () => navigate(`/EmployeeSignUp`);
  const CustomerSignUp = () => navigate(`/CustomerSignUp`);

  return (
    <>
      <Card>
        <div className="grid items-center justify-center w-full h-full text-light-default dark:text-dark-default">
          <span className="relative top-20">
            <h1 className="text-4xl font-bold text-center">Are You?</h1>
          </span>
          <div className="relative grid w-full grid-cols-2 gap-4 xl:bottom-10 md:bottom-5 h-fit">
            <div className="grid h-full grid-flow-row-dense rounded-lg bg-primary-t2">
              <span className="grid items-end justify-center">
                <img
                  src={EmployeeImg}
                  alt="EmployeeImg"
                  className="max-h-full"
                />
              </span>
              <div className="items-center h-full px-3 pt-6 pb-3 rounded-b-lg text-dark-default bg-light-default dark:bg-dark-default">
                <h1 className="pb-3 font-semibold text-center dark:text-light-default xl:text-base lg:text-sm md:text-xs">
                  Become Our Lanlee Employee
                </h1>
                <p className="xl:text-sm lg:text-[0.7rem] md:text-[0.65rem] text-center text-neutral-secondary dark:text-light-default">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut
                  incidunt minima ab harum alias aliquam.
                </p>
                <span className="grid items-center justify-center pt-6">
                  <button
                    onClick={EmployeeSignUp}
                    className="xl:px-6 lg:px-4 md:px-2 font-medium capitalize rounded-lg xl:text-xl lg:text-base md:text-[.75rem] btn btn-primary text-light-default dark:text-dark-default"
                  >
                    Register as Employee
                  </button>
                </span>
              </div>
            </div>
            <div className="grid h-full grid-flow-row-dense rounded-lg bg-primary-t2">
              <span className="grid items-end justify-center">
                <img
                  src={CustomerImg}
                  alt="CustomerImg"
                  className="max-h-full"
                />
              </span>
              <div className="items-center h-full px-3 pt-6 pb-3 rounded-b-lg text-dark-default bg-light-default dark:bg-dark-default">
                <h1 className="pb-3 font-semibold text-center dark:text-light-default xl:text-base lg:text-sm md:text-xs">
                  Become Our Lanlee Customer
                </h1>
                <p className="xl:text-xs lg:text-[0.7rem] md:text-[0.65rem] text-center text-neutral-secondary dark:text-light-default">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut
                  incidunt minima ab harum alias aliquam.
                </p>
                <span className="grid items-center justify-center pt-6">
                  <button
                    onClick={CustomerSignUp}
                    className="xl:px-6 lg:px-4 md:px-2 font-medium capitalize rounded-lg xl:text-xl lg:text-base md:text-[.75rem] btn btn-primary text-light-default dark:text-dark-default"
                  >
                    Register as Customer
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}
