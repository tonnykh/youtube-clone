import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { YOUTUBE_COMMENTS_API } from "../utils/constants";
import CommentList from "./CommentList";

const CommentsContainer = () => {
  const [comments, setComments] = useState([]);
  const [nextToken, setNextToken] = useState("");
  let [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");

  useEffect(() => {
    getComments(videoId);
  }, [videoId]);

  const getComments = async () => {
    const data = await fetch(YOUTUBE_COMMENTS_API(videoId, nextToken));
    const json = await data.json();
    const newComments = [...comments, ...json.items];
    setComments(newComments);
    setNextToken(json.nextPageToken);
  };

  if (comments === undefined) return null;

  return (
    <div className="mx-6">
      <CommentList comments={comments} />
    </div>
  );
};

export default CommentsContainer;
