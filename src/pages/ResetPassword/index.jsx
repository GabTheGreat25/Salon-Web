import React, { useState } from "react";
import { Card } from "@components";
import { useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "@api";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FadeLoader } from "react-spinners";
import { resetPasswordValidation } from "@/validation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function () {
  const navigate = useNavigate();

  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      verificationCode: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: resetPasswordValidation,
    onSubmit: (values) => {
      const { verificationCode, newPassword, confirmPassword } = values;
      resetPassword({
        verificationCode,
        newPassword,
        confirmPassword,
      }).then((response) => {
        const toastProps = {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
        };
        if (response?.data?.success === true) {
          toast.success(`${response?.data?.message}`, toastProps);
          navigate("/login");
        } else
          toast.error(`${response?.error?.data?.error?.message}`, toastProps);
      });
    },
  });

  const handleClickShowNewPassword = () => setShowNewPassword(!showNewPassword);

  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  return (
    <>
      {isLoading ? (
        <div className="loader">
          <FadeLoader color="#FFB6C1" loading={true} size={50} />
        </div>
      ) : (
        <>
          <Card>
            <div className="w-full min-h-screen text-light-default dark:text-dark-default">
              <form
                onSubmit={formik.handleSubmit}
                className="flex flex-col py-32"
              >
                <div className="pb-6">
                  <h1 className="pt-32 font-semibold text-center 2xl:text-5xl xl:text-4xl lg:text-3xl md:text-2xl ">
                    Reset Your Password
                  </h1>
                </div>
                <div className="grid items-start">
                  <h2 className="pb-6 font-semibold text-center xl:text-3xl lg:text-2xl md:text-xl">
                    Enter the verification code <br /> sent from you!
                  </h2>

                  <div className="grid justify-center grid-flow-row-dense gap-y-4">
                    <label className="block">
                      <span
                        className={`${
                          formik.touched.verificationCode &&
                          formik.errors.verificationCode &&
                          "text-red-600"
                        } xl:text-xl lg:text-[1rem] md:text-xs font-semibold`}
                      >
                        Verification Code:
                      </span>
                      <input
                        type="text"
                        id="verificationCode"
                        name="verificationCode"
                        autoComplete="off"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.verificationCode}
                        className={`${
                          formik.touched.verificationCode &&
                          formik.errors.verificationCode
                            ? "border-red-600"
                            : "border-light-default"
                        } block mb-2 ml-6 xl:text-lg lg:text-[1rem] placeholder-white border-0 border-b-2 bg-card-input  dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-[86.5%]`}
                        placeholder="Enter Your Verification Code"
                      />
                      {formik.touched.verificationCode &&
                        formik.errors.verificationCode && (
                          <div className="text-lg font-semibold text-red-600">
                            {formik.errors.verificationCode}
                          </div>
                        )}
                    </label>
                    <label className="relative block pr-10">
                      <span
                        className={`${
                          formik.touched.newPassword &&
                          formik.errors.newPassword &&
                          "text-secondary-default"
                        } xl:text-xl lg:text-[1rem] md:text-xs font-semibold`}
                      >
                        New Password:
                      </span>
                      <input
                        type={showNewPassword ? "text" : "password"}
                        id="newPassword"
                        name="newPassword"
                        autoComplete="off"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.newPassword}
                        className={`${
                          formik.touched.newPassword &&
                          formik.errors.newPassword
                            ? "border-secondary-default"
                            : "border-light-default dark:border-dark-default"
                        } block mb-2 ml-6 xl:text-lg lg:text-[1rem] placeholder-light-default dark:placeholder-dark-default border-0 border-b-2 bg-card-input  dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 w-full`}
                        placeholder="Enter Your New Password"
                      />
                      <div
                        className="absolute cursor-pointer top-10 right-6"
                        onClick={handleClickShowNewPassword}
                      >
                        <FontAwesomeIcon
                          icon={showNewPassword ? faEye : faEyeSlash}
                        />
                      </div>
                      {formik.touched.newPassword &&
                        formik.errors.newPassword && (
                          <div className="text-lg font-semibold text-secondary-default">
                            {formik.errors.newPassword}
                          </div>
                        )}
                    </label>
                    <label className="relative block pr-10">
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
                        placeholder="Enter Your Old Password"
                      />
                      <div
                        className="absolute cursor-pointer top-10 right-6"
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
