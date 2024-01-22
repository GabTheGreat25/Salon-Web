import { createSlice } from "@reduxjs/toolkit";

export const reasonSlice = createSlice({
  name: "reason",
  initialState: {
    reasonData: {
      rebookReason: "",
    },
  },
  reducers: {
    reasonForm: (state, action) => {
      const { rebookReason } = action.payload;
      state.reasonData.rebookReason = rebookReason;
    },
    resetReason: (state) => {
      state.reasonData.rebookReason = "";
    },
  },
});

export const { reasonForm, resetReason } = reasonSlice.actions;

export default reasonSlice.reducer;
