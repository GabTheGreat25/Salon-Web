import { combineReducers } from "@reduxjs/toolkit";
import auth from "./auth/authReducer";
import appointment from "./appointment/appointmentReducer";
import hiring from "./hiring/hiringReducer";
import count from "./editSchedule/countReducer";
import { api } from "./api/reducer";

export const rootReducer = combineReducers({
  auth,
  appointment,
  hiring,
  count,
  [api.reducerPath]: api.reducer,
});
