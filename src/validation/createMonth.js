import * as yup from "yup";

export default yup.object({
    month: yup.string().required("Month required"),
    message: yup.string().required("Message required"),
});