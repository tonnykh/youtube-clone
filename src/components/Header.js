import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { toggleMenu, defaultMenuOff } from "../utils/appSlice";
import { FiBell } from "react-icons/fi";
import { RiVideoAddLine } from "react-icons/ri";
import { SlMenu } from "react-icons/sl";
import { AiFillGithub } from "react-icons/ai";
import ytLogo from "../assets/img/yt-logo.png";
import menuImg from "../assets/img/menu.png";
import userIcon from "../assets/img/user-icon.png";
import SearchContainer from "./SearchContainer";
import { GITHUB_LINK } from "../utils/constants";

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
        "flex h-14 justify-between px-2 sticky top-0 z-20 bg-white sm:px-4 sm:mb-2 sm:pr-6" +
        (isMenuOpen ? "" : " z-10")
      }
    >
      <div className="flex items-center gap-2 py-3 ">
        <div
          className="menu text-xs md:text-base cursor-pointer hover:bg-gray-100 rounded-full p-3 "
          onClick={() => toggleMenuHandler()}
        >
          <SlMenu src={menuImg} />
        </div>
        <Link to="/">
          <img
            className="h-4 cursor-pointer md:h-5 md:pl-2"
            src={ytLogo}
            alt="youtube-logo"
          ></img>
        </Link>
      </div>

      <SearchContainer />

      <div className="flex items-center gap-1 sm:gap-2 md:gap-4">
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
        <Link to={GITHUB_LINK} target="_blank" rel="noopener noreferrer">
          <div className=" relative group">
            <AiFillGithub className="text-3xl transition hover:rotate-[360deg] hover:ease-in hover:duration-500  hover:scale-150 cursor-pointer hover:text-gray-700" />
            <span className="invisible group-hover:visible opacity-80 text-xs bg-gray-600 text-white block p-2 rounded-md absolute whitespace-nowrap -right-1/2 -bottom-9">
              Created by Tonny kh © 2023
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
