import React, { useState } from "react";
import LogoLight from "@assets/Logo-Light.png";
import InvertLogoLight from "@assets/Invert-Logo-Light.png";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function () {
  const user = useSelector((state) => state.auth.user);
  const randomIndex =
    user?.image && user?.image.length
      ? Math.floor(Math.random() * user?.image.length)
      : null;

  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.documentElement.classList.toggle("dark", newDarkMode);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logout());
      navigate("/login");
      toast.success("Successfully Log Out", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    } catch (error) {
      toast.error("Error Logging Out", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    }
  };

  const home = () => {
    navigate("/admin");
  };

  const profile = () => {
    navigate("editAdminProfile");
  };

  const products = () => {
    navigate("products");
  };

  const services = () => {
    navigate("services");
  };

  const appointments = () => {
    navigate("appointments");
  };

  const transactions = () => {
    navigate("transactions");
  };

  const users = () => {
    navigate("users");
  };

  const confirmBeautician = () => {
    navigate("confirmBeautician");
  };

  const feedbacks = () => {
    navigate("feedbacks");
  };

  const deliveries = () => {
    navigate("deliveries");
  };

  const comments = () => {
    navigate("comments");
  };

  const dashboard = () => {
    navigate("dashboard");
  };

  const hiring = () => {
    navigate("hiring");
  };

  const brand = () => {
    navigate("brands");
  };

  const times = () => {
    navigate("times");
  };

  const scheduleConfirm = () => {
    navigate("scheduleConfirm");
  };

  return (
    <>
      <div className="navbar">
        <div className="flex-1">
          <span
            onClick={home}
            className="grid items-end justify-start grid-cols-[5%_auto]"
          >
            <img
              src={darkMode ? InvertLogoLight : LogoLight}
              alt="Logo"
              className="cursor-pointer"
            />
            <button className="text-xl normal-case btn btn-ghost hover:bg-transparent">
              Lhanlee Beauty Lounge
            </button>
          </span>
        </div>
        <div className="flex-none">
          <div className="grid items-center justify-center grid-flow-col-dense gap-4">
            <div className="dropdown dropdown-end">
              <label
                tabIndex="0"
                className="text-lg capitalize btn btn-ghost rounded-btn hover:bg-transparent"
              >
                Tables
              </label>
              <ul
                tabIndex="0"
                className="menu dropdown-content z-[1] py-2 px-[.4rem] shadow bg-base-100 rounded-box w-52 mt-4"
              >
                <li>
                  <a
                    onClick={users}
                    className="text-sm hover:bg-dark-default hover:text-light-default dark:bg-light-default dark:text-dark-default hover:dark:bg-dark-default hover:dark:text-light-default"
                  >
                    Users Table
                  </a>
                </li>
                <li>
                  <a
                    onClick={products}
                    className="text-sm hover:bg-dark-default hover:text-light-default dark:bg-light-default dark:text-dark-default hover:dark:bg-dark-default hover:dark:text-light-default"
                  >
                    Products Table
                  </a>
                </li>
                <li>
                  <a
                    onClick={services}
                    className="text-sm hover:bg-dark-default hover:text-light-default dark:bg-light-default dark:text-dark-default hover:dark:bg-dark-default hover:dark:text-light-default"
                  >
                    Services Table
                  </a>
                </li>
                <li>
                  <a
                    onClick={appointments}
                    className="text-sm hover:bg-dark-default hover:text-light-default dark:bg-light-default dark:text-dark-default hover:dark:bg-dark-default hover:dark:text-light-default"
                  >
                    Appointments Table
                  </a>
                </li>
                <li>
                  <a
                    onClick={transactions}
                    className="text-sm hover:bg-dark-default hover:text-light-default dark:bg-light-default dark:text-dark-default hover:dark:bg-dark-default hover:dark:text-light-default"
                  >
                    Transactions Table
                  </a>
                </li>
                <li>
                  <a
                    onClick={comments}
                    className="text-sm hover:bg-dark-default hover:text-light-default dark:bg-light-default dark:text-dark-default hover:dark:bg-dark-default hover:dark:text-light-default"
                  >
                    Comments Table
                  </a>
                </li>
                <li>
                  <a
                    onClick={deliveries}
                    className="text-sm hover:bg-dark-default hover:text-light-default dark:bg-light-default dark:text-dark-default hover:dark:bg-dark-default hover:dark:text-light-default"
                  >
                    Deliveries Table
                  </a>
                </li>
                <li>
                  <a
                    onClick={feedbacks}
                    className="text-sm hover:bg-dark-default hover:text-light-default dark:bg-light-default dark:text-dark-default hover:dark:bg-dark-default hover:dark:text-light-default"
                  >
                    Feedbacks Table
                  </a>
                </li>
                <li>
                  <a
                    onClick={brand}
                    className="text-sm hover:bg-dark-default hover:text-light-default dark:bg-light-default dark:text-dark-default hover:dark:bg-dark-default hover:dark:text-light-default"
                  >
                    Brand Table
                  </a>
                </li>
                <li>
                  <a
                    onClick={times}
                    className="text-sm hover:bg-dark-default hover:text-light-default dark:bg-light-default dark:text-dark-default hover:dark:bg-dark-default hover:dark:text-light-default"
                  >
                    Times Table
                  </a>
                </li>
              </ul>
            </div>
            <label className="swap swap-rotate">
              <input
                type="checkbox"
                className="toggle-checkbox"
                checked={darkMode}
                onChange={toggleDarkMode}
              />
              <svg
                className="w-10 h-10 fill-current swap-on"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>
              <svg
                className="w-10 h-10 fill-current swap-off"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
              </svg>
            </label>
            <div className="dropdown dropdown-end" data-toggle="dropdown">
              <label
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar hover:dark:bg-light-default"
              >
                <div className="w-10 rounded-full">
                  <img
                    src={
                      user?.image && user?.image?.length
                        ? user?.image[randomIndex]?.url
                        : null
                    }
                    alt={user?.image?.originalname}
                    key={user?.image?.public_id}
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52 bg-neutral-100 dark:dark:bg-light-default dark:dark:text-dark-default"
              >
                <li className="group-custom">
                  <a
                    className="justify-between text-base group-custom-hover:text-primary-accent"
                    onClick={profile}
                  >
                    Profile
                    <span className="group-custom-hover:bg-primary-default badge">
                      New
                    </span>
                  </a>
                </li>
                <li className="group-custom">
                  <a
                    className="text-base hover:text-primary-accent"
                    onClick={dashboard}
                  >
                    Charts
                  </a>
                </li>
                <li className="group-custom">
                  <a
                    className="text-base hover:text-primary-accent"
                    onClick={hiring}
                  >
                    Open Hiring
                  </a>
                </li>
                <li className="group-custom">
                  <a
                    className="text-base hover:text-primary-accent"
                    onClick={confirmBeautician}
                  >
                    Hiring Application
                  </a>
                </li>
                <li className="group-custom">
                  <a
                    className="text-base hover:text-primary-accent"
                    onClick={scheduleConfirm}
                  >
                    Leave Application
                  </a>
                </li>
                <li className="group-custom">
                  <a
                    className="text-base hover:text-primary-accent"
                    onClick={handleLogout}
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
