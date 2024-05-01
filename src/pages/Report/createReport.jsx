import React from "react";
import { Card, CardImage } from "@components";
import { useAddReportMutation, useGetEquipmentsQuery } from "@api";
import { createReportValidation } from "@validation";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FadeLoader } from "react-spinners";
import { useFormik } from "formik";
import { ImagePreview } from "@components";
import Calendar from "react-calendar";

export default function () {
  const navigate = useNavigate();

  const [addReport, isLoading] = useAddReportMutation();
  const { data, isLoading: equipmentLoading } = useGetEquipmentsQuery();
  const equipments = data?.details;

  const formik = useFormik({
    initialValues: {
      equipment: "",
      date_reported: "",
      status:"Missing",
      loss_qty: 0,
    },
    validationSchema: createReportValidation,
    onSubmit: async (values) => {
      addReport(values).then((response) => {
        const toastProps = {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
        };
        if (response?.data?.success === true) {
          navigate("/admin/reports");
          toast.success(`${response?.data?.message}`, toastProps);
        } else
          toast.error(`${response?.error?.data?.error?.message}`, toastProps);
      });
    },
  });

  return (
    <>
      {!isLoading || equipmentLoading ? (
        <div className="loader">
          <FadeLoader color="#FFB6C1" loading={true} size={50} />
        </div>
      ) : (
        <>
          <Card>
            <div className="grid w-full h-full text-light-default dark:text-dark-default">
              <span className="grid items-end md:gap-y-5 2xl:gap-y-10 justify-center 2xl:grid-rows-[90%_10%] xl:grid-rows-[80%_20%] md:grid-rows-[75%_25%]">
                <h1 className="text-3xl font-semibold text-center">
                  Create Report
                </h1>
                <p className="text-xl text-center lg:px-12 text-light-default dark:text-dark-default">
                  Submit A Report About Equipment Loss
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
                        formik.touched.equipment &&
                        formik.errors.equipment &&
                        "text-red-600"
                      } xl:text-xl md:text-[1rem] font-semibold`}
                    >
                      Equipment Name:
                    </span>
                    <select
                      id="equipment"
                      name="equipment"
                      onChange={(e) => {
                        formik.handleChange(e);
                        const selectedEquipment = equipments.find(
                          (e) => e?._id === e.target.value
                        );
                        formik.setFieldValue(
                          "equipment",
                          selectedEquipment?.id || ""
                        );
                      }}
                      onBlur={formik.handleBlur}
                      value={formik.values.equipment || ""}
                      className={`${
                        formik.touched.equipment && formik.errors.equipment
                          ? "border-red-600"
                          : "border-light-default"
                      } block mb-2 ml-6 xl:text-lg md:text-[1rem] placeholder-white border-0 border-b-2 bg-card-input  dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full text-black`}
                    >
                      <option value="">Select Equipment</option>
                      {equipments?.map((e) => (
                        <option key={e?._id} value={e?._id}>
                          {e?.equipment_name}
                        </option>
                      ))}
                    </select>
                    {formik.touched.equipment && formik.errors.equipment && (
                      <div className="text-lg font-semibold text-red-600">
                        {formik.errors.equipment}
                      </div>
                    )}
                  </label>

                  <label className="block">
                    <span
                      className={`${
                        formik.touched.date_reported &&
                        formik.errors.date_reported
                          ? "text-red-600"
                          : "xl:text-xl md:text-[1rem] font-semibold"
                      }`}
                    >
                      Date Reported:
                    </span>
                    <Calendar
                      onChange={(date) => {
                        formik.setFieldValue("date_reported", date);
                      }}
                      value={formik.values.date_reported}
                      className={`${
                        formik.touched.date_reported &&
                        formik.errors.date_reported
                          ? "border-red-600"
                          : "border-light-default"
                      } block my-2 xl:text-lg md:text-[1rem] bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-fit`}
                      tileClassName={() => "bg-primary-default !important"}
                    />
                    {formik.touched.date_reported &&
                      formik.errors.date_reported && (
                        <div className="text-lg font-semibold text-red-600">
                          {formik.errors.date_reported}
                        </div>
                      )}
                  </label>

                  <label className="block">
                    <span
                      className={`${
                        formik.touched.loss_qty &&
                        formik.errors.loss_qty &&
                        "text-red-600"
                      } xl:text-xl md:text-[1rem] font-semibold`}
                    >
                      Quantity Loss:
                    </span>
                    <input
                      type="number"
                      id="loss_qty"
                      name="loss_qty"
                      autoComplete="off"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.loss_qty}
                      className={`${
                        formik.touched.loss_qty && formik.errors.loss_qty
                          ? "border-red-600"
                          : "border-light-default"
                      } block mb-2 ml-6 xl:text-lg md:text-[1rem] placeholder-white border-0 border-b-2 bg-card-input  dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full`}
                      placeholder="Enter No. of Equipments Loss"
                    />
                    {formik.touched.loss_qty && formik.errors.loss_qty && (
                      <div className="text-lg font-semibold text-red-600">
                        {formik.errors.loss_qty}
                      </div>
                    )}
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
