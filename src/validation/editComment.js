import * as yup from "yup";

export default yup.object({
  ratings: yup.string("Enter your Ratings ").required("Ratings  is required"),
  description: yup
    .string("Enter your description")
    .required("description is required"),
  suggestion: yup
    .string("Enter your suggestion")
    .required("suggestion is required"),
});
