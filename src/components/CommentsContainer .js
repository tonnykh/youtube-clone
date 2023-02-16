import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { YOUTUBE_COMMENTS_API } from "../utils/constants";

const Comment = ({ data, count }) => {
  if (data === undefined) return;
  const { authorDisplayName, authorProfileImageUrl, textOriginal, likeCount } =
    data;

  return (
    <div className="flex bg-gray-100 rounded-lg py-3 px-5 w-[852px]">
      <img
        className="w-12 h-12 rounded-full"
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
        {count > 0 && (
          <li className="">
            <button className="font-bold text-blue-600 text-sm hover:bg-blue-100 px-3 py-2 rounded-full">
              {count} total replies
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

const CommentList = ({ comments }) => {
  console.log(comments, "COMMENTS");

  return comments.map((comment) => (
    <div key={comment.id} className="mb-2">
      <Comment
        data={comment.snippet.topLevelComment.snippet}
        count={comment?.snippet?.totalReplyCount}
      />
      <div className="pl-4 border-l border-l-black">
        {/* <CommentList comments={comment.replies.comments} /> */}
      </div>
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
