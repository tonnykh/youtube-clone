import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { numberFormatter, dateDiff } from "../utils/helper";
import {
  YOUTUBE_VIDEO_DETAILS_API,
  YOUTUBE_CHANNEL_DETAILS_API,
} from "../utils/constants";

const WatchVideoDetails = () => {
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
    <div className="w-[900px] px-6">
      <h2 className="font-bold text-lg">{title}</h2>

      <div className="flex justify-between py-3 items-center">
        <div className="flex items-center">
          <img
            className="w-12 h-12 rounded-full mr-4"
            src={channelDetails?.snippet?.thumbnails?.high?.url}
            alt="channel-profile"
          />
          <ul className="pr-6">
            <li className="font-bold">{channelTitle}</li>
            <li className="text-gray-600 text-xs">
              {numberFormatter.format(
                channelDetails?.statistics?.subscriberCount
              )}{" "}
              subscribers
            </li>
          </ul>
          <button className="bg-black text-white px-4 font-bold text-sm rounded-full h-10">
            Subscribe
          </button>
        </div>

        <div className="flex gap-3">
          <div className="flex h-10 relative">
            <button className="bg-gray-100 text-black pr-3 pl-4 font-bold text-sm rounded-l-full">
              👍 {numberFormatter.format(statistics.likeCount)}
            </button>
            <div className="border-l border-gray-300 h-6 right-10 top-2 absolute"></div>
            <button className="bg-gray-100 text-black pl-3 pr-4 font-bold text-sm rounded-r-full">
              👎
            </button>
          </div>
          <button className="bg-gray-100 text-black px-4 py-2 font-bold text-sm rounded-full">
            Share
          </button>
          <button className="bg-gray-100 text-black px-4 py-2 font-bold text-sm rounded-full">
            Download
          </button>
          <button className="bg-gray-100 text-black px-4 py-2 font-bold text-sm rounded-full">
            ···
          </button>
        </div>
      </div>

      <div
        className={
          "bg-gray-100 mt-3 py-3 px-4 rounded-lg relative " +
          (!isVideoDescriptionVisible && "h-32 overflow-hidden pb-8")
        }
      >
        <div className="text-sm font-bold">
          <span className="pr-3">
            {numberFormatter.format(statistics.viewCount)} views
          </span>
          <span>{dateDiff(snippet.publishedAt)}</span>
        </div>
        <div className="text-sm whitespace-pre-line">{snippet.description}</div>
        {!isVideoDescriptionVisible && (
          <button
            className="font-bold text-sm absolute bottom-[0px] w-full bg-gray-100 text-gray-700 text-left pb-2"
            onClick={() => setIsVideoDescriptionVisible(true)}
          >
            Show more
          </button>
        )}

        <button
          className="font-bold text-sm pt-6"
          onClick={() => setIsVideoDescriptionVisible(false)}
        >
          Show less
        </button>
      </div>

      <div className="py-6 flex gap-10 items-center">
        <span className="text-base">
          {Number(statistics.commentCount).toLocaleString()} Comments
        </span>
        <span className="text-sm">Sort by</span>
      </div>

      <div className="flex gap-4 mb-8 w-full pl-5">
        <img
          className="w-12"
          src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
          alt="home"
        />
        <input
          type="text"
          className="border-b border-gray-300 outline-none focus:border-black w-full self-baseline text-sm py-1 placeholder:text-gray-600"
          placeholder="Add a comment..."
        />
      </div>
    </div>
  );
};

export default WatchVideoDetails;
