import { createSlice } from "@reduxjs/toolkit";
import { api } from "@api";
import { initialState } from "./state";
import { TAGS } from "@/constants";

export const authSlice = createSlice({
  name: TAGS.AUTH,
  initialState,
  reducers: {
    logout(state) {
      state.token = "";
      state.user = {};
      state.authenticated = false;
      state.loggedInUserId = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        if (payload?.success === true) {
          state.token = payload?.details?.accessToken;
          state.authenticated = true;
          state.loggedInUserId = payload?.details?.user?._id;

          const roles = payload?.details?.user?.roles;
          if (roles) {
            if (roles.includes("Beautician")) {
              state.user = {
                ...state.user,
                ...payload?.details?.user,
                requirement: payload?.details?.requirement,
              };
            } else if (
              roles.includes("Online Customer") ||
              roles.includes("Walk-In Customer")
            ) {
              state.user = {
                ...state.user,
                ...payload?.details?.user,
                information: payload?.details?.information,
              };
            } else {
              state.user = {
                ...state.user,
                ...payload?.details?.user,
              };
            }
          }
        }
      }
    );
    builder.addMatcher(
      api.endpoints.updateUser.matchFulfilled,
      (state, { payload }) => {
        if (payload?.success === true) {
          const updatedUser = payload?.details?.updatedUser;
          if (updatedUser?._id === state.loggedInUserId) {
            return {
              ...state,
              user: {
                ...state.user,
                ...updatedUser,
              },
            };
          }
        }
        return state;
      }
    );
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
