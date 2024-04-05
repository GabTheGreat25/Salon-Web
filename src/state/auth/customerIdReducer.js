import { createSlice } from "@reduxjs/toolkit";

export const customerSlice = createSlice({
  name: "customer",
  initialState: {
    customerId: "",
    name: "",
    contact_number: "",
    allergy: [],
    othersMessage: "",
  },
  reducers: {
    customerForm: (state, action) => {
      const { customerId, name, contact_number, allergy, othersMessage } =
        action.payload;
      state.customerId = customerId;
      state.name = name;
      state.contact_number = contact_number;
      state.allergy = Array.isArray(allergy) ? allergy : [];
      state.othersMessage = othersMessage;
    },
    resetId: (state) => {
      state.customerId = "";
      state.name = "";
      state.contact_number = "";
      state.allergy = [];
      state.othersMessage = "";
    },
  },
});

export const { customerForm, resetId } = customerSlice.actions;

export default customerSlice.reducer;
