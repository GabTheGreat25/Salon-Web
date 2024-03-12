import { React } from "react";
import testImg from "@assets/Customer.png";
import { useGetUsersQuery } from "@api";
import { useNavigate } from "react-router-dom";

export default function () {
  const navigate = useNavigate();
  const { data, isLoading } = useGetUsersQuery();
  const users = data?.details;

  const filteredUsers = data?.details?.filter((user) =>
    user?.roles.includes("Customer")
  );

  const randomIndex =
    users?.image && users?.image?.length
      ? Math.floor(Math.random() * users?.image?.length)
      : null;

    //   const customerinfo = (id)=>{
    //     navigate(`/receptionist/customer/${id}`)
    //   }


  return (
    <div className="flex flex-col m-12 ml-5 mr-5 p-5 max-w-screen-xl mx-auto h-screen rounded-lg bg-primary-default">
      <div className="grid grid-cols-4 items-center gap-4">
        {filteredUsers?.map((c) => (
          <div className="flex flex-col h-full w-full items-center p-2 bg-white rounded-lg text-black">
            <div className="p-2 m-2">
              <img
                className="rounded-full h-64 w-64"
                src={randomIndex}
                alt="Customer"
              />
            </div>
            <div className="mt-2 text-left">
              <h3 className="text-2xl font-bold pb-2">Customer Details</h3>
              <p className="font-bold text-base pb-2">
                Customer Name:<span className="ml-1 tex-xs">{c?.name}</span>
              </p>
              <p className="font-bold text-base pb-2">
                Customer Age:<span className="ml-1 tex-xs">{c?.age}</span>
              </p>
              <p className="font-bold text-base pb-2">
                Mobile Number:
                <span span className="ml-1 tex-xs">
                  {c?.contact_number}
                </span>
              </p>
            </div>
            <div>
              <button
              onClick={()=>navigate(`/receptionist/customer/${c?._id}`)}
               className="border-none p-3 text-base font-bold bg-primary-accent rounded-2xl w-full">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
