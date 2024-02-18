import { React } from "react";
import { useGetAppointmentsQuery } from "@api";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { FadeLoader } from "react-spinners";
import DataTable from "react-data-table-component";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { tableCustomStyles } from "../../utils/tableCustomStyles";
import { useNavigate } from "react-router-dom";

export default function () {
  const navigate = useNavigate();
  const { data, isLoading } = useGetAppointmentsQuery();
  const appointments = data?.details;

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();

  const filteredAppointments = appointments?.filter((appointment) => {
    const appointmentDate = new Date(appointment.date);
    return (
      appointmentDate.getFullYear() === year &&
      appointmentDate.getMonth() + 1 === month &&
      appointmentDate.getDate() === day
    );
  });

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
      selector: (row) =>
        Array.isArray(row.service)
          ? row.service.map((item) => item.service_name).join(", ")
          : row.service?.service_name,
      sortable: true,
    },
    {
      name: "Service Type",
      selector: (row) =>
        Array.isArray(row.service)
          ? row.service.map((item) => item.type).join(", ")
          : row.service?.type,
      sortable: true,
    },
    {
      name: "Beautician",
      selector: (row) =>
        Array.isArray(row.beautician)
          ? row.beautician.map((b) => b.name).join(", ")
          : row.beautician?.beautician,
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
          <FaEye
            className="text-xl text-green-500"
            onClick={() => navigate(`/admin/appointment/${row._id}`)}

          />
          <FaEdit
            className="text-xl text-blue-500"
            onClick={() =>
              navigate(`/admin/appointment/beautician/edit/${row._id}`)
            }
          />
        </div>
      ),
    },
  ];
  return (
    <>
      {isLoading ? (
        <div className="mt-8 loader">
          <FadeLoader color="#FDA7DF" loading={true} size={50} />
        </div>
      ) : (
        <div className="min-h-screen m-12 rounded-lg">
          <DataTable
            title="Today's Schedule Table"
            columns={columns}
            data={filteredAppointments}
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
