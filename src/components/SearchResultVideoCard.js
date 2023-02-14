import React from "react";

const SearchResultVideoCard = ({ info }) => {
  const { snippet, statistics } = info;
  const { channelTitle, title, thumbnails } = snippet;

  return (
    <div className="flex w-[1040px] mx-auto h-48 m-2">
      <img
        src={thumbnails?.maxres?.url}
        alt="thumbnail"
        className="rounded-2xl"
      />
      <div className="px-4">
        <h2 className="font-bold">{title}</h2>
        <ul>
          <li className="text-sm pt-1">{statistics.viewCount} views</li>
        </ul>
        <div className="pt-2 text-sm">{channelTitle}</div>
      </div>
    </div>
  );
};

export default SearchResultVideoCard;
