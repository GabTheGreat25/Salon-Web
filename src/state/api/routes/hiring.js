import { ROUTE, API, TAGS } from "@constants";

export const get = (builder) => {
  return builder.query({
    query: () => `${ROUTE.HIRING_ROUTE}`,
    method: API.GET,
    providesTags: [TAGS.HIRINGS],
  });
};

export const getById = (builder) => {
  return builder.query({
    query: (id) => `${ROUTE.HIRING_ID_ROUTE.replace(":id", id)}`,
    method: API.GET,
    providesTags: [TAGS.HIRINGS],
  });
};

export const add = (builder) => {
  return builder.mutation({
    query: (payload) => ({
      url: `${ROUTE.HIRING_ROUTE}`,
      method: API.POST,
      body: payload,
    }),
    invalidatesTags: [TAGS.HIRINGS],
  });
};

export const updateById = (builder)=>{
  return builder.mutation({
    query: ({id, payload})=>{
      return {
        url: `${ROUTE.EDIT_HIRING_ID_ROUTE.replace(":id",id)}`,
        method: API.PATCH,
        body: payload
      };
    },
    invalidatesTags: [TAGS.HIRINGS]
  })
}

export const deleteById = (builder) => {
  return builder.mutation({
    query: (id) => ({
      url: `${ROUTE.HIRING_ID_ROUTE.replace(":id", id)}`,
      method: API.DELETE,
    }),
    invalidatesTags: [TAGS.HIRINGS],
  });
};

export default {
  get,
  getById,
  add,
  updateById,
  deleteById
};

