import * as yup from "yup";

export default yup.object({
    equipment: yup.string().required("Product required"),
   date_reported: yup.string().required("Date Found is required"),
   loss_qty: yup.string("Enter Equipment Quantity Found").required("Quantity required"),
});
