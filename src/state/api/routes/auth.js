import { ROUTE, API } from "@/constants";

export const login = (builder) => {
  return builder.mutation({
    query: (payload) => ({
      url: ROUTE.LOGIN_ROUTE,
      method: API.POST,
      body: payload,
    }),
  });
};

export const logout = (builder) => {
  return builder.mutation({
    query: (payload) => ({
      url: ROUTE.LOGOUT_ROUTE,
      method: API.POST,
      body: payload,
    }),
  });
};

export default { login, logout };
