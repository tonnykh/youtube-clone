import React from "react";
import { numberFormatter } from "../utils/helper";

const WatchVideoChannelInfo = ({ channelDetails, channelTitle }) => {
  return (
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
  );
};

export default WatchVideoChannelInfo;
