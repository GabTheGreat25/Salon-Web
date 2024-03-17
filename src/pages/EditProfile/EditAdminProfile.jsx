import React, { useState } from "react";
import { AdminSidebar } from "@/components";
import { useSelector } from "react-redux";
import { useUpdateUserMutation } from "@api";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FadeLoader } from "react-spinners";
import { editAdminValidation } from "@/validation";
import { ImagePreview } from "@/components";
import InputMask from "react-input-mask";

export default function () {
  const auth = useSelector((state) => state.auth.user);
  const [editMode, setEditMode] = useState(false);

  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: auth?.name || "",
      age: auth?.age || "",
      contact_number: auth?.contact_number || "",
      email: auth?.email || "",
      image: [],
    },
    validationSchema: editAdminValidation,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("name", values?.name);
      formData.append("email", values?.email);
      formData.append("age", values?.age);
      formData.append("contact_number", values?.contact_number);
      Array.from(values?.image).forEach((file) => {
        formData.append("image", file);
      });

      updateUser({ id: auth?._id, payload: formData }).then((response) => {
        const toastProps = {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        };
        if (response?.data?.success === true) {
          setEditMode(false);
          toast.success(`${response?.data?.message}`, toastProps);
        } else
          toast.error(`${response?.error?.data?.error?.message}`, toastProps);
      });
    },
  });

  const randomIndex =
    auth?.image && auth?.image?.length
      ? Math.floor(Math.random() * auth?.image?.length)
      : null;

  const handlePhoneNumberChange = (event) => {
    let phoneNumber = event.target.value.replace(/[-\s]/g, "");
    phoneNumber = phoneNumber.substring(0, 11);
    formik.setFieldValue("contact_number", phoneNumber);
  };

  return (
    <>
      {isLoading ? (
        <div className="loader">
          <FadeLoader color="#FFB6C1" loading={true} size={50} />
        </div>
      ) : (
        <>
          <div className="flex h-full">
            <AdminSidebar />
            <div className="relative flex flex-col items-center flex-1 w-full h-full p-5 mx-20 my-10 space-x-4 rounded-lg shadow-lg bg-primary-default md:flex-row">
              <div className="flex items-center w-full h-full">
                <div className="flex-grow">
                  <h2 className="pb-2 font-sans text-3xl font-semibold">
                    My Profile
                  </h2>
                  <h5 className="text-base font-medium">
                    Manage and protect your own account
                  </h5>
                  <hr className="my-4 border-t border-dark-default dark:border-light-default" />
                  <div className="grid grid-cols-2">
                    <div className="relative">
                      {editMode ? (
                        <form
                          onSubmit={formik.handleSubmit}
                          encType="multipart/form-data"
                          className="w-3/4"
                        >
                          <label className="block">
                            <span
                              className={`${
                                formik.touched.name &&
                                formik.errors.name &&
                                "text-red-600"
                              } font-light capitalize 2xl:text-3xl xl:text-2xl lg:text-xl md:text-lg`}
                            >
                              Name:
                            </span>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              autoComplete="off"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.name}
                              className={`${
                                formik.touched.name && formik.errors.name
                                  ? "border-red-600"
                                  : "border-dark-default dark:border-light-default"
                              }  block mb-2 ml-6 font-light capitalize 2xl:text-3xl xl:text-2xl lg:text-xl md:text-lg placeholder-white border-0 border-b-2 bg-card-input  dark:border-dark-default focus:ring-0 focus:border-primary-accent focus:dark:focus:border-primary-accent dark:placeholder-dark-default w-full`}
                              placeholder="Enter Your Name"
                            />
                            {formik.touched.name && formik.errors.name && (
                              <div className="text-lg font-semibold text-red-600">
                                {formik.errors.name}
                              </div>
                            )}
                          </label>
                          <label className="block">
                            <span
                              className={`${
                                formik.touched.age &&
                                formik.errors.age &&
                                "text-red-600"
                              } font-light capitalize 2xl:text-3xl xl:text-2xl lg:text-xl md:text-lg`}
                            >
                              Age:
                            </span>
                            <input
                              type="text"
                              id="age"
                              name="age"
                              autoComplete="off"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.age}
                              className={`${
                                formik.touched.age && formik.errors.age
                                  ? "border-red-600"
                                  : "border-dark-default dark:border-light-default"
                              }  block mb-2 ml-6 font-light capitalize 2xl:text-3xl xl:text-2xl lg:text-xl md:text-lg placeholder-white border-0 border-b-2 bg-card-input  dark:border-dark-default focus:ring-0 focus:border-primary-accent focus:dark:focus:border-primary-accent dark:placeholder-dark-default w-full`}
                              placeholder="Enter Your Age"
                            />
                            {formik.touched.age && formik.errors.age && (
                              <div className="text-lg font-semibold text-red-600">
                                {formik.errors.age}
                              </div>
                            )}
                          </label>
                          <label className="block">
                            <span
                              className={`${
                                formik.touched.age &&
                                formik.errors.age &&
                                "text-red-600"
                              } font-light capitalize 2xl:text-3xl xl:text-2xl lg:text-xl md:text-lg`}
                            >
                              Mobile Number:
                            </span>
                            <InputMask
                              mask="9999 - 999 - 9999"
                              maskChar=""
                              type="text"
                              id="contact_number"
                              name="contact_number"
                              autoComplete="off"
                              onChange={handlePhoneNumberChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.contact_number}
                              className={`${
                                formik.touched.contact_number &&
                                formik.errors.contact_number
                                  ? "border-red-600"
                                  : "border-dark-default dark:border-light-default"
                              }  block mb-2 ml-6 font-light 2xl:text-3xl xl:text-2xl lg:text-xl md:text-lg placeholder-white border-0 border-b-2 bg-card-input  dark:border-dark-default focus:ring-0 focus:border-primary-accent focus:dark:focus:border-primary-accent dark:placeholder-dark-default w-full`}
                              placeholder="09XX - XXX - XXXX"
                            />
                            {formik.touched.contact_number &&
                              formik.errors.contact_number && (
                                <div className="text-lg font-semibold text-red-600">
                                  {formik.errors.contact_number}
                                </div>
                              )}
                          </label>
                          <label className="block">
                            <span
                              className={`${
                                formik.touched.age &&
                                formik.errors.age &&
                                "text-red-600"
                              } font-light capitalize 2xl:text-3xl xl:text-2xl lg:text-xl md:text-lg`}
                            >
                              Email:
                            </span>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              autoComplete="off"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.email}
                              className={`${
                                formik.touched.email && formik.errors.email
                                  ? "border-red-600"
                                  : "border-dark-default dark:border-light-default"
                              }  block mb-2 ml-6 font-light 2xl:text-3xl xl:text-2xl lg:text-xl md:text-lg placeholder-white border-0 border-b-2 bg-card-input  dark:border-dark-default focus:ring-0 focus:border-primary-accent focus:dark:focus:border-primary-accent dark:placeholder-dark-default w-full`}
                              placeholder="Enter Your Email"
                            />
                            {formik.touched.email && formik.errors.email && (
                              <div className="text-lg font-semibold text-red-600">
                                {formik.errors.email}
                              </div>
                            )}
                          </label>
                          <label className="block">
                            <span
                              className={`font-light capitalize 2xl:text-3xl xl:text-2xl lg:text-xl md:text-lg`}
                            >
                              Upload Image:
                            </span>
                            <input
                              type="file"
                              accept="image/*"
                              id="image"
                              name="image"
                              autoComplete="off"
                              onChange={(event) => {
                                formik.setFieldValue(
                                  "image",
                                  Array.from(event.currentTarget.files)
                                );
                              }}
                              onBlur={formik.handleBlur}
                              multiple
                              className={`${
                                formik.touched.image && formik.errors.image
                                  ? "border-red-600"
                                  : "border-dark-default dark:border-light-default"
                              } block pt-3 mb-2 ml-6 xl:text-xl md:text-[1rem] w-full`}
                            />
                            <span className="grid items-center justify-center grid-flow-row grid-cols-5 gap-2 mt-4 gap-x-2">
                              {formik.values.image && (
                                <ImagePreview images={formik.values.image} />
                              )}
                            </span>
                          </label>
                          <span className="grid items-center justify-end grid-flow-col-dense pt-3 lg:gap-x-4 md:gap-x-2">
                            <button
                              type="submit"
                              disabled={!formik.isValid}
                              className={`border-dark-default dark:border-light-default rounded-xl xl:px-6 lg:px-4 md:px-2 font-medium capitalize 2xl:text-3xl xl:text-xl lg:text-lg md:text-base btn btn-primary text-dark-default dark:text-light-default ${
                                !formik.isValid &&
                                "opacity-50 cursor-not-allowed"
                              }`}
                            >
                              Submit
                            </button>
                            <button
                              onClick={() => setEditMode(false)}
                              className={`border-dark-default dark:border-light-default rounded-xl xl:px-6 lg:px-4 md:px-2 font-medium capitalize 2xl:text-3xl xl:text-xl lg:text-lg md:text-base btn btn-primary text-dark-default dark:text-light-default`}
                            >
                              Cancel
                            </button>
                          </span>
                        </form>
                      ) : (
                        <div className="xl:p-12 lg:p-6 md:p-2">
                          <h1 className="pb-6 font-bold capitalize 2xl:text-3xl xl:text-2xl lg:text-xl md:text-lg">
                            Name:{" "}
                            <span className="font-light"> {auth?.name}</span>
                          </h1>
                          <h1 className="pb-6 font-bold capitalize 2xl:text-3xl xl:text-2xl lg:text-xl md:text-lg">
                            Age: <span className="font-light">{auth?.age}</span>
                          </h1>
                          <h1 className="pb-6 font-bold capitalize 2xl:text-3xl xl:text-2xl lg:text-xl md:text-lg">
                            Mobile Number:{" "}
                            <span className="font-light">
                              {auth?.contact_number}
                            </span>
                          </h1>
                          <h1 className="pb-6 font-bold 2xl:text-3xl xl:text-2xl lg:text-xl md:text-lg">
                            Email:{" "}
                            <span className="font-light">
                              {auth?.email.length > 25
                                ? `${auth?.email.substring(0, 25)}...`
                                : auth?.email}
                            </span>
                          </h1>
                          <h1 className="pb-6 font-bold capitalize 2xl:text-3xl xl:text-2xl lg:text-xl md:text-lg">
                            Role:{" "}
                            <span className="font-light"> {auth?.roles}</span>
                          </h1>
                        </div>
                      )}
                      <div className="absolute top-0 w-[1.4px] h-full transform bg-dark-default dark:bg-light-default left-full"></div>
                    </div>
                    <div className="grid h-fit">
                      <span className="grid items-end justify-center">
                        <img
                          src={
                            auth?.image && auth?.image?.length
                              ? auth?.image[randomIndex]?.url
                              : null
                          }
                          alt={auth?.image?.originalname}
                          key={auth?.image?.public_id}
                          className="object-cover rounded-full 2xl:w-96 xl:w-72 lg:w-64 md:w-48 2xl:h-96 xl:h-72 lg:h-64 md:h-48"
                        />
                      </span>
                      <span className="grid items-start justify-center h-fit">
                        {!editMode && (
                          <button
                            onClick={() => setEditMode(true)}
                            className="px-4 py-2 mt-4 capitalize 2xl:text-3xl xl:text-2xl md:text-xl border-dark-default btn btn-primary text-dark-default dark:text-light-default"
                          >
                            Edit Profile
                          </button>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
