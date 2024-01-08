import React from "react";

export default function (props) {
  const { title, icon, data, id } = props;
  return (
    <div className="mb-4" key={id}>
      <div className="flex justify-between bg-white p-4 rounded-md shadow-md ">
        <div className="flex flex-col items-start">
          <h5 className="text-lg font-semibold">{title}</h5>
          <h2 className="text-2xl font-bold">{data}</h2>
        </div>
        <div className="flex items-center" style={{ fontSize: "3rem" }}>
          {icon}
        </div>
      </div>
    </div>
  );
}