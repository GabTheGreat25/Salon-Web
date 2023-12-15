import { combineReducers } from "@reduxjs/toolkit";
import auth from "./auth/authReducer";
import { api } from "./api/reducer";

export const rootReducer = combineReducers({
  auth,
  [api.reducerPath]: api.reducer,
});
