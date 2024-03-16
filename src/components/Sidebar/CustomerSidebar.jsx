import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function () {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const isActiveRoute = (route) =>
    window.location.pathname.includes(`/customer/${route}`);

  const handleGoBack = () => {
    navigate("/customer");
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
            <div className="grid justify-end">
              <FontAwesomeIcon icon={faUserAlt} className="text-lg" />
            </div>
            <div className="grid justify-center">
              <h1 className={`text-lg font-semibold`}>My Account</h1>
            </div>
          </div>
          <NavLink
            to="/customer/EditCustomerProfile"
            className={`pt-2 text-center cursor-pointer font-base ${
              isActiveRoute("EditCustomerProfile")
                ? "text-secondary-default"
                : "text-dark-default dark:text-light-default"
            }`}
          >
            Edit Profile
          </NavLink>
          <NavLink
            to="/customer/changePassword"
            className={`py-2 pl-6 text-center font-base ${
              isActiveRoute("changePassword")
                ? "text-secondary-default"
                : "text-dark-default dark:text-light-default"
            }`}
          >
            Edit Password
          </NavLink>
          <NavLink
            to="/customer/history"
            className={`pb-2 pl-3 text-center font-base ${
              isActiveRoute("history")
                ? "text-secondary-default"
                : "text-dark-default dark:text-light-default"
            }`}
          >
            View History
          </NavLink>
          <NavLink
            to="/customer/comment"
            className={`pb-2 pl-8 text-center font-base ${
              isActiveRoute("comment")
                ? "text-secondary-default"
                : "text-dark-default dark:text-light-default"
            }`}
          >
            View Comment
          </NavLink>
          <NavLink
            to="/customer/schedule"
            className={`pb-2 pl-8 text-center font-base ${
              isActiveRoute("schedule")
                ? "text-secondary-default"
                : "text-dark-default dark:text-light-default"
            }`}
          >
            View Schedule
          </NavLink>
          <div className="grid items-center grid-cols-[10%_auto] gap-x-4">
            <div className="grid justify-end">
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
