import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./state";

export const ingredientSlice = createSlice({
  name: "ingredient",
  initialState,
  reducers: {
    ingredientForm: (state, action) => {
      state.ingredientData.allergy = action.payload;
    },
    resetReason: (state) => {
      state.ingredientData.allergy = [];
    },
  },
});

export const { ingredientForm, resetReason } = ingredientSlice.actions;

export default ingredientSlice.reducer;
