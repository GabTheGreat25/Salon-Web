import * as yup from "yup";

export default yup.object({
  product_name: yup.string().required("Product Name is required"),
  brand: yup.string().required("Brand is required"),
  type: yup.string().required("Type is required"),
  measurement: yup.object({
    quantity: yup
      .number()
      .required("Measurement Quantity is required")
      .min(0, "Quantity must be a non-negative number"),
    unit: yup
      .string()
      .required("Measurement Unit is required")
      .test("is-valid-unit", "Invalid Measurement Unit", (value) =>
        [
          "Liter",
          "Milliliter",
          "Gallon",
          "Ounce",
          "Pound",
          "Kilogram",
          "Other",
        ].includes(value)
      ),
  }),
});
