import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { closeButtonList } from "../utils/appSlice";
import { dateDiff, numberFormatter, vidDuration } from "../utils/helper";

const SearchResultVideoCard = ({ info, channelThumbnail }) => {
  const { snippet, statistics, contentDetails } = info;
  const { channelTitle, title, thumbnails } = snippet;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(closeButtonList());
  });

  return (
    <div className=" m-4">
      <div className="relative">
        <img
          src={
            thumbnails?.maxres === undefined
              ? thumbnails?.high?.url
              : thumbnails?.maxres?.url
          }
          alt="thumbnail"
          className="rounded-2xl h-48 w-[341px] hover:shadow-xl"
        />
        <p className="absolute px-1 right-2 bottom-2 opacity-80 bg-black text-white rounded-sm text-xs font-bold">
          {vidDuration(contentDetails.duration)}
        </p>
      </div>
      <div className="px-4 pt-2 text-xs">
        <h2 className="font-bold">{title}</h2>
        <ul className="">
          <li className="text-gray-600">
            <span> {numberFormatter.format(statistics.viewCount)} views</span>
            <span>
              {" "}
              <span className="font-bold">·</span>{" "}
              {dateDiff(snippet.publishedAt)}
            </span>
          </li>
        </ul>
        <div className="flex items-center">
          <img
            className="w-7 h-7 rounded-full mr-2"
            src={channelThumbnail}
            alt="channel-thumbnail"
          />
          <div className="text-xs">{channelTitle}</div>
        </div>
        {/* <div className="text-xs">
          {snippet.description.slice(0, 110) +
            (snippet.description.length > 110 ? "..." : "")}
        </div> */}
      </div>
    </div>
  );
};

export default SearchResultVideoCard;
