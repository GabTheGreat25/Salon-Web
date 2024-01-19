import React, { useState } from "react";
import { OnlineCustomerSidebar, WalkInCustomerSidebar } from "@/components";
import { useSelector } from "react-redux";
import { useGetTransactionsQuery, useCancelTransactionMutation } from "@api";
import { FadeLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { cancelScheduleValidation } from "@validation";

export default function () {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth.user);

  const isOnlineCustomer = auth?.roles?.includes("Online Customer");
  const isWalkInCustomer = auth?.roles?.includes("Walk-in Customer");

  const { data, isLoading } = useGetTransactionsQuery();

  const transactions = data?.details || [];

  const filteredTransactions = transactions.filter((transaction) => {
    const appointmentCustomerID = transaction.appointment?.customer?._id;
    const isPending = transaction?.status === "pending";

    return appointmentCustomerID === auth?._id && isPending;
  });

  const [cancelTransactionId, setCancelTransactionId] = useState("");
  const [isCancelModalOpen, setCancelModalOpen] = useState(false);
  const [selectedCancelReason, setSelectedCancelReason] = useState("");

  const [cancelTransaction] = useCancelTransactionMutation(cancelTransactionId);

  const handleCancel = (transactionId) => {
    setCancelTransactionId(transactionId);
    setCancelModalOpen(true);
  };

  const closeCancelModal = () => {
    setCancelModalOpen(false);
    setSelectedCancelReason("");
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      cancelReason: "",
    },
    validationSchema: cancelScheduleValidation,
    onSubmit: async (values) => {
      cancelTransaction({
        id: cancelTransactionId,
        payload: { ...values, status: "cancelled" },
      }).then((response) => {
        const toastProps = {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
        };
        if (response?.data?.success === true) {
          toast.success(`${response?.data?.message}`, toastProps);
        } else {
          toast.error(`${response?.error?.data?.error?.message}`, toastProps);
        }
        closeCancelModal();
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
                                    transaction.appointment.service.length
                                )
                              ]?.image[
                                Math.floor(
                                  Math.random() *
                                    transaction.appointment.service[0]?.image
                                      .length
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
                                      .length
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
                                      .length
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
                                  transaction.appointment.service.length - 1
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
                        onClick={() =>
                          navigate(
                            `${
                              isOnlineCustomer
                                ? "/onlineCustomer"
                                : "/walkInCustomer"
                            }/schedule/edit/${transaction?.appointment?._id}`
                          )
                        }
                        className="px-5 py-2 text-xl rounded-lg cursor-pointer bg-secondary-default"
                      >
                        <button>Reschedule</button>
                      </div>
                      <div
                        onClick={() => handleCancel(transaction?._id)}
                        className="px-10 py-2 text-xl rounded-lg cursor-pointer bg-secondary-default"
                      >
                        <button>Cancel</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {isCancelModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="p-8 bg-white rounded-lg">
                <h2 className="mb-4 text-2xl font-bold">Cancel Appointment</h2>
                <form onSubmit={formik.handleSubmit}>
                  <p>Select cancel reason:</p>
                  <div>
                    {[
                      "Schedule Conflict",
                      "Change Of Plans",
                      "Emergency",
                      "Travel Conflict",
                      "Personal Reasons",
                      "Others",
                    ].map((reason) => (
                      <div key={reason}>
                        <input
                          type="radio"
                          id={reason}
                          name="cancelReason"
                          value={reason}
                          checked={selectedCancelReason === reason}
                          onChange={() => {
                            setSelectedCancelReason(reason);
                            formik.setFieldValue("cancelReason", reason);
                          }}
                        />
                        <label htmlFor={reason}>{reason}</label>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <button
                      type="submit"
                      className="px-4 py-2 text-white rounded-md bg-secondary-default"
                    >
                      Confirm Cancel
                    </button>
                    <button
                      type="button"
                      onClick={closeCancelModal}
                      className="px-4 py-2 ml-2 border rounded-md border-secondary-default"
                    >
                      Cancel
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
