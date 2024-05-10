import React, { useRef, useEffect } from "react";
import { useGetMonthsQuery, useDeleteMonthMutation } from "@api";
import DataTable from "react-data-table-component";
import { tableCustomStyles } from "../../utils/tableCustomStyles";
import { FadeLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaEye } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import { addDeletedItemId, getDeletedItemIds } from "../.././utils/DeleteItem";

export default function () {
  const isFocused = useRef(true);

  const navigate = useNavigate();
  const { data, isLoading, refetch } = useGetMonthsQuery();
  const months = data?.details;

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

  const columns = [
    {
      name: "Month",
      selector: (row) => {
        const monthNames = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
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
      {isLoading ? (
        <div className="mt-8 loader">
          <FadeLoader color="#FFB6C1" loading={true} size={50} />
        </div>
      ) : (
        <div className="min-h-screen m-12 rounded-lg">
          <DataTable
            title="Months Records "
            columns={columns}
            data={months}
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
