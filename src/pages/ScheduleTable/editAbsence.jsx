import React from "react";
import { Card, CardImage } from "@components";
import { useUpdateAbsentMutation, useGetScheduleByIdQuery } from "@api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FadeLoader } from "react-spinners";
import { useFormik } from "formik";

export default function () {
  const navigate = useNavigate();

  const [updateAbsent] = useUpdateAbsentMutation();
  const { id } = useParams();
  const { data, isLoading } = useGetScheduleByIdQuery(id);
  const schedule = data?.details;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      beautician: schedule?.beautician || "",
      date: schedule?.date || "",
      status: schedule?.status === "leave" ? "" : schedule?.status || "",
      isLeave: schedule?.status === "leave",
      leaveNote: schedule?.status === "leave" ? schedule?.leaveNote || "" : "",
      leaveNoteConfirmed: schedule?.status === "leave",
    },
    onSubmit: async (values) => {
      updateAbsent({ id: schedule._id, payload: values }).then((response) => {
        const toastProps = {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
        };
        if (response?.data?.success === true) {
          navigate("/admin/schedules");
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
            <div className="grid w-full h-full text-light-default dark:text-dark-default">
              <span className="grid items-end md:gap-y-10 justify-center 2xl:grid-rows-[90%_10%] xl:grid-rows-[80%_20%] md:grid-rows-[75%_25%]">
                <h1 className="text-3xl font-semibold text-center">
                  Edit Absence
                </h1>
                <p className="text-xl text-center lg:px-12 text-light-default dark:text-dark-default">
                  Edit & Update {schedule?.beautician?.name} Absence
                </p>
              </span>
              <div className="overflow-x-hidden grid grid-cols-[50%_50%] items-center justify-start pt-20 pb-6 gap-x-6 2xl:pr-0 md:pr-10">
                <CardImage />
                <form
                  onSubmit={formik.handleSubmit}
                  className="grid items-end justify-center w-full grid-flow-row-dense pr-12 2xl:h-3/4 xl:h-full gap-y-4"
                >
                  <label className="block">
                    <span className="xl:text-xl lg:text-[1rem] md:text-xs font-semibold">
                      Absence Date:
                    </span>
                    <input
                      type="text"
                      readOnly
                      value={
                        schedule?.date
                          ? new Date(schedule.date).toISOString().split("T")[0]
                          : ""
                      }
                      className="block mb-2 ml-6 xl:text-lg lg:text-[1rem]  border-0 bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full"
                    />
                  </label>
                  <label className="block">
                    <span
                      className={`${
                        formik.touched.status &&
                        formik.errors.status &&
                        "text-red-600"
                      } xl:text-xl lg:text-[1rem] md:text-xs font-semibold`}
                    >
                      status:
                    </span>
                    <select
                      id="status"
                      name="status"
                      onChange={(e) => {
                        formik.handleChange(e);
                        console.log("Status changed to:", e.target.value);
                        if (e.target.value === "leave") {
                          formik.setValues({
                            ...formik.values,
                            isLeave: true,
                            leaveNoteConfirmed: true,
                          });
                        } else {
                          formik.setValues({
                            ...formik.values,
                            isLeave: false,
                            leaveNote: "",
                            leaveNoteConfirmed: false,
                          });
                        }
                      }}
                      onBlur={formik.handleBlur}
                      value={formik.values.status}
                      className={`${
                        formik.touched.status && formik.errors.status
                          ? "border-red-600"
                          : "border-light-default"
                      } block mb-2 ml-6 xl:text-lg lg:text-[1rem] placeholder-white border-0 border-b-2 bg-card-input dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default w-full text-light-default dark:text-dark-default`}
                    >
                      <option value="" disabled>
                        Update Status
                      </option>
                      <option
                        value="leave"
                        className="font-semibold text-dark-default dark:text-dark-default"
                      >
                        Leave
                      </option>
                      <option
                        value="absent"
                        className="font-semibold text-dark-default dark:text-dark-default"
                      >
                        Absent
                      </option>
                    </select>

                    {formik.touched.status && formik.errors.status && (
                      <div className="text-lg font-semibold text-red-600">
                        {formik.errors.status}
                      </div>
                    )}
                  </label>

                  <label className="block">
                    <span
                      className={`${
                        formik.touched.leaveNote &&
                        formik.errors.leaveNote &&
                        "text-red-600"
                      } font-semibold xl:text-xl lg:text-[.8rem] md:text-[.55rem]`}
                    >
                      <p>Beautician's Leave Note</p>
                    </span>
                    <textarea
                      id="leaveNote"
                      name="leaveNote"
                      autoComplete="off"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.leaveNote}
                      placeholder="Beautician's Leave Note"
                      className="resize-none block my-4 xl:text-xl lg:text-[1rem] md:text-sm placeholder-white border-2 bg-card-input w-full border-light-default dark:border-dark-default focus:ring-0 focus:border-secondary-t2 focus:dark:focus:border-secondary-t2 dark:placeholder-dark-default rounded-lg"
                      rows="8"
                    ></textarea>
                    {formik.touched.leaveNote && formik.errors.leaveNote && (
                      <div className="text-lg font-semibold text-red-600">
                        {formik.errors.leaveNote}
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