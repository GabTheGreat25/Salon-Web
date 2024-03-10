import React from "react";
import { useNavigate } from "react-router-dom";

export default function ({
  image,
  imageName,
  title,
  description,
  buttonTitle,
  navigateTo,
}) {
  const navigate = useNavigate();

  return (
    <>
      <div className="grid my-24">
        <div className="mt-24 rounded-lg bg-primary-t2 h-fit">
          <span className="grid items-center justify-center">
            <img
              src={image}
              alt={imageName}
              className="object-contain rounded-tr-lg 2xl:h-[20rem] xl:h-[15rem] lg:h-[10rem] md:h-[8rem] w-[30rem]"
            />
          </span>
          <div className="items-center px-3 pt-6 pb-3 rounded-b-lg text-dark-default bg-light-default dark:bg-dark-default h-[18rem]">
            <h1 className="pb-3 font-semibold text-center dark:text-light-default xl:text-lg lg:text-base md:text-sm">
              {title}
            </h1>
            <p className="text-center 2xl:text-lg xl:text-base md:text-sm text-neutral-secondary dark:text-light-default">
              {description}
            </p>
            <span className="grid items-center justify-center py-6">
              <button
                onClick={() => navigate(navigateTo)}
                className="font-medium capitalize rounded-lg xl:text-lg md:text-base xl:px-6 lg:px-4 md:px-2 btn btn-primary text-light-default dark:text-dark-default"
              >
                {buttonTitle}
              </button>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
