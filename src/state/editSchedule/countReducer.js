import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./state";

export const countSlice = createSlice({
  name: "count",
  initialState,
  reducers: {
    setEditedTransactionIds: (state, action) => {
      if (Array.isArray(action.payload)) {
        state.countData.editedTransactionIds = [
          ...state.countData.editedTransactionIds,
          ...action.payload,
        ];
      } else {
        state.countData.editedTransactionIds.push(action.payload);
      }
    },
  },
});

export const { setEditedTransactionIds } = countSlice.actions;

export default countSlice.reducer;
