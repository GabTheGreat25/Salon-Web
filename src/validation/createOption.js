import * as yup from "yup";

export default yup.object({
    option_name: yup.string().required("Adds On name required"),
    description: yup.string().required("Description required"),
    extraFee: yup.string().required("extraFee required"),
    service: yup.string(),
});