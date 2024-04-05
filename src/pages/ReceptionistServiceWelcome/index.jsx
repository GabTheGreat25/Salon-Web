import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  faArrowLeft,
  faArrowRight,
  faStar,
  faStarHalf,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FaArrowLeft } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Beautician from "@assets/lhanlee-hiring.jpg";
import LhanleeSalon from "@assets/lhanlee-front.jpg";
import LhanleeCustomer from "@assets/lhanlee-customer.jpg";
import BeauticianWorking from "@assets/lhanlee-beautician.png";
import LhanleeFace from "@assets/lhanlee-face.jpg";
import WelcomeIconOne from "@assets/welcome-iconOne.png";
import WelcomeIconTwo from "@assets/welcome-iconTwo.png";
import WelcomeIconThree from "@assets/welcome-iconThree.png";
import WelcomeIconFour from "@assets/welcome-iconFour.png";
import LandingPageBg from "@assets/Landing-Page-Bg.png";
import ServicesOne from "@assets/servicesOne.png";
import ServicesTwo from "@assets/servicesTwo.png";
import ServicesThree from "@assets/servicesThree.png";
import ServicesFour from "@assets/servicesFour.png";
import MovingSale from "@assets/moving-sale.gif";
import Promo from "@assets/promo.gif";
import DummyQrCode from "@assets/qrCode.png";
import {
  useGetServicesQuery,
  useGetCommentsQuery,
  useGetExclusionsQuery,
  useGetHiringsQuery,
} from "@api";
import { FadeLoader } from "react-spinners";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { appointmentSlice } from "@appointment";
import { customerSlice } from "@customer";

