import * as yup from "yup";

export default yup.object({
  price: yup
    .number()
    .required("Price is required")
    .min(0, "Price must be a positive number"),
  service: yup.array().of(yup.string()).required("Service is required"),
});
