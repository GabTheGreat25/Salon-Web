import React from "react";
import { useParams } from "react-router-dom";
import { useGetUserByIdQuery } from "@api";
import { FadeLoader } from "react-spinners";
import { Card, CardImage } from "@components";

export default function () {
  const { id } = useParams();
  const { data, isLoading } = useGetUserByIdQuery(id);
  const customer = data?.details;
  console.log(customer);

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
                <h1 className="text-3xl font-semibold text-center">
                  Customer Information
                </h1>
              </span>
              <div className="overflow-x-hidden grid items-center justify-start pt-20 pb-6 gap-x-6 2xl:pr-0 md:pr-10">
                <div className="grid grid-cols-[50%_50%] items-center justify-center gap-x-6 2xl:pr-0 md:pr-10">
                  <form className="grid items-end justify-center w-full grid-flow-row-dense pr-12 2xl:h-5/6 xl:h-full gap-y-4 ml-4">
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
                  </form>
                  <div className="flex flex-col items-center justify-center mb-4 md:mb-0">
                    <div className="flex justify-center mb-4 md:mb-0">
                      {customer?.image.map((img, index) => (
                        <img
                          key={index}
                          className="w-72 h-72 rounded-full"
                          src={img?.url}
                          alt="test image"
                        />
                      ))}
                    </div>
                    <div className="flex items-center justify-between mt-2">
                    <label className="block">
                      <span className="text-light-default xl:text-xl lg:text-[1rem] md:text-xs font-semibold">
                         Allergies:
                      </span>
                      {customer?.information?.allergy.map((a) => (
                        <input
                          key={a?._id}
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
                        (p) => (
                          <input
                            key={p?._id}
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