export default function () {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const customer = useSelector((state) => state.customer);

  const goBack = () => {
    dispatch(customerSlice.actions.resetId());
    navigate("/receptionist");
  };

  const handlePress = (selectedProduct) => {
    dispatch(
      appointmentSlice.actions.setService({
        service_id: selectedProduct?._id || "",
        service_name: selectedProduct?.service_name || "",
        type: selectedProduct?.type || [],
        duration: selectedProduct?.duration || 0,
        description: selectedProduct?.description || "",
        product_name:
          selectedProduct?.product?.map((p) => p.product_name).join(", ") || "",
        price: selectedProduct?.price || 0,
        extraFee: selectedProduct?.extraFee || 0,
        image: selectedProduct?.image || [],
      })
    );
  };

  const handleAllServices = () => {
    navigate("/receptionist/RecepServicesAllServices");
  };

  const handlePopular = () => {
    navigate("/receptionist/RecepServicesPopular");
  };

  const handleLatest = () => {
    navigate("/receptionist/RecepServicesLatest");
  };

  const handleBudget = () => {
    navigate("/receptionist/RecepServicesBudget");
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

  const { data: servicesData, isLoading: servicesLoading } =
    useGetServicesQuery();
  const services = servicesData?.details || [];

  const latestService = services
    .filter((service) => service.created_at)
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0];

  const { data: commentsData, isLoading: commentsLoading } =
    useGetCommentsQuery();
  const comments = commentsData?.details || [];

  const allServices = services.map((service) => {
    const matchingComments = comments.filter((comment) =>
      comment.transaction?.appointment?.service?.some(
        (s) => s._id === service._id
      )
    );

    const ratings = matchingComments.flatMap((comment) => comment.ratings);
    const count = ratings?.length;

    const averageRating =
      count > 0 ? ratings.reduce((sum, rating) => sum + rating, 0) / count : 0;

    return {
      ...service,
      ratings: averageRating,
    };
  });

  const { data, isLoading: exclusionLoading } = useGetExclusionsQuery();
  const exclusions = data?.details;

  const filteredExclusions = exclusions
    ?.filter(
      (exclusion) =>
        customer?.allergy && customer?.allergy.includes(exclusion._id)
    )
    .flatMap((exclusion) => exclusion.ingredient_name.trim().toLowerCase());

  const newItems = allServices.filter((service) => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();

    const hideMonthsJsProm = [0, 1, 4, 5, 6, 7, 8, 9, 10, 11];
    const hideMonthsGraduation = [0, 1, 2, 4, 5, 6, 7, 8, 9, 10, 11];

    const hideValentinesDay = currentMonth !== 1;
    const hideChristmas = currentMonth !== 11;
    const hideHalloween = currentMonth !== 9;
    const hideNewYear = currentMonth !== 0;
    const hideJsProm = hideMonthsJsProm.includes(currentMonth);
    const hideGraduation = hideMonthsGraduation.includes(currentMonth);

    const hasNewProduct =
      service.product &&
      service.product.length === 1 &&
      service.product.some((product) => product.isNew === true);

    if (!hasNewProduct) return false;

    const isExcluded = service.product?.some((product) => {
      const productIngredients =
        product.ingredients?.toLowerCase().split(", ") || [];

      return filteredExclusions?.some((exclusion) =>
        productIngredients.includes(exclusion)
      );
    });

    return !(
      isExcluded ||
      (service.occassion === "Valentines" && hideValentinesDay) ||
      (service.occassion === "Christmas" && hideChristmas) ||
      (service.occassion === "Halloween" && hideHalloween) ||
      (service.occassion === "New Year" && hideNewYear) ||
      (service.occassion === "Js Prom" && hideJsProm) ||
      (service.occassion === "Graduation" && hideGraduation)
    );
  });

  const bundleItems = allServices.filter((service) => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();

    const hideMonthsJsProm = [0, 1, 4, 5, 6, 7, 8, 9, 10, 11];
    const hideMonthsGraduation = [0, 1, 2, 4, 5, 6, 7, 8, 9, 10, 11];

    const hideValentinesDay = currentMonth !== 1;
    const hideChristmas = currentMonth !== 11;
    const hideHalloween = currentMonth !== 9;
    const hideNewYear = currentMonth !== 0;
    const hideJsProm = hideMonthsJsProm.includes(currentMonth);
    const hideGraduation = hideMonthsGraduation.includes(currentMonth);

    const hasNewBundle =
      service.product &&
      service.product.length > 1 &&
      service.product?.some((product) => product.isNew === true);

    if (!hasNewBundle) return false;

    const isExcluded = service.product?.some((product) => {
      const productIngredients =
        product.ingredients?.toLowerCase().split(", ") || [];
      return filteredExclusions?.some((exclusion) =>
        productIngredients.includes(exclusion)
      );
    });

    return !(
      isExcluded ||
      (service.occassion === "Valentines" && hideValentinesDay) ||
      (service.occassion === "Christmas" && hideChristmas) ||
      (service.occassion === "Halloween" && hideHalloween) ||
      (service.occassion === "New Year" && hideNewYear) ||
      (service.occassion === "Js Prom" && hideJsProm) ||
      (service.occassion === "Graduation" && hideGraduation)
    );
  });

  const itemsPerPage = {
    "2xl": 5,
    xl: 4,
    lg: 3,
    md: 2,
  };

  const [newCurrentPage, setNewCurrentPage] = useState(0);
  const [bundleCurrentPage, setBundleCurrentPage] = useState(0);
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

  const totalNewItemsPages = Math.ceil(newItems?.length / itemsPerPageState);
  const totalBundleItemsPages = Math.ceil(
    bundleItems?.length / itemsPerPageState
  );

  const showNextNewItems = () => {
    setNewCurrentPage((prevPage) =>
      Math.min(prevPage + 1, totalNewItemsPages - 1)
    );
  };

  const showPreviousNewItems = () => {
    setNewCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const showNextBundleItems = () => {
    setBundleCurrentPage((prevPage) =>
      Math.min(prevPage + 1, totalBundleItemsPages - 1)
    );
  };

  const showPreviousBundleItems = () => {
    setBundleCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const newStartIndex = newCurrentPage * itemsPerPageState;
  const newEndIndex = newStartIndex + itemsPerPageState;

  const bundleStartIndex = bundleCurrentPage * itemsPerPageState;
  const bundleEndIndex = bundleStartIndex + itemsPerPageState;

  const visibleNewItems = newItems.slice(newStartIndex, newEndIndex);
  const visibleBundleItems = bundleItems.slice(
    bundleStartIndex,
    bundleEndIndex
  );

  useEffect(() => {
    const handleResize = () => {
      setNewCurrentPage(0);
      setBundleCurrentPage(0);
      setItemsPerPageState(determineItemsPerPage());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [modalShown, setModalShown] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const isModalShownFromStorage = localStorage.getItem("modalShown");

    if (!modalShown && !isModalShownFromStorage) {
      setShowModal(true);
      setModalShown(true);

      localStorage.setItem("modalShown", "true");

      setTimeout(() => {
        setShowModal(false);
      }, 10000);
    }
  }, [modalShown]);

  return (
    <>
      {servicesLoading || commentsLoading || exclusionLoading ? (
        <div className="loader">
          <FadeLoader color="#FFB6C1" loading={true} size={50} />
        </div>
      ) : (
        <>
          <button className="px-12 py-4 text-4xl" onClick={goBack}>
            <FaArrowLeft />
          </button>
          {showModal && (
            <div className="z-[1000] fixed top-0 left-0 h-screen w-full bg-neutral-primary bg-opacity-75">
              <div className="fixed p-8 transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-md top-1/2 left-1/2 bg-primary-default">
                <div
                  className="absolute cursor-pointer top-2 right-2"
                  onClick={handleCloseModal}
                >
                  <FontAwesomeIcon
                    icon={faTimes}
                    className="text-4xl text-dark-default dark:text-light-default"
                  />
                </div>

                <div
                  className="grid items-center pt-6"
                  key={latestService?._id}
                >
                  <img
                    src={MovingSale}
                    alt="MovingSale"
                    className="w-full h-32 rounded-md"
                  />
                  <div className="grid lg:grid-flow-col-dense">
                    <div className="grid items-center justify-center lg:mr-8">
                      <img
                        src={Promo}
                        className="w-56 h-56 rounded-md"
                        alt="Monthly Promo"
                        loop
                      />
                    </div>
                    <div className="pt-6 text-justify">
                      <h3 className="mb-4 text-3xl font-bold">Monthly Promo</h3>
                      <p className="mb-4 text-lg">
                        Enjoy our exclusive monthly promotion at Lhanlee Salon.
                        Avail our special offers and packages just for you. Come
                        and check this service{" "}
                        <span className="font-semibold">
                          {latestService?.service_name}
                        </span>{" "}
                        now!
                      </p>

                      <p className="mb-4 text-base">
                        Terms and Conditions apply. Book your appointment now!
                      </p>
                      <span className="grid items-center justify-end">
                        <button
                          onClick={() =>
                            navigate(
                              `/receptionist/service/${latestService?._id}`
                            )
                          }
                          className="text-lg px-4 py-[.6rem] rounded-lg text-dark-default bg-primary-t4 hover:bg-primary-accent"
                        >
                          Check it out!
                        </button>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="h-full pt-12">
            <div className="px-24">
              <Slider {...WelcomeCarousel}>
                <div className="grid grid-cols-[50%_50%] justify-center items-center">
                  <div className="grid justify-center h-fit">
                    <h1 className="pr-6 font-semibold xl:text-5xl lg:text-4xl md:text-3xl">
                      Welcome to <br /> Lhanlee Beauty Lounge <br />
                    </h1>
                    <p className="py-4 pr-4 text-justify lg:text-xl md:text-base">
                      Where Beauty Meets Style! <br />
                    </p>
                  </div>
                  <div className="grid items-center justify-center">
                    <img
                      src={LhanleeSalon}
                      alt="Lhanlee Salon"
                      className="object-cover 2xl:w-[32rem] xl:w-[30rem] md:w-[26rem] h-96 rounded-lg"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-[50%_50%] justify-center items-center">
                  <div className="grid justify-center h-fit">
                    <h1 className="pr-6 font-semibold xl:text-5xl lg:text-4xl md:text-3xl">
                      Elevate your style
                      <br />
                      with us!
                    </h1>
                    <p className="py-4 pr-4 text-justify lg:text-xl md:text-base">
                      Indulge in a world of luxury with our
                      <br />
                      premium salon services.
                    </p>
                  </div>
                  <div className="grid items-center justify-center">
                    <img
                      src={LhanleeCustomer}
                      alt="LhanleeCustomer"
                      className="object-cover 2xl:w-[32rem] xl:w-[30rem] md:w-[26rem] h-96 rounded-lg"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-[50%_50%] justify-center items-center">
                  <div className="grid justify-center h-fit">
                    <h1 className="pr-6 font-semibold xl:text-5xl lg:text-4xl md:text-3xl">
                      Special Offers <br />
                    </h1>
                    <p className="py-4 pr-4 text-justify lg:text-xl md:text-base">
                      Discover exclusive offers and packages tailored just for
                      you. <br />
                      Because you deserve the best without breaking the bank!
                    </p>
                  </div>
                  <div className="grid items-center justify-center">
                    <img
                      src={BeauticianWorking}
                      alt="BeauticianWorking"
                      className="object-cover 2xl:w-[32rem] xl:w-[30rem] md:w-[26rem] h-96 rounded-lg"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-[50%_50%] justify-center items-center">
                  <div className="grid justify-center h-fit">
                    <h1 className="pr-6 font-semibold xl:text-5xl lg:text-4xl md:text-3xl">
                      Unleash Your Confidence! <br />
                    </h1>
                    <p className="py-4 pr-4 text-justify lg:text-xl md:text-base">
                      At Lhanlee Beauty Lounge, we don't just style hair,
                      <br />
                      we unleash confidence. Step out
                      <br />
                      feeling empowered and beautiful.
                    </p>
                  </div>
                  <div className="grid items-center justify-center">
                    <img
                      src={LhanleeFace}
                      alt="LhanleeFace"
                      className="object-cover 2xl:w-[32rem] xl:w-[30rem] md:w-[26rem] h-96 rounded-lg"
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
                      disabled={newCurrentPage === 0}
                    >
                      <FontAwesomeIcon icon={faArrowLeft} />
                    </button>
                    <button
                      className="px-3 py-1 ml-2 text-xl rounded-full bg-primary-default w-fit"
                      onClick={showNextNewItems}
                      disabled={newCurrentPage === totalNewItemsPages - 1}
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
                            navigate(`/receptionist/service/${service._id}`)
                          }
                          className="object-center w-64 h-64 rounded-full cursor-pointer"
                          src={
                            service?.image && service?.image?.length
                              ? service?.image[
                                  Math.floor(
                                    Math.random() * service?.image?.length
                                  )
                                ]?.url
                              : null
                          }
                          alt={service?.image?.originalname}
                          key={service?.image?.public_id}
                        />
                      </div>
                      <h1 className="pt-3 text-2xl font-semibold">
                        {service?.service_name?.length > 10
                          ? `${service?.service_name.slice(0, 10)}...`
                          : service?.service_name}
                      </h1>
                      <h1 className="pb-1 text-lg font-extralight">
                        {service?.description?.length > 10
                          ? `${service.description.slice(0, 10)}...`
                          : service.description}
                      </h1>
                      <h1 className="pb-1 text-lg font-extralight">
                        Products used:
                      </h1>
                      <span className="grid grid-flow-cols-dense w-fit gap-x-2">
                        {service?.product?.map((product, index) => (
                          <div key={index}>
                            {product?.product_name?.length > 15
                              ? `${product?.product_name.slice(0, 15)}...`
                              : product?.product_name}
                          </div>
                        ))}
                      </span>
                      <span className="grid grid-flow-col-dense pt-2 text-xl w-fit gap-x-2">
                        {service.ratings > 0 ? (
                          [...Array(Math.floor(service.ratings))].map(
                            (_, starIndex) => (
                              <FontAwesomeIcon
                                icon={faStar}
                                key={starIndex}
                                color="#feca57"
                              />
                            )
                          )
                        ) : (
                          <>
                            <h1>No Ratings</h1>
                          </>
                        )}

                        {service.ratings % 1 !== 0 && (
                          <FontAwesomeIcon icon={faStarHalf} color="#feca57" />
                        )}
                      </span>
                      <div className="grid items-end grid-flow-col-dense mt-4">
                        <h1 className="pt-4 text-xl">₱{service.price}</h1>
                        <span className="grid items-center justify-end">
                          <button
                            onClick={() => handlePress(service)}
                            className="text-lg px-4 py-[.6rem] rounded-lg text-dark-default bg-primary-t4 hover:bg-primary-accent"
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
              <div className="grid items-center w-full xl:justify-center">
                <div className="grid gap-4 xl:grid-cols-3">
                  <div className="grid grid-flow-row-dense rounded-lg bg-primary-default">
                    <h1 className="px-8 py-4 text-3xl">
                      Pick Our <br />
                      <span className="font-semibold"> Best Offers!</span>
                    </h1>
                    <button
                      onClick={handleAllServices}
                      className="ml-8 mb-10 text-lg px-4 md:py-[.6rem] xl:py-2 rounded-lg text-dark-default bg-primary-t4 hover:bg-primary-accent h-fit w-fit"
                    >
                      Check Here
                    </button>
                    <img
                      src={ServicesOne}
                      className="object-center w-full h-full rounded-b-lg"
                      alt="ServicesOne"
                    />
                  </div>
                  <div className="grid grid-flow-row-dense gap-y-6">
                    <div className="grid grid-flow-col-dense rounded-lg bg-primary-default">
                      <div>
                        <h1 className="px-8 py-4 2xl:text-3xl xl:text-2xl md:text-4xl">
                          Check Our <br />
                          <span className="font-semibold"> Most Popular!</span>
                        </h1>
                        <button
                          onClick={handlePopular}
                          className="ml-8 mb-10 2xl:text-lg px-4 py-[.6rem] rounded-lg text-dark-default bg-primary-t4 hover:bg-primary-accent h-fit w-fit"
                        >
                          Check Here
                        </button>
                      </div>
                      <div className="grid justify-end">
                        <img
                          src={ServicesTwo}
                          className="object-cover h-full rounded-lg xl:w-full md:w-[30rem]"
                          alt="ServicesTwo"
                        />
                      </div>
                    </div>
                    <div className="grid grid-flow-col-dense rounded-lg bg-primary-default">
                      <div className="grid justify-start">
                        <img
                          src={ServicesThree}
                          className="object-cover h-full rounded-lg xl:w-full md:w-[30rem]"
                          alt="ServicesThree"
                        />
                      </div>
                      <div className="grid justify-end">
                        <span className="grid items-end">
                          <h1 className="px-8 py-4 2xl:text-3xl xl:text-2xl md:text-4xl">
                            Check Our <br />
                            <span className="font-semibold">
                              Latest Trends!
                            </span>
                          </h1>
                        </span>

                        <button
                          onClick={handleLatest}
                          className="ml-8 mb-10 2xl:text-lg px-4 py-[.6rem] rounded-lg text-dark-default bg-primary-t4 hover:bg-primary-accent w-fit h-fit"
                        >
                          Check Here
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-flow-row-dense rounded-lg bg-primary-default">
                    <img
                      src={ServicesFour}
                      className="object-center w-full h-full rounded-t-lg"
                      alt="ServicesFour"
                    />
                    <h1 className="px-8 py-4 text-3xl text-end">
                      Check Our <span className="font-semibold">Budget</span>
                      <br />
                      <span className="font-semibold">Friendly Offers!</span>
                    </h1>
                    <span className="grid items-end justify-end mx-8">
                      <button
                        onClick={handleBudget}
                        className="ml-8 mb-10 text-lg px-4 md:py-[.6rem] xl:py-2 rounded-lg text-dark-default bg-primary-t4 hover:bg-primary-accent h-fit w-fit"
                      >
                        Check Here
                      </button>
                    </span>
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
                      disabled={bundleCurrentPage === 0}
                    >
                      <FontAwesomeIcon icon={faArrowLeft} />
                    </button>
                    <button
                      className="px-3 py-1 ml-2 text-xl rounded-full bg-primary-default w-fit"
                      onClick={showNextBundleItems}
                      disabled={bundleCurrentPage === totalBundleItemsPages - 1}
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
                      className="flex flex-col w-full p-8 rounded-md bg-primary-default"
                      key={service._id}
                    >
                      <div className="grid items-center justify-center">
                        <img
                          onClick={() =>
                            navigate(`/receptionist/service/${service._id}`)
                          }
                          className="object-center w-64 h-64 rounded-full cursor-pointer"
                          src={
                            service?.image[
                              Math.floor(Math.random() * service?.image?.length)
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
                      <h1 className="pb-1 text-lg font-extralight">
                        {service?.description?.length > 10
                          ? `${service.description.slice(0, 10)}...`
                          : service.description}
                      </h1>
                      <h1 className="pb-1 text-lg font-extralight">
                        Products used:
                      </h1>
                      <span className="grid flex-grow grid-cols-2 grid-flow-rows-dense w-fit gap-x-2">
                        {service?.product?.map((product, index) => (
                          <div key={index}>
                            {product?.product_name?.length > 15
                              ? `${product?.product_name.slice(0, 15)}...`
                              : product?.product_name}
                          </div>
                        ))}
                      </span>
                      <span className="grid grid-flow-col-dense pt-2 text-xl w-fit gap-x-2">
                        {service.ratings > 0 ? (
                          [...Array(Math.floor(service.ratings))].map(
                            (_, starIndex) => (
                              <FontAwesomeIcon
                                icon={faStar}
                                key={starIndex}
                                color="#feca57"
                              />
                            )
                          )
                        ) : (
                          <>
                            <h1>No Ratings</h1>
                          </>
                        )}

                        {service.ratings % 1 !== 0 && (
                          <FontAwesomeIcon icon={faStarHalf} color="#feca57" />
                        )}
                      </span>
                      <div className="grid items-end grid-flow-col-dense mt-4">
                        <h1 className="pt-4 text-xl">₱{service.price}</h1>
                        <span className="grid items-center justify-end">
                          <button
                            onClick={() => handlePress(service)}
                            className="text-lg px-4 py-[.6rem] rounded-lg text-dark-default bg-primary-t4 hover:bg-primary-accent"
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
            <div className="relative">
              <h1 className="absolute xl:left-[40%] md:left-[42%] top-[10%] 2xl:text-6xl xl:text-5xl lg:text-4xl md:text-3xl text-center">
                Register Now On <br /> Our Mobile App.
              </h1>
              <img
                className="rounded-lg absolute xl:left-[45.5%] md:left-[47%] top-[42.5%] text-6xl 2xl:h-[15rem] 2xl:w-[15rem] xl:h-[12rem] xl:w-[12rem] lg:h-[10rem] lg:w-[10rem] md:h-[8rem] md:w-[8rem]"
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
