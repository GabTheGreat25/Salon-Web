import React, { useRef, useEffect } from "react";
import { Card, CardImage } from "@components";
import { useAddProductMutation, useGetBrandsQuery } from "@api";
import { createProductValidation } from "@validation";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FadeLoader } from "react-spinners";
import { useFormik } from "formik";
import { ImagePreview } from "@components";

export default function () {
  const isFocused = useRef(true);

  const navigate = useNavigate();

  const [addProduct, isLoading] = useAddProductMutation();
  const { data: brand, isLoading: brandLoading, refetch } = useGetBrandsQuery();

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

  const formik = useFormik({
    initialValues: {
      brand: "",
      product_name: "",
      type: "",
      ingredients: "",
      product_volume:"",
      product_consume:"",
      volume_description: "",
      isNew: false,
      image: [],
    },
    validationSchema: createProductValidation,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("brand", values?.brand);
      formData.append("product_name", values?.product_name);
      formData.append("type", values?.type);
      formData.append("ingredients", values?.ingredients);
      formData.append("product_volume", values?.product_volume);
      formData.append("product_consume", values?.product_consume);
      formData.append("volume_description", values?.volume_description);
      formData.append("isNew", values?.isNew);
      Array.from(values?.image).forEach((file) => {
        formData.append("image", file);
      });
      addProduct(formData).then((response) => {
        const toastProps = {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
        };
        if (response?.data?.success === true) {
          navigate("/admin/products");
          toast.success(`${response?.data?.message}`, toastProps);
        } else
          toast.error(`${response?.error?.data?.error?.message}`, toastProps);
      });
    },
  });


  return (
    <>
      {!isLoading || brandLoading ? (
        <div className="loader">
          <FadeLoader color="#FFB6C1" loading={true} size={50} />
        </div>
      ) : (
        <>
          <Card>
            <div className="grid w-full h-full text-light-default dark:text-dark-default">
              <span className="grid items-end md:gap-y-5 2xl:gap-y-10 justify-center 2xl:grid-rows-[90%_10%] xl:grid-rows-[80%_20%] md:grid-rows-[75%_25%]">
                <h1 className="text-3xl font-semibold text-center">
                  Product Details
                </h1>
                <p className="text-xl text-center lg:px-12 text-light-default dark:text-dark-default">
                  Create A New Product at Lhanlee Beauty Lounge
                </p>
              </span>
              <div className="overflow-x-hidden grid grid-cols-[50%_50%] items-center justify-start pt-20 pb-6 gap-x-6 2xl:pr-0 md:pr-10">
                <CardImage />
                <form
                  onSubmit={formik.handleSubmit}
                  className="grid items-end justify-center w-full h-full grid-flow-row-dense pr-12 gap-y-4"
                >
                  <label className="block">
                    <span
                      className={`${
                        formik.touched.brand &&
                        formik.errors.brand &&
                        "text-red-600"
                      } xl:text-xl md:text-[1rem] font-semibold`}
                    >
                      Brand:
                    </span>
                    <select
                      id="brand"
                      name="brand"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.brand}
                      className={` ${
                        formik.touched.brand && formik.errors.brand
                          ? "border-red-600"
                          : "border-light-default"
                      } block mb-2 ml-6 xl:text-lg md:text-[1rem] placeholder-white border-0 border-b-2 bg-card-input  dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full`}
                    >
                      <option value="" disabled>
                        Select a Brand
                      </option>
                      {brand?.details
                        ?.filter(
                          (b) =>
                            b.brand_name !== "None" && b.brand_name !== "Others"
                        )
                        ?.map((b) => (
                          <option
                            key={b?._id}
                            value={b?._id}
                            className="font-semibold text-dark-default dark:text-dark-default"
                          >
                            {b?.brand_name}
                          </option>
                        ))}
                    </select>
                    {formik.touched.brand && formik.errors.brand && (
                      <div className="text-lg font-semibold text-red-600">
                        {formik.errors.brand}
                      </div>
                    )}
                  </label>

                  <label className="block">
                    <span
                      className={`${
                        formik.touched.product_name &&
                        formik.errors.product_name &&
                        "text-red-600"
                      } xl:text-xl md:text-[1rem] font-semibold`}
                    >
                      Product Name:
                    </span>
                    <input
                      type="text"
                      id="product_name"
                      name="product_name"
                      autoComplete="off"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.product_name}
                      className={`${
                        formik.touched.product_name &&
                        formik.errors.product_name
                          ? "border-red-600"
                          : "border-light-default"
                      } block mb-2 ml-6 xl:text-lg md:text-[1rem] placeholder-white border-0 border-b-2 bg-card-input  dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full`}
                      placeholder="Enter The Name"
                    />
                    {formik.touched.product_name &&
                      formik.errors.product_name && (
                        <div className="text-lg font-semibold text-red-600">
                          {formik.errors.product_name}
                        </div>
                      )}
                  </label>
                  <label className="block">
                    <span
                      className={`${
                        formik.touched.type &&
                        formik.errors.type &&
                        "text-red-600"
                      } xl:text-xl md:text-[1rem] font-semibold`}
                    >
                      Type:
                    </span>
                    <select
                      id="type"
                      name="type"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.type}
                      className={`${
                        formik.touched.type && formik.errors.type
                          ? "border-red-600"
                          : "border-light-default"
                      } block mb-2 ml-6 xl:text-lg md:text-[1rem] placeholder-white border-0 border-b-2 bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full`}
                    >
                      <option className="text-dark-default" value="" disabled>
                        Choose Your Style
                      </option>
                      <option
                        className="text-dark-default bg-primary-default"
                        value="Hands"
                      >
                        Hands
                      </option>
                      <option
                        className="text-dark-default bg-primary-default"
                        value="Hair"
                      >
                        Hair
                      </option>
                      <option
                        className="text-dark-default bg-primary-default"
                        value="Feet"
                      >
                        Feet
                      </option>
                      <option
                        className="text-dark-default bg-primary-default"
                        value="Facial"
                      >
                        Facial
                      </option>
                      <option
                        className="text-dark-default bg-primary-default"
                        value="Body"
                      >
                        Body
                      </option>
                      <option
                        className="text-dark-default bg-primary-default"
                        value="Eyelash"
                      >
                        Eyelash
                      </option>
                    </select>
                    {formik.touched.type && formik.errors.type && (
                      <div className="text-lg font-semibold text-red-600">
                        {formik.errors.type}
                      </div>
                    )}
                  </label>

                  <label className="block">
                    <span
                      className={`${
                        formik.touched.product_volume &&
                        formik.errors.product_volume &&
                        "text-red-600"
                      } xl:text-xl md:text-[1rem] font-semibold`}
                    >
                      Product Volume:
                    </span>
                    <input
                      type="number"
                      id="product_volume"
                      name="product_volume"
                      autoComplete="off"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.product_volume}
                      className={`${
                        formik.touched.product_volume &&
                        formik.errors.product_volume
                          ? "border-red-600"
                          : "border-light-default"
                      } block mb-2 ml-6 xl:text-lg md:text-[1rem] placeholder-white border-0 border-b-2 bg-card-input  dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full`}
                      placeholder="Enter Product Volume(ml)"
                    />
                    {formik.touched.product_volume &&
                      formik.errors.product_volume && (
                        <div className="text-lg font-semibold text-red-600">
                          {formik.errors.product_volume}
                        </div>
                      )}
                  </label>

                  <label className="block">
                    <span
                      className={`${
                        formik.touched.product_consume &&
                        formik.errors.product_consume &&
                        "text-red-600"
                      } xl:text-xl md:text-[1rem] font-semibold`}
                    >
                      Consumption Amount:
                    </span>
                    <input
                      type="number"
                      id="product_consume"
                      name="product_consume"
                      autoComplete="off"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.product_consume}
                      className={`${
                        formik.touched.product_consume &&
                        formik.errors.product_consume
                          ? "border-red-600"
                          : "border-light-default"
                      } block mb-2 ml-6 xl:text-lg md:text-[1rem] placeholder-white border-0 border-b-2 bg-card-input  dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full`}
                      placeholder="Enter consumption amount (ml)"
                    />
                    {formik.touched.product_consume &&
                      formik.errors.product_consume && (
                        <div className="text-lg font-semibold text-red-600">
                          {formik.errors.product_consume}
                        </div>
                      )}
                  </label>

                  <label className="block">
                    <span
                      className={`${
                        formik.touched.volume_descripion &&
                        formik.errors.volume_descripion &&
                        "text-red-600"
                      } xl:text-xl md:text-[1rem] font-semibold`}
                    >
                      Volume Description:
                    </span>
                    <select
                      id="volume_description"
                      name="volume_description"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.volume_description}
                      className={`${
                        formik.touched.volume_description && formik.errors.volume_description
                          ? "border-red-600"
                          : "border-light-default"
                      } block mb-2 ml-6 xl:text-lg md:text-[1rem] placeholder-white border-0 border-b-2 bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full`}
                    >
                      <option className="text-dark-default" value="" disabled>
                        Describe Product Volume 
                      </option>
                      <option
                        className="text-dark-default bg-primary-default"
                        value="Milliliter"
                      >
                        Milliliter
                      </option>
                      <option
                        className="text-dark-default bg-primary-default"
                        value="Pieces"
                      >
                        Pieces
                      </option>
              
                    </select>
                    {formik.touched.volume_description && formik.errors.volume_description && (
                      <div className="text-lg font-semibold text-red-600">
                        {formik.errors.volume_description}
                      </div>
                    )}
                  </label>

                  <label className="block">
                    <span
                      className={`${
                        formik.touched.ingredients &&
                        formik.errors.ingredients &&
                        "text-red-600"
                      } font-semibold xl:text-xl md:text-[1rem]`}
                    >
                      <p>Add ingredients of the product:</p>
                    </span>
                    <textarea
                      id="ingredients"
                      name="ingredients"
                      autoComplete="off"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.ingredients}
                      placeholder="Add Ingredients Here..."
                      className="resize-none block my-4 ml-6 xl:text-xl md:text-[1rem] placeholder-white border-2 bg-card-input w-full border-light-default dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default rounded-lg"
                      rows="6"
                    ></textarea>
                    {formik.touched.ingredients &&
                      formik.errors.ingredients && (
                        <div className="text-lg font-semibold text-red-600">
                          {formik.errors.ingredients}
                        </div>
                      )}
                  </label>
                  <label className="block">
                    <span className={`xl:text-xl md:text-[1rem] font-semibold`}>
                      New Product?
                    </span>
                    <input
                      type="checkbox"
                      id="isNew"
                      name="isNew"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      checked={formik.values.isNew}
                      className="px-5 py-5 ml-6 rounded border-primary-default focus:border-primary-accent focus:ring-primary-default checked:bg-primary-default checked:dark:bg-dark-default"
                    />
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
