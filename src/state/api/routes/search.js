import { ROUTE, API, TAGS } from "@constants";

export const getByName = (builder) => {
  return builder.query({
    query: (service_name) =>
      `${ROUTE.SEARCH_PRODUCT_NAME_ROUTE.replace(
        ":service_name",
        service_name
      )}`,
    method: API.GET,
    providesTags: [TAGS.SEARCH],
  });
};

export default {
  getByName,
};
