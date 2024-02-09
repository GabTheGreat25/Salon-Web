import { combineReducers } from "@reduxjs/toolkit";
import auth from "./auth/authReducer";
import appointment from "./appointment/appointmentReducer";
import hiring from "./hiring/hiringReducer";
import count from "./editSchedule/countReducer";
import reason from "./editSchedule/reasonReducer";
import open from "./open/openReducer";
import ingredient from "./ingredient/ingredientReducer";
import location from "./auth/locationReducer";
import waiver from "./waiver/waiverReducer";
import { api } from "./api/reducer";

export const rootReducer = combineReducers({
  auth,
  appointment,
  hiring,
  count,
  reason,
  open,
  ingredient,
  location,
  waiver,
  [api.reducerPath]: api.reducer,
});
