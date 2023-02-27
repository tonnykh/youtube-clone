import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import { categories } from "../utils/constants";
import SidebarItem from "./SidebarItem";
import { toggleMenu } from "../utils/appSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  const location = useLocation();
  const [focusItem, setFocusItem] = useState("Home");

  // After opening the sidebar, clicking outside of it will result in the sidebar being closed.
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".sidebar") && !event.target.closest(".menu"))
        dispatch(toggleMenu());
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Remove the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  if (!isMenuOpen && location.pathname === "/watch") return;

  const sidebarClasses = `
    sidebar bg-white overflow-y-auto max-h-[calc(100vh_-_3rem)] fixed z-20 drop-shadow-lg pb-4 rounded-r-lg   sm:drop-shadow-none sm:pr-3 sm:pl-1 
    ${isMenuOpen ? "pt-5 px-5 w-[250px]" : "w-0 sm:w-fit"}
    ${location.pathname === "/watch" ? "top-14" : ""}
  `;

  return (
    <div className={sidebarClasses}>
      {categories.map((item) => (
        <div
          key={item.name}
          className={"h-full " + !isMenuOpen ? "w-16" : undefined}
        >
          <Link to="/" onClick={() => setFocusItem(item.name)}>
            <SidebarItem
              icon={item?.icon}
              text={item?.name}
              key={item.name}
              isFocus={focusItem === item?.name}
              isMenuOpen={isMenuOpen}
            />
          </Link>
          {item?.divider && <hr className="border-black/2 my-5 w-52" />}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
