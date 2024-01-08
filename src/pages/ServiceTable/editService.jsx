import React from "react";
import {
  useGetServiceByIdQuery,
  useGetProductsQuery,
  useUpdateServiceMutation,
} from "@api";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FadeLoader } from "react-spinners";
import { editServiceValidation } from "@/validation";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function () {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading } = useGetServiceByIdQuery(id);
  const [updateService] = useUpdateServiceMutation();
  const auth = useSelector((state) => state.auth);

  const { data: productData } = useGetProductsQuery();
  const product = productData?.details;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      service_name: data?.details?.service_name || "",
      description: data?.details?.description || "",
      price: data?.details?.price || "",
      product: data?.details?.product || "",
      image: data?.details?.image || [],
    },
    validationSchema: editServiceValidation,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("service_name", values?.service_name);
      formData.append("description", values?.description);
      formData.append("price", values?.price);
      formData.append("product", values?.product);
      Array.from(values?.image).forEach((file) => {
        formData.append("image", file);
      });
      updateService({ id: data?.details?._id, payload: formData }).then(
        (response) => {
          const toastProps = {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
          };
          if (response?.data?.success === true) {
            const userRoles = auth?.user?.roles;
            if (userRoles.includes("Admin")) {
              navigate("/admin/services");
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
              EDIT Service
            </h3>
            <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
              <section className="grid justify-center items-center text-center">
                <div>
                  <label
                    className="block text-light-default dark:text-dark-default text-sm font-bold mb-2"
                    htmlFor="service_name"
                  >
                    Service Name:
                  </label>
                  <input
                    className={`w-full mb-4 px-3 py-2 border ${
                      formik.touched.service_name && formik.errors.service_name
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded focus:outline-none focus:shadow-outline dark:bg-dark-default dark:text-light-default`}
                    type="text"
                    id="service_name"
                    name="service_name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values?.service_name}
                  />
                  {formik.touched?.service_name &&
                    formik.errors?.service_name && (
                      <div className="text-red-600">
                        {formik.errors?.service_name}
                      </div>
                    )}
                </div>
                <div>
                  <label
                    className="block text-light-default dark:text-dark-default text-sm font-bold mb-2"
                    htmlFor="product_name"
                  >
                    Service Description:
                  </label>
                  <input
                    className={`w-full mb-4 px-3 py-2 border ${
                      formik.touched?.description && formik.errors?.description
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded focus:outline-none focus:shadow-outline dark:bg-dark-default dark:text-light-default`}
                    type="text"
                    id="description"
                    name="description"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values?.description}
                  />
                  {formik.touched?.description &&
                    formik.errors?.description && (
                      <div className="text-red-600">
                        {formik.errors?.description}
                      </div>
                    )}
                </div>
                <div>
                  <label
                    className="block text-light-default dark:text-dark-default text-sm font-bold mb-2"
                    htmlFor="price"
                  >
                    Service Price:
                  </label>
                  <input
                    className={`w-full mb-4 px-3 py-2 border ${
                      formik.touched?.price && formik.errors?.price
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded focus:outline-none focus:shadow-outline dark:bg-dark-default dark:text-light-default`}
                    type="text"
                    id="price"
                    name="price"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values?.price}
                  />
                  {formik.touched?.price && formik.errors?.price && (
                    <div className="text-red-600">{formik.errors?.price}</div>
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
                    className={`w-full mb-4 px-3 py-2 border ${
                      formik.touched.product && formik.errors.product
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded focus:outline-none focus:shadow-outline dark:bg-dark-default dark:text-light-default`}
                    id="product"
                    name="product"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.product || ""}
                  >
                    <option value="" label="Select a Product" />
                    {product.map((p) => (
                      <option
                        key={p._id}
                        value={p._id}
                        label={p.product_name}
                      />
                    ))}
                  </select>
                  {formik.touched.product && formik.errors.product && (
                    <div className="text-red-600">
                      {formik.errors.product || ""}
                    </div>
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
