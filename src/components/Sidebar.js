import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { categories } from "../utils/constants";
import SidebarItem from "./SidebarItem";
import SidebarSmall from "./SidebarSmall";

const Sidebar = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  let location = useLocation();
  const [focusItem, setFocusItem] = useState("Home");

  // if (!isMenuOpen && location.pathname === "/") return <SidebarSmall />;
  // if (!isMenuOpen) return;
  console.log(categories[0], "CATEGORIES");

  return (
    <div className={" bg-white " + (isMenuOpen ? " pt-2 px-5" : " pl-[10px] pt-1")}>
      {categories.map((item) => (
        <div key={item.name} className={!isMenuOpen && "w-16"}>
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
