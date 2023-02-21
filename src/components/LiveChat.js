import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LiveMessage from "./LiveMessage";
import { addMessage } from "../utils/chatSlice";
import { faker } from "@faker-js/faker";


const LiveChat = () => {
  const dispatch = useDispatch();

  const chatMessages = useSelector((store) => store.chat.messages);

  useEffect(() => {
    const i = setInterval(() => {
      // API pooling
      console.log("---------API POOLING");
      dispatch(
        addMessage({
          name: faker.name.fullName(),
          message: faker.lorem.sentence(4),
        })
      );
    }, 2000);

    return () => clearInterval(i);
  }, []);

  return (
    <div className="w-full border border-black h-[484px] mt-4 bg-gray-200 overflow-y-scroll flex flex-col-reverse">
      {chatMessages.map((c, index) => (
        <LiveMessage key={index} name={c.name} message={c.message} />
      ))}
    </div>
  );
};

export default LiveChat;
