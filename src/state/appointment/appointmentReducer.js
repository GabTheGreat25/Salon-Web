import { createSlice } from "@reduxjs/toolkit";
import { api } from "../api/reducer";
import { initialState } from "./state";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    setService: (state, action) => {
      const newService = action.payload;

      const existingService = state.appointmentData.find(
        (service) => service.service_id === newService.service_id
      );

      if (!existingService) {
        state.appointmentData.push(newService);
        state.count = state.appointmentData.length;
      } else {
        toast.error("Service is already in the cart", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      }
    },
    clearAppointmentData(state) {
      state.appointmentData = [];
      state.count = 0;
    },
    decreaseCount: (state, action) => {
      const serviceIdToRemove = action.payload;

      const indexToRemove = state.appointmentData.findIndex(
        (service) => service.service_id === serviceIdToRemove
      );

      if (indexToRemove !== -1) {
        state.appointmentData.splice(indexToRemove, 1);
        state.count -= 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.addAppointment.matchFulfilled,
      (state, { payload }) => {
        if (payload?.success === true) {
          const { appointment } = payload.details;
          state.appointmentData.push(appointment);
        }
      }
    );
  },
});

export const { setService, clearAppointmentData, decreaseCount } =
  appointmentSlice.actions;

export default appointmentSlice.reducer;
