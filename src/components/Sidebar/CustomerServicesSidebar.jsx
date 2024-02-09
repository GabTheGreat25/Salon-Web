import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faStar } from "@fortawesome/free-solid-svg-icons";
import { FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ({ setFilters }) {
  const [searchInput, setSearchInput] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedRatings, setSelectedRatings] = useState(0);
  const [selectedOccassion, setSelectedOccassion] = useState("");
  const [disableValentinesDay, setDisableValentinesDay] = useState(false);
  const [disableChristmas, setDisableChristmas] = useState(false);
  const [disableHalloween, setDisableHalloween] = useState(false);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prevCategories) => {
      const index = prevCategories.indexOf(category);
      if (index !== -1) {
        return [
          ...prevCategories.slice(0, index),
          ...prevCategories.slice(index + 1),
        ];
      } else {
        return [...prevCategories, category];
      }
    });
  };

  useEffect(() => {
    const currentDate = new Date();
    const valentinesDay = new Date(currentDate.getFullYear(), 1, 14);
    const christmasDay = new Date(currentDate.getFullYear(), 11, 25);
    const halloweenDay = new Date(currentDate.getFullYear(), 9, 31);
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    if (currentDate.getTime() < valentinesDay.getTime() - 7 * oneDay) {
      setDisableValentinesDay(true);
    }
    if (currentDate.getTime() < christmasDay.getTime() - 7 * oneDay) {
      setDisableChristmas(true);
    }
    if (currentDate.getTime() < halloweenDay.getTime() - 7 * oneDay) {
      setDisableHalloween(true);
    }
  }, []);

  const handleApplyFilters = () => {
    const parsedMinPrice = parseInt(minPrice);
    const parsedMaxPrice = parseInt(maxPrice);

    if (
      (minPrice !== "" && isNaN(parsedMinPrice)) ||
      (maxPrice !== "" && isNaN(parsedMaxPrice)) ||
      (minPrice !== "" && maxPrice !== "" && parsedMinPrice >= parsedMaxPrice)
    ) {
      toast.error(
        "Invalid price range. Please make sure to provide valid minimum and maximum prices, and ensure that the minimum is lower than the maximum."
      );
      return;
    }

    const filters = {
      categories: selectedCategories.join(","),
      priceRange: { min: minPrice, max: maxPrice },
      ratings: selectedRatings,
      searchInput: searchInput.trim(),
      occassion: selectedOccassion,
    };

    setFilters(filters);
  };

  return (
    <>
      <div className="min-h-screen pb-10 rounded shadow-lg w-72">
        <div className="flex items-center w-full pt-2 pr-8 ml-4">
          <div className="p-2 -mr-1 text-xl border border-solid rounded border-dark-default dark:border-light-default bg-primary-default">
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
          <div className="py-4 text-lg font-semibold capitalize whitespace-nowrap">
            Categories
          </div>
          <div className="grid grid-flow-row-dense gap-y-2">
            <div className="grid grid-cols-[25%_75%] justify-start items-center">
              <input
                type="checkbox"
                checked={selectedCategories.includes("")}
                onChange={() => handleCategoryChange("")}
                className="rounded border-primary-default focus:border-primary-default focus:ring-primary-default checked:bg-primary-default checked:dark:bg-dark-default"
              />
              <span>
                <h1 className="text-lg font-light capitalize">All</h1>
              </span>
            </div>

            <div className="grid grid-cols-[25%_75%] justify-start items-center">
              <input
                type="checkbox"
                checked={selectedCategories.includes("Hands")}
                onChange={() => handleCategoryChange("Hands")}
                className="rounded border-primary-default focus:border-primary-default focus:ring-primary-default checked:bg-primary-default checked:dark:bg-dark-default"
              />
              <span>
                <h1 className="text-lg font-light capitalize">Hands</h1>
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
                <h1 className="text-lg font-light capitalize">Hair</h1>
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
                <h1 className="text-lg font-light capitalize">Feet</h1>
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
                <h1 className="text-lg font-light capitalize">Face</h1>
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
                <h1 className="text-lg font-light capitalize">Body</h1>
              </span>
            </div>
          </div>
        </div>
        <div className="grid items-center justify-start px-8">
          <div className="py-4 text-lg font-semibold capitalize whitespace-nowrap">
            Occasions
          </div>
          <div className="grid grid-flow-row-dense gap-y-2">
            <div className="grid grid-cols-[25%_75%] justify-start items-center">
              <input
                type="radio"
                name="occasion"
                value="ValentinesDay"
                onChange={() => setSelectedOccasion("ValentinesDay")}
                disabled={disableValentinesDay}
                className="rounded border-primary-default focus:border-primary-default focus:ring-primary-default checked:bg-primary-default checked:dark:bg-dark-default"
              />
              <span>
                <label className="text-lg font-light capitalize">
                  Valentine's Day
                </label>
              </span>
            </div>
            <div className="grid grid-cols-[25%_75%] justify-start items-center">
              <input
                type="radio"
                name="occasion"
                value="Christmas"
                onChange={() => setSelectedOccasion("Christmas")}
                disabled={disableChristmas}
                className="rounded border-primary-default focus:border-primary-default focus:ring-primary-default checked:bg-primary-default checked:dark:bg-dark-default"
              />
              <span>
                <label className="text-lg font-light capitalize">
                  Christmas
                </label>
              </span>
            </div>
            <div className="grid grid-cols-[25%_75%] justify-start items-center">
              <input
                type="radio"
                name="occasion"
                value="Halloween"
                onChange={() => setSelectedOccasion("Halloween")}
                disabled={disableHalloween}
                className="rounded border-primary-default focus:border-primary-default focus:ring-primary-default checked:bg-primary-default checked:dark:bg-dark-default"
              />
              <span>
                <label className="text-lg font-light capitalize">
                  Halloween
                </label>
              </span>
            </div>
            <div className="grid grid-cols-[25%_75%] justify-start items-center">
              <input
                type="radio"
                name="occasion"
                value="Graduation"
                onChange={() => setSelectedOccasion("Graduation")}
                className="rounded border-primary-default focus:border-primary-default focus:ring-primary-default checked:bg-primary-default checked:dark:bg-dark-default"
              />
              <span>
                <label className="text-lg font-light capitalize">
                  Graduation
                </label>
              </span>
            </div>
            <div className="grid grid-cols-[25%_75%] justify-start items-center">
              <input
                type="radio"
                name="occasion"
                value="JSProm"
                onChange={() => setSelectedOccasion("JSProm")}
                className="rounded border-primary-default focus:border-primary-default focus:ring-primary-default checked:bg-primary-default checked:dark:bg-dark-default"
              />
              <span>
                <label className="text-lg font-light capitalize">JS Prom</label>
              </span>
            </div>
            <div className="grid grid-cols-[25%_75%] justify-start items-center">
              <input
                type="radio"
                name="occasion"
                value="Wedding"
                onChange={() => setSelectedOccasion("Wedding")}
                className="rounded border-primary-default focus:border-primary-default focus:ring-primary-default checked:bg-primary-default checked:dark:bg-dark-default"
              />
              <span>
                <label className="text-lg font-light capitalize">Wedding</label>
              </span>
            </div>
          </div>
        </div>
        <div className="px-8">
          <div className="py-4 text-lg font-semibold">Price Range</div>
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
          <div className="pt-4 pb-2 text-lg font-semibold">Ratings</div>
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
                  <h1 className="pl-2 text-xl font-medium capitalize">Above</h1>
                )}
              </div>
            ))}
          </div>
        </div>
        <hr className="my-4 border-t border-dark-default dark:border-light-default" />
        <div className="grid items-center justify-center">
          <button
            className="px-24 py-2 text-xl font-semibold rounded-lg bg-primary-default"
            onClick={handleApplyFilters}
          >
            Apply
          </button>
        </div>
      </div>
    </>
  );
}
