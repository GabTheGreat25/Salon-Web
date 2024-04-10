import React, { useRef, useEffect } from "react";
import { ListData } from "@/components";
import { useGetUsersQuery } from "@api";
import { FadeLoader } from "react-spinners";

export default function () {
  const isFocused = useRef(true);

  const { data, isLoading, refetch } = useGetUsersQuery();
  const users = data?.details?.filter((user) => user?.active) ?? [];

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

  const admins = users?.filter((user) => user?.roles?.includes("Admin"));
  const adminCount = admins?.length;

  const beautician = users?.filter((user) =>
    user?.roles?.includes("Beautician")
  );
  const beauticianCount = beautician?.length;

  const receptionists = users?.filter(
    (user) => user?.roles?.includes("Receptionist") && user?.active === true
  );
  const receptionistCount = receptionists.length;

  const customers = users?.filter((user) => user?.roles?.includes("Customer"));
  const customerCount = customers?.length;

  const inActiveUsers = data?.details?.filter((user) => !user?.active);
  const inActiveUsersCount = inActiveUsers?.length;

  return (
    <>
      {isLoading ? (
        <div className="loader">
          <FadeLoader color="#FFB6C1" loading={true} size={50} />
        </div>
      ) : (
        <>
          <div className="grid w-full grid-flow-col gap-x-4">
            <ListData
              title="Users"
              data={users.length}
              icon="👨‍👩‍👧‍👦"
              id={data?.details?._id}
            />
            <ListData
              title="Admins"
              data={adminCount}
              icon="👨‍💼"
              id={data?.details?._id}
            />
            <ListData
              title="Beauticians"
              data={beauticianCount}
              icon="💇"
              id={data?.details?._id}
            />
            <ListData
              title="Receptionists"
              data={receptionistCount}
              icon="👩‍💼"
              id={data?.details?._id}
            />
            <ListData
              title="Customers"
              data={customerCount}
              icon="👨‍💻"
              id={data?.details?._id}
            />
            <ListData
              title="Pending Employees"
              data={inActiveUsersCount}
              icon="🚷"
              id={data?.details?._id}
            />
          </div>
        </>
      )}
    </>
  );
}
