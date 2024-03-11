import * as yup from "yup";

const isPhilippineContactNumber = (value) => {
  const regex = /^(09)\d{9}$/;
  return regex.test(value);
};

export default yup.object({
  name: yup.string("Enter your Name").required("Name is required"),
  age: yup
    .number("Enter your age")
    .required("Age is required")
    .min(13, "Age should be of minimum 13 years"),
  contact_number: yup
    .string("Enter your contact number")
    .required("Contact number is required")
    .min(11, "Contact number should be exactly 11 digits")
    .max(11, "Contact number should be exactly 11 digits")
    .test(
      "isPhilippineContactNumber",
      "Number should start with 09 and should be a Philippine contact number.",
      isPhilippineContactNumber
    ),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(6, "Password should be of minimum 6 characters length")
    .required("Password is required"),
  confirmPassword: yup
    .string("Enter your confirm password")
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
  description: yup.string().required("Description is required"),
});
