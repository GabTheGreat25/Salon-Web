import * as yup from "yup";

export default yup.object({
  beautician: yup.string().required("Employee name required"),
  date: yup.string().required("Enter a Date"),
  status: yup.string().required("Status Required"),
});
