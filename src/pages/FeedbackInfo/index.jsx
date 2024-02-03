import { React } from "react";
import { useGetFeedbackByIdQuery } from "@api";
import { useParams } from "react-router-dom";
import { Card, CardImage } from "@components";
import { FadeLoader } from "react-spinners";

export default function () {
  const { id } = useParams();
  const { data, isLoading } = useGetFeedbackByIdQuery(id);
  const feedback = data?.details;

  const anonymizeName = (name) => {
    if (!name || name.length < 2) return "";
    return name[0] + "*".repeat(name.length - 2) + name[name.length - 1];
  };

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
                  Feedback Information
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
                      value={
                        feedback?.isAnonymous
                          ? anonymizeName(feedback?.name)
                          : feedback?.name
                      }
                      className="block mb-2 ml-6 xl:text-lg lg:text-[1rem]  border-0 bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full"
                    />
                  </label>
                  <label className="block">
                    <span className="xl:text-xl lg:text-[1rem] md:text-xs font-semibold">
                      Customer Email:
                    </span>
                    <input
                      type="text"
                      readOnly
                      value={feedback?.email}
                      className="block mb-2 ml-6 xl:text-lg lg:text-[1rem]  border-0 bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full"
                    />
                  </label>
                  <label className="block">
                    <span className="xl:text-xl lg:text-[1rem] md:text-xs font-semibold">
                      Contact Number:
                    </span>
                    <input
                      type="text"
                      readOnly
                      value={feedback?.contact_number}
                      className="block mb-2 ml-6 xl:text-lg lg:text-[1rem]  border-0 bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full"
                    />
                  </label>
                  <div className="grid grid-flow-row-dense pr-10 gap-y-4"></div>
                  <label className="block">
                    <span className="xl:text-xl lg:text-[1rem] md:text-xs font-semibold">
                      Feedback Description:
                    </span>
                    <textarea
                      value={feedback?.description}
                      readOnly
                      className="resize-none block my-4 xl:text-xl lg:text-[1rem] md:text-sm placeholder-white border-2 bg-card-input w-full border-light-default dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default rounded-lg"
                    ></textarea>
                  </label>
                  <div />
                </div>
              </div>
            </div>
          </Card>
        </>
      )}
    </>
  );
}
