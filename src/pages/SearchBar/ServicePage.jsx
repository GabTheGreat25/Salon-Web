import React, { useState, useEffect } from "react";
import { CustomerServicesSidebar } from "@components";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGetServiceByNameQuery } from "@api";
import { useParams } from "react-router-dom";
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

  const { service_name } = useParams();
  const { data, isLoading } = useGetServiceByNameQuery(service_name);
  const services = data?.details || [];
  
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
                <div className="overflow-x-auto">
                  <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 gap-4 w-[calc(64px + 10rem * 5)] mx-auto">
                      <div
                        className="w-full h-full p-8 rounded-md bg-primary-default"
                        key={services._id}
                      >
                        <div
                          onClick={() =>
                            navigate(
                              `${
                                isOnlineCustomer
                                  ? "/onlineCustomer"
                                  : "/walkInCustomer"
                              }/service/${services._id}`
                            )
                          }
                          className="grid items-center justify-center cursor-pointer"
                        >
                          <img
                            className="object-center w-64 h-64 rounded-full"
                            src={
                              services?.image && services?.image.length
                                ? services?.image[
                                    Math.floor(
                                      Math.random() * services?.image.length
                                    )
                                  ]?.url
                                : null
                            }
                            alt={services?.image?.originalname}
                            key={services?.image?.public_id}
                          />
                        </div>
                        <h1 className="pt-3 text-2xl font-semibold">
                          {services?.service_name.length > 10
                            ? `${services.service_name.slice(0, 10)}...`
                            : services.service_name}
                        </h1>
                        <h1 className="text-lg font-extralight">
                          {services?.description.length > 10
                            ? `${services.description.slice(0, 10)}...`
                            : services.description}
                        </h1>
                        <img src={DummyRatings} alt="DummyRatings" />
                        <div className="grid items-end grid-flow-col-dense mt-4">
                          <h1 className="pt-4 text-xl">₱{services.price}</h1>
                          <span className="grid items-end justify-end">
                            <button className="text-lg px-3 py-[.6rem] rounded-lg bg-secondary-default">
                              Add Cart
                            </button>
                          </span>
                        </div>
                      </div>
                   
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
