import * as yup from "yup";

export default yup.object({
  time: yup
    .string()
    .required("Please enter a time")
    .matches(
      /^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/i,
      'Invalid time format. Please use "HH:MM AM/PM".'
    ),
});
