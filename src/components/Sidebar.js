import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { categories } from "../utils/constants";
import SidebarItem from "./SidebarItem";
import { useDispatch } from "react-redux";
import { toggleMenu } from "../utils/appSlice";

const Sidebar = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  let location = useLocation();
  const [focusItem, setFocusItem] = useState("Home");
  const dispatch = useDispatch();

  console.log(location, "LOCATION")
  console.log(isMenuOpen, "OPEN OR NOT");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".sidebar") && !event.target.closest(".menu"))
        dispatch(toggleMenu());
    };

    if (isMenuOpen && location.pathname === "/watch") {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  if (!isMenuOpen && location.pathname === "/watch") return;
  console.log(categories[0], "CATEGORIES");

  return (
    <div
      className={
        "sidebar bg-white overflow-y-auto h-screen fixed z-20 drop-shadow-lg pb-4 rounded-r-lg  " +
        (isMenuOpen ? " pt-5 px-5 w-[250px] " : " w-0 sm:w-fit") + (
          location.pathname === "/watch" ? "top-14" : ""
        )
      }
    >
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
