import React from "react";
import { Card, CardImage } from "@components";
import { useUpdateBrandMutation, useGetBrandByIdQuery } from "@api";
import { editBrandValidation } from "@validation";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FadeLoader } from "react-spinners";
import { useFormik } from "formik";

export default function () {
  const navigate = useNavigate();

  const [updateBrand] = useUpdateBrandMutation();
  const { id } = useParams();
  const { data, isLoading } = useGetBrandByIdQuery(id);
  const brand = data?.details;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      brand_name: brand?.brand_name || "",
    },
    validationSchema: editBrandValidation,
    onSubmit: async (values) => {
      updateBrand({ id: brand._id, payload: values }).then((response) => {
        const toastProps = {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
        };
        if (response?.data?.success === true) {
          navigate("/admin/brands");
          toast.success(`${response?.data?.message}`, toastProps);
        } else
          toast.error(`${response?.error?.data?.error?.message}`, toastProps);
      });
    },
  });

  return (
    <>
      {isLoading ? (
        <div className="loader">
          <FadeLoader color="#FDA7DF" loading={true} size={50} />
        </div>
      ) : (
        <>
          <Card>
            <div className="grid w-full h-full text-light-default dark:text-dark-default">
              <span className="grid items-end md:gap-y-10 justify-center 2xl:grid-rows-[90%_10%] xl:grid-rows-[80%_20%] md:grid-rows-[75%_25%]">
                <h1 className="text-3xl font-semibold text-center">
                  Edit Brand
                </h1>
                <p className="text-xl text-center lg:px-12 text-light-default dark:text-dark-default">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Excepturi, laborum!
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
                        formik.touched.brand_name &&
                        formik.errors.brand_name &&
                        "text-red-600"
                      } xl:text-xl lg:text-[1rem] md:text-xs font-semibold`}
                    >
                      Brand Name:
                    </span>
                    <input
                      type="text"
                      id="brand_name"
                      name="brand_name"
                      autoComplete="off"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.brand_name}
                      className={`${
                        formik.touched.brand_name && formik.errors.brand_name
                          ? "border-red-600"
                          : "border-light-default"
                      } block mb-2 ml-6 xl:text-lg lg:text-[1rem] placeholder-white border-0 border-b-2 bg-card-input  dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full`}
                      placeholder="Enter The Name"
                    />
                    {formik.touched.brand_name && formik.errors.brand_name && (
                      <div className="text-lg font-semibold text-red-600">
                        {formik.errors.brand_name}
                      </div>
                    )}
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
