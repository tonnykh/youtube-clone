import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import { closeMenu } from "../utils/appSlice";
import SuggestionVideoContainer from "./SuggestionVideoContainer";
import WatchVideoDetails from "./WatchVideoDetailsContainer";
import CommentsContainer from "./CommentsContainer ";
import LiveChat from "./LiveChat";


const WatchPage = () => {
  let [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);

  useEffect(() => {
    dispatch(closeMenu());
  }, [dispatch]);

  return (
    <div className={isMenuOpen ? "pointer-events-none blur-3xl fixed" : " "}>
      <div className="lg:flex lg:justify-center lg:px-12">
        <div className="lg:pr-6 lg:lg:max-w-[820px] ">
          <div className="sticky top-14 sm:static">
            <div className="relative pb-[56%] h-0 md:pb-[calc(43%)] lg:static lg:pb-0 lg:h-full">
              <iframe
                className="absolute w-full h-full md:min-h-[340px] lg:min-h-[415px] lg:static "
                src={
                  "https://www.youtube.com/embed/" +
                  searchParams.get("v") +
                  "?autoplay=1"
                }
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>
          <WatchVideoDetails />
          <CommentsContainer />
        </div>

        <div className="lg:min-w-[350px]">
          <LiveChat />
          <SuggestionVideoContainer />
        </div>
      </div>
    </div>
  );
};

export default WatchPage;
