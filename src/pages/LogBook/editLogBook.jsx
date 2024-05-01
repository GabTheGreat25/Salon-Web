import React from "react";
import { useFormik } from "formik";
import { useGetLogBookByIdQuery, useUpdateLogBookMutation } from "@api";
import { Card, CardImage } from "@components";
import { FadeLoader } from "react-spinners";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LogBookForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [updateLogBook] = useUpdateLogBookMutation();
  const { data, isLoading } = useGetLogBookByIdQuery(id);
  const logbook = data?.details;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      ...logbook,
    },
    onSubmit: (values) => {
      updateLogBook({ id: logbook?._id, payload: values }).then((response) => {
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
                  Edit LogBook
                </h1>
                <p className="text-xl text-center lg:px-12 text-light-default dark:text-dark-default">
                  Logbook update test
                </p>
              </span>
              <div className="overflow-x-hidden grid grid-cols-[50%_50%] items-center justify-start pt-20 pb-6 gap-x-6 2xl:pr-0 md:pr-10">
                <CardImage />
                <form
                  onSubmit={formik.handleSubmit}
                  className="grid items-end justify-center w-full h-full grid-flow-row-dense pr-12 gap-y-4"
                >
                  <label className="block">
                    <span
                      className={`${
                        formik.touched.user &&
                        formik.errors.user &&
                        "text-red-600"
                      } xl:text-xl md:text-[1rem] font-semibold`}
                    >
                      Beautician Name:
                    </span>
                    <input
                      type="text"
                      id="user"
                      name="user"
                      autoComplete="off"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik?.values?.user?.name || ""}
                      readOnly
                      className={`${
                        formik.touched.user && formik.errors.user
                          ? "border-red-600"
                          : "border-light-default"
                      } block mb-2 ml-6 xl:text-lg md:text-[1rem] placeholder-white border-0 border-b-2 bg-card-input  dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full`}
                      placeholder={logbook?.user?.name}
                    />
                    {formik.touched.user && formik.errors.user && (
                      <div className="text-lg font-semibold text-red-600">
                        {formik.errors.user}
                      </div>
                    )}
                  </label>

                  <label className="block">
                    <span
                      className={`${
                        formik.touched.time_borrowed &&
                        formik.errors.time_borrowed &&
                        "text-red-600"
                      } xl:text-xl md:text-[1rem] font-semibold`}
                    >
                      Time Borrowed:
                    </span>
                    <input
                      type="text"
                      id="time_borrowed"
                      name="time_borrowed"
                      autoComplete="off"
                      readOnly
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik?.values?.time_borrowed || ""}
                      className={`${
                        formik.touched.time_borrowed &&
                        formik.errors.time_borrowed
                          ? "border-red-600"
                          : "border-light-default"
                      } block mb-2 ml-6 xl:text-lg md:text-[1rem] placeholder-white border-0 border-b-2 bg-card-input  dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full`}
                    />
                    {formik.touched.time_borrowed &&
                      formik.errors.time_borrowed && (
                        <div className="text-lg font-semibold text-red-600">
                          {formik.errors.time_borrowed}
                        </div>
                      )}
                  </label>

                  <label className="block">
                    <span
                      className={`${
                        formik.touched.date_borrowed &&
                        formik.errors.date_borrowed &&
                        "text-red-600"
                      } xl:text-xl md:text-[1rem] font-semibold`}
                    >
                      Time Borrowed:
                    </span>
                    <input
                      type="text"
                      id="date_borrowed"
                      name="date_borrowed"
                      autoComplete="off"
                      readOnly
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={
                        new Date(logbook?.date_borrowed)
                          .toISOString()
                          .split("T")[0] || ""
                      }
                      className={`${
                        formik.touched.date_borrowed &&
                        formik.errors.date_borrowed
                          ? "border-red-600"
                          : "border-light-default"
                      } block mb-2 ml-6 xl:text-lg md:text-[1rem] placeholder-white border-0 border-b-2 bg-card-input  dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full`}
                    />
                    {formik.touched.date_borrowed &&
                      formik.errors.date_borrowed && (
                        <div className="text-lg font-semibold text-red-600">
                          {formik.errors.date_borrowed}
                        </div>
                      )}
                  </label>

                  <label className="block">
                    <span
                      className={`${
                        formik.touched.note &&
                        formik.errors.note &&
                        "text-red-600"
                      } xl:text-xl md:text-[1rem] font-semibold`}
                    >
                      Note:
                    </span>
                    <textarea
                      id="note"
                      name="note"
                      autoComplete="off"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.note}
                      rows="5"
                      className={`${
                        formik.touched.note && formik.errors.note
                          ? "border-red-600"
                          : "border-light-default"
                      } block my-2 ml-6 resize-none xl:text-lg md:text-[1rem] placeholder-white border-2 bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full rounded-lg`}
                      placeholder="Enter A Note"
                    />
                    {formik.touched.description &&
                      formik.errors.description && (
                        <div className="text-lg font-semibold text-red-600">
                          {formik.errors.description}
                        </div>
                      )}
                  </label>
                  {formik?.values?.equipment?.map((equipment, index) => (
                    <div key={index} className="mb-4">
                      <label className="block mb-2">
                        Borrowed Equipment
                        <input
                          type="text"
                          value={equipment?.equipment?.equipment_name}
                          className="block text-dark-default w-full mt-1 border rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                        />
                      </label>

                      <label className="block mb-2">
                        Equipment Status:
                        <select
                          name={`equipment[${index}].status`}
                          id={`equipment[${index}].status`}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={equipment.status}
                          className="block text-dark-default w-full mt-1 border rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                        >
                          <option value="">Select Status</option>
                          <option value="Found">Found</option>
                          <option value="Missing">Missing</option>
                          <option value="Damage">Damage</option>
                          <option value="Damage & Missing">
                            Damage & Missing
                          </option>
                        </select>
                      </label>

                      {equipment.status === "Found" && (
                        <label className="block mb-2">
                          Pieces Borrowed:
                          <input
                            type="number"
                            name={`equipment[${index}].borrow_quantity`}
                            id={`equipment[${index}].borrow_quantity`}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={equipment.borrow_quantity}
                            className="block text-dark-default w-full mt-1 border rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                          />
                        </label>
                      )}

                      {equipment.status === "Missing" && (
                        <label className="block mb-2">
                          Missing Quantity:
                          <input
                            type="number"
                            name={`equipment[${index}].missing_quantity`}
                            id={`equipment[${index}].missing_quantity`}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={equipment.missing_quantity}
                            className="block text-dark-default w-full mt-1 border rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                          />
                        </label>
                      )}

                      {equipment.status === "Damage" && (
                        <label className="block mb-2">
                          Damage Quantity:
                          <input
                            type="number"
                            name={`equipment[${index}].damage_quantity`}
                            id={`equipment[${index}].damage_quantity`}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={equipment.damage_quantity}
                            className="block text-dark-default w-full mt-1 border rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                          />
                        </label>
                      )}

                      {equipment.status === "Damage & Missing" && (
                        <div>
                          <label className="block mb-2">
                            Damage Quantity:
                            <input
                              type="number"
                              name={`equipment[${index}].damage_quantity`}
                              id={`equipment[${index}].damage_quantity`}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={equipment.damage_quantity}
                              className="block text-dark-default w-full mt-1 border rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                            />
                          </label>

                          <label className="block mb-2">
                            Missing Quantity:
                            <input
                              type="number"
                              name={`equipment[${index}].missing_quantity`}
                              id={`equipment[${index}].missing_quantity`}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={equipment.missing_quantity}
                              className="block text-dark-default w-full mt-1 border rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                            />
                          </label>
                        </div>
                      )}
                    </div>
                  ))}

                  <label className="block mb-2">
                    Logbook Status:
                    <select
                      name="status"
                      id="status"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik?.values?.status}
                      className="block text-dark-default w-full mt-1 border rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                    >
                      <option value="">Select Status</option>
                      <option value="Borrowed">Borrowed</option>
                      <option value="Returned">Returned</option>
                      <option value="Returned With Missing">Returned With Missing</option>
                      <option value="Returned With Damage">Returned With Damage</option>
                      <option value="Returned Damage & Missing">Returned Missing & Damage</option>
                    </select>
                  </label>

                  <span className="grid items-center justify-center">
                    <button
                      type="submit"
                      disabled={!formik.isValid}
                      className={`xl:px-6 md:px-4 font-medium capitalize rounded-lg xl:text-xl lg:text-base md:text-[1rem]  btn btn-primary text-light-default dark:text-dark-default ${
                        !formik.isValid && "opacity-50 cursor-not-allowed"
                      }`}
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
