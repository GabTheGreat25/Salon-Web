import * as yup from "yup";

export default yup.object({
  service_name: yup
    .string("Enter Service Name")
    .required("Service Name is required"),
  description: yup
    .string("Enter Service Description")
    .required("Description is required"),
  price: yup.string("Enter Service Price").required("Price required"),
  product: yup
    .array()
    .of(yup.string().required("Product required"))
    .required("At least one product is required"),
  type: yup.string(),
  occassion: yup.string().required("Occassion is required"),
  duration: yup.string().required("Duration is required"),
  warranty: yup.string().required("Warranty is required"),
});
