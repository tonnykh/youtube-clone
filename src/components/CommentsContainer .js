import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { YOUTUBE_COMMENTS_API } from "../utils/constants";
import CommentList from "./CommentList";

const CommentsContainer = () => {
  let [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");
  const [comments, setComments] = useState([]);
  const [nextToken, setNextToken] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    getComments(videoId);
  }, [videoId, page]);

  const getComments = async () => {
    const data = await fetch(YOUTUBE_COMMENTS_API(videoId, nextToken));
    const json = await data.json();
    const newComments = [...comments, ...json.items];
    setComments(newComments);
    setNextToken(json.nextPageToken);
  };

  // useEffect(() => {
  //   function handleScroll() {
  //     const isBottom =
  //       window.innerHeight + window.scrollY >=
  //       document.documentElement.scrollHeight;
  //     if (isBottom) {
  //       setPage((prevPage) => prevPage + 1);
  //     }
  //   }
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  if (comments === undefined) return null;

  return (
    <div className="mx-6">
      <CommentList comments={comments} />
    </div>
  );
};

export default CommentsContainer;
