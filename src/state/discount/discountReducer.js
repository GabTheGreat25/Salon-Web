import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./state";

export const discountSlice = createSlice({
  name: "discount",
  initialState,
  reducers: {
    setEditedTransactionIds: (state, action) => {
      if (Array.isArray(action.payload)) {
        state.discountData.editedTransactionIds = [
          ...state.discountData.editedTransactionIds,
          ...action.payload,
        ];
      } else {
        state.discountData.editedTransactionIds.push(action.payload);
      }
    },
  },
});

export const { setEditedTransactionIds } = discountSlice.actions;

export default discountSlice.reducer;
