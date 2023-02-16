import React from "react";

const SuggestionVideoCard = ({ info }) => {
  const { snippet, statistics } = info;
  const { channelTitle, title, thumbnails } = snippet;

  return (
    <div className="flex w-96 h-28 mb-4">
      <img
        className="rounded-lg"
        src={thumbnails?.maxres?.url}
        alt="video-thumbnail"
      />
      <ul className="pl-2">
        <li className="font-bold pb-2 leading-[1.2rem] text-sm">{title}</li>
        <li className="text-gray-600 text-xs">{channelTitle}</li>
        <li className="text-gray-600 text-xs">{statistics.viewCount} views</li>
      </ul>
    </div>
  );
};

export default SuggestionVideoCard;
