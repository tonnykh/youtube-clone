import React, { useEffect, useState } from "react";
import {
  YOUTUBE_VIDEOS_API,
  YOUTUBE_CHANNEL_DETAILS_API,
} from "../utils/constants";
import VideoCard from "./VideoCard";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openMenu } from "../utils/appSlice";

const VideoContainer = () => {
  const [videos, setVideos] = useState([]);
  const dispatch = useDispatch();
  const [nextToken, setNextToken] = useState("");
  const [page, setPage] = useState(1);
  const [channelIdList, setChannelIdList] = useState([]);
  const [channelThumbnailList, setChannelThumbnailList] = useState([]);

  console.log(channelThumbnailList, "ID DETAILS");

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

    setChannelIdList(json.items?.map((video) => video?.snippet?.channelId));

    setNextToken(json.nextPageToken);
  };

  useEffect(() => {
    if (channelIdList.length > 0) {
      getChannelDetails();
    }
  }, [channelIdList]);

  const getChannelDetails = async () => {
    const data = await fetch(
      YOUTUBE_CHANNEL_DETAILS_API(channelIdList.toString())
    );
    const json = await data.json();
    setChannelThumbnailList(
      json.items?.map((channel) => channel?.snippet?.thumbnails?.high?.url)
    );
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

  if (videos === undefined && channelThumbnailList.length === 0) return null;

  return (
    <div className=" flex-wrap">
      {videos.map((video, index) => (
        <Link key={video?.id} to={"/watch?v=" + video?.id}>
          <VideoCard
            info={video}
            channelThumbnail={channelThumbnailList[index]}
          />
        </Link>
      ))}
    </div>
  );
};

export default VideoContainer;
