import React from "react";
import { useAddServiceMutation, useGetProductsQuery } from "@api";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FadeLoader } from "react-spinners";
import { createServiceValidation } from "@/validation";
import { useNavigate } from "react-router-dom";
import { ImagePreview } from "@/components";
import { useSelector } from "react-redux";

export default function () {
  const navigate = useNavigate();
  const [addService, { isLoading }] = useAddServiceMutation();
  const { data } = useGetProductsQuery();

  const auth = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      service_name: "",
      description: "",
      price: "",
      product: "",
      image: [],
    },
    validationSchema: createServiceValidation,

    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("service_name", values?.service_name);
      formData.append("description", values?.description);
      formData.append("price", values?.price);
      formData.append("product", values?.product);
      Array.from(values?.image).forEach((file) => {
        formData.append("image", file);
      });
      console.log(formData);
      const response = await addService(formData);
      const toastProps = {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      };

      if (response?.data?.success) {
        const userRoles = auth?.user?.roles;
        if (userRoles.includes("Admin")) {
          navigate("/admin/services");
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
            <h3 className="text-white mb-2 text-center font-semibold text-xl">
              CREATE SERVICE
            </h3>
            <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
              <section className="grid justify-center items-center">
                <div>
                  <label
                    className="block text-light-default dark:text-dark-default text-sm font-bold mb-2"
                    htmlFor="service_name"
                  >
                    Service Name:
                  </label>
                  <input
                    type="text"
                    id="service_name"
                    name="service_name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.brand}
                    className={`w-full mb-4 px-3 py-2 border ${
                      formik.touched.service_name && formik.errors.service_name
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded focus:outline-none focus:shadow-outline dark:bg-dark-default dark:text-light-default`}
                  />
                  {formik.touched.service_name &&
                    formik.errors.service_name && (
                      <div className="text-red-600">
                        {formik.errors.service_name}
                      </div>
                    )}
                </div>
                <div>
                  <label
                    className="block text-light-default dark:text-dark-default text-sm font-bold mb-2"
                    htmlFor="description"
                  >
                    Description:
                  </label>
                  <input
                    type="text"
                    id="description"
                    name="description"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.description}
                    className={`w-full mb-4 px-3 py-2 border ${
                      formik.touched.description && formik.errors.description
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded focus:outline-none focus:shadow-outline dark:bg-dark-default dark:text-light-default`}
                  />
                  {formik.touched.description && formik.errors.description && (
                    <div className="text-red-600">
                      {formik.errors.description}
                    </div>
                  )}
                </div>
                <div>
                  <label
                    className="block text-light-default dark:text-dark-default text-sm font-bold mb-2"
                    htmlFor="price"
                  >
                    Price:
                  </label>
                  <input
                    type="text"
                    id="price"
                    name="price"
                    pattern="[0-9]*"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.price}
                    min="1"
                    max="10000"
                    className={`w-full mb-4 px-3 py-2 border ${
                      formik.touched.price && formik.errors.price
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded focus:outline-none focus:shadow-outline dark:bg-dark-default dark:text-light-default`}
                  />
                  {formik.touched.price && formik.errors.price && (
                    <div className="text-red-600">{formik.errors.price}</div>
                  )}
                </div>

                <div>
                  <label
                    className="block text-light-default dark:text-dark-default text-sm font-bold mb-2"
                    htmlFor="product"
                  >
                    Product:
                  </label>
                  <select
                    id="product"
                    name="product"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.product}
                  >
                    <option value="" label="Select a Product" />
                    {data?.details.map((p) => (
                      <option
                        key={p._id}
                        value={p._id}
                        label={p.product_name}
                      />
                    ))}
                  </select>
                  {formik.touched?.product && formik.errors?.product && (
                    <div>{formik.errors?.product}</div>
                  )}
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
                    className={`w-full px-3 py-2 border rounded focus:outline-none focus:shadow-outline dark:bg-dark-default dark:text-light-default`}
                  />
                  <span className="mt-4 grid justify-center items-center grid-flow-col gap-x-2">
                    {formik.values.image && (
                      <ImagePreview images={Array.from(formik.values.image)} />
                    )}
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
