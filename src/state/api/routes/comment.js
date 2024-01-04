import { ROUTE, TAGS, API } from "@constants";

export const get = (builder) => {
  return builder.query({
    query: () => `${ROUTE.COMMENTS_ROUTE}`,
    method: API.GET,
    providesTags: [TAGS.COMMENTS],
  });
};

export const getById = (builder) => {
  return builder.query({
    query: (id) => `${ROUTE.COMMENT_ID_ROUTE.replace(":id", id)}`,
    method: API.GET,
    providesTags: [TAGS.COMMENTS],
  });
};

export const add = (builder) => {
  return builder.mutation({
    query: (payload) => ({
      url: `${ROUTE.COMMENTS_ROUTE}`,
      method: API.POST,
      body: payload,
    }),
    invalidatesTags: [TAGS.COMMENTS],
  });
};

export const updateById = (builder) => {
  return builder.mutation({
    query: ({ id, payload }) => {
      return {
        url: `${ROUTE.EDIT_COMMENT_ID_ROUTE.replace(":id", id)}`,
        method: API.PATCH,
        body: payload,
      };
    },
    invalidatesTags: [TAGS.COMMENTS],
  });
};

export const deleteById = (builder) => {
  return builder.mutation({
    query: (id) => ({
      url: `${ROUTE.COMMENT_ID_ROUTE.replace(":id", id)}`,
      method: API.DELETE,
    }),
    invalidatesTags: [TAGS.COMMENTS],
  });
};

export default { get, getById, add, updateById, deleteById };
