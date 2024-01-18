import React from "react";
import { Card } from "@components";
import { useNavigate } from "react-router-dom";
import { useForgotPasswordMutation } from "@api";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FadeLoader } from "react-spinners";
import { forgotPasswordValidation } from "@/validation";

export default function () {
  const navigate = useNavigate();

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgotPasswordValidation,
    onSubmit: (values) => {
      forgotPassword(values?.email).then((response) => {
        const toastProps = {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
        };
        if (response?.data?.success === true) {
          toast.success(`${response?.data?.message}`, toastProps);
          navigate("/resetPassword");
        } else console.log(response);
        toast.error(`${response?.error?.data?.error?.message}`, toastProps);
      });
    },
  });

  return (
    <>
      {isLoading ? (
        <div className="loader">
          <FadeLoader color="#FDA7DF" loading={true} size={50} />
        </div>
      ) : (
        <>
          <Card>
            <div className="w-full min-h-[80vh] text-light-default dark:text-dark-default">
              <form
                onSubmit={formik.handleSubmit}
                className="flex flex-col py-32"
              >
                <div className="pb-10">
                  <h1 className="pt-32 font-semibold text-center 2xl:text-5xl xl:text-4xl lg:text-3xl md:text-2xl ">
                    Forgot Password?
                  </h1>
                </div>
                <div className="grid items-start">
                  <h2 className="pb-6 font-semibold text-center xl:text-3xl lg:text-2xl md:text-xl">
                    Recover your account
                  </h2>
                  <p className="pb-6 text-center xl:text-xl lg:text-lg md:text-base">
                    Please enter your email <br /> to reset your password.
                  </p>
                  <div className="grid justify-center grid-flow-row-dense gap-y-4">
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
                      className={`${
                        formik.touched.email && formik.errors.email
                          ? "border-red-600"
                          : "border-light-default"
                      }block w-full placeholder-white border-0 border-b-2 bg-card-input xl:text-xl lg:text-lg md:text-base border-light-default dark:border-dark-default focus:ring-0 focus:border-primary-default dark:placeholder-dark-default`}
                      placeholder="Enter Your Email Address"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <div className="text-lg font-semibold text-red-600">
                        {formik.errors.email}
                      </div>
                    )}
                    <span className="grid justify-center">
                      <button
                        type="submit"
                        disabled={!formik.isValid}
                        className={`px-12 mt-5 text-xl font-medium capitalize rounded-3xl btn btn-primary text-light-default dark:text-dark-default ${
                          !formik.isValid && "opacity-50 cursor-not-allowed"
                        }`}
                      >
                        Continue
                      </button>
                    </span>
                  </div>
                </div>
              </form>
            </div>
          </Card>
        </>
      )}
    </>
  );
}
