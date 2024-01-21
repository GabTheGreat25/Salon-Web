import { ROUTE, TAGS, API } from "@constants";

export const get = (builder) => {
  return builder.query({
    query: () => `${ROUTE.BRANDS_ROUTE}`,
    method: API.GET,
    providesTags: [TAGS.BRANDS],
  });
};

export const getById = (builder)=>{
  return builder.query({
    query: (id) => `${ROUTE.BRAND_ID_ROUTE.replace(":id", id)}`,
    method: API.GET,
    providesTags:[TAGS.BRANDS]
  });
};

export const add = (builder) => {
  return builder.mutation({
    query: (payload) => ({
      url: `${ROUTE.BRANDS_ROUTE}`,
      method: API.POST,
      body: payload,
    }),
    invalidatesTags: [TAGS.BRANDS],
  });
};

export const updateById = (builder)=>{
  return builder.mutation({
    query: ({id, payload})=>{
      return {
        url: `${ROUTE.EDIT_BRAND_ID_ROUTE.replace(":id",id)}`,
        method: API.PATCH,
        body: payload
      };
    },
    invalidatesTags: [TAGS.BRANDS]
  })
}

export const deleteById = (builder) => {
  return builder.mutation({
    query: (id) => ({
      url: `${ROUTE.BRAND_ID_ROUTE.replace(":id", id)}`,
      method: API.DELETE,
    }),
    invalidatesTags: [TAGS.BRANDS],
  });
};

export default { get, getById, add, updateById, deleteById };
