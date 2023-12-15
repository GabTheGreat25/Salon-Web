import * as yup from "yup";

export default yup.object({
  name: yup.string("Enter your Name").required("Name is required"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(6, "Password should be of minimum 6 characters length")
    .required("Password is required"),
  description: yup
    .string("Enter your description")
    .required("Description is required"),
  allergy: yup.string("Enter your allergy").required("Allergy is required"),
  product_preference: yup
    .string("Enter your product preference")
    .required("Product preference is required"),
});
