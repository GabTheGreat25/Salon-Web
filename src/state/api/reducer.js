import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "@/env";
import UserAPI from "./routes/users";
import AuthAPI from "./routes/auth";
import ServicesAPI from "./routes/services";
import AppointmentAPI from "./routes/appointment";
import FeedbackAPI from "./routes/feedback";
import TransactionAPI from "./routes/transaction";
import CommentAPI from "./routes/comment";
import ProductAPI from "./routes/product";
import deliveryAPI from "./routes/delivery";
import { API, TAGS, RESOURCE } from "@/constants";

const prepareHeaders = (headers, { getState }) => {
  if (getState()?.auth?.authenticated)
    headers.set("authorization", `Bearer ${getState()?.auth?.token || ""}`);

  headers.set("accept", `application/json`);
  return headers;
};

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  credentials: RESOURCE.INCLUDE,
  prepareHeaders,
});

export const api = createApi({
  reducerPath: TAGS.API,
  baseQuery,
  tagTypes: API.TAGS,
  keepUnusedDataFor: 0,
  endpoints: (builder) => ({
    login: AuthAPI.login(builder),
    logout: AuthAPI.logout(builder),
    getUsers: UserAPI.get(builder),
    getUserById: UserAPI.getById(builder),
    addUser: UserAPI.add(builder),
    updateUser: UserAPI.updateById(builder),
    deleteUser: UserAPI.deleteById(builder),
    confirmUser: UserAPI.confirmUser(builder),
    updateUserPassword: UserAPI.updatePasswordById(builder),
    getServices: ServicesAPI.get(builder),
    getServiceById: ServicesAPI.getById(builder),
    addService: ServicesAPI.add(builder),
    updateService: ServicesAPI.updateById(builder),
    deleteService: ServicesAPI.deleteById(builder),
    getAppointments: AppointmentAPI.get(builder),
    getAppointmentById: AppointmentAPI.getById(builder),
    addAppointment: AppointmentAPI.add(builder),
    updateAppointment: AppointmentAPI.updateById(builder),
    deleteAppointment: AppointmentAPI.deleteById(builder),
    getFeedbacks: FeedbackAPI.get(builder),
    getFeedbackById: FeedbackAPI.getById(builder),
    addFeedback: FeedbackAPI.add(builder),
    updateFeedback: FeedbackAPI.updateById(builder),
    deleteFeedback: FeedbackAPI.deleteById(builder),
    getTransactions: TransactionAPI.get(builder),
    getTransactionById: TransactionAPI.getById(builder),
    updateTransaction: TransactionAPI.updateById(builder),
    deleteTransaction: TransactionAPI.deleteById(builder),
    getComments: CommentAPI.get(builder),
    getCommentById: CommentAPI.getById(builder),
    addComment: CommentAPI.add(builder),
    updateComment: CommentAPI.updateById(builder),
    deleteComment: CommentAPI.deleteById(builder),
    getProducts: ProductAPI.get(builder),
    getProductById: ProductAPI.getById(builder),
    addProduct: ProductAPI.add(builder),
    updateProduct: ProductAPI.updateById(builder),
    deleteProduct: ProductAPI.deleteById(builder),
    getDeliveries: deliveryAPI.get(builder),
    getDeliveryById: deliveryAPI.getById(builder),
    addDelivery: deliveryAPI.add(builder),
    updateDelivery: deliveryAPI.updateById(builder),
    deleteDelivery: deliveryAPI.deleteById(builder),
    getAppointmentByBeauticianId: AppointmentAPI.getAppointmentByBeauticianId(builder),
    getAppointmentHistoryByBeauticianId: AppointmentAPI.getAppointmentHistoryByBeauticianId(builder)
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useConfirmUserMutation,
  useUpdateUserPasswordMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetServicesQuery,
  useGetServiceByIdQuery,
  useAddServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
  useGetAppointmentsQuery,
  useGetAppointmentByIdQuery,
  useAddAppointmentMutation,
  useUpdateAppointmentMutation,
  useDeleteAppointmentMutation,
  useGetFeedbacksQuery,
  useGetFeedbackByIdQuery,
  useAddFeedbackMutation,
  useUpdateFeedbackMutation,
  useDeleteFeedbackMutation,
  useGetTransactionsQuery,
  useGetTransactionByIdQuery,
  useUpdateTransactionMutation,
  useDeleteTransactionMutation,
  useGetCommentsQuery,
  useGetCommentByIdQuery,
  useAddCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
  useGetProductsQuery,
  useGetProductByIdQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetDeliveriesQuery,
  useGetDeliveryByIdQuery,
  useAddDeliveryMutation,
  useUpdateDeliveryMutation,
  useDeleteDeliveryMutation,
  useGetAppointmentByBeauticianIdQuery,
  useGetAppointmentHistoryByBeauticianIdQuery
} = api;
