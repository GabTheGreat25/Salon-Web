import { ROUTE, API, TAGS } from "@constants";

export const get = (builder) => {
  return builder.query({
    query: () => `${ROUTE.EQUIPMENTS_ROUTE}`,
    method: API.GET,
    providesTags: [TAGS.EQUIPMENTS],
  });
};

export const getById = (builder) => {
  return builder.query({
    query: (id) => `${ROUTE.EQUIPMENT_ID_ROUTE.replace(":id", id)}`,
    method: API.GET,
    providesTags: [TAGS.EQUIPMENTS],
  });
};

export const add = (builder) => {
  return builder.mutation({
    query: (payload) => ({
      url: `${ROUTE.EQUIPMENTS_ROUTE}`,
      method: API.POST,
      body: payload,
    }),
    invalidatesTags: [TAGS.EQUIPMENTS],
  });
};

export const updateById = (builder)=>{
  return builder.mutation({
    query: ({id, payload})=>{
      return {
        url: `${ROUTE.EDIT_EQUIPMENT_ID_ROUTE.replace(":id",id)}`,
        method: API.PATCH,
        body: payload
      };
    },
    invalidatesTags: [TAGS.EQUIPMENTS]
  })
}

export const deleteById = (builder) => {
  return builder.mutation({
    query: (id) => ({
      url: `${ROUTE.EQUIPMENT_ID_ROUTE.replace(":id", id)}`,
      method: API.DELETE,
    }),
    invalidatesTags: [TAGS.EQUIPMENTS],
  });
};

export default {
  get,
  getById,
  add,
  updateById,
  deleteById
};

