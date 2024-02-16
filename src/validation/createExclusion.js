import * as yup from "yup";

export default yup.object({
    ingredient_name: yup.string().required("Ingredients Name required"),
    type: yup
    .array()
    .of(yup.string().required("Service Type required"))
    .required("At least one service type is required"),
});