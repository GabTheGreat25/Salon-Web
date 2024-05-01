import React, { useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetProductByIdQuery, useGetBrandByIdQuery } from "@api";
import { FadeLoader } from "react-spinners";
import { Card, CardImage } from "@components";

export default function () {
  const isFocused = useRef(true);

  const { id } = useParams();

  const { data, isLoading, refetch } = useGetProductByIdQuery(id);
  const product = data?.details;

  const {
    data: brand,
    isLoading: brandLoading,
    refetch: refetchBrand,
  } = useGetBrandByIdQuery(product?.brand);

  useEffect(() => {
    const handleFocus = async () => {
      isFocused.current = true;
      await Promise.all([refetch(), refetchBrand()]);
    };

    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, [refetch, refetchBrand]);

  const randomImage =
    product?.image?.length > 0
      ? product?.image[Math.floor(Math.random() * product?.image?.length)]
      : null;

  return (
    <>
      {isLoading || brandLoading ? (
        <div className="loader">
          <FadeLoader color="#FFB6C1" loading={true} size={50} />
        </div>
      ) : (
        <>
          <Card>
            <div className="grid w-full h-full pb-10 text-light-default dark:text-dark-default">
              <span className="grid items-end justify-center">
                <h1 className="pt-10 font-semibold xl:text-5xl md:text-4xl">
                  Product Information
                </h1>
              </span>
              <div className="grid grid-cols-[40%_60%] items-start justify-start pt-6 gap-x-6">
                <span className="grid items-end justify-end h-[90%] mt-20">
                  <CardImage />
                </span>
                <div className="grid grid-flow-row-dense pr-10 gap-y-4">
                  <label className="block">
                    <div className="flex items-center justify-center">
                      {randomImage && (
                        <img
                          src={randomImage.url}
                          alt={randomImage.originalname}
                          key={randomImage._id}
                          className="rounded-lg"
                        />
                      )}
                    </div>
                  </label>
                  <label className="block">
                    <span className="xl:text-xl md:text-[1rem] font-semibold">
                      Product Name:
                    </span>
                    <input
                      type="text"
                      readOnly
                      value={product?.product_name}
                      className="block mb-2 ml-6 xl:text-lg md:text-[1rem]  border-0 bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full"
                    />
                  </label>
                  <label className="block">
                    <span className="xl:text-xl md:text-[1rem] font-semibold">
                      Product Brand:
                    </span>
                    <input
                      type="text"
                      readOnly
                      value={brand?.details?.brand_name}
                      className="block mb-2 ml-6 xl:text-lg md:text-[1rem]  border-0 bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full"
                    />
                  </label>
                  <label className="block">
                    <span className="xl:text-xl md:text-[1rem] font-semibold">
                      Product Category:
                    </span>
                    <input
                      type="text"
                      readOnly
                      value={product?.type}
                      className="block mb-2 ml-6 xl:text-lg md:text-[1rem]  border-0 bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full"
                    />
                  </label>
                  <label className="block">
                    <span className="xl:text-xl md:text-[1rem] font-semibold">
                      Product Status:
                    </span>
                    <input
                      type="text"
                      readOnly
                      value={product?.isNew ? "New Product" : "Old Product"}
                      className="block mb-2 ml-6 xl:text-lg md:text-[1rem]  border-0 bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full"
                    />
                  </label>
                  <label className="block">
                    <span className="xl:text-xl md:text-[1rem] font-semibold">
                      Product Ingredients:
                    </span>
                    <textarea
                      value={product?.ingredients}
                      className="resize-none block my-4 xl:text-xl md:text-[1rem] placeholder-white border-2 bg-card-input w-full border-light-default dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default rounded-lg"
                      rows="8"
                    ></textarea>
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
