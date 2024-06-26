import React, { useState, useRef, useEffect } from "react";
import { CustomerSidebar } from "@/components";
import { useGetTransactionsQuery } from "@api";
import { FadeLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { reasonSlice } from "@reason";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import { rebookCustomerValidation } from "@validation";

export default function () {
  const isFocused = useRef(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth.user);

  const { data, isLoading, refetch } = useGetTransactionsQuery();
  const transactions = data?.details || [];

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

  const filteredTransactions = transactions.filter((transaction) => {
    const appointmentCustomerID = transaction.appointment?.customer?._id;
    const isPending = transaction?.status === "pending";
    return appointmentCustomerID === auth?._id && isPending;
  });

  const [isCancelModalOpen, setCancelModalOpen] = useState(false);
  const [selectedCancelReason, setSelectedCancelReason] = useState("");
  const [editedTransactionId, setEditedTransactionId] = useState(null);

  const formik = useFormik({
    initialValues: {
      rebookReason: "",
      messageReason: "",
    },
    validationSchema: rebookCustomerValidation,
    onSubmit: (values) => {
      dispatch(
        reasonSlice.actions.reasonForm({
          rebookReason: values.rebookReason,
          messageReason: values.messageReason,
        })
      );
      setSelectedCancelReason("");
      setCancelModalOpen(false);

      navigate(`/customer/schedule/edit/${editedTransactionId}`);
    },
  });

  const handleReason = (transactionId) => {
    const today = new Date();
    today.setDate(today.getDate() + 1);

    const selectedTransaction = transactions.find(
      (transaction) => transaction.appointment?._id === transactionId
    );

    const appointmentDate = new Date(selectedTransaction?.appointment?.date);
    const rescheduleDate = new Date(today);
    rescheduleDate.setDate(today.getDate() + 3);

    const formattedAppointmentDate = appointmentDate
      .toISOString()
      .split("T")[0];
    const formattedRescheduleDate = rescheduleDate.toISOString().split("T")[0];

    if (formattedAppointmentDate >= formattedRescheduleDate) {
      setEditedTransactionId(transactionId);
      setCancelModalOpen(true);
    } else toast.error("You cannot reschedule within the next 3 days.");
  };

  const closeCancelModal = () => {
    setCancelModalOpen(false);
    setSelectedCancelReason("");
  };

  useEffect(() => {
    if (isCancelModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isCancelModalOpen]);

  return (
    <>
      {isLoading ? (
        <div className="loader">
          <FadeLoader color="#FFB6C1" loading={true} size={50} />
        </div>
      ) : (
        <>
          <div className="flex h-full">
            <CustomerSidebar />
            <div className="grid items-center flex-1 w-full h-full grid-flow-row-dense mx-20 my-10 gap-y-8 ">
              {filteredTransactions?.map((transaction) => (
                <div
                  key={transaction?._id}
                  className="flex items-center w-full h-full px-8 py-6 rounded-lg bg-primary-t3"
                >
                  <div className="flex-grow">
                    <div className="grid grid-flow-col-dense">
                      <h2 className="pb-2 font-sans font-semibold lg:text-2xl md:text-base">
                        {`Lhanlee Salon | ${
                          transaction?.appointment?.date
                            ? new Date(transaction.appointment.date)
                                .toISOString()
                                .split("T")[0]
                            : ""
                        } at ${
                          transaction?.appointment?.time?.length > 0
                            ? transaction.appointment.time.length === 1
                              ? `${transaction?.appointment?.time[0]}`
                              : `${transaction?.appointment?.time[0]} to ${
                                  transaction?.appointment?.time[
                                    transaction?.appointment?.time.length - 1
                                  ]
                                }`
                            : ""
                        }`}
                      </h2>
                      <div className="grid items-center justify-end">
                        <h1 className="rounded-2xl px-2 py-[.1rem] lg:text-lg md:text-sm bg-dark-default text-light-default dark:bg-light-default dark:text-dark-default">
                          {transaction?.status}
                        </h1>
                      </div>
                    </div>
                    <hr className="mb-4 border-t border-dark-default dark:border-light-default" />
                    <div className="grid grid-cols-2 px-8">
                      <div className="grid xl:grid-cols-[25%_75%] md:grid-cols-[30%_70%] gap-x-2">
                        <div className="grid items-center justify-center">
                          <img
                            src={
                              transaction.appointment.service[
                                Math.floor(
                                  Math.random() *
                                    transaction.appointment.service?.length
                                )
                              ]?.image[
                                Math.floor(
                                  Math.random() *
                                    transaction.appointment.service[0]?.image
                                      ?.length
                                )
                              ]?.url
                            }
                            alt={
                              transaction.appointment.service[
                                Math.floor(
                                  Math.random() *
                                    transaction.appointment.service.length
                                )
                              ]?.image[
                                Math.floor(
                                  Math.random() *
                                    transaction.appointment.service[0]?.image
                                      ?.length
                                )
                              ]?.originalname
                            }
                            key={
                              transaction.appointment.service[
                                Math.floor(
                                  Math.random() *
                                    transaction.appointment.service.length
                                )
                              ]?.image[
                                Math.floor(
                                  Math.random() *
                                    transaction.appointment.service[0]?.image
                                      ?.length
                                )
                              ]?.public_id
                            }
                            className="object-cover 2xl:w-32 xl:w-28 xl:h-24 lg:w-20 lg:h-16 2xl:h-32 md:w-16 md:h-14 rounded-2xl"
                          />
                        </div>
                        <div>
                          <div className="grid grid-flow-row">
                            <h3 className="font-semibold xl:text-xl lg:text-lg md:text-base">
                              {transaction?.name}
                            </h3>
                            <p className="font-semibold xl:text-lg lg:text-base md:text-sm">
                              Services:{" "}
                              {transaction?.appointment?.service?.map(
                                (service, index) =>
                                  service?.service_name +
                                  (index <
                                  transaction.appointment.service?.length - 1
                                    ? ", "
                                    : "")
                              )}
                            </p>
                            <p className="font-semibold xl:text-lg lg:text-base md:text-sm">
                              AddOns:{" "}
                              {transaction?.appointment?.option?.length > 0
                                ? transaction.appointment.option.map(
                                    (service, index) => (
                                      <React.Fragment key={index}>
                                        {service?.option_name}
                                        {index <
                                        transaction.appointment.option.length -
                                          1
                                          ? ", "
                                          : ""}
                                      </React.Fragment>
                                    )
                                  )
                                : "None"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr className="my-4 border-t border-dark-default dark:border-light-default" />
                    <div className="grid justify-end gap-x-4">
                      <h1 className="text-xl">
                        Service Total:
                        <span className="pl-2 font-semibold">
                          ₱{transaction?.appointment?.price.toFixed(0)}
                        </span>
                      </h1>
                    </div>
                    <div className="grid items-center justify-end grid-flow-col-dense pt-5 gap-x-4">
                      <div
                        onClick={() => {
                          if (
                            transaction?.appointment?.isRescheduled === true
                          ) {
                            toast.warning(
                              "You cannot reschedule because you already edited the appointment."
                            );
                          } else {
                            handleReason(transaction?.appointment?._id);
                          }
                        }}
                        className={`px-5 py-2 text-xl rounded-lg cursor-pointer ${
                          transaction?.appointment?.hasAppointmentFee === true
                            ? "bg-primary-default hover:bg-primary-accent"
                            : ""
                        }`}
                      >
                        {transaction?.appointment?.hasAppointmentFee ===
                        true ? (
                          <button>
                            {transaction?.appointment?.isRescheduled === true
                              ? "Already Rescheduled"
                              : "Reschedule"}
                          </button>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {isCancelModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-opacity-60 bg-neutral-primary">
              <div className="p-12 rounded-lg bg-light-default dark:bg-dark-default">
                <h2 className="mb-4 text-2xl font-bold">
                  Reschedule Appointment
                </h2>
                <form onSubmit={formik.handleSubmit}>
                  <p
                    className={`${
                      formik.touched.rebookReason &&
                      formik.errors.rebookReason &&
                      "text-red-600"
                    } pb-2 font-semibold xl:text-xl md:text-[1rem]`}
                  >
                    Select reschedule reason:
                  </p>
                  <div>
                    {[
                      "Schedule Conflict",
                      "Change Of Plans",
                      "Emergency",
                      "Travel Conflict",
                      "Personal Reasons",
                      "Others",
                    ].map((reason) => (
                      <div key={reason} className="py-1">
                        <input
                          type="radio"
                          id={reason}
                          name="rebookReason"
                          value={reason}
                          checked={selectedCancelReason === reason}
                          onChange={() => {
                            setSelectedCancelReason(reason);
                            formik.setFieldValue("rebookReason", reason);
                          }}
                          className="border-primary-t3 focus:border-primary-t3 focus:ring-primary-t3 checked:bg-primary-t3 "
                        />
                        <label htmlFor={reason} className="pl-2">
                          {reason}
                        </label>
                      </div>
                    ))}
                    {formik.touched.rebookReason &&
                      formik.errors.rebookReason && (
                        <div className="pb-2 text-lg font-semibold text-red-600">
                          {formik.errors.rebookReason}
                        </div>
                      )}
                  </div>
                  <div>
                    <label className="block">
                      <span
                        className={`${
                          formik.touched.messageReason &&
                          formik.errors.messageReason &&
                          "text-red-600"
                        } font-semibold`}
                      >
                        <p className="pb-1 xl:text-xl md:text-[1rem]">
                          Reason for Rescheduling
                        </p>
                      </span>
                      <textarea
                        id="messageReason"
                        name="messageReason"
                        autoComplete="off"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.messageReason}
                        placeholder="Reason for Reschedule"
                        className="resize-none block my-4 xl:text-xl md:text-[1rem] placeholder-black border-2 bg-card-input w-full border-dark-default dark:border-light-default focus:ring-0 focus:border-primary-default focus:dark:focus:border-primary-default dark:placeholder-dark-default rounded-lg"
                        rows="8"
                      ></textarea>
                      {formik.touched.messageReason &&
                        formik.errors.messageReason && (
                          <div className="text-lg font-semibold text-red-600">
                            {formik.errors.messageReason}
                          </div>
                        )}
                    </label>
                  </div>
                  <div className="grid items-center justify-center grid-flow-col-dense mt-4">
                    <button
                      type="submit"
                      className="px-4 py-2 font-semibold rounded-md bg-primary-default hover:bg-primary-accent"
                    >
                      Confirm
                    </button>
                    <button
                      type="button"
                      onClick={closeCancelModal}
                      className="px-4 py-2 ml-2 font-semibold border rounded-md border-primary-default hover:bg-primary-accent"
                    >
                      Close
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
