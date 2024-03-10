import { combineReducers } from "@reduxjs/toolkit";
import auth from "./auth/authReducer";
import appointment from "./appointment/appointmentReducer";
import hiring from "./hiring/hiringReducer";
import reason from "./editSchedule/reasonReducer";
import open from "./open/openReducer";
import ingredient from "./ingredient/ingredientReducer";
import location from "./auth/locationReducer";
import waiver from "./waiver/waiverReducer";
import fee from "./appointment/hasAppointmentReducer";
import discount from "./discount/discountReducer";
import notification from "./notification/notificationReducer";
import { api } from "./api/reducer";

export const rootReducer = combineReducers({
  auth,
  appointment,
  hiring,
  reason,
  open,
  ingredient,
  location,
  waiver,
  fee,
  discount,
  notification,
  [api.reducerPath]: api.reducer,
});
