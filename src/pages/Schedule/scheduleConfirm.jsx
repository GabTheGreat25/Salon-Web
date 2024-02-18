import React from "react";
import {
  useGetSchedulesQuery,
  useDeleteConfirmScheduleMutation,
  useConfirmScheduleMutation,
} from "@api";
import { FaTrash, FaCheck } from "react-icons/fa";
import { FadeLoader } from "react-spinners";
import DataTable from "react-data-table-component";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addDeletedItemId, getDeletedItemIds } from "../.././utils/DeleteItem";
import { tableCustomStyles } from "../../utils/tableCustomStyles";

export default function () {
  const { data, isLoading } = useGetSchedulesQuery();
  const schedules = data?.details;

  const [deleteConfirmSchedule, { isLoading: isDeleting }] =
    useDeleteConfirmScheduleMutation();
  const [confirmSchedule, { isLoading: isConfirming }] =
    useConfirmScheduleMutation();

  const deletedScheduleIds = getDeletedItemIds("schedule");

  const filteredSchedule = schedules
    ?.filter((schedule) => schedule.leaveNoteConfirmed === false)
    .filter((schedule) => schedule.isLeave === true)
    .filter((schedule) => !deletedScheduleIds.includes(schedule?._id));

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to cancel this leave?")) {
      const response = await deleteConfirmSchedule(id);

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

  const handleConfirmSchedule = async (id) => {
    if (
      window.confirm("Are you sure you want to accept this Beautician leave?")
    ) {
      const response = await confirmSchedule(id);

      const toastProps = {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      };
      if (response?.data?.success === true) {
        toast.success(`${response?.data?.message}`, toastProps);
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
      name: "Beautician Name",
      selector: (row) => row?.beautician?.name,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => new Date(row.date).toISOString().split("T")[0],
      sortable: true,
    },
    {
      name: "Leave Note",
      selector: (row) => <div className="truncate w-fit">{row?.leaveNote}</div>,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="grid grid-flow-col-dense text-center gap-x-4">
          <FaCheck
            className="text-xl text-blue-500"
            onClick={() => handleConfirmSchedule(row._id)}
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
      {isLoading || isDeleting || isConfirming ? (
        <div className="mt-8 loader">
          <FadeLoader color="#FDA7DF" loading={true} size={50} />
        </div>
      ) : (
        <div className="min-h-screen m-12 rounded-lg">
          <DataTable
            title="Applying For Leave From Beauticians"
            columns={columns}
            data={filteredSchedule}
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
