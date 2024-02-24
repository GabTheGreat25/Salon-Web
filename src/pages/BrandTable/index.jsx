import { React } from "react";
import { useGetBrandsQuery, useDeleteBrandMutation } from "@api";
import DataTable from "react-data-table-component";
import { tableCustomStyles } from "../../utils/tableCustomStyles";
import { FadeLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { addDeletedItemId, getDeletedItemIds } from "../.././utils/DeleteItem";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function () {
  const navigate = useNavigate();
  const { data, isLoading } = useGetBrandsQuery();
  const brands = data?.details;

  const [deleteBrand, { isLoading: isDeleting }] = useDeleteBrandMutation();
  const deletedBrandIds = getDeletedItemIds("brand");

  const filteredBrand = brands?.filter(
    (brand) => !deletedBrandIds?.includes(brand?._id)
  );

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this Brand?")) {
      const response = await deleteBrand(id);

      const toastProps = {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      };
      if (response?.data?.success === true) {
        toast.success(`${response?.data?.message}`, toastProps);
        addDeletedItemId("brand", id);
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
      name: "Brand Name",
      selector: (row) => row?.brand_name,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="grid grid-flow-col-dense text-center gap-x-4">
          <FaEye
          className="text-xl text-blue-300"
          onClick={()=> navigate(`/admin/brand/${row._id}`)}
          />
          <FaEdit
            className="text-xl text-blue-500"
            onClick={() => navigate(`/admin/brand/edit/${row._id}`)}
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
              navigate(`/admin/brand/create`);
            }}
          >
            Create A New Brand
          </button>
          <DataTable
            title="Brands Table"
            columns={columns}
            data={filteredBrand}
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
