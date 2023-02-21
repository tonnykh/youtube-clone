import React from "react";

const ChatMessage = ({ name, message }) => {
  return (
    <div className="flex items-center p-2 px-4 shadow-sm">
      <img
        className="w-7"
        src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
        alt="user-profile"
      />
      <span className="font-bold text-sm px-2">{name}</span>
      <span className="text-sm">{message}</span>
    </div>
  );
};

export default ChatMessage;
