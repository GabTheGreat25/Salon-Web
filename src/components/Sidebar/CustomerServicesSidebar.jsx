import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import oneStar from "@assets/oneStar.png";
import twoStars from "@assets/twoStars.png";
import threeStars from "@assets/threeStars.png";
import fourStars from "@assets/fourStars.png";
import fiveStars from "@assets/fiveStars.png";

export default function () {
  return (
    <>
      <div className="min-h-screen rounded shadow-lg w-72">
        <div className="grid items-center justify-start px-8">
          <div className="py-4 font-semibold capitalize text-lg whitespace-nowrap">
            Categories
          </div>
          <div className="grid grid-flow-row-dense gap-y-2">
            <div className="grid grid-cols-[25%_75%] justify-start items-center">
              <input
                type="checkbox"
                className="rounded border-primary-default focus:border-primary-default focus:ring-primary-default checked:bg-primary-default checked:dark:bg-dark-default"
              />
              <span>
                <h1 className="font-light capitalize text-lg">Hands</h1>
              </span>
            </div>
            <div className="grid grid-cols-[25%_75%] justify-start items-center">
              <input
                type="checkbox"
                className="rounded border-primary-default focus:border-primary-default focus:ring-primary-default checked:bg-primary-default checked:dark:bg-dark-default"
              />
              <span>
                <h1 className="font-light capitalize text-lg">Hair</h1>
              </span>
            </div>
            <div className="grid grid-cols-[25%_75%] justify-start items-center">
              <input
                type="checkbox"
                className="rounded border-primary-default focus:border-primary-default focus:ring-primary-default checked:bg-primary-default checked:dark:bg-dark-default"
              />
              <span>
                <h1 className="font-light capitalize text-lg">Feet</h1>
              </span>
            </div>
            <div className="grid grid-cols-[25%_75%] justify-start items-center">
              <input
                type="checkbox"
                className="rounded border-primary-default focus:border-primary-default focus:ring-primary-default checked:bg-primary-default checked:dark:bg-dark-default"
              />
              <span>
                <h1 className="font-light capitalize text-lg">Nails</h1>
              </span>
            </div>
            <div className="grid grid-cols-[25%_75%] justify-start items-center">
              <input
                type="checkbox"
                className="rounded border-primary-default focus:border-primary-default focus:ring-primary-default checked:bg-primary-default checked:dark:bg-dark-default"
              />
              <span>
                <h1 className="font-light capitalize text-lg">Face</h1>
              </span>
            </div>
            <div className="grid grid-cols-[25%_75%] justify-start items-center">
              <input
                type="checkbox"
                className="rounded border-primary-default focus:border-primary-default focus:ring-primary-default checked:bg-primary-default checked:dark:bg-dark-default"
              />
              <span>
                <h1 className="font-light capitalize text-lg">Body</h1>
              </span>
            </div>
          </div>
        </div>
        <div className="px-8">
          <div className="py-4 font-semibold text-lg">Price Range</div>
          <div className="grid grid-cols-[45%_auto_45%] gap-x-1 justify-start items-center">
            <div className="grid grid-cols-[10%_auto] items-center justify-center gap-x-2">
              <span className="mr-2 text-lg font-semibold">₱</span>
              <input
                type="number"
                placeholder="Min"
                min="0"
                className="w-full py-2 border rounded focus:outline-none focus:border-primary-default focus:ring-primary-default text-dark-default"
              />
            </div>
            <div className="mx-2 text-lg">
              <FontAwesomeIcon icon={faMinus} />
            </div>
            <div className="gap-x-2 grid grid-cols-[10%_auto] items-center justify-center">
              <span className="mr-2 text-lg font-semibold">₱</span>
              <input
                type="number"
                placeholder="Max"
                min="0"
                className="w-full py-2 border rounded focus:outline-none focus:border-primary-default focus:ring-primary-default text-dark-default"
              />
            </div>
          </div>
        </div>
        <div className="px-8">
          <div className="pt-4 pb-2 font-semibold text-lg">Ratings</div>
          <div className="grid grid-flow-row-dense gap-y-2">
            <div className="grid grid-cols-2 items-center justify-center gap-x-2 cursor-pointer">
              <img src={fiveStars} alt="fiveStars" />
            </div>
            <div className="grid grid-cols-2 items-center justify-center gap-x-2 cursor-pointer">
              <img src={fourStars} alt="fourStars" />
              <h1 className="font-light capitalize text-base">Above</h1>
            </div>
            <div className="grid grid-cols-2 items-center justify-center gap-x-2 cursor-pointer">
              <img src={threeStars} alt="threeStars" />
              <h1 className="font-light capitalize text-base">Above</h1>
            </div>
            <div className="grid grid-cols-2 items-center justify-center gap-x-2 cursor-pointer">
              <img src={twoStars} alt="twoStars" />
              <h1 className="font-light capitalize text-base">Above</h1>
            </div>
            <div className="grid grid-cols-2 items-center justify-center gap-x-2 cursor-pointer">
              <img src={oneStar} alt="oneStar" />
              <h1 className="font-light capitalize text-base">Above</h1>
            </div>
          </div>
        </div>
        <hr className="my-4 border-t border-dark-default dark:border-light-default" />
        <div className="grid justify-center items-center">
          <button className="px-24 font-semibold rounded-lg py-2 bg-primary-default text-xl">
            Apply
          </button>
        </div>
      </div>
    </>
  );
}
