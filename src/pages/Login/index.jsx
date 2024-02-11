import React, { useState } from "react";
import { useLoginMutation } from "@api";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { FadeLoader } from "react-spinners";
import { loginUserValidation } from "@/validation";
import { Card, CardImage } from "@components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@auth";
import { locationSlice } from "@location";
import { ingredientSlice } from "@ingredient";
import { waiverSlice } from "@waiver";

export default function () {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.open);

  const store = open.openData.isOpen;

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [loginUser, { isLoading }] = useLoginMutation();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginUserValidation,
    onSubmit: (values) => {
      loginUser(values).then(async (response) => {
        const toastProps = {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
        };

        if (response?.data?.success === true) {
          const userRole = response?.data?.details?.user?.roles;

          if (
            userRole.includes("Admin") ||
            userRole.includes("Beautician") ||
            store
          ) {
            dispatch(locationSlice.actions.clearFormData());
            dispatch(ingredientSlice.actions.resetReason());
            dispatch(waiverSlice.actions.resetWaiver());
            toast.success(`${response?.data?.message}`, toastProps);
          } else {
            await dispatch(logout());
            navigate("/login");
            toast.error(
              "The store is currently closed. Sorry for the inconvenience."
            );
          }
        } else {
          toast.error(`${response?.error?.data?.error?.message}`, toastProps);
        }
      });
    },
  });

  const chooseRole = () => {
    navigate("/chooseRole");
  };

  const forgotPassword = () => {
    navigate("/ForgotPassword");
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <>
      {isLoading ? (
        <div className="loader">
          <FadeLoader color="#FDA7DF" loading={true} size={50} />
        </div>
      ) : (
        <>
          <Card>
            <div className="grid w-full min-h-screen pb-4 text-light-default dark:text-dark-default">
              <span className="grid items-end justify-center 2xl:grid-rows-[90%_10%] xl:grid-rows-[80%_20%] md:grid-rows-[75%_15%]">
                <h1 className="font-semibold text-center 2xl:pb-8 xl:pb-2 md:pb-0 lg:text-5xl md:text-4xl">
                  Welcome Back!
                </h1>
                <p className="lg:text-[1.75rem] md:text-2xl text-center text-light-default dark:text-dark-default">
                  Log in to your account
                </p>
              </span>
              <div className="grid grid-cols-[40%_60%] items-center justify-start pt-6 gap-x-6">
                <CardImage />
                <form
                  onSubmit={formik.handleSubmit}
                  encType="multipart/form-data"
                  className="grid items-center justify-center w-full grid-flow-row-dense pr-6 gap-y-4"
                >
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
                      }  block mb-2 ml-6 xl:text-lg lg:text-[1rem] placeholder-white border-0 border-b-2 bg-card-input  dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full`}
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
                  <span className="relative grid justify-center">
                    <button
                      type="submit"
                      disabled={!formik.isValid}
                      className={`rounded-3xl xl:px-10 md:px-8 font-medium capitalize xl:text-xl lg:text-[1rem] md:text-base btn btn-primary text-light-default dark:text-dark-default ${
                        !formik.isValid && "opacity-50 cursor-not-allowed"
                      }`}
                    >
                      Log in
                    </button>
                    <button
                      onClick={forgotPassword}
                      className="pt-8 pb-4 text-xl hover:underline hover:text-secondary-t3"
                    >
                      Forgot password?
                    </button>
                  </span>
                  <p className="pt-6 xl:text-2xl lg:text-lg md:text-[.825rem]">
                    Don't have an account?
                    <button
                      onClick={chooseRole}
                      className="font-medium xl:pl-2 md:pl-1 hover:underline hover:text-secondary-t3"
                    >
                      Sign up here
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
