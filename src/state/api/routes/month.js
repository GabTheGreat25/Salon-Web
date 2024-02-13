import { ROUTE, TAGS, API } from "@constants";

export const get = (builder) => {
  return builder.query({
    query: () => `${ROUTE.MONTHS_ROUTE}`,
    method: API.GET,
    providesTags: [TAGS.MONTHS],
  });
};

export const getById = (builder)=>{
  return builder.query({
    query: (id) => `${ROUTE.MONTH_ID_ROUTE.replace(":id", id)}`,
    method: API.GET,
    providesTags:[TAGS.MONTHS]
  });
};

export const add = (builder) => {
  return builder.mutation({
    query: (payload) => ({
      url: `${ROUTE.MONTHS_ROUTE}`,
      method: API.POST,
      body: payload,
    }),
    invalidatesTags: [TAGS.MONTHS],
  });
};

export const updateById = (builder)=>{
  return builder.mutation({
    query: ({id, payload})=>{
      return {
        url: `${ROUTE.EDIT_MONTH_ID_ROUTE.replace(":id",id)}`,
        method: API.PATCH,
        body: payload
      };
    },
    invalidatesTags: [TAGS.MONTHS]
  })
}

export const deleteById = (builder) => {
  return builder.mutation({
    query: (id) => ({
      url: `${ROUTE.MONTH_ID_ROUTE.replace(":id", id)}`,
      method: API.DELETE,
    }),
    invalidatesTags: [TAGS.MONTHS],
  });
};

export default { get, getById, add, updateById, deleteById };
