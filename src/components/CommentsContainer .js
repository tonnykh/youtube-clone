import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { YOUTUBE_COMMENTS_API } from "../utils/constants";

const Comment = ({ data, replyCount, isVisible, setVisibleReply, id }) => {
  if (data === undefined) return;
  const { authorDisplayName, authorProfileImageUrl, textOriginal, likeCount } =
    data;

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
        <li className="font-bold text-sm">{authorDisplayName}</li>
        <li className="text-sm py-1">{textOriginal}</li>
        <li className="text-xs text-gray-600 py-1">
          {likeCount} Likes
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

const CommentList = ({ comments }) => {
  console.log(comments, "COMMENTS");
  const [visibleReply, setVisibleReply] = useState("");
  console.log(visibleReply, "VISIBLE REPLY");

  if (comments === undefined) return;

  return comments.map((comment) => (
    <div key={comment.id} className="my-2 ">
      <Comment
        data={
          comment.snippet.topLevelComment !== undefined
            ? comment.snippet.topLevelComment.snippet
            : comment.snippet
        }
        replyCount={comment?.snippet?.totalReplyCount}
        id={comment.id}
        isVisible={visibleReply === comment.id}
        setVisibleReply={setVisibleReply}
      />
      {visibleReply === comment.id && (
        <div className="pl-14 w-[852px]">
          <CommentList comments={comment?.replies?.comments} />
        </div>
      )}
    </div>
  ));
};

const CommentsContainer = () => {
  let [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");

  const [comments, setComments] = useState([]);

  useEffect(() => {
    getComments(videoId);
  }, []);

  const getComments = async () => {
    const data = await fetch(YOUTUBE_COMMENTS_API(videoId));
    const json = await data.json();
    setComments(json.items, "JSON COMMENT");
  };

  if (comments === undefined) return null;

  console.log(comments, "COMMENTS");

  return (
    <div className="mx-6">
      <h1 className="font-bold text-xl py-2">Comments:</h1>
      <CommentList comments={comments} />
    </div>
  );
};

export default CommentsContainer;
