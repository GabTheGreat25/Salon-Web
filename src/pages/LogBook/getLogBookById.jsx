import React from "react";
import {
  useGetLogBookByIdQuery,
} from "@api";
import { Card, CardImage } from "@components";
import { FadeLoader } from "react-spinners";
import { useParams } from "react-router-dom";


export default function LogBookForm() {
  const { id } = useParams();
  const { data, isLoading } = useGetLogBookByIdQuery(id);
  const logbook = data?.details;

  return (
    <>
      {isLoading ? (
        <div className="loader">
          <FadeLoader color="#FFB6C1" loading={true} size={50} />
        </div>
      ) : (
        <>
          <Card>
            <div className="grid w-full h-full text-light-default dark:text-dark-default">
              <span className="grid items-end md:gap-y-5 2xl:gap-y-10 justify-center 2xl:grid-rows-[90%_10%] xl:grid-rows-[80%_20%] md:grid-rows-[75%_25%]">
                <h1 className="text-3xl font-semibold text-center">
                  LogBook Information
                </h1>
                <p className="text-xl text-center lg:px-12 text-light-default dark:text-dark-default">
                  Logbook record details at Lhanlee Beauty Lounge
                </p>
              </span>
              <div className="overflow-x-hidden grid grid-cols-[50%_50%] items-center justify-start pt-20 pb-6 gap-x-6 2xl:pr-0 md:pr-10">
                <CardImage />
                <form
                  onSubmit=""
                  className="grid items-end justify-center w-full h-full grid-flow-row-dense pr-12 gap-y-4"
                >
                  <label className="block">
                    <span
                      className="xl:text-xl md:text-[1rem] font-semibold"
                    >
                     Beautician Name:
                    </span>
                    <input
                      type="text"
                      id="user"
                      name="user"
                      autoComplete="off"
                      value={logbook?.user?.name || ""}
                      readOnly
                      className="border-light-default block mb-2 ml-6 xl:text-lg md:text-[1rem] placeholder-white border-0 border-b-2 bg-card-input  dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full"
                
                    />
                  </label>

                  <label className="block">
                    <span
                      className="xl:text-xl md:text-[1rem] font-semibold"
                    >
                      Time Borrowed:
                    </span>
                    <input
                      type="text"
                      id="user"
                      name="user"
                      autoComplete="off"
                      value={logbook?.time_borrowed || ""}
                      readOnly
                      className="border-light-default block mb-2 ml-6 xl:text-lg md:text-[1rem] placeholder-white border-0 border-b-2 bg-card-input  dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full"
                
                    />
                  </label>


                  <label className="block">
                    <span
                      className="xl:text-xl md:text-[1rem] font-semibold"
                    >
                     Date Borrowed:
                    </span>
                    <input
                      type="text"
                      id="user"
                      name="user"
                      autoComplete="off"
                      value={
                        new Date(logbook?.date_borrowed)
                          .toISOString()
                          .split("T")[0] || ""
                      }
                      readOnly
                      className="border-light-default block mb-2 ml-6 xl:text-lg md:text-[1rem] placeholder-white border-0 border-b-2 bg-card-input  dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full"
                    />
                  </label>


                  <label className="block">
                    <span
                      className="xl:text-xl md:text-[1rem] font-semibold"
                    >
                     LogBook Notes:
                    </span>
                    <input
                      type="text"
                      id="user"
                      name="user"
                      autoComplete="off"
                      value={logbook?.note || ""}
                      readOnly
                      className="border-light-default block mb-2 ml-6 xl:text-lg md:text-[1rem] placeholder-white border-0 border-b-2 bg-card-input  dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full"
                
                    />
                  </label>


                  {logbook?.equipment?.map((equipment, index) => (
                    <div key={index} className="mb-4">
                      <label className="block mb-2">
                        Borrowed Equipment
                        <input
                          type="text"
                          value={equipment?.equipment?.equipment_name}
                          readOnly
                          className="block text-dark-default w-full mt-1 border rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                        />
                      </label>

                      <label className="block mb-2">
                        Pieces Borrowed:
                        <input
                          type="number"
                          value={equipment.borrow_quantity}
                          className="block text-dark-default w-full mt-1 border rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                        />
                      </label>

                      <label className="block mb-2">
                        Missing Quantity:
                        <input
                          type="number"
                          value={equipment.missing_quantity}
                          className="block text-dark-default w-full mt-1 border rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                        />
                      </label>

                      <label className="block mb-2">
                        Damage Quantity:
                        <input
                          type="number"
                          value={equipment.damage_quantity}
                          className="block text-dark-default  w-full mt-1 border rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                        />
                      </label>

                      <label className="block">
                    <span
                      className="xl:text-xl md:text-[1rem] font-semibold"
                    >
                      Equipment Status:
                    </span>
                    <input
                      type="text"
                      id="user"
                      name="user"
                      autoComplete="off"
                      value={equipment?.status || ""}
                      readOnly
                      className="border-light-default block mb-2 ml-6 xl:text-lg md:text-[1rem] placeholder-white border-0 border-b-2 bg-card-input  dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full"
                    />
                  </label>

                    </div>
                  ))}

<label className="block">
                    <span
                      className="xl:text-xl md:text-[1rem] font-semibold"
                    >
                      Logbook Status
                    </span>
                    <input
                      type="text"
                      id="user"
                      name="user"
                      autoComplete="off"
                      value={logbook?.status || ""}
                      readOnly
                      className="border-light-default block mb-2 ml-6 xl:text-lg md:text-[1rem] placeholder-white border-0 border-b-2 bg-card-input  dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full"
                
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
