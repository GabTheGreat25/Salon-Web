import React from "react";
import { ListData } from "@/components";
import { useGetUsersQuery } from "@api";
import { FadeLoader } from "react-spinners";

export default function () {
  const { data, isLoading } = useGetUsersQuery();
  const users = data?.details?.filter((user) => user?.active) ?? [];

  const admins = users?.filter((user) => user?.roles?.includes("Admin"));
  const adminCount = admins?.length;

  const beautician = users?.filter((user) =>
    user?.roles?.includes("Beautician")
  );
  const beauticianCount = beautician?.length;

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
              title="Customers"
              data={customerCount}
              icon="👨‍💻"
              id={data?.details?._id}
            />
            <ListData
              title="Pending Beauticians"
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
