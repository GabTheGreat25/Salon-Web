import React from "react";
import { useGetEquipmentsQuery, useDeleteEquipmentMutation } from "@api";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { FadeLoader } from "react-spinners";
import { useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addDeletedItemId, getDeletedItemIds } from "../.././utils/DeleteItem";
import { tableCustomStyles } from "../../utils/tableCustomStyles";
import { useNavigate } from "react-router-dom";

export default function () {
  const navigate = useNavigate();
  const { data, isLoading } = useGetEquipmentsQuery();
  const equipments = data?.details;

  const [deleteEquipment, { isLoading: isDeleting }] =
    useDeleteEquipmentMutation();

  const deletedEquipmentIds = getDeletedItemIds("equipment");

  const filteredEquipments = equipments?.filter(
    (equipment) => !deletedEquipmentIds?.includes(equipment?._id)
  );

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this Equipment?")) {
      const response = await deleteEquipment(id);

      const toastProps = {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      };
      if (response?.data?.success === true) {
        toast.success(`${response?.data?.message}`, toastProps);
        addDeletedItemId("equipment", id);
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
      name: "Equipment Name",
      selector: (row) => row?.equipment_name,
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => row?.equipment_price,
      sortable: true,
    },
    {
      name: "Quantity",
      selector: (row) => row?.quantity,
      sortable: true,
    },
    {
      name: "Borrowed",
      selector: (row) => row?.borrow_qty,
      sortable: true,
    },
    {
      name: "Missing",
      selector: (row) => row?.missing_qty,
      sortable: true,
    },
    {
      name: "Damage",
      selector: (row) => row?.damage_qty ? row?.damage_qty : "None",
      sortable: true,
    },
    {
      name:"Status",
      selector: (row)=> row?.status,
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
          <FaEye
            className="text-xl text-green-300"
            onClick={() => navigate(`/admin/equipment/${row._id}`)}
          />
           <FaEdit
            className="text-xl text-blue-300"
            onClick={() => navigate(`/admin/equipment/edit/${row._id}`)}
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
              navigate(`/admin/equipment/create`);
            }}
          >
            Create Equipment
          </button>
          <DataTable
            title="Equipment Records"
            columns={columns}
            data={filteredEquipments}
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
