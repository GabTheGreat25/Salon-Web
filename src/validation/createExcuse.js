import * as yup from "yup";

export default yup.object({
  leaveNote: yup.string().required("Leave Note is required"),
});
