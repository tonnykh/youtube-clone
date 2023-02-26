import React from "react";
import ButtonList from "./ButtonList";
import VideoContainer from "./VideoContainer";
import { useSelector } from "react-redux";

const MainContainer = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  // console.log(isMenuOpen, "Menu open");

  return (

    <div className={"ml-4 " +
      (isMenuOpen ? "pointer-events-none blur-3xl fixed " : " ")}>
      <ButtonList />
      <VideoContainer />
    </div>
  );
};

export default MainContainer;
