import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeMenu } from "../utils/appSlice";
import { useSearchParams } from "react-router-dom";
import SuggestionVideoContainer from "./SuggestionVideoContainer";
import VideoDetailsContainer from "./VideoDetails";
import CommentsContainer from "./CommentsContainer ";

const WatchPage = () => {
  let [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(closeMenu());
  });

  return (
    <div className="flex px-20 justify-center m">
      <div>
        <iframe
          className="px-6 py-4"
          width="900"
          height="515"
          src={"https://www.youtube.com/embed/" + searchParams.get("v")}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
        <VideoDetailsContainer />
        <CommentsContainer />
      </div>

      <SuggestionVideoContainer />
    </div>
  );
};

export default WatchPage;
