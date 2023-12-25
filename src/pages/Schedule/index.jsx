import React from "react";
import { OnlineCustomerSidebar, WalkInCustomerSidebar } from "@/components";
import FaceWash from "@assets/FaceWash.png";
import { useSelector } from "react-redux";

const data = [
  {
    salon: "Lhanlee Beauty Salon",
    date: "Jan 01, 2024",
    status: "Pending",
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
    status: "Pending",
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
    status: "Pending",
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
    status: "Pending",
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
    status: "Pending",
    item: {
      image: FaceWash,
      name: "Face Wash",
      variation: "Face Service",
      price: "₱ 1,300.00",
    },
  },
];

export default function () {
  const auth = useSelector((state) => state.auth.user);

  const isOnlineCustomer = auth?.roles?.includes("Online Customer");
  const isWalkInCustomer = auth?.roles?.includes("Walk-in Customer");
  return (
    <>
      <div className="flex h-full">
        {isOnlineCustomer ? (
          <OnlineCustomerSidebar />
        ) : isWalkInCustomer ? (
          <WalkInCustomerSidebar />
        ) : null}
        <div className="grid items-center flex-1 w-full h-full grid-flow-row-dense mx-20 my-10 gap-y-8 ">
          {data.map((entry, index) => (
            <div
              key={index}
              className="flex items-center w-full h-full px-8 py-6 rounded-lg bg-primary-default"
            >
              <div className="flex-grow">
                <div className="grid grid-flow-col-dense">
                  <h2 className="pb-2 font-sans font-semibold lg:text-2xl md:text-base">
                    {`${entry.salon} | ${entry.date}`}
                  </h2>
                  <div className="grid items-center justify-end">
                    <h1 className="rounded-2xl px-2 py-[.1rem] lg:text-lg md:text-sm bg-dark-default text-light-default dark:bg-light-default dark:text-dark-default">
                      {entry.status}
                    </h1>
                  </div>
                </div>
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
                    <div className="grid items-end justify-end w-full">
                      <h3 className="font-semibold xl:text-xl lg:text-lg md:text-base">
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
                <div className="grid items-center justify-end pt-5">
                  <div className="px-6 py-2 text-lg border rounded-lg hover:bg-primary-accent dark:border-light-default border-dark-default">
                    <button>Pending</button>
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
