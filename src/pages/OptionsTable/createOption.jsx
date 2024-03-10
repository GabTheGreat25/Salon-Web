import React from "react";
import { Card, CardImage } from "@components";
import { useAddOptionMutation, useGetServicesQuery } from "@api";
import { createOptionValidation } from "@validation";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FadeLoader } from "react-spinners";
import { useFormik } from "formik";
import { ImagePreview } from "@components";

export default function () {
  const navigate = useNavigate();

  const [addOption, isLoading] = useAddOptionMutation();
  const { data: services, isLoading: serviceLoading } = useGetServicesQuery();

  const formik = useFormik({
    initialValues: {
      option_name: "",
      description: "",
      extraFee: "",
      service: [],
      image: [],
    },
    validationSchema: createOptionValidation,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("option_name", values?.option_name);
      formData.append("description", values?.description);
      formData.append("extraFee", values?.extraFee);
      if (Array.isArray(values?.service)) {
        values.service.forEach((item) => formData.append("service[]", item));
      } else formData.append("service", values?.service);
      Array.from(values?.image).forEach((file) => {
        formData.append("image", file);
      });
      addOption(formData).then((response) => {
        const toastProps = {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
        };
        if (response?.data?.success === true) {
          navigate("/admin/options");
          toast.success(`${response?.data?.message}`, toastProps);
        } else
          toast.error(`${response?.error?.data?.error?.message}`, toastProps);
      });
    },
  });

  return (
    <>
      {!isLoading || serviceLoading ? (
        <div className="loader">
          <FadeLoader color="#FFB6C1" loading={true} size={50} />
        </div>
      ) : (
        <>
          <Card>
            <div className="grid w-full h-full text-light-default dark:text-dark-default">
              <span className="grid items-end md:gap-y-10 justify-center 2xl:grid-rows-[90%_10%] xl:grid-rows-[80%_20%] md:grid-rows-[75%_25%]">
                <h1 className="text-3xl font-semibold text-center">
                  Create Adds On
                </h1>
                <p className="text-xl text-center lg:px-12 text-light-default dark:text-dark-default">
                  Create a New Adds on for Lhanlee Beauty Lounge Service
                </p>
              </span>
              <div className="overflow-x-hidden grid grid-cols-[50%_50%] items-center justify-start pt-20 pb-6 gap-x-6 2xl:pr-0 md:pr-10">
                <CardImage />
                <form
                  onSubmit={formik.handleSubmit}
                  className="grid justify-center w-full grid-flow-row-dense pr-12 gap-y-4"
                >
                  <label className="block">
                    <span
                      className={`${
                        formik.touched.option_name &&
                        formik.errors.option_name &&
                        "text-red-600"
                      } xl:text-xl lg:text-[1rem] md:text-xs font-semibold`}
                    >
                      Add Ons Name:
                    </span>
                    <input
                      type="text"
                      id="option_name"
                      name="option_name"
                      autoComplete="off"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.option_name}
                      className={`${
                        formik.touched.option_name && formik.errors.option_name
                          ? "border-red-600"
                          : "border-light-default"
                      } block mb-2 ml-6 xl:text-lg lg:text-[1rem] placeholder-white border-0 border-b-2 bg-card-input  dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full`}
                      placeholder="Enter Your Adds On Name"
                    />
                    {formik.touched.option_name &&
                      formik.errors.option_name && (
                        <div className="text-lg font-semibold text-red-600">
                          {formik.errors.option_name}
                        </div>
                      )}
                  </label>

                  <label className="block">
                    <span
                      className={`${
                        formik.touched.extraFee &&
                        formik.errors.extraFee &&
                        "text-red-600"
                      } xl:text-xl lg:text-[1rem] md:text-xs font-semibold`}
                    >
                      Price:
                    </span>
                    <input
                      type="number"
                      min="1"
                      max="10000"
                      id="extraFee"
                      name="extraFee"
                      autoComplete="off"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.extraFee}
                      className={`${
                        formik.touched.extraFee && formik.errors.extraFee
                          ? "border-red-600"
                          : "border-light-default"
                      } block mb-2 ml-6 xl:text-lg lg:text-[1rem] placeholder-white border-0 border-b-2 bg-card-input  dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full`}
                      placeholder="Enter price for adds on"
                    />
                    {formik.touched.extraFee && formik.errors.extraFee && (
                      <div className="text-lg font-semibold text-red-600">
                        {formik.errors.extraFee}
                      </div>
                    )}
                  </label>

                  <label className="block">
                    <span
                      className={`${
                        formik.touched.service &&
                        formik.errors.service &&
                        "text-red-600"
                      } xl:text-xl lg:text-[1rem] md:text-xs font-semibold`}
                    >
                      Service Name:
                    </span>
                    <div className="grid grid-cols-2 pt-3 ml-6 gap-x-4">
                      {services?.details?.map((s) => (
                        <label key={s?._id} className="flex items-center mb-2">
                          <input
                            type="radio"
                            name="service"
                            value={s?._id}
                            onChange={(event) => {
                              const selectedServiceId = event.target.value;
                              formik.setFieldValue("service", [
                                selectedServiceId,
                              ]);
                            }}
                            onBlur={formik.handleBlur}
                            checked={formik.values.service.includes(s?._id)}
                            className={`${
                              formik.touched.type && formik.errors.type
                                ? "border-red-600"
                                : "border-light-default"
                            } mr-2 block xl:text-lg lg:text-[1rem] placeholder-white bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default`}
                          />
                          {s?.service_name}
                        </label>
                      ))}
                    </div>
                    {formik.touched.service && formik.errors.service && (
                      <div className="ml-6 text-lg font-semibold text-red-600">
                        {formik.errors.service}
                      </div>
                    )}
                  </label>

                  <label className="block">
                    <span
                      className={`${
                        formik.touched.description &&
                        formik.errors.description &&
                        "text-red-600"
                      } xl:text-xl lg:text-[1rem] md:text-xs font-semibold`}
                    >
                      Description:
                    </span>
                    <textarea
                      id="description"
                      name="description"
                      autoComplete="off"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.description}
                      rows="8"
                      className={`${
                        formik.touched.description && formik.errors.description
                          ? "border-red-600"
                          : "border-light-default"
                      } block my-2 ml-6 resize-none xl:text-lg lg:text-[1rem] placeholder-white border-2 bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full rounded-lg`}
                      placeholder="Enter The Description"
                    />
                    {formik.touched.description &&
                      formik.errors.description && (
                        <div className="text-lg font-semibold text-red-600">
                          {formik.errors.description}
                        </div>
                      )}
                  </label>

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
