import * as yup from "yup";

export default yup.object({
  verificationCode: yup
    .string("Enter your verification code")
    .length(6, "Verification code must be 6 characters")
    .required("Verification code is required"),

  newPassword: yup
    .string("Enter your new password")
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string("Enter your confirm password")
    .oneOf([yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm password is required"),
});
