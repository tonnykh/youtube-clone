import React from "react";
import { numberFormatter, dateDiff } from "../utils/helper";

const WatchVideoDescription = ({
  isVideoDescriptionVisible,
  setIsVideoDescriptionVisible,
  statistics,
  snippet,
}) => {
  return (
    <div
      className={
        "bg-gray-100 mt-3 py-3 px-4 rounded-lg relative -z-10 lg:z-10 hover:bg-gray-200 group " +
        (!isVideoDescriptionVisible && "h-32 overflow-hidden pb-8")
      }
    >
      <div className="text-sm font-bold">
        <span className="pr-3">
          {numberFormatter.format(statistics.viewCount)} views
        </span>
        <span>{dateDiff(snippet.publishedAt)}</span>
      </div>
      <div className="text-sm whitespace-pre-line">{snippet.description}</div>
      {!isVideoDescriptionVisible && (
        <button
          className="font-bold text-sm absolute bottom-[0px] w-full bg-gray-100 text-gray-700 text-left pb-2 group-hover:bg-slate-200 hover:text-black "
          onClick={() => setIsVideoDescriptionVisible(true)}
        >
          Show more
        </button>
      )}

      <button
        className="font-bold text-sm pt-6 hover:text-black"
        onClick={() => setIsVideoDescriptionVisible(false)}
      >
        Show less
      </button>
    </div>
  );
};

export default WatchVideoDescription;
