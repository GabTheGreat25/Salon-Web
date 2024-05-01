import * as yup from "yup";

export default yup.object({
  equipment_name: yup
    .string()
    .required("Equipment Name is required")
    .max(60, "Equipment Name must not exceed 60 characters"),
  equipment_price: yup
    .number()
    .required("Equipment Price is required")
    .min(0, "Equipment Price must be a positive number"),
  quantity: yup.string("Enter Equipment Quantity").required("Quantity required"),
});
