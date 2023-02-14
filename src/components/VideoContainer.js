import React, { useEffect, useState } from "react";
import SearchResultVideoCard from "./SearchResultVideoCard";
import {
  YOUTUBE_SEARCH_VIDEO_API,
  YOUTUBE_VIDEOS_API,
} from "../utils/constants";
import VideoCard from "./VideoCard";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { openMenu } from "../utils/appSlice";

const VideoContainer = () => {
  const [videos, setVideos] = useState([]);
  const [videoIdList, setVideoIdList] = useState([]);

  const searchVideos = useSelector((store) => store.video);
  const searchVideosArray = Object.values(searchVideos);

  const dispatch = useDispatch();
  const isMenuClicked = useSelector((store) => store.app.isMenuClicked);

  useEffect(() => {
    !isMenuClicked && dispatch(openMenu());
  });

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

  console.log(searchVideosArray.length, "ARRAY");

  return (
    <div className="flex flex-wrap">
      {searchVideosArray.length !== 0
        ? videos.map((video) => (
            <Link key={video?.id} to={"/watch?v=" + video?.id}>
              <VideoCard info={video} />
            </Link>
          ))
        : videos.map((video) => (
            <SearchResultVideoCard key={video.id} info={video} />
          ))}
    </div>
  );
};

export default VideoContainer;
