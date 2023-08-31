import React from "react";
import { Card, CardImage } from "@components";
import Facebook from "@assets/Facebook.png";
import Google from "@assets/Google.png";
import Linkedin from "@assets/Linkedin.png";
import Instagram from "@assets/Instagram.png";
import { useNavigate } from "react-router-dom";

export default function () {
  const navigate = useNavigate();

  const chooseRole = () => {
    navigate("/chooseRole");
  };

  const forgotPassword = () => {
    navigate("/ForgotPassword");
  };

  const home = () => {
    navigate("/");
  };

  return (
    <>
      <Card>
        <div className="grid w-full h-full text-light-default dark:text-dark-default">
          <span className="grid items-end justify-center 2xl:grid-rows-[90%_10%] xl:grid-rows-[80%_20%] md:grid-rows-[75%_25%]">
            <h1 className="font-semibold text-center xl:pb-6 md:pb-2 lg:text-5xl md:text-4xl bottom-2">
              Welcome Back!
            </h1>
            <p className="lg:text-[1.75rem] md:text-2xl text-center text-light-default dark:text-dark-default">
              Log in to your account
            </p>
          </span>
          <div className="grid grid-cols-[40%_60%] items-center justify-start pt-6 gap-x-6">
            <CardImage />
            <div className="grid justify-center grid-flow-row-dense pr-6 gap-y-4">
              <label className="block">
                <span className="xl:text-xl lg:text-[1rem] font-semibold">
                  Email
                </span>
                <input
                  type="text"
                  className="block mb-10 xl:text-lg lg:text-[1rem] placeholder-white border-0 border-b-2 bg-card-input w-[80%] border-light-default dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default"
                  placeholder="johndoe@gmail.com"
                />
              </label>
              <label className="block">
                <span className="xl:text-xl lg:text-[1rem] font-semibold">
                  Password
                </span>
                <input
                  type="text"
                  className="block mb-10 xl:text-lg lg:text-[1rem] placeholder-white border-0 border-b-2 bg-card-input w-[80%] border-light-default dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default"
                  placeholder="********"
                />
              </label>
              <span className="relative grid justify-center md:right-5">
                <button
                  onClick={home}
                  className="rounded-3xl xl:px-10 md:px-8 font-medium capitalize xl:text-xl lg:text-[1rem] lg:text-base md:text-[.75rem] btn btn-primary text-light-default dark:text-dark-default"
                >
                  Log in
                </button>
                <button onClick={forgotPassword} className="pt-8 pb-4 text-xl">
                  Forgot password?
                </button>
              </span>
              <h5 className="relative pb-4 text-center right-5 text-light-default">
                Or log in with
              </h5>
              <div className="grid justify-center lg:grid-cols-[20%_20%_20%_20%] md:grid-cols-[27.5%_27.5%_27.5%_27.5%]">
                <a href="">
                  <img src={Google} alt="Google" />
                </a>
                <a href="">
                  <img src={Facebook} alt="Facebook" />
                </a>
                <a href="">
                  <img src={Instagram} alt="Instagram" />
                </a>
                <a href="">
                  <img src={Linkedin} alt="Linkedin" />
                </a>
              </div>
              <p className="pt-6 xl:text-2xl lg:text-lg md:text-[.825rem]">
                Don't have an account?
                <button
                  onClick={chooseRole}
                  className="font-medium xl:pl-2 md:pl-1 hover:underline hover:text-secondary-t3"
                >
                  Sign up here
                </button>
              </p>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}
