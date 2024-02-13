import React from "react";
import { useGetOptionsQuery, useDeleteOptionMutation } from "@api";
import DataTable from "react-data-table-component";
import { tableCustomStyles } from "../../utils/tableCustomStyles";
import { FadeLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { addDeletedItemId, getDeletedItemIds } from "../.././utils/DeleteItem";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function () {
  const navigate = useNavigate();
  const { data, isLoading } = useGetOptionsQuery();
  const options = data?.details;

  const [deleteOption, { isLoading: isDeleting }] = useDeleteOptionMutation();
  const deletedOptionIds = getDeletedItemIds("option");

  const filteredOption = options?.filter(
    (option) => !deletedOptionIds?.includes(option?._id)
  );

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this Option?")) {
      const response = await deleteOption(id);

      const toastProps = {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      };
      if (response?.data?.success === true) {
        toast.success(`${response?.data?.message}`, toastProps);
        addDeletedItemId("option", id);
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
        name:"Services",
        cell: (row)=>(
            row?.service?.map((service)=>(
                <div>
                <ul key={service?._id}>
                    <li>{service?.service_name}</li>
                </ul>
            </div>
            ))
        ),
    },
    {
      name: "Option/Adds On Name",
      selector: (row) => row?.option_name,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row?.description,
      sortable: true,
    },
    {
      name: "Extra Fee",
      selector: (row) => row?.extraFee,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="grid grid-flow-col-dense text-center gap-x-4">
          <FaEdit
            className="text-xl text-blue-500"
            onClick={() => navigate(`/admin/option/edit/${row._id}`)}
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
              navigate(`/admin/option/create`);
            }}
          >
            Create A New Option
          </button>
          <DataTable
            title="Options Table"
            columns={columns}
            data={filteredOption}
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
