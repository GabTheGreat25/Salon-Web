import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./state";

export const hiringSlice = createSlice({
  name: "hiring",
  initialState,
  reducers: {
    submitForm: (state, action) => {
      const { date, time, isHiring } = action.payload;

      state.hiringData.date = date;
      state.hiringData.time = time;
      state.hiringData.isHiring = isHiring;
    },
  },
});

export const { submitForm } = hiringSlice.actions;

export default hiringSlice.reducer;
