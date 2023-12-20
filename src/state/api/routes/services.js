import { ROUTE, TAGS, API } from "@constants";

export const get = (builder) => {
  return builder.query({
    query: () => `${ROUTE.SERVICES_ROUTE}`,
    method: API.GET,
    providesTags: [TAGS.SERVICES],
  });
};

export const getById = (builder) => {
  return builder.query({
    query: (id) => `${ROUTE.SERVICE_ID_ROUTE.replace(":id", id)}`,
    method: API.GET,
    providesTags: [TAGS.SERVICES],
  });
};

export const add = (builder) => {
  return builder.mutation({
    query: (payload) => ({
      url: `${ROUTE.SERVICES_ROUTE}`,
      method: API.POST,
      body: payload,
    }),
    invalidatesTags: [TAGS.SERVICES],
  });
};

export const updateById = (builder) => {
  return builder.mutation({
    query: ({ id, payload }) => {
      return {
        url: `${ROUTE.EDIT_SERVICE_ID_ROUTE.replace(":id", id)}`,
        method: API.PATCH,
        body: payload,
      };
    },
    invalidatesTags: [TAGS.SERVICES],
  });
};

export const deleteById = (builder) => {
  return builder.mutation({
    query: (id) => ({
      url: `${ROUTE.SERVICE_ID_ROUTE.replace(":id", id)}`,
      method: API.DELETE,
    }),
    invalidatesTags: [TAGS.SERVICES],
  });
};

export default { get, getById, add, updateById, deleteById };
