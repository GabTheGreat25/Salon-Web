import * as yup from "yup";

export default yup.object({
  cancelReason: yup.string().required("Cancel Reason is required"),
});
