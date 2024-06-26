import React, { useRef, useEffect } from "react";
import { Card, CardImage } from "@components";
import {
  useUpdateAppointmentMutation,
  useGetAppointmentByIdQuery,
  useGetServicesQuery,
  useGetOptionsQuery,
} from "@api";
import { editAppointmentValidation } from "@validation";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FadeLoader } from "react-spinners";
import { useFormik } from "formik";

export default function () {
  const navigate = useNavigate();
  const isFocused = useRef(true);

  const [updateAppointment] = useUpdateAppointmentMutation();
  const { id } = useParams();
  const { data, isLoading, refetch } = useGetAppointmentByIdQuery(id);
  const appointments = data?.details;
  const {
    data: services,
    isLoading: servicesLoading,
    refetch: refetchServices,
  } = useGetServicesQuery();
  const {
    data: optionsData,
    isLoading: optionsLoading,
    refetch: refetchOptions,
  } = useGetOptionsQuery();
  const options = optionsData?.details;

  useEffect(() => {
    const handleFocus = async () => {
      isFocused.current = true;
      await Promise.all([refetch(), refetchServices(), refetchOptions()]);
    };

    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, [refetch, refetchServices, refetchOptions]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      price: appointments?.price || 0,
      service: appointments?.service?.map((service) => service._id) || [],
      option: appointments?.option?.map((option) => option._id) || [],
    },
    validationSchema: editAppointmentValidation,
    onSubmit: async (values) => {
      updateAppointment({
        id: appointments._id,
        payload: values,
      }).then((response) => {
        const toastProps = {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
        };
        if (response?.data?.success === true) {
          navigate("/admin/appointments");
          toast.success(`${response?.data?.message}`, toastProps);
          refetch();
        } else
          toast.error(`${response?.error?.data?.error?.message}`, toastProps);
      });
    },
  });

  const areOptionsEmpty = (serviceId) => {
    const service = services?.details?.find(
      (service) => service._id === serviceId
    );

    if (!service) return true;

    const serviceOptions = options?.filter((option) =>
      option.service?.some((s) => s._id === serviceId)
    );

    return (
      serviceOptions?.length === 0 ||
      serviceOptions?.every(
        (option) => !formik.values.option?.includes(option._id)
      )
    );
  };

  useEffect(() => {
    const selectedServicesPrices = formik.values.service?.reduce(
      (sum, serviceId) => {
        const selectedService = services?.details?.find(
          (service) => service._id === serviceId
        );
        return sum + (selectedService ? selectedService.price : 0);
      },
      0
    );

    const selectedOptionFees = formik.values.option?.reduce((sum, optionId) => {
      const selectedOption = options?.find((option) => option._id === optionId);
      return sum + (selectedOption ? selectedOption.extraFee : 0);
    }, 0);

    const newTotalPrice = selectedServicesPrices + selectedOptionFees;
    formik.setFieldValue("price", newTotalPrice);
  }, [formik.values.service, formik.values.option]);

  return (
    <>
      {isLoading || servicesLoading || optionsLoading ? (
        <div className="loader">
          <FadeLoader color="#FFB6C1" loading={true} size={50} />
        </div>
      ) : (
        <>
          <Card>
            <div className="grid w-full h-full text-light-default dark:text-dark-default">
              <span className="grid items-end md:gap-y-5 2xl:gap-y-10 justify-center 2xl:grid-rows-[90%_10%] xl:grid-rows-[80%_20%] md:grid-rows-[75%_25%]">
                <h1 className="text-3xl font-semibold text-center">
                  Edit Appointment Details
                </h1>
                <p className="text-xl text-center lg:px-12 text-light-default dark:text-dark-default">
                  Edit {appointments?.customer?.name} Appointment Details
                </p>
              </span>
              <div className="overflow-x-hidden grid grid-cols-[50%_50%] items-start justify-start pt-20 pb-6 gap-x-6 2xl:pr-0 md:pr-10">
                <CardImage />
                <form
                  onSubmit={formik.handleSubmit}
                  className="grid justify-center w-full grid-flow-row-dense pr-12 h-fit gap-y-4"
                >
                  <label className="block">
                    <span
                      className={`${
                        formik.touched.price &&
                        formik.errors.price &&
                        "text-red-600"
                      } xl:text-xl md:text-[1rem] font-semibold`}
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
                      } block mb-2 ml-6 xl:text-lg md:text-[1rem] placeholder-white border-0 border-b-2 bg-card-input  dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full`}
                      placeholder="Enter The Price"
                    />
                    {formik.touched.price && formik.errors.price && (
                      <div className="text-lg font-semibold text-red-600">
                        {formik.errors.price}
                      </div>
                    )}
                  </label>

                  <div className="grid grid-cols-3 gap-2 pt-1 ml-6">
                    {services?.details?.map((service) => (
                      <div key={service._id}>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            id={service._id}
                            name="service"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={service._id}
                            checked={formik.values.service?.includes(
                              service._id
                            )}
                            className={`border-light-default block mb-2 xl:text-lg md:text-[1rem] placeholder-white border-0 border-b-2 bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default`}
                            disabled={!areOptionsEmpty(service?._id)}
                          />
                          <span className="ml-2 font-semibold text-light-default dark:text-dark-default">
                            {service.service_name}
                          </span>
                        </label>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-1 ml-6">
                    {formik.values.service?.map((selectedServiceId) => {
                      const selectedService = services?.details?.find(
                        (service) => service._id === selectedServiceId
                      );

                      if (!selectedService) return null;

                      const serviceOptions = options?.filter((option) =>
                        option.service.some((s) => s._id === selectedServiceId)
                      );

                      return (
                        <div key={selectedService._id}>
                          <h3 className="mb-1 text-lg font-semibold text-light-default dark:text-dark-default">
                            Add Ons for {selectedService.service_name}
                          </h3>
                          {serviceOptions?.map((option) => (
                            <label
                              key={option._id}
                              className="flex items-center"
                            >
                              <input
                                type="checkbox"
                                id={option._id}
                                name="option"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={option._id}
                                checked={formik.values.option?.includes(
                                  option._id
                                )}
                                className={`border-light-default block mb-2 xl:text-lg md:text-[1rem] placeholder-white border-0 border-b-2 bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default`}
                              />
                              <span className="ml-2 font-semibold text-light-default dark:text-dark-default">
                                {option.option_name} - ₱{option.extraFee}
                              </span>
                            </label>
                          ))}
                        </div>
                      );
                    })}
                  </div>

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
