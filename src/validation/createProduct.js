import * as yup from "yup";

export default yup.object({
  product_name: yup.string().required("Product Name is required"),
  brand: yup.string(),
  // measurement: yup.object({
  //   quantity: yup
  //     .number()
  //     .required("Measurement Quantity is required")
  //     .min(0, "Quantity must be a positive number"),
  //   unit: yup
  //     .string()
  //     .required("Measurement Unit is required")
  //     .oneOf(
  //       [
  //         "Liter",
  //         "Milliliter",
  //         "Gallon",
  //         "Ounce",
  //         "Pound",
  //         "Kilogram",
  //         "Other",
  //       ],
  //       "Invalid Measurement Unit"
  //     ),
  // }),
  isNew: yup.boolean().required("Please specify if the product is new or not"),
  ingredients: yup.string().required("Ingredients are required"),
  product_volume: yup
  .number()
  .required("Product volume is required")
  .min(0, "Price must be a positive number"),
  product_consume: yup
  .number()
  .required("Product consumed is required")
  .min(0, "Product consume must be a positive number"),
});
