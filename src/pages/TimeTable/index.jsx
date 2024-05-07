import React, { useRef, useEffect } from "react";
import { useGetTimesQuery, useDeleteTimeMutation } from "@api";
import DataTable from "react-data-table-component";
import { tableCustomStyles } from "../../utils/tableCustomStyles";
import { FadeLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { addDeletedItemId, getDeletedItemIds } from "../.././utils/DeleteItem";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function () {
  const isFocused = useRef(true);

  const navigate = useNavigate();

  const { data, isLoading, refetch } = useGetTimesQuery();
  const time = data?.details;

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

  const [deleteTime, { isLoading: isDeleting }] = useDeleteTimeMutation();
  const deletedTimeIds = getDeletedItemIds("time");

  const filteredTime = time?.filter(
    (time) => !deletedTimeIds?.includes(time?._id)
  );

  const handleDelete = async (id) => {
    if (
      window.confirm("Are you sure you want to delete this Appointment Time?")
    ) {
      const response = await deleteTime(id);

      const toastProps = {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      };
      if (response?.data?.success === true) {
        toast.success(`${response?.data?.message}`, toastProps);
        addDeletedItemId("time", id);
      } else
        toast.error(`${response?.error?.data?.error?.message}`, toastProps);
    }
  };

  const columns = [
    {
      name: "ID",
      selector: (row) => row?._id,
      sortable: true,
    },
    {
      name: "Appointment Time",
      selector: (row) => row?.time,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="grid grid-flow-col-dense text-center gap-x-4">
          <FaEye
            className="text-xl text-green-300"
            onClick={() => navigate(`/admin/time/${row._id}`)}
          />
          <FaEdit
            className="text-xl text-blue-500"
            onClick={() => navigate(`/admin/time/edit/${row._id}`)}
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
          <FadeLoader color="#FFB6C1" loading={true} size={50} />
        </div>
      ) : (
        <div className="min-h-screen m-12 rounded-lg">
          <button
            className="px-4 py-2 mb-6 border rounded border-dark-default dark:border-light-default text-dark-default dark:text-light-default hover:bg-primary-default"
            onClick={() => {
              navigate(`/admin/time/create`);
            }}
          >
            Set a New Appointment Time
          </button>
          <DataTable
            title="Appointment Time Records"
            columns={columns}
            data={filteredTime}
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
