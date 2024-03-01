import * as yup from "yup";

export default yup.object({
  beautician: yup
    .array()
    .of(yup.string().required("Beautician required"))
    .required("At least one beautician is required"),
  date: yup.string().required("Date is  Required"),
  time: yup
    .array()
    .of(yup.string().required("Time required"))
    .required("At least one time is required"),
  payment: yup.string().required("Payment is  Required"),
});
