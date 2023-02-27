import React from "react";
import { useDispatch } from "react-redux";
import { toggleMenu } from "../utils/appSlice";

const SidebarItem = ({ icon, text, isFocus, isMenuOpen }) => {
  const dispatch = useDispatch();

  const getClassName = () => {
    let className =
      "items-center hover:bg-gray-100 rounded-xl cursor-pointer flex";

    if (isFocus) {
      className += " font-bold bg-gray-100";
    }

    if (isMenuOpen) {
      className += " gap-6 w-52 text-sm p-3";
    } else {
      className +=
        " text-xs flex-col gap-2 p-4 inline-block max-w-min w-full px-5";
    }

    return className;
  };

  const handleClick = () => {
    dispatch(toggleMenu());
  };

  return (
    <button className={getClassName()} onClick={handleClick}>
      <span className="text-xl">{icon}</span>
      <span>{text}</span>
    </button>
  );
};

export default SidebarItem;
