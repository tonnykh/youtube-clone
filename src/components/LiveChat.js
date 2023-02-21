import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatMessage from "./ChatMessage";
import { addMessage } from "../utils/chatSlice";
import { faker } from "@faker-js/faker";

const LiveChat = () => {
  const [liveMessage, setLiveMessage] = useState("");
  const dispatch = useDispatch();

  const chatMessages = useSelector((store) => store.chat.messages);

  useEffect(() => {
    const i = setInterval(() => {
      // API pooling
      console.log("---------API POOLING");
      dispatch(
        addMessage({
          name: faker.name.fullName(),
          message: faker.lorem.sentence(3),
        })
      );
    }, 2000);

    return () => clearInterval(i);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addMessage({
        name: "Tonny kh",
        message: liveMessage,
      })
    );
    setLiveMessage("");
  };

  return (
    <>
      <div className="w-full border border-black h-[484px] mt-4 bg-gray-200 overflow-y-scroll flex flex-col-reverse">
        {chatMessages.map((c, index) => (
          <ChatMessage key={index} name={c.name} message={c.message} />
        ))}
      </div>
      <form
        className="w-full border border-black py-2"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="flex items-center ml-4">
          <img
            className="w-7"
            src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
            alt="user-profile"
          />
          <span className="font-bold text-sm px-2">Tonny kh</span>
        </div>
        <input
          type="text"
          className="w-2/3 text-sm ml-12 border-b border-b-gray-400 focus:border-b-2 focus:border-blue-500 outline-none"
          value={liveMessage}
          onChange={(e) => setLiveMessage(e.target.value)}
        />
        <button className="bg-gray-900 text-white ml-3 px-2 py-1 rounded-sm text-sm">
          send
        </button>
      </form>
    </>
  );
};

export default LiveChat;
