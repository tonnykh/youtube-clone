import React from "react";

const LiveChatMessage = ({ name, message }) => {
  return (
    <div className="flex items-center py-2 px-4 shadow-md bg-white mb-4 rounded-md">
      <img
        className="w-7"
        src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
        alt="user-profile"
      />
      <div>
        <div className="font-bold text-sm px-2 flex-shrink-0">{name}</div>
        <div className="text-sm px-2">{message}</div>
      </div>
    </div>
  );
};

export default LiveChatMessage;
