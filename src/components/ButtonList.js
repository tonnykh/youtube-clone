import React from "react";
import { useSelector } from "react-redux";
import Button from "./Button";

const list = [
  "All",
  "Comedy",
  "Sitcoms",
  "Gaming",
  "News",
  "Live",
  "Wickets",
  "Arijit Singh",
  "Bollywood Music",
  "Animated films",
  "Cricket",
];

const ButtonList = () => {
  const isButtonListVisible = useSelector(
    (store) => store.app.isButtonListVisible
  );

  if (!isButtonListVisible) return;

  return (
    <div className="sticky top-[55px] bg-white mr-4 flex overflow-x-scroll w-[calc(100vw_-_20px)] text-sm relative z-10 sm:w-[calc(100vw_-_30px)] sm:pl-16">
      {list.map((each, index) => (
        <Button name={each} key={each} index={index} />
      ))}
    </div>
  );
};

export default ButtonList;
