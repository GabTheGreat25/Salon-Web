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

  const onlinecustomers = users?.filter((user) =>
    user?.roles?.includes("Online Customer")
  );
  const onlineCustomerCount = onlinecustomers?.length;

  const walkincustomers = users?.filter((user) =>
    user?.roles?.includes("Walk-in Customer")
  );
  const walkInCustomerCount = walkincustomers?.length;

  const inActiveUsers = data?.details?.filter((user) => !user?.active);
  const inActiveUsersCount = inActiveUsers?.length;

  return (
    <>
      {isLoading ? (
        <div className="loader">
          <FadeLoader color="#FDA7DF" loading={true} size={50} />
        </div>
      ) : (
        <>
          <div className="grid grid-flow-col w-full gap-x-4">
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
              title="Online Customers"
              data={onlineCustomerCount}
              icon="👨‍💻"
              id={data?.details?._id}
            />
            <ListData
              title="Walk In Customers"
              data={walkInCustomerCount}
              icon="🚶"
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
