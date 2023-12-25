import React from "react";
import { RandomServicesSidebar } from "@/components";
import "react-toastify/dist/ReactToastify.css";
import { FadeLoader } from "react-spinners";
import { useGetServiceByIdQuery } from "@api";
import { useParams } from "react-router-dom";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DummyRatings from "@assets/Rating.png";
import Avatar from "@assets/Avatar.png";

export default function () {
  const goBack = () => {
    window.history.back();
  };

  const { id } = useParams();
  const { data, isLoading } = useGetServiceByIdQuery(id);

  const { _id, service_name, description, price, image } = data?.details || {};
  const randomizedImages = image?.length
    ? image[Math.floor(Math.random() * image.length)].url
    : null;

  return (
    <>
      {isLoading ? (
        <div className="loader">
          <FadeLoader color="#FDA7DF" loading={true} size={50} />
        </div>
      ) : (
        <>
          <div className="flex flex-row-reverse h-full">
            <RandomServicesSidebar />
            <div className="grid flex-1 w-full h-full mx-20 my-10 gap-y-24">
              <div
                key={_id}
                className="w-full h-full px-8 py-6 rounded-lg bg-primary-default"
              >
                <button className="pb-10 text-3xl w-fit" onClick={goBack}>
                  <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <div className="grid px-8 lg:grid-cols-2 gap-x-8">
                  <div className="grid items-center justify-center pb-10">
                    <img
                      key={randomizedImages?.public_id}
                      src={randomizedImages}
                      alt={randomizedImages?.originalname}
                      className="object-cover rounded-xl 2xl:w-96 2xl:h-96 xl:w-72 xl:h-72"
                    />
                  </div>
                  <div>
                    <h1 className="font-semibold xl:text-3xl lg:text-xl md:text-lg">
                      {service_name}
                    </h1>
                    <div className="grid items-center justify-center grid-cols-2 pb-10 w-fit gap-x-3">
                      <img src={DummyRatings} alt="DummyRatings" />
                      <p className="font-semibold">(4.6)</p>
                    </div>
                    <h1 className="pb-10 font-semibold xl:text-3xl lg:text-xl md:text-lg">
                      ₱ {price}
                    </h1>
                    <h1 className="pb-4 font-semibold xl:text-3xl lg:text-xl md:text-lg">
                      Service Description
                    </h1>
                    <h1 className="pb-10 font-semibold xl:text-3xl lg:text-xl md:text-lg">
                      {description}
                    </h1>
                    <div className="grid items-center justify-end">
                      <button className="px-6 py-3 rounded-lg xl:text-2xl lg:text-xl w-fit bg-secondary-default">
                        Add Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full h-full py-6 rounded-lg bg-primary-default">
                <div className="px-8">
                  <h1 className="pb-4 font-semibold xl:text-3xl lg:text-xl md:text-lg">
                    Service Review
                  </h1>
                  <div className="grid grid-flow-row-dense gap-y-8">
                    <div className="rounded-md lg:p-8 md:p-4 bg-light-default dark:bg-dark-default">
                      <div className="grid gap-4 xl:grid-flow-col-dense">
                        <div className="grid grid-flow-row-dense xl:items-start xl:justify-start md:items-center md:justify-center">
                          <h1 className="xl:text-start md:text-center 2xl:text-2xl xl:text-xl lg:text-lg md:text-base">
                            4.6 out of 5
                          </h1>
                          <img
                            src={DummyRatings}
                            alt="DummyRatings"
                            className="object-cover"
                          />
                        </div>
                        <div className="grid items-center justify-center grid-flow-col-dense md:gap-x-2 xl:gap-x-4">
                          <div className="py-2 border rounded-lg lg:px-4 md:px-2 border-primary-default hover:bg-primary-accent">
                            <button className="2xl:text-2xl xl:text-xl lg:text-sm md:text-xs">
                              5 Stars
                            </button>
                          </div>
                          <div className="py-2 border rounded-lg lg:px-4 md:px-2 border-primary-default hover:bg-primary-accent">
                            <button className="2xl:text-2xl xl:text-xl lg:text-sm md:text-xs">
                              4 Stars
                            </button>
                          </div>
                          <div className="py-2 border rounded-lg lg:px-4 md:px-2 border-primary-default hover:bg-primary-accent">
                            <button className="2xl:text-2xl xl:text-xl lg:text-sm md:text-xs">
                              3 Stars
                            </button>
                          </div>
                          <div className="py-2 border rounded-lg lg:px-4 md:px-2 border-primary-default hover:bg-primary-accent">
                            <button className="2xl:text-2xl xl:text-xl lg:text-sm md:text-xs">
                              2 Stars
                            </button>
                          </div>
                          <div className="py-2 border rounded-lg lg:px-4 md:px-2 border-primary-default hover:bg-primary-accent">
                            <button className="2xl:text-2xl xl:text-xl lg:text-sm md:text-xs">
                              1 Star
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="px-8 py-4 rounded-md bg-light-default dark:bg-dark-default">
                      <div className="grid items-center justify-center grid-flow-col-dense w-fit gap-x-6">
                        <div>
                          <img src={Avatar} alt="Avatar" />
                        </div>
                        <div>
                          <h1 className="font-semibold xl:text-lg md:text-base">
                            Satisfied Customer
                          </h1>
                          <img src={DummyRatings} alt="DummyRatings" />
                        </div>
                      </div>
                      <h1 className="py-4 pl-24 text-lg text-justify">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Ut erat mauris, rhoncus non nibh in, commodo viverra
                        elit. Nam sed faucibus dui. Suspendisse placerat
                        venenatis dui, eget iaculis purus tincidunt vitae. Etiam
                        semper finibus hendrerit. Sed at quam quis elit mattis
                        vehicula quis bibendum nisi.
                      </h1>
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
