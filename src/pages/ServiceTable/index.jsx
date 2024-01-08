import React from "react";
import { useGetServicesQuery, useDeleteServiceMutation } from "@api";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FadeLoader } from "react-spinners";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function () {
  const { data, isLoading, isError } = useGetServicesQuery();
  const [deleteService, { isLoading: isDeleting }] = useDeleteServiceMutation();
  const services = data?.details;

  const navigate = useNavigate();

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      const response = await deleteService(id);
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
          <h3 className="text-center font-semibold text-xl">
            Service CRUD TEST
          </h3>
          <button
            className="mr-2 bg-rose-400 border border-rose-400 p-1 pl-2 pr-2 cursor-pointer rounded font-medium text-white text-xs transition hover:bg-white hover:text-rose-400 hover:border-white"
            onClick={() => {
              navigate("/admin/service/create");
            }}
          >
            CREATE SERVICE
          </button>
        </div>
        <div className="container min-h-screen rounded-lg mx-auto p-8">
          {isLoading || isDeleting ? (
            <div className="loader mt-8">
              <FadeLoader color="#FDA7DF" loading={true} size={50} />
            </div>
          ) : isError ? (
            <p className="text-center text-red-500">Error: {isError.message}</p>
          ) : (
            <table className="min-w-full border rounded-lg border-gray-300 ">
              <thead>
                <tr className="dark:bg-dark-default dark:text-light-default">
                  <th className="py-2 px-4 border-b text-left">Description</th>
                  <th className="py-2 px-4 border-b text-left">Service Name</th>
                  <th className="py-2 px-4 border-b text-left">Price</th>
                  <th className="py-2 px-4 border-b text-left">
                    Service Products
                  </th>
                  <th className="py-2 px-4 border-b text-left">
                    Service Image
                  </th>
                  <th className="py-2 px-4 border-b text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {services.map((s, index) => (
                  <tr
                    key={index}
                    className="dark:bg-dark-default dark:text-light-default"
                  >
                    <td className="py-2 px-4 border-b text-left  text-sm">
                      {s.description}
                    </td>
                    <td className="py-2 px-4 border-b text-left  text-sm">
                      {s.service_name}
                    </td>
                    <td className="py-2 px-4 border-b text-left  text-sm">
                      {s.price}
                    </td>

                    <td className="py-2 px-4 border-b text-left">
                      {s.product.map((p, index) => (
                        <ul className="list-disc p-1 font-semibold  text-sm">
                          <li> {p.product_name}</li>
                        </ul>
                      ))}
                    </td>

                    <td className="py-2 px-4 border-b text-left">
                      {s.image.map((img) => (
                        <img
                          className="w-12 f-12"
                          src={img?.url}
                          key={img?._id}
                          alt="Services"
                        />
                      ))}
                    </td>
                    <td className="py-2 px-4 border-b text-left">
                      <div className="flex items-center space-x-4">
                        <FaEdit
                          className="text-blue-500 hover:cursor-pointer hover:scale-110"
                          onClick={() =>
                            navigate(`/admin/service/edit/${s._id}`)
                          }
                        />
                        <FaTrash
                          className="text-red-500 hover:cursor-pointer hover:scale-110"
                          onClick={() => handleDelete(s._id)}
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
