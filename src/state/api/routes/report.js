import { ROUTE, TAGS, API } from "@constants";

export const get = (builder) => {
  return builder.query({
    query: () => `${ROUTE.REPORTS_ROUTE}`,
    method: API.GET,
    providesTags: [TAGS.REPORTS],
  });
};

export const getById = (builder)=>{
  return builder.query({
    query: (id) => `${ROUTE.REPORT_ID_ROUTE.replace(":id", id)}`,
    method: API.GET,
    providesTags:[TAGS.REPORTS]
  });
};

export const add = (builder) => {
  return builder.mutation({
    query: (payload) => ({
      url: `${ROUTE.REPORTS_ROUTE}`,
      method: API.POST,
      body: payload,
    }),
    invalidatesTags: [TAGS.REPORTS],
  });
};

export const updateById = (builder)=>{
  return builder.mutation({
    query: ({id, payload})=>{
      return {
        url: `${ROUTE.EDIT_REPORT_ID_ROUTE.replace(":id",id)}`,
        method: API.PATCH,
        body: payload
      };
    },
    invalidatesTags: [TAGS.REPORTS]
  })
}

export const deleteById = (builder) => {
  return builder.mutation({
    query: (id) => ({
      url: `${ROUTE.REPORT_ID_ROUTE.replace(":id", id)}`,
      method: API.DELETE,
    }),
    invalidatesTags: [TAGS.REPORTS],
  });
};

export default { get, getById, add, updateById, deleteById };
