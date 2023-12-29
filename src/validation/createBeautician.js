import * as yup from "yup";

const isPhilippineContactNumber = (value) => {
  const regex = /^(\+63|0|63)?[9]\d{9}$/;
  return regex.test(value);
};

export default yup.object({
  name: yup
    .string("Enter your Name")
    .required("Name is required")
    .min(2, "Your name should be of minimum 2 characters legth")
    .max(30, "Your name cannot exceed 30 characters"),
  age: yup
    .number("Enter your age")
    .required("Age is required")
    .min(18, "Age should be of minimum 18 years"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .required("Password is required")
    .min(8, "Password should be of minimum 8 characters length"),
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
  job_type: yup.string("Enter your job type").required("Job type is required"),
  date: yup.string().required("Date is required"),
  time: yup.string().required("Time is required"),
});
