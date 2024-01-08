import * as yup from "yup";

const isPhilippineContactNumber = (value) => {
  const regex = /^(\+63|0|63)?[9]\d{9}$/;
  return regex.test(value);
};

export default yup.object({
  name: yup.string("Enter your Name").required("Name is required"),
  age: yup
    .number("Enter your age")
    .required("Age is required")
    .min(18, "Age should be of minimum 18 years"),
  contact_number: yup
    .string("Enter your contact number")
    .required("Contact number is required")
    .min(11, "Contact number should be exactly 11 digits")
    .max(11, "Contact number should be exactly 11 digits")
    .test(
      "isPhilippineContactNumber",
      "Invalid Philippine contact number",
      isPhilippineContactNumber
    ),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
});