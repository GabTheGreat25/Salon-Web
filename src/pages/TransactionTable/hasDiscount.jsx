import React from "react";
import { useGetTransactionsQuery } from "@api";
import { FaEye, FaEdit } from "react-icons/fa";
import { FadeLoader } from "react-spinners";
import DataTable from "react-data-table-component";
import { tableCustomStyles } from "../../utils/tableCustomStyles";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function () {
  const navigate = useNavigate();
  const { data, isLoading } = useGetTransactionsQuery();
  const transactions = data?.details;

  const discount = useSelector((state) => state.discount);

  const filteredTransaction = transactions?.filter(
    (transaction) =>
      transaction?.customer_type !== "Customer" &&
      transaction?.appointment?.hasAppointmentFee !== true &&
      transaction?.image &&
      transaction?.image.length > 0
  );
  console.log(filteredTransaction);

  const columns = [
    {
      name: "ID",
      selector: (row) => row._id,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row?.appointment?.customer?.name,
      sortable: true,
    },
    {
      name: "Appointment Day",
      selector: (row) => {
        const datePart = row?.appointment?.date
          ? new Date(row.appointment.date).toISOString().split("T")[0]
          : "";
        const timePart = row?.appointment?.time || "";

        if (Array.isArray(timePart) && timePart.length === 1) {
          return `${datePart} at ${timePart[0]}`;
        } else {
          const firstTime = timePart?.length > 0 ? timePart[0] : "";
          const lastTime =
            timePart?.length > 0 ? timePart[timePart?.length - 1] : "";
          return `${datePart} at ${firstTime} to ${lastTime}`;
        }
      },
      sortable: true,
    },
    {
      name: "Type",
      selector: (row) => row?.customer_type,
      sortable: true,
    },
    {
      name: "PWD / Senior ID Image",
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
              <span>Not Applicable</span>
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
            className="text-xl text-blue-300"
            onClick={() => navigate(`/admin/transaction/${row._id}`)}
          />
          <FaEdit
            className="text-xl text-blue-500 cursor-pointer"
            onClick={() => {
              const editedIds = discount.discountData.editedTransactionIds;
              const currentId = row._id;
              if (editedIds.includes(currentId)) {
                toast.warning("You already have edited this");
              } else {
                navigate(`/admin/transaction/hasDiscount/edit/${row._id}`);
              }
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      {isLoading ? (
        <div className="mt-8 loader">
          <FadeLoader color="#FDA7DF" loading={true} size={50} />
        </div>
      ) : (
        <div className="min-h-screen m-12 rounded-lg">
          <DataTable
            title="Discount Table"
            columns={columns}
            data={filteredTransaction}
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
