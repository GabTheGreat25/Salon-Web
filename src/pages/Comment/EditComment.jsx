import React, { useRef, useEffect } from "react";
import { Card, CardImage } from "@components";
import { useUpdateCommentMutation, useGetCommentByIdQuery } from "@api";
import { editCommentValidation } from "@validation";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import { FadeLoader } from "react-spinners";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import CameraImg from "@assets/Camera.png";

export default function () {
  const navigate = useNavigate();

  const { id } = useParams();

  const { data, isLoading, refetch } = useGetCommentByIdQuery(id);
  const comment = data?.details;

  const isFocused = useRef(true);

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

  const [updateComment] = useUpdateCommentMutation();

  const hide = comment?.isAnonymous;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      ratings: comment?.ratings || 1,
      description: comment?.description || "",
      suggestion: comment?.suggestion || "",
      isAnonymous: comment?.isAnonymous || hide,
      image: [],
    },
    validationSchema: editCommentValidation,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("ratings", values?.ratings);
      formData.append("description", values?.description);
      formData.append("suggestion", values?.suggestion);
      formData.append("isAnonymous", values?.isAnonymous);
      Array.from(values?.image).forEach((file) => {
        formData.append("image", file);
      });
      updateComment({ id: comment?._id, payload: formData }).then(
        (response) => {
          const toastProps = {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000,
          };
          if (response?.data?.success === true) {
            navigate("/customer/comment");
            toast.success(`${response?.data?.message}`, toastProps);
          } else
            toast.error(`${response?.error?.data?.error?.message}`, toastProps);
        }
      );
    },
  });

  return (
    <>
      {isLoading ? (
        <div className="loader">
          <FadeLoader color="#FFB6C1" loading={true} size={50} />
        </div>
      ) : (
        <>
          <Card>
            <form
              onSubmit={formik.handleSubmit}
              className="grid w-full h-full pb-10 text-light-default dark:text-dark-default"
            >
              <span className="grid items-end justify-center">
                <h1 className="pt-10 font-semibold xl:text-5xl md:text-4xl">
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
                      } xl:text-xl md:text-[1rem] font-semibold`}
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
                      } font-semibold xl:text-xl lg:text-[1rem]`}
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
                      className="resize-none block my-4 xl:text-xl md:text-[1rem] placeholder-white border-2 bg-card-input w-full border-light-default dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default rounded-lg"
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
                      } font-semibold xl:text-xl lg:text-[1rem]`}
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
                      className="resize-none block my-4 xl:text-xl md:text-[1rem] placeholder-white border-2 bg-card-input w-full border-light-default dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default rounded-lg"
                      rows="6"
                    ></textarea>
                    {formik.touched.suggestion && formik.errors.suggestion && (
                      <div className="text-lg font-semibold text-red-600">
                        {formik.errors.suggestion}
                      </div>
                    )}
                  </label>
                  <label className="block">
                    <span className={`xl:text-xl md:text-[1rem] font-semibold`}>
                      {hide ? "Anonymous" : "Make my comment Anonymous"}
                    </span>
                    <input
                      type="checkbox"
                      id="isAnonymous"
                      name="isAnonymous"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      checked={formik.values.isAnonymous}
                      className="px-5 py-5 ml-6 rounded border-primary-default focus:border-primary-accent focus:ring-primary-default checked:bg-primary-default checked:dark:bg-dark-default"
                    />
                  </label>
                  <h5 className="text-center xl:text-2xl md:text-base">
                    Change The Image From Your Previous Comment
                  </h5>
                  <div className="grid">
                    <div className="grid items-center justify-center grid-cols-2">
                      <span className="grid items-center justify-center">
                        <img
                          src={
                            comment?.image && comment?.image?.length
                              ? comment?.image[
                                  Math.floor(
                                    Math.random() * comment?.image?.length
                                  )
                                ]?.url
                              : CameraImg
                          }
                          alt={comment?.image?.originalname}
                          key={comment?.image?.public_id}
                          className={
                            comment?.image && comment?.image?.length
                              ? "object-cover 2xl:w-32 xl:w-28 xl:h-24 lg:w-20 lg:h-16 2xl:h-32 md:w-16 md:h-14 rounded-2xl"
                              : "w-full h-1/2"
                          }
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
