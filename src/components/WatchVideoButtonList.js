import React from "react";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { RiShareForwardLine } from "react-icons/ri";
import { TfiDownload } from "react-icons/tfi";
import { numberFormatter } from "../utils/helper";

const WatchVideoButtonList = ({ statistics }) => {
  return (
    <div className="flex gap-2 text-[10px]">
      <div className="flex ">
        <button className="bg-gray-100 text-black font-bold  rounded-l-full flex items-center px-2 py-1 hover:bg-gray-200 group gap-1 lg:text-sm lg:py-2 lg:px-3">
          <AiOutlineLike className="" />
          {numberFormatter.format(statistics.likeCount)}
        </button>
        <button className="bg-gray-100 text-black font-bold  rounded-r-full hover:bg-gray-200 group  px-2 py-1 lg:text-sm lg:py-2 lg:px-3">
          <AiOutlineDislike className="" />
        </button>
      </div>
      <button className="bg-gray-100 text-black font-bold rounded-full flex items-center gap-1 px-2 py-1 hover:bg-gray-200 group lg:text-sm lg:py-2 lg:px-3">
        <RiShareForwardLine className="" />
        Share
      </button>
      <button className="bg-gray-100 text-black font-bold rounded-full flex items-center hover:bg-gray-200 group  px-2 py-1 gap-1 lg:text-sm lg:py-2 lg:px-3">
        <TfiDownload className="" />
        Download
      </button>
      <button className="bg-gray-100 text-black font-bold rounded-full hover:bg-gray-200 px-2 py-1 lg:text-sm lg:py-2 lg:px-3">
        ···
      </button>
    </div>
  );
};

export default WatchVideoButtonList;
