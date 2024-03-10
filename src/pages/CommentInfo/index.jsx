import { React } from "react";
import { useGetCommentByIdQuery } from "@api";
import { useParams } from "react-router-dom";
import { FadeLoader } from "react-spinners";
import { Card, CardImage } from "@components";
import { FaStar } from "react-icons/fa";

export default function () {
  const { id } = useParams();
  const { data, isLoading } = useGetCommentByIdQuery(id);

  const comment = data?.details;

  const anonymizeName = (name) => {
    if (!name || name.length < 2) return "";
    return name[0] + "*".repeat(name.length - 2) + name[name.length - 1];
  };

  const randomImage =
    comment?.image?.length > 0
      ? comment?.image[Math.floor(Math.random() * comment?.image?.length)]
      : null;

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
                  Comment Information
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
                          className="rounded-lg"
                        />
                      ) : (
                        <span className="text-2xl"> No Image Uploaded</span>
                      )}
                    </div>
                  </label>
                  <label className="block">
                    <span className="xl:text-xl md:text-[1rem] font-semibold">
                      Customer Name:
                    </span>
                    <input
                      type="text"
                      readOnly
                      value={
                        comment?.isAnonymous
                          ? anonymizeName(
                              comment?.transaction?.appointment?.customer?.name
                            )
                          : comment?.transaction?.appointment?.customer?.name
                      }
                      className="block mb-2 ml-6 xl:text-lg md:text-[1rem]  border-0 bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full"
                    />
                  </label>

                  <div className="grid grid-flow-row-dense pr-10 gap-y-4"></div>
                  <label className="block">
                    <span className="xl:text-xl md:text-[1rem] font-semibold">
                      Comment Description:
                    </span>
                    <textarea
                      value={comment?.description}
                      readOnly
                      row="8"
                      className="resize-none block my-4 xl:text-xl md:text-[1rem] placeholder-white border-2 bg-card-input w-full border-light-default dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default rounded-lg"
                    ></textarea>
                  </label>
                  <label className="block">
                    <span className="xl:text-xl md:text-[1rem] font-semibold">
                      Comment Suggestions:
                    </span>
                    <textarea
                      value={comment?.suggestion}
                      readOnly
                      className="resize-none block my-4 xl:text-xl md:text-[1rem] placeholder-white border-2 bg-card-input w-full border-light-default dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default rounded-lg"
                      row="8"
                    ></textarea>
                  </label>
                  <div />
                  <label className="block">
                    <span className="xl:text-xl md:text-[1rem] font-semibold">
                      Ratings:
                    </span>
                    <div className="flex items-center">
                      {Array.from(
                        {
                          length: Math.min(
                            5,
                            Math.max(0, Math.floor(comment?.ratings))
                          ),
                        },
                        (_, index) => (
                          <FaStar
                            key={index}
                            className="text-[#feca57] text-4xl m-2"
                          />
                        )
                      )}
                    </div>
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
