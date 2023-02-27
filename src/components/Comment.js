import React from "react";
import { numberFormatter, dateDiff } from "../utils/helper";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { BiCaretDown, BiCaretUp } from "react-icons/bi";

const Comment = ({ data, replyCount, isVisible, setVisibleReply, id }) => {
  if (data === undefined) return;
  
  const {
    authorDisplayName,
    authorProfileImageUrl,
    textOriginal,
    likeCount,
    publishedAt,
  } = data;

  return (
    <div className="flex bg-gray-100 rounded-lg py-3 px-5 ">
      <img
        className={
          replyCount === undefined
            ? "w-8 h-8 rounded-full"
            : "w-10 h-10 rounded-full"
        }
        src={authorProfileImageUrl}
        alt="profile-img"
      />
      <ul className="px-4">
        <li className="flex items-baseline gap-2">
          <span className="font-bold text-sm">{authorDisplayName}</span>
          <span className="text-xs text-gray-600 py-1">
            {dateDiff(publishedAt)}
          </span>
        </li>
        <li className="text-sm py-1 break-all">{textOriginal}</li>
        <li className="text-xs text-gray-600 py-1 flex items-center gap-1">
          <AiOutlineLike className="text-xl text-black" />
          {numberFormatter.format(likeCount)}
          <AiOutlineDislike className="text-xl text-black ml-1 " />
          <span className="pl-4 font-bold text-black text-xs">Reply</span>
        </li>
        {replyCount > 0 && (
          <li className="">
            {isVisible ? (
              <button
                className="font-bold text-blue-600 text-sm hover:bg-blue-100 px-3 py-2 rounded-full flex gap-1"
                onClick={() => setVisibleReply(false)}
              >
                <BiCaretUp className="text-xl" />
                {replyCount} replies
              </button>
            ) : (
              <button
                className="font-bold text-blue-600 text-sm hover:bg-blue-100 px-3 py-2 rounded-full flex gap-1"
                onClick={() => setVisibleReply(id)}
              >
                <BiCaretDown className="text-xl" />
                {replyCount} replies
              </button>
            )}
          </li>
        )}
      </ul>
    </div>
  );
};

export default Comment;
