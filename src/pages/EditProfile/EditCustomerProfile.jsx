import React, { useState } from "react";
import { OnlineCustomerSidebar, WalkInCustomerSidebar } from "@/components";
import { useUpdateUserMutation, useGetExclusionsQuery } from "@api";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FadeLoader } from "react-spinners";
import { editCustomerValidation } from "@/validation";
import { ImagePreview } from "@/components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaTimes } from "react-icons/fa";

export default function () {
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth.user);

  const [editMode, setEditMode] = useState(false);
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const { data, isLoading: exclusionLoading } = useGetExclusionsQuery();
  const exclusions = data?.details;

  const filteredExclusions = exclusions?.filter((exclusion) =>
    auth?.information?.allergy?.includes(exclusion._id)
  );

  let radioOptions = [
    { label: "Every 1 minute", value: "1 minute" },
    { label: "Every 1 month", value: "1 month" },
    { label: "Every 2 months", value: "2 months" },
    { label: "Every 4 months", value: "4 months" },
    { label: "Every 6 months", value: "6 months" },
    { label: "Every 1 year", value: "1 year" },
    { label: "Turn Off", value: "stop" },
  ];

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
      messageDate: auth?.information?.messageDate || "",
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
      formData.append("messageDate", values?.messageDate);

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
    auth?.image && auth?.image?.length
      ? Math.floor(Math.random() * auth?.image?.length)
      : null;

  const isOnlineCustomer = auth?.roles?.includes("Online Customer");
  const isWalkInCustomer = auth?.roles?.includes("Walk-in Customer");

  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelection = (category) => {
    setSelectedCategory((prevCategory) =>
      prevCategory === category ? null : category
    );
  };

  const filteredAllergy = selectedCategory
    ? exclusions.filter((allergy) => allergy.type.includes(selectedCategory))
    : exclusions;

  const handleCheckboxChange = (allergyId) => {
    formik.setFieldValue(
      "allergy",
      formik.values.allergy.includes(allergyId)
        ? formik.values.allergy.filter((id) => id !== allergyId)
        : [...formik.values.allergy, allergyId]
    );
  };

  return (
    <>
      {isLoading || exclusionLoading ? (
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
                  <div className="grid grid-cols-2">
                    <span>
                      <h2 className="pb-2 font-sans text-3xl font-semibold">
                        My Profile
                      </h2>
                      <h5 className="text-base font-medium">
                        Manage and protect your own account
                      </h5>
                    </span>
                    <div className="grid items-end justify-end">
                      <h1 className="font-bold capitalize 2xl:text-3xl xl:text-2xl lg:text-xl md:text-lg">
                        Sms Ads:{" "}
                        <span className="font-light">
                          {auth?.information?.messageDate === "stop"
                            ? "off"
                            : `every ${auth?.information?.messageDate}`}
                        </span>
                      </h1>
                    </div>
                  </div>
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
                                formik.touched.description &&
                                formik.errors.description &&
                                "text-red-600"
                              } font-semibold xl:text-xl lg:text-[.8rem] md:text-[.55rem]`}
                            >
                              <p>Describe Yourself To Us:</p>
                            </span>
                            <textarea
                              id="description"
                              name="description"
                              autoComplete="off"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.description}
                              placeholder="Tell us anything"
                              className="resize-none block my-4 xl:text-xl lg:text-[1rem] md:text-sm placeholder-white border-2 bg-card-input w-full border-dark-default dark:border-light-default focus:ring-0 focus:border-secondary-default focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default rounded-lg ml-6"
                              rows="6"
                            ></textarea>
                            {formik.touched.description &&
                              formik.errors.description && (
                                <div className="text-lg font-semibold text-red-600">
                                  {formik.errors.description}
                                </div>
                              )}
                          </label>

                          <span
                            className={`font-semibold xl:text-xl lg:text-[.8rem] md:text-[.55rem]`}
                          >
                            <p>Avoidance Category:</p>
                          </span>

                          <div className="grid grid-cols-3 gap-2 pt-1 ml-6">
                            {["Hands", "Hair", "Feet", "Face", "Body"].map(
                              (category, index) => (
                                <div
                                  key={index}
                                  className="flex items-center gap-x-2"
                                >
                                  <input
                                    type="checkbox"
                                    id={category}
                                    value={category}
                                    onChange={() =>
                                      handleCategorySelection(category)
                                    }
                                    checked={selectedCategory === category}
                                    className="border-light-default block mb-2 xl:text-lg lg:text-[1rem] placeholder-white border-0 border-b-2 bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default"
                                  />
                                  <label htmlFor={category}>{category}</label>
                                </div>
                              )
                            )}
                          </div>

                          {selectedCategory && (
                            <div className="grid grid-cols-2 gap-2 py-2 ml-6">
                              {filteredAllergy.map((allergy) => (
                                <div
                                  key={allergy?._id}
                                  className="flex items-center gap-x-2"
                                >
                                  <input
                                    type="checkbox"
                                    id={allergy?._id}
                                    value={allergy?._id}
                                    name="allergy"
                                    checked={formik.values.allergy.includes(
                                      allergy?._id
                                    )}
                                    onChange={() =>
                                      handleCheckboxChange(allergy?._id)
                                    }
                                    className="border-light-default block mb-2 xl:text-lg lg:text-[1rem] placeholder-white border-0 border-b-2 bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default"
                                  />

                                  <label htmlFor={allergy?.type}>
                                    {allergy.ingredient_name}
                                  </label>
                                </div>
                              ))}
                            </div>
                          )}

                          <label className="block pt-2">
                            <span className="xl:text-xl lg:text-[1rem] md:text-xs font-semibold">
                              Choose When To Receive Sms Ads:
                            </span>
                            <div className="grid grid-cols-2 py-2 ml-6 gap-x-3">
                              {radioOptions.map((option) => (
                                <div
                                  key={option.value}
                                  className="flex items-center justify-start py-1 space-x-2"
                                >
                                  <input
                                    type="radio"
                                    id={option.value}
                                    name="messageDate"
                                    value={option.value}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    checked={
                                      formik.values.messageDate === option.value
                                    }
                                    className="border-secondary-default focus:border-secondary-default focus:ring-secondary-default checked:bg-secondary-default checked:dark:bg-dark-default"
                                  />
                                  <span>
                                    <h1 className="font-light capitalize 2xl:text-lg xl:text-base lg:text-sm md:text-[0.75rem]">
                                      {option.label}
                                    </h1>
                                  </span>
                                </div>
                              ))}
                            </div>
                            {formik.touched.messageDate &&
                              formik.errors.messageDate && (
                                <div className="text-lg font-semibold text-red-600">
                                  {formik.errors.messageDate}
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
                          <h1 className="pb-6 font-bold capitalize 2xl:text-3xl xl:text-2xl lg:text-xl md:text-lg">
                            Name:{" "}
                            <span className="font-light"> {auth?.name}</span>
                          </h1>
                          <h1 className="pb-6 font-bold capitalize 2xl:text-3xl xl:text-2xl lg:text-xl md:text-lg">
                            Age: <span className="font-light">{auth?.age}</span>
                          </h1>
                          <h1 className="pb-6 font-bold capitalize 2xl:text-3xl xl:text-2xl lg:text-xl md:text-lg">
                            Contact Number:{" "}
                            <span className="font-light">
                              {auth?.contact_number}
                            </span>
                          </h1>
                          <h1 className="pb-6 font-bold 2xl:text-3xl xl:text-2xl lg:text-xl md:text-lg">
                            Email:{" "}
                            <span className="font-light">{auth?.email}</span>
                          </h1>
                          <h1 className="pb-6 font-bold capitalize 2xl:text-3xl xl:text-2xl lg:text-xl md:text-lg">
                            Description:{" "}
                            <span className="font-light">
                              {auth?.information?.description}
                            </span>
                          </h1>
                          <span>
                            <h1 className="pb-2 font-bold capitalize 2xl:text-3xl xl:text-2xl lg:text-xl md:text-lg">
                              Chemical Exclusions:
                            </h1>
                            {filteredExclusions.length > 0 && (
                              <ul>
                                {filteredExclusions.map((exclusion, index) => (
                                  <li
                                    key={index}
                                    className="pb-2 font-light capitalize 2xl:text-2xl xl:text-xl lg:text-lg md:text-base"
                                  >
                                    {exclusion?.ingredient_name}
                                  </li>
                                ))}
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
