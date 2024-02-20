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
  const [selectedOccasion, setSelectedOccasion] = useState("");

  const [disableValentinesDay, setDisableValentinesDay] = useState(false);
  const [disableChristmas, setDisableChristmas] = useState(false);
  const [disableHalloween, setDisableHalloween] = useState(false);
  const [disableNewYear, setDisableNewYear] = useState(false);
  const [disableJsProm, setDisableJsProm] = useState(false);
  const [disableGraduation, setDisableGraduation] = useState(false);

  const handleCategoryChange = (category) => {
    if (category === "All") {
      if (selectedCategories.includes("All")) {
        setSelectedCategories([]);
      } else {
        setSelectedCategories(["All"]);
      }
    } else {
      setSelectedCategories((prevCategories) => {
        if (prevCategories.includes("All")) {
          return [category];
        } else {
          const index = prevCategories.indexOf(category);
          if (index !== -1) {
            return prevCategories.filter((item) => item !== category);
          } else {
            return [...prevCategories, category];
          }
        }
      });
    }
  };

  useEffect(() => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const disableMonthsJsProm = [0, 1, 4, 5, 6, 7, 8, 9, 10, 11];
    const disableMonthsGraduation = [0, 1, 2, 4, 5, 6, 7, 8, 9, 10, 11];

    setDisableValentinesDay(currentMonth !== 1);
    setDisableChristmas(currentMonth !== 11);
    setDisableHalloween(currentMonth !== 9);
    setDisableNewYear(currentMonth !== 0);
    setDisableJsProm(disableMonthsJsProm.includes(currentMonth));
    setDisableGraduation(disableMonthsGraduation.includes(currentMonth));
  }, []);

  const handleOccasionChange = (occassion) => {
    setSelectedOccasion((prevOccasion) => {
      return prevOccasion === occassion ? "" : occassion;
    });

    const occassionCheckboxes = [
      "Wedding",
      "Birthday",
      "Graduation",
      "Js Prom",
      "Halloween",
      "Christmas",
      "Valentines",
      "New Year",
    ];
    occassionCheckboxes.forEach((checkbox) => {
      if (checkbox !== occassion) {
        document.getElementsByName("occassion")[
          occassionCheckboxes.indexOf(checkbox)
        ].checked = false;
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
      occassion: selectedOccasion,
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
            {["All", "Hands", "Hair", "Feet", "Face", "Body", "Eyelash"].map(
              (category) => (
                <div
                  key={category}
                  className="grid grid-cols-[25%_75%] justify-start items-center"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                    className="rounded border-primary-default focus:border-primary-default focus:ring-primary-default checked:bg-primary-default checked:dark:bg-dark-default"
                  />
                  <span>
                    <h1 className="text-lg font-light capitalize">
                      {category}
                    </h1>
                  </span>
                </div>
              )
            )}
          </div>
        </div>

        <div className="grid items-center justify-start px-8">
          <div className="py-4 text-lg font-semibold capitalize whitespace-nowrap">
            Occasions
          </div>
          <div className="grid grid-flow-row-dense gap-y-2">
            <div className="grid grid-cols-[25%_75%] justify-start items-center">
              <input
                type="checkbox"
                name="occassion"
                value="Wedding"
                onChange={() => handleOccasionChange("Wedding")}
                className="rounded border-primary-default focus:border-primary-default focus:ring-primary-default checked:bg-primary-default checked:dark:bg-dark-default"
              />
              <span>
                <label className="text-lg font-light capitalize">Wedding</label>
              </span>
            </div>
            <div className="grid grid-cols-[25%_75%] justify-start items-center">
              <input
                type="checkbox"
                name="occassion"
                value="Birthday"
                onChange={() => handleOccasionChange("Birthday")}
                className="rounded border-primary-default focus:border-primary-default focus:ring-primary-default checked:bg-primary-default checked:dark:bg-dark-default"
              />
              <span>
                <label className="text-lg font-light capitalize">
                  Birthday
                </label>
              </span>
            </div>
            <div className="grid grid-cols-[25%_75%] justify-start items-center">
              <input
                type="checkbox"
                name="occassion"
                value="Graduation"
                onChange={() => handleOccasionChange("Graduation")}
                disabled={disableGraduation}
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
                type="checkbox"
                name="occassion"
                value="Js Prom"
                onChange={() => handleOccasionChange("Js Prom")}
                disabled={disableJsProm}
                className="rounded border-primary-default focus:border-primary-default focus:ring-primary-default checked:bg-primary-default checked:dark:bg-dark-default"
              />
              <span>
                <label className="text-lg font-light capitalize">Js Prom</label>
              </span>
            </div>
            <div className="grid grid-cols-[25%_75%] justify-start items-center">
              <input
                type="checkbox"
                name="occassion"
                value="Halloween"
                onChange={() => handleOccasionChange("Halloween")}
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
                type="checkbox"
                name="occassion"
                value="Christmas"
                onChange={() => handleOccasionChange("Christmas")}
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
                type="checkbox"
                name="occassion"
                value="Valentines"
                onChange={() => handleOccasionChange("Valentines")}
                disabled={disableValentinesDay}
                className="rounded border-primary-default focus:border-primary-default focus:ring-primary-default checked:bg-primary-default checked:dark:bg-dark-default"
              />
              <span>
                <label className="text-lg font-light capitalize">
                  Valentines
                </label>
              </span>
            </div>
            <div className="grid grid-cols-[25%_75%] justify-start items-center">
              <input
                type="checkbox"
                name="occassion"
                value="New Year"
                onChange={() => handleOccasionChange("New Year")}
                disabled={disableNewYear}
                className="rounded border-primary-default focus:border-primary-default focus:ring-primary-default checked:bg-primary-default checked:dark:bg-dark-default"
              />
              <span>
                <label className="text-lg font-light capitalize">
                  New Year
                </label>
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
        <div className="px-8 pt-4 pb-6">
          <button
            onClick={handleApplyFilters}
            className="w-full px-4 py-2 font-semibold text-white rounded-md bg-primary-default hover:bg-primary-dark-default"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </>
  );
}
