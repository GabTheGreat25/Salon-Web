import { ROUTE, TAGS, API } from "@constants";

export const get = (builder) => {
  return builder.query({
    query: () => `${ROUTE.FEEDBACKS_ROUTE}`,
    method: API.GET,
    providesTags: [TAGS.FEEDBACKS],
  });
};

export const getById = (builder) => {
  return builder.query({
    query: (id) => `${ROUTE.FEEDBACK_ID_ROUTE.replace(":id", id)}`,
    method: API.GET,
    providesTags: [TAGS.FEEDBACKS],
  });
};

export const add = (builder) => {
  return builder.mutation({
    query: (payload) => ({
      url: `${ROUTE.FEEDBACKS_ROUTE}`,
      method: API.POST,
      body: payload,
    }),
    invalidatesTags: [TAGS.FEEDBACKS],
  });
};

export const updateById = (builder) => {
  return builder.mutation({
    query: ({ id, payload }) => {
      return {
        url: `${ROUTE.EDIT_FEEDBACK_ID_ROUTE.replace(":id", id)}`,
        method: API.PATCH,
        body: payload,
      };
    },
    invalidatesTags: [TAGS.FEEDBACKS],
  });
};

export const deleteById = (builder) => {
  return builder.mutation({
    query: (id) => ({
      url: `${ROUTE.FEEDBACK_ID_ROUTE.replace(":id", id)}`,
      method: API.DELETE,
    }),
    invalidatesTags: [TAGS.FEEDBACKS],
  });
};

export default { get, getById, add, updateById, deleteById };
