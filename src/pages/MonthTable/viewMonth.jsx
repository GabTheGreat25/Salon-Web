import React, { useRef, useEffect } from "react";
import { Card, CardImage } from "@components";
import { useGetMonthByIdQuery } from "@api";
import { useParams } from "react-router-dom";
import { FadeLoader } from "react-spinners";

export default function () {
  const isFocused = useRef(true);

  const { id } = useParams();
  const { data, isLoading, refetch } = useGetMonthByIdQuery(id);
  const month = data?.details;

  useEffect(() => {
    const handleFocus = () => {
      isFocused.current = true;
      refetch();
    };

    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, [refetch]);

  const getMonthName = (monthNumber) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return monthNames[monthNumber];
  };

  const eventDate = getMonthName(Number(month?.month));

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
              <span className="grid items-end md:gap-y-5 2xl:gap-y-10 justify-center 2xl:grid-rows-[90%_10%] xl:grid-rows-[80%_20%] md:grid-rows-[75%_25%]">
                <h1 className="text-3xl font-semibold text-center">
                  Event Details
                </h1>
                <p className="text-xl text-center lg:px-12 text-light-default dark:text-dark-default">
                  Month of {eventDate} in Lhanlee Beauty Lounge
                </p>
              </span>
              <div className="overflow-x-hidden grid grid-cols-[50%_50%] items-start justify-start lg:pt-20 md:pt-10 pb-6 gap-x-6 2xl:pr-0 md:pr-10">
                <CardImage />
                <form className="grid items-end justify-center w-full grid-flow-row-dense pt-20 pr-12 h-fit gap-y-4">
                  <label className="block">
                    <span className="xl:text-xl md:text-[1rem] font-semibold">
                      Month:
                    </span>
                    <input
                      type="text"
                      readOnly
                      value={eventDate}
                      className="block mb-2 ml-6 xl:text-lg md:text-[1rem]  border-0 bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full"
                    />
                  </label>
                  <label className="block">
                    <span className=" xl:text-xl md:text-[1rem] font-semibold">
                      Month Message:
                    </span>
                    <textarea
                      id="message"
                      name="message"
                      autoComplete="off"
                      value={month?.message}
                      rows="8"
                      className="border-light-default block my-2 ml-6 resize-none xl:text-lg md:text-[1rem] placeholder-white border-2 bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full rounded-lg"
                    />
                  </label>
                </form>
              </div>
            </div>
          </Card>
        </>
      )}
    </>
  );
}
