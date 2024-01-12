import React, { useState } from "react";
import { RandomServicesSidebar } from "@/components";
import "react-toastify/dist/ReactToastify.css";
import { FadeLoader } from "react-spinners";
import { useGetServiceByIdQuery, useGetCommentsQuery } from "@api";
import { useParams } from "react-router-dom";
import {
  faArrowLeft,
  faStar,
  faStarHalf,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import noPhoto from "@/assets/no-photo.jpg";

export default function () {
  const goBack = () => {
    window.history.back();
  };

  const [selectedStars, setSelectedStars] = useState(5);

  const { id } = useParams();
  const { data: serviceData, isLoading: serviceLoading } =
    useGetServiceByIdQuery(id);

  const { data: commentsData, isLoading: commentsLoading } =
    useGetCommentsQuery();
  const comments = commentsData?.details || [];

  const serviceComments = comments.filter((comment) =>
    comment.transaction?.appointment?.service.some((s) => s._id === id)
  );

  const ratings = serviceComments.flatMap((comment) => comment.ratings);
  const count = ratings.length;
  const averageRating =
    count > 0 ? ratings.reduce((sum, rating) => sum + rating, 0) / count : 0;

  const { _id, service_name, description, price, image } =
    serviceData?.details || {};

  const randomizedImages = image?.length
    ? image[Math.floor(Math.random() * image.length)].url
    : null;

  const filteredServiceComments = serviceComments.filter((comment) => {
    const commentStars = comment.ratings;
    return commentStars === selectedStars;
  });

  return (
    <>
      {serviceLoading || commentsLoading ? (
        <div className="loader">
          <FadeLoader color="#FDA7DF" loading={true} size={50} />
        </div>
      ) : (
        <>
          <div className="flex flex-row-reverse h-full">
            <RandomServicesSidebar />
            <div className="grid flex-1 w-full h-full mx-20 my-10 gap-y-24">
              <div
                key={_id}
                className="w-full h-full px-8 py-6 rounded-lg bg-primary-default"
              >
                <button className="pb-10 text-3xl w-fit" onClick={goBack}>
                  <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <div className="grid px-8 lg:grid-cols-2 gap-x-8">
                  <div className="grid items-center justify-center pb-10">
                    <img
                      key={randomizedImages?.public_id}
                      src={randomizedImages}
                      alt={randomizedImages?.originalname}
                      className="object-cover rounded-xl 2xl:w-96 2xl:h-96 xl:w-72 xl:h-72"
                    />
                  </div>
                  <div>
                    <h1 className="font-semibold xl:text-3xl lg:text-xl md:text-lg">
                      {service_name}
                    </h1>
                    <div className="grid items-center justify-center grid-flow-col-dense grid-cols-2 pb-10 w-fit gap-x-3">
                      <span className="grid items-center grid-flow-col-dense pt-2 text-xl w-fit gap-x-2">
                        {averageRating > 0 ? (
                          [...Array(Math.floor(averageRating))].map(
                            (_, starIndex) => (
                              <FontAwesomeIcon
                                icon={faStar}
                                key={starIndex}
                                color="#feca57"
                              />
                            )
                          )
                        ) : (
                          <>
                            <h1>No Ratings</h1>
                          </>
                        )}
                        {averageRating % 1 !== 0 && (
                          <FontAwesomeIcon icon={faStarHalf} color="#feca57" />
                        )}
                        {averageRating > 0 ? (
                          <p className="font-semibold">
                            {averageRating} out of 5
                          </p>
                        ) : null}
                      </span>
                    </div>
                    <h1 className="pb-10 font-semibold xl:text-3xl lg:text-xl md:text-lg">
                      ₱ {price}
                    </h1>
                    <h1 className="pb-4 font-semibold xl:text-3xl lg:text-xl md:text-lg">
                      Service Description
                    </h1>
                    <h1 className="pb-10 font-semibold xl:text-3xl lg:text-xl md:text-lg">
                      {description}
                    </h1>
                    <div className="grid items-center justify-end">
                      <button className="px-6 py-3 rounded-lg xl:text-2xl lg:text-xl w-fit bg-secondary-default">
                        Add Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full h-full py-6 rounded-lg bg-primary-default">
                <div className="px-8">
                  <h1 className="pb-4 font-semibold xl:text-3xl lg:text-xl md:text-lg">
                    Service Review
                  </h1>
                  <div className="grid grid-flow-row-dense gap-y-8">
                    <div className="rounded-md lg:p-8 md:p-4 bg-light-default dark:bg-dark-default">
                      <div className="grid gap-4 xl:grid-flow-col-dense">
                        <div className="grid grid-flow-row-dense xl:items-start xl:justify-start md:items-center md:justify-center">
                          <h1 className="xl:text-start md:text-center 2xl:text-2xl xl:text-xl lg:text-lg md:text-base">
                            {averageRating} out of 5
                          </h1>
                        </div>
                        <div className="grid items-center justify-center grid-flow-col-dense md:gap-x-2 xl:gap-x-4">
                          {[5, 4, 3, 2, 1].map((stars) => (
                            <div
                              key={stars}
                              className={`py-2 border rounded-lg lg:px-4 md:px-2 border-primary-default hover:bg-primary-accent ${
                                selectedStars === stars
                                  ? "bg-primary-accent"
                                  : ""
                              }`}
                              onClick={() => setSelectedStars(stars)}
                            >
                              <button className="2xl:text-2xl xl:text-xl lg:text-sm md:text-xs">
                                {stars} Stars
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    {filteredServiceComments?.map((comment) => (
                      <div
                        key={comment._id}
                        className="px-8 py-4 rounded-md bg-light-default dark:bg-dark-default"
                      >
                        <div className="grid items-center justify-center grid-flow-col-dense w-fit gap-x-6">
                          <div>
                            <img
                              src={
                                comment?.image && comment?.image.length
                                  ? comment?.image[
                                      Math.floor(
                                        Math.random() * comment?.image.length
                                      )
                                    ]?.url
                                  : noPhoto
                              }
                              alt={comment?.image?.originalname}
                              key={comment?.image?.public_id}
                              className="object-cover w-32 h-32 rounded-2xl"
                            />
                          </div>
                          <div>
                            <h1 className="pb-2 font-semibold xl:text-lg md:text-base">
                              {
                                comment?.transaction?.appointment?.customer
                                  ?.name
                              }
                            </h1>
                            <div className="flex items-center">
                              {[...Array(comment.ratings)].map(
                                (_, starIndex) => (
                                  <FontAwesomeIcon
                                    icon={faStar}
                                    key={starIndex}
                                    color="#feca57"
                                  />
                                )
                              )}
                            </div>
                            <h1 className="py-4 text-lg text-justify">
                              {comment?.description}
                            </h1>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
