import React from "react";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
  useConfirmUserMutation,
} from "@api";
import { FaTrash, FaCheck } from "react-icons/fa";
import { FadeLoader } from "react-spinners";
import { useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addDeletedItemId, getDeletedItemIds } from "../.././utils/DeleteItem";
import { tableCustomStyles } from "../../utils/tableCustomStyles";

export default function () {
  const { data, isLoading } = useGetUsersQuery();
  const users = data?.details;

  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const [confirmUser, { isLoading: isConfirming }] = useConfirmUserMutation();
  const auth = useSelector((state) => state.auth);

  const deletedUserIds = getDeletedItemIds("user");

  const filteredBeauticians = users
    ?.filter(
      (user) =>
        user?.roles.includes("Beautician") &&
        user?.active === false &&
        user?._id !== auth?.user?._id
    )
    .filter((user) => !deletedUserIds.includes(user?._id));

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this User?")) {
      const response = await deleteUser(id);

      const toastProps = {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      };
      if (response?.data?.success === true) {
        toast.success(`${response?.data?.message}`, toastProps);
        addDeletedItemId("user", id);
      } else
        toast.error(`${response?.error?.data?.error?.message}`, toastProps);
    }
  };

  const handleConfirmUser = async (id) => {
    if (window.confirm("Are you sure you want to accept this Beautician?")) {
      const response = await confirmUser(id);

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
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Contact Number",
      selector: (row) => row.contact_number,
      sortable: true,
    },
    {
      name: "Age",
      selector: (row) => row.age,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Roles",
      selector: (row) => row.roles,
      sortable: true,
    },
    {
      name: "Job Type",
      selector: (row) => row.requirement?.job_type,
      sortable: true,
    },
    {
      name: "Images",
      cell: (row) => {
        const randomImage =
          row.image?.length > 0
            ? row.image[Math.floor(Math.random() * row.image?.length)]
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
      name: "Actions",
      cell: (row) => (
        <div className="grid grid-flow-col-dense text-center gap-x-4">
          <FaCheck
            className="text-xl text-blue-500"
            onClick={() => handleConfirmUser(row._id)}
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
            title="Applying Beauticians"
            columns={columns}
            data={filteredBeauticians}
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
