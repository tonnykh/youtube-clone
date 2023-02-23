import React from "react";

const Button = ({ name }) => {
  return (
    <>
      <button className={"py-2 px-3 rounded-lg bg-gray-100 m-2 flex-shrink-0 hover:bg-gray-200"}>{name}</button>
    </>
  );
};

export default Button;
