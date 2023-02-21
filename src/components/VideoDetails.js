import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { numberFormatter, dateDiff } from "../utils/helper";
import {
  YOUTUBE_VIDEO_DETAILS_API,
  YOUTUBE_CHANNEL_DETAILS_API,
} from "../utils/constants";

const VideoDetails = () => {
  let [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");

  const [videoDetails, setVideoDetails] = useState();
  const [channelDetails, setChannelDetails] = useState();

  console.log(videoDetails, "DETAILS");

  useEffect(() => {
    getVideoDetails(videoId);
  }, [videoId]);

  const getVideoDetails = async (videoId) => {
    const data = await fetch(YOUTUBE_VIDEO_DETAILS_API(videoId));
    const json = await data.json();
    console.log(json.items[0], "JSON");
    setVideoDetails(json.items[0]);
  };

  useEffect(() => {
    if (videoDetails !== undefined)
      getChannelDetails(videoDetails?.snippet?.channelId);
  }, [videoDetails]);

  const getChannelDetails = async (channelId) => {
    const data = await fetch(YOUTUBE_CHANNEL_DETAILS_API(channelId));
    const json = await data.json();
    setChannelDetails(json.items[0]);
  };

  if (videoDetails === undefined) return;
  const { snippet, statistics } = videoDetails;
  const { channelTitle, title } = snippet;
  return (
    <div className="w-[900px] px-6">
      <h2 className="font-bold text-lg">{title}</h2>
      <ul>
        <li className="font-bold text-sm">{channelTitle}</li>
        <li className="text-gray-600 text-sm">
          {numberFormatter.format(channelDetails?.statistics?.subscriberCount)} subscribers
        </li>
      </ul>
      <div className="text-sm font-bold">
        {numberFormatter.format(statistics.viewCount)} views
      </div>
      <div>{dateDiff(snippet.publishedAt)}</div>
      <div>{numberFormatter.format(statistics.likeCount)} Likes</div>

      <div className="text-base font-bold py-2">
        {Number(statistics.commentCount).toLocaleString()} Comments :
      </div>
    </div>
  );
};

export default VideoDetails;
