import { ROUTE, TAGS, API } from "@constants";

export const get = (builder) => {
  return builder.query({
    query: () => `${ROUTE.EXCLUSIONS_ROUTE}`,
    method: API.GET,
    providesTags: [TAGS.EXCLUSIONS],
  });
};

export const getById = (builder)=>{
  return builder.query({
    query: (id) => `${ROUTE.EXCLUSION_ID_ROUTE.replace(":id", id)}`,
    method: API.GET,
    providesTags:[TAGS.EXCLUSIONS]
  });
};

export const add = (builder) => {
  return builder.mutation({
    query: (payload) => ({
      url: `${ROUTE.EXCLUSIONS_ROUTE}`,
      method: API.POST,
      body: payload,
    }),
    invalidatesTags: [TAGS.EXCLUSIONS],
  });
};

export const updateById = (builder)=>{
  return builder.mutation({
    query: ({id, payload})=>{
      return {
        url: `${ROUTE.EXCLUSION_EDIT_ID_ROUTE.replace(":id",id)}`,
        method: API.PATCH,
        body: payload
      };
    },
    invalidatesTags: [TAGS.EXCLUSIONS]
  })
}

export const deleteById = (builder) => {
  return builder.mutation({
    query: (id) => ({
      url: `${ROUTE.EXCLUSION_ID_ROUTE.replace(":id", id)}`,
      method: API.DELETE,
    }),
    invalidatesTags: [TAGS.EXCLUSIONS],
  });
};

export default { get, getById, add, updateById, deleteById };
