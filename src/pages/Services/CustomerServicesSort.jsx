import React, { useState, useEffect } from "react";
import { CustomerServicesSidebar } from "@components";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGetServicesQuery } from "@api";
import { FadeLoader } from "react-spinners";
import DummyRatings from "@assets/Rating.png";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

export default function () {
  const user = useSelector((state) => state.auth.user);

  const isOnlineCustomer = user?.roles?.includes("Online Customer");

  const navigate = useNavigate();

  const handleRelevance = () => {
    navigate(
      `${
        isOnlineCustomer ? "/onlineCustomer" : "/walkInCustomer"
      }/CustomerServicesRelevance`
    );
  };

  const handlePopular = () => {
    navigate(
      `${
        isOnlineCustomer ? "/onlineCustomer" : "/walkInCustomer"
      }/CustomerServicesPopular`
    );
  };

  const handleLatest = () => {
    navigate(
      `${
        isOnlineCustomer ? "/onlineCustomer" : "/walkInCustomer"
      }/CustomerServicesLatest`
    );
  };

  const handleBudget = () => {
    navigate(
      `${
        isOnlineCustomer ? "/onlineCustomer" : "/walkInCustomer"
      }/CustomerServicesBudget`
    );
  };

  const handleSort = () => {
    navigate(
      `${
        isOnlineCustomer ? "/onlineCustomer" : "/walkInCustomer"
      }/CustomerServicesSort`
    );
  };

  const goBack = () => {
    navigate(`${isOnlineCustomer ? "/onlineCustomer" : "/walkInCustomer"}`);
  };

  const { data, isLoading } = useGetServicesQuery();
  const services = data?.details || [];

  const newItems = services.filter(
    (service) =>
      service.product &&
      service.product.length === 1 &&
      service.product[0].isNew === true
  );

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

  const totalNewItemsPages = Math.ceil(newItems.length / itemsPerPageState);

  const showNextNewItems = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, totalNewItemsPages - 1)
    );
  };

  const showPreviousNewItems = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const startIndex = currentPage * itemsPerPageState;
  const endIndex = startIndex + itemsPerPageState;

  const visibleNewItems = newItems.slice(startIndex, endIndex);

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

  return (
    <>
      {isLoading ? (
        <div className="loader">
          <FadeLoader color="#FDA7DF" loading={true} size={50} />
        </div>
      ) : (
        <>
          <div className="flex h-full">
            <CustomerServicesSidebar />
            <div className="grid items-center flex-1 w-full h-full grid-flow-row-dense m-10 gap-y-8">
              <div className="grid grid-cols-[10%_90%]  xl:gap-x-0 md:gap-x-4">
                <div>
                  <button className="text-3xl" onClick={goBack}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                  </button>
                </div>
                <div className="grid items-center justify-center grid-flow-col-dense gap-x-6">
                  <div
                    onClick={handleSort}
                    className="px-6 py-2 text-center rounded-full cursor-pointer bg-primary-default text-light-default dark:text-dark-default xl:w-32 lg:w-full md:text-sm"
                  >
                    <button>Sort</button>
                  </div>
                  <div
                    onClick={handleRelevance}
                    className="px-6 py-2 text-center rounded-full cursor-pointer bg-dark-default text-light-default dark:bg-light-default dark:text-dark-default xl:w-32 lg:w-full md:text-sm"
                  >
                    <button>Relevance</button>
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
                  {totalNewItemsPages > 1 && (
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
                    {visibleNewItems.map((service) => (
                      <div
                        className="w-full h-full p-8 rounded-md bg-primary-default"
                        key={service._id}
                      >
                        <div
                          onClick={() =>
                            navigate(
                              `${
                                isOnlineCustomer
                                  ? "/onlineCustomer"
                                  : "/walkInCustomer"
                              }/service/${service._id}`
                            )
                          }
                          className="grid items-center justify-center cursor-pointer"
                        >
                          <img
                            className="object-center w-64 h-64 rounded-full"
                            src={
                              service?.image && service?.image.length
                                ? service?.image[
                                    Math.floor(
                                      Math.random() * service?.image.length
                                    )
                                  ]?.url
                                : null
                            }
                            alt={service?.image?.originalname}
                            key={service?.image?.public_id}
                          />
                        </div>
                        <h1 className="pt-3 text-2xl font-semibold">
                          {service?.service_name.length > 10
                            ? `${service.service_name.slice(0, 10)}...`
                            : service.service_name}
                        </h1>
                        <h1 className="text-lg font-extralight">
                          {service?.description.length > 10
                            ? `${service.description.slice(0, 10)}...`
                            : service.description}
                        </h1>
                        <img src={DummyRatings} alt="DummyRatings" />
                        <div className="grid items-end grid-flow-col-dense mt-4">
                          <h1 className="pt-4 text-xl">₱{service.price}</h1>
                          <span className="grid items-end justify-end">
                            <button className="text-lg px-3 py-[.6rem] rounded-lg bg-secondary-default">
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
