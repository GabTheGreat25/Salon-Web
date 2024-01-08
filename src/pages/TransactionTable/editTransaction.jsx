import { React } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FadeLoader } from "react-spinners";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetTransactionByIdQuery, useUpdateTransactionMutation } from "@api";
import { editTransactionValidation } from "@/validation";

export default function () {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading } = useGetTransactionByIdQuery(id);
  const [updateTransaction] = useUpdateTransactionMutation();
  const auth = useSelector((state) => state.auth);
  const appointment = data?.details?.appointment;

  let statusDetails = ["pending", "completed"];

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      status: data?.details?.status || "",
      payment: data?.details?.payment || "",
    },
    validationSchema: editTransactionValidation,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("status", values?.status);
      formData.append("payment", values?.payment);
      updateTransaction({ id: data?.details?._id, payload: formData }).then(
        (response) => {
          const toastProps = {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
          };
          if (response?.data?.success === true) {
            const userRoles = auth?.user?.roles;
            if (userRoles.includes("Admin")) {
              navigate("/admin/transactions");
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
            UPDATE Transaction
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
                  value={appointment?.beautician?.name}
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
                  value={appointment?.customer?.name}
                  readOnly
                />
              </div>
              <div>
                <label
                  className="block text-light-default dark:text-dark-default text-sm font-bold mb-2"
                  htmlFor="customer"
                >
                  Appointment Date:
                </label>
                <input
                  type="text"
                  className="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:shadow-outline dark:bg-dark-default dark:text-light-default"
                  value={appointment?.date}
                  readOnly
                />
              </div>
              <div>
                <label
                  className="block text-light-default dark:text-dark-default text-sm font-bold mb-2"
                  htmlFor="customer"
                >
                  Appointment Time:
                </label>
                <input
                  type="text"
                  className="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:shadow-outline dark:bg-dark-default dark:text-light-default"
                  value={appointment?.time}
                  readOnly
                />
              </div>
              <div>
                <label
                  className="block text-light-default dark:text-dark-default text-sm font-bold mb-2"
                  htmlFor="customer"
                >
                  Services Cost:
                </label>
                <input
                  type="text"
                  className="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:shadow-outline dark:bg-dark-default dark:text-light-default"
                  value={appointment?.price}
                  readOnly
                />
              </div>
              <div>
                <label
                  className="block text-light-default dark:text-dark-default text-sm font-bold mb-2"
                  htmlFor="status"
                >
                  Transaction Status:
                </label>
                <select
                  className={`w-full mb-4 px-3 py-2 border ${
                    formik.touched.status && formik.errors.status
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded focus:outline-none focus:shadow-outline dark:bg-dark-default dark:text-light-default`}
                  id="status"
                  name="status"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values?.status || ""}
                >
                  <option value="" label={formik.values?.status} />
                  {statusDetails.map((s, index) => (
                    <option key={index} value={s} label={s} />
                  ))}
                </select>
                {formik.touched.status && formik.errors.status && (
                  <div className="text-red-600">
                    {formik.errors.status || ""}
                  </div>
                )}
              </div>

              <div>
                <label
                  className="block text-light-default dark:text-dark-default text-sm font-bold mb-2"
                  htmlFor="payment"
                >
                  Payment Method:
                </label>
                <input
                  className={`w-full mb-4 px-3 py-2 border ${
                    formik.touched.payment && formik.errors.payment
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded focus:outline-none focus:shadow-outline dark:bg-dark-default dark:text-light-default`}
                  type="text"
                  id="payment"
                  name="payment"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values?.payment}
                />
                {formik.touched?.payment && formik.errors?.payment && (
                  <div className="text-red-600">{formik.errors?.payment}</div>
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
                  UPDATE
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
