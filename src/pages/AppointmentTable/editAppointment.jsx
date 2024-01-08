import React from "react";
import {
  useUpdateAppointmentMutation,
  useGetAppointmentByIdQuery,
  useGetServicesQuery,
} from "@api";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FadeLoader } from "react-spinners";
import { editAppointmentValidation } from "@/validation";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function () {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading } = useGetAppointmentByIdQuery(id);
  const [updateAppointment] = useUpdateAppointmentMutation();
  const auth = useSelector((state) => state.auth);

  const { data: ServiceData } = useGetServicesQuery();
  const services = ServiceData?.details;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      service: data?.details?.service || [],
      date: data?.details?.date || "",
      time: data?.details?.time || "",
      price: data?.details?.price || "",
    },
    validationSchema: editAppointmentValidation,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("date", values?.date);
      formData.append("price", values?.price);
      formData.append("time", values?.time);
      Array.from(values?.service).forEach((service) => {
        formData.append("service", service);
      });
      updateAppointment({ id: data?.details?._id, payload: formData }).then(
        (response) => {
          const toastProps = {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
          };
          if (response?.data?.success === true) {
            const userRoles = auth?.user?.roles;
            if (userRoles.includes("Admin")) {
              navigate("/admin/appointments");
            }
            toast.success(`${response?.data?.message}`, toastProps);
          } else {
            toast.error(`${response?.error?.data?.error?.message}`, toastProps);
          }
        }
      );
    },
  });
  return (
    <div className="min-h-screen flex items-center justify-center mb-12">
      {isLoading ? (
        <div className="loader">
          <FadeLoader color="#FDA7DF" loading={true} size={50} />
        </div>
      ) : (
        <div className="max-w-md w-full p-8 rounded shadow-xl bg-dark-default dark:bg-light-default">
          <h3 className="text-white mb-2 text-center font-semibold text-xl">
            EDIT APPOINTMENT
          </h3>
          <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
            <section className="grid justify-center items-center text-center">
              <div>
                <label
                  className="block text-light-default dark:text-dark-default text-sm font-bold mb-2"
                  htmlFor="beautician"
                >
                  Beautician Name:
                </label>
                <input
                  type="text"
                  className="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:shadow-outline dark:bg-dark-default dark:text-light-default"
                  value={data?.details?.beautician?.name}
                  readOnly
                />
              </div>
              <div>
                <label
                  className="block text-light-default dark:text-dark-default text-sm font-bold mb-2"
                  htmlFor="customer"
                >
                  Customer Name:
                </label>
                <input
                  type="text"
                  className="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:shadow-outline dark:bg-dark-default dark:text-light-default"
                  value={data?.details?.customer?.name}
                  readOnly
                />
              </div>
              <div>
                <label
                  className="block text-light-default dark:text-dark-default text-sm font-bold mb-2"
                  htmlFor="date"
                >
                  Appointment Date:
                </label>
                <input
                  className={`w-full mb-4 px-3 py-2 border ${
                    formik.touched?.date && formik.errors?.date
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded focus:outline-none focus:shadow-outline dark:bg-dark-default dark:text-light-default`}
                  type="text"
                  id="date"
                  name="date"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.date}
                />
                {formik.touched?.date && formik.errors?.date && (
                  <div className="text-red-600">{formik.errors?.date}</div>
                )}
              </div>
              <div>
                <label
                  className="block text-light-default dark:text-dark-default text-sm font-bold mb-2"
                  htmlFor="time"
                >
                  Appointment Time:
                </label>
                <input
                  className={`w-full mb-4 px-3 py-2 border ${
                    formik.touched?.time && formik.errors?.time
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded focus:outline-none focus:shadow-outline dark:bg-dark-default dark:text-light-default`}
                  type="text"
                  id="time"
                  name="time"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.time}
                />
                {formik.touched.time && formik.errors.time && (
                  <div className="text-red-600">{formik.errors.time}</div>
                )}
              </div>
              <div>
                <label
                  className="block text-light-default dark:text-dark-default text-sm font-bold mb-2"
                  htmlFor="note"
                >
                  Appointment Note:
                </label>
                <input
                  className={`w-full mb-4 px-3 py-2 border border-gray-300
                   rounded focus:outline-none focus:shadow-outline dark:bg-dark-default dark:text-light-default`}
                  type="text"
                  name="note"
                  readOnly
                  value={data?.details?.note}
                />
              </div>
              <div>
                <label
                  className="block text-light-default dark:text-dark-default text-sm font-bold mb-2"
                  htmlFor="extraFee"
                >
                  Appointment Fee:
                </label>
                <input
                  className={`w-full mb-4 px-3 py-2 border border-gray-300
                rounded focus:outline-none focus:shadow-outline dark:bg-dark-default dark:text-light-default`}
                  type="text"
                  name="extraFee"
                  readOnly
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={data?.details?.extraFee}
                />
              </div>
              <div>
                <label
                  className="block text-light-default dark:text-dark-default text-sm font-bold mb-2"
                  htmlFor="price"
                >
                  Appointment Price:
                </label>
                <input
                  className={`w-full mb-4 px-3 py-2 border ${
                    formik.touched.price && formik.errors.price
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded focus:outline-none focus:shadow-outline dark:bg-dark-default dark:text-light-default`}
                  type="number"
                  id="price"
                  name="price"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.price}
                  min="1"
                  max="10000"
                />
                {formik.touched.price && formik.errors.price && (
                  <div className="text-red-600">{formik.errors.price}</div>
                )}
              </div>
              <div>
                <label
                  className="block text-light-default dark:text-dark-default text-sm font-bold mb-2"
                  htmlFor="service"
                >
                  Appointment Service:
                </label>
                <select
                  className={`w-full mb-4 px-3 py-2 border ${
                    formik.touched.service && formik.errors.service
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded focus:outline-none focus:shadow-outline dark:bg-dark-default dark:text-light-default`}
                  id="service"
                  name="service"
                  multiple
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.service}
                >
                  <option value="" label="Select a Service" />
                  {services?.map((s) => (
                    <option
                      key={s?._id}
                      value={s?._id}
                      label={s?.service_name}
                    />
                  ))}
                </select>
                {formik.touched.service && formik.errors.service && (
                  <div className="text-red-600">
                    {formik.errors.service || ""}
                  </div>
                )}
              </div>

              <span className="mt-4 grid grid-flow-col gap-x-4">
                <button
                  type="submit"
                  disabled={!formik.isValid}
                  className={`w-full bg-green-500 text-white font-bold py-2 px-4 rounded ${
                    formik.isValid
                      ? "hover:bg-green-700"
                      : "cursor-not-allowed opacity-50"
                  }`}
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded cursor-pointer"
                >
                  Go Back
                </button>
              </span>
            </section>
          </form>
        </div>
      )}
    </div>
  );
}
