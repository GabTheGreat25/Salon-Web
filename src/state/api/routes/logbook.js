import { ROUTE, API, TAGS } from "@constants";

export const get = (builder) => {
  return builder.query({
    query: () => `${ROUTE.LOGBOOKS_ROUTE}`,
    method: API.GET,
    providesTags: [TAGS.LOGBOOKS],
  });
};

export const getById = (builder) => {
  return builder.query({
    query: (id) => `${ROUTE.LOGBOOK_ID_ROUTE.replace(":id", id)}`,
    method: API.GET,
    providesTags: [TAGS.LOGBOOKS],
  });
};

export const add = (builder) => {
  return builder.mutation({
    query: (payload) => ({
      url: `${ROUTE.LOGBOOKS_ROUTE}`,
      method: API.POST,
      body: payload,
    }),
    invalidatesTags: [TAGS.LOGBOOKS],
  });
};

export const updateById = (builder)=>{
  return builder.mutation({
    query: ({id, payload})=>{
      return {
        url: `${ROUTE.EDIT_LOGBOOK_ID_ROUTE.replace(":id",id)}`,
        method: API.PATCH,
        body: payload
      };
    },
    invalidatesTags: [TAGS.LOGBOOKS]
  })
}

export const deleteById = (builder) => {
  return builder.mutation({
    query: (id) => ({
      url: `${ROUTE.LOGBOOK_ID_ROUTE.replace(":id", id)}`,
      method: API.DELETE,
    }),
    invalidatesTags: [TAGS.LOGBOOKS],
  });
};

export default {
  get,
  getById,
  add,
  updateById,
  deleteById
};

