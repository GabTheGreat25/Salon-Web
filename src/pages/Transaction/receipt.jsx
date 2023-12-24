import React from "react";
import FaceWash from "@assets/FaceWash.png";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RandomServicesSidebar } from "@/components";

const data = [
  {
    salon: "Lhanlee Beauty Salon",
    item: {
      image: FaceWash,
      name: "Face Wash",
      variation: "Face Service",
      price: "₱ 1,300.00",
      schedule: "Appointment by 5 Feb 2023 11:00am Tue",
    },
  },
  {
    salon: "Lhanlee Beauty Salon",
    item: {
      image: FaceWash,
      name: "Face Wash",
      variation: "Face Service",
      price: "₱ 1,300.00",
      schedule: "Appointment by 5 Feb 2023 11:00am Tue",
    },
  },
  {
    salon: "Lhanlee Beauty Salon",
    item: {
      image: FaceWash,
      name: "Face Wash",
      variation: "Face Service",
      price: "₱ 1,300.00",
      schedule: "Appointment by 5 Feb 2023 11:00am Tue",
    },
  },
  {
    salon: "Lhanlee Beauty Salon",
    item: {
      image: FaceWash,
      name: "Face Wash",
      variation: "Face Service",
      price: "₱ 1,300.00",
      schedule: "Appointment by 5 Feb 2023 11:00am Tue",
    },
  },
  {
    salon: "Lhanlee Beauty Salon",
    item: {
      image: FaceWash,
      name: "Face Wash",
      variation: "Face Service",
      price: "₱ 1,300.00",
      schedule: "Appointment by 5 Feb 2023 11:00am Tue",
    },
  },
];

export default function () {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const isOnlineCustomer = user.roles.includes("Online Customer");

  const goBack = () => {
    window.history.back();
  };

  const history = () => {
    navigate(
      `${isOnlineCustomer ? "/onlineCustomer" : "/walkInCustomer"}/history`
    );
  };

  return (
    <div className="grid h-full grid-cols-[70%_30%]">
      <div className="flex-grow">
        <div className="grid items-center justify-center grid-flow-col-dense w-fit">
          <button className="p-10 text-3xl w-fit" onClick={goBack}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <h1 className="text-3xl">Receipt</h1>
        </div>
        <div className="grid grid-flow-row-dense px-10 gap-y-8">
          {data.map((entry, index) => (
            <div
              key={index}
              className="flex items-center px-8 py-6 rounded-lg bg-primary-default"
            >
              <div className="flex-grow">
                <h2 className="pb-2 font-sans font-semibold lg:text-2xl md:text-base">
                  {`${entry.salon}`}
                </h2>
                <hr className="mb-4 border-t border-dark-default dark:border-light-default" />
                <div className="grid grid-cols-2 px-8">
                  <div className="grid xl:grid-cols-[25%_75%] md:grid-cols-[30%_70%] gap-x-2">
                    <div className="grid items-center justify-center">
                      <img
                        src={entry.item.image}
                        alt={entry.item.name}
                        className="object-cover 2xl:w-32 xl:w-28 xl:h-24 lg:w-20 lg:h-16 2xl:h-32 md:w-16 md:h-14 rounded-2xl"
                      />
                    </div>
                    <div>
                      <div className="grid grid-flow-row pr-8">
                        <h3 className="font-semibold xl:text-xl lg:text-lg md:text-base">
                          {entry.item.name}
                        </h3>
                        <p className="font-semibold xl:text-lg lg:text-base md:text-sm">
                          Variation: {entry.item.variation}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="grid items-end justify-end w-full grid-flow-row-dense">
                      <h3 className="font-semibold xl:text-xl lg:text-lg md:text-base">
                        {entry.item.schedule}
                      </h3>
                      <div className="grid items-center justify-end">
                        <h3 className="font-semibold xl:text-xl lg:text-lg md:text-base">
                          {entry.item.price}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-flow-row-dense pb-10 pr-10 pt-28 gap-y-6">
        <div className="w-full h-full">
          <div className="grid grid-flow-row-dense">
            <div className="px-8 py-10 rounded-lg bg-primary-default">
              <div className="grid grid-flow-col-dense gap-x-8">
                <span>
                  <h1 className="font-semibold xl:text-xl lg:text-lg md:text-base">
                    Order Summary
                  </h1>
                </span>
                <span className="text-end">
                  <h1>₱ 1300.00</h1>
                </span>
              </div>
              <h1 className="pt-1 pb-10">Subtotal (5 items)</h1>
              <div className="grid grid-flow-col-dense gap-x-8">
                <span>
                  <h1 className="font-semibold xl:text-xl lg:text-lg md:text-base">
                    Extra Fee
                  </h1>
                </span>
                <span className="text-end">
                  <h1>₱ 00.00</h1>
                </span>
              </div>
              <hr className="my-4 border-t border-dark-default dark:border-light-default" />
              <div className="grid grid-flow-col-dense pb-16 gap-x-8">
                <span>
                  <h1 className="font-semibold xl:text-xl lg:text-lg md:text-base">
                    Subtotal
                  </h1>
                </span>
                <span className="text-end">
                  <h1>₱ 1300.00</h1>
                </span>
              </div>
              <div
                onClick={history}
                className="w-full py-3 text-center rounded-lg cursor-pointer xl:text-xl lg:text-lg md:text-base bg-light-default dark:bg-dark-default"
              >
                <button>Confirm</button>
              </div>
            </div>
          </div>
        </div>
        <span className="grid items-center justify-center">
          <RandomServicesSidebar />
        </span>
      </div>
    </div>
  );
}
