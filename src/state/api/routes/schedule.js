import { ROUTE, API, TAGS } from "@constants";

export const get = (builder) => {
  return builder.query({
    query: () => `${ROUTE.SCHEDULES_ROUTE}`,
    method: API.GET,
    providesTags: [TAGS.SCHEDULES],
  });
};

export const getById = (builder) => {
  return builder.query({
    query: (id) => `${ROUTE.SCHEDULE_ID_ROUTE.replace(":id", id)}`,
    method: API.GET,
    providesTags: [TAGS.SCHEDULES],
  });
};

export const add = (builder) => {
  return builder.mutation({
    query: (payload) => ({
      url: `${ROUTE.SCHEDULES_ROUTE}`,
      method: API.POST,
      body: payload,
    }),
    invalidatesTags: [TAGS.SCHEDULES],
  });
};

export const updateById = (builder) => {
  return builder.mutation({
    query: ({ id, payload }) => {
      return {
        url: `${ROUTE.EDIT_SCHEDULE_ID_ROUTE.replace(":id", id)}`,
        method: API.PATCH,
        body: payload,
      };
    },
    invalidatesTags: [TAGS.SCHEDULES],
  });
};

export const deleteById = (builder) => {
  return builder.mutation({
    query: (id) => ({
      url: `${ROUTE.SCHEDULE_ID_ROUTE.replace(":id", id)}`,
      method: API.DELETE,
    }),
    invalidatesTags: [TAGS.SCHEDULES],
  });
};

export default {
  get,
  getById,
  add,
  updateById,
  deleteById,
};
