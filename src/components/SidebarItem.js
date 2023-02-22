import React from "react";

const SidebarItem = ({ icon, text, isFocus, isMenuOpen }) => {
  console.log(isMenuOpen, "IS OPEN");

  return (
    <button
      className={
        " items-center hover:bg-gray-100 rounded-xl cursor-pointer flex " +
        (isFocus && "font-bold bg-gray-100 ") +
        (isMenuOpen ? " gap-6 w-52 text-sm p-3 " : " text-xs flex-col gap-2 p-4 inline-block max-w-min w-full px-5")
      }
      //   style={{ overflowWrap: "break-word" }}
    >
      <span className="text-xl">{icon}</span>
      <span className="">{text}</span>
    </button>
  );
};

export default SidebarItem;
