import { createSlice } from "@reduxjs/toolkit";

export const locationSlice = createSlice({
  name: "location",
  initialState: {
    formData: {
      name: "",
      age: "",
      contact_number: "",
      email: "",
      password: "",
      confirmPassword: "",
      roles: "Online Customer",
      description: "",
      allergy: [],
    },
  },
  reducers: {
    updateFormData(state, action) {
      state.formData = {
        ...state.formData,
        ...action.payload,
      };
    },
    clearFormData(state) {
      state.formData = {
        name: "",
        age: "",
        contact_number: "",
        email: "",
        password: "",
        confirmPassword: "",
        roles: "Online Customer",
        description: "",
        allergy: [],
      };
    },
  },
});

export const { updateFormData, clearFormData } = locationSlice.actions;

export default locationSlice.reducer;
