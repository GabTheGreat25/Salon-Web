import React, { useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetTransactionByIdQuery } from "@api";
import { FadeLoader } from "react-spinners";
import { Card, CardImage } from "@components";

export default function () {
  const isFocused = useRef(true);

  const { id } = useParams();

  const { data, isLoading, refetch } = useGetTransactionByIdQuery(id);
  const transaction = data?.details;

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

  const randomImage =
    transaction?.image?.length > 0
      ? transaction?.image[
          Math.floor(Math.random() * transaction?.image?.length)
        ]
      : null;

  return (
    <>
      {isLoading ? (
        <div className="loader">
          <FadeLoader color="#FFB6C1" loading={true} size={50} />
        </div>
      ) : (
        <>
          <Card>
            <div className="grid w-full h-full pb-10 text-light-default dark:text-dark-default">
              <span className="grid items-end justify-center">
                <h1 className="pt-10 font-semibold xl:text-5xl md:text-4xl">
                  Transaction Details
                </h1>
              </span>
              <div className="grid grid-cols-[40%_60%] items-start justify-start pt-6 gap-x-6">
                <span className="grid items-end justify-end h-[90%] mt-20">
                  <CardImage />
                </span>
                <div className="grid grid-flow-row-dense pr-10 gap-y-4">
                  <label className="block">
                    <div className="flex items-center justify-center mb-2">
                      {randomImage && (
                        <img
                          src={randomImage.url}
                          alt={randomImage.originalname}
                          key={randomImage._id}
                          className="rounded-lg"
                        />
                      )}
                    </div>
                    <span className="xl:text-xl md:text-[1rem] font-semibold">
                      Customer Type:
                    </span>
                    <input
                      type="text"
                      readOnly
                      value={transaction?.customer_type}
                      className="block w-full mb-2 ml-6 border-0 xl:text-xl md:text-base bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default"
                    />
                  </label>
                  <label className="block">
                    <span className="xl:text-xl md:text-[1rem] font-semibold">
                      Assigned Beauticians:
                    </span>
                    <input
                      type="text"
                      readOnly
                      value={
                        transaction?.appointment?.beautician
                          ? transaction.appointment.beautician
                              .map((beautician) => beautician.name)
                              .join(", ")
                          : ""
                      }
                      className="block mb-2 ml-6 xl:text-lg md:text-[1rem] border-0 bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full"
                    />
                  </label>
                  <label className="block">
                    <span className="xl:text-xl md:text-[1rem] font-semibold">
                      Appointment Customer
                    </span>
                    <input
                      type="text"
                      readOnly
                      value={transaction?.appointment?.customer?.name}
                      className="block mb-2 ml-6 xl:text-lg md:text-[1rem] border-0 bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full"
                    />
                  </label>
                  <label className="block">
                    <span className="xl:text-xl md:text-[1rem] font-semibold">
                      Appointment Date:
                    </span>
                    <input
                      type="text"
                      readOnly
                      value={
                        new Date(transaction?.appointment?.date)
                          .toISOString()
                          .split("T")[0]
                      }
                      className="block mb-2 ml-6 xl:text-lg md:text-[1rem] border-0 bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full"
                    />
                  </label>
                  <label className="block">
                    <span className="xl:text-xl md:text-[1rem] font-semibold">
                      Appointment Time:
                    </span>
                    <input
                      type="text"
                      readOnly
                      value={
                        Array.isArray(transaction?.appointment?.time) &&
                        transaction?.appointment.time.length === 1
                          ? transaction?.appointment?.time[0]
                          : `${transaction?.appointment?.time?.[0]} to ${
                              transaction?.appointment?.time?.[
                                transaction?.appointment?.time?.length - 1
                              ]
                            }`
                      }
                      className="block mb-2 ml-6 xl:text-lg md:text-[1rem] border-0 bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full"
                    />
                  </label>
                  <label className="block">
                    <span className="xl:text-xl md:text-[1rem] font-semibold">
                      Payment Method:
                    </span>
                    <input
                      type="text"
                      readOnly
                      value={transaction?.payment}
                      className="block mb-2 ml-6 xl:text-lg md:text-[1rem] border-0 bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full"
                    />
                  </label>

                  <label className="block">
                    <span className="xl:text-xl md:text-[1rem] font-semibold">
                      Transaction Status:
                    </span>
                    <input
                      type="text"
                      readOnly
                      value={transaction?.status}
                      className="block mb-2 ml-6 xl:text-lg md:text-[1rem] border-0 bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full"
                    />
                  </label>
                </div>
              </div>
            </div>
          </Card>
        </>
      )}
    </>
  );
}
