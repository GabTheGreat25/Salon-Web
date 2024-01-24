import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./state";

export const openSlice = createSlice({
  name: "open",
  initialState,
  reducers: {
    openForm: (state, action) => {
      const { isOpen } = action.payload;
      state.openData.isOpen = isOpen;
    },
  },
});

export const { openForm } = openSlice.actions;

export default openSlice.reducer;
