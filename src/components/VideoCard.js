import React from "react";
import { numberFormatter, dateDiff, vidDuration } from "../utils/helper";

const VideoCard = ({ info, channelThumbnail }) => {
  if (info === undefined) return null;

  const { snippet, statistics, contentDetails } = info;
  const { channelTitle, title, thumbnails } = snippet;

  const getThumbnailUrl = () => {
    if (thumbnails.maxres?.url) {
      return thumbnails.maxres.url;
    }
    return thumbnails.high?.url;
  };

  return (
    <div className="p-2 hover:shadow-lg rounded-lg sm:m-2">
      <img
        className=" rounded-lg "
        src={getThumbnailUrl()}
        alt="video-thumbnail"
      />
      <p className=" px-1  top-[-20px] opacity-80 bg-black text-white rounded-sm text-xs font-bold w-max float-right relative right-1">
        {vidDuration(contentDetails.duration)}
      </p>

      <div className="flex pt-1 pb-1">
        <img
          className="w-9 h-9 rounded-full mr-2"
          src={channelThumbnail}
          alt="channel-thumbnail"
        />
        <ul className="text-xs">
          <li className="font-bold leading-[1.2rem] pb-1 text-sm">
            {title.slice(0, 46) + (title.length > 46 ? "..." : "")}
          </li>
          <li className="text-gray-600">{channelTitle}</li>
          <li className="text-gray-600">
            <span> {numberFormatter.format(statistics.viewCount)} views</span>
            <span>
              <span className="font-bold"> · </span>
              {dateDiff(snippet.publishedAt)}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default VideoCard;
