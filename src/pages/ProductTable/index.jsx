import React, { useRef, useEffect } from "react";
import { useGetProductsQuery, useDeleteProductMutation } from "@api";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
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
  const { data, isLoading, refetch } = useGetProductsQuery();
  const products = data?.details;

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

  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  const deletedProductIds = getDeletedItemIds("product");

  const filteredProduct = products?.filter(
    (product) => !deletedProductIds?.includes(product?._id)
  );

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this Product?")) {
      const response = await deleteProduct(id);

      const toastProps = {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      };
      if (response?.data?.success === true) {
        toast.success(`${response?.data?.message}`, toastProps);
        addDeletedItemId("product", id);
      } else
        toast.error(`${response?.error?.data?.error?.message}`, toastProps);
    }
  };


  const columns = [
    {
      name: "Product Name",
      selector: (row) => row.product_name,
      sortable: true,
    },
    {
      name: "Brand",
      selector: (row) => row.brand?.brand_name,
      sortable: true,
    },
    {
      name: "Type",
      selector: (row) => row?.type,
      sortable: true,
    },
    {
      name: "Ingredients",
      selector: (row) => row?.ingredients,
      sortable: true,
    },
    {
      name: " Availability",
      selector: (row) => {
        const volumeInLiters = row?.product_volume >= 1000 ? row.product_volume / 1000 : row?.product_volume;
        const measurement = row?.product_measurement;
        return `${volumeInLiters} ${measurement}`;
    },
    sortable: true,
    },
    {
      name: "Remaining Volume",
      selector: (row) => {
        const oldVolume = row?.remaining_volume >= 1000 ? row.remaining_volume / 1000 : row?.remaining_volume;
        const measurement = row?.volume_description === "Pieces" ? "pcs" : (row?.remaining_volume >= 1000 ? "liter" : "ml");
        return `${oldVolume} ${measurement}`;
      },
      sortable: true,
    },
    {
      name:"Consume",
      selector: (row) => {
        const volumeInLiters = row?.product_consume;
        const measurement = row?.volume_description === "Pieces" ? "pcs" : "ml";
        return `${volumeInLiters} ${measurement}`;
    },
      sortable: true,
    },
    {
      name:"Quantity",
      selector: (row)=> `${row?.quantity} pcs`,
      sortable: true
    },
    {
      name: "New",
      selector: (row) => (
        <span>{row.isNew ? "New Product" : "Old Product"}</span>
      ),
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
            onClick={() => navigate(`/admin/product/${row._id}`)}
          />
          <FaEdit
            className="text-xl text-blue-500"
            onClick={() => navigate(`/admin/product/edit/${row._id}`)}
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
              navigate(`/admin/product/create`);
            }}
          >
            Create Product
          </button>
          <DataTable
            title="Product Records"
            columns={columns}
            data={filteredProduct}
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
