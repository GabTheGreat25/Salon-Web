import { React } from "react";
import { FadeLoader } from "react-spinners";
import { BeauticianSidebar } from "@/components";
import { useGetAppointmentByBeauticianIdQuery } from "@api";
import { useParams, useNavigate } from "react-router-dom";

export default function () {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading } = useGetAppointmentByBeauticianIdQuery(id);

  return (
    <>
      <div className="flex h-full">
        <BeauticianSidebar />
        {isLoading ? (
          <div className="loader">
            <FadeLoader color="#FDA7DF" loading={true} size={50} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center flex-1 m-2">
            {data?.details?.map((a) => (
              <div className="rounded-md p-5 mt-1 mb-5 bg-primary-default shadow-md">
                <div className="grid grid-cols-2 items-center justify-between mb-4">
                  {a?.appointment?.customer?.image.map((img) => (
                    <div className="flex justify-center mb-4 md:mb-0">
                      <img
                        className="w-52 h-52 rounded-full"
                        src={img?.url}
                        alt="test image"
                      />
                    </div>
                  ))}
                  <div className="ml-2 p-2">
                    <div className="flex flex-col md:flex-row items-center justify-between mb-2">
                      <h3 className="text-base font-medium overflow-hidden overflow-ellipsis">
                        {a?.appointment?.customer?.name}
                      </h3>
                      <p className="text-base">
                        Price:
                        <span className="font-bold">
                          {a?.appointment?.price}
                        </span>
                      </p>
                    </div>
                    <div className="flex flex-col justify-evenly">
                      <div className="mb-2">
                        <p className="font-bold text-base">Services:</p>
                        <div className="grid grid-cols-2 gap-4">
                          {a?.appointment?.service?.map((s) => (
                            <ul key={s?._id} className="pl-4 list-disc p-1">
                              <li>{s?.service_name}</li>
                            </ul>
                          ))}
                        </div>
                      </div>
                      <div className="mb-2">
                        <h3 className="text-base font-semibold">
                          Service Description
                        </h3>
                      </div>
                      <p className="text-sm">
                        {a?.appointment?.service?.map((s) => (
                          <ul className="pl-4 list-disc p-1">
                            <li>{s?.description}</li>
                          </ul>
                        ))}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row items-center justify-between mb-4">
                  <p className="text-xl font-medium md:ml-6">Date:</p>
                  <button className="bg-secondary-default font-semibold text-base w-full md:w-4/5 p-2 rounded-md">
                    {a?.appointment?.date}
                  </button>
                </div>
                <div className="flex flex-col md:flex-row items-center justify-between mb-4">
                  <p className="text-xl font-medium md:ml-6">Time:</p>
                  <button className="bg-secondary-default font-semibold text-base w-full md:w-4/5 p-2 rounded-md">
                    {a?.appointment?.time}
                  </button>
                </div>
                <div className="flex flex-col md:flex-row items-center justify-between mb-2 mt-2">
                  <h3 className="text-base font-bold overflow-hidden overflow-ellipsis">
                    STATUS: {a?.status}
                  </h3>
                  <button
                  onClick={()=>navigate(`/beautician/customer/${a?.appointment?.customer?._id}`)}
                   className="bg-secondary-default font-semibold text-base p-3 rounded-md">
                    Details
                  </button>
                </div>
              </div>
            ))}
            {/*end of card  */}
          </div>
        )}
      </div>
    </>
  );
}
