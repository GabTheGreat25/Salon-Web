import React from "react";
import { useParams } from "react-router-dom";
import { useGetUserByIdQuery } from "@api";
import { FadeLoader } from "react-spinners";
import { Card } from "@components";
import noImg from "@assets/no-photo.jpg";

export default function () {
  const { id } = useParams();
  const { data, isLoading } = useGetUserByIdQuery(id);
  const customer = data?.details;

  return (
    <>
      {isLoading ? (
        <div className="loader">
          <FadeLoader color="#FDA7DF" loading={true} size={50} />
        </div>
      ) : (
        <>
          <Card>
            <div className="grid w-full h-full text-light-default dark:text-dark-default">
              <span className="grid items-end md:gap-y-10 justify-center 2xl:grid-rows-[90%_10%] xl:grid-rows-[80%_20%] md:grid-rows-[75%_25%]">
                <h1 className="font-semibold text-center xl:text-3xl lg:text-2xl md:text-xl">
                  Customer Information
                </h1>
              </span>
              <div className="grid items-center justify-center pb-6 overflow-x-hidden gap-x-6 2xl:pr-0 md:pr-10">
                <div className="grid grid-cols-[50%_50%] items-center justify-center gap-x-6 2xl:pr-0 md:pr-10 pt-6">
                  <div className="grid items-end justify-center w-full grid-flow-row-dense pr-12 ml-4 gap-y-4">
                    <label className="block">
                      <span className="text-light-default xl:text-xl lg:text-[1rem] md:text-xs font-semibold">
                        Customer Name:
                      </span>
                      <input
                        type="text"
                        readOnly
                        value={customer?.name}
                        className="block mb-2 ml-6 xl:text-lg lg:text-[1rem]  border-0 bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full"
                      />
                    </label>
                    <label className="block">
                      <span className="text-light-default xl:text-xl lg:text-[1rem] md:text-xs font-semibold">
                        Customer Email:
                      </span>
                      <input
                        type="text"
                        readOnly
                        value={customer?.email}
                        className=" block mb-2 ml-6 xl:text-lg lg:text-[1rem]  border-0 bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full"
                      />
                    </label>
                    <label className="block">
                      <span className="text-light-default xl:text-xl lg:text-[1rem] md:text-xs font-semibold">
                        Contact Number:
                      </span>
                      <input
                        type="text"
                        readOnly
                        value={customer?.contact_number}
                        className=" block mb-2 ml-6 xl:text-lg lg:text-[1rem]  border-0 bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full"
                      />
                    </label>
                    <label className="block">
                      <span className="text-light-default xl:text-xl lg:text-[1rem] md:text-xs font-semibold">
                        Customer Age:
                      </span>
                      <input
                        type="text"
                        readOnly
                        value={customer?.age}
                        className=" block mb-2 ml-6 xl:text-lg lg:text-[1rem]  border-0 bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full"
                      />
                    </label>
                    <label className="block">
                      <span className="text-light-default xl:text-xl lg:text-[1rem] md:text-xs font-semibold">
                        Customer Role:
                      </span>
                      <input
                        type="text"
                        readOnly
                        value={customer?.roles}
                        className=" block mb-2 ml-6 xl:text-lg lg:text-[1rem]  border-0 bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full"
                      />
                    </label>
                  </div>
                  <div className="flex flex-col items-center justify-center mb-4 md:mb-0">
                    <div className="mb-6 2xl:mr-32 xl:mr-10 lg:mr-6 md:mb-0">
                      {customer?.image.map((img, index) => (
                        <img
                          key={index}
                          className="rounded-full w-72 h-72"
                          src={
                            img?.image && img?.image?.length > 1
                              ? img?.image[
                                  Math.floor(Math.random() * img?.image?.length)
                                ]?.url
                              : img?.url || noImg
                          }
                          alt="image"
                        />
                      ))}
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <label className="block">
                        <span className="text-light-default xl:text-xl lg:text-[1rem] md:text-xs font-semibold">
                          Allergies:
                        </span>
                        {customer?.information?.allergy.map((a, index) => (
                          <input
                            key={index}
                            type="text"
                            readOnly
                            value={a}
                            className="block mb-2 ml-6 xl:text-lg lg:text-[1rem] border-0 bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full"
                          />
                        ))}
                      </label>

                      <label className="block">
                        <span className="text-light-default xl:text-xl lg:text-[1rem] md:text-xs font-semibold">
                          Preferences:
                        </span>
                        {customer?.information?.product_preference.map(
                          (p, index) => (
                            <input
                              key={index}
                              type="text"
                              readOnly
                              value={p}
                              className="block mb-2 ml-6 xl:text-lg lg:text-[1rem] border-0 bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full"
                            />
                          )
                        )}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </>
      )}
    </>
  );
}
