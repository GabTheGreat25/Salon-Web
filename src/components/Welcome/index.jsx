import React from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function ({
  title,
  description,
  buttonTitle,
  leftArrow,
  navigateLeft,
  logo,
  logoTitle,
  rightArrow,
  navigateRight,
  navigateTo,
}) {
  const navigate = useNavigate();
  return (
    <>
      <div className="grid h-full ">
        <div className="grid grid-cols-2">
          <div className="relative grid justify-center grid-flow-row-dense gap-y-6">
            {leftArrow && (
              <button
                className="absolute text-3xl transform -translate-y-1/2 xl:left-10 lg:left-4 top-1/2"
                onClick={() => navigate(navigateLeft)}
              >
                <FaArrowLeft />
              </button>
            )}
            <div className="grid items-end justify-start">
              <h1
                className="text-5xl font-bold"
                dangerouslySetInnerHTML={{ __html: title }}
              />
            </div>
            <div className="h-fit">
              <div className="grid items-start lg:justify-start md:justify-center">
                <p
                  className="text-neutral-secondary"
                  dangerouslySetInnerHTML={{ __html: description }}
                />
              </div>
              <div className="grid items-center justify-start pt-8">
                <button
                  onClick={() => navigate(navigateTo)}
                  className="px-12 py-4 text-xl font-medium transition-transform duration-300 ease-in-out text-dark-default dark:text-light-default hover:dark:text-light-default text hover:animate-bounce animate-none highlight highlight-variant-12 after:bg-gradient-to-tr after:from-secondary-default after:to-primary-default"
                >
                  {buttonTitle}
                </button>
              </div>
            </div>
          </div>
          <div className="relative grid items-center justify-center">
            <img src={logo} alt={logoTitle} />
            {rightArrow && (
              <button
                className="absolute text-3xl transform -translate-y-1/2 right-10 top-[49%]"
                onClick={() => navigate(navigateRight)}
              >
                <FaArrowRight />
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
