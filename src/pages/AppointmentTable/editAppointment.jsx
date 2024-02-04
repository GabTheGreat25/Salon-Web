import React from "react";
import { Card, CardImage } from "@components";
import {
  useUpdateAppointmentMutation,
  useGetAppointmentByIdQuery,
  useGetServicesQuery,
} from "@api";
import { editAppointmentValidation } from "@validation";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FadeLoader } from "react-spinners";
import { useFormik } from "formik";

export default function () {
  const navigate = useNavigate();

  const [updateAppointment] = useUpdateAppointmentMutation();
  const { id } = useParams();
  const { data, isLoading } = useGetAppointmentByIdQuery(id);
  const appointments = data?.details;
  const { data: services, isLoading: servicesLoading } = useGetServicesQuery();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      extraFee: appointments?.extraFee || 0,
      price: appointments?.price || 0,
      service: appointments?.service?.map((service) => service._id) || [],
    },
    validationSchema: editAppointmentValidation,
    onSubmit: async (values) => {
      const selectedServicesPrices = values.service.map((serviceId) => {
        const selectedService = services?.details.find(
          (service) => service._id === serviceId
        );
        return selectedService ? selectedService.price : 0;
      });
      const newTotalPrice =
        selectedServicesPrices.reduce((sum, price) => sum + price, 0) +
        values.extraFee;

      updateAppointment({
        id: appointments._id,
        payload: { ...values, price: newTotalPrice },
      }).then((response) => {
        const toastProps = {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
        };
        if (response?.data?.success === true) {
          navigate("/admin/appointments");
          toast.success(`${response?.data?.message}`, toastProps);
        } else
          toast.error(`${response?.error?.data?.error?.message}`, toastProps);
      });
    },
  });

  const handleServiceChange = (e) => {
    const selectedServices = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    formik.setFieldValue("service", selectedServices);

    const selectedServicesPrices = selectedServices.map((serviceId) => {
      const selectedService = services?.details.find(
        (service) => service._id === serviceId
      );
      return selectedService ? selectedService.price : 0;
    });
    const newTotalPrice =
      selectedServicesPrices.reduce((sum, price) => sum + price, 0) +
      formik.values.extraFee;

    formik.setFieldValue("price", newTotalPrice);
  };

  return (
    <>
      {isLoading || servicesLoading ? (
        <div className="loader">
          <FadeLoader color="#FDA7DF" loading={true} size={50} />
        </div>
      ) : (
        <>
          <Card>
            <div className="grid w-full h-full text-light-default dark:text-dark-default">
              <span className="grid items-end md:gap-y-10 justify-center 2xl:grid-rows-[90%_10%] xl:grid-rows-[80%_20%] md:grid-rows-[75%_25%]">
                <h1 className="text-3xl font-semibold text-center">
                  Edit Appointment
                </h1>
                <p className="text-xl text-center lg:px-12 text-light-default dark:text-dark-default">
                  Edit & Update {appointments?.customer?.name} Appointment Details
                </p>
              </span>
              <div className="overflow-x-hidden grid grid-cols-[50%_50%] items-center justify-start pt-20 pb-6 gap-x-6 2xl:pr-0 md:pr-10">
                <CardImage />
                <form
                  onSubmit={formik.handleSubmit}
                  className="grid justify-center w-full grid-flow-row-dense pr-12 2xl:h-[55%] md:h-3/4 gap-y-4"
                >
                  <label className="block">
                    <span
                      className={`${
                        formik.touched.price &&
                        formik.errors.price &&
                        "text-red-600"
                      } xl:text-xl lg:text-[1rem] md:text-xs font-semibold`}
                    >
                      Price:
                    </span>
                    <input
                      type="number"
                      min="1"
                      max="100000"
                      id="price"
                      name="price"
                      autoComplete="off"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.price}
                      disabled
                      className={`${
                        formik.touched.price && formik.errors.price
                          ? "border-red-600"
                          : "border-light-default"
                      } block mb-2 ml-6 xl:text-lg lg:text-[1rem] placeholder-white border-0 border-b-2 bg-card-input  dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full`}
                      placeholder="Enter The Price"
                    />
                    {formik.touched.price && formik.errors.price && (
                      <div className="text-lg font-semibold text-red-600">
                        {formik.errors.price}
                      </div>
                    )}
                  </label>
                  <label className="block">
                    <span
                      className={`${
                        formik.touched.extraFee &&
                        formik.errors.extraFee &&
                        "text-red-600"
                      } xl:text-xl lg:text-[1rem] md:text-xs font-semibold`}
                    >
                      Extra Fee:
                    </span>
                    <input
                      type="number"
                      min="0"
                      max="10000"
                      id="extraFee"
                      name="extraFee"
                      autoComplete="off"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.extraFee}
                      className={`${
                        formik.touched.extraFee && formik.errors.extraFee
                          ? "border-red-600"
                          : "border-light-default"
                      } block mb-2 ml-6 xl:text-lg lg:text-[1rem] placeholder-white border-0 border-b-2 bg-card-input  dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full`}
                      placeholder="Enter The Price"
                    />
                    {formik.touched.extraFee && formik.errors.extraFee && (
                      <div className="text-lg font-semibold text-red-600">
                        {formik.errors.extraFee}
                      </div>
                    )}
                  </label>
                  <label className="block">
                    <span
                      className={`${
                        formik.touched.service &&
                        formik.errors.service &&
                        "text-red-600"
                      } xl:text-xl lg:text-[1rem] md:text-xs font-semibold`}
                    >
                      Services:
                    </span>
                    <select
                      id="service"
                      name="service"
                      onChange={handleServiceChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.service}
                      className={` ${
                        formik.touched.service && formik.errors.service
                          ? "border-red-600"
                          : "border-light-default"
                      } block mb-2 ml-6 xl:text-lg lg:text-[1rem] placeholder-white border-0 border-b-2 bg-card-input  dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full`}
                      multiple
                    >
                      {services?.details?.map((service) => (
                        <option
                          key={service?._id}
                          value={service?._id}
                          className="font-semibold text-light-default dark:text-dark-default "
                        >
                          {service?.service_name}
                        </option>
                      ))}
                    </select>
                    {formik.touched.service && formik.errors.service && (
                      <div className="text-lg font-semibold text-red-600">
                        {formik.errors.service}
                      </div>
                    )}
                  </label>
                  <span className="grid items-center justify-center">
                    <button
                      type="submit"
                      disabled={!formik.isValid}
                      className={`xl:px-6 md:px-4 font-medium capitalize rounded-lg xl:text-xl lg:text-[1rem] md:text-xs lg:text-base md:text-[.75rem] btn btn-primary text-light-default dark:text-dark-default ${
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
