import React, { useState, useEffect } from "react";
import { RandomServicesSidebar } from "@/components";
import "react-toastify/dist/ReactToastify.css";
import { FadeLoader } from "react-spinners";
import {
  useGetServiceByIdQuery,
  useGetCommentsQuery,
  useGetOptionsQuery,
} from "@api";
import { useParams } from "react-router-dom";
import {
  faArrowLeft,
  faArrowRight,
  faStar,
  faStarHalf,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import noPhoto from "@/assets/no-photo.jpg";
import { useDispatch, useSelector } from "react-redux";
import { appointmentSlice } from "@appointment";

export default function () {
  const dispatch = useDispatch();

  const goBack = () => {
    window.history.back();
  };

  const user = useSelector((state) => state.auth.user);

  const [selectedStars, setSelectedStars] = useState(5);

  const { id } = useParams();
  const { data: serviceData, isLoading: serviceLoading } =
    useGetServiceByIdQuery(id);

  const { data: commentsData } = useGetCommentsQuery();
  const comments = commentsData?.details || [];

  const { data: optionsData } = useGetOptionsQuery();
  const options = optionsData?.details || [];

  const filteredOptions = options.filter((option) =>
    option.service.some((service) => service._id === id)
  );

  const itemsPerPage = {
    "2xl": 5,
    xl: 4,
    lg: 3,
    md: 2,
  };

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPageState, setOptionsPerPageState] = useState(
    determineOptionsPerPage()
  );

  function determineOptionsPerPage() {
    if (window.innerWidth >= 1535) {
      return itemsPerPage["2xl"];
    } else if (window.innerWidth >= 1280) {
      return itemsPerPage.xl;
    } else if (window.innerWidth >= 1024) {
      return itemsPerPage.lg;
    } else return itemsPerPage.md;
  }

  const totalNewOptionsPages = Math.ceil(
    filteredOptions?.length / itemsPerPageState
  );

  const showNextNewOptions = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, totalNewOptionsPages - 1)
    );
  };

  const showPreviousNewOptions = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const startIndex = currentPage * itemsPerPageState;
  const endIndex = startIndex + itemsPerPageState;

  const visibleNewOptions = filteredOptions.slice(startIndex, endIndex);

  useEffect(() => {
    const handleResize = () => {
      setCurrentPage(0);
      setOptionsPerPageState(determineOptionsPerPage());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const serviceComments = comments.filter((comment) =>
    comment.transaction?.appointment?.service.some((s) => s._id === id)
  );

  const ratings = serviceComments.flatMap((comment) => comment.ratings);
  const count = ratings?.length;
  const averageRating =
    count > 0 ? ratings.reduce((sum, rating) => sum + rating, 0) / count : 0;

  const {
    _id,
    service_name,
    description,
    duration,
    type,
    occassion,
    price,
    image,
    product,
  } = serviceData?.details || {};

  const randomizedImages = image?.length
    ? image[Math.floor(Math.random() * image?.length)].url
    : null;

  const filteredServiceComments =
    selectedStars !== null
      ? serviceComments.filter((comment) => comment.ratings === selectedStars)
      : serviceComments;

  const [selectedOptions, setSelectedOptions] = useState([]);

  const toggleOption = (optionId) => {
    if (selectedOptions.includes(optionId)) {
      setSelectedOptions(selectedOptions.filter((id) => id !== optionId));
    } else setSelectedOptions([...selectedOptions, optionId]);
  };

  const handlePress = (selectedProduct) => {
    const optionNames = selectedOptions.map(
      (optionId) =>
        options.find((option) => option._id === optionId)?.option_name || ""
    );
    const extraFee = selectedOptions.reduce(
      (sum, optionId) =>
        sum +
        (options.find((option) => option._id === optionId)?.extraFee || 0),
      0
    );

    const perPrices = selectedOptions.map((optionId) => {
      const option = options.find((option) => option._id === optionId);
      return option ? option.extraFee : 0;
    });

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
        image: selectedProduct?.image || [],
        option_id: selectedOptions || [],
        option_name: optionNames.join(", "),
        per_price: perPrices || 0,
        extraFee: extraFee || 0,
      })
    );

    setSelectedOptions([]);
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleViewModal = (option) => {
    setSelectedOption(option);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      {serviceLoading ? (
        <div className="loader">
          <FadeLoader color="#FDA7DF" loading={true} size={50} />
        </div>
      ) : (
        <>
          <div className="flex flex-row-reverse h-full">
            <RandomServicesSidebar />
            <div className="grid flex-1 w-full h-full mx-20 my-10 gap-y-6">
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
                      className="object-cover rounded-xl 2xl:w-96 2xl:h-96 xl:w-72 xl:h-72 lg:w-[14rem] lg:h-[14rem] md:w-48 md:h-48"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h1 className="font-semibold xl:text-3xl lg:text-xl md:text-lg">
                      Service Name: {service_name}
                    </h1>
                    <div className="grid items-center justify-start w-full lg:pb-10 md:pb-5 gap-x-3">
                      <span className="grid items-center grid-flow-col-dense pt-2 text-xl w-fit gap-x-2">
                        {averageRating > 0 ? (
                          [...Array(Math.floor(averageRating))].map(
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
                        {averageRating % 1 !== 0 && (
                          <FontAwesomeIcon icon={faStarHalf} color="#feca57" />
                        )}
                        {averageRating > 0 ? (
                          <p className="font-semibold">
                            {averageRating.toFixed(1)} out of 5
                          </p>
                        ) : null}
                      </span>
                    </div>
                    <h1 className="font-semibold xl:pb-8 lg:pb-6 md:pb-2 xl:text-2xl lg:text-xl md:text-lg">
                      Price: ₱{price}
                    </h1>
                    <h1 className="font-semibold xl:pb-8 lg:pb-6 md:pb-2 xl:text-2xl lg:text-xl md:text-lg">
                      Description: {description}
                    </h1>
                    <h1 className="font-semibold xl:pb-8 lg:pb-6 md:pb-2 xl:text-2xl lg:text-xl md:text-lg">
                      Occasion: {occassion}
                    </h1>
                    <h1 className="font-semibold xl:pb-8 lg:pb-6 md:pb-2 xl:text-2xl lg:text-xl md:text-lg">
                      <p>For: {type.join(", ")}</p>
                    </h1>
                    <h1 className="font-semibold xl:pb-8 lg:pb-6 md:pb-2 xl:text-2xl lg:text-xl md:text-lg">
                      {duration}
                    </h1>
                    <h1 className="pb-1 xl:text-lg md:text-sm font-extralight">
                      Products used:
                    </h1>
                    <span className="grid grid-cols-[33.33%_33.34%_33.33%] grid-flow-rows-dense w-fit gap-2 xl:text-lg md:text-sm pb-4">
                      {product?.map((product, index) => (
                        <div key={index}>
                          {product?.product_name?.length > 25
                            ? `${product?.product_name.slice(0, 25)}...`
                            : product?.product_name}
                        </div>
                      ))}
                    </span>
                    <div className="grid items-center justify-end">
                      <button
                        type="button"
                        onClick={() => handlePress(serviceData?.details)}
                        className="px-6 py-3 rounded-lg xl:text-2xl lg:text-xl w-fit bg-secondary-default"
                      >
                        Add Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {visibleNewOptions.length > 0 && (
                <>
                  <div className="grid grid-cols-2">
                    <h1 className="pb-6 font-semibold xl:text-2xl md:text-base">
                      {`Choose from the list of our add ons for your service${user?.name
                        .charAt(0)
                        .toUpperCase()}${user?.name.slice(
                        1
                      )} to make it more special!`}
                    </h1>
                    {totalNewOptionsPages > 1 && (
                      <div className="flex items-end justify-end mb-4">
                        <button
                          className="px-3 py-1 mr-2 text-xl rounded-full bg-primary-default w-fit"
                          onClick={showPreviousNewOptions}
                          disabled={currentPage === 0}
                        >
                          <FontAwesomeIcon icon={faArrowLeft} />
                        </button>
                        <button
                          className="px-3 py-1 ml-2 text-xl rounded-full bg-primary-default w-fit"
                          onClick={showNextNewOptions}
                          disabled={currentPage === totalNewOptionsPages - 1}
                        >
                          <FontAwesomeIcon icon={faArrowRight} />
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="overflow-x-auto">
                    <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4 w-[calc(64px + 10rem * 5)] mx-auto">
                      {visibleNewOptions.map((option) => (
                        <div
                          className={`w-full h-full p-8 rounded-md ${
                            selectedOptions.includes(option._id)
                              ? "bg-primary-accent"
                              : "bg-primary-default"
                          }`}
                          key={option._id}
                          onClick={() => toggleOption(option._id)}
                        >
                          <div className="grid items-center justify-center">
                            <img
                              className="object-center w-64 h-64 rounded-full cursor-pointer"
                              src={
                                option?.image && option?.image?.length
                                  ? option?.image[
                                      Math.floor(
                                        Math.random() * option?.image?.length
                                      )
                                    ]?.url
                                  : null
                              }
                              alt={option?.image?.originalname}
                              key={option?.image?.public_id}
                            />
                          </div>
                          <h1 className="pt-3 text-2xl font-semibold">
                            {option?.option_name?.length > 10
                              ? `${option?.option_name.slice(0, 10)}...`
                              : option?.option_name}
                          </h1>
                          <h1 className="pb-1 text-lg font-extralight">
                            {option?.description?.length > 10
                              ? `${option.description.slice(0, 10)}...`
                              : option.description}
                          </h1>
                          <div className="grid items-end grid-flow-col-dense mt-4">
                            <h1 className="pt-4 pr-2 text-xl">
                              ₱{option.extraFee}
                            </h1>
                            <span className="grid items-center justify-end">
                              <button
                                onClick={() => handleViewModal(option)}
                                className="text-lg px-4 py-[.6rem] rounded-lg bg-secondary-default"
                              >
                                View
                              </button>
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
              <div className="w-full h-full py-6 rounded-lg bg-primary-default">
                <div className="px-8">
                  <h1 className="pb-4 font-semibold xl:text-3xl lg:text-xl md:text-lg">
                    Service Review
                  </h1>
                  <div className="grid grid-flow-row-dense gap-y-8">
                    <div className="rounded-md lg:p-8 md:p-4 bg-light-default dark:bg-dark-default">
                      <div className="grid gap-4 xl:grid-flow-col-dense">
                        <div className="grid grid-flow-row-dense xl:items-start xl:justify-start md:items-center md:justify-center">
                          <h1 className="xl:text-start md:text-center 2xl:text-2xl xl:text-lg lg:text-lg md:text-base">
                            {averageRating.toFixed(1)} out of 5
                          </h1>
                        </div>
                        <div className="grid items-center justify-center grid-flow-col-dense md:gap-x-2 xl:gap-x-4">
                          <div
                            key="all"
                            className={`py-2 border rounded-lg 2xl:w-[6rem] xl:w-[5rem] md:w-[4rem] text-center md:px-2 border-primary-default hover:bg-primary-accent ${
                              selectedStars === null ? "bg-primary-accent" : ""
                            }`}
                            onClick={() => setSelectedStars(null)}
                          >
                            <button className="2xl:text-2xl xl:text-base lg:text-sm md:text-xs">
                              All
                            </button>
                          </div>
                          {[5, 4, 3, 2, 1].map((stars) => (
                            <div
                              key={stars}
                              className={`py-2 border rounded-lg md:px-2 border-primary-default hover:bg-primary-accent ${
                                selectedStars === stars
                                  ? "bg-primary-accent"
                                  : ""
                              }`}
                              onClick={() => setSelectedStars(stars)}
                            >
                              <button className="2xl:text-2xl xl:text-base lg:text-sm md:text-xs">
                                {stars} Stars
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    {filteredServiceComments?.map((comment) => (
                      <div
                        key={comment._id}
                        className="px-8 py-4 rounded-md bg-light-default dark:bg-dark-default"
                      >
                        <div className="grid items-center justify-center grid-flow-col-dense w-fit gap-x-6">
                          <div>
                            <img
                              src={
                                comment?.image && comment?.image?.length
                                  ? comment?.image[
                                      Math.floor(
                                        Math.random() * comment?.image?.length
                                      )
                                    ]?.url
                                  : noPhoto
                              }
                              alt={comment?.image?.originalname}
                              key={comment?.image?.public_id}
                              className="object-cover w-32 h-32 rounded-2xl"
                            />
                          </div>
                          <div>
                            <h1 className="pb-2 font-semibold xl:text-lg md:text-base">
                              {comment?.isAnonymous
                                ? comment?.transaction?.appointment?.customer?.name.substring(
                                    0,
                                    2
                                  ) +
                                  "*****" +
                                  comment?.transaction?.appointment?.customer?.name.substring(
                                    10
                                  )
                                : comment?.transaction?.appointment?.customer
                                    ?.name}
                            </h1>
                            <div className="flex items-center">
                              {[...Array(comment.ratings)].map(
                                (_, starIndex) => (
                                  <FontAwesomeIcon
                                    icon={faStar}
                                    key={starIndex}
                                    color="#feca57"
                                  />
                                )
                              )}
                            </div>
                            <h1 className="py-4 text-lg text-justify">
                              {comment?.description}
                            </h1>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {modalVisible && selectedOption && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-60 bg-neutral-primary">
          <div className="p-8 rounded-lg bg-light-default dark:bg-dark-default w-96">
            <h2 className="mb-4 text-2xl font-bold">Add Ons Details</h2>
            <div className="grid gap-y-6">
              <div className="grid items-center justify-center">
                <img
                  src={
                    selectedOption?.image && selectedOption?.image?.length > 0
                      ? selectedOption?.image[
                          Math.floor(
                            Math.random() * selectedOption?.image?.length
                          )
                        ]?.url
                      : noPhoto
                  }
                  alt={selectedOption?.image?.originalname}
                  className="object-cover w-32 h-32 rounded-2xl"
                />
              </div>
              <div>
                <h1 className="pb-2 font-semibold xl:text-lg md:text-base">
                  Name: {selectedOption.option_name}
                </h1>
                <h1 className="pb-1 text-lg font-extralight">
                  Description: {selectedOption?.description}
                </h1>
                <div className="grid items-end grid-flow-col-dense">
                  <h1 className="pt-4 pr-2 text-xl">
                    Price: ₱{selectedOption.extraFee}
                  </h1>
                </div>
                <span className="grid items-center justify-center">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-8 py-2 mt-4 ml-2 font-semibold border rounded-md border-secondary-default hover:bg-secondary-accent"
                  >
                    Close
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
