import { ROUTE, TAGS, API } from "@constants";

export const get = (builder) => {
  return builder.query({
    query: () => `${ROUTE.FOUNDS_ROUTE}`,
    method: API.GET,
    providesTags: [TAGS.FOUNDS],
  });
};

export const getById = (builder)=>{
  return builder.query({
    query: (id) => `${ROUTE.FOUND_ID_ROUTE.replace(":id", id)}`,
    method: API.GET,
    providesTags:[TAGS.FOUNDS]
  });
};

export const add = (builder) => {
  return builder.mutation({
    query: (payload) => ({
      url: `${ROUTE.FOUNDS_ROUTE}`,
      method: API.POST,
      body: payload,
    }),
    invalidatesTags: [TAGS.FOUNDS],
  });
};

export const updateById = (builder)=>{
  return builder.mutation({
    query: ({id, payload})=>{
      return {
        url: `${ROUTE.EDIT_FOUND_ID_ROUTE.replace(":id",id)}`,
        method: API.PATCH,
        body: payload
      };
    },
    invalidatesTags: [TAGS.FOUNDS]
  })
}

export const deleteById = (builder) => {
  return builder.mutation({
    query: (id) => ({
      url: `${ROUTE.FOUND_ID_ROUTE.replace(":id", id)}`,
      method: API.DELETE,
    }),
    invalidatesTags: [TAGS.FOUNDS],
  });
};

export default { get, getById, add, updateById, deleteById };
