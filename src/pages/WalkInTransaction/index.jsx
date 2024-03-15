import { React, useState } from "react";
import testImg from "@assets/Customer.png";
import { useGetUsersQuery } from "@api";
import { useNavigate } from "react-router-dom";

export default function () {
  const navigate = useNavigate();
  const { data, isLoading } = useGetUsersQuery();
  const users = data?.details;

  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = users?.filter(
    (user) =>
      user?.roles.includes("Customer") &&
      user?.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="flex flex-col m-2 md:m-12 p-2 max-w-screen-xl mx-auto h-screen rounded-lg bg-primary-default">
      <input
        type="text"
        placeholder="Search by name"
        value={searchQuery}
        onChange={handleSearchChange}
        className="mb-4 p-2 rounded-lg border-none bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-default max-w-md mx-auto" 
        />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredUsers?.map((c) => (
          <div
            key={c?._id}
            className="flex flex-col h-full w-full items-center p-2 bg-white rounded-lg text-black"
          >
            <div className="p-2 m-2">
              {c?.image && c?.image.length > 0 && (
                <img
                  className="rounded-full h-64 w-64"
                  src={c?.image[Math.floor(Math.random() * c?.image.length)]?.url}
                  alt={c?.image.originalname}
                  key={c?._id}
                />
              )}
            </div>
            <div className="mt-2 text-left">
              <h3 className="text-xl font-bold pb-2">Customer Details</h3>
              <p className="font-bold text-base pb-2">
                Customer Name:<span className="ml-1 text-xs">{c?.name}</span>
              </p>
              <p className="font-bold text-base pb-2">
                Customer Age:<span className="ml-1 text-xs">{c?.age}</span>
              </p>
              <p className="font-bold text-base pb-2">
                Mobile Number:<span className="ml-1 text-xs">{c?.contact_number}</span>
              </p>
            </div>
            <div>
              <button
                onClick={() => navigate(`/receptionist/customer/${c?._id}`)}
                className="border-none p-3 text-base font-bold bg-primary-accent rounded-2xl w-full"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}