import { React } from "react";
import { useNavigate } from "react-router-dom";
import { useGetProductsQuery, useDeleteProductMutation } from "@api";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FadeLoader } from "react-spinners";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function () {
  const { data, isLoading, isError } = useGetProductsQuery();
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();
  const products = data?.details;

  const navigate = useNavigate();

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const response = await deleteProduct(id);
      const toastProps = {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      };
      if (response?.data?.success === true) {
        toast.success(`${response?.data?.message}`, toastProps);
      } else {
        toast.error(`${response?.error?.data?.error?.message}`, toastProps);
      }
    }
  };

  return (
    <>
      <div className="min-w-full">
        <div className="flex justify-between ml-8 mr-7">
          <h3 className="text-center font-semibold text-xl p-1">
            Product Table
          </h3>
          <button
            className="mr-2 bg-rose-400 border border-rose-400 p-1 pl-2 pr-2 cursor-pointer rounded font-medium text-white text-xs transition hover:bg-white hover:text-rose-400 hover:border-white"
            onClick={() => {
              navigate("/admin/product/create");
            }}
          >
            CREATE PRODUCT
          </button>
        </div>
        <div className="container mx-auto p-8">
          {isLoading || isDeleting ? (
            <div className="loader mt-8">
              <FadeLoader color="#FDA7DF" loading={true} size={50} />
            </div>
          ) : isError ? (
            <p className="text-center text-red-500">Error: {isError.message}</p>
          ) : (
            <table className="min-w-full border rounded-lg border-gray-300 bg-light-default dark:bg-light-default">
              <thead>
                <tr className="dark:bg-dark-default dark:text-light-default">
                  <th className="py-2 px-4 border-b text-left">Brand</th>
                  <th className="py-2 px-4 border-b text-left">Product Name</th>
                  <th className="py-2 px-4 border-b text-left">Type</th>
                  <th className="py-2 px-4 border-b text-left">Quantity</th>
                  <th className="py-2 px-4 border-b text-left">Unit</th>
                  <th className="py-2 px-4 border-b text-left">Image</th>
                  <th className="py-2 px-4 border-b text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p, index) => (
                  <tr
                    key={index}
                    className="dark:bg-dark-default dark:text-light-default"
                  >
                    <td className="py-2 px-4 border-b text-left text-sm">
                      {p.brand}
                    </td>
                    <td className="py-2 px-4 border-b text-left text-sm">
                      {p.product_name}
                    </td>
                    <td className="py-2 px-4 border-b text-left text-sm">
                      {p.type}
                    </td>
                    <td className="py-2 px-4 border-b text-left text-sm">
                      {p.measurement.quantity}
                    </td>
                    <td className="py-2 px-4 border-b text-left text-sm">
                      {p.measurement.unit}
                    </td>

                    <td className="py-2 px-4 border-b text-left text-sm">
                      {p.image.map((img) => (
                        <img
                          className="w-12 h-12"
                          src={img?.url}
                          key={img?._id}
                          alt="Product"
                        />
                      ))}
                    </td>

                    <td className="py-2 px-4 border-b text-left">
                      <div className="flex items-center space-x-4">
                        <FaEdit
                          className="text-blue-500 hover:cursor-pointer hover:scale-110"
                          onClick={() =>
                            navigate(`/admin/product/edit/${p._id}`)
                          }
                        />
                        <FaTrash
                          className="text-red-500 hover:cursor-pointer hover:scale-110"
                          onClick={() => handleDelete(p._id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}
