import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ingredientSlice } from "@ingredient";
import { FaArrowLeft } from "react-icons/fa";
import { locationSlice } from "@location";

export default function IngredientForm() {
  const checkedAllergies = useSelector(
    (state) => state.ingredient.ingredientData.allergy || []
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (!Array.isArray(checkedAllergies)) {
      dispatch(ingredientSlice.actions.ingredientForm([]));
    } else dispatch(ingredientSlice.actions.ingredientForm(checkedAllergies));
  }, [checkedAllergies, dispatch]);

  const handleCheckboxChange = (allergy) => {
    const updatedAllergies = checkedAllergies.includes(allergy)
      ? checkedAllergies.filter((val) => val !== allergy)
      : [...checkedAllergies, allergy];

    dispatch(ingredientSlice.actions.ingredientForm(updatedAllergies));
  };

  const allergies = ["Test", "Again", "And", "Yeah", "Anotha", "One", "Bruh"];

  const truncateText = (text, maxLength) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  const handleLabelClick = (allergy, event) => {
    event.preventDefault();
  };

  const goBack = () => {
    dispatch(
      locationSlice.actions.updateFormData({ allergy: checkedAllergies })
    );
    window.history.back();
  };

  return (
    <div className="min-h-screen">
      <button onClick={goBack} className="px-8 py-4">
        <FaArrowLeft size={40} />
      </button>
      <h1 className="py-6 text-3xl text-center">
        Choose Your Ingredients <br /> That You Prefer To Be Excluded
      </h1>
      <div className="grid grid-flow-row gap-6 pt-2 ml-6 md:grid-cols-5">
        {allergies.map((allergy, index) => (
          <div
            key={index}
            className="grid grid-cols-[20%_80%] justify-center items-center"
          >
            <input
              type="checkbox"
              id={allergy.toLowerCase()}
              value={allergy}
              checked={
                Array.isArray(checkedAllergies) &&
                checkedAllergies.includes(allergy)
              }
              onChange={() => handleCheckboxChange(allergy)}
              className="border-2 rounded xl:w-8 xl:h-8 lg:h-6 lg:w-6 md:h-4 md:w-4 border-primary-default focus:border-primary-default focus:ring-primary-default checked:bg-primary-default checked:dark:bg-dark-default"
            />
            <label
              htmlFor={allergy.toLowerCase()}
              className="block cursor-pointer 2xl:text-3xl xl:text-lg lg:text-[.9rem] md:text-[.8rem]"
              onClick={(e) => handleLabelClick(allergy, e)}
            >
              <div style={{ overflowWrap: "break-word" }}>
                {truncateText(allergy, 10)}
              </div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
