import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toggleMenu, defaultMenuOff } from "../utils/appSlice";
import { FiBell } from "react-icons/fi";
import { RiVideoAddLine } from "react-icons/ri";
import { SlMenu } from "react-icons/sl";
import ytLogo from "../assets/img/yt-logo.png";
import menuImg from "../assets/img/menu.png";
import userIcon from "../assets/img/user-icon.png";
import SearchContainer from "./SearchContainer";

const Header = () => {
  const dispatch = useDispatch();
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
    dispatch(defaultMenuOff());
  };

  return (
    <div
      className={
        "flex h-14 justify-between px-2 sticky top-0 z-20 bg-white" +
        (isMenuOpen ? "" : " z-10")
      }
    >
      <div className="flex items-center gap-1 py-3">
        <div className="menu text-xs cursor-pointer hover:bg-gray-100 rounded-full p-3 ">
          <SlMenu
            onClick={() => toggleMenuHandler()}
            src={menuImg}
          />
        </div>
        <Link to="/">
          <img
            className="h-4 cursor-pointer"
            src={ytLogo}
            alt="youtube-logo"
          ></img>
        </Link>
      </div>

      <SearchContainer />

      <div className="flex items-center gap-1">
        <div className="hidden sm:block text-xl cursor-pointer hover:bg-gray-100 rounded-full p-3 relative group">
          <RiVideoAddLine />
          <span className="invisible group-hover:visible opacity-80 text-xs bg-gray-600 text-white block p-2 rounded-md absolute whitespace-nowrap -left-[2px]  -bottom-9">
            Create
          </span>
        </div>
        <div className="hidden sm:block text-xl cursor-pointer hover:bg-gray-100 rounded-full p-3 relative group">
          <FiBell />
          <span className="invisible group-hover:visible opacity-80 text-xs bg-gray-600 text-white block p-2 rounded-md absolute whitespace-nowrap -right-1/2 -bottom-9">
            Notifications
          </span>
        </div>
        <img
          className="w-6 sm:mx-3 "
          src={userIcon}
          alt="user profile icon"
        ></img>
      </div>
    </div>
  );
};

export default Header;
