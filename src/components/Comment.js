import React from "react";
import { numberFormatter, dateDiff } from "../utils/helper";

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
    <div className="flex bg-gray-100 rounded-lg py-3 px-5 max-w-[852px]">
      <img
        className={
          replyCount === undefined
            ? "w-8 h-8 rounded-full"
            : "w-12 h-12 rounded-full"
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
        <li className="text-sm py-1">{textOriginal}</li>
        <li className="text-xs text-gray-600 py-1">
          {numberFormatter.format(likeCount)} Likes
          <span className="pl-4 font-bold text-black text-xs">Reply</span>
        </li>
        {replyCount > 0 && (
          <li className="relative top-[5px]">
            {isVisible ? (
              <button
                className="font-bold text-blue-600 text-sm hover:bg-blue-100 px-3 py-2 rounded-full"
                onClick={() => setVisibleReply(false)}
              >
                {replyCount} replies close
              </button>
            ) : (
              <button
                className="font-bold text-blue-600 text-sm hover:bg-blue-100 px-3 py-2 rounded-full"
                onClick={() => setVisibleReply(id)}
              >
                {replyCount} replies see
              </button>
            )}
          </li>
        )}
      </ul>
    </div>
  );
};

export default Comment;
