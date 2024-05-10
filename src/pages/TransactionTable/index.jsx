import React, { useRef, useEffect } from "react";
import { useGetTransactionsQuery, useDeleteTransactionMutation } from "@api";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { FadeLoader } from "react-spinners";
import DataTable from "react-data-table-component";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addDeletedItemId, getDeletedItemIds } from "../.././utils/DeleteItem";
import { tableCustomStyles } from "../../utils/tableCustomStyles";
import { useNavigate } from "react-router-dom";

export default function () {
  const isFocused = useRef(true);

  const navigate = useNavigate();
  const { data, isLoading, refetch } = useGetTransactionsQuery();
  const transactions = data?.details;

  useEffect(() => {
    const handleFocus = () => {
      isFocused.current = true;
      refetch();
    };

    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, [refetch]);

  const [deleteTransaction, { isLoading: isDeleting }] =
    useDeleteTransactionMutation();

  const deletedTransactionIds = getDeletedItemIds("transaction");

  const filteredTransaction = transactions
    ?.filter(
      (transaction) => !deletedTransactionIds?.includes(transaction?._id)
    )
    .sort(
      (a, b) => new Date(a.appointment?.date) - new Date(b.appointment?.date)
    );

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
      name: "Name",
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

        if (Array.isArray(timePart) && timePart.length === 1) {
          return `${datePart} at ${timePart[0]}`;
        } else {
          const firstTime = timePart?.length > 0 ? timePart[0] : "";
          const lastTime =
            timePart?.length > 0 ? timePart[timePart?.length - 1] : "";
          return `${datePart} at ${firstTime} to ${lastTime}`;
        }
      },
      sortable: true,
    },
    {
      name: "Type",
      selector: (row) => row?.customer_type,
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
            {randomImage ? (
              <img
                className="object-center w-10 h-10 rounded-full"
                src={randomImage.url}
                alt={randomImage.originalname}
              />
            ) : (
              <span>Not Applicable</span>
            )}
          </div>
        );
      },
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="grid grid-flow-col-dense text-center gap-x-4">
          <FaEye
            className="text-xl text-green-300"
            onClick={() => navigate(`/admin/transaction/${row._id}`)}
          />
          {row.status !== "completed" ? (
            <FaEdit
              className="text-xl text-blue-500 cursor-pointer"
              onClick={() => navigate(`/admin/transaction/edit/${row._id}`)}
            />
          ) : (
            <FaEdit
              className="text-xl text-gray-500 cursor-not-allowed"
              onClick={() =>
                toast.warning("Cannot edit a completed transaction.", {
                  position: toast.POSITION.TOP_RIGHT,
                  autoClose: 5000,
                })
              }
            />
          )}
          <FaTrash
            className="text-xl text-red-500 cursor-pointer"
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
          <FadeLoader color="#FFB6C1" loading={true} size={50} />
        </div>
      ) : (
        <div className="min-h-screen m-12 rounded-lg">
          <DataTable
            title="Transactions Records"
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
