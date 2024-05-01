import React, { useRef, useEffect } from "react";
import { Card, CardImage } from "@components";
import { FadeLoader } from "react-spinners";
import { useGetAppointmentByIdQuery } from "@api";
import { useParams } from "react-router-dom";

export default function () {
  const { id } = useParams();
  const isFocused = useRef(true);

  const { data, isLoading, refetch } = useGetAppointmentByIdQuery(id);
  const appointment = data?.details;

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
                <h1 className="pt-10 font-semibold xl:text-3xl md:text-2xl">
                  Reschedule Appointment Information
                </h1>
              </span>
              <div className="grid grid-cols-[40%_60%] items-start justify-start pt-6 gap-x-6">
                <span className="grid items-end justify-end h-[90%] mt-20">
                  <CardImage />
                </span>
                <div className="grid grid-flow-row-dense pr-10 gap-y-4">
                  <label className="block">
                    <span className="xl:text-xl md:text-[1rem] font-semibold">
                      Customer Name:
                    </span>
                    <input
                      type="text"
                      readOnly
                      value={appointment?.customer?.name}
                      className="block mb-2 ml-6 xl:text-lg md:text-[1rem]  border-0 bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full"
                    />
                  </label>
                  <label className="block">
                    <span className="xl:text-xl md:text-[1rem] font-semibold">
                      Appointment Day:
                    </span>
                    <input
                      type="text"
                      readOnly
                      value={
                        new Date(appointment?.date).toISOString().split("T")[0]
                      }
                      className="block mb-2 ml-6 xl:text-lg md:text-[1rem]  border-0 bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full"
                    />
                  </label>
                  <label className="block">
                    <span className="xl:text-xl md:text-[1rem] font-semibold">
                      Customer Rebook Reason:
                    </span>
                    <textarea
                      value={appointment?.messageReason}
                      readOnly
                      className="resize-none block my-4 xl:text-xl md:text-[1rem] placeholder-white border-2 bg-card-input w-full border-light-default dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default rounded-lg"
                    ></textarea>
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
