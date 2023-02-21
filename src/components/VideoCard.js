import React from "react";
import { numberFormatter } from "../utils/helper";

const VideoCard = ({ info }) => {
  if (info === undefined) return null;
  console.log(info, "INFO");

  const { snippet, statistics } = info;
  const { channelTitle, title, thumbnails } = snippet;

  return (
    <div className="m-1 p-2 w-72 shadow-lg rounded-lg">
      <img
        className=" rounded-lg"
        src={thumbnails?.maxres?.url}
        alt="video-thumbnail"
      />
      <ul>
        <li className="font-bold py-2 leading-[1.2rem]">{title}</li>
        <li className="text-gray-600 text-sm">{channelTitle}</li>
        <li className="text-gray-600 text-sm">
          {numberFormatter.format(statistics.viewCount)} views
        </li>
        <li className="text-gray-600 text-sm">{snippet.publishedAt}</li>
      </ul>
    </div>
  );
};

export default VideoCard;
