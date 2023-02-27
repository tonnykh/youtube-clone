import React from "react";
import { useSelector } from "react-redux";
import ButtonList from "./ButtonList";
import VideoContainer from "./VideoContainer";

const MainContainer = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);

  return (
    <div
      className={
        "ml-4 " +
        (isMenuOpen ? "pointer-events-none blur-3xl fixed" : "")
      }
    >
      <ButtonList />
      <VideoContainer />
    </div>
  );
};

export default MainContainer;
