import React from "react";
import { useGetUserByIdQuery, useUpdateUserMutation } from "@api";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FadeLoader } from "react-spinners";
import { editUserValidation } from "@/validation";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function () {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading } = useGetUserByIdQuery(id);
  const [updateUser] = useUpdateUserMutation();
  const auth = useSelector((state) => state.auth);

  const roles = ["Admin", "Beautician", "Customer"];

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: data?.details?.name || "",
      email: data?.details?.email || "",
      contact_number: data?.details?.contact_number || "",
      age: data?.details?.age || "",
      roles: data?.details?.roles || "",
      image: data?.details?.image || [],
    },
    validationSchema: editUserValidation,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("name", values?.name);
      formData.append("email", values?.email);
      formData.append("contact_number", values?.contact_number);
      formData.append("age", values?.age);
      formData.append("roles", values?.roles);
      Array.from(values?.image).forEach((file) => {
        formData.append("image", file);
      });
      updateUser({ id: data?.details?._id, payload: formData }).then(
        (response) => {
          const toastProps = {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
          };
          if (response?.data?.success === true) {
            const userRoles = auth?.user?.roles;
            if (userRoles.includes("Admin")) {
              navigate("/admin/users");
            }
            toast.success(`${response?.data?.message}`, toastProps);
          } else
            toast.error(`${response?.error?.data?.error?.message}`, toastProps);
        }
      );
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen">
      {isLoading ? (
        <div className="loader">
          <FadeLoader color="#FDA7DF" loading={true} size={50} />
        </div>
      ) : (
        <>
          <div className="w-full max-w-md p-8 rounded shadow-xl bg-dark-default dark:bg-light-default">
            <h3 className="mb-2 text-xl font-semibold text-center text-white">
              EDIT Service
            </h3>
            <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
              <section className="grid items-center justify-center text-center">
                <div>
                  <label
                    className="block mb-2 text-sm font-bold text-light-default dark:text-dark-default"
                    htmlFor="name"
                  >
                    User Name:
                  </label>
                  <input
                    className={`w-full mb-4 px-3 py-2 border ${
                      formik.touched.name && formik.errors.name
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded focus:outline-none focus:shadow-outline dark:bg-dark-default dark:text-light-default`}
                    type="text"
                    id="name"
                    name="name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values?.name}
                  />
                  {formik.touched?.name && formik.errors?.name && (
                    <div className="text-red-600">{formik.errors?.name}</div>
                  )}
                </div>
                <div>
                  <label
                    className="block mb-2 text-sm font-bold text-light-default dark:text-dark-default"
                    htmlFor="email"
                  >
                    User Email:
                  </label>
                  <input
                    className={`w-full mb-4 px-3 py-2 border ${
                      formik.touched?.email && formik.errors?.email
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded focus:outline-none focus:shadow-outline dark:bg-dark-default dark:text-light-default`}
                    type="text"
                    id="email"
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values?.email}
                  />
                  {formik.touched?.email && formik.errors?.email && (
                    <div className="text-red-600">{formik.errors?.email}</div>
                  )}
                </div>
                <div>
                  <label
                    className="block mb-2 text-sm font-bold text-light-default dark:text-dark-default"
                    htmlFor="contact_number"
                  >
                    Contact Number:
                  </label>
                  <input
                    className={`w-full mb-4 px-3 py-2 border ${
                      formik.touched?.contact_number &&
                      formik.errors?.contact_number
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded focus:outline-none focus:shadow-outline dark:bg-dark-default dark:text-light-default`}
                    type="text"
                    id="contact_number"
                    name="contact_number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values?.contact_number}
                  />
                  {formik.touched?.contact_number &&
                    formik.errors?.contact_number && (
                      <div className="text-red-600">
                        {formik.errors?.contact_number}
                      </div>
                    )}
                </div>
                <div>
                  <label
                    className="block mb-2 text-sm font-bold text-light-default dark:text-dark-default"
                    htmlFor="age"
                  >
                    User Age:
                  </label>
                  <input
                    className={`w-full mb-4 px-3 py-2 border ${
                      formik.touched?.age && formik.errors?.age
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded focus:outline-none focus:shadow-outline dark:bg-dark-default dark:text-light-default`}
                    type="text"
                    id="age"
                    name="age"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values?.age}
                  />
                  {formik.touched?.age && formik.errors?.age && (
                    <div className="text-red-600">{formik.errors?.age}</div>
                  )}
                </div>
                <div>
                  <label
                    className="block mb-2 text-sm font-bold text-light-default dark:text-dark-default"
                    htmlFor="roles"
                  >
                    User Role:
                  </label>
                  <select
                    className={`w-full mb-4 px-3 py-2 border ${
                      formik.touched.roles && formik.errors.roles
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded focus:outline-none focus:shadow-outline dark:bg-dark-default dark:text-light-default`}
                    id="roles"
                    name="roles"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.roles || ""}
                  >
                    <option value="" label={data?.details?.roles} />
                    {roles.map((r) => (
                      <option key={r} value={r} label={r} />
                    ))}
                  </select>
                  {formik.touched.roles && formik.errors.roles && (
                    <div className="text-red-600">
                      {formik.errors.roles || ""}
                    </div>
                  )}
                </div>
                <div>
                  <label
                    className="block mb-2 text-sm font-bold text-light-default dark:text-dark-default"
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
                  <span className="grid items-center justify-center grid-flow-col gap-x-2">
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

                <span className="grid grid-flow-col mt-4 gap-x-4">
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
                    className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded cursor-pointer"
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
