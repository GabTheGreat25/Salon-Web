import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ingredientSlice } from "@ingredient";
import { FaArrowLeft } from "react-icons/fa";
import { locationSlice } from "@location";
import { useGetExclusionsQuery } from "@api";

export default function IngredientForm() {
  const checkedAllergies = useSelector(
    (state) => state.ingredient.ingredientData.allergy || []
  );

  const { data, isLoading } = useGetExclusionsQuery();
  const allergies = data?.details;

  const filteredAllergies =
    allergies?.filter((allergy) => allergy.type.includes("Hair")) || [];

  const dispatch = useDispatch();

  useEffect(() => {
    if (!Array.isArray(checkedAllergies)) {
      dispatch(ingredientSlice.actions.ingredientForm([]));
    } else dispatch(ingredientSlice.actions.ingredientForm(checkedAllergies));
  }, [checkedAllergies, dispatch]);

  const handleCheckboxChange = (allergy) => {
    const isChecked = checkedAllergies.some((item) => item._id === allergy._id);

    let updatedAllergies;
    if (isChecked) {
      updatedAllergies = checkedAllergies.filter(
        (val) => val._id !== allergy._id
      );
    } else {
      updatedAllergies = [...checkedAllergies, allergy];
    }

    dispatch(ingredientSlice.actions.ingredientForm(updatedAllergies));
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
    <>
      <div className="min-h-screen">
        <button onClick={goBack} className="px-8 py-4">
          <FaArrowLeft size={40} />
        </button>
        <h1 className="py-6 text-3xl text-center">
          Choose any of the following <br /> Chemical Solutions that can cause
          you allergy
        </h1>
        <div className="grid grid-flow-row gap-6 pt-2 ml-6 md:grid-cols-5">
          {filteredAllergies?.map((allergy) => (
            <div
              key={allergy?._id}
              className="grid grid-cols-[20%_80%] justify-center items-center"
            >
              <input
                type="checkbox"
                id={allergy?.type}
                value={allergy?.type}
                checked={
                  Array.isArray(checkedAllergies) &&
                  checkedAllergies?.some((item) => item._id === allergy._id)
                }
                onChange={() => handleCheckboxChange(allergy)}
                className="border-2 rounded xl:w-8 xl:h-8 lg:h-6 lg:w-6 md:h-4 md:w-4 border-primary-default focus:border-primary-accent focus:ring-primary-default checked:bg-primary-default checked:dark:bg-dark-default"
              />
              <label
                htmlFor={allergy?.type}
                className="block cursor-pointer text-xs md:text-sm lg:text-[.9rem] overflow-wrap-break-word"
                onClick={(e) => handleLabelClick(allergy, e)}
                style={{ overflowWrap: "break-word" }}
              >
                {allergy?.ingredient_name}
              </label>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
