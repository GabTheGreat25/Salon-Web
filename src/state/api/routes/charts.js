import { ROUTE, TAGS, API } from "@constants";

export const getServiceType = (builder) => {
  return builder.query({
    query: () => `${ROUTE.CHART_SERVICE_TYPE_ROUTE}`,
    method: API.GET,
    providesTags: [TAGS.CHARTS],
  });
};

export const getCustomerAppointmentType = (builder) => {
  return builder.query({
    query: () => `${ROUTE.CHART_CUSTOMER_ROUTE}`,
    method: API.GET,
    providesTags: [TAGS.CHARTS],
  });
};

export const getLogbookReport = (builder) => {
  return builder.query({
    query: () => `${ROUTE.LOGBOOK_REPORT_ROUTE}`,
    method: API.GET,
    providesTags: [TAGS.CHARTS],
  });
};

export const getEquipmentReport = (builder) => {
  return builder.query({
    query: () => `${ROUTE.EQUIPMENT_REPORT_ROUTE}`,
    method: API.GET,
    providesTags: [TAGS.CHARTS],
  });
};

export const getAppointmentReport = (builder) => {
  return builder.query({
    query: () => `${ROUTE.APPOINTMENT_REPORT_ROUTE}`,
    method: API.GET,
    providesTags: [TAGS.CHARTS],
  });
};

export const getAppointmentSale = (builder) => {
  return builder.query({
    query: () => `${ROUTE.APPOINTMENT_SALE_ROUTE}`,
    method: API.GET,
    providesTags: [TAGS.CHARTS],
  });
};

export const getDeliveryReport = (builder) => {
  return builder.query({
    query: () => `${ROUTE.DELIVERY_TYPE_ROUTE}`,
    method: API.GET,
    providesTags: [TAGS.CHARTS],
  });
};

export const getProductType = (builder) => {
  return builder.query({
    query: () => `${ROUTE.PRODUCT_TYPE_ROUTE}`,
    method: API.GET,
    providesTags: [TAGS.CHARTS],
  });
};

export const getScheduleType = (builder) => {
  return builder.query({
    query: () => `${ROUTE.SCHEDULE_TYPE_ROUTE}`,
    method: API.GET,
    providesTags: [TAGS.CHARTS],
  });
};

export const getCommentRating = (builder) => {
  return builder.query({
    query: () => `${ROUTE.COMMENT_RATING_ROUTE}`,
    method: API.GET,
    providesTags: [TAGS.CHARTS],
  });
};

export const getTransactionPayment = (builder) => {
  return builder.query({
    query: () => `${ROUTE.TRANSACTION_METHOD_ROUTE}`,
    method: API.GET,
    providesTags: [TAGS.CHARTS],
  });
};

export const getFeedbackReport = (builder) => {
  return builder.query({
    query: () => `${ROUTE.FEEDBACK_COUNT_ROUTE}`,
    method: API.GET,
    providesTags: [TAGS.CHARTS],
  });
};

export const getBrandProduct = (builder) => {
  return builder.query({
    query: () => `${ROUTE.BRAND_PRODUCT_ROUTE}`,
    method: API.GET,
    providesTags: [TAGS.CHARTS],
  });
};

export const getAnonymousComment = (builder) => {
  return builder.query({
    query: () => `${ROUTE.ANONYMOUS_COMMENT_ROUTE}`,
    method: API.GET,
    providesTags: [TAGS.CHARTS],
  });
};

export const getAnonymousFeedback = (builder) => {
  return builder.query({
    query: () => `${ROUTE.ANONYMOUS_FEEDBACK_ROUTE}`,
    method: API.GET,
    providesTags: [TAGS.CHARTS],
  });
};

export const getAllAppointmentReports = (builder) => {
  return builder.query({
    query: () => `${ROUTE.ALL_APPOINTMENT_REPORT_ROUTE}`,
    method: API.GET,
    providesTags: [TAGS.CHARTS],
  });
};

export default {
  getServiceType,
  getCustomerAppointmentType,
  getLogbookReport,
  getEquipmentReport,
  getAppointmentReport,
  getAppointmentSale,
  getDeliveryReport,
  getProductType,
  getScheduleType,
  getCommentRating,
  getTransactionPayment,
  getFeedbackReport,
  getBrandProduct,
  getAnonymousComment,
  getAnonymousFeedback,
  getAllAppointmentReports,
};
