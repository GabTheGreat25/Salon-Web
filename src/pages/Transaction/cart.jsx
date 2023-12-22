import React from "react";
import {
  faArrowLeft,
  faTrash,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FaceWash from "@assets/FaceWash.png";

const data = [
  {
    salon: "Lhanlee Beauty Salon",
    item: {
      image: FaceWash,
      name: "Face Wash",
      variation: "Face Service",
      price: "₱ 1,300.00",
    },
  },
  {
    salon: "Lhanlee Beauty Salon",
    item: {
      image: FaceWash,
      name: "Face Wash",
      variation: "Face Service",
      price: "₱ 1,300.00",
    },
  },
  {
    salon: "Lhanlee Beauty Salon",
    item: {
      image: FaceWash,
      name: "Face Wash",
      variation: "Face Service",
      price: "₱ 1,300.00",
    },
  },
  {
    salon: "Lhanlee Beauty Salon",
    item: {
      image: FaceWash,
      name: "Face Wash",
      variation: "Face Service",
      price: "₱ 1,300.00",
    },
  },
  {
    salon: "Lhanlee Beauty Salon",
    item: {
      image: FaceWash,
      name: "Face Wash",
      variation: "Face Service",
      price: "₱ 1,300.00",
    },
  },
];

export default function () {
  const goBack = () => {
    window.history.back();
  };

  return (
    <>
      <div className="grid w-full h-full grid-flow-col-dense pb-10 gap-x-4">
        <div>
          <button className="p-10 text-3xl w-fit" onClick={goBack}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <div className="grid grid-flow-row-dense px-20 gap-y-8">
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
                        <div className="grid grid-flow-row">
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
                          {entry.item.price}
                        </h3>
                        <div className="grid items-center justify-end">
                          <span>
                            <button className="text-3xl cursor-pointer">
                              <FontAwesomeIcon icon={faTrash} color="red" />
                            </button>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-flow-row-dense px-10 pt-28 h-fit">
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
            <div className="w-full py-3 text-center rounded-lg cursor-pointer xl:text-xl lg:text-lg md:text-base bg-light-default dark:bg-dark-default">
              <button>Proceed On Checkout</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
