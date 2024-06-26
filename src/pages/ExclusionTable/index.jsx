import React, { useRef, useEffect } from "react";
import { useGetExclusionsQuery, useDeleteExclusionMutation } from "@api";
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
  const isFocused = useRef(true);

  const { data, isLoading, refetch } = useGetExclusionsQuery();
  const exclusions = data?.details;

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

  const [deleteExclusion, { isLoading: isDeleting }] =
    useDeleteExclusionMutation();

  const deletedExclusionIds = getDeletedItemIds("exclusions");

  const filteredExclusion = exclusions?.filter(
    (exclusions) => !deletedExclusionIds?.includes(exclusions?._id)
  );

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this Ingredient?")) {
      const response = await deleteExclusion(id);

      const toastProps = {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      };
      if (response?.data?.success === true) {
        toast.success(`${response?.data?.message}`, toastProps);
        addDeletedItemId("exclusions", id);
      } else
        toast.error(`${response?.error?.data?.error?.message}`, toastProps);
    }
  };

  const columns = [
    {
      name: "Chemical Solution Name",
      selector: (row) => (
        <div className="truncate w-fit">{row?.ingredient_name}</div>
      ),
      sortable: true,
    },
    {
      name: "Type",
      cell: (row) => {
        const type = Array.isArray(row.type) ? row.type.join(", ") : row.type;
        return type;
      },
      sortable: true,
    },

    {
      name: "Actions",
      cell: (row) => (
        <div className="grid grid-flow-col-dense text-center gap-x-4">
          <FaEye
            className="text-xl text-green-300"
            onClick={() => navigate(`/admin/exclusion/${row._id}`)}
          />

          <FaEdit
            className="text-xl text-blue-500"
            onClick={() => navigate(`/admin/exclusion/edit/${row._id}`)}
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
              navigate(`/admin/exclusion/create`);
            }}
          >
            Create Chemical Solution
          </button>
          <DataTable
            title="Chemical Solution Records"
            columns={columns}
            data={filteredExclusion}
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
