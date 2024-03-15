import { React, useState } from "react";
import { useGetAppointmentsQuery } from "@api";
import { useNavigate } from "react-router-dom";

export default function () {
  const navigate = useNavigate();
  const { data, isLoading } = useGetAppointmentsQuery();
  const appointment = data?.details;

  const randomImage =
    appointment?.customer?.image?.length > 0
      ? appointment?.customer?.image[
          Math.floor(Math.random() * appointment?.customer?.image?.length)
        ]
      : null;

      const today = new Date();
      console.log(today);

      const formattedDate = new Date(today).toISOString().split("T")[0]

      const appointmentToday = data?.details?.filter((a) => {
        const appointmentDate = new Date(a?.date).toISOString().split("T")[0];
        return appointmentDate === formattedDate;
      });
      
  const noAppointmentsMessage = (
    <div className="text-center text-gray-600 mt-8">
      No Appointments for Today
    </div>
  );

  return (
    <div className="max-w-screen-xl mx-auto">
      <h3 className="font-bold text-3xl ml-5">Schedule Appointments Today</h3>
      {isLoading ? (
        <div className="text-center mt-8">
          <p>Loading...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 m-12 ml-5 mr-5">
          {appointmentToday?.length > 0 ? (
            appointmentToday?.map((a) => (
              <div key={a?._id} className="bg-primary-default rounded-lg p-3">
                <div className="flex justify-center">
                  <img
                    className="rounded-full h-36 w-36 m-2"
                    src={randomImage}
                    alt="testimg.jpeg"
                  />
                </div>
                <div className="flex flex-col justify-between h-full mt-4">
                  <div>
                    <h3 className="text-lg font-bold">
                      Appointment Date: <span>{a?.date}</span>
                    </h3>
                    <h3 className="text-lg font-bold">
                      Appointment Time: <span>{a?.time}</span>
                    </h3>
                    <div className="mt-4">
                      <h3 className="text-xl font-bold">Appointment Customer:</h3>
                      <p className="font-semibold">{a?.customer?.name}</p>
                    </div>
                    <div className="mt-4">
                      <h3 className="text-xl font-bold">Assigned Beauticians:</h3>
                      <ul>
                        {a?.beautician?.map((b) => (
                          <li key={b?._id}>{b?.name}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-4">
                      <h3 className="text-xl font-bold">Appointment Services:</h3>
                      <ul>
                        {a?.service?.map((s) => (
                          <li key={s?._id}>{s?.service_name}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="flex justify-end mt-4">
                    <button
                      onClick={() => navigate(`/receptionist/customer/${a?._id}`)}
                      className="border-none p-3 text-base font-bold bg-primary-accent rounded-2xl"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            noAppointmentsMessage
          )}
        </div>
      )}
    </div>
  );
}
