import * as yup from "yup";

export default yup.object({
  company_name: yup
    .string("Enter Company Name")
    .required("Company Name is required"),
  date: yup.string().required("Date is required"),
  price: yup.string("Enter Service Price").required("Price required"),
  quantity: yup.string("Enter Service Quantity").required("Quantity required"),
  product: yup
    .array()
    .of(yup.string().required("Product required"))
    .required("At least one product is required"),
});
