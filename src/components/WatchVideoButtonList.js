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
  );
};

export default WatchVideoButtonList;
