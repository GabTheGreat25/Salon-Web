import * as yup from "yup";

export default yup.object({
  status: yup.string().required("Status Required"),
  leaveNote: yup.string(),
});
