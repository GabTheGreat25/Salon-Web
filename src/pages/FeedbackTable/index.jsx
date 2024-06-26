import React, { useRef, useEffect } from "react";
import { useGetFeedbacksQuery, useDeleteFeedbackMutation } from "@api";
import { FaEye, FaTrash } from "react-icons/fa";
import { FadeLoader } from "react-spinners";
import DataTable from "react-data-table-component";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addDeletedItemId, getDeletedItemIds } from "../.././utils/DeleteItem";
import { tableCustomStyles } from "../../utils/tableCustomStyles";
import { useNavigate } from "react-router-dom";

export default function () {
  const isFocused = useRef(true);

  const navigate = useNavigate();
  const { data, isLoading, refetch } = useGetFeedbacksQuery();
  const feedbacks = data?.details;

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

  const [deleteFeedback, { isLoading: isDeleting }] =
    useDeleteFeedbackMutation();

  const deletedFeedbackIds = getDeletedItemIds("feedback");

  const filteredFeedback = feedbacks?.filter(
    (feedback) => !deletedFeedbackIds?.includes(feedback?._id)
  );

  const anonymizeName = (name) => {
    if (!name || name?.length < 2) return "";
    return name[0] + "*".repeat(name?.length - 2) + name[name?.length - 1];
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this Feedback?")) {
      const response = await deleteFeedback(id);

      const toastProps = {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      };
      if (response?.data?.success === true) {
        toast.success(`${response?.data?.message}`, toastProps);
        addDeletedItemId("feedback", id);
      } else
        toast.error(`${response?.error?.data?.error?.message}`, toastProps);
    }
  };

  const columns = [
    {
      name: "Name",
      selector: (row) =>
        row.isAnonymous ? anonymizeName(row?.name) : row?.name,
      sortable: true,
    },
    {
      name: "Mobile Number",
      selector: (row) => row.contact_number,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="grid grid-flow-col-dense text-center gap-x-4">
          <FaEye
            className="text-xl text-green-300"
            onClick={() => navigate(`/admin/feedback/${row._id}`)}
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
            title="Feedback Records"
            columns={columns}
            data={filteredFeedback}
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
