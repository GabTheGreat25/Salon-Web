import React from "react";
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
  const navigate = useNavigate();

  const [addService, isLoading] = useAddServiceMutation();
  const { data: products, isLoading: productsLoading } = useGetProductsQuery();

  const handsProducts = products?.details?.filter(
    (product) => product.type === "Hands"
  );
  const hairProducts = products?.details?.filter(
    (product) => product.type === "Hair"
  );
  const feetProducts = products?.details?.filter(
    (product) => product.type === "Feet"
  );
  const faceProducts = products?.details?.filter(
    (product) => product.type === "Face"
  );
  const bodyProducts = products?.details?.filter(
    (product) => product.type === "Body"
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
      occassion: "",
      price: "",
      duration: "",
      image: [],
      product: [],
    },
    validationSchema: createServiceValidation,
    onSubmit: async (values) => {
      console.log(values);
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

  return (
    <>
      {!isLoading || productsLoading ? (
        <div className="loader">
          <FadeLoader color="#FDA7DF" loading={true} size={50} />
        </div>
      ) : (
        <>
          <Card>
            <div className="grid w-full h-full text-light-default dark:text-dark-default">
              <span className="grid items-end md:gap-y-10 justify-center 2xl:grid-rows-[90%_10%] xl:grid-rows-[80%_20%] md:grid-rows-[75%_25%]">
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
                      } xl:text-xl lg:text-[1rem] md:text-xs font-semibold`}
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
                      } block mb-2 ml-6 xl:text-lg lg:text-[1rem] placeholder-white border-0 border-b-2 bg-card-input  dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full`}
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
                      } xl:text-xl lg:text-[1rem] md:text-xs font-semibold`}
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
                      } block mb-2 ml-6 xl:text-lg lg:text-[1rem] placeholder-white border-0 border-b-2 bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full`}
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
                        value="Minimum of 2 hour"
                      >
                        Minimum of 2 hours
                      </option>
                      <option
                        className="text-dark-default"
                        value="Minimum of 3 hour"
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
                        formik.touched.product &&
                        formik.errors.product &&
                        "text-red-600"
                      } xl:text-xl lg:text-[1rem] md:text-xs font-semibold`}
                    >
                      Service Type:
                    </span>
                    <div className="grid grid-cols-3 gap-2 pt-1 ml-6">
                      {["Hands", "Hair", "Feet", "Face", "Body"].map(
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

                  <label className="block">
                    <span
                      className={`${
                        formik.touched.occassion &&
                        formik.errors.occassion &&
                        "text-red-600"
                      } xl:text-xl lg:text-[1rem] md:text-xs font-semibold`}
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
                      } block mb-2 ml-6 xl:text-lg lg:text-[1rem] placeholder-white border-0 border-b-2 bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full text-light-default dark:text-dark-default`}
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
                      } xl:text-xl lg:text-[1rem] md:text-xs font-semibold`}
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
                      } block mb-2 ml-6 xl:text-lg lg:text-[1rem] placeholder-white border-0 border-b-2 bg-card-input  dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full`}
                      placeholder="Enter The Price"
                    />
                    {formik.touched.price && formik.errors.price && (
                      <div className="text-lg font-semibold text-red-600">
                        {formik.errors.price}
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
                      Hand Products:
                    </span>
                    <div className="grid grid-cols-2 gap-2 py-2 ml-6">
                      {handsProducts?.map((product) => (
                        <label key={product?._id} className="flex items-center">
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
                              formik.touched.product && formik.errors.product
                                ? "border-red-600"
                                : "border-light-default"
                            } block mb-2 xl:text-lg lg:text-[1rem] placeholder-white border-0 border-b-2 bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default`}
                          />
                          <span className="ml-2 font-semibold text-light-default dark:text-dark-default">
                            {product?.product_name}
                          </span>
                        </label>
                      ))}
                    </div>
                    <span
                      className={`${
                        formik.touched.product &&
                        formik.errors.product &&
                        "text-red-600"
                      } xl:text-xl lg:text-[1rem] md:text-xs font-semibold`}
                    >
                      Hair Products:
                    </span>
                    <div className="grid grid-cols-2 gap-2 py-2 ml-6">
                      {hairProducts?.map((product) => (
                        <label key={product?._id} className="flex items-center">
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
                              formik.touched.product && formik.errors.product
                                ? "border-red-600"
                                : "border-light-default"
                            } block mb-2 xl:text-lg lg:text-[1rem] placeholder-white border-0 border-b-2 bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default`}
                          />
                          <span className="ml-2 font-semibold text-light-default dark:text-dark-default">
                            {product?.product_name}
                          </span>
                        </label>
                      ))}
                    </div>
                    <span
                      className={`${
                        formik.touched.product &&
                        formik.errors.product &&
                        "text-red-600"
                      } xl:text-xl lg:text-[1rem] md:text-xs font-semibold`}
                    >
                      Feet Products:
                    </span>
                    <div className="grid grid-cols-2 gap-2 py-2 ml-6">
                      {feetProducts?.map((product) => (
                        <label key={product?._id} className="flex items-center">
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
                              formik.touched.product && formik.errors.product
                                ? "border-red-600"
                                : "border-light-default"
                            } block mb-2 xl:text-lg lg:text-[1rem] placeholder-white border-0 border-b-2 bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default`}
                          />
                          <span className="ml-2 font-semibold text-light-default dark:text-dark-default">
                            {product?.product_name}
                          </span>
                        </label>
                      ))}
                    </div>
                    <span
                      className={`${
                        formik.touched.product &&
                        formik.errors.product &&
                        "text-red-600"
                      } xl:text-xl lg:text-[1rem] md:text-xs font-semibold`}
                    >
                      Face Products:
                    </span>
                    <div className="grid grid-cols-2 gap-2 py-2 ml-6">
                      {faceProducts?.map((product) => (
                        <label key={product?._id} className="flex items-center">
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
                              formik.touched.product && formik.errors.product
                                ? "border-red-600"
                                : "border-light-default"
                            } block mb-2 xl:text-lg lg:text-[1rem] placeholder-white border-0 border-b-2 bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default`}
                          />
                          <span className="ml-2 font-semibold text-light-default dark:text-dark-default">
                            {product?.product_name}
                          </span>
                        </label>
                      ))}
                    </div>
                    <span
                      className={`${
                        formik.touched.product &&
                        formik.errors.product &&
                        "text-red-600"
                      } xl:text-xl lg:text-[1rem] md:text-xs font-semibold`}
                    >
                      Body Products:
                    </span>
                    <div className="grid grid-cols-2 gap-2 py-2 ml-6">
                      {bodyProducts?.map((product) => (
                        <label key={product?._id} className="flex items-center">
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
                              formik.touched.product && formik.errors.product
                                ? "border-red-600"
                                : "border-light-default"
                            } block mb-2 xl:text-lg lg:text-[1rem] placeholder-white border-0 border-b-2 bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default`}
                          />
                          <span className="ml-2 font-semibold text-light-default dark:text-dark-default">
                            {product?.product_name}
                          </span>
                        </label>
                      ))}
                    </div>
                    {formik.touched.product && formik.errors.product && (
                      <div className="text-lg font-semibold text-red-600">
                        {formik.errors.product}
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
                      rows="5"
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
