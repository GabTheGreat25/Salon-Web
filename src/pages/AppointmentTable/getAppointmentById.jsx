import React from "react";
import { Card, CardImage } from "@components";
import { FadeLoader } from "react-spinners";
import { useGetAppointmentByIdQuery } from "@api";
import { useParams } from "react-router-dom";

export default function () {
  const { id } = useParams();
  const { data, isLoading } = useGetAppointmentByIdQuery(id);
  const appointment = data?.details;

  return (
    <>
      {isLoading ? (
        <div className="loader">
          <FadeLoader color="#FDA7DF" loading={true} size={50} />
        </div>
      ) : (
        <>
          <Card>
            <div className="grid w-full h-full pb-10 text-light-default dark:text-dark-default">
              <span className="grid items-end justify-center">
                <h1 className="pt-10 font-semibold lg:text-5xl md:text-4xl">
                  Appointment Information
                </h1>
              </span>
              <div className="grid grid-cols-[40%_60%] items-start justify-start pt-6 gap-x-6">
                <span className="grid items-end justify-end h-[90%] mt-20">
                  <CardImage />
                </span>
                <div className="grid grid-flow-row-dense pr-10 gap-y-4">
                  <label className="block">
                    <span className="xl:text-xl lg:text-[1rem] md:text-xs font-semibold">
                      Customer Name:
                    </span>
                    <input
                      type="text"
                      readOnly
                      value={appointment?.customer?.name}
                      className="block mb-2 ml-6 xl:text-lg lg:text-[1rem]  border-0 bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full"
                    />
                  </label>
                  <label className="block">
                    <span className="xl:text-xl lg:text-[1rem] md:text-xs font-semibold">
                      Beautician Name:
                    </span>
                    <input
                      type="text"
                      readOnly
                      value={appointment?.beautician
                        ?.map((b) => b.name)
                        .join(", ")}
                      className="block mb-2 ml-6 xl:text-lg lg:text-[1rem]  border-0 bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full"
                    />
                  </label>
                  <label className="block">
                    <span className="xl:text-xl lg:text-[1rem] md:text-xs font-semibold">
                      Appointment Date:
                    </span>
                    <input
                      type="text"
                      readOnly
                      value={
                        new Date(appointment?.date).toISOString().split("T")[0]
                      }
                      className="block mb-2 ml-6 xl:text-lg lg:text-[1rem]  border-0 bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full"
                    />
                  </label>
                  <label className="block">
                    <span className="xl:text-xl lg:text-[1rem] md:text-xs font-semibold">
                      Appointment Time:
                    </span>
                    <input
                      type="text"
                      readOnly
                      value={
                        Array.isArray(appointment?.time) &&
                        appointment.time.length === 1
                          ? appointment.time[0]
                          : `${appointment?.time?.[0]} to ${
                              appointment?.time?.[appointment?.time?.length - 1]
                            }`
                      }
                      className="block mb-2 ml-6 xl:text-lg lg:text-[1rem]  border-0 bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full"
                    />
                  </label>
                  <label className="block">
                    <span className="xl:text-xl lg:text-[1rem] md:text-xs font-semibold">
                      Appointment Services:
                    </span>
                    <div className="grid grid-flow-row grid-cols-2">
                      {appointment?.service?.map((s) => (
                        <ul className="flex" key={s?._id}>
                          <li className="p-1 list-disc">{s?.service_name}</li>
                        </ul>
                      ))}
                    </div>
                  </label>
                  <label className="block">
                    <span className="xl:text-xl lg:text-[1rem] md:text-xs font-semibold">
                      Appointment AddOns:
                    </span>
                    <div className="grid grid-flow-row grid-cols-2">
                      {appointment?.option && appointment.option.length > 0 ? (
                        appointment.option.map((o) => (
                          <ul className="flex" key={o?._id}>
                            <li className="p-1 list-disc">{o.option_name}</li>
                          </ul>
                        ))
                      ) : (
                        <span className="xl:text-xl lg:text-[1rem] md:text-xs font-semibold">
                          None
                        </span>
                      )}
                    </div>
                  </label>

                  <label className="block">
                    <span className="xl:text-xl lg:text-[1rem] md:text-xs font-semibold">
                      Appointment Price:
                    </span>
                    <input
                      type="text"
                      readOnly
                      value={`₱${appointment?.price}`}
                      className="block mb-2 ml-6 xl:text-lg lg:text-[1rem]  border-0 bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full"
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
