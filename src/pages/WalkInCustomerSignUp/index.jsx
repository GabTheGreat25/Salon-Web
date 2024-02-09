import React, { useState, useEffect } from "react";
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
import { useSelector } from "react-redux";
import { locationSlice } from "@location";
import { useDispatch } from "react-redux";
import { ingredientSlice } from "@ingredient";
import { waiverSlice } from "@waiver";

export default function () {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const checkedAllergies = useSelector(
    (state) => state.ingredient.ingredientData.allergy || []
  );

  const waiver = useSelector((state) => state.waiver);

  const formikValues = useSelector((state) => state.location.formData);

  const [addUser, isLoading] = useAddUserMutation();

  const [termsAgreed, setTermsAgreed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: formikValues.name || "",
      age: formikValues.age || "",
      contact_number: formikValues.contact_number || "",
      email: formikValues.email || "",
      password: formikValues.password || "",
      confirmPassword: formikValues.confirmPassword || "",
      roles: "Walk-in Customer",
      image: [],
      description: formikValues.description || "",
      allergy: formikValues.allergy || [],
      othersMessage: "",
      eSignature: waiver.waiverData.eSignature || "",
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
        values.allergy.forEach((item) => formData.append("allergy[]", item));
      } else formData.append("allergy", values?.allergy);
      formData.append("othersMessage", values?.othersMessage);
      formData.append("eSignature", values?.eSignature);
      addUser(formData).then((response) => {
        const toastProps = {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
        };
        if (response?.data?.success === true) {
          dispatch(locationSlice.actions.clearFormData());
          dispatch(ingredientSlice.actions.resetReason());
          dispatch(waiverSlice.actions.resetWaiver());
          navigate("/login");
          toast.success(`${response?.data?.message}`, toastProps);
        } else
          toast.error(`${response?.error?.data?.error?.message}`, toastProps);
      });
    },
  });

  useEffect(() => {
    formik.setValues({
      ...formik.values,
      allergy: checkedAllergies || [],
    });
  }, [checkedAllergies]);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleTermsAgreementChange = () => {
    setTermsAgreed(!termsAgreed);
  };

  const handleLogin = () => navigate(`/login`);

  const handleTermsAndConditions = () => {
    dispatch(locationSlice.actions.updateFormData(formik.values));
    navigate(`/walkInCustomerTermsCondition`);
  };

  const handleWaiver = () => {
    dispatch(locationSlice.actions.updateFormData(formik.values));
    navigate(`/waiver`);
  };

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
              <span className="grid items-end md:gap-y-10 justify-center 2xl:grid-rows-[80%_20%] xl:grid-rows-[70%_30%] md:grid-rows-[75%_25%]">
                <h1 className="text-3xl font-semibold text-center">Sign Up</h1>
                <p className="text-xl text-center lg:px-12 text-light-default dark:text-dark-default">
                  Get us some of your information to get a free access to our
                  Lhanlee Beauty Lounge website.
                </p>
              </span>
              <div className="overflow-x-hidden grid grid-cols-[50%_50%] items-center justify-start pt-20 pb-6 gap-x-6 2xl:pr-0 md:pr-10">
                <CardImage />
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!termsAgreed) {
                      toast.warning(
                        "Please agree to Lhanlee Beauty Lounge privacy policy terms and conditions."
                      );
                      return;
                    }
                    if (
                      checkedAllergies.length > 0 &&
                      waiver.waiverData.hasWaiver === false
                    ) {
                      toast.warning("A waiver is required to proceed.");
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
                      autoComplete="off"
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
                      min="14"
                      max="100"
                      id="age"
                      name="age"
                      autoComplete="off"
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
                      autoComplete="off"
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
                      autoComplete="off"
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
                      autoComplete="off"
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
                  <label className="relative block">
                    <span
                      className={`${
                        formik.touched.confirmPassword &&
                        formik.errors.confirmPassword &&
                        "text-red-600"
                      } xl:text-xl lg:text-[1rem] md:text-xs font-semibold`}
                    >
                      Confirm Password:
                    </span>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      autoComplete="off"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.confirmPassword}
                      className={`${
                        formik.touched.confirmPassword &&
                        formik.errors.confirmPassword
                          ? "border-red-600"
                          : "border-light-default dark:border-dark-default"
                      } block mb-2 ml-6 xl:text-lg lg:text-[1rem] placeholder-light-default dark:placeholder-dark-default  border-0 border-b-2 bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 w-full`}
                      placeholder="Confirm your password"
                    />
                    <div
                      className="absolute cursor-pointer top-10 lg:right-2 md:right-[-5px]"
                      onClick={handleClickShowConfirmPassword}
                    >
                      <FontAwesomeIcon
                        icon={showConfirmPassword ? faEye : faEyeSlash}
                      />
                    </div>
                    {formik.touched.confirmPassword &&
                      formik.errors.confirmPassword && (
                        <div className="text-lg font-semibold text-red-600">
                          {formik.errors.confirmPassword}
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
                      placeholder="Tell us anything (Female with Long Hair, Female with Short Hair, Male with black hair and brown eyes and etc.)"
                      className="resize-none block my-4 xl:text-xl lg:text-[1rem] md:text-sm placeholder-white border-2 bg-card-input w-full border-light-default dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default rounded-lg"
                      rows="6"
                    ></textarea>
                    {formik.touched.description &&
                      formik.errors.description && (
                        <div className="text-lg font-semibold text-red-600">
                          {formik.errors.description}
                        </div>
                      )}
                  </label>

                  <label className="block">
                    <span
                      className={`font-semibold xl:text-xl lg:text-[.8rem] md:text-[.55rem]`}
                    >
                      <p>Ingredients Exclusion:</p>
                    </span>
                    <div className="grid grid-cols-2 pt-2 ml-6 gap-x-6">
                      <div className="flex items-center justify-start space-x-2">
                        <input
                          type="checkbox"
                          id="none"
                          name="allergy"
                          value="None"
                          checked={formik.values.allergy?.includes("None")}
                          onChange={(e) => {
                            const selectedValue = "None";
                            const updatedSelection = e.target.checked
                              ? ["None"]
                              : formik.values.allergy.filter(
                                  (val) => val !== selectedValue
                                );
                            formik.setFieldValue("allergy", updatedSelection);
                          }}
                          onBlur={formik.handleBlur}
                          className={`${
                            formik.touched.allergy && formik.errors.allergy
                              ? "border-red-600"
                              : "border-light-default"
                          } rounded 2xl:left-0 xl:left-12 lg:left-5 border-primary-default focus:border-primary-default focus:ring-primary-default checked:bg-primary-default checked:dark:bg-dark-default`}
                        />
                        <label
                          htmlFor="none"
                          className="text-xl font-medium cursor-pointer "
                        >
                          None
                        </label>
                      </div>
                      <div className="flex items-center justify-start space-x-2">
                        <span
                          onClick={() => {
                            const updatedAllergy = formik.values.allergy
                              .filter(
                                (val) => val !== "None" && val !== "Others"
                              )
                              .concat("");
                            formik.setFieldValue("allergy", updatedAllergy);
                            dispatch(
                              locationSlice.actions.updateFormData(
                                formik.values
                              )
                            );
                            navigate("/Hands");
                          }}
                          className="py-[.1rem] text-xl font-medium cursor-pointer"
                        >
                          Hands
                        </span>
                      </div>
                      <div className="flex items-center justify-start space-x-2">
                        <span
                          onClick={() => {
                            const updatedAllergy = formik.values.allergy
                              .filter(
                                (val) => val !== "None" && val !== "Others"
                              )
                              .concat("");
                            formik.setFieldValue("allergy", updatedAllergy);
                            dispatch(
                              locationSlice.actions.updateFormData(
                                formik.values
                              )
                            );
                            navigate("/Hair");
                          }}
                          className="py-[.1rem] text-xl font-medium cursor-pointer"
                        >
                          Hair
                        </span>
                      </div>
                      <div className="flex items-center justify-start space-x-2">
                        <span
                          onClick={() => {
                            const updatedAllergy = formik.values.allergy
                              .filter(
                                (val) => val !== "None" && val !== "Others"
                              )
                              .concat("");
                            formik.setFieldValue("allergy", updatedAllergy);
                            dispatch(
                              locationSlice.actions.updateFormData(
                                formik.values
                              )
                            );
                            navigate("/Feet");
                          }}
                          className="py-[.1rem] text-xl font-medium cursor-pointer"
                        >
                          Feet
                        </span>
                      </div>
                      <div className="flex items-center justify-start space-x-2">
                        <span
                          onClick={() => {
                            const updatedAllergy = formik.values.allergy
                              .filter(
                                (val) => val !== "None" && val !== "Others"
                              )
                              .concat("");
                            formik.setFieldValue("allergy", updatedAllergy);
                            dispatch(
                              locationSlice.actions.updateFormData(
                                formik.values
                              )
                            );
                            navigate("/Face");
                          }}
                          className="py-[.1rem] text-xl font-medium cursor-pointer"
                        >
                          Face
                        </span>
                      </div>
                      <div className="flex items-center justify-start space-x-2">
                        <span
                          onClick={() => {
                            const updatedAllergy = formik.values.allergy
                              .filter(
                                (val) => val !== "None" && val !== "Others"
                              )
                              .concat("");
                            formik.setFieldValue("allergy", updatedAllergy);
                            dispatch(
                              locationSlice.actions.updateFormData(
                                formik.values
                              )
                            );
                            navigate("/Body");
                          }}
                          className="py-[.1rem] text-xl font-medium cursor-pointer"
                        >
                          Body
                        </span>
                      </div>
                      <div className="flex items-center justify-start space-x-2">
                        <input
                          type="checkbox"
                          id="others"
                          name="allergy"
                          value="Others"
                          checked={formik.values.allergy?.includes("Others")}
                          onChange={(e) => {
                            const selectedValue = "Others";
                            const updatedSelection = e.target.checked
                              ? ["Others"]
                              : formik.values.allergy.filter(
                                  (val) => val !== selectedValue
                                );
                            formik.setFieldValue("allergy", updatedSelection);
                          }}
                          onBlur={formik.handleBlur}
                          className={`${
                            formik.touched.allergy && formik.errors.allergy
                              ? "border-red-600"
                              : "border-light-default"
                          } rounded 2xl:left-0 xl:left-12 lg:left-5 border-primary-default focus:border-primary-default focus:ring-primary-default checked:bg-primary-default checked:dark:bg-dark-default`}
                        />
                        <label
                          htmlFor="others"
                          className="text-xl font-medium cursor-pointer "
                        >
                          Others
                        </label>
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
                            className="rounded text-dark-default border-primary-default focus:border-primary-default focus:ring-primary-default"
                          />
                        </div>
                      )}
                    </div>
                  </label>

                  {checkedAllergies.length > 0 && (
                    <div className="ml-6">
                      <button
                        onClick={handleWaiver}
                        className="xl:px-6 md:px-4 font-medium capitalize rounded-lg xl:text-xl lg:text-[1rem] md:text-xs lg:text-base md:text-[.75rem] btn btn-primary text-light-default dark:text-dark-default"
                      >
                        Add Waiver
                      </button>
                    </div>
                  )}

                  <label className="block">
                    <span
                      className={`xl:text-xl lg:text-[1rem] md:text-xs font-semibold`}
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
                          : "border-light-default"
                      } block pt-3 mb-2 ml-6 xl:text-xl lg:text-[1rem] md:text-xs w-full`}
                    />
                    <span className="grid items-center justify-center grid-flow-row grid-cols-5 gap-2 mt-4 gap-x-2">
                      {formik.values.image && (
                        <ImagePreview images={formik.values.image} />
                      )}
                    </span>
                  </label>
                  <div className="w-full">
                    <label className="block border-light-default xl:text-xl lg:text-[1rem] md:text-xs font-semibold">
                      Terms & Conditions
                    </label>
                    <p className="lg:text-xs md:text-[.5rem] font-bold">
                      By utilizing our Salon Appointment System for walk-in
                      customers, you acknowledge and agree to the following
                      terms and conditions.
                    </p>
                  </div>
                  <div className="grid items-center justify-center xl:grid-cols-[4%_auto] lg:grid-cols-[5%_auto] md:grid-cols-[6%_auto] 2xl:gap-x-2 xl:gap-x-16 lg:gap-x-10 md:gap-x-4 font-semibold">
                    <input
                      type="checkbox"
                      onChange={handleTermsAgreementChange}
                      checked={termsAgreed}
                      className="relative rounded 2xl:left-0 xl:left-12 lg:left-5 border-primary-default focus:border-primary-default focus:ring-primary-default checked:bg-primary-default checked:dark:bg-dark-default"
                    />
                    <p className="lg:text-sm md:text-[.6rem]">
                      <span className="pr-1">
                        I have read and agree to the Lhanlee Beauty Lounge
                        Appointment
                      </span>
                      <button
                        onClick={handleTermsAndConditions}
                        className="hover:underline hover:text-secondary-t3"
                      >
                        Terms and Conditions.
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
