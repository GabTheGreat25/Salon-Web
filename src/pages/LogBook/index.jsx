import { React, useEffect } from "react";
import { useGetLogBooksQuery, useDeleteLogBookMutation } from "@api";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { FadeLoader } from "react-spinners";
import DataTable from "react-data-table-component";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addDeletedItemId, getDeletedItemIds } from "../.././utils/DeleteItem";
import { tableCustomStyles } from "../../utils/tableCustomStyles";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

export default function () {
  const navigate = useNavigate();
  const { data, isLoading, refetch } = useGetLogBooksQuery();
  const logbooks = data?.details;

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

  const [deleteLogBook, { isLoading: isDeleting }] = useDeleteLogBookMutation();

  const deletedLogBookIds = getDeletedItemIds("logbook");

  const filteredLogBooks = logbooks?.filter(
    (logbook) => !deletedLogBookIds?.includes(logbook?._id)
  );

  const user = useSelector((state) => state.auth.user.roles);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this LogBook?")) {
      const response = await deleteLogBook(id);

      const toastProps = {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      };
      if (response?.data?.success === true) {
        toast.success(`${response?.data?.message}`, toastProps);
        addDeletedItemId("logbook", id);
      } else
        toast.error(`${response?.error?.data?.error?.message}`, toastProps);
    }
  };
  const columns = [
    {
      name: "Beautician",
      selector: (row) => row.user?.name,
      sortable: true,
    },
    {
      name: "Borrowed Equipment",
      cell: (row) => (
        <div className="space-y-4 m-2">
          {row.equipment.map((item) => (
            <div key={item._id} className="w-40">
              <p className="font-semibold text-sm text-left">
                {item.equipment.equipment_name}
              </p>
              <p className="text-sm text-left">
                Borrow Quantity: {item.borrow_quantity}
              </p>
              <p className="text-sm text-left">Status: {item.status}</p>
            </div>
          ))}
        </div>
      ),
    },
    {
      name: "Date Borrowed",
      selector: (row) =>
        new Date(row?.date_borrowed).toISOString().split("T")[0],
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row?.status,
      sortable: true,
    },
    {
      name: "Time Borrowed",
      selector: (row) => row?.time_borrowed,
      sortable: true,
    },
    {
      name: "Date Returned",
      selector: (row) =>
        row.date_returned
          ? new Date(row.date_returned).toISOString().split("T")[0]
          : "Equipment not returned",
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="grid grid-flow-col-dense text-center gap-x-4">
          <FaEye
            className="text-xl text-green-300"
            onClick={() => navigate(`/${user}/logbook/${row._id}`)}
          />
          {row?.status?.includes("Returned") ? (
            <FaEdit
              className="text-xl text-gray-500"
              onClick={() =>
                toast.warning("Cannot edit a returned logbook record.", {
                  position: toast.POSITION.TOP_RIGHT,
                  autoClose: 5000,
                })
              }
            />
          ) : (
            <FaEdit
              className="text-xl text-blue-500"
              onClick={() => navigate(`/${user}/logbook/edit/${row._id}`)}
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
              navigate(`/${user}/logbook/create`);
            }}
          >
            Create Logbook
          </button>
          <DataTable
            title="LogBook Records"
            columns={columns}
            data={filteredLogBooks}
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
