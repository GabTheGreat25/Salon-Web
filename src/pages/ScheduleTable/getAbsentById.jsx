import { React } from "react";
import { FadeLoader } from "react-spinners";
import { useGetScheduleByIdQuery } from "@api";
import { useParams } from "react-router-dom";
import { Card, CardImage } from "@components";

export default function () {
  const { id } = useParams();
  const { data, isLoading } = useGetScheduleByIdQuery(id);

  const schedule = data?.details;

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
                  Schedule Information
                </h1>
              </span>
              <div className="grid grid-cols-[40%_60%] items-start justify-start pt-6 gap-x-6">
                <span className="grid items-end justify-end h-[90%] mt-20">
                  <CardImage />
                </span>
                <div className="grid grid-flow-row-dense pr-10 gap-y-4">
                  <label className="block">
                    <span className="xl:text-xl md:text-[1rem] font-semibold">
                      Beautician Name:
                    </span>
                    <input
                      type="text"
                      readOnly
                      value={schedule?.beautician?.name}
                      className="block mb-2 ml-6 xl:text-lg md:text-[1rem]  border-0 bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full"
                    />
                  </label>

                  <label className="block">
                    <span className="xl:text-xl md:text-[1rem] font-semibold">
                      Leave Date:
                    </span>
                    <input
                      type="text"
                      readOnly
                      value={
                        schedule?.date
                          ? new Date(schedule.date).toISOString().split("T")[0]
                          : ""
                      }
                      className="block mb-2 ml-6 xl:text-lg md:text-[1rem]  border-0 bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full"
                    />
                  </label>

                  <label className="block">
                    <span className="xl:text-xl md:text-[1rem] font-semibold">
                      Leave Status:
                    </span>
                    <input
                      type="text"
                      readOnly
                      value={schedule?.status}
                      className="block mb-2 ml-6 xl:text-lg md:text-[1rem]  border-0 bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full"
                    />
                  </label>

                  <label className="block">
                    <span className="xl:text-xl md:text-[1rem] font-semibold">
                      Leave Note:
                    </span>
                    <textarea
                      value={
                        schedule?.leaveNote || "The Status Is Currently Absent"
                      }
                      className="resize-none block my-4 xl:text-xl md:text-[1rem] placeholder-white border-2 bg-card-input w-full border-light-default dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default rounded-lg"
                      rows="8"
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
