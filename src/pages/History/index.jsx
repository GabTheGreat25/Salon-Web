import React from "react";
import { OnlineCustomerSidebar } from "@/components";
import FaceWash from "@assets/FaceWash.png";

const data = [
  {
    salon: "Lhanlee Beauty Salon",
    date: "Jan 01, 2024",
    status: "Completed",
    item: {
      image: FaceWash,
      name: "Face Wash",
      variation: "Face Service",
      price: "₱ 1,300.00",
    },
  },
  {
    salon: "Lhanlee Beauty Salon",
    date: "Jan 01, 2024",
    status: "Completed",
    item: {
      image: FaceWash,
      name: "Face Wash",
      variation: "Face Service",
      price: "₱ 1,300.00",
    },
  },
  {
    salon: "Lhanlee Beauty Salon",
    date: "Jan 01, 2024",
    status: "Completed",
    item: {
      image: FaceWash,
      name: "Face Wash",
      variation: "Face Service",
      price: "₱ 1,300.00",
    },
  },
  {
    salon: "Lhanlee Beauty Salon",
    date: "Jan 01, 2024",
    status: "Completed",
    item: {
      image: FaceWash,
      name: "Face Wash",
      variation: "Face Service",
      price: "₱ 1,300.00",
    },
  },
  {
    salon: "Lhanlee Beauty Salon",
    date: "Jan 01, 2024",
    status: "Completed",
    item: {
      image: FaceWash,
      name: "Face Wash",
      variation: "Face Service",
      price: "₱ 1,300.00",
    },
  },
];

export default function () {
  return (
    <>
      <div className="flex h-full">
        <OnlineCustomerSidebar />
        <div className="grid grid-flow-row-dense gap-y-8 items-center flex-1 w-full h-full mx-20 my-10 ">
          {data.map((entry, index) => (
            <div
              key={index}
              className="px-8 py-6 flex items-center w-full h-full bg-primary-default rounded-lg"
            >
              <div className="flex-grow">
                <div className="grid grid-flow-col-dense">
                  <h2 className="pb-2 font-sans lg:text-2xl md:text-base font-semibold">
                    {`${entry.salon} | ${entry.date}`}
                  </h2>
                  <div className="grid justify-end items-center">
                    <h1 className="rounded-2xl px-2 py-[.1rem] lg:text-lg md:text-sm bg-dark-default text-light-default dark:bg-light-default dark:text-dark-default">
                      {entry.status}
                    </h1>
                  </div>
                </div>
                <hr className="mb-4 border-t border-dark-default dark:border-light-default" />
                <div className="px-8 grid grid-cols-2">
                  <div className="grid xl:grid-cols-[25%_75%] md:grid-cols-[30%_70%] gap-x-2">
                    <div className="grid items-center justify-center">
                      <img
                        src={entry.item.image}
                        alt={entry.item.name}
                        className="object-cover 2xl:w-32 xl:w-28 xl:h-24 lg:w-20 lg:h-16 2xl:h-32 md:w-16 md:h-14  rounded-2xl"
                      />
                    </div>
                    <div>
                      <div className="grid grid-flow-row">
                        <h3 className="xl:text-xl lg:text-lg md:text-base  font-semibold">
                          {entry.item.name}
                        </h3>
                        <p className="xl:text-lg lg:text-base md:text-sm font-semibold">
                          Variation: {entry.item.variation}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="grid w-full justify-end items-end">
                      <h3 className="xl:text-xl lg:text-lg md:text-base font-semibold">
                        {entry.item.price}
                      </h3>
                    </div>
                  </div>
                </div>
                <hr className="my-4 border-t border-dark-default dark:border-light-default" />
                <div className="grid justify-end">
                  <h1 className="text-xl">
                    Order Total:
                    <span className="font-semibold">{entry.item.price}</span>
                  </h1>
                </div>
                <div className="pt-5 grid grid-flow-col-dense justify-end items-center gap-x-4">
                  <div className="text-xl py-2 px-10 bg-secondary-default rounded-lg">
                    <button>Rate</button>
                  </div>
                  <div className="hover:bg-primary-accent text-lg py-2 px-6 border dark:border-light-default border-dark-default rounded-lg">
                    <button>Appoint Again</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
