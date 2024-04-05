import React, { useState, useEffect } from "react";
import { CustomerServicesSidebar } from "@components";
import {
  faArrowLeft,
  faArrowRight,
  faStar,
  faStarHalf,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  useGetServicesQuery,
  useGetCommentsQuery,
  useGetExclusionsQuery,
} from "@api";
import { FadeLoader } from "react-spinners";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { appointmentSlice } from "@appointment";

export default function () {
  const customer = useSelector((state) => state.customer);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAllServices = () => {
    navigate("/receptionist/recepServicesAllServices");
  };

  const handlePopular = () => {
    navigate("/receptionist/recepServicesPopular");
  };

  const handleLatest = () => {
    navigate("/receptionist/recepServicesLatest");
  };

  const handleBudget = () => {
    navigate("/receptionist/recepServicesBudget");
  };

  const goBack = () => {
    navigate("/receptionist/services");
  };

  const { data: servicesData, isLoading: servicesLoading } =
    useGetServicesQuery();
  const services = servicesData?.details || [];

  const { data: commentsData } = useGetCommentsQuery();
  const comments = commentsData?.details || [];

  const allServices = services.map((service) => {
    const matchingComments = comments.filter((comment) =>
      comment.transaction?.appointment?.service.some(
        (s) => s._id === service._id
      )
    );

    const ratings = matchingComments.flatMap((comment) => comment.ratings);
    const count = ratings?.length;

    const averageRating =
      count > 0 ? ratings.reduce((sum, rating) => sum + rating, 0) / count : 0;

    return {
      ...service,
      ratings: averageRating,
    };
  });

  const [isFilterApplied, setIsFilterApplied] = useState(false);

  const [visibleFilteredItems, setVisibleFilteredItems] = useState([]);

  const { data, isLoading: exclusionLoading } = useGetExclusionsQuery();
  const exclusions = data?.details;

  const filteredExclusions = exclusions
    ?.filter(
      (exclusion) =>
        customer?.allergy && customer?.allergy.includes(exclusion._id)
    )
    .flatMap((exclusion) => exclusion.ingredient_name.trim().toLowerCase());

  const handleApplyFilters = (filters) => {
    const filteredServices = allServices.filter((service) => {
      if (
        filters.searchInput &&
        !service.service_name
          .toLowerCase()
          .includes(filters.searchInput.toLowerCase())
      ) {
        return false;
      }

      const servicePrice = parseFloat(service.price);
      if (
        filters.priceRange &&
        ((filters.priceRange.min &&
          servicePrice < parseFloat(filters.priceRange.min)) ||
          (filters.priceRange.max &&
            servicePrice > parseFloat(filters.priceRange.max)))
      ) {
        return false;
      }

      if (
        filters.ratings &&
        filters.ratings > 0 &&
        service.ratings < parseFloat(filters.ratings)
      ) {
        return false;
      }

      if (filters.categories && Array.isArray(service.type)) {
        const filterCategories = filters.categories
          .split(",")
          .map((category) => category.trim().toLowerCase());

        const serviceTypes = service.type.map((type) =>
          type.trim().toLowerCase()
        );

        if (
          !filterCategories.includes("all") &&
          !filterCategories.includes("All") &&
          !serviceTypes.some((type) => filterCategories.includes(type))
        ) {
          return false;
        }
      }

      if (
        filters.occassion &&
        service.occassion &&
        service.occassion.trim().toLowerCase() !==
          filters.occassion.toLowerCase()
      ) {
        return false;
      }

      const isExcluded = service.product?.some((product) => {
        const productIngredients =
          product.ingredients?.toLowerCase().split(", ") || [];
        return filteredExclusions?.some((exclusion) =>
          productIngredients.includes(exclusion)
        );
      });

      return !isExcluded;
    });

    setIsFilterApplied(true);
    setVisibleFilteredItems(filteredServices);
  };

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

  const itemsPerPage = {
    "2xl": 4,
    xl: 3,
    lg: 2,
    md: 2,
  };

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPageState, setItemsPerPageState] = useState(
    determineItemsPerPage()
  );

  function determineItemsPerPage() {
    if (window.innerWidth >= 1535) {
      return itemsPerPage["2xl"];
    } else if (window.innerWidth >= 1280) {
      return itemsPerPage.xl;
    } else if (window.innerWidth >= 1024) {
      return itemsPerPage.lg;
    } else return itemsPerPage.md;
  }

  const totalNewItemsPages = Math.ceil(newItems?.length / itemsPerPageState);
  const totalFilteredItemsPages = Math.ceil(
    visibleFilteredItems?.length / itemsPerPageState
  );

  const showNextNewItems = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, totalNewItemsPages - 1)
    );
  };

  const showPreviousNewItems = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const showNextFilteredItems = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, totalFilteredItemsPages - 1)
    );
  };

  const showPreviousFilteredItems = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const startIndex = currentPage * itemsPerPageState;
  const endIndex = startIndex + itemsPerPageState;

  const visibleNewItems = newItems.slice(startIndex, endIndex);
  const visibleNewFilterItems = visibleFilteredItems.slice(
    startIndex,
    endIndex
  );

  useEffect(() => {
    const handleResize = () => {
      setCurrentPage(0);
      setItemsPerPageState(determineItemsPerPage());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handlePress = (selectedProduct) => {
    dispatch(
      appointmentSlice.actions.setService({
        service_id: selectedProduct?._id || "",
        service_name: selectedProduct?.service_name || "",
        type: selectedProduct?.type || [],
        duration: selectedProduct?.duration || 0,
        description: selectedProduct?.description || "",
        product_name:
          selectedProduct?.product?.map((p) => p.product_name).join(", ") || "",
        price: selectedProduct?.price || 0,
        extraFee: selectedProduct?.extraFee || 0,
        image: selectedProduct?.image || [],
      })
    );
  };

  return (
    <>
      {servicesLoading || exclusionLoading ? (
        <div className="loader">
          <FadeLoader color="#FFB6C1" loading={true} size={50} />
        </div>
      ) : (
        <>
          <div className="flex h-full">
            <CustomerServicesSidebar setFilters={handleApplyFilters} />
            <div className="grid items-center flex-1 w-full h-full grid-flow-row-dense m-10 gap-y-8">
              <div className="grid grid-cols-[10%_90%] xl:gap-x-0 md:gap-x-4">
                <div>
                  <button className="text-3xl" onClick={goBack}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                  </button>
                </div>
                <div className="grid items-center justify-center grid-flow-col-dense gap-x-6">
                  <div
                    onClick={handleAllServices}
                    className="px-6 py-2 text-center rounded-full cursor-pointer bg-primary-default text-dark-default xl:w-32 lg:w-full md:text-sm"
                  >
                    <button>All Services</button>
                  </div>
                  <div
                    onClick={handlePopular}
                    className="px-6 py-2 text-center rounded-full cursor-pointer bg-dark-default text-light-default dark:bg-light-default dark:text-dark-default xl:w-32 lg:w-full md:text-sm"
                  >
                    <button>Popular</button>
                  </div>
                  <div
                    onClick={handleLatest}
                    className="px-6 py-2 text-center rounded-full cursor-pointer bg-dark-default text-light-default dark:bg-light-default dark:text-dark-default xl:w-32 lg:w-full md:text-sm"
                  >
                    <button>Latest</button>
                  </div>
                  <div
                    onClick={handleBudget}
                    className="px-6 py-2 text-center rounded-full cursor-pointer bg-dark-default text-light-default dark:bg-light-default dark:text-dark-default xl:w-32 lg:w-full md:text-sm"
                  >
                    <button>Budget</button>
                  </div>
                </div>
              </div>
              <div className="pb-10">
                <div className="grid items-center justify-end w-full">
                  {isFilterApplied
                    ? totalFilteredItemsPages > 1 && (
                        <div className="flex items-end justify-end mb-4">
                          <button
                            className="px-3 py-1 mr-2 text-xl rounded-full bg-primary-default w-fit"
                            onClick={showPreviousFilteredItems}
                            disabled={currentPage === 0}
                          >
                            <FontAwesomeIcon icon={faArrowLeft} />
                          </button>
                          <button
                            className="px-3 py-1 ml-2 text-xl rounded-full bg-primary-default w-fit"
                            onClick={showNextFilteredItems}
                            disabled={
                              currentPage === totalFilteredItemsPages - 1
                            }
                          >
                            <FontAwesomeIcon icon={faArrowRight} />
                          </button>
                        </div>
                      )
                    : totalNewItemsPages > 1 && (
                        <div className="flex items-end justify-end mb-4">
                          <button
                            className="px-3 py-1 mr-2 text-xl rounded-full bg-primary-default w-fit"
                            onClick={showPreviousNewItems}
                            disabled={currentPage === 0}
                          >
                            <FontAwesomeIcon icon={faArrowLeft} />
                          </button>
                          <button
                            className="px-3 py-1 ml-2 text-xl rounded-full bg-primary-default w-fit"
                            onClick={showNextNewItems}
                            disabled={currentPage === totalNewItemsPages - 1}
                          >
                            <FontAwesomeIcon icon={faArrowRight} />
                          </button>
                        </div>
                      )}
                </div>
                <div className="overflow-x-auto">
                  <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 gap-4 w-[calc(64px + 10rem * 5)] mx-auto">
                    {isFilterApplied
                      ? visibleNewFilterItems.map((service) => (
                          <div
                            className="flex flex-col w-full h-full p-8 rounded-md bg-primary-default"
                            key={service._id}
                          >
                            <div
                              onClick={() =>
                                navigate(`/receptionist/service/${service._id}`)
                              }
                              className="grid items-center justify-center cursor-pointer"
                            >
                              <img
                                className="object-center w-64 h-64 rounded-full"
                                src={
                                  service?.image && service?.image?.length
                                    ? service?.image[
                                        Math.floor(
                                          Math.random() * service?.image?.length
                                        )
                                      ]?.url
                                    : null
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
                              {service?.description?.length > 10
                                ? `${service.description.slice(0, 10)}...`
                                : service.description}
                            </h1>
                            <h1 className="pb-1 text-lg font-extralight">
                              Products used:
                            </h1>
                            <span className="grid flex-grow grid-cols-2 grid-flow-rows-dense w-fit gap-x-2">
                              {service?.product?.map((product, index) => (
                                <div key={index}>
                                  {product?.product_name?.length > 15
                                    ? `${product?.product_name.slice(0, 15)}...`
                                    : product?.product_name}
                                </div>
                              ))}
                            </span>
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
                                <FontAwesomeIcon
                                  icon={faStarHalf}
                                  color="#feca57"
                                />
                              )}
                            </span>
                            <div className="grid items-end grid-flow-col-dense mt-4">
                              <h1 className="pt-4 text-xl">₱{service.price}</h1>
                              <span className="grid items-end justify-end">
                                <button
                                  onClick={() => handlePress(service)}
                                  className="text-lg px-3 py-[.6rem] rounded-lg text-dark-default bg-primary-t4 hover:bg-primary-accent"
                                >
                                  Add Cart
                                </button>
                              </span>
                            </div>
                          </div>
                        ))
                      : visibleNewItems.map((service) => (
                          <div
                            className="flex flex-col w-full h-full p-8 rounded-md bg-primary-default"
                            key={service._id}
                          >
                            <div
                              onClick={() =>
                                navigate(`/receptionist/service/${service._id}`)
                              }
                              className="grid items-center justify-center cursor-pointer"
                            >
                              <img
                                className="object-center w-64 h-64 rounded-full"
                                src={
                                  service?.image && service?.image?.length
                                    ? service?.image[
                                        Math.floor(
                                          Math.random() * service?.image?.length
                                        )
                                      ]?.url
                                    : null
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
                              {service?.description?.length > 10
                                ? `${service.description.slice(0, 10)}...`
                                : service.description}
                            </h1>
                            <h1 className="pb-1 text-lg font-extralight">
                              Products used:
                            </h1>
                            <span className="grid flex-grow grid-cols-2 grid-flow-rows-dense w-fit gap-x-2">
                              {service?.product?.map((product, index) => (
                                <div key={index}>
                                  {product?.product_name?.length > 15
                                    ? `${product?.product_name.slice(0, 15)}...`
                                    : product?.product_name}
                                </div>
                              ))}
                            </span>
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
                                <FontAwesomeIcon
                                  icon={faStarHalf}
                                  color="#feca57"
                                />
                              )}
                            </span>
                            <div className="grid items-end grid-flow-col-dense mt-4">
                              <h1 className="pt-4 text-xl">₱{service.price}</h1>
                              <span className="grid items-end justify-end">
                                <button
                                  onClick={() => handlePress(service)}
                                  className="text-lg px-3 py-[.6rem] rounded-lg text-dark-default bg-primary-t4 hover:bg-primary-accent"
                                >
                                  Add Cart
                                </button>
                              </span>
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
