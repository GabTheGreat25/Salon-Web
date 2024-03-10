import React from "react";
import { Card, CardImage } from "@components";
import { useAddExclusionMutation } from "@api";
import { createExclusionValidation } from "@validation";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FadeLoader } from "react-spinners";
import { useFormik } from "formik";

export default function () {
  const navigate = useNavigate();

  const [addExclusion, isLoading] = useAddExclusionMutation();

  const formik = useFormik({
    initialValues: {
      ingredient_name: "",
      type: [],
    },
    validationSchema: createExclusionValidation,
    onSubmit: async (values) => {
      addExclusion(values).then((response) => {
        const toastProps = {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
        };
        if (response?.data?.success === true) {
          navigate("/admin/exclusions");
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
          <FadeLoader color="#FFB6C1" loading={true} size={50} />
        </div>
      ) : (
        <>
          <Card>
            <div className="grid w-full h-full text-light-default dark:text-dark-default">
              <span className="grid items-end md:gap-y-10 justify-center 2xl:grid-rows-[90%_10%] xl:grid-rows-[80%_20%] md:grid-rows-[75%_25%]">
                <h1 className="text-3xl font-semibold text-center">
                  Create a New Chemical 
                </h1>
                <p className="text-xl text-center lg:px-12 text-light-default dark:text-dark-default">
                  Create a New  Chemical Exclusion in Lhanlee Beauty Lounge 
                </p>
              </span>
              <div className="overflow-x-hidden grid grid-cols-[50%_50%] items-start justify-start pt-20 pb-6 gap-x-6 2xl:pr-0 md:pr-10">
                <CardImage />
                <form
                  onSubmit={formik.handleSubmit}
                  className="grid items-end justify-center w-full grid-flow-row-dense pt-20 pr-12 h-fit gap-y-4"
                >
                  <label className="block">
                    <span
                      className={`${
                        formik.touched.ingredient_name &&
                        formik.errors.ingredient_name &&
                        "text-red-600"
                      } xl:text-xl lg:text-[1rem] md:text-xs font-semibold`}
                    >
                      Chemical Name:
                    </span>
                    <input
                      type="text"
                      id="ingredient_name"
                      name="ingredient_name"
                      autoComplete="off"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.ingredient_name}
                      className={`${
                        formik.touched.ingredient_name &&
                        formik.errors.ingredient_name
                          ? "border-red-600"
                          : "border-light-default"
                      } block mb-2 ml-6 xl:text-lg lg:text-[1rem] placeholder-white border-0 border-b-2 bg-card-input  dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full`}
                      placeholder="Enter The Name"
                    />
                    {formik.touched.ingredient_name &&
                      formik.errors.ingredient_name && (
                        <div className="text-lg font-semibold text-red-600">
                          {formik.errors.ingredient_name}
                        </div>
                      )}
                  </label>

                  <label className="block">
                    <span
                      className={`${
                        formik.touched.product &&
                        formik.errors.product &&
                        "text-red-600"
                      } xl:text-xl lg:text-[1rem] md:text-xs font-semibold`}
                    >
                      Category:
                    </span>
                    <div className="grid grid-cols-3 gap-2 pt-1 ml-6">
                      {["Hands", "Hair", "Feet", "Facial", "Body", "Eyelash", ].map(
                        (style, index) => (
                          <label key={index} className="flex items-center">
                            <input
                              type="checkbox"
                              id={style}
                              name="type"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={style}
                              checked={formik.values.type.includes(style)}
                              className={`${
                                formik.touched.type && formik.errors.type
                                  ? "border-red-600"
                                  : "border-light-default"
                              } block mb-2 xl:text-lg lg:text-[1rem] placeholder-white border-0 border-b-2 bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default`}
                            />
                            <span className="ml-2 font-semibold text-light-default dark:text-dark-default">
                              {style}
                            </span>
                          </label>
                        )
                      )}
                    </div>
                  </label>

                  <span className="grid items-center justify-center">
                    <button
                      type="submit"
                      disabled={!formik.isValid}
                      className={`xl:px-6 md:px-4 font-medium capitalize rounded-lg xl:text-xl lg:text-[1rem] md:text-xs lg:text-base md:text-[.75rem] btn btn-primary text-light-default dark:text-dark-default ${
                        !formik.isValid && "opacity-50 cursor-not-allowed"
                      }`}
                    >
                      Submit
                    </button>
                  </span>
                </form>
              </div>
            </div>
          </Card>
        </>
      )}
    </>
  );
}
