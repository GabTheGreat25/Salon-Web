import React from "react";
import { useGetUsersQuery } from "@api";
import { FadeLoader } from "react-spinners";
import DataTable from "react-data-table-component";
import { tableCustomStyles } from "../../utils/tableCustomStyles";

export default function () {
  const { data, isLoading } = useGetUsersQuery();
  const users = data?.details;

  const filteredUser = users?.filter(
    (user) =>
      user.roles.includes("Online Customer") ||
      user.roles.includes("Walk-in Customer")
  );

  const columns = [
    {
      name: "ID",
      selector: (row) => row._id,
      sortable: true,
    },
    {
      name: "Customer Name",
      selector: (row) => row?.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row?.email,
      sortable: true,
    },
    {
      name: "Contact Number",
      selector: (row) => row?.contact_number,
      sortable: true,
    },
    {
      name: "Role",
      selector: (row) => row?.roles,
      sortable: true,
    },
    {
      name: "Ingredients Exclusion",
      selector: (row) => row?.information?.allergy.join(", "),
      sortable: true,
    },
    {
      name: "E Signature",
      cell: (row) => (
        <img
          src={row?.information?.eSignature}
          alt="E Signature"
          className="w-[10rem] h-auto p-2 m-2 bg-light-default rounded-lg"
        />
      ),
      sortable: true,
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
            title="Customer's Waiver List"
            columns={columns}
            data={filteredUser}
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
