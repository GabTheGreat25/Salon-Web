import { React, useState } from "react";
import { Card, CardImage } from "@components";
import { useAddFeedbackMutation } from "@api";
import { createFeedbackValidation } from "@validation";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import { FadeLoader } from "react-spinners";
import { useSelector } from "react-redux";

export default function () {
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const [addFeedback, isLoading] = useAddFeedbackMutation();

  const [anonymous, setAnonymous] = useState(false);

  function checkboxToggle() {
    setAnonymous((anonymous) => !anonymous);
    formik.setFieldValue("isAnonymous", !formik.values.isAnonymous);
  }

  const formik = useFormik({
    initialValues: {
      name: user.name,
      email: user?.email,
      contact_number: user?.contact_number,
      description: "",
      isAnonymous: anonymous,
    },
    validationSchema: createFeedbackValidation,
    onSubmit: async (values) => {
      addFeedback(values).then((response) => {
        const toastProps = {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
        };
        if (response?.data?.success === true) {
          navigate("/customer");
          toast.success(`${response?.data?.message}`, toastProps);
        } else
          toast.error(`${response?.error?.data?.error?.message}`, toastProps);
      });
    },
  });

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
                  Let's Talk!
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
                      placeholder="Tell us about your experience at Lhanlee Beauty Lounge"
                      className="resize-none block my-4 xl:text-xl lg:text-[1rem] md:text-sm placeholder-white border-2 bg-card-input w-full border-light-default dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default rounded-lg"
                      rows="8"
                    ></textarea>
                    {formik.touched.description &&
                      formik.errors.description && (
                        <div className="text-lg font-semibold text-red-600">
                          {formik.errors.description}
                        </div>
                      )}
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      id="anonymous"
                      name="anonymous"
                      checked={anonymous}
                      onChange={checkboxToggle}
                      onBlur={formik.handleBlur}
                      className="px-5 py-5 ml-6 rounded border-primary-default focus:border-primary-default focus:ring-primary-default checked:bg-primary-default checked:dark:bg-dark-default"
                    />
                    <span className="xl:text-xl lg:text-[1rem] md:text-xs font-semibold ml-2">
                      {anonymous ? "Anonymous" : "Make yourself anonymous"}
                    </span>
                  </label>
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
