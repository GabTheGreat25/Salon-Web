import React from "react";
import { useGetAppointmentsQuery, useDeleteAppointmentMutation } from "@api";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FadeLoader } from "react-spinners";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function () {
  const { data, isLoading, isError } = useGetAppointmentsQuery();
  const appointments = data?.details;
  const [deleteAppointment, { isLoading: isDeleting }] =
    useDeleteAppointmentMutation();

  const navigate = useNavigate();

  const handleDelete = async (id) => {
    if (
      window.confirm("Are you sure you want to delete this Appointment Record?")
    ) {
      const response = await deleteAppointment(id);
      const toastProps = {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      };
      if (response?.data?.success === true) {
        toast.success(`${response?.data?.message}`, toastProps);
      } else {
        toast.error(`${response?.error?.data?.error?.message}`, toastProps);
      }
    }
  };

  return (
    <>
      <div className="container mx-auto p-8">
        {isLoading || isDeleting ? (
          <div className="loader mt-8">
            <FadeLoader color="#FDA7DF" loading={true} size={50} />
          </div>
        ) : isError ? (
          <p className="text-center text-red-500">Error: {isError.message}</p>
        ) : (
          <table className="min-w-full bg-white border rounded-lg border-gray-300">
            <thead>
              <tr className="dark:bg-dark-default dark:text-light-default">
                <th className="py-2 px-4 border-b text-left">
                  Appointment Date
                </th>
                <th className="py-2 px-4 border-b text-left">
                  Appointment Time
                </th>
                <th className="py-2 px-4 border-b text-left">
                  Service Beautician
                </th>
                <th className="py-2 px-4 border-b text-left">Customer</th>
                <th className="py-2 px-4 border-b text-left">
                  Appointment Services
                </th>
                <th className="py-2 px-4 border-b text-left">Note</th>
                <th className="py-2 px-4 border-b text-left">Extra Fee</th>
                <th className="py-2 px-4 border-b text-left">Price</th>
                <th className="py-2 px-4 border-b text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((a) => (
                <tr key={a._id} className="dark:bg-dark-default dark:text-light-default">
                  <td className="py-2 px-4 border-b text-left text-sm">
                    {a.date}
                  </td>
                  <td className="py-2 px-4 border-b text-left text-sm">
                    {a.time}
                  </td>
                  <td className="py-2 px-4 border-b text-left text-sm">
                    {a.beautician.name}
                  </td>
                  <td className="py-2 px-4 border-b text-left text-sm">
                    {a.customer.name}
                  </td>
                  <td className="py-2 px-4 border-b text-left">
                    {a.service.map((s) => (
                      <ul className="list-disc p-1 font-semibold">
                        <li> {s.service_name}</li>
                      </ul>
                    ))}
                  </td>
                  <td className="py-2 px-4 border-b text-left text-sm">
                    {a.note ? a.note : "No notes"}
                  </td>
                  <td className="py-2 px-4 border-b text-left text-sm">
                    {a.extraFee}
                  </td>
                  <td className="py-2 px-4 border-b text-left text-sm">
                    {a.price}
                  </td>
                  <td className="py-2 px-4 border-b text-left">
                    <div className="flex items-center space-x-4">
                      <FaEdit
                        className="text-blue-500 hover:cursor-pointer hover:scale-110"
                        onClick={() =>
                          navigate(`/admin/appointment/edit/${a._id}`)
                        }
                      />
                      <FaTrash
                        className="text-red-500 hover:cursor-pointer hover:scale-110"
                        onClick={() => handleDelete(a._id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
