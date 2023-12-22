import React from "react";
import { useGetServicesQuery } from "@api";
import DummyRatings from "@assets/Rating.png";
import { FadeLoader } from "react-spinners";

const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

const NewItemsComponent = () => {
  const { data, isLoading } = useGetServicesQuery();
  const randomizedItems =
    !isLoading && data?.details
      ? shuffleArray([...data.details]).slice(0, 6)
      : [];

  return (
    <div
      className={`min-h-screen px-4 pb-4 mt-2 rounded shadow-lg w-72 ${
        isLoading ? "loader" : ""
      }`}
    >
      {isLoading ? (
        <FadeLoader color="#FDA7DF" loading={true} size={50} />
      ) : (
        <>
          <div className="grid items-center justify-center">
            <div className="p-4 overflow-hidden font-semibold text-center capitalize xl:text-lg lg:text-base md:text-sm whitespace-nowrap">
              Other Services you <br /> may like
            </div>
          </div>
          <div className="overflow-x-auto">
            <div className="flex flex-col gap-4">
              {randomizedItems.map((service) => (
                <div
                  className="w-full p-8 rounded-md m- bg-primary-default"
                  key={service._id}
                >
                  <div className="grid items-center justify-center">
                    <img
                      className="object-center w-32 h-32 rounded-full"
                      src={
                        service?.image && service?.image.length
                          ? service?.image[
                              Math.floor(Math.random() * service?.image.length)
                            ]?.url
                          : null
                      }
                      alt={service?.image?.originalname}
                      key={service?.image?.public_id}
                    />
                  </div>
                  <h1 className="pt-3 text-lg font-semibold">
                    {service?.service_name.length > 10
                      ? `${service.service_name.slice(0, 10)}...`
                      : service.service_name}
                  </h1>
                  <h1 className="text-base font-extralight">
                    {service?.description.length > 10
                      ? `${service.description.slice(0, 10)}...`
                      : service.description}
                  </h1>

                  <div className="grid items-end grid-flow-col-dense mt- gap-x-4">
                    <h1 className="pt-4 text-base">₱{service.price}</h1>
                    <span className="grid items-center justify-center">
                      <img src={DummyRatings} alt="DummyRatings" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NewItemsComponent;
