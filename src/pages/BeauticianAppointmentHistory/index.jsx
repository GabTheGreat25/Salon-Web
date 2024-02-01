import { React } from "react";
import noImg from "@assets/no-photo.jpg";
import { FadeLoader } from "react-spinners";
import { BeauticianSidebar } from "@/components";
import { useGetAppointmentHistoryByBeauticianIdQuery } from "@api";
import { useParams } from "react-router-dom";

export default function () {
  const { id } = useParams();
  const { data, isLoading } = useGetAppointmentHistoryByBeauticianIdQuery(id);

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "short",
    };
    return new Date(dateString).toLocaleDateString("en-PH", options);
  };

  return (
    <>
      <div className="flex h-full">
        <BeauticianSidebar />
        {isLoading ? (
          <div className="loader">
            <FadeLoader color="#FDA7DF" loading={true} size={50} />
          </div>
        ) : (
          <div className="grid items-start flex-1 min-h-screen grid-cols-2 gap-6 p-10">
            {data?.details?.map((a) => (
              <div
                key={a._id}
                className="p-5 mt-1 rounded-md shadow-md h-fit bg-primary-default"
              >
                <div className="grid items-center justify-between grid-cols-2 mb-4">
                  {a?.appointment?.customer?.image.map((img, index) => (
                    <div
                      key={index}
                      className="flex justify-center mb-4 md:mb-0"
                    >
                      {img?.url ? (
                        <img
                          className="rounded-full w-52 h-52"
                          src={
                            img?.image && img?.image?.length > 1
                              ? img?.image[
                                  Math.floor(Math.random() * img?.image?.length)
                                ]?.url
                              : img?.url
                          }
                          alt="image"
                        />
                      ) : (
                        <img
                          className="rounded-full w-52 h-52"
                          src={noImg}
                          alt="No Image"
                        />
                      )}
                    </div>
                  ))}
                  <div className="p-2 ml-2">
                    <div className="grid items-center justify-between mb-2 xl:grid-flow-col-dense md:grid-flow-row-dense gap-x-2">
                      <h3 className="overflow-hidden text-base font-bold overflow-ellipsis">
                        {a?.appointment?.customer?.name.length > 10
                          ? `${a?.appointment?.customer?.name.substring(
                              0,
                              8
                            )}..`
                          : a?.appointment?.customer?.name}
                      </h3>
                      <p className="text-base font-bold">
                        Price:{" "}
                        <span className="font-light">
                          ₱{a?.appointment?.price}
                        </span>
                      </p>
                    </div>

                    <div className="flex flex-col justify-evenly">
                      <div className="mb-2">
                        <p className="text-base font-bold">Services:</p>
                        <div className="grid grid-cols-2 gap-4">
                          {a?.appointment?.service?.map((s) => (
                            <ul key={s?._id} className="p-1 pl-4 list-disc">
                              <li>
                                {s?.service_name.length > 8
                                  ? `${s?.service_name.substring(0, 8)}..`
                                  : s?.service_name}
                              </li>
                            </ul>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-center justify-between mt-2 mb-2 md:flex-row">
                      <h3 className="overflow-hidden text-base font-bold overflow-ellipsis">
                        Status: <span className="font-light"> {a?.status}</span>
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="mt-10">
                  <div className="flex flex-col items-center justify-between mb-4 md:flex-row">
                    <p className="text-xl font-medium md:ml-6">Date:</p>
                    <button className="w-full p-2 text-base font-semibold rounded-md cursor-auto bg-secondary-default md:w-4/5">
                      {a?.appointment?.date && formatDate(a?.appointment?.date)}
                    </button>
                  </div>
                  <div className="flex flex-col items-center justify-between mb-4 md:flex-row">
                    <p className="text-xl font-medium md:ml-6">Time:</p>
                    <button className="w-full p-2 text-base font-semibold rounded-md cursor-auto bg-secondary-default md:w-4/5">
                      {a?.appointment?.time && a?.appointment?.time.length > 0
                        ? `${a?.appointment?.time[0]} - ${
                            a?.appointment?.time[
                              a?.appointment?.time.length - 1
                            ]
                          }`
                        : ""}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
