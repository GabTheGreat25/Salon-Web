import { React } from "react";
import { useGetSchedulesQuery, useDeleteScheduleMutation } from "@api";
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
  const { data, isLoading } = useGetSchedulesQuery();
  const schedules = data?.details;

  console.log(schedules);

  const [deleteSchedule, { isLoading: isDeleting }] =
    useDeleteScheduleMutation();

  const deletedScheduleIds = getDeletedItemIds("schedule");

  const filteredSchedule = schedules?.filter(
    (schedule) => !deletedScheduleIds?.includes(schedule?._id)
  );

  // &&
  // !schedule.leaveNoteConfirmed

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this Schedule")) {
      const response = await deleteSchedule(id);

      const toastProps = {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      };
      if (response?.data?.success === true) {
        toast.success(`${response?.data?.message}`, toastProps);
        addDeletedItemId("schedule", id);
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
      name: "Leave Note",
      selector: (row) =>
        row.leaveNote ? row.leaveNote : "Currently Mark as Absent",
      sortable: true,
    },
    {
      name: "Leave Status",
      selector: (row) => (
        <span>
          {row.leaveNoteConfirmed
            ? "Note Confirmed"
            : "Leave Note Not Confirmed"}
        </span>
      ),
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="grid grid-flow-col-dense text-center gap-x-4">
          <FaEdit
            className="text-xl text-blue-500"
            onClick={() => navigate(`/admin/schedule/edit/admin/${row?._id}`)}
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
              navigate(`/admin/schedule/create`);
            }}
          >
            Record Absence
          </button>
          <DataTable
            title="Status Table"
            columns={columns}
            data={filteredSchedule}
            pagination
            highlightOnHover
            pointerOnHover
            paginationPerPage={15}
            paginationRowsPerPageOptions={[15, 30, 50]}
            customStyles={tableCustomStyles}
            onRowClicked={(row) => navigate(`/admin/schedule/${row._id}`)}
          />
        </div>
      )}
    </>
  );
}
