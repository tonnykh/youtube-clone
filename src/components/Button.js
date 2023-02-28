import React from "react";

const Button = ({ name }) => {
  return (
    <>
      <button className={"py-1 px-2 rounded-lg bg-gray-100 mx-2 mb-2 flex-shrink-0 hover:bg-gray-200 sm:py2 sm:px-4"}>{name}</button>
    </>
  );
};

export default Button;
