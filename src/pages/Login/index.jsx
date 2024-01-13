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
import adImg from "@assets/Beautician.png";
import { useSelector } from "react-redux";

export default function () {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [loginUser, { isLoading }] = useLoginMutation();
  
  const auth = useSelector((state) => state.auth);
  const isCustomer = auth?.user?.roles?.includes(["Online Customer", "Walk in Customer"]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginUserValidation,
    onSubmit: (values) => {
      loginUser(values).then((response) => {
        const toastProps = {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
        };
        if (response?.data?.success === true) {
          toast.success(`${response?.data?.message}`, toastProps);
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
          {isCustomer ? (
            <div className="fixed top-0 left-0 h-screen w-full bg-black bg-opacity-40">
              <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-2/5 w-3/6 bg-primary-default rounded-lg shadow">
                <div className="flex items-center">
                  <div className="mt-4 ml-4 rounded-sm w-2/4">
                    <img src={adImg} className="h-56 w-56" />
                  </div>
                  <div className="ml-2 mr-2 w-2/4 mb-1 p-1 text-left text-default ">
                    <h3 className="text-xl font-bold underline">
                      Service Offers:
                    </h3>
                    <h3 className="text-base font-semibold">Service Name:</h3>
                    <p className="text-sm mb-1">Nail Polishing</p>
                    <h3 className="text-base font-semibold">Service Price:</h3>
                    <p className="text-sm mb-1">550.00</p>
                    <h3 className="text-base font-semibold">
                      Service Description:
                    </h3>
                    <p className="text-sm mb-1">
                      Nail polish is a type of lacquer that's used to decorate
                      fingernails and toenails. Because it has to be strong,
                      flexible, and resist chipping and peeling, nail polish
                      contains a number of chemicals. Here's a look at the
                      chemical composition of nail polish and the function of
                      each of the ingredients.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : <></>}
        </div>
      ) : (
        <>
          <Card>
            <div className="grid w-full h-full text-light-default dark:text-dark-default">
              <span className="grid items-end justify-center 2xl:grid-rows-[90%_10%] xl:grid-rows-[80%_20%] md:grid-rows-[75%_25%]">
                <h1 className="font-semibold text-center xl:pb-6 md:pb-2 lg:text-5xl md:text-4xl">
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
                      className="pt-8 pb-4 text-xl"
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
