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
  occassion: yup.string().required("Occassion is required"),
  duration: yup
    .string()
    .required("Duration is required")
    .test(
      "is-valid-duration",
      "Invalid duration format. Please use 'HH:MM' format.",
      (value) => {
        const durationRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9]$/;
        return durationRegex.test(value);
      }
    ),
});
