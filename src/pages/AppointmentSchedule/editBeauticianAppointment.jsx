import React, { useState } from "react";
import {
  useGetAppointmentByIdQuery,
  useUpdateBeauticianAppointmentMutation,
  useGetUsersQuery,
  useGetSchedulesQuery,
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

  const { data: schedules } = useGetSchedulesQuery();
  const scheduleList = schedules?.details || [];

  const today = new Date().toISOString().split("T")[0];

  const filteredSchedules = scheduleList.filter((schedule) => {
    const scheduleDate = new Date(schedule.date).toISOString().split("T")[0];
    return scheduleDate === today;
  });

  const activeBeauticians = beauticianList?.filter(
    (beautician) =>
      beautician?.roles?.includes("Beautician") && beautician?.active === true
  );

  const filteredActiveBeauticians = activeBeauticians?.filter((beautician) => {
    const serviceTypes = appointment?.service?.flatMap(
      (service) => service?.type
    );

    const jobType = beautician.requirement?.job_type;

    const isMatching = serviceTypes?.includes(jobType);

    const isAbsentOrOnLeave = filteredSchedules?.some((schedule) => {
      return (
        schedule.beautician?._id === beautician._id &&
        (schedule.status === "absent" || schedule.status === "leave")
      );
    });

    return isMatching && !isAbsentOrOnLeave;
  });

  const [submitting, setSubmitting] = useState(false);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      beautician:
        appointment?.beautician
          ?.filter((beautician) =>
            filteredActiveBeauticians.some(
              (activeBeautician) => activeBeautician._id === beautician._id
            )
          )
          ?.map((beautician) => beautician._id) || [],
    },
    onSubmit: async (values) => {
      setSubmitting(true);

      const serviceTypes = appointment?.service?.flatMap(
        (service) => service?.type
      );
      const uniqueServiceTypes = Array.from(new Set(serviceTypes));
      const requiredBeauticianCount = uniqueServiceTypes.length;

      if (values.beautician.length !== requiredBeauticianCount) {
        const requiredBeauticianTypes = uniqueServiceTypes
          .map((type) => `${type}`)
          .join(", ");

        toast.warning(
          `You must select exactly ${requiredBeauticianCount} beautician(s) for the selected appointment. Required job types: ${requiredBeauticianTypes}`,
          {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000,
          }
        );
        setSubmitting(false);
        return;
      }

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
        setSubmitting(false);
      });
    },
  });

  const handleCheckboxChange = (event) => {
    const beauticianId = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      formik.setFieldValue("beautician", [
        ...formik.values.beautician,
        beauticianId,
      ]);
    } else {
      formik.setFieldValue(
        "beautician",
        formik.values.beautician.filter((id) => id !== beauticianId)
      );
    }
  };

  return (
    <>
      {isLoading || userLoading ? (
        <div className="loader">
          <FadeLoader color="#FFB6C1" loading={true} size={50} />
        </div>
      ) : (
        <>
          <Card>
            <div className="grid w-full h-full pb-10 text-light-default dark:text-dark-default">
              <span className="grid items-end justify-center">
                <h1 className="pt-10 font-semibold xl:text-4xl lg:text-3xl md:text-xl">
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
                      <span className="xl:text-xl md:text-[1rem] font-semibold">
                        Customer Name:
                      </span>
                      <input
                        type="text"
                        readOnly
                        value={appointment?.customer?.name}
                        className="block mb-2 ml-6 xl:text-lg md:text-[1rem]  border-0 bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full"
                      />
                    </label>
                    <label className="block">
                      <span className="xl:text-xl md:text-[1rem] font-semibold">
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
                        className="block mb-2 ml-6 xl:text-lg md:text-[1rem]  border-0 bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full"
                      />
                    </label>
                    <label className="block">
                      <span className="xl:text-xl md:text-[1rem] font-semibold">
                        Appointment Time:
                      </span>
                      <input
                        type="text"
                        readOnly
                        value={
                          Array.isArray(appointment?.time) &&
                          appointment.time.length === 1
                            ? appointment.time[0]
                            : `${appointment?.time?.[0]} to ${
                                appointment?.time?.[
                                  appointment?.time?.length - 1
                                ]
                              }`
                        }
                        className="block mb-2 ml-6 xl:text-lg md:text-[1rem] border-0 bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full"
                      />
                    </label>
                    <label className="block">
                      <span className="xl:text-xl md:text-[1rem] font-semibold">
                        Appointment Services:
                      </span>
                      <div className="grid grid-flow-row grid-cols-2 ml-8">
                        {appointment?.service?.map((s) => (
                          <ul className="flex" key={s?._id}>
                            <li className="xl:text-xl md:text-[1rem] p-1 list-disc">
                              {s?.service_name}
                            </li>
                          </ul>
                        ))}
                      </div>
                    </label>

                    <label className="block">
                      <span className="xl:text-xl md:text-[1rem] font-semibold">
                        Appointment Price:
                      </span>
                      <input
                        type="text"
                        readOnly
                        value={`₱${appointment?.price}`}
                        className="block mb-2 ml-6 xl:text-lg md:text-[1rem] border-0 bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full"
                      />
                    </label>

                    <label className="block">
                      <span
                        className={`${
                          formik.touched.beautician &&
                          formik.errors.beautician &&
                          "text-red-600"
                        } xl:text-xl md:text-[1rem] font-semibold`}
                      >
                        Appointment Beautician:
                      </span>
                      <div className="grid py-2 ml-6 xl:grid-cols-2 md:grid-cols-1 gap-y-2 gap-x-4">
                        {filteredActiveBeauticians?.map((b) => (
                          <label key={b?._id} className="flex items-center">
                            <input
                              type="checkbox"
                              name="beautician"
                              id={b?._id}
                              onChange={handleCheckboxChange}
                              onBlur={formik.handleBlur}
                              value={b?._id}
                              checked={formik.values.beautician.includes(
                                b?._id
                              )}
                              className={` ${
                                formik.touched.beautician &&
                                formik.errors.beautician
                                  ? "border-red-600"
                                  : "border-light-default"
                              } block mb-2 xl:text-lg md:text-[1rem] placeholder-white border-0 border-b-2 bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default`}
                            />
                            <span className="ml-2 font-semibold text-light-default dark:text-dark-default">
                              {b?.name} - {b?.requirement?.job_type}
                            </span>
                          </label>
                        ))}
                      </div>
                    </label>
                    {formik.touched.beautician && formik.errors.beautician && (
                      <div className="text-lg font-semibold text-red-600">
                        {formik.errors.beautician}
                      </div>
                    )}

                    <span className="grid items-center justify-center xl:pt-2 md:pt-0">
                      <button
                        type="submit"
                        disabled={!formik.isValid || submitting}
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
            </div>
          </Card>
        </>
      )}
    </>
  );
}
