import React from "react";
import Button from "./Button";

const list = [
  "All",
  "Dan Abramov",
  "React js",
  "Redux",
  "Bundler",
  "Debouncing",
  "Tailwind",
  "Web Developer",
  "Hooks",
  "Component",
  "Akshay Saini OP",
  "npm",
  "Infinite Scroll",
  "Cache",
  "Live chat"
];

const ButtonList = () => {
  const renderButtons = () => {
    return list.map((name, index) => (
      <Button name={name} key={name} index={index} />
    ));
  };

  return (
    <div className="sticky top-[55px] bg-white mr-4 flex overflow-x-scroll w-[calc(100vw_-_20px)] text-sm z-10 sm:w-[calc(100vw_-_30px)] sm:pl-20">
      {renderButtons()}
    </div>
  );
};

export default ButtonList;
