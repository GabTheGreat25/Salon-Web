import React, { useRef, useEffect } from "react";
import { useGetUsersQuery, useGetExclusionsQuery } from "@api";
import { FadeLoader } from "react-spinners";
import DataTable from "react-data-table-component";
import { tableCustomStyles } from "../../utils/tableCustomStyles";

export default function () {
  const isFocused = useRef(true);

  const { data, isLoading, refetch } = useGetUsersQuery();
  const users = data?.details;

  const filteredUser = users?.filter((user) => user.roles.includes("Customer"));

  const {
    data: exclusion,
    isLoading: exclusionLoading,
    refetch: refetchExclusion,
  } = useGetExclusionsQuery();
  const exclusions = exclusion?.details;

  const filteredExclusions = exclusions?.flatMap((exclusion) => ({
    _id: exclusion._id,
    ingredientName: exclusion.ingredient_name.trim(),
  }));

  useEffect(() => {
    const handleFocus = async () => {
      isFocused.current = true;
      await Promise.all([refetch(), refetchExclusion()]);
    };

    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, [refetch, refetchExclusion]);

  const columns = [
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
      name: "Mobile Number",
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
      selector: (row) => {
        const allergies = row?.information?.allergy;
        if (allergies && allergies.length > 0) {
          const exclusionNames = allergies.map((allergy) => {
            const foundExclusion = filteredExclusions?.find(
              (exclusion) => exclusion._id === allergy
            );
            return foundExclusion ? foundExclusion.ingredientName : allergy;
          });
          return exclusionNames.join(", ");
        }
        return "";
      },
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
      {isLoading || exclusionLoading ? (
        <div className="mt-8 loader">
          <FadeLoader color="#FFB6C1" loading={true} size={50} />
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
