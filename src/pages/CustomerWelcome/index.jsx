import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Beautician from "@assets/Beautician.png";
import Logo3 from "@assets/Logo-3.png";
import CustomerTwo from "@assets/customerTwo.png";
import CustomerThree from "@assets/customerThree.png";
import CustomerFour from "@assets/customerFour.png";
import WelcomeIconOne from "@assets/welcome-iconOne.png";
import WelcomeIconTwo from "@assets/welcome-iconTwo.png";
import WelcomeIconThree from "@assets/welcome-iconThree.png";
import WelcomeIconFour from "@assets/welcome-iconFour.png";
import LandingPageBg from "@assets/Landing-Page-Bg.png";
import ServicesOne from "@assets/servicesOne.png";
import ServicesTwo from "@assets/servicesTwo.png";
import ServicesThree from "@assets/servicesThree.png";
import ServicesFour from "@assets/servicesFour.png";
import ServicesFive from "@assets/servicesFive.png";
import DummyRatings from "@assets/Rating.png";
import DummyQrCode from "@assets/qrCode.png";
import { useGetServicesQuery } from "@api";
import { FadeLoader } from "react-spinners";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { appointmentSlice } from "@appointment";

export default function () {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartServices = useSelector(
    (state) => state.appointment.appointmentData
  );

  console.log("Cart Services:", cartServices);

  const handlePress = (selectedProduct) => {
    dispatch(
      appointmentSlice.actions.setService({
        service_id: selectedProduct?._id || "",
        service_name: selectedProduct?.service_name || "",
        product_name:
          selectedProduct?.product?.map((p) => p.product_name).join(", ") || "",
        price: selectedProduct?.price || 0,
        extraFee: selectedProduct?.extraFee || 0,
        image: selectedProduct?.image || [],
      })
    );
  };

  const handleRelevance = () => {
    navigate("CustomerServicesRelevance");
  };

  const WelcomeCarousel = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: false,
  };

  const { data, isLoading } = useGetServicesQuery();
  const services = data?.details || [];

  const newItems = services.filter(
    (service) =>
      service.product &&
      service.product.length === 1 &&
      service.product[0].isNew === true
  );

  const bundleItems = services.filter(
    (service) =>
      service.product &&
      service.product.length > 1 &&
      service.product.some((product) => product.isNew === true)
  );

  const itemsPerPage = {
    "2xl": 5,
    xl: 4,
    lg: 3,
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
  const totalBundleItemsPages = Math.ceil(
    bundleItems.length / itemsPerPageState
  );

  const showNextNewItems = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, totalNewItemsPages - 1)
    );
  };

  const showPreviousNewItems = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const showNextBundleItems = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, totalBundleItemsPages - 1)
    );
  };

  const showPreviousBundleItems = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const startIndex = currentPage * itemsPerPageState;
  const endIndex = startIndex + itemsPerPageState;

  const visibleNewItems = newItems.slice(startIndex, endIndex);
  const visibleBundleItems = bundleItems.slice(startIndex, endIndex);

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

  const user = useSelector((state) => state.auth.user);

  const isOnlineCustomer = user?.roles?.includes("Online Customer");

  return (
    <>
      {isLoading ? (
        <div className="loader">
          <FadeLoader color="#FDA7DF" loading={true} size={50} />
        </div>
      ) : (
        <>
          <div className="h-full pt-12">
            <div className="px-24">
              <Slider {...WelcomeCarousel}>
                <div className="grid grid-cols-[50%_50%] justify-center items-center">
                  <div className="grid justify-center h-fit">
                    <h1 className="font-semibold xl:text-5xl lg:text-4xl md:text-3xl">
                      Looking for an <br />
                      awesome experience?
                    </h1>
                    <p className="py-4 text-justify lg:text-xl md:text-base">
                      Lorem ipsum dolor sit amet, consectetur <br /> adipiscing
                      elit.
                    </p>
                    <button className="px-6 py-2 text-xl rounded-md bg-primary-default w-fit">
                      Avail Now
                    </button>
                  </div>
                  <div className="grid items-center justify-center">
                    <img
                      src={Beautician}
                      alt="Beautician"
                      className="object-cover w-[28rem] h-96"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-[50%_50%] justify-center items-center">
                  <div className="grid justify-center h-fit">
                    <h1 className="font-semibold xl:text-5xl lg:text-4xl md:text-3xl">
                      Another Slide Content <br />
                      Customize as needed
                    </h1>
                    <p className="py-4 text-justify lg:text-xl md:text-base">
                      More information or text here <br /> as needed.
                    </p>
                    <button className="px-6 py-2 text-xl rounded-md bg-primary-default w-fit">
                      Next Slide
                    </button>
                  </div>
                  <div className="grid items-center justify-center">
                    <img
                      src={CustomerTwo}
                      alt="CustomerTwo"
                      className="object-cover w-96 h-96"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-[50%_50%] justify-center items-center">
                  <div className="grid justify-center h-fit">
                    <h1 className="font-semibold xl:text-5xl lg:text-4xl md:text-3xl">
                      Another Slide Content <br />
                      Customize as needed
                    </h1>
                    <p className="py-4 text-justify lg:text-xl md:text-base">
                      More information or text here <br /> as needed.
                    </p>
                    <button className="px-6 py-2 text-xl rounded-md bg-primary-default w-fit">
                      Next Slide
                    </button>
                  </div>
                  <div className="grid items-center justify-center">
                    <img
                      src={Logo3}
                      alt="Logo3"
                      className="object-cover w-96 h-96"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-[50%_50%] justify-center items-center">
                  <div className="grid justify-center h-fit">
                    <h1 className="font-semibold xl:text-5xl lg:text-4xl md:text-3xl">
                      Another Slide Content <br />
                      Customize as needed
                    </h1>
                    <p className="py-4 text-justify lg:text-xl md:text-base">
                      More information or text here <br /> as needed.
                    </p>
                    <button className="px-6 py-2 text-xl rounded-md bg-primary-default w-fit">
                      Next Slide
                    </button>
                  </div>
                  <div className="grid items-center justify-center">
                    <img
                      src={CustomerThree}
                      alt="CustomerThree"
                      className="object-cover w-96 h-96"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-[50%_50%] justify-center items-center">
                  <div className="grid justify-center h-fit">
                    <h1 className="font-semibold xl:text-5xl lg:text-4xl md:text-3xl">
                      Another Slide Content <br />
                      Customize as needed
                    </h1>
                    <p className="py-4 text-justify lg:text-xl md:text-base">
                      More information or text here <br /> as needed.
                    </p>
                    <button className="px-6 py-2 text-xl rounded-md bg-primary-default w-fit">
                      Next Slide
                    </button>
                  </div>
                  <div className="grid items-center justify-center">
                    <img
                      src={CustomerFour}
                      alt="CustomerFour"
                      className="object-cover w-96 h-96"
                    />
                  </div>
                </div>
              </Slider>
            </div>
            <div className="px-24 py-12">
              <div className="grid items-center justify-center grid-flow-col-dense lg:gap-x-10 md:gap-x-5">
                <div className="grid items-center justify-center grid-flow-col-dense py-3 rounded-md bg-primary-default lg:gap-x-3 md:gap-x-0 2xl:w-[20rem] xl:w-64 lg:w-48 md:w-[10rem] xl:h-[5.5rem] md:h-[4.25rem] px-2">
                  <img
                    src={WelcomeIconOne}
                    alt="WelcomeIconOne"
                    className="md:w-5/6 md:h-5/6 xl:w-full xl:h-full"
                  />
                  <h1 className="font-semibold 2xl:text-xl xl:text-base md:text-xs text-secondary-accent">
                    Service From <br /> Trained Beautician
                  </h1>
                </div>
                <div className="grid items-center justify-center grid-flow-col-dense py-3 rounded-md bg-primary-default lg:gap-x-3 md:gap-x-0 2xl:w-[20rem] xl:w-64 lg:w-48 md:w-[10rem] xl:h-[5.5rem] md:h-[4.25rem] px-2">
                  <img
                    src={WelcomeIconTwo}
                    alt="WelcomeIconTwo"
                    className="md:w-5/6 md:h-5/6 xl:w-full xl:h-full"
                  />
                  <h1 className="font-semibold 2xl:text-xl xl:text-base md:text-xs text-secondary-accent">
                    Quick and Easy <br /> Appointment
                  </h1>
                </div>
                <div className="grid items-center justify-center grid-flow-col-dense py-3 rounded-md bg-primary-default lg:gap-x-3 md:gap-x-0 2xl:w-[20rem] xl:w-64 lg:w-48 md:w-[10rem] xl:h-[5.5rem] md:h-[4.25rem] px-2">
                  <img
                    src={WelcomeIconThree}
                    alt="WelcomeIconThree"
                    className="md:w-5/6 md:h-5/6 xl:w-full xl:h-full"
                  />
                  <h1 className="font-semibold 2xl:text-xl xl:text-base md:text-xs text-secondary-accent">
                    New Bundle <br /> Every Month
                  </h1>
                </div>
                <div className="grid items-center justify-center grid-flow-col-dense py-3 rounded-md bg-primary-default lg:gap-x-3 md:gap-x-0 2xl:w-[20rem] xl:w-64 lg:w-48 md:w-[10rem] xl:h-[5.5rem] md:h-[4.25rem] px-2">
                  <img
                    src={WelcomeIconFour}
                    alt="WelcomeIconFour"
                    className="md:w-5/6 md:h-5/6 xl:w-full xl:h-full"
                  />
                  <h1 className="font-semibold 2xl:text-xl xl:text-base md:text-xs text-secondary-accent">
                    Affordable <br /> Prices
                  </h1>
                </div>
              </div>
            </div>
            <div className="px-24 pb-10">
              <div className="grid grid-cols-2">
                <h1 className="pb-6 text-2xl font-semibold">
                  New Services Just For You
                </h1>
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
                <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4 w-[calc(64px + 10rem * 5)] mx-auto">
                  {visibleNewItems.map((service) => (
                    <div
                      className="w-full h-full p-8 rounded-md bg-primary-default"
                      key={service._id}
                    >
                      <div className="grid items-center justify-center">
                        <img
                          onClick={() =>
                            navigate(
                              `${
                                isOnlineCustomer
                                  ? "/onlineCustomer"
                                  : "/walkInCustomer"
                              }/service/${service._id}`
                            )
                          }
                          className="object-center w-64 h-64 rounded-full cursor-pointer"
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
                      <div className="grid grid-flow-col-dense">
                        <h1 className="pt-3 text-2xl font-semibold">
                          {service?.service_name?.length > 10
                            ? `${service?.service_name.slice(0, 10)}...`
                            : service?.service_name}
                        </h1>
                        {service?.product?.map((product, index) => (
                          <div
                            className="grid items-end justify-end"
                            key={index}
                          >
                            {product?.product_name?.length > 25
                              ? `${product?.product_name.slice(0, 25)}...`
                              : product?.product_name}
                          </div>
                        ))}
                      </div>
                      <h1 className="text-lg font-extralight">
                        {service?.description?.length > 10
                          ? `${service?.description.slice(0, 10)}...`
                          : service?.description}
                      </h1>
                      <img src={DummyRatings} alt="DummyRatings" />
                      <div className="grid items-end grid-flow-col-dense mt-4">
                        <h1 className="pt-4 text-3xl">₱{service.price}</h1>
                        <span className="grid items-center justify-end">
                          <button
                            onClick={() => handlePress(service)}
                            className="text-lg px-4 py-[.6rem] rounded-lg bg-secondary-default"
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
            <div className="px-24 pb-10">
              <h1 className="pb-6 text-2xl font-semibold">
                Browse by Categories
              </h1>
              <div className="grid items-center justify-center w-full">
                <div className="grid gap-4 xl:grid-cols-3">
                  <div className="grid grid-flow-row-dense rounded-lg bg-primary-default">
                    <h1 className="px-8 py-4 text-3xl">
                      Pick Our <br />
                      <span className="font-semibold"> Best Offers!</span>
                    </h1>
                    <button
                      onClick={handleRelevance}
                      className="ml-8 mb-10 text-lg px-4 py-[.6rem] rounded-lg bg-secondary-default w-fit"
                    >
                      Check Here
                    </button>
                    <img
                      src={ServicesOne}
                      className="object-cover w-full h-full rounded-b-lg"
                      alt="ServicesOne"
                    />
                  </div>
                  <div className="grid grid-flow-row-dense gap-y-6">
                    <div className="grid grid-flow-col-dense rounded-lg bg-primary-default">
                      <div>
                        <h1 className="px-8 py-4 text-3xl">
                          Choose Your <br />
                          <span className="font-semibold"> Beautician</span>
                        </h1>
                        <button
                          onClick={handleRelevance}
                          className="ml-8 mb-10 text-lg px-4 py-[.6rem] rounded-lg bg-secondary-default w-fit"
                        >
                          Check Here
                        </button>
                      </div>
                      <div className="grid justify-end">
                        <img
                          src={ServicesTwo}
                          className="object-cover h-full rounded-lg"
                          alt="ServicesTwo"
                        />
                      </div>
                    </div>
                    <div className="grid grid-flow-col-dense rounded-lg bg-primary-default">
                      <div className="grid justify-start">
                        <img
                          src={ServicesThree}
                          className="object-cover h-full rounded-lg"
                          alt="ServicesThree"
                        />
                      </div>
                      <div className="grid items-end justify-end">
                        <h1 className="px-8 py-4 text-3xl">
                          Organic <br />
                          <span className="font-semibold"> Foot Spa</span>
                        </h1>
                        <button
                          onClick={handleRelevance}
                          className="ml-8 mb-10 text-lg px-4 py-[.6rem] rounded-lg bg-secondary-default w-fit"
                        >
                          Check Here
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-flow-col-dense gap-x-6">
                    <div className="grid grid-flow-row-dense rounded-lg bg-primary-default">
                      <div>
                        <h1 className="px-8 py-4 text-3xl">
                          High Quality <br />
                          <span className="font-semibold"> Service</span>
                        </h1>
                        <button
                          onClick={handleRelevance}
                          className="ml-8 mb-10 text-lg px-4 py-[.6rem] rounded-lg bg-secondary-default w-fit"
                        >
                          Check Here
                        </button>
                      </div>
                      <div>
                        <img
                          src={ServicesFour}
                          className="object-cover w-full h-full rounded-b-lg"
                          alt="ServicesFour"
                        />
                      </div>
                    </div>
                    <div className="grid grid-flow-row-dense rounded-lg bg-primary-default">
                      <div>
                        <img
                          src={ServicesFive}
                          className="object-cover w-full h-full rounded-t-lg"
                          alt="ServicesFive"
                        />
                      </div>
                      <div className="grid items-center justify-center">
                        <h1 className="px-8 py-4 text-3xl">
                          Trend <br />
                          <span className="font-semibold"> Hair Styles</span>
                        </h1>
                        <button
                          onClick={handleRelevance}
                          className="ml-8 mb-10 text-lg px-4 py-[.6rem] rounded-lg bg-secondary-default w-fit"
                        >
                          Check Here
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-24 pb-10">
              <div className="grid grid-cols-2">
                <h1 className="pb-6 text-2xl font-semibold">
                  Bundle Services For You
                </h1>
                {totalBundleItemsPages > 1 && (
                  <div className="flex items-end justify-end mb-4">
                    <button
                      className="px-3 py-1 mr-2 text-xl rounded-full bg-primary-default w-fit"
                      onClick={showPreviousBundleItems}
                      disabled={currentPage === 0}
                    >
                      <FontAwesomeIcon icon={faArrowLeft} />
                    </button>
                    <button
                      className="px-3 py-1 ml-2 text-xl rounded-full bg-primary-default w-fit"
                      onClick={showNextBundleItems}
                      disabled={currentPage === totalBundleItemsPages - 1}
                    >
                      <FontAwesomeIcon icon={faArrowRight} />
                    </button>
                  </div>
                )}
              </div>
              <div className="overflow-x-auto">
                <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4 w-[calc(64px + 10rem * 5)] mx-auto">
                  {visibleBundleItems.map((service) => (
                    <div
                      className="w-full h-full p-8 rounded-md bg-primary-default"
                      key={service._id}
                    >
                      <div className="grid items-center justify-center">
                        <img
                          onClick={() =>
                            navigate(
                              `${
                                isOnlineCustomer
                                  ? "/onlineCustomer"
                                  : "/walkInCustomer"
                              }/service/${service._id}`
                            )
                          }
                          className="object-center w-64 h-64 rounded-full cursor-pointer"
                          src={
                            service?.image[
                              Math.floor(Math.random() * service?.image.length)
                            ]?.url
                          }
                          alt={service?.image?.originalname || ""}
                          key={service?.image?.public_id || ""}
                        />
                      </div>
                      <h1 className="pt-3 text-2xl font-semibold">
                        {service?.service_name?.length > 10
                          ? `${service?.service_name.slice(0, 10)}...`
                          : service?.service_name}
                      </h1>
                      <span className="grid grid-flow-col-dense w-fit gap-x-2">
                        {service?.product?.map((product, index) => (
                          <div key={index}>
                            {product?.product_name?.length > 25
                              ? `${product?.product_name.slice(0, 25)}...`
                              : product?.product_name}
                          </div>
                        ))}
                      </span>
                      <h1 className="text-lg font-extralight">
                        {service?.description.length > 10
                          ? `${service.description.slice(0, 10)}...`
                          : service.description}
                      </h1>
                      <img src={DummyRatings} alt="DummyRatings" />
                      <div className="grid items-end grid-flow-col-dense mt-4">
                        <h1 className="pt-4 text-3xl">₱{service.price}</h1>
                        <span className="grid items-center justify-end">
                          <button className="text-lg px-4 py-[.6rem] rounded-lg bg-secondary-default">
                            Add Cart
                          </button>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="relative">
              <h1 className="absolute left-[40%] top-[10%] 2xl:text-6xl xl:text-5xl lg:text-4xl md:text-3xl">
                Register Now On <br /> Our Mobile App.
              </h1>
              <img
                className="rounded-lg absolute left-[42.5%] top-[42.5%] text-6xl h-1/2"
                src={DummyQrCode}
                alt="DummyQrCode"
              />
              <img src={LandingPageBg} alt="LandingPageBg" />
            </div>
          </div>
        </>
      )}
    </>
  );
}
