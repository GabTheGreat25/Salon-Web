import React from "react";
import { ListData } from "@/components";
import { useGetUsersQuery } from "@api";
import { FadeLoader } from "react-spinners";

export default function () {
  const { data, isLoading, isError } = useGetUsersQuery();
  const users = data?.details ?? [];
  const usersCount = users.length;
  const admins = users?.filter((user) => user?.roles?.includes("Admin"));
  const adminCount = admins.length;
  const beautician = users?.filter((user) => user?.roles?.includes("Beautician"));
  const beauticianCount = beautician.length;
  const onlinecustomers = users?.filter((user) => user?.roles?.includes("Online Customer"));
  const onlineCustomerCount = onlinecustomers.length;
  const walkincustomers = users?.filter((user) => user?.roles?.includes("Online Customer"));
  const walkInCustomerCount = walkincustomers.length;

  return (
    <>
      {isLoading ? (
        <div className="loader">
          <FadeLoader color="#FDA7DF" loading={true} size={50} />
        </div>
      ) : !data ? null : (
        <>
          <div className="grid grid-flow-row gap-x-4">
            <ListData
              title="Users"
              data={usersCount}
              icon="👨‍👩‍👧‍👦"
              id={data?.details?._id}
            />
            <ListData
              title="Admin"
              data={adminCount}
              icon="👨‍💻"
              id={data?.details?._id}
            />
            <ListData
              title="Beauticians"
              data={beauticianCount}
              icon="👨‍💼"
              id={data?.details?._id}
            />
            <ListData
              title="Online Customer"
              data={onlineCustomerCount}
              icon="👨‍🔧"
              id={data?.details?._id}
            />
            <ListData
              title="Walk In Customer"
              data={walkInCustomerCount}
              icon="👨‍🔧"
              id={data?.details?._id}
            />
          </div>
        </>
      )}
    </>
  );
}