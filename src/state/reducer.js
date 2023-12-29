import { combineReducers } from "@reduxjs/toolkit";
import auth from "./auth/authReducer";
import appointment from "./appointment/appointmentReducer";
import { api } from "./api/reducer";

export const rootReducer = combineReducers({
  auth,
  appointment,
  [api.reducerPath]: api.reducer,
});
