import React from "react";
import { useGetTransactionsQuery, useDeleteTransactionMutation } from "@api";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FadeLoader } from "react-spinners";
import DataTable from "react-data-table-component";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addDeletedItemId, getDeletedItemIds } from "../.././utils/DeleteItem";
import { tableCustomStyles } from "../../utils/tableCustomStyles";
import { useNavigate } from "react-router-dom";

export default function () {
  const navigate = useNavigate();
  const { data, isLoading } = useGetTransactionsQuery();
  const transactions = data?.details;

  const [deleteTransaction, { isLoading: isDeleting }] =
    useDeleteTransactionMutation();

  const deletedTransactionIds = getDeletedItemIds("transaction");

  const filteredTransaction = transactions?.filter(
    (transaction) => !deletedTransactionIds?.includes(transaction?._id)
  );

  console.log("transactions", filteredTransaction);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this Transaction?")) {
      const response = await deleteTransaction(id);

      const toastProps = {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      };
      if (response?.data?.success === true) {
        toast.success(`${response?.data?.message}`, toastProps);
        addDeletedItemId("transaction", id);
      } else
        toast.error(`${response?.error?.data?.error?.message}`, toastProps);
    }
  };

  const columns = [
    {
      name: "ID",
      selector: (row) => row._id,
      sortable: true,
    },
    {
      name: "Payment Method",
      selector: (row) => row.payment,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Customer",
      selector: (row) => row?.appointment?.customer?.name,
      sortable: true,
    },
    {
      name: "Appointment Day",
      selector: (row) => {
        const datePart = row?.appointment?.date
          ? new Date(row.appointment.date).toISOString().split("T")[0]
          : "";
        const timePart = row?.appointment?.time || "";
        const firstTime = timePart?.length > 0 ? timePart[0] : "";
        const lastTime =
          timePart?.length > 0 ? timePart[timePart?.length - 1] : "";
        return `${datePart} ${firstTime} - ${lastTime}`;
      },
      sortable: true,
    },
    {
      name: "PWD / Senior ID Image",
      cell: (row) => {
        const randomImage =
          row.image?.length > 0
            ? row.image[Math.floor(Math.random() * row.image?.length)]
            : null;

        return (
          <div className="grid items-center justify-center">
            {randomImage && (
              <img
                className="object-center w-10 h-10 rounded-full"
                src={randomImage.url}
                alt={randomImage.originalname}
              />
            )}
          </div>
        );
      },
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="grid grid-flow-col-dense text-center gap-x-4">
          <FaEdit
            className="text-xl text-blue-500"
            onClick={() => navigate(`/admin/transaction/edit/${row._id}`)}
          />
          <FaTrash
            className="text-xl text-red-500"
            onClick={() => handleDelete(row._id)}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      {isLoading || isDeleting ? (
        <div className="mt-8 loader">
          <FadeLoader color="#FDA7DF" loading={true} size={50} />
        </div>
      ) : (
        <div className="min-h-screen m-12 rounded-lg">
          <button
            className="px-4 py-2 mb-6 border rounded border-dark-default dark:border-light-default text-dark-default dark:text-light-default hover:bg-primary-default"
            onClick={() => {
              navigate(`/admin/transaction/create`);
            }}
          >
            Create Transaction
          </button>
          <DataTable
            title="Transactions Table"
            columns={columns}
            data={filteredTransaction}
            pagination
            highlightOnHover
            pointerOnHover
            paginationPerPage={15}
            paginationRowsPerPageOptions={[15, 30, 50]}
            customStyles={tableCustomStyles}
          />
        </div>
      )}
    </>
  );
}
