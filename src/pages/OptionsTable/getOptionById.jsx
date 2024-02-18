import { React } from "react";
import { useGetOptionByIdQuery } from "@api";
import { useParams } from "react-router-dom";
import { Card, CardImage } from "@components";
import { FadeLoader } from "react-spinners";

export default function () {
  const { id } = useParams();
  const { data, isLoading } = useGetOptionByIdQuery(id);
  const option = data?.details;

  const randomImage =
    option?.image?.length > 0
      ? option?.image[Math.floor(Math.random() * option?.image?.length)]
      : null;

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
                  Adds On Information
                </h1>
              </span>
              <div className="grid grid-cols-[40%_60%] items-start justify-start pt-6 gap-x-6">
                <span className="grid items-end justify-end h-[90%] mt-20">
                  <CardImage />
                </span>
                <div className="grid grid-flow-row-dense pr-10 gap-y-4">
                  <label className="block">
                    <div className="flex items-center justify-center">
                      {randomImage ? (
                        <img
                          src={randomImage.url}
                          alt={randomImage.originalname}
                          key={randomImage._id}
                          className="rounded-full"
                        />
                      ) : (
                        <span className="text-2xl"> No Image Uploaded</span>
                      )}
                    </div>
                  </label>
                  <label className="block">
                    <span className="xl:text-xl lg:text-[1rem] md:text-xs font-semibold">
                      Adds On Name:
                    </span>
                    <input
                      type="text"
                      readOnly
                      value={option?.option_name}
                      className="block mb-2 ml-6 xl:text-lg lg:text-[1rem]  border-0 bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full"
                    />
                  </label>
                  <label className="block">
                    <span className="xl:text-xl lg:text-[1rem] md:text-xs font-semibold">
                      Adds On Price:
                    </span>
                    <input
                      type="text"
                      readOnly
                      value={option?.extraFee}
                      className="block mb-2 ml-6 xl:text-lg lg:text-[1rem]  border-0 bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full"
                    />
                  </label>
                  <label className="block">
                    <span className="xl:text-xl lg:text-[1rem] md:text-xs font-semibold">
                      Adds On Services:
                    </span>
                    <div className="grid grid-flow-row grid-cols-2">
                      {option?.service?.map((s) => (
                        <ul className="flex" key={s?._id}>
                          <li className="p-1 list-disc">{s?.service_name}</li>
                        </ul>
                      ))}
                    </div>
                  </label>
                  <div className="grid grid-flow-row-dense pr-10 gap-y-4"></div>
                  <label className="block">
                    <span className="xl:text-xl lg:text-[1rem] md:text-xs font-semibold">
                      Feedback Description:
                    </span>
                    <textarea
                      value={option?.description}
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
