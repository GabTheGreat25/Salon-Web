import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faStar } from "@fortawesome/free-solid-svg-icons";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ({ setFilters }) {
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  const isOnlineCustomer = user?.roles?.includes("Online Customer");

  const [searchInput, setSearchInput] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedRatings, setSelectedRatings] = useState(0);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prevCategories) => {
      if (prevCategories.includes(category)) {
        return prevCategories.filter((c) => c !== category);
      } else {
        return [...prevCategories, category];
      }
    });
  };

  const handleApplyFilters = () => {
    if (
      minPrice === "" ||
      maxPrice === "" ||
      parseInt(minPrice) >= parseInt(maxPrice)
    ) {
      toast.error(
        "Invalid price range. Please make sure the minimum is lower than the maximum."
      );
      return;
    }

    console.log("Selected Filters:", {
      categories: selectedCategories,
      priceRange: { min: minPrice, max: maxPrice },
      ratings: selectedRatings,
      searchInput: searchInput.trim(),
    });

    navigate(
      `${
        isOnlineCustomer ? "/onlineCustomer" : "/walkInCustomer"
      }/CustomerServicesSort`
    );

    // setFilters({
    //   categories: selectedCategories,
    //   priceRange: { min: minPrice, max: maxPrice },
    //   ratings: selectedRatings,
    // });
  };

  return (
    <>
      <div className="min-h-screen rounded shadow-lg w-72">
        <div className="flex w-full items-center pt-2 ml-4 pr-8">
          <div className="border-solid border border-dark-default dark:border-light-default  bg-primary-default p-2 rounded -mr-1 text-xl">
            <FaSearch className="text-dark-default dark:text-light-default" />
          </div>
          <input
            className="rounded-sm w-full text-base font-bold text-left p-1.5 hover:cursor-text placeholder:text-primary-default text-primary-default  focus:outline-none focus:ring-primary-default focus:border-primary-default"
            type="text"
            id="result"
            name="result"
            placeholder="Search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <div className="grid items-center justify-start px-8">
          <div className="py-4 font-semibold capitalize text-lg whitespace-nowrap">
            Categories
          </div>
          <div className="grid grid-flow-row-dense gap-y-2">
            <div className="grid grid-cols-[25%_75%] justify-start items-center">
              <input
                type="checkbox"
                checked={selectedCategories.includes("Hands")}
                onChange={() => handleCategoryChange("Hands")}
                className="rounded border-primary-default focus:border-primary-default focus:ring-primary-default checked:bg-primary-default checked:dark:bg-dark-default"
              />
              <span>
                <h1 className="font-light capitalize text-lg">Hands</h1>
              </span>
            </div>
            <div className="grid grid-cols-[25%_75%] justify-start items-center">
              <input
                type="checkbox"
                checked={selectedCategories.includes("Hair")}
                onChange={() => handleCategoryChange("Hair")}
                className="rounded border-primary-default focus:border-primary-default focus:ring-primary-default checked:bg-primary-default checked:dark:bg-dark-default"
              />
              <span>
                <h1 className="font-light capitalize text-lg">Hair</h1>
              </span>
            </div>
            <div className="grid grid-cols-[25%_75%] justify-start items-center">
              <input
                type="checkbox"
                checked={selectedCategories.includes("Feet")}
                onChange={() => handleCategoryChange("Feet")}
                className="rounded border-primary-default focus:border-primary-default focus:ring-primary-default checked:bg-primary-default checked:dark:bg-dark-default"
              />
              <span>
                <h1 className="font-light capitalize text-lg">Feet</h1>
              </span>
            </div>
            <div className="grid grid-cols-[25%_75%] justify-start items-center">
              <input
                type="checkbox"
                checked={selectedCategories.includes("Nails")}
                onChange={() => handleCategoryChange("Nails")}
                className="rounded border-primary-default focus:border-primary-default focus:ring-primary-default checked:bg-primary-default checked:dark:bg-dark-default"
              />
              <span>
                <h1 className="font-light capitalize text-lg">Nails</h1>
              </span>
            </div>
            <div className="grid grid-cols-[25%_75%] justify-start items-center">
              <input
                type="checkbox"
                checked={selectedCategories.includes("Face")}
                onChange={() => handleCategoryChange("Face")}
                className="rounded border-primary-default focus:border-primary-default focus:ring-primary-default checked:bg-primary-default checked:dark:bg-dark-default"
              />
              <span>
                <h1 className="font-light capitalize text-lg">Face</h1>
              </span>
            </div>
            <div className="grid grid-cols-[25%_75%] justify-start items-center">
              <input
                type="checkbox"
                checked={selectedCategories.includes("Body")}
                onChange={() => handleCategoryChange("Body")}
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
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
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
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full py-2 border rounded focus:outline-none focus:border-primary-default focus:ring-primary-default text-dark-default"
              />
            </div>
          </div>
        </div>
        <div className="pl-8">
          <div className="pt-4 pb-2 font-semibold text-lg">Ratings</div>
          <div className="flex flex-col">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div
                key={rating}
                className={`flex items-center justify-start my-2 cursor-pointer w-full text-3xl ${
                  selectedRatings === rating
                    ? "text-[#fec957]"
                    : "text-dark-default dark:text-light-default"
                }`}
                onClick={() => setSelectedRatings(rating)}
              >
                {[...Array(rating)].map((_, index) => (
                  <FontAwesomeIcon key={index} icon={faStar} />
                ))}
                {rating < 5 && (
                  <h1 className="text-xl font-medium capitalize pl-2">Above</h1>
                )}
              </div>
            ))}
          </div>
        </div>
        <hr className="my-4 border-t border-dark-default dark:border-light-default" />
        <div className="grid justify-center items-center">
          <button
            className="px-24 font-semibold rounded-lg py-2 bg-primary-default text-xl"
            onClick={handleApplyFilters}
          >
            Apply
          </button>
        </div>
      </div>
    </>
  );
}
