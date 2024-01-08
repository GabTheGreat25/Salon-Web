import * as yup from "yup";

export default yup.object({
  payment: yup.string().required("Payment field required"),
  status: yup
    .string()
    .required("Transaction Status required")
    .test("is-valid-status", "Invalid Transaction Status", (value) =>
      ["pending", "completed"].includes(value)
    ),
});
