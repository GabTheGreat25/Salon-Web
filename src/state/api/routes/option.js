import { ROUTE, TAGS, API } from "@constants";

export const get = (builder) => {
  return builder.query({
    query: () => `${ROUTE.OPTIONS_ROUTE}`,
    method: API.GET,
    providesTags: [TAGS.OPTIONS],
  });
};

export const getById = (builder) => {
  return builder.query({
    query: (id) => `${ROUTE.OPTION_ID_ROUTE.replace(":id", id)}`,
    method: API.GET,
    providesTags: [TAGS.OPTIONS],
  });
};

export const add = (builder) => {
  return builder.mutation({
    query: (payload) => ({
      url: `${ROUTE.OPTIONS_ROUTE}`,
      method: API.POST,
      body: payload,
    }),
    invalidatesTags: [TAGS.OPTIONS],
  });
};

export const updateById = (builder) => {
  return builder.mutation({
    query: ({ id, payload }) => {
      return {
        url: `${ROUTE.EDIT_OPTION_ID_ROUTE.replace(":id", id)}`,
        method: API.PATCH,
        body: payload,
      };
    },
    invalidatesTags: [TAGS.OPTIONS],
  });
};

export const deleteById = (builder) => {
  return builder.mutation({
    query: (id) => ({
      url: `${ROUTE.OPTION_ID_ROUTE.replace(":id", id)}`,
      method: API.DELETE,
    }),
    invalidatesTags: [TAGS.OPTIONS],
  });
};

export default { get, getById, add, updateById, deleteById };
