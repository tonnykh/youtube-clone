import React, { useEffect, useState } from "react";
import { YOUTUBE_VIDEOS_API } from "../utils/constants";
import VideoCard from "./VideoCard";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openMenu } from "../utils/appSlice";

const VideoContainer = () => {
  const [videos, setVideos] = useState([]);
  const dispatch = useDispatch();
  const [nextToken, setNextToken] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(openMenu());
  });

  useEffect(() => {
    getVideos();
  }, [page]);

  const getVideos = async () => {
    const data = await fetch(YOUTUBE_VIDEOS_API(nextToken));
    const json = await data.json();
    setVideos([...videos, ...json.items]);
    setNextToken(json.nextPageToken);
  };

  useEffect(() => {
    function handleScroll() {
      const isBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight;

      if (isBottom) {
        setPage((prevPage) => prevPage + 1);
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (videos === undefined) return null;

  return (
    <div className=" flex-wrap">
      {videos.map((video) => (
        <Link key={video?.id} to={"/watch?v=" + video?.id}>
          <VideoCard info={video} />
        </Link>
      ))}
    </div>
  );
};

export default VideoContainer;
