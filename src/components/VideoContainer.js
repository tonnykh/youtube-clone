import React, { useEffect, useState } from "react";
import {
  YOUTUBE_SEARCH_VIDEO_API,
  YOUTUBE_VIDEOS_API,
} from "../utils/constants";
import VideoCard from "./VideoCard";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const VideoContainer = () => {
  const [videos, setVideos] = useState([]);
  const [videoIdList, setVideoIdList] = useState([]);

  const searchVideos = useSelector((store) => store.video);
  const searchVideosArray = Object.values(searchVideos);

  useEffect(() => {
    setVideoIdList(
      searchVideosArray
        .map((searchVideo) => searchVideo?.id?.videoId)
        .filter((item) => item !== undefined)
    );
  }, [searchVideos]);

  useEffect(() => {
    getSearchVideos();
  }, [videoIdList]);


  const getSearchVideos = async () => {
    const data = await fetch(YOUTUBE_SEARCH_VIDEO_API(videoIdList.toString()));
    const json = await data.json();

    setVideos(json.items);
  };


  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async () => {
    const data = await fetch(YOUTUBE_VIDEOS_API);
    const json = await data.json();
    // console.log(json.items);
    setVideos(json.items);
  };

  if (videos === undefined) return null;

  return (
    <div className="flex flex-wrap">
      {videos.map((video) => (
        <Link key={video?.id} to={"/watch?v=" + video?.id}>
          <VideoCard info={video} />{" "}
        </Link>
      ))}
    </div>
  );
};

export default VideoContainer;
