import * as yup from "yup";

export default yup.object({
  brand_name: yup.string().required("Brand Name is required"),
});
