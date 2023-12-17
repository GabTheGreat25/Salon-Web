import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAlt } from "@fortawesome/free-solid-svg-icons";

export default function () {
  const user = useSelector((state) => state.auth.user);

  const isActiveRoute = (route) =>
    window.location.pathname.includes(`/admin/${route}`);

  return (
    <>
      <div>
        <div className="h-full p-4 mt-2 rounded shadow-lg w-72">
          <div className="grid items-center justify-center pt-5">
            <div className="p-4 font-semibold capitalize lg:text-base md:text-sm">
              Welcome Back, {user?.name}
            </div>
          </div>
          <hr className="my-4 border-t border-dark-default dark:border-light-default" />
          <div className="grid items-center justify-center grid-flow-row-dense">
            <div className="grid items-center grid-cols-[10%_auto] gap-x-3">
              <div className="grid justify-center">
                <FontAwesomeIcon icon={faUserAlt} className="text-lg" />
              </div>
              <div className="grid justify-center">
                <h1 className={`text-lg font-semibold`}>My Account</h1>
              </div>
            </div>
            <NavLink
              to="/admin/editAdminProfile"
              className={`pt-2 text-center cursor-pointer font-base ${
                isActiveRoute("editAdminProfile")
                  ? "text-primary-default"
                  : "text-dark-default dark:text-light-default"
              }`}
            >
              Edit Profile
            </NavLink>
            <NavLink
              to="/admin/editAdminPassword"
              className={`py-2 pl-6 text-center font-base ${
                isActiveRoute("editAdminPassword")
                  ? "text-primary-default"
                  : "text-dar"
              }`}
            >
              Edit Password
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}
