import React from "react";
import { useGetAppointmentsQuery } from "@api";
import testimg from "@assets/Customer.png";

export default function () {
  const { data, isLoading } = useGetAppointmentsQuery();
  const appointment = data?.details;

  const randomImage =
    appointment?.customer?.image?.length > 0
      ? appointment?.customer?.image[
          Math.floor(Math.random() * appointment?.customer?.image?.length)
        ]
      : null;

  return (
    <>
      <h3 className="font-bold text-3xl ml-5">Schedule Appointments Today</h3>
      <div className="flex flex-col m-12 ml-5 mr-5 max-w-screen-xl mx-auto h-screen rounded-lg bg-primary-default">
        {data?.details?.map((a) => (
          <div
            key={a?._id}
            className="flex items-center bg-light-default m-3 rounded-lg justify-between"
          >
            <div className=" object-center m-2 p-3 rounded-lg">
              <img
                className="rounded-full max-w-min h-36 w-36 m-2 "
                src={randomImage}
                alt="testimg.jpeg"
              />
            </div>
            <div className="flex flex-col items-center w-full m-3">
              <div className="flex items-center justify-between w-full m-2">
                <h3 className="text-lg font-bold">
                  Appointment Date: <span>{a?.date}</span>
                </h3>
                <h3 className="text-lg font-bold">
                  {" "}
                  Appointment Time <span>{a?.time}</span>
                </h3>
              </div>
              <div className="flex items-center justify-between w-full bg-dark-default m-3 text-light-default rounded-lg p-3">
                <div className="w-full text-sm  text-light-default p-1">
                  <h3 className="text-xl">Appointment Customer:</h3>
                  <p className="font-semibold mb-2">{a?.customer?.name}</p>
                  <>
                    <h3 className="text-xl">Assigned Beauticians</h3>
                    {a?.beautician?.map((b) => (
                      <ul
                        key={b?._id}
                        className="grid grid-cols-3 grid-flow-row"
                      >
                        <li className="grid-cols-auto">{b?.name}</li>
                      </ul>
                    ))}
                  </>
                </div>
                <div className="w-full  text-light-default">
                  <h3 className="text-xl">Appointment Services:</h3>
                  {a?.service?.map((s) => (
                    <ul key={s?._id} className="grid grid-cols-3 grid-flow-row">
                      <li className="grid-cols-auto">
                        {s?.service_name}
                      </li>
                    </ul>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
