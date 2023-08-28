import React, { useState } from "react";
import JohnDoe from "@assets/johndoe.png";

export default function () {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.documentElement.classList.toggle("dark", newDarkMode);
  };

  return (
    <>
      <div className="navbar">
        <div className="flex-1">
          <a className="text-xl normal-case btn btn-ghost hover:dark:bg-light-default hover:dark:text-dark-default">
            Lhanlee Salon
          </a>
        </div>
        <div className="flex-none">
          <div className="grid items-center justify-center grid-flow-col-dense gap-4">
            <label className="toggle-switch">
              <input
                type="checkbox"
                className="toggle-checkbox"
                checked={darkMode}
                onChange={toggleDarkMode}
              />
              <div className="toggle-slider"></div>
            </label>
            <div className="dropdown dropdown-end" data-toggle="dropdown">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src={JohnDoe} alt="JohnDoe" />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52 bg-neutral-100 dark:dark:bg-light-default dark:dark:text-dark-default"
              >
                <li className="group-custom">
                  <a className="text-base justify- between group-custom-hover:text-secondary-variant">
                    Profile
                    <span className="group-custom-hover:bg-primary-default badge">
                      New
                    </span>
                  </a>
                </li>
                <li>
                  <a className="text-base hover:text-secondary-variant">
                    Settings
                  </a>
                </li>
                <li>
                  <a className="text-base hover:text-secondary-variant">
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
