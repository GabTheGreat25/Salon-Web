import { ROUTE, API, TAGS } from "@constants";

export const get = (builder) => {
  return builder.query({
    query: () => `${ROUTE.INGREDIENTS_ROUTE}`,
    method: API.GET,
    providesTags: [TAGS.INGREDIENTS],
  });
};

export const getById = (builder) => {
  return builder.query({
    query: (id) => `${ROUTE.INGREDIENT_ID_ROUTE.replace(":id", id)}`,
    method: API.GET,
    providesTags: [TAGS.INGREDIENTS],
  });
};

export const add = (builder) => {
  return builder.mutation({
    query: (payload) => ({
      url: `${ROUTE.INGREDIENTS_ROUTE}`,
      method: API.POST,
      body: payload,
    }),
    invalidatesTags: [TAGS.INGREDIENTS],
  });
};

export const updateById = (builder) => {
  return builder.mutation({
    query: ({ id, payload }) => {
      return {
        url: `${ROUTE.EDIT_INGREDIENT_ID_ROUTE.replace(":id", id)}`,
        method: API.PATCH,
        body: payload,
      };
    },
    invalidatesTags: [TAGS.INGREDIENTS],
  });
};

export const deleteById = (builder) => {
  return builder.mutation({
    query: (id) => ({
      url: `${ROUTE.INGREDIENT_ID_ROUTE.replace(":id", id)}`,
      method: API.DELETE,
    }),
    invalidatesTags: [TAGS.INGREDIENTS],
  });
};

export default {
  get,
  getById,
  add,
  updateById,
  deleteById,
};
