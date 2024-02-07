import React, { useState, useEffect } from "react";
import { OnlineCustomerSidebar, WalkInCustomerSidebar } from "@/components";
import { useSelector } from "react-redux";
import { useGetTransactionsQuery } from "@api";
import { FadeLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { reasonSlice } from "@reason";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";

export default function () {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth.user);
  const count = useSelector((state) => state.count);

  const isOnlineCustomer = auth?.roles?.includes("Online Customer");
  const isWalkInCustomer = auth?.roles?.includes("Walk-in Customer");

  const { data, isLoading } = useGetTransactionsQuery();
  const transactions = data?.details || [];

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
    onSubmit: (values) => {
      dispatch(
        reasonSlice.actions.reasonForm({
          rebookReason: values.rebookReason,
          messageReason: values.messageReason,
        })
      );
      setSelectedCancelReason("");
      setCancelModalOpen(false);

      navigate(
        `${
          isOnlineCustomer ? "/onlineCustomer" : "/walkInCustomer"
        }/schedule/edit/${editedTransactionId}`
      );
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
          <FadeLoader color="#FDA7DF" loading={true} size={50} />
        </div>
      ) : (
        <>
          <div className="flex h-full">
            {isOnlineCustomer ? (
              <OnlineCustomerSidebar />
            ) : isWalkInCustomer ? (
              <WalkInCustomerSidebar />
            ) : null}
            <div className="grid items-center flex-1 w-full h-full grid-flow-row-dense mx-20 my-10 gap-y-8 ">
              {filteredTransactions?.map((transaction) => (
                <div
                  key={transaction?._id}
                  className="flex items-center w-full h-full px-8 py-6 rounded-lg bg-primary-default"
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
                        } at
                         ${transaction?.appointment?.time || ""}`}
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
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr className="my-4 border-t border-dark-default dark:border-light-default" />
                    <div className="grid justify-end gap-x-4">
                      <h1 className="text-xl">
                        Service Total:
                        <span className="pl-2 font-semibold">
                          ₱{transaction?.appointment?.price}
                        </span>
                      </h1>
                    </div>
                    <div className="grid items-center justify-end grid-flow-col-dense pt-5 gap-x-4">
                      <div
                        onClick={() => {
                          if (
                            count?.countData?.editedTransactionIds?.includes(
                              transaction?.appointment?._id
                            )
                          ) {
                            toast.error(
                              "You cannot reschedule because you already edited the appointment."
                            );
                          } else handleReason(transaction?.appointment?._id);
                        }}
                        className={`px-5 py-2 text-xl rounded-lg cursor-pointer bg-secondary-default`}
                      >
                        {isWalkInCustomer ? (
                          <button>
                            {count?.countData?.editedTransactionIds?.includes(
                              transaction?.appointment?._id
                            )
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
              <div className="p-8 rounded-lg bg-light-default dark:bg-dark-default">
                <h2 className="mb-4 text-2xl font-bold">
                  Reschedule Appointment
                </h2>
                <form onSubmit={formik.handleSubmit}>
                  <p className="pb-2">Select reschedule reason:</p>
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
                          className="border-primary-default focus:border-primary-default focus:ring-primary-default checked:bg-primary-default "
                        />
                        <label htmlFor={reason} className="pl-2">
                          {reason}
                        </label>
                      </div>
                    ))}
                  </div>
                  <div>
                    <label className="block">
                      <span
                        className={`${
                          formik.touched.messageReason &&
                          formik.errors.messageReason &&
                          "text-red-600"
                        } font-semibold xl:text-xl lg:text-[.8rem] md:text-[.55rem]`}
                      >
                        <p>Reason for Rescheduling</p>
                      </span>
                      <textarea
                        id="messageReason"
                        name="messageReason"
                        autoComplete="off"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.messageReason}
                        placeholder="Reason for Reschedule"
                        className="resize-none block my-4 xl:text-xl lg:text-[1rem] md:text-sm placeholder-black border-2 bg-card-input w-full border-dark-default dark:border-light-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default rounded-lg"
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
                      className="px-4 py-2 font-semibold rounded-md bg-secondary-default"
                    >
                      Confirm
                    </button>
                    <button
                      type="button"
                      onClick={closeCancelModal}
                      className="px-4 py-2 ml-2 font-semibold border rounded-md border-secondary-default"
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
