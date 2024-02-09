import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./state";

export const waiverSlice = createSlice({
  name: "waiver",
  initialState,
  reducers: {
    waiverForm: (state, action) => {
      state.waiverData.eSignature = action.payload;
      state.waiverData.hasWaiver = true;
    },
    resetWaiver: (state) => {
      state.waiverData.eSignature = "";
      state.waiverData.hasWaiver = false;
    },
  },
});

export const { waiverForm, resetWaiver } = waiverSlice.actions;

export default waiverSlice.reducer;
