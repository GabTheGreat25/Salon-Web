import React from "react";
import { useUpdateProductMutation, useGetProductByIdQuery } from "@api";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FadeLoader } from "react-spinners";
import { editProductValidation } from "@/validation";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function () {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading } = useGetProductByIdQuery(id);
  const [updateProduct] = useUpdateProductMutation();
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
    enableReinitialize: true,
    initialValues: {
      product_name: data?.details?.product_name || "",
      brand: data?.details?.brand || "",
      type: data?.details?.type || "",
      measurement: {
        unit: data?.details?.measurement?.unit || "",
        quantity: data?.details?.measurement?.quantity || "",
      },
      isNew: data?.details.isNew || "",
      image: data?.details?.image || [],
    },
    validationSchema: editProductValidation,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("product_name", values?.product_name);
      formData.append("brand", values?.brand);
      formData.append("type", values?.type);
      formData.append("isNew", values?.isNew);
      formData.append("measurement[unit]", values?.measurement?.unit);
      formData.append("measurement[quantity]", values?.measurement?.quantity);
      Array.from(values?.image).forEach((file) => {
        formData.append("image", file);
      });
      updateProduct({ id: data?.details?._id, payload: formData }).then(
        (response) => {
          const toastProps = {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
          };
          if (response?.data?.success === true) {
            const userRoles = auth?.user?.roles;
            if (userRoles.includes("Admin")) {
              navigate("/admin/products");
            }
            toast.success(`${response?.data?.message}`, toastProps);
          } else {
            toast.error(`${response?.error?.data?.error?.message}`, toastProps);
          }
        }
      );
    },
  });
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      {isLoading ? (
        <div className="loader">
          <FadeLoader color="#FDA7DF" loading={true} size={50} />
        </div>
      ) : (
        <>
          <div className="max-w-md w-full p-8 rounded shadow-xl bg-dark-default dark:bg-light-default">
            <h3 className="text-white mb-2 text-center font-semibold text-xl">
              EDIT PRODUCT
            </h3>
            <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
              <section className="grid justify-center items-center text-center">
                <div>
                  <label
                    className="block text-light-default dark:text-dark-default text-sm font-bold mb-2"
                    htmlFor="brand"
                  >
                    Product Brand:
                  </label>
                  <input
                    className={`w-full mb-4 px-3 py-2 border ${
                      formik.touched.brand && formik.errors.brand
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded focus:outline-none focus:shadow-outline dark:bg-dark-default dark:text-light-default`}
                    type="text"
                    id="brand"
                    name="brand"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values?.brand}
                  />
                  {formik.touched?.brand && formik.errors?.brand && (
                    <div className="text-red-600">{formik.errors?.brand}</div>
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
                    className={`w-full mb-4 px-3 py-2 border ${
                      formik.touched?.product_name &&
                      formik.errors?.product_name
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded focus:outline-none focus:shadow-outline dark:bg-dark-default dark:text-light-default`}
                    type="text"
                    id="product_name"
                    name="product_name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values?.product_name}
                  />
                  {formik.touched?.product_name &&
                    formik.errors?.product_name && (
                      <div className="text-red-600">
                        {formik.errors?.product_name}
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
                    className={`w-full mb-4 px-3 py-2 border ${
                      formik.touched?.type && formik.errors?.type
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded focus:outline-none focus:shadow-outline dark:bg-dark-default dark:text-light-default`}
                    type="text"
                    id="type"
                    name="type"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values?.type}
                  />
                  {formik.touched?.type && formik.errors?.type && (
                    <div className="text-red-600">{formik.errors?.type}</div>
                  )}
                </div>
                <div>
                  <label
                    className="block text-light-default dark:text-dark-default text-sm font-bold mb-2"
                    htmlFor="class"
                  >
                    Product Quantity:
                  </label>
                  <input
                    className={`w-full mb-4 px-3 py-2 border ${
                      formik.touched.measurement?.quantity &&
                      formik.errors.measurement?.quantity
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded focus:outline-none focus:shadow-outline dark:bg-dark-default dark:text-light-default`}
                    type="number"
                    id="measurement.quantity"
                    name="measurement.quantity"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.measurement?.quantity}
                    min="1"
                    max="10000"
                  />
                  {formik.touched.measurement?.quantity &&
                    formik.errors.measurement?.quantity && (
                      <div className="text-red-600">
                        {formik.errors.measurement?.quantity}
                      </div>
                    )}
                </div>

                <div>
                  <label
                    className="block text-light-default dark:text-dark-default text-sm font-bold mb-2"
                    htmlFor="class"
                  >
                    Product Unit:
                  </label>
                  <select
                    className={`w-full mb-4 px-3 py-2 border ${
                      formik.touched.measurement?.unit &&
                      formik.errors.measurement?.unit
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded focus:outline-none focus:shadow-outline dark:bg-dark-default dark:text-light-default`}
                    id="measurement.unit"
                    name="measurement.unit"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.measurement?.unit || ""}
                  >
                    <option value="" label="Select an option" />
                    {measurementOptions.map((option) => (
                      <option key={option} value={option} label={option} />
                    ))}
                  </select>
                  {formik.touched.measurement?.unit &&
                    formik.errors.measurement?.unit && (
                      <div className="text-red-600">
                        {formik.errors.measurement?.unit || ""}
                      </div>
                    )}
                </div>

                <div hidden={true} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    name="isNew"
                    checked={formik.values?.isNew}
                    onChange={formik.handleChange}
                    className="form-checkbox text-primary-default dark:text-primary-dark mr-2"
                  />
                  <label className="block text-light-default dark:text-dark-default text-sm font-bold">
                    Is New:
                  </label>
                </div>

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
                  />
                  <span className="grid justify-center items-center grid-flow-col gap-x-2">
                    {data?.details?.image?.map((image) => (
                      <span key={image?.public_id}>
                        <img
                          height={60}
                          width={75}
                          src={image?.url}
                          alt={image?.originalname}
                        />
                      </span>
                    ))}
                  </span>
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