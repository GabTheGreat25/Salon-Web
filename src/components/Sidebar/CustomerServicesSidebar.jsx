import React, { useState } from "react";
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
            Occassions
          </div>
          <div className="grid grid-flow-row-dense gap-y-2">
            <div className="grid grid-cols-[25%_75%] justify-start items-center">
              <input
                type="radio"
                checked={selectedOccassion === "Graduation"}
                onChange={() => setSelectedOccassion("Graduation")}
                className="border-primary-default focus:border-primary-default focus:ring-primary-default checked:bg-primary-default"
              />
              <span>
                <h1 className="text-lg font-light capitalize">Graduation</h1>
              </span>
            </div>
            <div className="grid grid-cols-[25%_75%] justify-start items-center">
              <input
                type="radio"
                checked={selectedOccassion === "Js Prom"}
                onChange={() => setSelectedOccassion("Js Prom")}
                className="border-primary-default focus:border-primary-default focus:ring-primary-default checked:bg-primary-default"
              />
              <span>
                <h1 className="text-lg font-light capitalize">Js Prom</h1>
              </span>
            </div>
            <div className="grid grid-cols-[25%_75%] justify-start items-center">
              <input
                type="radio"
                checked={selectedOccassion === "Halloween"}
                onChange={() => setSelectedOccassion("Halloween")}
                className="border-primary-default focus:border-primary-default focus:ring-primary-default checked:bg-primary-default"
              />
              <span>
                <h1 className="text-lg font-light capitalize">Halloween</h1>
              </span>
            </div>
            <div className="grid grid-cols-[25%_75%] justify-start items-center">
              <input
                type="radio"
                checked={selectedOccassion === "Christmas"}
                onChange={() => setSelectedOccassion("Christmas")}
                className="border-primary-default focus:border-primary-default focus:ring-primary-default checked:bg-primary-default"
              />
              <span>
                <h1 className="text-lg font-light capitalize">Christmas</h1>
              </span>
            </div>
            <div className="grid grid-cols-[25%_75%] justify-start items-center">
              <input
                type="radio"
                checked={selectedOccassion === "Valentines"}
                onChange={() => setSelectedOccassion("Valentines")}
                className="border-primary-default focus:border-primary-default focus:ring-primary-default checked:bg-primary-default"
              />
              <span>
                <h1 className="text-lg font-light capitalize">Valentines</h1>
              </span>
            </div>
            <div className="grid grid-cols-[25%_75%] justify-start items-center">
              <input
                type="radio"
                checked={selectedOccassion === "Wedding"}
                onChange={() => setSelectedOccassion("Wedding")}
                className="border-primary-default focus:border-primary-default focus:ring-primary-default checked:bg-primary-default"
              />
              <span>
                <h1 className="text-lg font-light capitalize">Wedding</h1>
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
