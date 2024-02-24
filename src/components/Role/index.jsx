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
    <div className="grid my-24">
      <div className="mt-24 rounded-lg bg-primary-t2 h-fit">
        <span className="grid items-center justify-center">
          <img
            src={image}
            alt={imageName}
            className="object-contain rounded-tr-lg 2xl:h-[20rem] xl:h-[15rem] lg:h-[10rem] md:h-[8rem] w-[30rem]"
          />
        </span>
        <div className="items-center px-3 pt-6 pb-3 rounded-b-lg text-dark-default bg-light-default dark:bg-dark-default h-[14rem]">
          <h1 className="pb-3 font-semibold text-center dark:text-light-default xl:text-base lg:text-sm md:text-xs">
            {title}
          </h1>
          <p className="xl:text-xs lg:text-[0.7rem] md:text-[0.65rem] text-center text-neutral-secondary dark:text-light-default">
            {description}
          </p>
          <span className="grid items-center justify-center py-6">
            <button
              onClick={() => navigate(navigateTo)}
              className="xl:px-6 lg:px-4 md:px-2 font-medium capitalize rounded-lg 2xl:text-[.95rem] md:text-xs  btn btn-primary text-light-default dark:text-dark-default"
            >
              {buttonTitle}
            </button>
          </span>
        </div>
      </div>
    </div>
  );
}
