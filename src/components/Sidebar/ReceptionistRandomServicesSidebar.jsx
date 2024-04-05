import React from "react";
import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  useGetServicesQuery,
  useGetCommentsQuery,
  useGetExclusionsQuery,
} from "@api";
import { FadeLoader } from "react-spinners";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

export default function () {
  const navigate = useNavigate();

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

  const { data: exclusion, isLoading: exclusionLoading } =
    useGetExclusionsQuery();
  const exclusions = exclusion?.details;

  const customer = useSelector((state) => state.customer);

  const filteredExclusions = exclusions
    ?.filter(
      (exclusion) =>
        customer?.allergy && customer?.allergy.includes(exclusion._id)
    )
    .flatMap((exclusion) => exclusion.ingredient_name.trim().toLowerCase());

  const newItems = allServices.filter((service) => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();

    const hideMonthsJsProm = [0, 1, 4, 5, 6, 7, 8, 9, 10, 11];
    const hideMonthsGraduation = [0, 1, 2, 4, 5, 6, 7, 8, 9, 10, 11];

    const hideValentinesDay = currentMonth !== 1;
    const hideChristmas = currentMonth !== 11;
    const hideHalloween = currentMonth !== 9;
    const hideNewYear = currentMonth !== 0;
    const hideJsProm = hideMonthsJsProm.includes(currentMonth);
    const hideGraduation = hideMonthsGraduation.includes(currentMonth);

    const hasNewProduct = service?.product && Array.isArray(service.product);

    if (!hasNewProduct) return false;

    const isExcluded = service.product?.some((product) => {
      const productIngredients =
        product.ingredients?.toLowerCase().split(", ") || [];

      return filteredExclusions?.some((exclusion) =>
        productIngredients.includes(exclusion)
      );
    });

    return !(
      isExcluded ||
      (service.occassion === "Valentines" && hideValentinesDay) ||
      (service.occassion === "Christmas" && hideChristmas) ||
      (service.occassion === "Halloween" && hideHalloween) ||
      (service.occassion === "New Year" && hideNewYear) ||
      (service.occassion === "Js Prom" && hideJsProm) ||
      (service.occassion === "Graduation" && hideGraduation)
    );
  });

  return (
    <>
      {isLoading || exclusionLoading ? (
        <div className="loader">
          <FadeLoader color="#FFB6C1" loading={true} size={50} />
        </div>
      ) : (
        <div
          className={`min-h-screen px-4 pb-4 mt-2 rounded shadow-2xl w-[19rem]`}
        >
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
                        navigate(`/receptionist/service/${service._id}`)
                      }
                      className="object-center w-32 h-32 rounded-full cursor-pointer"
                      src={
                        service?.image[
                          Math.floor(Math.random() * service?.image?.length)
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
                  <h1 className="pb-1 text-xl font-extralight">
                    {service?.description?.length > 10
                      ? `${service.description.slice(0, 10)}...`
                      : service.description}
                  </h1>
                  <h1 className="pb-1 text-lg font-extralight">
                    Products used:
                  </h1>
                  <span className="grid grid-cols-2 grid-flow-rows-dense w-fit gap-x-2">
                    {service?.product?.map((product, index) => (
                      <div key={index}>
                        {product?.product_name?.length > 10
                          ? `${product?.product_name.slice(0, 10)}...`
                          : product?.product_name}
                      </div>
                    ))}
                  </span>
                  <div className="grid items-center grid-flow-col-dense mt- gap-x-4">
                    <h1 className="pt-4 text-xl">₱{service.price}</h1>
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
