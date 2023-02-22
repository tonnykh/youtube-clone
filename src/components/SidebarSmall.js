import React from "react";

const SidebarItem = ({ name }) => {
  return (
    <div className="py-4 hover:bg-gray-200 text-[10px] rounded-xl flex flex-col items-center gap-1">
      <img
        className="w-7"
        src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
        alt="home"
      />
      {name}
    </div>
  );
};

const sidebarItemNames = ["Home", "Shorts", "Subscriptions", "Library"];

const SidebarSmall = () => {
  return (
    <div className="flex flex-col ml-2 ">
      {/* {sidebarItemNames.map((name) => (
          <SidebarItem name={name} key={name} />
      ))} */}
    </div>
  );
};

export default SidebarSmall;
