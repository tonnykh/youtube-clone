import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { numberFormatter, dateDiff } from "../utils/helper";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { RiShareForwardLine } from "react-icons/ri";
import { TfiDownload } from "react-icons/tfi";
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
          <button className="bg-black text-white px-4 font-bold text-sm rounded-full h-10 hover:bg-neutral-800">
            Subscribe
          </button>
        </div>

        <div className="flex gap-3">
          <div className="flex h-10 relative">
            <button className="bg-gray-100 text-black pr-3 pl-4 font-bold text-sm rounded-l-full flex items-center gap-1 hover:bg-gray-200 group relative">
              <AiOutlineLike className="text-xl" />
              {numberFormatter.format(statistics.likeCount)}
              <span className="font-normal invisible group-hover:visible opacity-80 text-xs bg-gray-600 text-white block p-2 rounded-md absolute whitespace-nowrap z-20 -bottom-9 left-3">
                I like this
              </span>
            </button>
            <div className="border-l border-gray-300 h-6 right-[48px] top-2 absolute"></div>
            <button className="bg-gray-100 text-black pl-3 pr-4 font-bold text-sm rounded-r-full hover:bg-gray-200 group relative">
              <AiOutlineDislike className="text-xl -scale-x-100" />
              <span className="font-normal invisible group-hover:visible opacity-80 text-xs bg-gray-600 text-white block p-2 rounded-md absolute whitespace-nowrap z-20 -bottom-9 -left-5">
                I dislike this
              </span>
            </button>
          </div>
          <button className="bg-gray-100 text-black px-4 py-2 font-bold text-sm rounded-full flex items-center gap-2 hover:bg-gray-200 group relative">
            <RiShareForwardLine className="text-xl" />
            Share
            <span className="font-normal invisible group-hover:visible opacity-80 text-xs bg-gray-600 text-white block p-2 rounded-md absolute whitespace-nowrap z-20 -bottom-9 right-6">
              Share
            </span>
          </button>
          <button className="bg-gray-100 text-black px-4 py-2 pl-5 font-bold text-sm rounded-full flex items-center gap-2 hover:bg-gray-200 group relative">
            <TfiDownload className="text-xl" />
            Download
            <span className="font-normal invisible group-hover:visible opacity-80 text-xs bg-gray-600 text-white block p-2 rounded-md absolute whitespace-nowrap z-20 -bottom-9 right-7">
              Download
            </span>
          </button>
          <button className="bg-gray-100 text-black px-[14px] py-2 font-bold text-sm rounded-full hover:bg-gray-200">
            ···
          </button>
        </div>
      </div>

      <div
        className={
          "bg-gray-100 mt-3 py-3 px-4 rounded-lg relative hover:bg-gray-200 group " +
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
            className="font-bold text-sm absolute bottom-[0px] w-full bg-gray-100 text-gray-700 text-left pb-2 group-hover:bg-slate-200 hover:text-black"
            onClick={() => setIsVideoDescriptionVisible(true)}
          >
            Show more
          </button>
        )}

        <button
          className="font-bold text-sm pt-6 hover:text-black"
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
          className="w-10 rounded-full"
          src="https://yt3.ggpht.com/a/default-user=s88-c-k-c0x00ffffff-no-rj"
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
