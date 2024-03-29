import { ROUTE, TAGS, API } from "@/constants";

export const get = (builder) => {
  return builder.query({
    query: () => `${ROUTE.APPOINTMENTS_ROUTE}`,
    method: API.GET,
    providesTags: [TAGS.APPOINTMENTS],
  });
};

export const getById = (builder) => {
  return builder.query({
    query: (id) => `${ROUTE.APPOINTMENT_ID_ROUTE.replace(":id", id)}`,
    method: API.GET,
    providesTags: [TAGS.APPOINTMENTS],
  });
};

export const add = (builder) => {
  return builder.mutation({
    query: (payload) => ({
      url: `${ROUTE.APPOINTMENTS_ROUTE}`,
      method: API.POST,
      body: payload,
    }),
    invalidatesTags: [TAGS.APPOINTMENTS],
  });
};

export const updateById = (builder) => {
  return builder.mutation({
    query: ({ id, payload }) => {
      return {
        url: `${ROUTE.EDIT_APPOINTMENT_ID_ROUTE.replace(":id", id)}`,
        method: API.PATCH,
        body: payload,
      };
    },
    invalidatesTags: [TAGS.APPOINTMENTS],
  });
};

export const confirmAppointment = (builder) => {
  return builder.mutation({
    query: (id) => {
      return {
        url: `${ROUTE.ACTIVATE_APPOINTMENT_ID_ROUTE.replace(":id", id)}`,
        method: API.PATCH,
      };
    },
    invalidatesTags: [TAGS.APPOINTMENTS],
  });
};

export const updateScheduleById = (builder) => {
  return builder.mutation({
    query: ({ id, payload }) => {
      return {
        url: `${ROUTE.SCHEDULE_EDIT_APPOINTMENT_ID_ROUTE.replace(":id", id)}`,
        method: API.PATCH,
        body: payload,
      };
    },
    invalidatesTags: [TAGS.APPOINTMENTS],
  });
};

export const cancelAppointment = (builder) => {
  return builder.mutation({
    query: (id) => {
      return {
        url: `${ROUTE.CANCEL_RESCHEDULE_APPOINTMENT_ID_ROUTE.replace(
          ":id",
          id
        )}`,
        method: API.PATCH,
      };
    },
    invalidatesTags: [TAGS.APPOINTMENTS],
  });
};

export const deleteById = (builder) => {
  return builder.mutation({
    query: (id) => ({
      url: `${ROUTE.APPOINTMENT_ID_ROUTE.replace(":id", id)}`,
      method: API.DELETE,
    }),
    invalidatesTags: [TAGS.APPOINTMENTS],
  });
};

export const getAppointmentByBeauticianId = (builder) => {
  return builder.query({
    query: (id) => `${ROUTE.BEAUTICIAN_APPOINTMENT_ROUTE.replace(":id", id)}`,
    method: API.GET,
    providesTags: [TAGS.APPOINTMENTS],
  });
};

export const getAppointmentHistoryByBeauticianId = (builder) => {
  return builder.query({
    query: (id) =>
      `${ROUTE.BEAUTICIAN_HISTORY_APPOINTMENT_ROUTE.replace(":id", id)}`,
    method: API.GET,
    providesTags: [TAGS.APPOINTMENTS],
  });
};

export const updateBeauticianAppointment = (builder)=>{
  return builder.mutation({
    query: ({ id, payload }) => {
      return {
        url: `${ROUTE.EDIT_APPOINTMENT_BEAUTICIAN_ID_ROUTE.replace(":id", id)}`,
        method: API.PATCH,
        body: payload,
      };
    },
    invalidatesTags: [TAGS.APPOINTMENTS],
  });
};

export const getRescheduleAppointmentById = (builder)=>{
  return builder.query({
    query: (id)=> `${ROUTE.RESCHEDULE_APPOINTMENT_ID_ROUTE.replace(":id", id)}`,
    method: API.GET,
    providesTags: [TAGS.APPOINTMENTS],
  })
}

export default {
  get,
  getById,
  add,
  updateById,
  updateScheduleById,
  deleteById,
  getAppointmentByBeauticianId,
  getAppointmentHistoryByBeauticianId,
  confirmAppointment,
  cancelAppointment,
  updateBeauticianAppointment,
  getRescheduleAppointmentById,
};
