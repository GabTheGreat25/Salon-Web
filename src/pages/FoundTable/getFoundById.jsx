import { React } from "react";
import { useParams } from "react-router-dom";
import { useGetFoundByIdQuery } from "@api";
import { FadeLoader } from "react-spinners";
import { Card, CardImage } from "@components";

export default function () {
  const { id } = useParams();

  const { data, isLoading } = useGetFoundByIdQuery(id);
  const found = data?.details;

  const randomImage =
  found?.equipment?.image?.length > 0
    ? found?.equipment?.image[Math.floor(Math.random() * found?.equipment?.image?.length)]
    : null;


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
                <h1 className="pt-10 font-semibold xl:text-5xl md:text-4xl">
                   Found Equipment Details
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
                      Equipment Name:
                    </span>
                    <input
                      type="text"
                      readOnly
                      value={found?.equipment?.equipment_name}
                      className="block mb-2 ml-6 xl:text-lg md:text-[1rem]  border-0 bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full"
                    />
                  </label>
                  <label className="block">
                    <span className="xl:text-xl md:text-[1rem] font-semibold">
                      Date Missing:
                    </span>
                    <input
                      type="text"
                      readOnly
                      value={
                        new Date(found?.date_missing).toISOString().split("T")[0]
                      }
                      className="block mb-2 ml-6 xl:text-lg md:text-[1rem]  border-0 bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full"
                    />
                  </label>
                  <label className="block">
                    <span className="xl:text-xl md:text-[1rem] font-semibold">
                      Date Found:
                    </span>
                    <input
                      type="text"
                      readOnly
                      value={
                        new Date(found?.date_found).toISOString().split("T")[0]
                      }
                      className="block mb-2 ml-6 xl:text-lg md:text-[1rem]  border-0 bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full"
                    />
                  </label>
                  <label className="block">
                    <span className="xl:text-xl md:text-[1rem] font-semibold">
                     Quantity Found:
                    </span>
                    <input
                      value={found?.quantity_found}
                      className="block mb-2 ml-6 xl:text-lg md:text-[1rem]  border-0 bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full"
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
