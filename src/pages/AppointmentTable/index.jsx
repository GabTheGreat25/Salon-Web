import React from "react";
import {
  useGetAppointmentsQuery,
  useDeleteAppointmentMutation,
  useGetTransactionsQuery,
} from "@api";
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
  const { data, isLoading } = useGetAppointmentsQuery();
  const appointments = data?.details;

  const [deleteAppointment, { isLoading: isDeleting }] =
    useDeleteAppointmentMutation();

  const deletedAppointmentIds = getDeletedItemIds("appointment");

  const filteredAppointment = appointments?.filter(
    (appointment) => !deletedAppointmentIds?.includes(appointment?._id)
  );

  const { data: transactions } = useGetTransactionsQuery();

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
      name: "ID",
      selector: (row) => row._id,
      sortable: true,
    },
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
            ? row.option.map((item) => item.option_name).join(", ")
            : row.option?.option_name}
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
            : row.beautician?.beautician}
        </div>
      ),
      sortable: true,
    },
    {
      name: "Customer",
      selector: (row) => row.customer?.name,
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
          <DataTable
            title="Appointments Table"
            columns={columns}
            data={filteredAppointment}
            pagination
            highlightOnHover
            pointerOnHover
            paginationPerPage={15}
            paginationRowsPerPageOptions={[15, 30, 50]}
            customStyles={tableCustomStyles}
            onRowClicked={(row) => navigate(`/admin/appointment/${row._id}`)}
          />
        </div>
      )}
    </>
  );
}
