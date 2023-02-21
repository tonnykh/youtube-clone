import React from "react";

const Button = ({ name, index }) => {
  return (
    <>
      <button className={"py-1 px-3 rounded-lg bg-gray-200 m-2 flex-shrink-0 "}>{name}</button>
    </>
  );
};

export default Button;
