import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { categories } from "../utils/constants";
import SidebarItem from "./SidebarItem";
import SidebarSmall from "./SidebarSmall";
import { useDispatch } from "react-redux";
import { toggleMenu } from "../utils/appSlice";

const Sidebar = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  let location = useLocation();
  const [focusItem, setFocusItem] = useState("Home");
  const dispatch = useDispatch();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".sidebar") && !event.target.closest(".menu"))
        dispatch(toggleMenu());
    };

    if (isMenuOpen) {
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
        "sidebar bg-white " + (isMenuOpen ? " pt-2 px-5" : " pl-[10px] pt-1")
      }
    >
      {categories.map((item) => (
        <div key={item.name} className={!isMenuOpen ? "w-16" : undefined}>
          <Link to="/" onClick={() => setFocusItem(item.name)}>
            <SidebarItem
              icon={item?.icon}
              text={item?.name}
              key={item.name}
              isFocus={focusItem === item?.name}
              isMenuOpen={isMenuOpen}
            />
          </Link>
          {item?.divider && <hr className="border-black/2 my-5" />}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
