import { ROUTE, API, TAGS } from "@constants";

export const get = (builder) => {
  return builder.query({
    query: () => `${ROUTE.PRODUCTS_ROUTE}`,
    method: API.GET,
    providesTags: [TAGS.PRODUCTS],
  });
};

export const getById = (builder) => {
  return builder.query({
    query: (id) => `${ROUTE.PRODUCT_ID_ROUTE.replace(":id", id)}`,
    method: API.GET,
    providesTags: [TAGS.PRODUCTS],
  });
};

export const add = (builder) => {
  return builder.mutation({
    query: (payload) => ({
      url: `${ROUTE.PRODUCTS_ROUTE}`,
      method: API.POST,
      body: payload,
    }),
    invalidatesTags: [TAGS.PRODUCTS],
  });
};

export const updateById = (builder)=>{
  return builder.mutation({
    query: ({id, payload})=>{
      return {
        url: `${ROUTE.EDIT_PRODUCT_ID_ROUTE.replace(":id",id)}`,
        method: API.PATCH,
        body: payload
      };
    },
    invalidatesTags: [TAGS.PRODUCTS]
  })
}

export const deleteById = (builder) => {
  return builder.mutation({
    query: (id) => ({
      url: `${ROUTE.PRODUCT_ID_ROUTE.replace(":id", id)}`,
      method: API.DELETE,
    }),
    invalidatesTags: [TAGS.PRODUCTS],
  });
};

export default {
  get,
  getById,
  add,
  updateById,
  deleteById
};

