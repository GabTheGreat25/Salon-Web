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
    window.location.pathname.includes(`/beautician/${route}`);

  const handleGoBack = () => {
    navigate("/beautician");
  };

  return (
    <>
      <div className="min-h-screen p-4 mt-2 rounded shadow-lg w-72">
        <div className="grid items-center justify-center pt-5">
          <div className="p-4 overflow-hidden font-semibold capitalize xl:text-lg lg:text-base md:text-sm whitespace-nowrap">
            Welcome Back,
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
            to="/beautician/editBeauticianProfile"
            className={`pt-2 text-center cursor-pointer font-base ${
              isActiveRoute("editBeauticianProfile")
                ? "text-primary-default"
                : "text-dark-default dark:text-light-default"
            }`}
          >
            Edit Profile
          </NavLink>
          <NavLink
            to="/beautician/changePassword"
            className={`py-2 pl-6 text-center font-base ${
              isActiveRoute("changePassword")
                ? "text-primary-default"
                : "text-dark-default dark:text-light-default"
            }`}
          >
            Edit Password
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
