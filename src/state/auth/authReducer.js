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
    let user;

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
            } else if (roles.includes("Receptionist")) {
              state.user = {
                ...state.user,
                ...payload?.details?.user,
                requirement: payload?.details?.requirement,
              };
            } else if (roles.includes("Customer")) {
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
        user = payload?.details?.user;

        if (payload?.success === true) {
          if (user?._id === state.loggedInUserId) {
            const roles = user?.roles;
            let updatedState = {
              ...state,
              user: {
                ...state.user,
                ...user,
              },
            };

            if (roles) {
              if (roles.includes("Beautician")) {
                updatedState = {
                  ...updatedState,
                  user: {
                    ...updatedState.user,
                    requirement: payload?.details?.requirement,
                  },
                };
              } else if (roles.includes("Receptionist")) {
                updatedState = {
                  ...updatedState,
                  user: {
                    ...updatedState.user,
                    requirement: payload?.details?.requirement,
                  },
                };
              } else if (roles.includes("Customer")) {
                updatedState = {
                  ...updatedState,
                  user: {
                    ...updatedState.user,
                    information: payload?.details?.information,
                  },
                };
              } else {
                updatedState = {
                  ...updatedState,
                  user: {
                    ...updatedState.user,
                  },
                };
              }
            }

            return updatedState;
          }
        }
        return state;
      }
    );
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
