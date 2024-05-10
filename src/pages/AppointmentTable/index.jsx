import React, { useRef, useEffect } from "react";
import {
  useGetAppointmentsQuery,
  useDeleteAppointmentMutation,
  useGetTransactionsQuery,
} from "@api";
import { FaTrash, FaEye } from "react-icons/fa";
import { FadeLoader } from "react-spinners";
import DataTable from "react-data-table-component";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addDeletedItemId, getDeletedItemIds } from "../.././utils/DeleteItem";
import { tableCustomStyles } from "../../utils/tableCustomStyles";
import { useNavigate } from "react-router-dom";

export default function () {
  const navigate = useNavigate();
  const isFocused = useRef(true);

  const { data, isLoading, refetch } = useGetAppointmentsQuery();
  const appointments = data?.details;

  const [deleteAppointment, { isLoading: isDeleting }] =
    useDeleteAppointmentMutation();

  const {
    data: transactions,
    isLoading: transactionsLoading,
    refetch: refetchTransactions,
  } = useGetTransactionsQuery();

  useEffect(() => {
    const handleFocus = async () => {
      isFocused.current = true;
      await Promise.all([refetch(), refetchTransactions()]);
    };

    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, [refetch, refetchTransactions]);

  const deletedAppointmentIds = getDeletedItemIds("appointment");

  const filteredAppointment = appointments
    ?.filter(
      (appointment) => !deletedAppointmentIds?.includes(appointment?._id)
    )
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const completedTransactions = transactions?.details?.filter(
    (transaction) => transaction?.status === "completed"
  );

  const completedAppointmentIds = completedTransactions?.map(
    (transaction) => transaction.appointment._id
  );

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this Appointment?")) {
      const response = await deleteAppointment(id);

      const toastProps = {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      };
      if (response?.data?.success === true) {
        toast.success(`${response?.data?.message}`, toastProps);
        addDeletedItemId("appointment", id);
      } else
        toast.error(`${response?.error?.data?.error?.message}`, toastProps);
    }
  };

  const columns = [
    {
      name: "Date",
      selector: (row) => new Date(row.date).toISOString().split("T")[0],
      sortable: true,
    },
    {
      name: "Time",
      selector: (row) => {
        if (row.time.length === 1) {
          return row.time[0];
        } else {
          const startTime = row.time[0];
          const endTime = row.time[row.time.length - 1];
          return `${startTime} to ${endTime}`;
        }
      },
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => `₱${row.price}`,
      sortable: true,
    },
    {
      name: "Service Name",
      selector: (row) => (
        <div className="truncate w-fit">
          {Array.isArray(row.service)
            ? row.service.map((item) => item.service_name).join(", ")
            : row.service?.service_name}
        </div>
      ),
      sortable: true,
    },
    {
      name: "Add Ons",
      selector: (row) => (
        <div className="truncate w-fit">
          {Array.isArray(row.option)
            ? row.option.map((item) => item.option_name).join(", ") || "None"
            : row.option?.option_name || "None"}
        </div>
      ),
      sortable: true,
    },
    {
      name: "Beautician",
      selector: (row) => (
        <div className="truncate w-fit">
          {Array.isArray(row.beautician)
            ? row.beautician.map((b) => b.name).join(", ")
            : row.beautician?.name}
        </div>
      ),
      sortable: true,
    },
    {
      name: "Customer",
      selector: (row) => (
        <div className="truncate w-fit">
          {Array.isArray(row.customer)
            ? row.customer.map((b) => b.name).join(", ")
            : row.customer?.name}
        </div>
      ),
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="grid grid-flow-col-dense text-center gap-x-4">
          {/* <FaEdit
            className={`text-xl ${
              completedAppointmentIds?.includes(row._id)
                ? "text-gray-500 cursor-not-allowed"
                : "text-blue-500 cursor-pointer"
            }`}
            onClick={() => {
              if (completedAppointmentIds?.includes(row._id)) {
                const toastProps = {
                  position: toast.POSITION.TOP_RIGHT,
                  autoClose: 3000,
                };
                toast.warning(
                  `This appointment has been completed.`,
                  toastProps
                );
              } else {
                navigate(`/admin/appointment/edit/${row._id}`);
              }
            }}
          /> */}
          <FaEye
            className="text-xl text-green-300"
            onClick={() => navigate(`/admin/appointment/${row._id}`)}
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
      {isLoading || isDeleting || transactionsLoading ? (
        <div className="mt-8 loader">
          <FadeLoader color="#FFB6C1" loading={true} size={50} />
        </div>
      ) : (
        <div className="min-h-screen m-12 rounded-lg">
          <DataTable
            title="Appointment Records"
            columns={columns}
            data={filteredAppointment}
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
