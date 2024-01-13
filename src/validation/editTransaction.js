import * as yup from "yup";

export default yup.object({
  status: yup.string().required("Transaction Status required"),
});
