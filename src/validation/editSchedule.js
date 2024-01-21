import * as yup from "yup";

export default yup.object({
  date: yup.string().required("Date is required"),
  time: yup.string().required("Time is required"),
});
