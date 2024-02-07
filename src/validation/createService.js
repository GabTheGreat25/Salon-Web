import * as yup from "yup";

export default yup.object({
  product: yup
    .array()
    .of(yup.string().required("Product required"))
    .required("At least one product is required"),
  service_name: yup
    .string()
    .required("Service Name is required")
    .max(60, "Service Name must not exceed 60 characters"),
  description: yup.string().required("Description is required"),
  price: yup
    .number()
    .required("Price is required")
    .min(0, "Price must be a positive number"),
  type: yup
    .array()
    .of(yup.string().required("Service Type required"))
    .required("At least one service type is required"),
  occassion: yup.string(),
  duration: yup.string().required("Duration is required"),
});
