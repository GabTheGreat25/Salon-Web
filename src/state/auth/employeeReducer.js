import { createSlice } from "@reduxjs/toolkit";

export const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    formData: {
      name: "",
      age: "",
      contact_number: "",
      email: "",
      password: "",
      confirmPassword: "",
      job_type: "",
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
        job_type: "",
      };
    },
  },
});

export const { updateFormData, clearFormData } = employeeSlice.actions;

export default employeeSlice.reducer;
