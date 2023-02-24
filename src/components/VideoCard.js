import React from "react";
import { numberFormatter, dateDiff, vidDuration } from "../utils/helper";

const VideoCard = ({ info, channelThumbnail }) => {
  if (info === undefined) return null;
  console.log(info, "INFO");

  const { snippet, statistics, contentDetails } = info;
  const { channelTitle, title, thumbnails } = snippet;

  return (
    <div className="mx-auto my-0 p-2 w-72 hover:shadow-lg rounded-lg relative">
      <img
        className=" rounded-lg"
        src={thumbnails?.maxres?.url !== undefined ? thumbnails?.maxres?.url : thumbnails?.high?.url}
        alt="video-thumbnail"
      />
      <p
        className="absolute px-1 right-3 bottom-[42.5%] opacity-80 bg-black text-white rounded-sm text-xs font-bold"
      >
        {vidDuration(contentDetails.duration)}
      </p>

      <div className="flex pt-3 pb-1">
        <img
          className="w-9 h-9 rounded-full mr-2"
          src={channelThumbnail}
          alt="channel-thumbnail"
        />
        <ul className="text-xs">
          <li className="font-bold leading-[1.2rem] pb-2 text-sm">
            {title.slice(0, 46) + (title.length > 46 ? "..." : "")}
          </li>
          <li className="text-gray-600 pb-1">{channelTitle}</li>
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
