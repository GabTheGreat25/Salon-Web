import React, { useState, useEffect } from "react";
import { Card, CardImage } from "@components";
import {
  useUpdateTransactionMutation,
  useGetTransactionByIdQuery,
  useMayaCheckoutMutation,
} from "@api";
import { editTransactionValidation } from "@validation";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FadeLoader } from "react-spinners";
import { useFormik } from "formik";
import { useSelector } from "react-redux";

export default function () {
  const navigate = useNavigate();

  const [updateTransaction] = useUpdateTransactionMutation();
  const { id } = useParams();
  const { data, isLoading } = useGetTransactionByIdQuery(id);
  const transactions = data?.details;
  const [mayaCheckout] = useMayaCheckoutMutation();

  const user = useSelector((state) => state.auth.user);

  const [status, setStatus] = useState(transactions?.status || "pending");
  const [hasDiscount, setHasDiscount] = useState(
    transactions?.hasDiscount || false
  );

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      status: status,
      hasDiscount: transactions?.hasDiscount || hasDiscount,
      isApproved: true,
    },
    validationSchema: editTransactionValidation,
    onSubmit: async (values) => {
      updateTransaction({ id: transactions._id, payload: values }).then(
        (response) => {
          const toastProps = {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000,
          };
          if (response?.data?.success === true) {
            navigate("/admin/transactions");
            toast.success(`${response?.data?.message}`, toastProps);
            if (
              values.status === "completed" &&
              transactions.payment === "Maya"
            ) {
              mayaFormik.handleSubmit();
            }
          } else {
            toast.error(`${response?.error?.data?.error?.message}`, toastProps);
          }
        }
      );
    },
  });

  const mayaFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      discount: hasDiscount
        ? Number((transactions?.appointment?.price * 0.2).toFixed(0))
        : 0,
      contactNumber: transactions?.appointment?.customer?.contact_number,
      name: transactions?.appointment?.customer?.name,
      items: transactions?.appointment?.service?.map((service) => ({
        name: service?.service_name,
        description: service?.description,
        totalAmount: {
          value:
            service?.price +
            (transactions?.appointment?.option?.find((option) =>
              option?.service?.some((serv) => serv._id === service?._id)
            )?.extraFee || 0) -
            (transactions?.appointment?.hasAppointmentFee === true ? 150 : 0),
        },
      })),
    },
    onSubmit: async (values) => {
      mayaCheckout(values).then((response) => {
        const toastProps = {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
        };
        if (response?.data?.success === true) {
          navigate("/admin/transactions");
        } else {
          toast.error(`${response?.error?.data?.error?.message}`, toastProps);
        }
      });
    },
  });

  const handleCheckboxChange = (e) => {
    setHasDiscount(e.target.checked);
    formik.setFieldValue("hasDiscount", e.target.checked);
    formik.setFieldTouched("hasDiscount", e.target.checked);
  };

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
                  Edit Transaction
                </h1>
                <p className="text-xl text-center lg:px-12 text-light-default dark:text-dark-default">
                  Edit & Update If {transactions?.appointment?.customer?.name}{" "}
                  Is Valid For Discount
                </p>
              </span>
              <div className="overflow-x-hidden grid grid-cols-[50%_50%] items-start justify-start pt-20 pb-6 gap-x-6 2xl:pr-0 md:pr-10">
                <CardImage />
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    formik.handleSubmit();
                  }}
                  className="grid justify-center w-full grid-flow-row-dense pt-20 pr-12 h-fit gap-y-4"
                >
                  <label className="block">
                    <div className="flex items-center justify-center">
                      {transactions?.image?.map((img) => (
                        <img
                          key={img?.public_id}
                          className="rounded-full"
                          src={img?.url}
                          alt="Transaction"
                        />
                      ))}
                    </div>
                  </label>

                  {transactions?.image?.length > 0 && (
                    <label className="block pt-6">
                      <span className="xl:text-xl lg:text-[1rem] md:text-xs font-semibold">
                        Valid for Discount
                      </span>
                      <input
                        type="checkbox"
                        id="hasDiscount"
                        name="hasDiscount"
                        onChange={handleCheckboxChange}
                        checked={hasDiscount}
                        className="px-5 py-5 ml-6 rounded border-primary-default focus:border-primary-default focus:ring-primary-default checked:bg-primary-default checked:dark:bg-dark-default"
                      />
                    </label>
                  )}

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
                      onChange={(e) => setStatus(e.target.value)}
                      onBlur={formik.handleBlur}
                      value={status}
                      className={` ${
                        formik.touched.status && formik.errors.status
                          ? "border-red-600"
                          : "border-light-default"
                      } block mb-2 ml-6 xl:text-lg lg:text-[1rem] placeholder-white border-0 border-b-2 bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full`}
                    >
                      {["pending", "completed"].map((option) => (
                        <option
                          key={option}
                          value={option}
                          className={
                            "text-dark-default dark:text-light-default bg-primary-default font-semibold !important"
                          }
                        >
                          {option}
                        </option>
                      ))}
                    </select>
                  </label>

                  <span className="grid items-center justify-center py-10">
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
