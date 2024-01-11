import React from "react";
import { Card, CardImage } from "@components";
import {
  useUpdateDeliveryMutation,
  useGetDeliveryByIdQuery,
  useGetProductsQuery,
} from "@api";
import { editDeliveryValidation } from "@validation";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FadeLoader } from "react-spinners";
import { useFormik } from "formik";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function () {
  const isWithinRange = (date) => {
    const today = new Date();
    const endOfNextMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 2,
      0
    );

    return date >= today && date <= endOfNextMonth;
  };

  const tileDisabled = ({ date }) => {
    const today = new Date();
    const endOfNextMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 2,
      0
    );

    return date > endOfNextMonth;
  };

  const navigate = useNavigate();

  const [updateDelivery] = useUpdateDeliveryMutation();
  const { id } = useParams();
  const { data, isLoading } = useGetDeliveryByIdQuery(id);
  const deliveries = data?.details;
  const { data: products, isLoading: productsLoading } = useGetProductsQuery();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      company_name: deliveries?.company_name || "",
      date: deliveries?.date || "",
      price: deliveries?.price || "",
      status: deliveries?.status || "pending",
      quantity: deliveries?.quantity || "",
      product: deliveries?.product?.map((product) => product._id) || [],
    },
    validationSchema: editDeliveryValidation,
    onSubmit: async (values) => {
      updateDelivery({ id: deliveries._id, payload: values }).then(
        (response) => {
          const toastProps = {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000,
          };
          if (response?.data?.success === true) {
            navigate("/admin/deliveries");
            toast.success(`${response?.data?.message}`, toastProps);
          } else
            toast.error(`${response?.error?.data?.error?.message}`, toastProps);
        }
      );
    },
  });

  return (
    <>
      {isLoading || productsLoading ? (
        <div className="loader">
          <FadeLoader color="#FDA7DF" loading={true} size={50} />
        </div>
      ) : (
        <>
          <Card>
            <div className="grid w-full h-full text-light-default dark:text-dark-default">
              <span className="grid items-end md:gap-y-10 justify-center 2xl:grid-rows-[90%_10%] xl:grid-rows-[80%_20%] md:grid-rows-[75%_25%]">
                <h1 className="text-3xl font-semibold text-center">
                  Edit Delivery
                </h1>
                <p className="text-xl text-center lg:px-12 text-light-default dark:text-dark-default">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Excepturi, laborum!
                </p>
              </span>
              <div className="overflow-x-hidden grid grid-cols-[50%_50%] items-center justify-start pt-20 pb-6 gap-x-6 2xl:pr-0 md:pr-10">
                <CardImage />
                <form
                  onSubmit={formik.handleSubmit}
                  className="grid justify-center w-full h-full grid-flow-row-dense pr-12 gap-y-4"
                >
                  <label className="block">
                    <span
                      className={`${
                        formik.touched.company_name &&
                        formik.errors.company_name &&
                        "text-red-600"
                      } xl:text-xl lg:text-[1rem] md:text-xs font-semibold`}
                    >
                      Name:
                    </span>
                    <input
                      type="text"
                      id="company_name"
                      name="company_name"
                      autoComplete="off"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.company_name}
                      className={`${
                        formik.touched.company_name &&
                        formik.errors.company_name
                          ? "border-red-600"
                          : "border-light-default"
                      } block mb-2 ml-6 xl:text-lg lg:text-[1rem] placeholder-white border-0 border-b-2 bg-card-input  dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full`}
                      placeholder="Enter Your Company Name"
                    />
                    {formik.touched.company_name &&
                      formik.errors.company_name && (
                        <div className="text-lg font-semibold text-red-600">
                          {formik.errors.company_name}
                        </div>
                      )}
                  </label>
                  <label className="block">
                    <span
                      className={`${
                        formik.touched.date && formik.errors.date
                          ? "text-red-600"
                          : "xl:text-xl lg:text-[1rem] md:text-xs font-semibold"
                      }`}
                    >
                      Select Date:
                    </span>
                    <Calendar
                      onChange={(date) => {
                        formik.setFieldValue("date", date);
                      }}
                      value={formik.values.date}
                      tileDisabled={tileDisabled}
                      minDate={new Date()}
                      className={`${
                        formik.touched.date && formik.errors.date
                          ? "border-red-600"
                          : "border-light-default"
                      } block my-2 xl:text-lg lg:text-[1rem] bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-fit`}
                      tileClassName={({ date }) =>
                        isWithinRange(date)
                          ? "cursor-pointer hover:bg-primary-accent focus:bg-primary-accent active:bg-primary-accent !important"
                          : "bg-primary-default !important"
                      }
                    />
                    {formik.touched.date && formik.errors.date && (
                      <div className="text-lg font-semibold text-red-600">
                        {formik.errors.date}
                      </div>
                    )}
                  </label>
                  <label className="block">
                    <span
                      className={`${
                        formik.touched.status && formik.errors.status
                          ? "text-red-600"
                          : "xl:text-xl lg:text-[1rem] md:text-xs font-semibold"
                      }`}
                    >
                      Status:
                    </span>
                    <select
                      id="status"
                      name="status"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.status}
                      className={` ${
                        formik.touched.status && formik.errors.status
                          ? "border-red-600"
                          : "border-light-default"
                      } block mb-2 ml-6 xl:text-lg lg:text-[1rem] placeholder-white border-0 border-b-2 bg-card-input  dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full`}
                    >
                      {["pending", "completed", "cancelled"].map((option) => (
                        <option
                          key={option}
                          value={option}
                          className={
                            "text-dark-default dark:text-light-default dark:bg-dark-default font-semibold !important"
                          }
                        >
                          {option}
                        </option>
                      ))}
                    </select>
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
                        formik.touched.quantity &&
                        formik.errors.quantity &&
                        "text-red-600"
                      } xl:text-xl lg:text-[1rem] md:text-xs font-semibold`}
                    >
                      Quantity:
                    </span>
                    <input
                      type="number"
                      min="1"
                      max="10000"
                      id="quantity"
                      name="quantity"
                      autoComplete="off"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.quantity}
                      className={`${
                        formik.touched.quantity && formik.errors.quantity
                          ? "border-red-600"
                          : "border-light-default"
                      } block mb-2 ml-6 xl:text-lg lg:text-[1rem] placeholder-white border-0 border-b-2 bg-card-input  dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full`}
                      placeholder="Enter The Quantity"
                    />
                    {formik.touched.quantity && formik.errors.quantity && (
                      <div className="text-lg font-semibold text-red-600">
                        {formik.errors.quantity}
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
                      Products:
                    </span>
                    <select
                      id="product"
                      name="product"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.product}
                      className={` ${
                        formik.touched.product && formik.errors.product
                          ? "border-red-600"
                          : "border-light-default"
                      } block mb-2 ml-6 xl:text-lg lg:text-[1rem] placeholder-white border-0 border-b-2 bg-card-input  dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full`}
                      multiple
                    >
                      {products?.details?.map((product) => (
                        <option
                          key={product?._id}
                          value={product?._id}
                          className="font-semibold text-light-default dark:text-dark-default "
                        >
                          {product?.product_name}
                        </option>
                      ))}
                    </select>
                    {formik.touched.product && formik.errors.product && (
                      <div className="text-lg font-semibold text-red-600">
                        {formik.errors.product}
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