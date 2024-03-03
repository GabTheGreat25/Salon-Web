import React from "react";
import { useGetCommentsQuery, useDeleteCommentMutation } from "@api";
import { FaTrash, FaStar, FaEye } from "react-icons/fa";
import { FadeLoader } from "react-spinners";
import DataTable from "react-data-table-component";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addDeletedItemId, getDeletedItemIds } from "../.././utils/DeleteItem";
import { tableCustomStyles } from "../../utils/tableCustomStyles";
import { useNavigate } from "react-router-dom";

export default function () {
  const { data, isLoading } = useGetCommentsQuery();
  const comments = data?.details;

  const [deleteComment, { isLoading: isDeleting }] = useDeleteCommentMutation();

  const deletedCommentIds = getDeletedItemIds("comment");

  const filteredComment = comments?.filter(
    (comment) => !deletedCommentIds?.includes(comment?._id)
  );

  const anonymizeName = (name) => {
    if (!name || name?.length < 2) return "";
    return name[0] + "*".repeat(name?.length - 2) + name[name?.length - 1];
  };

  const navigate = useNavigate();

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this Comment?")) {
      const response = await deleteComment(id);

      const toastProps = {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      };
      if (response?.data?.success === true) {
        toast.success(`${response?.data?.message}`, toastProps);
        addDeletedItemId("comment", id);
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
      name: "Ratings",
      cell: (row) => {
        const starCount = Math.min(5, Math.max(0, Math.floor(row.ratings)));
        return Array.from({ length: starCount }, (_, index) => (
          <FaStar key={index} className="text-[#feca57] text-2xl" />
        ));
      },
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: "Suggestion",
      selector: (row) => row.suggestion,
      sortable: true,
    },
    {
      name: "Customer",
      selector: (row) =>
        row?.isAnonymous
          ? anonymizeName(row?.transaction?.appointment?.customer?.name)
          : row?.transaction?.appointment?.customer?.name,
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
            {randomImage ? (
              <img
                className="object-center w-10 h-10 rounded-full"
                src={randomImage.url}
                alt={randomImage.originalname}
              />
            ) : (
              "No Image Uploaded"
            )}
          </div>
        );
      },
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="grid grid-flow-col-dense text-center gap-x-4">
          <FaEye
            className="text-xl text-green-300"
            onClick={() => navigate(`/admin/comment/${row._id}`)}
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
          <DataTable
            title="Comments Table"
            columns={columns}
            data={filteredComment}
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
