import * as yup from "yup";

export default yup.object({
    ingredient_name: yup.string().required("Ingredients Name required"),
    type: yup.string().required("Type required"),
});