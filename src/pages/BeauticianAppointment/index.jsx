import { React } from "react";
import testimg from "@assets/Beautician.png";
import { FadeLoader } from "react-spinners";
import { BeauticianSidebar } from "@/components";
import { useGetAppointmentByBeauticianIdQuery } from "@api";
import { useParams } from "react-router-dom";

export default function () {
  const { id } = useParams();
  const { data, isLoading } = useGetAppointmentByBeauticianIdQuery(id);
  console.log(data);

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
              <div className="rounded-md p-4 mt-1 mb-5 bg-primary-default shadow-md">
                <div className="grid grid-cols-2 items-center justify-between mb-4">
                  <div className="flex justify-center mb-4 md:mb-0">
                  {a?.customer?.image.map((img)=>(
                    <img
                      className="w-52 h-52 rounded-full"
                      src={img?.url}
                      alt="test image"
                    />
                  ))}
                  </div>
                  <div>
                    <div className="flex flex-col md:flex-row items-center justify-between mb-2">
                      <h3 className="text-base font-medium overflow-hidden overflow-ellipsis">
                        {a?.customer?.name}
                      </h3>
                      <p className="text-base">
                        Price: <span className="font-bold">{a?.price}</span>
                      </p>
                    </div>
                    <div className="mb-2">
                      <p className="text-base">
                        Service:
                        {a.service.map((s) => (
                          <p className="font-bold">{s.service_name}</p>
                        ))}
                      </p>
                    </div>
                    <h3 className="text-base font-semibold">
                      Service Description
                    </h3>
                    {a.service.map((s)=>(
                      <p className="text-sm">
                        <ul>
                          <li>{s.description}</li>
                        </ul>
                      </p>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col md:flex-row items-center justify-between mb-4">
                  <p className="text-xl font-medium md:ml-6">Date:</p>
                  <button className="bg-secondary-default font-semibold text-base w-full md:w-4/5 p-2 rounded-md">
                    {a.date}
                  </button>
                </div>
                <div className="flex flex-col md:flex-row items-center justify-between mb-4">
                  <p className="text-xl font-medium md:ml-6">Date:</p>
                  <button className="bg-secondary-default font-semibold text-base w-full md:w-4/5 p-2 rounded-md">
                    {a.time}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
