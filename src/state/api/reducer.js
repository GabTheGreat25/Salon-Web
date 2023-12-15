import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "@/env";
import UserAPI from "./routes/users";
import AuthAPI from "./routes/auth";
import { API, TAGS, RESOURCE } from "@/constants";

const prepareHeaders = (headers, { getState }) => {
  if (getState()?.auth?.authenticated)
    headers.set("authorization", `Bearer ${getState()?.auth?.token || ""}`);

  headers.set("accept", `application/json`);
  return headers;
};

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  credentials: RESOURCE.INCLUDE,
  prepareHeaders,
});

export const api = createApi({
  reducerPath: TAGS.API,
  baseQuery,
  tagTypes: API.TAGS,
  keepUnusedDataFor: 0,
  endpoints: (builder) => ({
    login: AuthAPI.login(builder),
    logout: AuthAPI.logout(builder),
    getUsers: UserAPI.get(builder),
    getUserById: UserAPI.getById(builder),
    addUser: UserAPI.add(builder),
    updateUser: UserAPI.updateById(builder),
    deleteUser: UserAPI.deleteById(builder),
    confirmUser: UserAPI.confirmUser(builder),
    updateUserPassword: UserAPI.updatePasswordById(builder),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useConfirmUserMutation,
  useUpdateUserPasswordMutation,
  useLoginMutation,
  useLogoutMutation,
} = api;
