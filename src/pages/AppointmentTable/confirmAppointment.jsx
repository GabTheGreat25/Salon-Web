import React from "react";
import {
  useGetAppointmentsQuery,
  useConfirmAppointmentMutation,
  useCancelAppointmentMutation,
} from "@api";
import { FaTrash, FaCheck } from "react-icons/fa";
import { FadeLoader } from "react-spinners";
import DataTable from "react-data-table-component";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { tableCustomStyles } from "../../utils/tableCustomStyles";

export default function () {
  const { data, isLoading } = useGetAppointmentsQuery();
  const appointments = data?.details;

  const [cancelAppointment, { isLoading: isCanceling }] =
    useCancelAppointmentMutation();
  const [confirmAppointment, { isLoading: isConfirming }] =
    useConfirmAppointmentMutation();

  const filteredSchedule = appointments?.filter(
    (appointment) => appointment.isRebooked === false
  );

  const handleCancelAppointment = (id) => {
    if (
      window.confirm(
        "Are you sure you want to decline this Customer's Reschedule?"
      )
    ) {
      cancelAppointment(id).then((response) => {
        const toastProps = {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        };

        if (response?.data?.success) {
          toast.success(`${response.data.message}`, toastProps);
        } else
          toast.error(
            `${response?.error?.data?.error?.message || "Error"}`,
            toastProps
          );
      });
    }
  };

  const handleConfirmAppointment = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to accept this Customer's Reschedule?"
      )
    ) {
      const response = await confirmAppointment(id);

      const toastProps = {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      };
      if (response?.data?.success === true) {
        toast.success(`${response?.data?.message}`, toastProps);
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
      name: "Customer Name",
      selector: (row) => row?.customer?.name,
      sortable: true,
    },
    {
      name: "Appointment Day",
      selector: (row) => {
        const datePart = row?.date
          ? new Date(row.date).toISOString().split("T")[0]
          : "";
        const timePart = row?.time || "";
        const firstTime = timePart?.length > 0 ? timePart[0] : "";
        const lastTime =
          timePart?.length > 0 ? timePart[timePart?.length - 1] : "";
        return `${datePart} ${firstTime} - ${lastTime}`;
      },
      sortable: true,
    },
    {
      name: "Rebook Reason",
      selector: (row) => row?.rebookReason,
      sortable: true,
    },
    {
      name: "Message Reason",
      selector: (row) => (
        <div className="truncate w-fit">{row?.messageReason}</div>
      ),
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="grid grid-flow-col-dense text-center gap-x-4">
          <FaCheck
            className="text-xl text-blue-500"
            onClick={() => handleConfirmAppointment(row._id)}
          />
          <FaTrash
            className="text-xl text-red-500"
            onClick={() => handleCancelAppointment(row._id)}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      {isLoading || isConfirming || isCanceling ? (
        <div className="mt-8 loader">
          <FadeLoader color="#FDA7DF" loading={true} size={50} />
        </div>
      ) : (
        <div className="min-h-screen m-12 rounded-lg">
          <DataTable
            title="Confirm Reason Of Reschedule"
            columns={columns}
            data={filteredSchedule}
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
