import { React } from "react";
import { useGetTransactionsQuery, useDeleteTransactionMutation } from "@api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FadeLoader } from "react-spinners";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function () {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetTransactionsQuery();
  const [deleteTransaction, { isLoading: isDeleting }] =
    useDeleteTransactionMutation();
  const transactions = data?.details;

  const handleDelete = async (id) => {
    if (
      window.confirm("Are you sure you want to delete this Transaction Record?")
    ) {
      const response = await deleteTransaction(id);
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
          <p className="text-center text-red-500">
            Data Not Found: {isError.message}
          </p>
        ) : (
          <table className="min-w-full bg-white border border-gray-300 rounded-xl">
            <thead>
              <tr className="dark:bg-dark-default dark:text-light-default">
                <th className="py-2 px-4 border-b text-left">Beautician</th>
                <th className="py-2 px-4 border-b text-left">Customer</th>
                <th className="py-2 px-4 border-b text-left">
                  Appointment Date
                </th>
                <th className="py-2 px-4 border-b text-left">
                  Appointment Time
                </th>
                <th className="py-2 px-4 border-b text-left">
                  Appointment Price
                </th>
                <th className="py-2 px-4 border-b text-left">
                  Transaction Status
                </th>
                <th className="py-2 px-4 border-b text-left">Payment Method</th>
                <th className="py-2 px-4 border-b text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr
                  key={t._id}
                  className="dark:bg-dark-default dark:text-light-default"
                >
                  <td className="py-2 px-4 border-b text-left text-sm">
                    {t?.appointment?.beautician?.name ||
                      "No Beauticians Record"}
                  </td>
                  <td className="py-2 px-4 border-b text-left text-sm">
                    {t?.appointment?.customer?.name || "No Customer Record"}
                  </td>
                  <td className="py-2 px-4 border-b text-left text-sm">
                    {t.appointment?.date || "No Appointments"}
                  </td>
                  <td className="py-2 px-4 border-b text-left text-sm">
                    {t.appointment?.time || "No Appointments"}
                  </td>
                  <td className="py-2 px-4 border-b text-left text-sm">
                    {t.appointment?.price || "No Appointments"}
                  </td>
                  <td className="py-2 px-4 border-b text-left text-sm">
                    {t?.status}
                  </td>
                  <td className="py-2 px-4 border-b text-left text-sm">
                    {t?.payment}
                  </td>

                  <td className="py-2 px-4 border-b text-left text-sm">
                    <div className="flex items-center space-x-4">
                      <FaEdit
                        className="text-blue-500 cursor-pointer transform hover:scale-110"
                        onClick={() =>
                          navigate(`/admin/transaction/edit/${t._id}`)
                        }
                      />
                      <FaTrash
                        className="text-red-500 cursor-pointer transform hover:scale-110"
                        onClick={() => handleDelete(t._id)}
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
