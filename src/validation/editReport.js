import * as yup from "yup";

export default yup.object({
   date_found: yup.string().required("Date Found is required"),
   input_qty: yup.number().typeError("Quantity must be a number").required("Equipment Quantity Found is required"),
});
