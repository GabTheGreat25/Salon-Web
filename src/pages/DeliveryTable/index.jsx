import React, { useRef, useEffect } from "react";
import { useGetDeliveriesQuery, useDeleteDeliveryMutation } from "@api";
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

  const { data, isLoading, refetch } = useGetDeliveriesQuery();
  const deliveries = data?.details;

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

  const [deleteDelivery, { isLoading: isDeleting }] =
    useDeleteDeliveryMutation();

  const deletedDeliveryIds = getDeletedItemIds("delivery");

  const filteredDelivery = deliveries?.filter(
    (delivery) => !deletedDeliveryIds?.includes(delivery?._id)
  );

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this Delivery?")) {
      const response = await deleteDelivery(id);

      const toastProps = {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      };
      if (response?.data?.success === true) {
        toast.success(`${response?.data?.message}`, toastProps);
        addDeletedItemId("delivery", id);
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
      name: "Company Name",
      selector: (row) => row.company_name,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => new Date(row.date).toISOString().split("T")[0],
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => `₱${row.price}`,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Quantity",
      selector: (row) => row.quantity,
      sortable: true,
    },
    {
      name: "Product Type",
      selector: (row) => row.type.join(", "),
      sortable: true,
    },

    {
      name: "Product Name",
      selector: (row) => (
        <div className="truncate w-fit">
          {Array.isArray(row.product)
            ? row.product.map((item) => item.product_name).join(", ")
            : row.product?.product_name}
        </div>
      ),
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="grid grid-flow-col-dense text-center gap-x-4">
          <FaEye
            className="text-xl text-green-300"
            onClick={() => navigate(`/admin/delivery/${row._id}`)}
          />
          {row?.status === "completed" ? (
            <FaEdit
              className="text-xl text-gray-500"
              onClick={() => 
                toast.warning("Cannot edit a completed delivery.", {
                  position: toast.POSITION.TOP_RIGHT,
                  autoClose: 5000,
                })
              }
            />
          ) : (
            <FaEdit
              className="text-xl text-blue-500"
              onClick={() => navigate(`/admin/delivery/edit/${row._id}`)}
            />
          )}
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
              navigate(`/admin/delivery/create`);
            }}
          >
            Create Delivery
          </button>
          <DataTable
            title="Deliveries Table"
            columns={columns}
            data={filteredDelivery}
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
