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
  job_type: yup.string("Enter your job Type").required("Job Type is required"),
  date: yup.date("Enter your date").required("Date is required"),
  time: yup.string("Enter your time").required("Time is required"),
});
