import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./state";

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    addClickedId: (state, action) => {
      const id = action.payload;
      const exists = state.clickedIds.some((clickedId) => clickedId === id);
      if (!exists) state.clickedIds.push(id);
    },
  },
});

export const { addClickedId } = notificationSlice.actions;

export default notificationSlice.reducer;
