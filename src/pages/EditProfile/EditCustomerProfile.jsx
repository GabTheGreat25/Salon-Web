import React, { useState, useRef, useEffect } from "react";
import { CustomerSidebar } from "@/components";
import { useUpdateUserMutation, useGetExclusionsQuery } from "@api";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FadeLoader } from "react-spinners";
import { editCustomerValidation } from "@/validation";
import { ImagePreview } from "@/components";
import { useSelector } from "react-redux";
import InputMask from "react-input-mask";

export default function () {
  const isFocused = useRef(true);

  const auth = useSelector((state) => state.auth.user);

  const [editMode, setEditMode] = useState(false);
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const {
    data,
    isLoading: exclusionLoading,
    refetch,
  } = useGetExclusionsQuery();
  const exclusions = data?.details;

  useEffect(() => {
    const handleFocus = () => {
      isFocused.current = true;
      refetch();
    };

    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, [refetch]);

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
      othersMessage: auth?.information?.othersMessage || "",
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
      values.allergy.forEach((allergy) => {
        let allergyId;
        if (allergy === "Others") {
          allergyId = "Others";
        } else if (allergy === "None") {
          allergyId = "None";
          values.othersMessage = "";
        } else {
          allergyId = allergy;
          values.othersMessage = "";
        }
        formData.append("allergy[]", allergyId);
      });
      formData.append("othersMessage", values?.othersMessage);
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

  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelection = (category) => {
    let updatedAllergies = [...formik.values.allergy];

    if (category === "None" || category === "Others") {
      setSelectedCategory(category);
      updatedAllergies = [category];
    } else {
      if (selectedCategory === category) {
        setSelectedCategory(null);
        const index = updatedAllergies.indexOf(category);
        if (index !== -1) {
          updatedAllergies.splice(index, 1);
        }
      } else {
        setSelectedCategory(category);
        const index = updatedAllergies.indexOf(category);
        if (index === -1) {
          updatedAllergies.push(category);
        }
      }
    }

    updatedAllergies = updatedAllergies.filter(
      (allergy) =>
        !["Hands", "Hair", "Feet", "Facial", "Body", "Eyelash"].includes(
          allergy
        )
    );

    formik.setFieldValue("allergy", updatedAllergies);
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

  const handlePhoneNumberChange = (event) => {
    let phoneNumber = event.target.value.replace(/[-\s]/g, "");
    phoneNumber = phoneNumber.substring(0, 11);
    formik.setFieldValue("contact_number", phoneNumber);
  };

  const toastProps = {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 5000,
  };

  const [gender, setGender] = useState(
    auth.information.description &&
      auth.information.description.includes("Male")
      ? "Male "
      : auth.information.description.includes("Female")
      ? "Female "
      : ""
  );
  const [height, setHeight] = useState(
    auth.information.description &&
      auth.information.description.includes("Petite")
      ? "Petite "
      : auth.information.description.includes("Average")
      ? "Average "
      : auth.information.description.includes("Tall")
      ? "Tall "
      : ""
  );
  const [hairLength, setHairLength] = useState(
    auth.information.description &&
      auth.information.description.includes("Long Hair")
      ? "Long Hair "
      : auth.information.description.includes("Standard Hair")
      ? "Standard Hair "
      : auth.information.description.includes("Short Hair")
      ? "Short Hair "
      : ""
  );
  const [skinTone, setSkinTone] = useState(
    auth.information.description &&
      auth.information.description.includes("Light Skin")
      ? "Light Skin"
      : auth.information.description.includes("Tan Skin")
      ? "Tan Skin"
      : auth.information.description.includes("Dark Skin")
      ? "Dark Skin"
      : ""
  );

  const handleGenderChange = (value) => {
    if (gender === value) {
      toggleDescriptionValue(gender, "");
      setGender("");
    } else if (!height && !hairLength && !skinTone) {
      toggleDescriptionValue(gender, value);
      setGender(value);
    } else if (!gender) {
      toast.warning("Please deselect all first.", toastProps);
    } else {
      toast.warning(
        "Please deselect other options before changing Gender.",
        toastProps
      );
    }
  };

  const handleHeightChange = (value) => {
    if (height === value) {
      toggleDescriptionValue(height, "");
      setHeight("");
    } else if (gender && !hairLength && !skinTone) {
      toggleDescriptionValue(height, value);
      setHeight(value);
    } else if (!height) {
      toast.warning("Please select Height after Gender.", toastProps);
    } else {
      toast.warning(
        "Please deselect other options before changing Height.",
        toastProps
      );
    }
  };

  const handleHairLengthChange = (value) => {
    if (hairLength === value) {
      toggleDescriptionValue(hairLength, "");
      setHairLength("");
    } else if (gender && height && !skinTone) {
      toggleDescriptionValue(hairLength, value);
      setHairLength(value);
    } else if (!hairLength) {
      toast.warning(
        "Please select Hair Length after Gender and Height.",
        toastProps
      );
    } else {
      toast.warning(
        "Please deselect other options before changing Hair Length.",
        toastProps
      );
    }
  };

  const handleSkinToneChange = (value) => {
    if (skinTone === value) {
      toggleDescriptionValue(skinTone, "");
      setSkinTone("");
    } else if (gender && height && hairLength) {
      toggleDescriptionValue(skinTone, value);
      setSkinTone(value);
    } else if (!skinTone) {
      toast.warning(
        "Please select Skin Tone after Gender, Height, and Hair Length.",
        toastProps
      );
    } else {
      toast.warning(
        "Please deselect other options before changing Skin Tone.",
        toastProps
      );
    }
  };

  const toggleDescriptionValue = (currentValue, newValue) => {
    let updatedDescription = formik.values.description;
    if (currentValue) {
      updatedDescription = updatedDescription.replace(currentValue, "");
    }
    if (currentValue !== newValue) {
      updatedDescription += newValue;
    }
    formik.setFieldValue("description", updatedDescription);
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
            <CustomerSidebar />
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
                              placeholder="Tell us about yourself..."
                              className="resize-none block my-4 xl:text-xl md:text-[1rem] placeholder-dark-default border-2 bg-card-input w-full border-dark-default dark:border-light-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default rounded-lg"
                              rows="3"
                              readOnly
                            ></textarea>
                            {formik.touched.description &&
                              formik.errors.description && (
                                <div className="text-lg font-semibold text-red-600">
                                  {formik.errors.description}
                                </div>
                              )}
                          </label>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label>
                                <div className="pb-1 font-semibold 2xl:text-lg lg:text-base">
                                  Gender (Kasarian):
                                </div>
                                <span className="grid 2xl:grid-cols-[10%_auto] md:grid-cols-[15%_auto]">
                                  <span className="grid items-center justify-start">
                                    <input
                                      type="checkbox"
                                      value="Male "
                                      checked={gender === "Male "}
                                      onChange={() =>
                                        handleGenderChange("Male ")
                                      }
                                      className={`rounded 2xl:left-0 xl:left-12 lg:left-5 border-secondary-default focus:border-primary-accent focus:ring-secondary-default checked:bg-secondary-default checked:dark:bg-dark-default`}
                                    />
                                  </span>
                                  <h1 className="ml-2 font-medium 2xl:text-lg md:text-sm">
                                    {" "}
                                    Male (Lalaki){" "}
                                  </h1>
                                </span>
                                <span className="grid grid-cols-[10%_auto]">
                                  <span className="grid items-center justify-start">
                                    <input
                                      type="checkbox"
                                      value="Female "
                                      checked={gender === "Female "}
                                      onChange={() =>
                                        handleGenderChange("Female ")
                                      }
                                      className={`rounded 2xl:left-0 xl:left-12 lg:left-5 border-secondary-default focus:border-primary-accent focus:ring-secondary-default checked:bg-secondary-default checked:dark:bg-dark-default`}
                                    />
                                  </span>
                                  <h1 className="ml-2 font-medium 2xl:text-lg md:text-sm">
                                    {" "}
                                    Female (Babae){" "}
                                  </h1>
                                </span>
                              </label>
                            </div>
                            <div>
                              <label>
                                <div className="pb-1 font-semibold 2xl:text-lg lg:text-base">
                                  Height (tangkad):
                                </div>
                                <span className="grid grid-cols-[10%_auto]">
                                  <span className="grid items-center justify-start">
                                    <input
                                      type="checkbox"
                                      value="Petite "
                                      checked={height === "Petite "}
                                      onChange={() =>
                                        handleHeightChange("Petite ")
                                      }
                                      className={`rounded 2xl:left-0 xl:left-12 lg:left-5 border-secondary-default focus:border-primary-accent focus:ring-secondary-default checked:bg-secondary-default checked:dark:bg-dark-default`}
                                    />
                                  </span>
                                  <h1 className="ml-2 font-medium 2xl:text-lg md:text-sm">
                                    {" "}
                                    Petite (Maliit){" "}
                                  </h1>
                                </span>
                                <span className="grid grid-cols-[10%_auto]">
                                  <span className="grid items-center justify-start">
                                    <input
                                      type="checkbox"
                                      value="Average "
                                      checked={height === "Average "}
                                      onChange={() =>
                                        handleHeightChange("Average ")
                                      }
                                      className={`rounded 2xl:left-0 xl:left-12 lg:left-5 border-secondary-default focus:border-primary-accent focus:ring-secondary-default checked:bg-secondary-default checked:dark:bg-dark-default`}
                                    />
                                  </span>
                                  <h1 className="ml-2 font-medium 2xl:text-lg md:text-sm">
                                    {" "}
                                    Average (Katamtaman){" "}
                                  </h1>
                                </span>
                                <span className="grid grid-cols-[10%_auto]">
                                  <span className="grid items-center justify-start">
                                    <input
                                      type="checkbox"
                                      value="Tall "
                                      checked={height === "Tall "}
                                      onChange={() =>
                                        handleHeightChange("Tall ")
                                      }
                                      className={`rounded 2xl:left-0 xl:left-12 lg:left-5 border-secondary-default focus:border-primary-accent focus:ring-secondary-default checked:bg-secondary-default checked:dark:bg-dark-default`}
                                    />
                                  </span>
                                  <h1 className="ml-2 font-medium 2xl:text-lg md:text-sm">
                                    {" "}
                                    Tall (Matangkad){" "}
                                  </h1>
                                </span>
                              </label>
                            </div>
                            <div>
                              <label>
                                <div className="pb-1 font-semibold 2xl:text-lg lg:text-base">
                                  Hair Length (Haba ng Buhok):
                                </div>
                                <span className="grid grid-cols-[10%_auto]">
                                  <span className="grid items-center justify-start">
                                    <input
                                      type="checkbox"
                                      value="Long Hair "
                                      checked={hairLength === "Long Hair "}
                                      onChange={() =>
                                        handleHairLengthChange("Long Hair ")
                                      }
                                      className={`rounded 2xl:left-0 xl:left-12 lg:left-5 border-secondary-default focus:border-primary-accent focus:ring-secondary-default checked:bg-secondary-default checked:dark:bg-dark-default`}
                                    />
                                  </span>
                                  <h1 className="ml-2 font-medium 2xl:text-lg md:text-sm">
                                    {" "}
                                    Long (Mahaba){" "}
                                  </h1>
                                </span>
                                <span className="grid grid-cols-[10%_auto]">
                                  <span className="grid items-center justify-start">
                                    <input
                                      type="checkbox"
                                      value="Standard Hair "
                                      checked={hairLength === "Standard Hair "}
                                      onChange={() =>
                                        handleHairLengthChange("Standard Hair ")
                                      }
                                      className={`rounded 2xl:left-0 xl:left-12 lg:left-5 border-secondary-default focus:border-primary-accent focus:ring-secondary-default checked:bg-secondary-default checked:dark:bg-dark-default`}
                                    />
                                  </span>
                                  <h1 className="ml-2 font-medium 2xl:text-lg md:text-sm">
                                    {" "}
                                    Standard (Katamtaman){" "}
                                  </h1>
                                </span>
                                <span className="grid grid-cols-[10%_auto]">
                                  <span className="grid items-center justify-start">
                                    <input
                                      type="checkbox"
                                      value="Short Hair "
                                      checked={hairLength === "Short Hair "}
                                      onChange={() =>
                                        handleHairLengthChange("Short Hair ")
                                      }
                                      className={`rounded 2xl:left-0 xl:left-12 lg:left-5 border-secondary-default focus:border-primary-accent focus:ring-secondary-default checked:bg-secondary-default checked:dark:bg-dark-default`}
                                    />
                                  </span>
                                  <h1 className="ml-2 font-medium 2xl:text-lg md:text-sm">
                                    {" "}
                                    Short (Maikli){" "}
                                  </h1>
                                </span>
                              </label>
                            </div>
                            <div>
                              <label>
                                <div className="pb-1 font-semibold 2xl:text-lg lg:text-base">
                                  Skin Tone (Tono ng Balat):
                                </div>
                                <span className="grid grid-cols-[10%_auto]">
                                  <span className="grid items-center justify-start">
                                    <input
                                      type="checkbox"
                                      value="Light Skin"
                                      checked={skinTone === "Light Skin"}
                                      onChange={() =>
                                        handleSkinToneChange("Light Skin")
                                      }
                                      className={`rounded 2xl:left-0 xl:left-12 lg:left-5 border-secondary-default focus:border-primary-accent focus:ring-secondary-default checked:bg-secondary-default checked:dark:bg-dark-default`}
                                    />
                                  </span>
                                  <h1 className="ml-2 font-medium 2xl:text-lg md:text-sm">
                                    {" "}
                                    Light (Maputi){" "}
                                  </h1>
                                </span>
                                <span className="grid grid-cols-[10%_auto]">
                                  <span className="grid items-center justify-start">
                                    <input
                                      type="checkbox"
                                      value="Tan Skin"
                                      checked={skinTone === "Tan Skin"}
                                      onChange={() =>
                                        handleSkinToneChange("Tan Skin")
                                      }
                                      className={`rounded 2xl:left-0 xl:left-12 lg:left-5 border-secondary-default focus:border-primary-accent focus:ring-secondary-default checked:bg-secondary-default checked:dark:bg-dark-default`}
                                    />
                                  </span>
                                  <h1 className="ml-2 font-medium 2xl:text-lg md:text-sm">
                                    {" "}
                                    Tan (Kayumanggi){" "}
                                  </h1>
                                </span>
                                <span className="grid grid-cols-[10%_auto]">
                                  <span className="grid items-center justify-start">
                                    <input
                                      type="checkbox"
                                      value="Dark Skin"
                                      checked={skinTone === "Dark Skin"}
                                      onChange={() =>
                                        handleSkinToneChange("Dark Skin")
                                      }
                                      className={`rounded 2xl:left-0 xl:left-12 lg:left-5 border-secondary-default focus:border-primary-accent focus:ring-secondary-default checked:bg-secondary-default checked:dark:bg-dark-default`}
                                    />
                                  </span>
                                  <h1 className="ml-2 font-medium 2xl:text-lg md:text-sm">
                                    {" "}
                                    Dark (Maitim){" "}
                                  </h1>
                                </span>
                              </label>
                            </div>
                          </div>
                          <br />
                          <span
                            className={`font-semibold xl:text-xl lg:text-[.8rem] md:text-[.55rem]`}
                          >
                            <p>Chemical Solution Category:</p>
                          </span>

                          <div className="grid grid-cols-1 gap-x-2">
                            <div className="flex items-center justify-start space-x-2">
                              <input
                                type="checkbox"
                                id="none"
                                name="allergy"
                                value="None"
                                checked={formik.values.allergy?.includes(
                                  "None"
                                )}
                                onChange={(e) => {
                                  const selectedValue = "None";
                                  const updatedSelection = e.target.checked
                                    ? ["None"]
                                    : formik.values.allergy.filter(
                                        (val) => val !== selectedValue
                                      );
                                  formik.setFieldValue(
                                    "allergy",
                                    updatedSelection
                                  );
                                  setSelectedCategory(null);
                                }}
                                onBlur={formik.handleBlur}
                                className="border-light-default block mb-2 xl:text-lg md:text-[1rem] placeholder-white border-0 border-b-2 bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default"
                              />
                              <label
                                htmlFor="none"
                                className="text-xl font-medium cursor-pointer"
                              >
                                None
                              </label>
                            </div>

                            {!formik.values.allergy?.includes("None") &&
                              !formik.values.allergy?.includes("Others") && (
                                <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-x-4">
                                  {[
                                    "Hands",
                                    "Hair",
                                    "Feet",
                                    "Facial",
                                    "Body",
                                    "Eyelash",
                                  ].map((category, index) => (
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
                                        className="border-light-default block mb-2 xl:text-lg md:text-[1rem] placeholder-white border-0 border-b-2 bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default"
                                      />
                                      <label
                                        className="text-xl font-medium cursor-pointer"
                                        htmlFor={category}
                                      >
                                        {category}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              )}

                            <div className="flex items-center justify-start space-x-2">
                              <input
                                type="checkbox"
                                id="others"
                                name="allergy"
                                value="Others"
                                checked={formik.values.allergy?.includes(
                                  "Others"
                                )}
                                onChange={(e) => {
                                  const selectedValue = "Others";
                                  const updatedSelection = e.target.checked
                                    ? ["Others"]
                                    : formik.values.allergy.filter(
                                        (val) => val !== selectedValue
                                      );
                                  formik.setFieldValue(
                                    "allergy",
                                    updatedSelection
                                  );
                                  setSelectedCategory(null);
                                }}
                                onBlur={formik.handleBlur}
                                className="border-light-default block mb-2 xl:text-lg md:text-[1rem] placeholder-white border-0 border-b-2 bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default"
                              />
                              <label
                                htmlFor="others"
                                className="text-xl font-medium cursor-pointer"
                              >
                                Others
                              </label>
                            </div>
                          </div>

                          {formik.values.allergy?.includes("Others") && (
                            <div className="flex items-center justify-start space-x-2">
                              <span>Please specify: </span>
                              <input
                                type="text"
                                id="othersMessage"
                                name="othersMessage"
                                value={formik.values.othersMessage}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="rounded text-dark-default border-primary-default focus:border-primary-accent focus:ring-primary-default"
                              />
                            </div>
                          )}

                          {selectedCategory && (
                            <div className="grid grid-cols-2 gap-2 py-2 ml-6">
                              {filteredAllergy.map((allergy) => {
                                return (
                                  <div
                                    key={allergy._id}
                                    className="flex items-center gap-x-2"
                                  >
                                    <input
                                      type="checkbox"
                                      id={allergy._id}
                                      value={allergy._id}
                                      name="allergy"
                                      checked={formik.values.allergy.includes(
                                        allergy._id
                                      )}
                                      onChange={() =>
                                        handleCheckboxChange(allergy._id)
                                      }
                                      className="border-light-default block mb-2 xl:text-lg md:text-[1rem] placeholder-white border-0 border-b-2 bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default"
                                    />
                                    <label htmlFor={allergy.type}>
                                      {allergy.ingredient_name}
                                    </label>
                                  </div>
                                );
                              })}
                            </div>
                          )}

                          <label className="block pt-2">
                            <span className="xl:text-xl md:text-[1rem] font-semibold">
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
                                    className="border-secondary-default focus:border-primary-accent focus:ring-secondary-default checked:bg-secondary-default checked:dark:bg-dark-default"
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
                            Description:{" "}
                            <span className="font-light">
                              {auth?.information?.description}
                            </span>
                          </h1>
                          <span>
                            <h1 className="pb-2 font-bold capitalize 2xl:text-3xl xl:text-2xl lg:text-xl md:text-lg">
                              Chemical Exclusions:
                            </h1>
                            {filteredExclusions?.length > 0 ? (
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
                            ) : (
                              <ul>
                                {auth.information.allergy.includes(
                                  "Others"
                                ) && (
                                  <li className="pb-2 font-light capitalize 2xl:text-2xl xl:text-xl lg:text-lg md:text-base">
                                    Others <br />
                                    Type : {auth.information.othersMessage}
                                  </li>
                                )}
                                {auth.information.allergy.includes("None") && (
                                  <li className="pb-2 font-light capitalize 2xl:text-2xl xl:text-xl lg:text-lg md:text-base">
                                    None
                                  </li>
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
