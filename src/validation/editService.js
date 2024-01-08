import * as yup from "yup";

export default yup.object({
  service_name: yup
    .string("Enter Service Name")
    .required("Service Name is required"),
  description: yup
    .string("Enter Service Description")
    .required("Description is required"),
  price: yup.string("Enter Service Price").required("Price required"),
  product: yup.string().required("Product ID is required"),
});
