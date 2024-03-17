import { createSlice } from "@reduxjs/toolkit";

export const customerSlice = createSlice({
  name: "customer",
  initialState: {
    customerId: "",
    allergy: [],
    othersMessage: "",
  },
  reducers: {
    customerForm: (state, action) => {
      const { customerId, allergy, othersMessage } = action.payload;
      state.customerId = customerId;
      state.allergy = Array.isArray(allergy) ? allergy : [];
      state.othersMessage = othersMessage;
    },
    resetId: (state) => {
      state.customerId = "";
      state.allergy = [];
      state.othersMessage = "";
    },
  },
});

export const { customerForm, resetId } = customerSlice.actions;

export default customerSlice.reducer;
