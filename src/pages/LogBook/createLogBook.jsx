import React from "react";
import { useFormik } from "formik";
import {
  useGetUsersQuery,
  useGetEquipmentsQuery,
  useAddLogBookMutation,
} from "@api";
import { Card, CardImage } from "@components";
import { FadeLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LogBookForm() {
  const navigate = useNavigate();

  const [addLogBook, isLoading] = useAddLogBookMutation();
  const { data: users, isLoading: userLoading } = useGetUsersQuery();
  const { data: equipments, isLoading: equipmentLoading } =
    useGetEquipmentsQuery();

  const user = users?.details;
  const filteredBeauticians = user?.filter((user) =>
    user?.roles.includes("Beautician")
  );
  const borrowEquipments = equipments?.details;

  const formik = useFormik({
    initialValues: {
      user: "",
      equipment:
        borrowEquipments?.map((equipment) => ({
          equipment: equipment._id,
          borrow_quantity: 0,
        })) || [],
    },
    onSubmit: (values) => {
      addLogBook(values).then((response) => {
        const toastProps = {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
        };
        if (response?.data?.success === true) {
          navigate("/admin/logbooks");
          toast.success(`${response?.data?.message}`, toastProps);
        } else
          toast.error(`${response?.error?.data?.error?.message}`, toastProps);
      });
    },
  });

  const handleEquipmentChange = (equipmentId, isChecked) => {
    const existingEquipmentIndex = formik.values.equipment.findIndex(
      (item) => item.equipment === equipmentId
    );

    if (isChecked && existingEquipmentIndex === -1) {
      formik.setFieldValue("equipment", [
        ...formik.values.equipment,
        { equipment: equipmentId, borrow_quantity: 1 },
      ]);
    } else if (!isChecked && existingEquipmentIndex !== -1) {
      const updatedEquipment = [...formik.values.equipment];
      updatedEquipment.splice(existingEquipmentIndex, 1);
      formik.setFieldValue("equipment", updatedEquipment);
    }
  };

  const handleBorrowQuantityChange = (equipmentId, quantity) => {
    const updatedEquipment = formik.values.equipment.map((item) =>
      item.equipment === equipmentId
        ? { ...item, borrow_quantity: quantity }
        : item
    );
    formik.setFieldValue("equipment", updatedEquipment);
  };


  return (
    <>
      {!isLoading ? (
        <div className="loader">
          <FadeLoader color="#FFB6C1" loading={true} size={50} />
        </div>
      ) : (
        <>
          <Card>
            <div className="grid w-full h-full text-light-default dark:text-dark-default">
              <span className="grid items-end md:gap-y-5 lg:gap-y-8 2xl:gap-y-10 justify-center 2xl:grid-rows-[90%_10%] xl:grid-rows-[80%_20%] md:grid-rows-[75%_25%]">
                <h1 className="text-3xl font-semibold text-center">
                  Create LogBook
                </h1>
                <p className="text-xl text-center lg:px-12 text-light-default dark:text-dark-default">
                  Create a Logbook Record
                </p>
              </span>
              <div className="overflow-x-hidden grid grid-cols-[50%_50%] items-start justify-start pt-20 pb-6 gap-x-6 2xl:pr-0 md:pr-10">
                <CardImage />
                <form
                  onSubmit={formik.handleSubmit}
                  className="grid items-end justify-center w-full grid-flow-row-dense pt-20 pr-12 h-fit gap-y-4"
                >
                  <label className="block">
                    <span
                      className={`${
                        formik.touched.user &&
                        formik.errors.user &&
                        "text-red-600"
                      } xl:text-xl md:text-[1rem] font-semibold`}
                    >
                      Beautician:
                    </span>
                    <select
                      id="user"
                      name="user"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.user}
                      className={`${
                        formik.touched.user && formik.errors.user
                          ? "border-red-600"
                          : "border-light-default"
                      } block mb-2 ml-6 xl:text-lg md:text-[1rem] placeholder-white border-0 border-b-2 bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full`}
                    >
                      <option className="text-black" value="">
                        Select Beautician
                      </option>
                      {filteredBeauticians?.map((beautician) => (
                        <option
                          className="text-black"
                          key={beautician._id}
                          value={beautician._id}
                        >
                          {beautician.name}
                        </option>
                      ))}
                    </select>
                    {formik.touched.user && formik.errors.user && (
                      <div className="text-lg font-semibold text-red-600">
                        {formik.errors.user}
                      </div>
                    )}
                  </label>

                  <label className="block">
                    <span
                      className={`${
                        formik.touched.equipment &&
                        formik.errors.equipment &&
                        "text-red-600"
                      } xl:text-xl md:text-[1rem] font-semibold`}
                    >
                      Equipments:
                    </span>
                    <div className="grid grid-cols-2 gap-2 py-2 ml-6">
                      {borrowEquipments?.map((equipment) => (
                        <div
                          key={equipment?._id}
                          className="flex items-center flex-col"
                        >
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              id={equipment?._id}
                              name="equipment"
                              onChange={(e) =>
                                handleEquipmentChange(
                                  e.target.value,
                                  e.target.checked
                                )
                              }
                              checked={formik.values.equipment.some(
                                (item) =>
                                  item.equipment.toString() ===
                                  equipment._id.toString()
                              )}
                              onBlur={formik.handleBlur}
                              value={equipment?._id}
                              className={`${
                                formik.touched.equipment &&
                                formik.errors.equipment
                                  ? "border-red-600"
                                  : "border-light-default"
                              } block mb-2 xl:text-lg md:text-[1rem] placeholder-white border-0 border-b-2 bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default`}
                            />
                            <span className="ml-2 font-semibold text-light-default dark:text-dark-default">
                              {equipment?.equipment_name}
                            </span>
                          </label>
                          {formik.values.equipment.some(
                            (item) =>
                              item.equipment.toString() ===
                                equipment._id.toString() &&
                              item.borrow_quantity > 0
                          ) && (
                            <div className="mt-2">
                              <label>Borrow Quantity</label>
                              <input
                                type="number"
                                name={`borrow_quantity.${equipment?._id}`}
                                value={
                                  formik.values.equipment.find(
                                    (item) =>
                                      item.equipment.toString() ===
                                      equipment._id.toString()
                                  )?.borrow_quantity || 0
                                }
                                onChange={(e) =>
                                  handleBorrowQuantityChange(
                                    equipment?._id,
                                    parseInt(e.target.value)
                                  )
                                }
                                className="block w-full p-2 text-black border border-gray-300 rounded-md focus:outline-none focus:border-primary-t2"
                              />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </label>

                  <span className="grid items-center justify-center">
                    <button
                      type="submit"
                      disabled={!formik.isValid}
                      className={`${
                        !formik.isValid && "opacity-50 cursor-not-allowed"
                      } xl:px-6 md:px-4 font-medium capitalize rounded-lg xl:text-xl lg:text-base md:text-[1rem] btn btn-primary text-light-default dark:text-dark-default`}
                    >
                      Submit
                    </button>
                  </span>
                </form>
              </div>
            </div>
          </Card>
        </>
      )}
    </>
  );
}
