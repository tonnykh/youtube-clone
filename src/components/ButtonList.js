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

  "Bollywood1 Music",
  "Animated1 films",
  "Cricket1",
];

const ButtonList = () => {
  const isButtonListVisible = useSelector(
    (store) => store.app.isButtonListVisible
  );

  if (!isButtonListVisible) return;

  return (
    <div className="mx-4 flex overflow-x-scroll w-[80vw]">
      {list.map((each, index) => (
        <Button name={each} key={each} index={index} />
      ))}
    </div>
  );
};

export default ButtonList;
