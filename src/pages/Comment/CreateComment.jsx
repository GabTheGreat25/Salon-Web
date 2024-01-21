import React, { useState } from "react";
import { Card, CardImage } from "@components";
import { useAddCommentMutation } from "@api";
import { createCommentValidation } from "@validation";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import { FadeLoader } from "react-spinners";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import CameraImg from "@assets/Camera.png";

export default function () {
  const navigate = useNavigate();
  const location = useLocation();
  const transactionId = location.state?.transactionId;

  const user = useSelector((state) => state.auth.user);
  const isOnlineCustomer = user?.roles?.includes("Online Customer");

  const [addComment, isLoading] = useAddCommentMutation();

  const [hide, setHide] = useState(false);

  const handleHide = () => {
    setHide((hide) => !hide);
    formik.setFieldValue("isAnonymous", !hide);
  };

  const formik = useFormik({
    initialValues: {
      ratings: 1,
      description: "",
      suggestion: "",
      transaction: transactionId || "",
      isAnonymous: hide,
      image: [],
    },
    validationSchema: createCommentValidation,

    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("ratings", values?.ratings);
      formData.append("description", values?.description);
      formData.append("suggestion", values?.suggestion);
      formData.append("transaction", values.transaction);
      formData.append("isAnonymous", values?.isAnonymous);
      Array.from(values?.image).forEach((file) => {
        formData.append("image", file);
      });
      addComment(formData).then((response) => {
        const toastProps = {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
        };
        if (response?.data?.success === true) {
          navigate(
            `${
              isOnlineCustomer ? "/onlineCustomer" : "/walkInCustomer"
            }/comment`
          );
          toast.success(`${response?.data?.message}`, toastProps);
        } else
          toast.error(`${response?.error?.data?.error?.message}`, toastProps);
      });
    },
  });

  console.log(formik.values?.isAnonymous);

  return (
    <>
      {!isLoading ? (
        <div className="loader">
          <FadeLoader color="#FDA7DF" loading={true} size={50} />
        </div>
      ) : (
        <>
          <Card>
            <form
              onSubmit={formik.handleSubmit}
              className="grid w-full h-full pb-10 text-light-default dark:text-dark-default"
            >
              <span className="grid items-end justify-center">
                <h1 className="pt-10 font-semibold lg:text-5xl md:text-4xl">
                  Leave us a comment!
                </h1>
              </span>
              <div className="grid grid-cols-[40%_60%] items-start justify-start pt-6 gap-x-6">
                <span className="grid items-end justify-end h-[90%] mt-20">
                  <CardImage />
                </span>
                <div className="grid grid-flow-row-dense pr-10 gap-y-4">
                  <label className="block">
                    <span
                      className={`${
                        formik.touched.email &&
                        formik.errors.email &&
                        "text-red-600"
                      } xl:text-xl lg:text-[1rem] md:text-xs font-semibold`}
                    >
                      Rate Us:
                    </span>
                    <div className="flex items-center justify-center ">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FontAwesomeIcon
                          key={star}
                          icon={faStar}
                          className={`cursor-pointer xl:text-6xl md:text-4xl ${
                            formik.values.ratings >= star
                              ? "text-[#feca57]"
                              : "text-light-default dark:text-dark-default"
                          }`}
                          onClick={() => formik.setFieldValue("ratings", star)}
                        />
                      ))}
                    </div>
                    {formik.touched.ratings && formik.errors.ratings && (
                      <div className="text-lg font-semibold text-red-600">
                        {formik.errors.ratings}
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
                      <p>What would you like to discuss?</p>
                    </span>
                    <textarea
                      id="description"
                      name="description"
                      autoComplete="off"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.description}
                      placeholder="Tell us anything"
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
                      className={`${
                        formik.touched.suggestion &&
                        formik.errors.suggestion &&
                        "text-red-600"
                      } font-semibold xl:text-xl lg:text-[.8rem] md:text-[.55rem]`}
                    >
                      <p>Any suggestion to improve our service for you?</p>
                    </span>
                    <textarea
                      id="suggestion"
                      name="suggestion"
                      autoComplete="off"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.suggestion}
                      placeholder="Suggest you want us to improve"
                      className="resize-none block my-4 xl:text-xl lg:text-[1rem] md:text-sm placeholder-white border-2 bg-card-input w-full border-light-default dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default rounded-lg"
                      rows="6"
                    ></textarea>
                    {formik.touched.suggestion && formik.errors.suggestion && (
                      <div className="text-lg font-semibold text-red-600">
                        {formik.errors.suggestion}
                      </div>
                    )}
                  </label>
                  <div className="flex items-center">
                    <label className="block">
                      <input
                        type="checkbox"
                        name="hide"
                        id="hide"
                        checked={hide}
                        onChange={handleHide}
                        className="rounded 2xl:left-0 xl:left-12 lg:left-5 border-primary-default focus:border-primary-default focus:ring-primary-default checked:bg-primary-default checked:dark:bg-dark-default"
                      />
                    </label>
                    {hide ? (
                      <span className="ml-2 font-semibold xl:text-xl lg:text-[.8rem] md:text-[.55rem]">
                        Anonymous
                      </span>
                    ) : (
                      <span className="ml-2 font-semibold xl:text-xl lg:text-[.8rem] md:text-[.55rem]">
                        Make Yourself anonymous?
                      </span>
                    )}
                  </div>
                  <h5 className="text-center xl:text-2xl lg:text-base md:text-sm">
                    You Can Also Add An Image
                  </h5>
                  <div className="grid">
                    <div className="grid items-center justify-center grid-cols-2">
                      <span className="grid items-center justify-center">
                        <img
                          src={CameraImg}
                          alt="CameraImg"
                          className="w-full h-1/2"
                        />
                      </span>
                      <span>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          className="w-5/6 px-4 py-2 text-center border rounded-lg cursor-pointer hover: hover:bg-primary-accent border-light-default dark:border-dark-default"
                          onChange={(event) => {
                            formik.setFieldValue(
                              "image",
                              event.currentTarget.files
                            );
                          }}
                          onBlur={formik.handleBlur}
                        />
                      </span>
                    </div>
                  </div>
                  <span className="grid items-end justify-center">
                    <button
                      type="submit"
                      disabled={!formik.isValid}
                      className={`px-20 text-xl capitalize text-light-default dark:text-dark-default btn btn-primary ${
                        !formik.isValid && "opacity-50 cursor-not-allowed"
                      }`}
                    >
                      Submit
                    </button>
                  </span>
                </div>
              </div>
            </form>
          </Card>
        </>
      )}
    </>
  );
}
