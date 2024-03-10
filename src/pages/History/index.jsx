import React from "react";
import { CustomerSidebar } from "@/components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetTransactionsQuery, useGetCommentsQuery } from "@api";
import { FadeLoader } from "react-spinners";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function () {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth.user);

  const { data, isLoading } = useGetTransactionsQuery();
  const transactions = data?.details || [];

  const { data: commentsData, isLoading: commentsLoading } =
    useGetCommentsQuery();
  const comments = commentsData?.details || [];

  const filteredTransactions = transactions.filter((transaction) => {
    const appointmentCustomerID = transaction.appointment?.customer?._id;
    const isCompletedOrCancelled =
      transaction?.status === "completed" ||
      transaction?.status === "cancelled";

    return appointmentCustomerID === auth?._id && isCompletedOrCancelled;
  });

  const comment = (transactionId) => {
    const transactionComments = comments?.filter(
      (comment) => comment.transaction._id === transactionId.toString()
    );
    if (transactionComments && transactionComments?.length > 0) {
      const toastProps = {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      };
      toast.warning("This transaction already has a comment.", toastProps);
    } else
      navigate("/customer/comment/create", {
        state: { transactionId: transactionId.toString() },
      });
  };

  return (
    <>
      {isLoading || commentsLoading ? (
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
                      <h2 className="pb-2 font-sans font-semibold lg:text-2xl md:text-[1.075rem]">
                        {`Date: ${
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
                    <div className="grid px-8">
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
                            <p className="font-semibold xl:text-lg lg:text-base">
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
                            <p className="font-semibold xl:text-lg lg:text-base">
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
                          ₱ {transaction?.appointment?.price.toFixed(0)}
                        </span>
                      </h1>
                    </div>
                    <div className="grid items-center justify-end grid-flow-col-dense pt-5 gap-x-4">
                      {transaction.status === "cancelled" ? (
                        <h1 className="text-xl">
                          Reason for Cancellation:
                          <span className="pl-2 font-semibold">
                            {transaction?.cancelReason}
                          </span>
                        </h1>
                      ) : (
                        <>
                          <div
                            onClick={() => comment(transaction._id)}
                            className="px-10 py-2 text-xl rounded-lg cursor-pointer bg-primary-default hover:bg-primary-accent"
                          >
                            <button>Rate</button>
                          </div>
                          <div
                            onClick={() =>
                              navigate(`/customer/receipt/${transaction._id}`)
                            }
                            className="px-10 py-2 text-xl rounded-lg cursor-pointer bg-primary-default hover:bg-primary-accent"
                          >
                            <button>Receipt</button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
