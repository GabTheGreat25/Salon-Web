import React from "react";
import { useGetMonthsQuery, useDeleteMonthMutation } from "@api";
import DataTable from "react-data-table-component";
import { tableCustomStyles } from "../../utils/tableCustomStyles";
import { FadeLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { addDeletedItemId, getDeletedItemIds } from "../.././utils/DeleteItem";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function () {
  const navigate = useNavigate();
  const { data, isLoading } = useGetMonthsQuery();
  const months = data?.details;

  const [deleteMonth, { isLoading: isDeleting }] = useDeleteMonthMutation();
  const deletedMonthIds = getDeletedItemIds("month");

  const filteredMonth = months?.filter(
    (month) => !deletedMonthIds?.includes(month?._id)
  );

  const columns = [
    {
      name: "ID",
      selector: (row) => row?._id,
      sortable: true,
    },
    {
      name: "Month",
      selector: (row) => {
          const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
          return monthNames[row?.month];
      },
      sortable: true,
  },
    {
      name: "Message",
      selector: (row) => row?.message,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="grid grid-flow-col-dense text-center gap-x-4">
           <FaEye
            className="text-xl text-green-300"
            onClick={() => navigate(`/admin/month/${row._id}`)}
          />

          <FaEdit
            className="text-xl text-blue-500"
            onClick={() => navigate(`/admin/month/edit/${row._id}`)}
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
            title="Months Table"
            columns={columns}
            data={filteredMonth}
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
