import * as yup from "yup";

export default yup.object({
  rebookReason: yup.string().required("Rebook Reason is required"),
  messageReason: yup.string().required("Message Reason is required"),
});
