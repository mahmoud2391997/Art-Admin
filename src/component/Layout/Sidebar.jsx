/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { BiSolidShoppingBag } from "react-icons/bi";
import logo from '../../assets/images/logo-light.png'
import { ImUser } from "react-icons/im";
import { IoIosListBox } from "react-icons/io";
import { MdDashboardCustomize } from "react-icons/md";

import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  const menuItem = [
    {
      path: "/",
      name: "Dashboard",
      icon: <MdDashboardCustomize />,
    },
    {
      path: "/users",
      name: "Users",
      icon: <ImUser />,
    },
    {
      path: "/products",
      name: "Products",
      icon: <IoIosListBox />,
    },
    {
      path: "/orders",
      name: "Orders",
      icon: <BiSolidShoppingBag />,
    },
  ];

  return (
    <div className="flex z-40">
      {/* Sidebar */}
      <div
        className={`bg-gray-100 text-[#383838] h-screen fixed transition-all duration-500 ${
          isOpen ? "w-52" : "w-12"
        }`}
      >
        <div className="flex items-center p-3 bg-[#c9ab81]">
          <div className="flex items-center cursor-pointer">
            <img src={logo} onClick={toggle} className="mr-2 w-8" />
            <h1
              onClick={handleLogout}
              className={`text-xl ${isOpen ? "block" : "hidden"}`}
            >
              Login
            </h1>
          </div>
        </div>
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="flex items-center text-[#383838]  p-3 gap-3 transition-all duration-500 hover:text-[#c9ab81]"
          >
            <div className="text-xl">{item.icon}</div>
            <div className={`${isOpen ? "block" : "hidden"}`}>{item.name}</div>
          </NavLink>
        ))}
      </div>

      <div
        className={`flex-grow p-5 ml-${isOpen ? "52" : "12"} overflow-y-auto h-screen`}
      >
        {children}
      </div>
    </div>
  );
};

export default Sidebar;
