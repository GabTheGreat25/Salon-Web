import React, { useState } from "react";
import {
  AdminSidebar,
  OnlineCustomerSidebar,
  WalkInCustomerSidebar,
  BeauticianSidebar,
} from "@/components";
import { useSelector } from "react-redux";
import { useUpdateUserPasswordMutation } from "@api";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FadeLoader } from "react-spinners";
import { updatePasswordValidation } from "@/validation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function () {
  const auth = useSelector((state) => state.auth.user);
  const isAdmin = auth?.roles?.includes("Admin");
  const isBeautician = auth?.roles?.includes("Beautician");
  const isOnlineCustomer = auth?.roles?.includes("Online Customer");
  const isWalkInCustomer = auth?.roles?.includes("Walk-in Customer");

  const navigate = useNavigate();

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [updatePassword, { isLoading }] = useUpdateUserPasswordMutation();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: updatePasswordValidation,
    onSubmit: (values) => {
      const { oldPassword, newPassword, confirmPassword } = values;
      updatePassword({
        id: auth?._id,
        oldPassword,
        newPassword,
        confirmPassword,
      }).then((response) => {
        const toastProps = {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        };
        if (response?.data?.success === true) {
          {
            isAdmin
              ? navigate("/admin/editAdminProfile")
              : isBeautician
              ? navigate("/beautician/editBeauticianProfile")
              : isOnlineCustomer
              ? navigate("/onlineCustomer/editOnlineCustomerProfile")
              : isWalkInCustomer
              ? navigate("/walkInCustomer/editWalkInCustomerProfile")
              : null;
          }
          toast.success(`${response?.data?.message}`, toastProps);
        } else
          toast.error(`${response?.error?.data?.error?.message}`, toastProps);
      });
    },
  });

  const handleClickShowOldPassword = () => setShowOldPassword(!showOldPassword);

  const handleClickShowNewPassword = () => setShowNewPassword(!showNewPassword);

  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  return (
    <>
      {isLoading ? (
        <div className="loader">
          <FadeLoader color="#FDA7DF" loading={true} size={50} />
        </div>
      ) : (
        <>
          <div className="flex h-full">
            {isAdmin ? (
              <AdminSidebar />
            ) : isBeautician ? (
              <BeauticianSidebar />
            ) : isOnlineCustomer ? (
              <OnlineCustomerSidebar />
            ) : isWalkInCustomer ? (
              <WalkInCustomerSidebar />
            ) : null}
            <div className="relative flex flex-col items-center flex-1 w-full h-full p-5 mx-20 my-10 space-x-4 rounded-lg shadow-lg bg-primary-default md:flex-row">
              <div className="flex items-center w-full h-full">
                <div className="flex-grow">
                  <h2 className="pb-2 font-sans text-3xl font-semibold">
                    Change Password
                  </h2>
                  <h5 className="text-base font-medium">Manage my password</h5>
                  <hr className="my-4 border-t border-dark-default dark:border-light-default" />
                  <div className="grid">
                    <form
                      onSubmit={formik.handleSubmit}
                      encType="multipart/form-data"
                      className="w-full"
                    >
                      <label className="relative block pr-10">
                        <span
                          className={`${
                            formik.touched.oldPassword &&
                            formik.errors.oldPassword &&
                            "text-red-600"
                          } xl:text-xl lg:text-[1rem] md:text-xs font-semibold`}
                        >
                          Old Password:
                        </span>
                        <input
                          type={showOldPassword ? "text" : "password"}
                          id="oldPassword"
                          name="oldPassword"
                          autoComplete="off"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.oldPassword}
                          className={`${
                            formik.touched.oldPassword &&
                            formik.errors.oldPassword
                              ? "border-red-600"
                              : "border-dark-default dark:border-light-default"
                          } block mb-2 ml-6 xl:text-lg lg:text-[1rem] placeholder-dark-default dark:placeholder-light-default border-0 border-b-2 bg-card-input  dark:border-dark-default focus:ring-0 focus:border-secondary-default focus:dark:focus:border-secondary-default w-full`}
                          placeholder="Enter Your Old Password"
                        />
                        <div
                          className="absolute cursor-pointer top-10 right-12"
                          onClick={handleClickShowOldPassword}
                        >
                          <FontAwesomeIcon
                            icon={showOldPassword ? faEye : faEyeSlash}
                          />
                        </div>
                        {formik.touched.oldPassword &&
                          formik.errors.oldPassword && (
                            <div className="text-lg font-semibold text-red-600">
                              {formik.errors.oldPassword}
                            </div>
                          )}
                      </label>
                      <label className="relative block pr-10">
                        <span
                          className={`${
                            formik.touched.newPassword &&
                            formik.errors.newPassword &&
                            "text-red-600"
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
                              ? "border-red-600"
                              : "border-dark-default dark:border-light-default"
                          } block mb-2 ml-6 xl:text-lg lg:text-[1rem] placeholder-dark-default dark:placeholder-light-default border-0 border-b-2 bg-card-input  dark:border-dark-default focus:ring-0 focus:border-secondary-default focus:dark:focus:border-secondary-default w-full`}
                          placeholder="Enter Your New Password"
                        />
                        <div
                          className="absolute cursor-pointer top-10 right-12"
                          onClick={handleClickShowNewPassword}
                        >
                          <FontAwesomeIcon
                            icon={showNewPassword ? faEye : faEyeSlash}
                          />
                        </div>
                        {formik.touched.newPassword &&
                          formik.errors.newPassword && (
                            <div className="text-lg font-semibold text-red-600">
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
                              : "border-dark-default dark:border-light-default"
                          } block mb-2 ml-6 xl:text-lg lg:text-[1rem] placeholder-dark-default dark:placeholder-light-default border-0 border-b-2 bg-card-input  dark:border-dark-default focus:ring-0 focus:border-secondary-default focus:dark:focus:border-secondary-default w-full`}
                          placeholder="Enter Your Old Password"
                        />
                        <div
                          className="absolute cursor-pointer top-10 right-12"
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
                      <span className="grid items-center justify-end grid-flow-col-dense pt-3 lg:gap-x-4 md:gap-x-2">
                        <button
                          type="submit"
                          disabled={!formik.isValid}
                          className={`border-dark-default dark:border-light-default rounded-xl xl:px-6 lg:px-4 md:px-2 font-medium capitalize 2xl:text-3xl xl:text-xl lg:text-lg md:text-base btn btn-primary text-dark-default dark:text-light-default ${
                            !formik.isValid && "opacity-50 cursor-not-allowed"
                          }`}
                        >
                          Submit
                        </button>
                      </span>
                    </form>
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
