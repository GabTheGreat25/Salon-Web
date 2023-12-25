import React, { useState } from "react";
import { OnlineCustomerSidebar, WalkInCustomerSidebar } from "@/components";
import { useSelector } from "react-redux";
import { useUpdateUserMutation } from "@api";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FadeLoader } from "react-spinners";
import { editCustomerValidation } from "@/validation";
import { ImagePreview } from "@/components";
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
      description: auth?.information?.description || "",
      allergy: auth?.information?.allergy || [],
      product_preference: auth?.information?.product_preference || [],
    },
    validationSchema: editCustomerValidation,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("name", values?.name);
      formData.append("email", values?.email);
      formData.append("age", values?.age);
      formData.append("contact_number", values?.contact_number);
      Array.from(values?.image).forEach((file) => {
        formData.append("image", file);
      });
      formData.append("description", values?.description);
      if (Array.isArray(values?.allergy)) {
        values.allergy.forEach((item) => formData.append("allergy[]", item));
      } else formData.append("allergy", values?.allergy);
      if (Array.isArray(values?.product_preference)) {
        values.product_preference.forEach((item) =>
          formData.append("product_preference[]", item)
        );
      } else formData.append("product_preference", values?.product_preference);

      updateUser({ id: auth?._id, payload: formData }).then((response) => {
        const toastProps = {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        };
        if (response?.data?.success === true) {
          setEditMode(false);
          toast.success(`${response?.data?.message}`, toastProps);
        } else {
          toast.error(`${response?.error?.data?.error?.message}`, toastProps);
        }
      });
    },
  });

  const randomIndex =
    auth?.image && auth?.image.length
      ? Math.floor(Math.random() * auth?.image.length)
      : null;

  const isOnlineCustomer = auth?.roles?.includes("Online Customer");
  const isWalkInCustomer = auth?.roles?.includes("Walk-in Customer");

  return (
    <>
      {isLoading ? (
        <div className="loader">
          <FadeLoader color="#FDA7DF" loading={true} size={50} />
        </div>
      ) : (
        <>
          <div className="flex h-full">
            {isOnlineCustomer ? (
              <OnlineCustomerSidebar />
            ) : isWalkInCustomer ? (
              <WalkInCustomerSidebar />
            ) : null}
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
                              }  block mb-2 ml-6 font-light capitalize 2xl:text-3xl xl:text-2xl lg:text-xl md:text-lg placeholder-white border-0 border-b-2 bg-card-input  dark:border-dark-default focus:ring-0 focus:border-secondary-default focus:dark:focus:border-secondary-default dark:placeholder-dark-default w-full`}
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
                              }  block mb-2 ml-6 font-light capitalize 2xl:text-3xl xl:text-2xl lg:text-xl md:text-lg placeholder-white border-0 border-b-2 bg-card-input  dark:border-dark-default focus:ring-0 focus:border-secondary-default focus:dark:focus:border-secondary-default dark:placeholder-dark-default w-full`}
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
                              Contact Number:
                            </span>
                            <input
                              type="text"
                              id="contact_number"
                              name="contact_number"
                              autoComplete="off"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.contact_number}
                              className={`${
                                formik.touched.contact_number &&
                                formik.errors.contact_number
                                  ? "border-red-600"
                                  : "border-dark-default dark:border-light-default"
                              }  block mb-2 ml-6 font-light capitalize 2xl:text-3xl xl:text-2xl lg:text-xl md:text-lg placeholder-white border-0 border-b-2 bg-card-input  dark:border-dark-default focus:ring-0 focus:border-secondary-default focus:dark:focus:border-secondary-default dark:placeholder-dark-default w-full`}
                              placeholder="Enter Your Contact Number"
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
                              }  block mb-2 ml-6 font-light 2xl:text-3xl xl:text-2xl lg:text-xl md:text-lg placeholder-white border-0 border-b-2 bg-card-input  dark:border-dark-default focus:ring-0 focus:border-secondary-default focus:dark:focus:border-secondary-default dark:placeholder-dark-default w-full`}
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
                              className={`${
                                formik.touched.age &&
                                formik.errors.age &&
                                "text-red-600"
                              } font-light capitalize 2xl:text-3xl xl:text-2xl lg:text-xl md:text-lg`}
                            >
                              Description:
                            </span>
                            <input
                              type="text"
                              id="description"
                              name="description"
                              autoComplete="off"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.description}
                              className={`${
                                formik.touched.description &&
                                formik.errors.description
                                  ? "border-red-600"
                                  : "border-dark-default dark:border-light-default"
                              }  block mb-2 ml-6 font-light 2xl:text-3xl xl:text-2xl lg:text-xl md:text-lg placeholder-white border-0 border-b-2 bg-card-input  dark:border-dark-default focus:ring-0 focus:border-secondary-default focus:dark:focus:border-secondary-default dark:placeholder-dark-default w-full`}
                              placeholder="Enter Your Description"
                            />
                            {formik.touched.description &&
                              formik.errors.description && (
                                <div className="text-lg font-semibold text-red-600">
                                  {formik.errors.description}
                                </div>
                              )}
                          </label>
                          <label className="block">
                            <span
                              className={`${
                                formik.touched.allergy &&
                                formik.errors.allergy &&
                                "text-red-600"
                              } font-light capitalize 2xl:text-3xl xl:text-2xl lg:text-xl md:text-lg`}
                            >
                              Allergy:
                            </span>
                            <select
                              id="allergy"
                              name="allergy"
                              onChange={(e) => {
                                formik.handleChange(e);
                                const selectedOptions = Array.from(
                                  e.target.selectedOptions,
                                  (option) => option.value
                                );

                                const updatedSelection =
                                  selectedOptions.includes("Others")
                                    ? ["Others"]
                                    : selectedOptions;

                                formik.setFieldValue(
                                  "allergy",
                                  updatedSelection
                                );
                              }}
                              onBlur={formik.handleBlur}
                              value={formik.values.allergy}
                              className={`${
                                formik.touched.allergy && formik.errors.allergy
                                  ? "border-red-600"
                                  : "border-dark-default dark:border-light-default"
                              } block mb-2 ml-6 xl:text-lg md:text-[1rem] placeholder-white border-0 border-b-2 bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-default focus:dark:focus:border-secondary-default dark:placeholder-dark-default w-full scrollbar-dark dark:scrollbar-light`}
                              multiple
                            >
                              <option
                                value="Dove"
                                className={`${
                                  formik.values.allergy.includes("Dove") &&
                                  "text-dark-default dark:text-light-default font-semibold"
                                }`}
                              >
                                Dove
                              </option>
                              <option
                                value="Palmolive"
                                className={`${
                                  formik.values.allergy.includes("Palmolive") &&
                                  "text-dark-default dark:text-light-default font-semibold"
                                }`}
                              >
                                Palmolive
                              </option>
                              <option
                                value="Head & Shoulders"
                                className={`${
                                  formik.values.allergy.includes(
                                    "Head & Shoulders"
                                  ) &&
                                  "text-dark-default dark:text-light-default font-semibold"
                                }`}
                              >
                                Head & Shoulders
                              </option>
                              <option
                                value="Sunsilk"
                                className={`${
                                  formik.values.allergy.includes("Sunsilk") &&
                                  "text-dark-default dark:text-light-default font-semibold"
                                }`}
                              >
                                Sunsilk
                              </option>
                              <option
                                value="Others"
                                className={`${
                                  formik.values.allergy.includes("Others") &&
                                  "text-dark-default dark:text-light-default font-semibold"
                                }`}
                              >
                                Others
                              </option>
                            </select>
                            <div className="mt-2 ml-6">
                              {formik.touched.allergy &&
                                formik.errors.allergy && (
                                  <div className="text-lg font-semibold text-red-600">
                                    {formik.errors.allergy}
                                  </div>
                                )}
                            </div>
                          </label>
                          <label className="block">
                            <span
                              className={`${
                                formik.touched.product_preference &&
                                formik.errors.product_preference &&
                                "text-red-600"
                              } font-light capitalize 2xl:text-3xl xl:text-2xl lg:text-xl md:text-lg`}
                            >
                              Product Preference:
                            </span>
                            <select
                              id="product_preference"
                              name="product_preference"
                              onChange={(e) => {
                                formik.handleChange(e);
                                const selectedOptions = Array.from(
                                  e.target.selectedOptions,
                                  (option) => option.value
                                );

                                const updatedSelection =
                                  selectedOptions.includes("Others")
                                    ? ["Others"]
                                    : selectedOptions;

                                formik.setFieldValue(
                                  "product_preference",
                                  updatedSelection
                                );
                              }}
                              onBlur={formik.handleBlur}
                              value={formik.values.product_preference}
                              className={`${
                                formik.touched.product_preference &&
                                formik.errors.product_preference
                                  ? "border-red-600"
                                  : "border-dark-default dark:border-light-default"
                              } block mb-2 ml-6 xl:text-lg md:text-[1rem] placeholder-white border-0 border-b-2 bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-default focus:dark:focus:border-secondary-default dark:placeholder-dark-default w-full scrollbar-dark dark:scrollbar-light`}
                              multiple
                            >
                              <option
                                value="Dove"
                                className={`${
                                  formik.values.product_preference.includes(
                                    "Dove"
                                  ) &&
                                  "text-dark-default dark:text-light-default font-semibold"
                                }`}
                              >
                                Dove
                              </option>
                              <option
                                value="Palmolive"
                                className={`${
                                  formik.values.product_preference.includes(
                                    "Palmolive"
                                  ) &&
                                  "text-dark-default dark:text-light-default font-semibold"
                                }`}
                              >
                                Palmolive
                              </option>
                              <option
                                value="Head & Shoulders"
                                className={`${
                                  formik.values.product_preference.includes(
                                    "Head & Shoulders"
                                  ) &&
                                  "text-dark-default dark:text-light-default font-semibold"
                                }`}
                              >
                                Head & Shoulders
                              </option>
                              <option
                                value="Sunsilk"
                                className={`${
                                  formik.values.product_preference.includes(
                                    "Sunsilk"
                                  ) &&
                                  "text-dark-default dark:text-light-default font-semibold"
                                }`}
                              >
                                Sunsilk
                              </option>
                              <option
                                value="Others"
                                className={`${
                                  formik.values.product_preference.includes(
                                    "Others"
                                  ) &&
                                  "text-dark-default dark:text-light-default font-semibold"
                                }`}
                              >
                                Others
                              </option>
                            </select>
                            <div className="mt-2 ml-6">
                              {formik.touched.product_preference &&
                                formik.errors.product_preference && (
                                  <div className="text-lg font-semibold text-red-600">
                                    {formik.errors.product_preference}
                                  </div>
                                )}
                            </div>
                          </label>

                          <label className="block">
                            <span
                              className={`font-light capitalize 2xl:text-3xl xl:text-2xl lg:text-xl md:text-lg`}
                            >
                              Upload Image:
                            </span>
                            <input
                              type="file"
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
                              } block pt-3 mb-2 ml-6 xl:text-xl lg:text-[1rem] md:text-xs w-full`}
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
                        <div className="p-12">
                          <h1 className="pb-6 font-light capitalize 2xl:text-3xl xl:text-2xl lg:text-xl md:text-lg">
                            Name: {auth?.name}
                          </h1>
                          <h1 className="pb-6 font-light capitalize 2xl:text-3xl xl:text-2xl lg:text-xl md:text-lg">
                            Age: {auth?.age}
                          </h1>
                          <h1 className="pb-6 font-light capitalize 2xl:text-3xl xl:text-2xl lg:text-xl md:text-lg">
                            Contact Number: {auth?.contact_number}
                          </h1>
                          <h1 className="pb-6 font-light 2xl:text-3xl xl:text-2xl lg:text-xl md:text-lg">
                            Email: {auth?.email}
                          </h1>
                          <h1 className="pb-6 font-light capitalize 2xl:text-3xl xl:text-2xl lg:text-xl md:text-lg">
                            Description: {auth?.information?.description}
                          </h1>
                          <span>
                            <h1 className="pb-6 font-light capitalize 2xl:text-3xl xl:text-2xl lg:text-xl md:text-lg">
                              Allergies:
                            </h1>
                            {auth?.information?.allergy && (
                              <ul>
                                {auth.information.allergy.map(
                                  (allergy, index) => (
                                    <li
                                      key={index}
                                      className="pb-6 font-light capitalize 2xl:text-3xl xl:text-2xl lg:text-xl md:text-lg"
                                    >
                                      {allergy}
                                    </li>
                                  )
                                )}
                              </ul>
                            )}
                          </span>
                          <span>
                            <h1 className="pb-6 font-light capitalize 2xl:text-3xl xl:text-2xl lg:text-xl md:text-lg">
                              Product Preferences:
                            </h1>
                            {auth?.information?.product_preference && (
                              <ul>
                                {auth.information.product_preference.map(
                                  (product_preference, index) => (
                                    <li
                                      key={index}
                                      className="pb-6 font-light capitalize 2xl:text-3xl xl:text-2xl lg:text-xl md:text-lg"
                                    >
                                      {product_preference}
                                    </li>
                                  )
                                )}
                              </ul>
                            )}
                          </span>
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
                            className="px-4 py-2 mt-4 text-3xl rounded bg-primary-default hover:bg-primary-accent hover:shadow-xl"
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
