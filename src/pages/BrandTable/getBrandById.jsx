import { React } from "react";
import { useParams } from "react-router-dom";
import { useGetBrandByIdQuery } from "@api";
import { FadeLoader } from "react-spinners";
import { Card, CardImage } from "@components";

export default function () {
  const { id } = useParams();

  const { data, isLoading } = useGetBrandByIdQuery(id);
  const brand = data?.details;

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
                <h1 className="pt-10 font-semibold lg:text-5xl md:text-4xl">
                  Brand Information
                </h1>
              </span>
              <div className="grid grid-cols-[40%_60%] items-start justify-start pt-6 gap-x-6">
                <span className="grid items-end justify-end h-[90%] mt-20">
                  <CardImage />
                </span>
                <div className="grid grid-flow-row-dense pr-10 gap-y-4">
                  <label className="block">
                    <span className="xl:text-xl lg:text-[1rem] md:text-xs font-semibold">
                      Brand:
                    </span>
                    <input
                      type="text"
                      readOnly
                      value={brand?.brand_name}
                      className="block mb-2 ml-6 xl:text-lg lg:text-[1rem]  border-0 bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full"
                    />
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
