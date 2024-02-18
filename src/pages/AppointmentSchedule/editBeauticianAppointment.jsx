import { React } from "react";
import {
  useGetAppointmentByIdQuery,
  useUpdateBeauticianAppointmentMutation,
  useGetUsersQuery,
} from "@api";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { FadeLoader } from "react-spinners";
import { Card, CardImage } from "@components";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function () {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading } = useGetAppointmentByIdQuery(id);
  const appointment = data?.details;
  const [updateBeauticianAppointment] =
    useUpdateBeauticianAppointmentMutation();
  const { data: user, isLoading: userLoading } = useGetUsersQuery();
  const beauticianList = user?.details || [];

  const activeBeauticians = beauticianList.filter(
    (beautician) =>
      beautician?.roles?.includes("Beautician") && beautician?.active === true
  );

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      beautician: appointment?.beautician || "",
    },
    onSubmit: async (values) => {
      updateBeauticianAppointment({
        id: appointment._id,
        payload: values,
      }).then((response) => {
        const toastProps = {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
        };
        if (response?.data?.success === true) {
          navigate("/admin/appointment/Schedules");
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
          <FadeLoader color="#FDA7DF" loading={true} size={50} />
        </div>
      ) : (
        <>
          <Card>
            <div className="grid w-full h-full pb-10 text-light-default dark:text-dark-default">
              <span className="grid items-end justify-center">
                <h1 className="pt-10 font-semibold lg:text-5xl md:text-4xl">
                  Change Appointment Beautician
                </h1>
              </span>
              <div className="grid grid-cols-[40%_60%] items-start justify-start pt-6 gap-x-6">
                <span className="grid items-end justify-end h-[90%] mt-20">
                  <CardImage />
                </span>
                <div className="grid grid-flow-row-dense pr-10 gap-y-4">
                  <form
                    onSubmit={formik.handleSubmit}
                    className="grid justify-center w-full grid-flow-row-dense pr-12 h-fit gap-y-4"
                  >
                    <label className="block">
                      <span className="xl:text-xl lg:text-[1rem] md:text-xs font-semibold">
                        Customer Name:
                      </span>
                      <input
                        type="text"
                        readOnly
                        value={appointment?.customer?.name}
                        className="block mb-2 ml-6 xl:text-lg lg:text-[1rem]  border-0 bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full"
                      />
                    </label>
                    <label className="block">
                      <span className="xl:text-xl lg:text-[1rem] md:text-xs font-semibold">
                        Appointment Date:
                      </span>
                      <input
                        type="text"
                        readOnly
                        value={
                          new Date(appointment?.date)
                            .toISOString()
                            .split("T")[0]
                        }
                        className="block mb-2 ml-6 xl:text-lg lg:text-[1rem]  border-0 bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full"
                      />
                    </label>
                    <label className="block">
                      <span className="xl:text-xl lg:text-[1rem] md:text-xs font-semibold">
                        Appointment Time:
                      </span>
                      <input
                        type="text"
                        readOnly
                        value={appointment?.time}
                        className="block mb-2 ml-6 xl:text-lg lg:text-[1rem]  border-0 bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full"
                      />
                    </label>
                    <label className="block">
                      <span className="xl:text-xl lg:text-[1rem] md:text-xs font-semibold">
                        Appointment Services:
                      </span>
                      <div className="grid grid-flow-row grid-cols-2">
                        {appointment?.service?.map((s) => (
                          <ul className="flex" key={s?._id}>
                            <li className="list-disc p-1">{s?.service_name}</li>
                          </ul>
                        ))}
                      </div>
                    </label>

                    <label className="block">
                      <span className="xl:text-xl lg:text-[1rem] md:text-xs font-semibold">
                        Appointment Price:
                      </span>
                      <input
                        type="text"
                        readOnly
                        value={appointment?.price}
                        className="block mb-2 ml-6 xl:text-lg lg:text-[1rem]  border-0 bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full"
                      />
                    </label>
                    <label className="block">
                      <span
                        className={`${
                          formik.touched.beautician &&
                          formik.errors.beautician &&
                          "text-red-600"
                        } xl:text-xl lg:text-[1rem] md:text-xs font-semibold`}
                      >
                        Appointment Beautician:
                      </span>
                      <select
                        id="beautician"
                        name="beautician"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.beautician}
                        multiple
                        className={` ${
                          formik.touched.beautician && formik.errors.beautician
                            ? "border-red-600"
                            : "border-light-default"
                        } block mb-2 ml-6 xl:text-lg lg:text-[1rem] placeholder-white border-0 border-b-2 bg-card-input  dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full`}
                      >
                        <option value="" disabled>
                          Select a Beautician
                        </option>
                        {activeBeauticians.map((b) => (
                          <option
                            key={b?._id}
                            value={b?._id}
                            className="font-semibold text-dark-default dark:text-dark-default"
                          >
                            {b?.name}
                          </option>
                        ))}
                      </select>
                      {formik.touched.beautician &&
                        formik.errors.beautician && (
                          <div className="text-lg font-semibold text-red-600">
                            {formik.errors.beautician}
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
            </div>
          </Card>
        </>
      )}
    </>
  );
}
