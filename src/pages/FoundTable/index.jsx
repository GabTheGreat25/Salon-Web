import React from "react";
import { useGetFoundsQuery, useDeleteFoundMutation } from "@api";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { FadeLoader } from "react-spinners";
import DataTable from "react-data-table-component";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addDeletedItemId, getDeletedItemIds } from "../.././utils/DeleteItem";
import { tableCustomStyles } from "../../utils/tableCustomStyles";
import { useNavigate } from "react-router-dom";

export default function () {
  const navigate = useNavigate();
  const { data, isLoading } = useGetFoundsQuery();
  const founds = data?.details;

  const [deleteFound, { isLoading: isDeleting }] = useDeleteFoundMutation();

  const deletedFoundIds = getDeletedItemIds("found");

  const filteredFound = founds?.filter(
    (f) => !deletedFoundIds?.includes(f?._id)
  );

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this Found Equipment Record?")) {
      const response = await deleteFound(id);

      const toastProps = {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      };
      if (response?.data?.success === true) {
        toast.success(`${response?.data?.message}`, toastProps);
        addDeletedItemId("found", id);
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
        name: "Equipment Image",
        cell: (row) => {
          const randomImage =
            row?.equipment?.image?.length > 0
              ? row?.equipment?.image[Math.floor(Math.random() * row?.equipment?.image?.length)]
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
      name: "Equipment Name",
      selector: (row) => row.equipment?.equipment_name,
      sortable: true,
    },
    {
        name: "Date Reported",
        selector: (row) => new Date(row.date_missing).toISOString().split("T")[0],
        sortable: true,
    },
    {
      name: "Date Found",
      selector: (row) => new Date(row.date_found).toISOString().split("T")[0],
      sortable: true,
  },
    {
      name: "Quantity Found",
      selector: (row) => row.quantity_found,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="grid grid-flow-col-dense text-center gap-x-4">
          <FaEye
             className="text-xl text-green-300"
            onClick={() => navigate(`/admin/found/${row._id}`)}
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
          <DataTable
            title="Found Equipment Records"
            columns={columns}
            data={filteredFound}
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
