import { ROUTE, API, TAGS } from "@constants";

export const get = (builder) => {
  return builder.query({
    query: () => `${ROUTE.INVENTORY_ROUTE}`,
    method: API.GET,
    providesTags: [TAGS.INVENTORY],
  });
};

export default {
  get,
};

