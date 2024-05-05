import React, { useRef, useEffect } from "react";
import { Card, CardImage } from "@components";
import { useAddServiceMutation, useGetProductsQuery } from "@api";
import { createServiceValidation } from "@validation";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FadeLoader } from "react-spinners";
import { useFormik } from "formik";
import { ImagePreview } from "@components";

export default function () {
  const isFocused = useRef(true);

  const navigate = useNavigate();

  const [addService, isLoading] = useAddServiceMutation();
  const {
    data: products,
    isLoading: productsLoading,
    refetch,
  } = useGetProductsQuery();

  const filteredProducts = products?.details?.filter((product) => product.quantity > 0);

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

  const handsProducts = filteredProducts?.filter((product) =>
    product.type.includes("Hands")
  );
  const hairProducts = filteredProducts?.filter((product) =>
    product.type.includes("Hair")
  );
  const feetProducts =filteredProducts?.filter((product) =>
    product.type.includes("Feet")
  );
  const faceProducts = filteredProducts?.filter((product) =>
    product.type.includes("Facial")
  );
  const bodyProducts = filteredProducts?.filter((product) =>
    product.type.includes("Body")
  );
  const eyeLashProducts = filteredProducts?.filter((product) =>
    product.type.includes("Eyelash")
  );

  const convertToServerFormat = (userInput) => {
    const [hours] = userInput.split(":");
    return hours.trim();
  };

  const formik = useFormik({
    initialValues: {
      service_name: "",
      description: "",
      type: [],
      occassion: "None",
      price: "",
      duration: "",
      warranty: "",
      image: [],
      product: [],
    },
    validationSchema: createServiceValidation,
    onSubmit: async (values) => {
      const formData = new FormData();
      const formattedDuration = convertToServerFormat(values?.duration);

      formData.append("service_name", values?.service_name);
      formData.append("description", values?.description);
      if (Array.isArray(values?.type)) {
        values.type.forEach((item) => formData.append("type[]", item));
      } else formData.append("type", values?.type);
      formData.append("occassion", values?.occassion);
      formData.append("price", values?.price);
      formData.append("duration", formattedDuration);
      formData.append("warranty", values?.warranty);
      if (Array.isArray(values?.product)) {
        values.product.forEach((item) => formData.append("product[]", item));
      } else formData.append("product", values?.product);
      Array.from(values?.image).forEach((file) => {
        formData.append("image", file);
      });
      addService(formData).then((response) => {
        const toastProps = {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
        };
        if (response?.data?.success === true) {
          navigate("/admin/services");
          toast.success(`${response?.data?.message}`, toastProps);
        } else
          toast.error(`${response?.error?.data?.error?.message}`, toastProps);
      });
    },
  });

  const categories = formik?.values?.type;

  return (
    <>
      {!isLoading || productsLoading ? (
        <div className="loader">
          <FadeLoader color="#FFB6C1" loading={true} size={50} />
        </div>
      ) : (
        <>
          <Card>
            <div className="grid w-full h-full text-light-default dark:text-dark-default">
              <span className="grid items-end md:gap-y-5 2xl:gap-y-10 justify-center 2xl:grid-rows-[90%_10%] xl:grid-rows-[80%_20%] md:grid-rows-[75%_25%]">
                <h1 className="text-3xl font-semibold text-center">
                  Create Service
                </h1>
                <p className="text-xl text-center lg:px-12 text-light-default dark:text-dark-default">
                  Create a New Lhanlee Beauty Lounge Service
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
                        formik.touched.service_name &&
                        formik.errors.service_name &&
                        "text-red-600"
                      } xl:text-xl md:text-[1rem] font-semibold`}
                    >
                      Service Name:
                    </span>
                    <input
                      type="text"
                      id="service_name"
                      name="service_name"
                      autoComplete="off"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.service_name}
                      className={`${
                        formik.touched.service_name &&
                        formik.errors.service_name
                          ? "border-red-600"
                          : "border-light-default"
                      } block mb-2 ml-6 xl:text-lg md:text-[1rem] placeholder-white border-0 border-b-2 bg-card-input  dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full`}
                      placeholder="Enter Your Service Name"
                    />
                    {formik.touched.service_name &&
                      formik.errors.service_name && (
                        <div className="text-lg font-semibold text-red-600">
                          {formik.errors.service_name}
                        </div>
                      )}
                  </label>
                  <label className="block">
                    <span
                      className={`${
                        formik.touched.duration &&
                        formik.errors.duration &&
                        "text-red-600"
                      } xl:text-xl md:text-[1rem] font-semibold`}
                    >
                      Service Duration:
                    </span>
                    <select
                      id="duration"
                      name="duration"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.duration}
                      className={`${
                        formik.touched.duration && formik.errors.duration
                          ? "border-red-600"
                          : "border-light-default"
                      } block mb-2 ml-6 xl:text-lg md:text-[1rem] placeholder-white border-0 border-b-2 bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full`}
                    >
                      <option value="">Select Duration</option>
                      <option
                        className="text-dark-default"
                        value="Minimum of 30 minutes"
                      >
                        Minimum of 30 minutes
                      </option>
                      <option
                        className="text-dark-default"
                        value="Minimum of 1 hour"
                      >
                        Minimum of 1 hour
                      </option>
                      <option
                        className="text-dark-default"
                        value="Minimum of 2 hours"
                      >
                        Minimum of 2 hours
                      </option>
                      <option
                        className="text-dark-default"
                        value="Minimum of 3 hours"
                      >
                        Minimum of 3 hours
                      </option>
                    </select>
                    {formik.touched.duration && formik.errors.duration && (
                      <div className="text-lg font-semibold text-red-600">
                        {formik.errors.duration}
                      </div>
                    )}
                  </label>

                  <label className="block">
                    <span
                      className={`${
                        formik.touched.warranty &&
                        formik.errors.warranty &&
                        "text-red-600"
                      } xl:text-xl md:text-[1rem] font-semibold`}
                    >
                      Service Warranty:
                    </span>
                    <select
                      id="warranty"
                      name="warranty"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.warranty}
                      className={`${
                        formik.touched.warranty && formik.errors.warranty
                          ? "border-red-600"
                          : "border-light-default"
                      } block mb-2 ml-6 xl:text-lg md:text-[1rem] placeholder-white border-0 border-b-2 bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full`}
                    >
                      <option value="">Select Warranty</option>
                      <option className="text-dark-default" value="1 day">
                        1 day
                      </option>
                      <option className="text-dark-default" value="3 days">
                        3 days
                      </option>
                      <option className="text-dark-default" value="5 days">
                        5 days
                      </option>
                      <option className="text-dark-default" value="1 week">
                        1 week
                      </option>
                      <option className="text-dark-default" value="2 weeks">
                        2 weeks
                      </option>
                      <option className="text-dark-default" value="3 weeks">
                        3 weeks
                      </option>
                      <option className="text-dark-default" value="1 month">
                        1 month
                      </option>
                    </select>
                    {formik.touched.warranty && formik.errors.warranty && (
                      <div className="text-lg font-semibold text-red-600">
                        {formik.errors.warranty}
                      </div>
                    )}
                  </label>

                  <label className="block">
                    <span
                      className={`${
                        formik.touched.product &&
                        formik.errors.product &&
                        "text-red-600"
                      } xl:text-xl md:text-[1rem] font-semibold`}
                    >
                      Service Type:
                    </span>
                    <div className="grid gap-2 pt-1 ml-6 xl:grid-cols-3 md:grid-cols-2">
                      {[
                        "Hands",
                        "Hair",
                        "Feet",
                        "Facial",
                        "Body",
                        "Eyelash",
                      ].map((style, index) => (
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
                            } block mb-2 xl:text-lg md:text-[1rem] placeholder-white border-0 border-b-2 bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default`}
                          />
                          <span className="ml-2 font-semibold text-light-default dark:text-dark-default">
                            {style}
                          </span>
                        </label>
                      ))}
                    </div>
                  </label>

                  <label className="block">
                    <span
                      className={`${
                        formik.touched.occassion &&
                        formik.errors.occassion &&
                        "text-red-600"
                      } xl:text-xl md:text-[1rem] font-semibold`}
                    >
                      Occasion:
                    </span>
                    <select
                      id="occassion"
                      name="occassion"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.occassion}
                      className={`${
                        formik.touched.occassion && formik.errors.occassion
                          ? "border-red-600"
                          : "border-light-default"
                      } block mb-2 ml-6 xl:text-lg md:text-[1rem] placeholder-white border-0 border-b-2 bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full text-light-default dark:text-dark-default`}
                    >
                      <option value="None">None</option>
                      <option
                        className="text-dark-default bg-primary-default"
                        value="Graduation"
                      >
                        Graduation
                      </option>
                      <option
                        className="text-dark-default bg-primary-default"
                        value="Js Prom"
                      >
                        Js Prom
                      </option>
                      <option
                        className="text-dark-default bg-primary-default"
                        value="Halloween"
                      >
                        Halloween
                      </option>
                      <option
                        className="text-dark-default bg-primary-default"
                        value="Christmas"
                      >
                        Christmas
                      </option>
                      <option
                        className="text-dark-default bg-primary-default"
                        value="Valentines"
                      >
                        Valentines
                      </option>
                      <option
                        className="text-dark-default bg-primary-default"
                        value="Wedding"
                      >
                        Wedding
                      </option>
                      <option
                        className="text-dark-default bg-primary-default"
                        value="New Year"
                      >
                        New Year
                      </option>
                      <option
                        className="text-dark-default bg-primary-default"
                        value="Birthday"
                      >
                        Birthday
                      </option>
                    </select>
                    {formik.touched.occassion && formik.errors.occassion && (
                      <div className="text-lg font-semibold text-red-600">
                        {formik.errors.occassion}
                      </div>
                    )}
                  </label>

                  <label className="block">
                    <span
                      className={`${
                        formik.touched.price &&
                        formik.errors.price &&
                        "text-red-600"
                      } xl:text-xl md:text-[1rem] font-semibold`}
                    >
                      Price:
                    </span>
                    <input
                      type="number"
                      min="1"
                      max="10000"
                      id="price"
                      name="price"
                      autoComplete="off"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.price}
                      className={`${
                        formik.touched.price && formik.errors.price
                          ? "border-red-600"
                          : "border-light-default"
                      } block mb-2 ml-6 xl:text-lg md:text-[1rem] placeholder-white border-0 border-b-2 bg-card-input  dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full`}
                      placeholder="Enter The Price"
                    />
                    {formik.touched.price && formik.errors.price && (
                      <div className="text-lg font-semibold text-red-600">
                        {formik.errors.price}
                      </div>
                    )}
                  </label>

                  <label className="block">
                    {categories.includes("Hands") ? (
                      <>
                        {" "}
                        <span
                          className={`${
                            formik.touched.product &&
                            formik.errors.product &&
                            "text-red-600"
                          } xl:text-xl md:text-[1rem] font-semibold`}
                        >
                          Hand Products:
                        </span>
                        <div className="grid grid-cols-2 gap-2 py-2 ml-6">
                          {handsProducts?.map((product) => (
                            <label
                              key={product?._id}
                              className="flex items-center"
                            >
                              <input
                                type="checkbox"
                                id={product?._id}
                                name="product"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={product?._id}
                                checked={formik.values.product.includes(
                                  product?._id
                                )}
                                className={` ${
                                  formik.touched.product &&
                                  formik.errors.product
                                    ? "border-red-600"
                                    : "border-light-default"
                                } block mb-2 xl:text-lg md:text-[1rem] placeholder-white border-0 border-b-2 bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default`}
                              />
                              <span className="ml-2 font-semibold text-light-default dark:text-dark-default">
                                {product?.product_name}
                              </span>
                            </label>
                          ))}
                        </div>
                      </>
                    ) : (
                      ""
                    )}

                    {categories.includes("Hair") ? (
                      <>
                        <span
                          className={`${
                            formik.touched.product &&
                            formik.errors.product &&
                            "text-red-600"
                          } xl:text-xl md:text-[1rem] font-semibold`}
                        >
                          Hair Products:
                        </span>
                        <div className="grid grid-cols-2 gap-2 py-2 ml-6">
                          {hairProducts?.map((product) => (
                            <label
                              key={product?._id}
                              className="flex items-center"
                            >
                              <input
                                type="checkbox"
                                id={product?._id}
                                name="product"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={product?._id}
                                checked={formik.values.product.includes(
                                  product?._id
                                )}
                                className={` ${
                                  formik.touched.product &&
                                  formik.errors.product
                                    ? "border-red-600"
                                    : "border-light-default"
                                } block mb-2 xl:text-lg md:text-[1rem] placeholder-white border-0 border-b-2 bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default`}
                              />
                              <span className="ml-2 font-semibold text-light-default dark:text-dark-default">
                                {product?.product_name}
                              </span>
                            </label>
                          ))}
                        </div>
                      </>
                    ) : (
                      ""
                    )}
                    {categories.includes("Feet") ? (
                      <>
                        {" "}
                        <span
                          className={`${
                            formik.touched.product &&
                            formik.errors.product &&
                            "text-red-600"
                          } xl:text-xl md:text-[1rem] font-semibold`}
                        >
                          Feet Products:
                        </span>
                        <div className="grid grid-cols-2 gap-2 py-2 ml-6">
                          {feetProducts?.map((product) => (
                            <label
                              key={product?._id}
                              className="flex items-center"
                            >
                              <input
                                type="checkbox"
                                id={product?._id}
                                name="product"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={product?._id}
                                checked={formik.values.product.includes(
                                  product?._id
                                )}
                                className={` ${
                                  formik.touched.product &&
                                  formik.errors.product
                                    ? "border-red-600"
                                    : "border-light-default"
                                } block mb-2 xl:text-lg md:text-[1rem] placeholder-white border-0 border-b-2 bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default`}
                              />
                              <span className="ml-2 font-semibold text-light-default dark:text-dark-default">
                                {product?.product_name}
                              </span>
                            </label>
                          ))}
                        </div>{" "}
                      </>
                    ) : (
                      ""
                    )}
                    {categories.includes("Facial") ? (
                      <>
                        {" "}
                        <span
                          className={`${
                            formik.touched.product &&
                            formik.errors.product &&
                            "text-red-600"
                          } xl:text-xl md:text-[1rem] font-semibold`}
                        >
                          Facial Products:
                        </span>
                        <div className="grid grid-cols-2 gap-2 py-2 ml-6">
                          {faceProducts?.map((product) => (
                            <label
                              key={product?._id}
                              className="flex items-center"
                            >
                              <input
                                type="checkbox"
                                id={product?._id}
                                name="product"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={product?._id}
                                checked={formik.values.product.includes(
                                  product?._id
                                )}
                                className={` ${
                                  formik.touched.product &&
                                  formik.errors.product
                                    ? "border-red-600"
                                    : "border-light-default"
                                } block mb-2 xl:text-lg md:text-[1rem] placeholder-white border-0 border-b-2 bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default`}
                              />
                              <span className="ml-2 font-semibold text-light-default dark:text-dark-default">
                                {product?.product_name}
                              </span>
                            </label>
                          ))}
                        </div>
                      </>
                    ) : (
                      ""
                    )}
                    {categories.includes("Body") ? (
                      <>
                        {" "}
                        <span
                          className={`${
                            formik.touched.product &&
                            formik.errors.product &&
                            "text-red-600"
                          } xl:text-xl md:text-[1rem] font-semibold`}
                        >
                          Body Products:
                        </span>
                        <div className="grid grid-cols-2 gap-2 py-2 ml-6">
                          {bodyProducts?.map((product) => (
                            <label
                              key={product?._id}
                              className="flex items-center"
                            >
                              <input
                                type="checkbox"
                                id={product?._id}
                                name="product"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={product?._id}
                                checked={formik.values.product.includes(
                                  product?._id
                                )}
                                className={` ${
                                  formik.touched.product &&
                                  formik.errors.product
                                    ? "border-red-600"
                                    : "border-light-default"
                                } block mb-2 xl:text-lg md:text-[1rem] placeholder-white border-0 border-b-2 bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default`}
                              />
                              <span className="ml-2 font-semibold text-light-default dark:text-dark-default">
                                {product?.product_name}
                              </span>
                            </label>
                          ))}
                        </div>
                      </>
                    ) : (
                      ""
                    )}
                    {categories.includes("Eyelash") ? (
                      <>
                        {" "}
                        <span
                          className={`${
                            formik.touched.product &&
                            formik.errors.product &&
                            "text-red-600"
                          } xl:text-xl md:text-[1rem] font-semibold`}
                        >
                          Eyelash Products:
                        </span>
                        <div className="grid grid-cols-2 gap-2 py-2 ml-6">
                          {eyeLashProducts?.map((product) => (
                            <label
                              key={product?._id}
                              className="flex items-center"
                            >
                              <input
                                type="checkbox"
                                id={product?._id}
                                name="product"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={product?._id}
                                checked={formik.values.product.includes(
                                  product?._id
                                )}
                                className={` ${
                                  formik.touched.product &&
                                  formik.errors.product
                                    ? "border-red-600"
                                    : "border-light-default"
                                } block mb-2 xl:text-lg md:text-[1rem] placeholder-white border-0 border-b-2 bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default`}
                              />
                              <span className="ml-2 font-semibold text-light-default dark:text-dark-default">
                                {product?.product_name}
                              </span>
                            </label>
                          ))}
                        </div>
                      </>
                    ) : (
                      ""
                    )}
                  </label>

                  <label className="block">
                    <span
                      className={`${
                        formik.touched.description &&
                        formik.errors.description &&
                        "text-red-600"
                      } xl:text-xl md:text-[1rem] font-semibold`}
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
                      rows="5"
                      className={`${
                        formik.touched.description && formik.errors.description
                          ? "border-red-600"
                          : "border-light-default"
                      } block my-2 ml-6 resize-none xl:text-lg md:text-[1rem] placeholder-white border-2 bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full rounded-lg`}
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
                    <span className={`xl:text-xl md:text-[1rem] font-semibold`}>
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
                      } block pt-3 mb-2 ml-6 xl:text-xl md:text-[1rem] w-full`}
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
                      className={`xl:px-6 md:px-4 font-medium capitalize rounded-lg xl:text-xl lg:text-base md:text-[1rem]  btn btn-primary text-light-default dark:text-dark-default ${
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
