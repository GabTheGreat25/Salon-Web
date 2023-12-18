import React, { useState } from "react";
import { Card, CardImage } from "@components";
import { useAddUserMutation } from "@api";
import { createCustomerValidation } from "@validation";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FadeLoader } from "react-spinners";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { ImagePreview } from "@/components";
import { useFormik } from "formik";

export default function () {
  const navigate = useNavigate();

  const [addUser, isLoading] = useAddUserMutation();

  const [termsAgreed, setTermsAgreed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      age: "",
      contact_number: "",
      email: "",
      password: "",
      roles: "Walk-in Customer",
      image: [],
      description: "",
      allergy: [],
      product_preference: [],
    },
    validationSchema: createCustomerValidation,
    onSubmit: async (values) => {
      const formData = new FormData();

      formData.append("name", values?.name);
      formData.append("age", values?.age);
      formData.append("contact_number", values?.contact_number);
      formData.append("email", values.email);
      formData.append("password", values?.password);
      formData.append("roles", values?.roles);
      Array.from(values?.image).forEach((file) => {
        formData.append("image", file);
      });
      formData.append("description", values?.description);
      if (Array.isArray(values?.allergy)) {
        formData.append("allergy", values?.allergy.join(", "));
      } else formData.append("allergy", values?.allergy);
      if (Array.isArray(values?.product_preference)) {
        formData.append(
          "product_preference",
          values?.product_preference.join(", ")
        );
      } else formData.append("product_preference", values?.product_preference);

      addUser(formData).then((response) => {
        const toastProps = {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
        };
        if (response?.data?.success === true) {
          navigate("/login");
          toast.success(`${response?.data?.message}`, toastProps);
        } else
          toast.error(`${response?.error?.data?.error?.message}`, toastProps);
      });
    },
  });

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleTermsAgreementChange = () => {
    setTermsAgreed(!termsAgreed);
  };

  const handleLogin = () => navigate(`/login`);

  const handleTermsAndConditions = () => navigate(`/termsAndConditions`);

  return (
    <>
      {!isLoading ? (
        <div className="loader">
          <FadeLoader color="#FDA7DF" loading={true} size={50} />
        </div>
      ) : (
        <>
          <Card>
            <div className="grid w-full h-full text-light-default dark:text-dark-default">
              <span className="grid items-end md:gap-y-10 justify-center 2xl:grid-rows-[90%_10%] xl:grid-rows-[80%_20%] md:grid-rows-[75%_25%]">
                <h1 className="text-3xl font-semibold text-center">Sign Up</h1>
                <p className="text-xl text-center lg:px-12 text-light-default dark:text-dark-default">
                  Get us some of your information to get a free access to our
                  Lhanlee Beauty Lounge website.
                </p>
              </span>
              <div className="grid grid-cols-[50%_50%] items-center justify-start pt-20 pb-6 gap-x-6 2xl:pr-0 md:pr-10">
                <CardImage />
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!termsAgreed) {
                      toast.error("Please agree to the terms and conditions.");
                      return;
                    }
                    formik.handleSubmit(e);
                  }}
                  encType="multipart/form-data"
                  className="grid justify-center h-full grid-flow-row-dense pr-6 gap-y-4"
                >
                  <label className="block">
                    <span
                      className={`${
                        formik.touched.name &&
                        formik.errors.name &&
                        "text-red-600"
                      } xl:text-xl lg:text-[1rem] md:text-xs font-semibold`}
                    >
                      Name:
                    </span>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.name}
                      className={`${
                        formik.touched.name && formik.errors.name
                          ? "border-red-600"
                          : "border-light-default"
                      } block mb-2 ml-6 xl:text-lg lg:text-[1rem] placeholder-white border-0 border-b-2 bg-card-input  dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full`}
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
                      } xl:text-xl lg:text-[1rem] md:text-xs font-semibold`}
                    >
                      Age:
                    </span>
                    <input
                      type="number"
                      min="18"
                      max="100"
                      id="age"
                      name="age"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.age}
                      className={`${
                        formik.touched.age && formik.errors.age
                          ? "border-red-600"
                          : "border-light-default"
                      } block mb-2 ml-6 xl:text-lg lg:text-[1rem] placeholder-white border-0 border-b-2 bg-card-input  dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full`}
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
                        formik.touched.contact_number &&
                        formik.errors.contact_number &&
                        "text-red-600"
                      } xl:text-xl lg:text-[1rem] md:text-xs font-semibold`}
                    >
                      Contact Number:
                    </span>
                    <input
                      type="text"
                      id="contact_number"
                      name="contact_number"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.contact_number}
                      className={`${
                        formik.touched.contact_number &&
                        formik.errors.contact_number
                          ? "border-red-600"
                          : "border-light-default"
                      } block mb-2 ml-6 xl:text-lg lg:text-[1rem] placeholder-white border-0 border-b-2 bg-card-input  dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full`}
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
                        formik.touched.email &&
                        formik.errors.email &&
                        "text-red-600"
                      } xl:text-xl lg:text-[1rem] md:text-xs font-semibold`}
                    >
                      Email Address:
                    </span>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                      className={`${
                        formik.touched.email && formik.errors.email
                          ? "border-red-600"
                          : "border-light-default"
                      } block mb-2 ml-6 xl:text-lg lg:text-[1rem] placeholder-white border-0 border-b-2 bg-card-input  dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full`}
                      placeholder="Enter Your Email Address"
                    />
                    {formik.touched.email && formik.errors.email && (
                      <div className="text-lg font-semibold text-red-600">
                        {formik.errors.email}
                      </div>
                    )}
                  </label>
                  <label className="relative block">
                    <span
                      className={`${
                        formik.touched.password &&
                        formik.errors.password &&
                        "text-red-600"
                      } xl:text-xl lg:text-[1rem] md:text-xs font-semibold`}
                    >
                      Password:
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                      className={`${
                        formik.touched.password && formik.errors.password
                          ? "border-red-600"
                          : "border-light-default"
                      } block mb-2 ml-6 xl:text-lg lg:text-[1rem] placeholder-white border-0 border-b-2 bg-card-input  dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full`}
                      placeholder="Enter Your Password"
                    />
                    <div
                      className="absolute cursor-pointer top-10 lg:right-2 md:right-[-5px]"
                      onClick={handleClickShowPassword}
                    >
                      <FontAwesomeIcon
                        icon={showPassword ? faEye : faEyeSlash}
                      />
                    </div>
                    {formik.touched.password && formik.errors.password && (
                      <div className="text-lg font-semibold text-red-600">
                        {formik.errors.password}
                      </div>
                    )}
                  </label>
                  <label className="block">
                    <span
                      className={`${
                        formik.touched.name &&
                        formik.errors.name &&
                        "text-red-600"
                      } xl:text-xl lg:text-[1rem] md:text-xs font-semibold`}
                    >
                      Description:
                    </span>
                    <input
                      type="text"
                      id="description"
                      name="description"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.description}
                      className={`${
                        formik.touched.description && formik.errors.description
                          ? "border-red-600"
                          : "border-light-default"
                      } block mb-2 ml-6 xl:text-lg lg:text-[1rem] placeholder-white border-0 border-b-2 bg-card-input  dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full`}
                      placeholder="Describe Yourself To Us"
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
                      } xl:text-xl lg:text-[1rem] md:text-xs font-semibold`}
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

                        const updatedSelection = selectedOptions.includes(
                          "Others"
                        )
                          ? ["Others"]
                          : selectedOptions;

                        formik.setFieldValue("allergy", updatedSelection);
                      }}
                      onBlur={formik.handleBlur}
                      value={formik.values.allergy}
                      className={`${
                        formik.touched.allergy && formik.errors.allergy
                          ? "border-red-600"
                          : "border-light-default"
                      } block mb-2 ml-6 xl:text-lg lg:text-[1rem] placeholder-white border-0 border-b-2 bg-card-input  dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full`}
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
                          formik.values.allergy.includes("Head & Shoulders") &&
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
                    {formik.touched.allergy && formik.errors.allergy && (
                      <div className="text-lg font-semibold text-red-600">
                        {formik.errors.allergy}
                      </div>
                    )}
                  </label>

                  <label className="block">
                    <span
                      className={`${
                        formik.touched.product_preference &&
                        formik.errors.product_preference &&
                        "text-red-600"
                      } xl:text-xl lg:text-[1rem] md:text-xs font-semibold`}
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

                        const updatedSelection = selectedOptions.includes(
                          "Others"
                        )
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
                          : "border-light-default"
                      } block mb-2 ml-6 xl:text-lg lg:text-[1rem] placeholder-white border-0 border-b-2 bg-card-input  dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full`}
                      multiple
                    >
                      <option
                        value="Dove"
                        className={`${
                          formik.values.product_preference.includes("Dove") &&
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
                          formik.values.product_preference.includes("Others") &&
                          "text-dark-default dark:text-light-default font-semibold"
                        }`}
                      >
                        Others
                      </option>
                    </select>
                    {formik.touched.product_preference &&
                      formik.errors.product_preference && (
                        <div className="text-lg font-semibold text-red-600">
                          {formik.errors.product_preference}
                        </div>
                      )}
                  </label>
                  <label className="block">
                    <span
                      className={`xl:text-xl lg:text-[1rem] md:text-xs font-semibold`}
                    >
                      Upload Image:
                    </span>
                    <input
                      type="file"
                      id="image"
                      name="image"
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
                          : "border-light-default"
                      } block pt-3 mb-2 ml-6 xl:text-xl lg:text-[1rem] md:text-xs w-full`}
                    />
                    <span className="grid items-center justify-center grid-flow-row grid-cols-5 gap-2 mt-4 gap-x-2">
                      {formik.values.image && (
                        <ImagePreview images={formik.values.image} />
                      )}
                    </span>
                  </label>

                  <div className="grid items-center justify-center xl:grid-cols-[4%_auto] lg:grid-cols-[5%_auto] md:grid-cols-[6%_auto] 2xl:gap-x-2 xl:gap-x-16 lg:gap-x-10 md:gap-x-4 font-semibold">
                    <input
                      type="checkbox"
                      onChange={handleTermsAgreementChange}
                      checked={termsAgreed}
                      className="relative rounded 2xl:left-0 xl:left-12 lg:left-5 border-primary-default focus:border-primary-default focus:ring-primary-default checked:bg-primary-default checked:dark:bg-dark-default"
                    />
                    <p className="lg:text-sm md:text-[.6rem]">
                      <span className="pr-1">
                        I agree with Lhanlee Beauty Lounge
                      </span>
                      <button
                        onClick={handleTermsAndConditions}
                        className="hover:underline hover:text-secondary-t3"
                      >
                        terms & conditions
                      </button>
                    </p>
                  </div>

                  <span className="grid items-center justify-center">
                    <button
                      type="submit"
                      disabled={!formik.isValid}
                      className={`xl:px-6 md:px-4 font-medium capitalize rounded-lg xl:text-xl lg:text-[1rem] md:text-xs lg:text-base md:text-[.75rem] btn btn-primary text-light-default dark:text-dark-default ${
                        !formik.isValid && "opacity-50 cursor-not-allowed"
                      }`}
                    >
                      Sign up
                    </button>
                  </span>
                  <p className="font-semibold text-center xl:text-base lg:text-sm md:text-[.6rem]">
                    Do you have an account already?
                    <button
                      onClick={handleLogin}
                      className="font-bold xl:pl-2 md:pl-1 hover:underline hover:text-secondary-t3"
                    >
                      Log in here
                    </button>
                  </p>
                </form>
              </div>
            </div>
          </Card>
        </>
      )}
    </>
  );
}
