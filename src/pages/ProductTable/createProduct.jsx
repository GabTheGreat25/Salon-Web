import React, { useEffect } from "react";
import { useAddProductMutation } from "@api";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FadeLoader } from "react-spinners";
import { createProductValidation } from "@/validation";
import { useNavigate } from "react-router-dom";
import { ImagePreview } from "@/components";
import { useSelector } from "react-redux";

export default function () {
  const navigate = useNavigate();
  const [addProduct, { isLoading }] = useAddProductMutation();

  const auth = useSelector((state) => state.auth);

  const measurementOptions = [
    "Liter",
    "Milliliter",
    "Gallon",
    "Ounce",
    "Pound",
    "Kilogram",
    "Other",
  ];

  const formik = useFormik({
    initialValues: {
      brand: "",
      product_name: "",
      type: "",
      measurement: {
        quantity: "",
        unit: "",
      },
      isNew: true,
      image: [],
    },
    validationSchema: createProductValidation,

    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("brand", values?.brand);
      formData.append("product_name", values?.product_name);
      formData.append("type", values?.type);
      formData.append("measurement[quantity]", values?.measurement.quantity);
      formData.append("measurement[unit]", values?.measurement.unit);
      formData.append("isNew", values?.isNew);
      Array.from(values?.image).forEach((file) => {
        formData.append("image", file);
      });
      const response = await addProduct(formData);
      const toastProps = {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      };

      if (response?.data?.success) {
        const userRoles = auth?.user?.roles;
        if (userRoles.includes("Admin")) {
          navigate("/admin/products");
        }
        toast.success(response?.data?.message, toastProps);
      } else {
        toast.error(response?.error?.data?.error?.message, toastProps);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center">
      {isLoading ? (
        <div className="loader">
          <FadeLoader color="#4F6C42" loading={true} size={50} />
        </div>
      ) : (
        <>
          <div className="max-w-md w-full p-8 rounded shadow-xl bg-dark-default dark:bg-light-default">
            <h3 className="text-white mb-2 text-center font-semibold text-xl">CREATE PRODUCT</h3>
            <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
              <section className="grid justify-center items-center">
                <div>
                  <label
                    className="block text-light-default dark:text-dark-default text-sm font-bold mb-2"
                    htmlFor="brand"
                  >
                    Brand:
                  </label>
                  <input
                    type="text"
                    id="brand"
                    name="brand"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.brand}
                    className={`w-full mb-4 px-3 py-2 border ${
                      formik.touched.brand && formik.errors.brand
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded focus:outline-none focus:shadow-outline dark:bg-dark-default dark:text-light-default`}
                  />
                  {formik.touched.brand && formik.errors.brand && (
                    <div className="text-red-600">{formik.errors.brand}</div>
                  )}
                </div>
                <div>
                  <label
                    className="block text-light-default dark:text-dark-default text-sm font-bold mb-2"
                    htmlFor="product_name"
                  >
                    Product Name:
                  </label>
                  <input
                    type="text"
                    id="product_name"
                    name="product_name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.product_name}
                    className={`w-full mb-4 px-3 py-2 border ${
                      formik.touched.product_name && formik.errors.product_name
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded focus:outline-none focus:shadow-outline dark:bg-dark-default dark:text-light-default`}
                  />
                  {formik.touched.product_name &&
                    formik.errors.product_name && (
                      <div className="text-red-600">
                        {formik.errors.product_name}
                      </div>
                    )}
                </div>
                <div>
                  <label
                    className="block text-light-default dark:text-dark-default text-sm font-bold mb-2"
                    htmlFor="type"
                  >
                    Type:
                  </label>
                  <input
                    type="text"
                    id="type"
                    name="type"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.type}
                    min="1"
                    max="10000"
                    className={`w-full mb-4 px-3 py-2 border ${
                      formik.touched.type && formik.errors.type
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded focus:outline-none focus:shadow-outline dark:bg-dark-default dark:text-light-default`}
                  />
                  {formik.touched.ctype && formik.errors.type && (
                    <div className="text-red-600">{formik.errors.type}</div>
                  )}
                </div>

                <label
                  className="block text-light-default dark:text-dark-default text-sm font-bold mb-2"
                  htmlFor="measurement.quantity"
                >
                  Quantity:
                </label>
                <input
                  id="measurement.quantity"
                  name="measurement.quantity"
                  type="number"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.measurement.quantity}
                />
                {formik.touched.measurement?.quantity &&
                  formik.errors.measurement?.quantity && (
                    <div>{formik.errors.measurement?.quantity}</div>
                  )}

                <label
                  className="block text-light-default dark:text-dark-default text-sm font-bold mb-2"
                  htmlFor="measurement.unit"
                >
                  Unit:
                </label>
                <select
                  id="measurement.unit"
                  name="measurement.unit"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.measurement?.unit}
                >
                  <option value="" label="Select a unit" />
                  {measurementOptions.map((option) => (
                    <option key={option} value={option} label={option} />
                  ))}
                </select>
                {formik.touched.measurement?.unit &&
                  formik.errors.measurement?.unit && (
                    <div>{formik.errors.measurement?.unit}</div>
                  )}

                <div>
                  <label
                    className="block text-light-default dark:text-dark-default text-sm font-bold mb-2"
                    htmlFor="image"
                  >
                    Upload Image:
                  </label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    onChange={(event) => {
                      formik.setFieldValue("image", event.currentTarget.files);
                    }}
                    onBlur={formik.handleBlur}
                    multiple
                    className={`w-full px-3 py-2 border rounded focus:outline-none focus:shadow-outline dark:bg-dark-default dark:text-light-default`}
                  />
                  <span className="mt-4 grid justify-center items-center grid-flow-col gap-x-2">
                    {formik.values.image && (
                      <ImagePreview images={Array.from(formik.values.image)} />
                    )}
                  </span>
                </div>
                <div hidden className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    name="isNew"
                    checked={formik.values.isNew}
                    onChange={formik.handleChange}
                    className="form-checkbox text-primary-default dark:text-primary-dark mr-2"
                  />
                  <label className="block text-light-default dark:text-dark-default text-sm font-bold">
                    Is New:
                  </label>
                </div>

                <span className="mt-4 grid grid-flow-col gap-x-4">
                  <button
                    type="submit"
                    disabled={!formik.isValid}
                    className={`w-full bg-green-500 text-white font-bold py-2 px-4 rounded ${
                      formik.isValid
                        ? "hover:bg-green-700"
                        : "cursor-not-allowed opacity-50"
                    }`}
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded cursor-pointer"
                  >
                    Go Back
                  </button>
                </span>
              </section>
            </form>
          </div>
        </>
      )}
    </div>
  );
}