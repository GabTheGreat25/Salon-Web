import { ROUTE, API } from "@/constants";

export const mayaCheckout = (builder) => {
  return builder.mutation({
    query: (payload) => ({
      url: ROUTE.MAYA_ROUTE,
      method: API.POST,
      body: payload,
    }),
  });
};

export default { mayaCheckout };
