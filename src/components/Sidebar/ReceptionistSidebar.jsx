import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faUserAlt } from "@fortawesome/free-solid-svg-icons";

export default function () {
  const user = useSelector((state) => state.auth.user);

  const isActiveRoute = (route) =>
    window.location.pathname.includes(`/receptionist/${route}`);

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <>
      <div className="min-h-screen p-4 mt-2 rounded shadow-lg w-72">
        <div className="grid items-center justify-center pt-5">
          <div className="p-4 overflow-hidden font-semibold capitalize xl:text-lg md:text-base whitespace-nowrap">
            Welcome Back,{" "}
            {user?.name.length > 10
              ? `${user.name.slice(0, 10)}...`
              : user.name}
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
            to="/receptionist/editReceptionistProfile"
            className={`pt-2 text-center cursor-pointer font-base ${
              isActiveRoute("editReceptionistProfile")
                ? "text-primary-default"
                : "text-dark-default dark:text-light-default"
            }`}
          >
            Edit Profile
          </NavLink>
          <NavLink
            to="/receptionist/changePassword"
            className={`pt-2 pl-6 text-center font-base ${
              isActiveRoute("changePassword")
                ? "text-primary-default"
                : "text-dark-default dark:text-light-default"
            }`}
          >
            Edit Password
          </NavLink>
          <NavLink
            to="/receptionist/leave"
            className={`pt-2 ml-[-.3rem] text-center font-base ${
              isActiveRoute("leave")
                ? "text-primary-default"
                : "text-dark-default dark:text-light-default"
            }`}
          >
            File Leave
          </NavLink>
          <NavLink
            to="/receptionist/editShift"
            className={`pt-2 pb-3 ml-[-.2rem] text-center font-base ${
              isActiveRoute("editShift")
                ? "text-primary-default"
                : "text-dark-default dark:text-light-default"
            }`}
          >
            Edit Leave
          </NavLink>
          <div className="grid items-center grid-cols-[10%_auto] gap-x-3">
            <div className="grid justify-center">
              <FontAwesomeIcon icon={faArrowLeft} className="text-lg" />
            </div>
            <div className="grid justify-start">
              <a
                onClick={handleGoBack}
                className={`text-lg font-light cursor-pointer`}
              >
                Go Back
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
