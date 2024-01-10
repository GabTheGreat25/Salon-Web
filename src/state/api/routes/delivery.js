import { ROUTE, TAGS, API } from "@constants";

export const get = (builder) => {
  return builder.query({
    query: () => `${ROUTE.DELIVERIES_ROUTE}`,
    method: API.GET,
    providesTags: [TAGS.DELIVERIES],
  });
};

export const getById = (builder) => {
  return builder.query({
    query: (id) => `${ROUTE.DELIVERY_ID_ROUTE.replace(":id", id)}`,
    providesTags: [TAGS.DELIVERIES],
  });
};

export const add = (builder) => {
  return builder.mutation({
    query: (payload) => ({
      url: `${ROUTE.DELIVERIES_ROUTE}`,
      method: API.POST,
      body: payload,
    }),
    invalidatesTags: [TAGS.DELIVERIES],
  });
};

export const updateById = (builder) => {
  return builder.mutation({
    query: ({ id, payload }) => {
      return {
        url: `${ROUTE.EDIT_DELIVERY_ID_ROUTE.replace(":id", id)}`,
        method: API.PATCH,
        body: payload,
      };
    },
    invalidatesTags: [TAGS.DELIVERIES],
  });
};

export const deleteById = (builder) => {
  return builder.mutation({
    query: (id) => ({
      url: `${ROUTE.DELIVERY_ID_ROUTE.replace(":id", id)}`,
      method: API.DELETE,
    }),
    invalidatesTags: [TAGS.DELIVERIES],
  });
};

export default { get, getById, add, updateById, deleteById };
