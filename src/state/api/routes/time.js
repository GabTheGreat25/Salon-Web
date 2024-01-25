import { ROUTE, TAGS, API } from "@constants";

export const get = (builder) => {
  return builder.query({
    query: () => `${ROUTE.TIMES_ROUTE}`,
    method: API.GET,
    providesTags: [TAGS.TIMES],
  });
};

export const getById = (builder)=>{
  return builder.query({
    query: (id) => `${ROUTE.TIME_ID_ROUTE.replace(":id", id)}`,
    method: API.GET,
    providesTags:[TAGS.TIMES]
  });
};

export const add = (builder) => {
  return builder.mutation({
    query: (payload) => ({
      url: `${ROUTE.TIMES_ROUTE}`,
      method: API.POST,
      body: payload,
    }),
    invalidatesTags: [TAGS.TIMES],
  });
};

export const updateById = (builder)=>{
  return builder.mutation({
    query: ({id, payload})=>{
      return {
        url: `${ROUTE.EDIT_TIME_ID_ROUTE.replace(":id",id)}`,
        method: API.PATCH,
        body: payload
      };
    },
    invalidatesTags: [TAGS.TIMES]
  })
}

export const deleteById = (builder) => {
  return builder.mutation({
    query: (id) => ({
      url: `${ROUTE.TIME_ID_ROUTE.replace(":id", id)}`,
      method: API.DELETE,
    }),
    invalidatesTags: [TAGS.TIMES],
  });
};

export default { get, getById, add, updateById, deleteById };
