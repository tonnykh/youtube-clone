import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import {
  YOUTUBE_VIDEO_DETAILS_API,
  YOUTUBE_CHANNEL_DETAILS_API,
} from "../utils/constants";
import WatchVideoDescription from "./WatchVideoDescription";
import WatchVideoButtonList from "./WatchVideoButtonList";
import WatchVideoChannelInfo from "./WatchVideoChannelInfo";

const WatchVideoDetailsContainer = () => {
  let [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");
  const [videoDetails, setVideoDetails] = useState();
  const [channelDetails, setChannelDetails] = useState();
  const [isVideoDescriptionVisible, setIsVideoDescriptionVisible] =
    useState(false);

  useEffect(() => {
    getVideoDetails(videoId);
  }, [videoId]);

  const getVideoDetails = async (videoId) => {
    const data = await fetch(YOUTUBE_VIDEO_DETAILS_API(videoId));
    const json = await data.json();
    setVideoDetails(json.items[0]);
  };

  useEffect(() => {
    if (videoDetails !== undefined)
      getChannelDetails(videoDetails?.snippet?.channelId);
  }, [videoDetails]);

  const getChannelDetails = async (channelId) => {
    const data = await fetch(YOUTUBE_CHANNEL_DETAILS_API(channelId));
    const json = await data.json();
    setChannelDetails(json.items[0]);
  };

  if (videoDetails === undefined) return;
  const { snippet, statistics } = videoDetails;
  const { channelTitle, title } = snippet;

  return (
    <div className="px-2">
      <h2 className="font-bold leading-none py-3 text-sm lg:text-lg">
        {title}
      </h2>

      <div className="justify-between items-center">
        <WatchVideoChannelInfo
          channelDetails={channelDetails}
          channelTitle={channelTitle}
        />
        <WatchVideoButtonList statistics={statistics} />
      </div>

      <WatchVideoDescription
        isVideoDescriptionVisible={isVideoDescriptionVisible}
        setIsVideoDescriptionVisible={setIsVideoDescriptionVisible}
        statistics={statistics}
        snippet={snippet}
      />

      <div className="py-6 flex gap-10 items-center">
        <span className="text-base">
          {Number(statistics.commentCount).toLocaleString()} Comments
        </span>
        <span className="text-sm">Sort by</span>
      </div>

      <div className="flex gap-4 mb-8 w-full pl-5">
        <img
          className="w-10 rounded-full"
          src="https://yt3.ggpht.com/a/default-user=s88-c-k-c0x00ffffff-no-rj"
          alt="user-profile"
        />
        <input
          type="text"
          className="border-b border-gray-300 outline-none focus:border-black w-full self-baseline py-1 placeholder:text-gray-600"
          placeholder="Add a comment..."
        />
      </div>
    </div>
  );
};

export default WatchVideoDetailsContainer;
