import * as yup from "yup";

export default yup.object({
  date: yup.string().required("Date is required"),
  price: yup
    .number()
    .required("Price is required")
    .min(0, "Price must be a positive number"),
  time: yup.string().required("Time is required"),
  service: yup.array().of(yup.string()).required("Service is required"),
});
