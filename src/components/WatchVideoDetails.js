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
    <div className="px-2">
      <h2 className="font-bold leading-none py-3 text-sm lg:text-lg">
        {title}
      </h2>

      <div className="justify-between items-center">
        <div className="flex items-center justify-between pb-3">
          <div className="flex gap-1 items-center">
            <img
              className="w-12 h-12 rounded-full "
              src={channelDetails?.snippet?.thumbnails?.high?.url}
              alt="channel-profile"
            />
            <ul className=" ">
              <li className="font-bold text-xs lg:text-base">{channelTitle}</li>
              <li className="text-gray-600 text-[10px] lg:text-xs">
                {numberFormatter.format(
                  channelDetails?.statistics?.subscriberCount
                )}{" "}
                subscribers
              </li>
            </ul>
          </div>
          <button className="bg-black text-white font-bold text-[10px] rounded-full py-1 px-2 hover:bg-neutral-800 lg:text-sm lg:py-2 lg:px-3">
            Subscribe
          </button>
        </div>

        <div className="flex gap-2 text-[10px]">
          <div className="flex ">
            <button className="bg-gray-100 text-black font-bold  rounded-l-full flex items-center px-2 py-1 hover:bg-gray-200 group gap-1 lg:text-sm lg:py-2 lg:px-3">
              <AiOutlineLike className="" />
              {numberFormatter.format(statistics.likeCount)}
              <span className="font-normal invisible group-hover:visible opacity-80 bg-gray-600 text-white block rounded-md absolute whitespace-nowrap z-20 -bottom-9 left-3">
                I like this
              </span>
            </button>
            {/* <div className="border-l border-gray-300 h-4 right-[26px] top-1 absolute"></div> */}
            <button className="bg-gray-100 text-black font-bold  rounded-r-full hover:bg-gray-200 group  px-2 py-1 lg:text-sm lg:py-2 lg:px-3">
              <AiOutlineDislike className="" />
              <span className="font-normal invisible group-hover:visible opacity-80 bg-gray-600 text-white block p-2 rounded-md absolute whitespace-nowrap z-20 -bottom-9 -left-5">
                I dislike this
              </span>
            </button>
          </div>
          <button className="bg-gray-100 text-black font-bold rounded-full flex items-center gap-1 px-2 py-1 hover:bg-gray-200 group lg:text-sm lg:py-2 lg:px-3">
            <RiShareForwardLine className="" />
            Share
            <span className="font-normal invisible group-hover:visible opacity-80 bg-gray-600 text-white block p-2 rounded-md absolute whitespace-nowrap z-20 -bottom-9 right-6">
              Share
            </span>
          </button>
          <button className="bg-gray-100 text-black font-bold rounded-full flex items-center hover:bg-gray-200 group  px-2 py-1 gap-1 lg:text-sm lg:py-2 lg:px-3">
            <TfiDownload className="" />
            Download
            <span className="font-normal invisible group-hover:visible opacity-80 bg-gray-600 text-white block p-2 rounded-md absolute whitespace-nowrap z-20 -bottom-9 right-7">
              Download
            </span>
          </button>
          <button className="bg-gray-100 text-black font-bold rounded-full hover:bg-gray-200 px-2 py-1 lg:text-sm lg:py-2 lg:px-3">
            ···
          </button>
        </div>
      </div>

      <div
        className={
          "bg-gray-100 mt-3 py-3 px-4 rounded-lg relative -z-10 lg:z-10 hover:bg-gray-200 group " +
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
            className="font-bold text-sm absolute bottom-[0px] w-full bg-gray-100 text-gray-700 text-left pb-2 group-hover:bg-slate-200 hover:text-black "
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
