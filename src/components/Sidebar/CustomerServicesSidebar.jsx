import { React, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import oneStar from "@assets/oneStar.png";
import twoStars from "@assets/twoStars.png";
import threeStars from "@assets/threeStars.png";
import fourStars from "@assets/fourStars.png";
import fiveStars from "@assets/fiveStars.png";

export default function () {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const isCustomer = auth?.user?.roles?.includes("Online Customer");

  function handleSearch(e) {
    const { name, value, type, checked } = e.target;
    setSearch((search) => {
      return { ...search, [name]: type === "checkbox" ? checked : value };
    });
  };

  const [search, setSearch] = useState({
    result: "",
    apply: "",
    isHand: false,
    isHair: false,
    isFeet: false,
    isNails: false,
    isFace: false,
    isSkin: false,
  });

  const isHand = search.isHand;
  const isHair = search.isHair;
  const isFeet = search.isFeet;
  const isNail = search.isNails;
  const isFace = search.isFace;
  const isSkin = search.isSkin;

  const testData = (search.apply = isHand
    ? "Hand"
    : isHair
    ? "Hair"
    : isFeet
    ? "Feet"
    : isNail
    ? "Nails"
    : isFace
    ? "Face"
    : isSkin
    ? "Face"
    : "");

  const searchData = testData;

  return (
    <>
      <div className="min-h-screen rounded shadow-lg w-72">
        <div className="grid items-center justify-start px-8">
          <div className="flex w-full items-center">
            <button
              className="border border-solid border-1 border-gray-500 bg-primary-default p-2 rounded -mr-1"
              onClick={() =>
                navigate(
                  `/onlineCustomer/CustomerServicesSort/search/service/${search.result}`
                )
              }
            >
              <FaSearch className="text-dark-default dark:text-dark-default" />
            </button>
            <input
              className="rounded-sm w-full text-sm text-left p-1.5 hover:cursor-text "
              type="text"
              id="result"
              name="result"
              value={search.result}
              onChange={handleSearch}
              placeholder={isCustomer ? "Search for Services..." : "Services"}
            />
          </div>
          <div className="py-4 font-semibold capitalize text-lg whitespace-nowrap">
            Categories
          </div>
          <div className="grid grid-flow-row-dense gap-y-2">
            <div className="grid grid-cols-[25%_75%] justify-start items-center">
              <input
                type="checkbox"
                name="isHand"
                value={search.isHand}
                onChange={handleSearch}
                className="rounded border-primary-default focus:border-primary-default focus:ring-primary-default checked:bg-primary-default checked:dark:bg-dark-default"
              />
              <span>
                <h1 className="font-light capitalize text-lg">Hands</h1>
              </span>
            </div>
            <div className="grid grid-cols-[25%_75%] justify-start items-center">
              <input
                type="checkbox"
                name="isHair"
                value={search.isHair}
                onChange={handleSearch}
                className="rounded border-primary-default focus:border-primary-default focus:ring-primary-default checked:bg-primary-default checked:dark:bg-dark-default"
              />
              <span>
                <h1 className="font-light capitalize text-lg">Hair</h1>
              </span>
            </div>
            <div className="grid grid-cols-[25%_75%] justify-start items-center">
              <input
                type="checkbox"
                name="isFeet"
                value={search.isFeet}
                onChange={handleSearch}
                className="rounded border-primary-default focus:border-primary-default focus:ring-primary-default checked:bg-primary-default checked:dark:bg-dark-default"
              />
              <span>
                <h1 className="font-light capitalize text-lg">Feet</h1>
              </span>
            </div>
            <div className="grid grid-cols-[25%_75%] justify-start items-center">
              <input
                type="checkbox"
                name="isNails"
                value={search.isNails}
                onChange={handleSearch}
                className="rounded border-primary-default focus:border-primary-default focus:ring-primary-default checked:bg-primary-default checked:dark:bg-dark-default"
              />
              <span>
                <h1 className="font-light capitalize text-lg">Nails</h1>
              </span>
            </div>
            <div className="grid grid-cols-[25%_75%] justify-start items-center">
              <input
                type="checkbox"
                name="isFace"
                value={search.isFace}
                onChange={handleSearch}
                className="rounded border-primary-default focus:border-primary-default focus:ring-primary-default checked:bg-primary-default checked:dark:bg-dark-default"
              />
              <span>
                <h1 className="font-light capitalize text-lg">Face</h1>
              </span>
            </div>
            <div className="grid grid-cols-[25%_75%] justify-start items-center">
              <input
                type="checkbox"
                name="isSkin"
                value={search.isSkin}
                onChange={handleSearch}
                className="rounded border-primary-default focus:border-primary-default focus:ring-primary-default checked:bg-primary-default checked:dark:bg-dark-default"
              />
              <span>
                <h1 className="font-light capitalize text-lg">Skin</h1>
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
          <button
            className="px-24 font-semibold rounded-lg py-2 bg-primary-default text-xl"
            onClick={() =>
              navigate(
                `/onlineCustomer/CustomerServicesSort/search/service/${searchData}`
              )
            }
          >
            Apply
          </button>
        </div>
      </div>
    </>
  );
}
