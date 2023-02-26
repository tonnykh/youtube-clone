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
    <div className="sm:flex m-4">
      <div className="">
        <img
          src={
            thumbnails?.maxres === undefined
              ? thumbnails?.high?.url
              : thumbnails?.maxres?.url
          }
          alt="thumbnail"
          className="rounded-2xl sm:min-w-[340px] sm:max-w-[340px] hover:shadow-xl "
        />
        <p className=" px-1  top-[-20px] opacity-80 bg-black text-white rounded-sm text-xs font-bold w-max float-right relative right-1">
          {vidDuration(contentDetails.duration)}
        </p>
      </div>
      <div className="px-4 pt-2 text-xs">
        <h2 className="font-bold sm:text-base">{title}</h2>
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
        <div className="flex items-center sm:py-3">
          <img
            className="w-7 h-7 rounded-full mr-2"
            src={channelThumbnail}
            alt="channel-thumbnail"
          />
          <div className="text-xs sm:font-bold">{channelTitle}</div>
        </div>
        <div className="text-xs hidden md:block">
          {snippet.description.slice(0, 110) +
            (snippet.description.length > 110 ? "..." : "")}
        </div>
      </div>
    </div>
  );
};

export default SearchResultVideoCard;
