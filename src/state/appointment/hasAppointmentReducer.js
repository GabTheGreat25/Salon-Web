import { createSlice } from "@reduxjs/toolkit";

export const feeSlice = createSlice({
  name: "fee",
  initialState: {
    hasAppointmentFee: false,
  },
  reducers: {
    hasFee: (state) => {
      state.hasAppointmentFee = true;
    },
    hasNoFee: (state) => {
      state.hasAppointmentFee = false;
    },
  },
});

export const { hasFee, hasNoFee } = feeSlice.actions;

export default feeSlice.reducer;
