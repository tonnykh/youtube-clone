import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../utils/chatSlice";
import { faker } from "@faker-js/faker";
import LiveChatMessage from "./LiveChatMessage";

const LiveChatList = () => {
  const chatMessages = useSelector((store) => store.chat.messages);

  return (
    <div className="w-full h-[350px] bg-gray-100 overflow-y-scroll flex flex-col-reverse px-2">
      {chatMessages.map((c, index) => (
        <LiveChatMessage key={index} name={c.name} message={c.message} />
      ))}
    </div>
  );
};

const LiveChatInput = () => {
  const [liveMessage, setLiveMessage] = useState("");
  const dispatch = useDispatch();

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
    <form
      className="w-full py-4 bg-gray-100 px-2"
      onSubmit={(e) => handleSubmit(e)}
    >
      <div className="flex items-center ml-4">
        <img
          className="w-7"
          src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
          alt="user-profile"
        />
        <span className="font-bold text-sm px-2">Tonny kh 🚀</span>
      </div>
      <input
        type="text"
        className="w-2/3 ml-7 border border-gray-200 px-3 py-2 rounded-full"
        placeholder="Say something..."
        value={liveMessage}
        onChange={(e) => setLiveMessage(e.target.value)}
      />
      <button className="bg-gray-100 border border-gray-300  text-black ml-1 px-2 py-2 rounded-full font-bold hover:bg-gray-200 hover:border-gray-200">
        send
      </button>
    </form>
  );
};

const LiveChat = () => {
  const [isLiveMessageVisible, setIsLiveMessageVisible] = useState(true);
  const dispatch = useDispatch();

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
    }, 1500);

    return () => clearInterval(i);
  }, []);

  const handleChatDisplay = () => {
    setIsLiveMessageVisible(!isLiveMessageVisible);
  };

  return (
    <>
      {isLiveMessageVisible ? (
        <div className=" rounded-xl mt-4 bg-gray-100 ">
          <div className="text-center py-2 font-bold border-b border-gray-300 mx-5">
            Live Chat
          </div>
          <div className="px-5">
            <LiveChatList />
            <LiveChatInput />
          </div>
          <button
            className="block w-full rounded-b-xl font-bold text-sm border-t-[1px] border-t-gray-200 py-3 hover:bg-gray-200 hover:border-gray-100"
            onClick={() => handleChatDisplay()}
          >
            Hide chat
          </button>
        </div>
      ) : (
        <button
          className="border border-gray-200 block w-full rounded-full font-bold text-sm py-2 hover:bg-gray-100 hover:border-gray-100"
          onClick={() => handleChatDisplay()}
        >
          Show chat
        </button>
      )}
    </>
  );
};

export default LiveChat;
