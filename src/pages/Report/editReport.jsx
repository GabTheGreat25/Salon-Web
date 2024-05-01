import React from "react";
import { Card, CardImage } from "@components";
import { useGetReportByIdQuery, useUpdateReportMutation } from "@api";
import { editReportValidation } from "@validation";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FadeLoader } from "react-spinners";
import { useFormik } from "formik";
import { ImagePreview } from "@components";
import Calendar from "react-calendar";

export default function () {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading } = useGetReportByIdQuery(id);
  const report = data?.details;

  const [updateReport] = useUpdateReportMutation();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      equipment: report?.equipment || "",
      date_found: report?.date_found || "",
      status: report?.status || "",
      initial_found: report?.initial_found || 0,
      input_qty: report?.input_qty || 0,
    },
    validationSchema: editReportValidation,
    onSubmit: async (values) => {
      updateReport({ id: report._id, payload: values }).then((response) => {
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
                  Edit Report
                </h1>
                <p className="text-xl text-center lg:px-12 text-light-default dark:text-dark-default">
                  Edit Report Details About Equipment Loss
                </p>
              </span>
              <div className="overflow-x-hidden grid grid-cols-[50%_50%] items-center justify-start pt-20 pb-6 gap-x-6 2xl:pr-0 md:pr-10">
                <CardImage />
                <form
                  onSubmit={formik.handleSubmit}
                  className="grid items-end justify-center w-full h-full grid-flow-row-dense pr-12 gap-y-4"
                >
                  <label className="block">
                    <span className="xl:text-xl md:text-[1rem] font-semibold">
                      Equipment Name:
                    </span>
                    <input
                      type="text"
                      readOnly
                      value={report?.equipment?.equipment_name}
                      className="block mb-2 ml-6 xl:text-lg md:text-[1rem]  border-0 bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full"
                    />
                  </label>
                  <label className="block">
                    <span className="xl:text-xl md:text-[1rem] font-semibold">
                      Date Reported:
                    </span>
                    <input
                      type="text"
                      readOnly
                      value={
                        new Date(report?.date_missing)
                          .toISOString()
                          .split("T")[0]
                      }
                      className="block mb-2 ml-6 xl:text-lg md:text-[1rem]  border-0 bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full"
                    />
                  </label>

                  <label className="block">
                    <span className="xl:text-xl md:text-[1rem] font-semibold">
                      Missing
                    </span>
                    <input
                      type="text"
                      readOnly
                      value={report?.quantity_missing}
                      className="block mb-2 ml-6 xl:text-lg md:text-[1rem]  border-0 bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full"
                    />
                  </label>

                  <label className="block">
                    <span
                      className={`${
                        formik.touched.date_found && formik.errors.date_found
                          ? "text-red-600"
                          : "xl:text-xl md:text-[1rem] font-semibold"
                      }`}
                    >
                      Date Found:
                    </span>
                    <Calendar
                      onChange={(date) => {
                        formik.setFieldValue("date_found", date);
                      }}
                      value={formik?.values?.date_found}
                      className={`${
                        formik.touched.date_found && formik.errors.date_found
                          ? "border-red-600"
                          : "border-light-default"
                      } block my-2 xl:text-lg md:text-[1rem] bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-fit`}
                      tileClassName={() => "bg-primary-default !important"}
                    />
                    {formik.touched.date_found && formik.errors.date_found && (
                      <div className="text-lg font-semibold text-red-600">
                        {formik.errors.date_found}
                      </div>
                    )}
                  </label>

                  <label className="block">
                    <span className="xl:text-xl md:text-[1rem] font-semibold">
                      Found Equipment:
                    </span>
                    <input
                      value={
                        report?.initial_found ? report?.initial_found : "None"
                      }
                      className="block mb-2 ml-6 xl:text-lg md:text-[1rem]  border-0 bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full"
                    />
                  </label>

                  <label className="block">
                    Report Status:
                    <select
                      name="status"
                      id="status"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik?.values?.status}
                      className="block text-dark-default w-full mt-1 border rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                    >
                      <option value="">Select Report Status</option>
                      <option value="Damage">Damage</option>
                      <option value="Found">Found</option>
                      <option value="Partially Found">Partially Found</option>
                      <option value="Missing & Damage">Missing & Damage</option>
                      <option value="Found Damage">Found Damage</option>
                    </select>
                  </label>

                  <label className="block">
                    <span
                      className={`${
                        formik.touched.input_qty &&
                        formik.errors.input_qty &&
                        "text-red-600"
                      } xl:text-xl md:text-[1rem] font-semibold`}
                    >
                      Found:
                    </span>
                    <input
                      type="number"
                      id="input_qty"
                      name="input_qty"
                      autoComplete="off"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.input_qty}
                      className={`${
                        formik.touched.input_qty && formik.errors.input_qty
                          ? "border-red-600"
                          : "border-light-default"
                      } block mb-2 ml-6 xl:text-lg md:text-[1rem] placeholder-white border-0 border-b-2 bg-card-input  dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full`}
                      placeholder="Enter No. of Equipments Loss"
                    />
                    {formik.touched.input_qty && formik.errors.input_qty && (
                      <div className="text-lg font-semibold text-red-600">
                        {formik.errors.input_qty}
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
