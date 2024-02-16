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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Beautician from "@assets/promos-image.jpg";
import Logo3 from "@assets/nails-logo.jpg";
import LhanleeLogo from "@assets/Logo-Light.png";
import CustomerFour from "@assets/walkincustomer-logo.png";
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
import MovingSale from "@assets/moving-sale.gif";
import Promo from "@assets/promo.gif";
import DummyQrCode from "@assets/qrCode.png";
import { useGetServicesQuery, useGetCommentsQuery } from "@api";
import { FadeLoader } from "react-spinners";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { appointmentSlice } from "@appointment";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { clearAppointmentData } from "@appointment";
import { logout } from "@auth";

export default function () {
  const hiring = useSelector((state) => state.hiring);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const allergy = useSelector(
    (state) => state.auth?.user?.information?.allergy
  );

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
    navigate("CustomerServicesAllServices");
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
      comment.transaction?.appointment?.service.some(
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

  const newItems = allServices.filter((service) => {
    const hasNewProduct =
      service.product &&
      Array.isArray(service.product) &&
      service.product?.length === 1 &&
      service.product.some((product) => product.isNew === true);

    if (hasNewProduct) {
      const productBrands = service.product.map((product) => product.brand);

      const hasAllergyMatch = productBrands.some((brand) =>
        allergy.includes(brand)
      );

      return !hasAllergyMatch;
    }

    return false;
  });

  const bundleItems = allServices.filter((service) => {
    const hasNewBundle =
      service.product &&
      Array.isArray(service.product) &&
      service.product?.length > 1 &&
      service.product.some((product) => product.isNew === true);

    if (hasNewBundle) {
      const productBrands = service.product.map((product) => product.brand);

      const hasAllergyMatch = productBrands.some((brand) =>
        allergy.includes(brand)
      );

      return !hasAllergyMatch;
    }

    return false;
  });

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

  const totalNewItemsPages = Math.ceil(newItems?.length / itemsPerPageState);
  const totalBundleItemsPages = Math.ceil(
    bundleItems?.length / itemsPerPageState
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

  const [showModal, setShowModal] = useState(false);
  const [modalShown, setModalShown] = useState(false);

  const user = useSelector((state) => state.auth.user);
  const isOnlineCustomer = user?.roles?.includes("Online Customer");
  const isWalkInCustomer = user?.roles?.includes("Walk-in Customer");

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const isModalShownFromStorage = localStorage.getItem("modalShown");

    if (
      (isOnlineCustomer || isWalkInCustomer) &&
      !modalShown &&
      !isModalShownFromStorage
    ) {
      setShowModal(true);
      setModalShown(true);

      localStorage.setItem("modalShown", "true");

      setTimeout(() => {
        setShowModal(false);
      }, 10000);
    }
  }, [user, modalShown, isOnlineCustomer, isWalkInCustomer]);

  const handleLogout = async () => {
    try {
      localStorage.removeItem("modalShown");
      await dispatch(clearAppointmentData());
      await dispatch(logout());
      navigate("/beauticianSignUp");
      toast.success("Please Put Your Details To Sign Up As A Beautician", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    } catch (error) {
      toast.error("Error Logging Out", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      {servicesLoading || commentsLoading ? (
        <div className="loader">
          <FadeLoader color="#FDA7DF" loading={true} size={50} />
        </div>
      ) : (
        <>
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
                              `${
                                isOnlineCustomer
                                  ? "/onlineCustomer"
                                  : "/walkInCustomer"
                              }/service/${latestService?._id}`
                            )
                          }
                          className="text-lg px-4 py-[.6rem] rounded-lg bg-secondary-default"
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
                {hiring.hiringData.isHiring === true ? (
                  <div className="grid grid-cols-[50%_50%] justify-center items-center">
                    <div className="grid justify-center h-fit">
                      <h1 className="font-semibold xl:text-5xl lg:text-4xl md:text-3xl">
                        We're Hiring! Join us
                        <br />
                        Here at Lhanlee Salon
                      </h1>
                      <p className="py-4 text-justify lg:text-xl md:text-base">
                        The date of the interview will be exactly <br />
                        <span className="font-bold">
                          {hiring.hiringData.date} at {hiring.hiringData.time}.
                        </span>
                      </p>
                      <button
                        onClick={handleLogout}
                        className="px-6 py-2 text-xl rounded-md bg-primary-default w-fit"
                      >
                        Apply Now
                      </button>
                    </div>
                    <div className="grid items-center justify-center">
                      <img
                        src={Beautician}
                        alt="Beautician"
                        className="object-cover w-[32rem] h-96"
                      />
                    </div>
                  </div>
                ) : null}

                <div className="grid grid-cols-[50%_50%] justify-center items-center">
                  <div className="grid justify-center h-fit">
                    <h1 className="font-semibold xl:text-5xl lg:text-4xl md:text-3xl">
                      Welcome to <br /> Lhanlee Beauty Lounge <br />
                    </h1>
                    <p className="py-4 text-justify lg:text-xl md:text-base">
                      Where Beauty Meets Style! <br />
                    </p>
                  </div>
                  <div className="grid items-center justify-center">
                    <img
                      src={LhanleeLogo}
                      alt="Lhanlee Salon"
                      className="object-cover w-96 h-96"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-[50%_50%] justify-center items-center">
                  <div className="grid justify-center h-fit">
                    <h1 className="font-semibold xl:text-5xl lg:text-4xl md:text-3xl">
                      Elevate your style
                      <br />
                      with us!
                    </h1>
                    <p className="py-4 text-justify lg:text-xl md:text-base">
                      Indulge in a world of luxury with our
                      <br />
                      premium salon services.
                    </p>
                  </div>
                  <div className="grid items-center justify-center">
                    <img
                      src={Logo3}
                      alt="Logo3"
                      className="object-cover rounded-md w-96 h-96"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-[50%_50%] justify-center items-center">
                  <div className="grid justify-center h-fit">
                    <h1 className="font-semibold xl:text-5xl lg:text-4xl md:text-3xl">
                      Special Offers <br />
                    </h1>
                    <p className="py-4 text-justify lg:text-xl md:text-base">
                      Discover exclusive offers and packages tailored just for
                      you. <br />
                      Because you deserve the best without breaking the bank!
                    </p>
                  </div>
                  <div className="grid items-center justify-center">
                    <img
                      src={Beautician}
                      alt="CustomerThree"
                      className="object-cover w-[32rem] h-96"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-[50%_50%] justify-center items-center">
                  <div className="grid justify-center h-fit">
                    <h1 className="font-semibold xl:text-5xl lg:text-4xl md:text-3xl">
                      Unleash Your Confidence! <br />
                    </h1>
                    <p className="py-4 text-justify lg:text-xl md:text-base">
                      At Lhanlee Beauty Lounge, we don't just style hair,
                      <br />
                      we unleash confidence. Step out
                      <br />
                      feeling empowered and beautiful.
                    </p>
                  </div>
                  <div className="grid items-center justify-center">
                    <img
                      src={CustomerFour}
                      alt="CustomerFour"
                      className="object-cover w-full h-56 md:h-72 lg:h-80"
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
                      onClick={handleAllServices}
                      className="ml-8 mb-10 text-lg px-4 md:py-[.6rem] xl:py-0 rounded-lg bg-secondary-default w-fit"
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
                          onClick={handleAllServices}
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
                          onClick={handleAllServices}
                          className="ml-8 mb-10 text-lg px-4 py-[.6rem] rounded-lg bg-secondary-default w-fit"
                        >
                          Check Here
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 rounded-lg bg-primary-default">
                    <div className="flex flex-col justify-center pr-8">
                      <h1 className="px-8 py-4 text-3xl">
                        Pick Our <br />
                        <span className="font-semibold"> Best Offers!</span>
                      </h1>
                      <button
                        onClick={handleAllServices}
                        className="ml-auto mb-10 text-lg px-4 md:py-[.6rem] xl:py-0 rounded-lg bg-secondary-default"
                      >
                        Check Here
                      </button>
                    </div>
                    <img
                      src={ServicesOne}
                      className="object-cover w-full h-full rounded-b-lg"
                      alt="ServicesOne"
                    />
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
                      className="flex flex-col w-full p-8 rounded-md bg-primary-default"
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
            <div className="relative">
              <h1 className="absolute left-[40%] top-[10%] 2xl:text-6xl xl:text-5xl lg:text-4xl md:text-3xl text-center">
                Register Now On <br /> Our Mobile App.
              </h1>
              <img
                className="rounded-lg absolute left-[45.5%] top-[42.5%] text-6xl h-[15rem] w-[15rem]"
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
