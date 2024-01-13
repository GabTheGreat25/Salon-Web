import React from "react";
import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGetServicesQuery, useGetCommentsQuery } from "@api";
import { FadeLoader } from "react-spinners";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

export default function () {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth.user);
  const isOnlineCustomer = auth?.roles?.includes("Online Customer");

  const { data, isLoading } = useGetServicesQuery();
  const randomizedItems =
    !isLoading && data?.details
      ? shuffleArray([...data.details]).slice(0, 6)
      : [];

  const { data: commentsData, isLoading: commentsLoading } =
    useGetCommentsQuery();
  const comments = commentsData?.details || [];

  const allServices = randomizedItems.map((service) => {
    const matchingComments = comments.filter((comment) =>
      comment?.transaction?.appointment?.service.some(
        (s) => s._id === service._id
      )
    );

    const ratings = matchingComments.flatMap((comment) => comment?.ratings);

    const count = ratings?.length;

    const averageRating =
      count > 0 ? ratings.reduce((sum, rating) => sum + rating, 0) / count : 0;

    return {
      ...service,
      ratings: averageRating,
    };
  });

  const newItems = allServices.filter(
    (service) => service?.product && Array.isArray(service.product)
  );

  return (
    <>
      {isLoading ? (
        <div className="loader">
          <FadeLoader color="#FDA7DF" loading={true} size={50} />
        </div>
      ) : (
        <div className={`min-h-screen px-4 pb-4 mt-2 rounded shadow-2xl w-72`}>
          <div className="grid items-center justify-center">
            <div className="p-4 overflow-hidden font-semibold text-center capitalize xl:text-lg lg:text-base md:text-sm whitespace-nowrap">
              Other Services you <br /> may like
            </div>
          </div>
          <div className="overflow-x-auto">
            <div className="flex flex-col gap-4">
              {newItems.map((service) => (
                <div
                  className="w-full p-8 rounded-md m- bg-primary-default"
                  key={service._id}
                >
                  <div className="grid items-center justify-center">
                    <img
                      onClick={() =>
                        navigate(
                          `${
                            isOnlineCustomer
                              ? "/onlineCustomer"
                              : "/walkInCustomer"
                          }/service/${service._id}`
                        )
                      }
                      className="object-center w-32 h-32 rounded-full cursor-pointer"
                      src={
                        service?.image[
                          Math.floor(Math.random() * service?.image.length)
                        ]?.url
                      }
                      alt={service?.image?.originalname}
                      key={service?.image?.public_id}
                    />
                  </div>
                  <h1 className="pt-3 text-2xl font-semibold">
                    {service?.service_name?.length > 10
                      ? `${service?.service_name.slice(0, 10)}...`
                      : service?.service_name}
                  </h1>
                  <h1 className="pb-1 text-lg font-extralight">
                    {service?.description.length > 10
                      ? `${service.description.slice(0, 10)}...`
                      : service.description}
                  </h1>
                  <span className="grid grid-flow-col-dense w-fit gap-x-2">
                    {service?.product?.map((product, index) => (
                      <div key={index}>
                        {product?.product_name?.length > 10
                          ? `${product?.product_name.slice(0, 10)}...`
                          : product?.product_name}
                      </div>
                    ))}
                  </span>
                  <div className="grid items-end grid-flow-col-dense mt- gap-x-4">
                    <h1 className="pt-4 text-base">₱{service.price}</h1>
                    <span className="grid grid-flow-col-dense pt-2 text-xl w-fit gap-x-2">
                      {service.ratings > 0 ? (
                        [...Array(Math.floor(service.ratings))].map(
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

                      {service.ratings % 1 !== 0 && (
                        <FontAwesomeIcon icon={faStarHalf} color="#feca57" />
                      )}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
