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
    <div className="flex mx-4">
      {list.map((each) => (
        <Button name={each} key={each} />
      ))}
    </div>
  );
};

export default ButtonList;
