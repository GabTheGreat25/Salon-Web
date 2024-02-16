import * as yup from "yup";

export default yup.object({
    message: yup.string().required("Message required"),
});