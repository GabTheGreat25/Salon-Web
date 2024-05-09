import React from "react";
import {
 useGetInventoriesQuery
} from "@api";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { FadeLoader } from "react-spinners";
import DataTable from "react-data-table-component";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addDeletedItemId, getDeletedItemIds } from "../.././utils/DeleteItem";
import { tableCustomStyles } from "../../utils/tableCustomStyles";
import { useNavigate } from "react-router-dom";

export default function () {
  const navigate = useNavigate();
  const { data, isLoading } = useGetInventoriesQuery();
  const inventories = data?.details;
  
  const deletedInventoryIds = getDeletedItemIds("inventories");

  const filteredInventory = inventories?.filter(
    (inventory) => !deletedInventoryIds?.includes(inventory?._id)
  );

  const columns = [
    {
      name: "Appointment Date",
      selector: (row) => row?.appointment?.date ? new Date(row?.appointment?.date).toISOString().split("T")[0] : "No Appointment",

      sortable: true,
    },
    {
      name: "Appointment Time",
      selector: (row) => row?.appointment?.time,
      sortable: true,
    },
    {
      name: "Service Image",
      cell: (row) => {
        const randomImage =
          row?.service?.image?.length > 0
            ?  row?.service?.image[Math.floor(Math.random() *  row?.service?.image?.length)]
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
      name: "Service Name",
      selector: (row) => row?.service?.service_name,
      sortable: true,
    },
    {
      name: "Product Images",
      cell: (row) => {
        const randomImage =
          row?.product?.image?.length > 0
            ?  row?.product?.image[Math.floor(Math.random() *  row?.product?.image?.length)]
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
      name: "Product Name",
      selector: (row) => row?.product?.product_name,
      sortable: true,
    },
    {
      name: "Previous Volume",
      selector: (row) => row?.old_volume >= 1000 ? `${row.old_volume / 1000} Liter` : `${row.old_volume} ml`,
      sortable: true,
    },
    {
      name: "Consumed Amount",
      selector: (row) => row?.product_consume >= 1000 ? `${row.product_consume / 1000} Liter` : `${row.product_consume} ml`,
      sortable: true,
    },
    {
      name: "Remaining Volume",
      selector: (row) => row?.remained_volume >= 1000 ? `${row.remained_volume / 1000} Liter` : `${row.remained_volume} ml`,
      sortable: true,
    },
    {
      name: "Previous Quantity",
      selector: (row)=> `${row?.old_quantity} pcs.`,
      sortable: true,
    },
    {
      name:"Deducted Quantity",
      selector: (row)=> `${row?.deducted_quantity} pcs.`,
      sortable: true,
    },
    {
      name:"Remaining Quantity",
      selector: (row)=> `${row?.remained_quantity} pcs.`,
      sortable: true,
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
            title="Product Stocks Records"
            columns={columns}
            data={filteredInventory}
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
