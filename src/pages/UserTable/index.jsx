import React from "react";
import { useGetUsersQuery, useDeleteUserMutation } from "@api";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FadeLoader } from "react-spinners";

export default function () {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetUsersQuery();
  const users = data?.details;

  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this User?")) {
      const response = await deleteUser(id);
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
      <div className="container min-h-screen rounded-lg mx-auto p-8">
        {isLoading || isDeleting ? (
          <div className="loader mt-8">
            <FadeLoader color="#FDA7DF" loading={true} size={50} />
          </div>
        ) : isError ? (
          <p className="text-center text-red-500">Error: {isError.message}</p>
        ) : (
          <table className="min-w-full bg-white border rounded-lg border-gray-300">
            <thead>
              <tr className="dark:bg-dark-default dark:text-light-default">
                <th className="py-2 px-4 border-b text-left">Email</th>
                <th className="py-2 px-4 border-b text-left">User Name</th>
                <th className="py-2 px-4 border-b text-left">Contact Number</th>
                <th className="py-2 px-4 border-b text-left">Age</th>
                <th className="py-2 px-4 border-b text-left">Roles</th>
                <th className="py-2 px-4 border-b text-left">Status</th>
                <th className="py-2 px-4 border-b text-left">Service Image</th>
                <th className="py-2 px-4 border-b text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, index) => (
                <tr
                  key={index}
                  className="dark:bg-dark-default dark:text-light-default"
                >
                  <td className="py-2 px-4 border-b text-left">{u.email}</td>
                  <td className="py-2 px-4 border-b text-left">{u.name}</td>
                  <td className="py-2 px-4 border-b text-left">
                    {u.contact_number}
                  </td>

                  <td className="py-2 px-4 border-b text-left">{u.age}</td>
                  <td className="py-2 px-4 border-b text-left">{u.roles}</td>
                  <td className="py-2 px-4 border-b text-left">
                    {u.active ? "User Active" : "Inactive"}
                  </td>

                  <td className="py-2 px-4 border-b text-left">
                    {u.image.map((img) => (
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
                        onClick={() => navigate(`/admin/user/edit/${u._id}`)}
                      />
                      <FaTrash
                        className="text-red-500 hover:cursor-pointer hover:scale-110"
                        onClick={() => handleDelete(u._id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
