import React, { useEffect, useState } from "react";
import SuggestionVideoCard from "./SuggestionVideoCard";
import {
  YOUTUBE_RELATED_VIDEOS_ID_API,
  YOUTUBE_SEARCH_VIDEO_API,
} from "../utils/constants";

const SuggestionVideoContainer = ({ videoId }) => {
  console.log(videoId, "--- ID");

  const [relatedVideoIdList, setRelatedVideoIdList] = useState([]);
  const [relatedVideos, setRelatedVideos] = useState([]);

  console.log(relatedVideoIdList, "RELATED ID LIST");

  /** Get video id list **/
  useEffect(() => {
    getRelatedVideosIdList(videoId);
  }, []);

  const getRelatedVideosIdList = async () => {
    const data = await fetch(YOUTUBE_RELATED_VIDEOS_ID_API(videoId));
    const json = await data.json();
    setRelatedVideoIdList(
      json.items
        ?.map((relatedVideo) => relatedVideo?.id?.videoId)
        .filter((item) => item !== undefined)
    );
  };

  /** Get videos respective to the video id **/
  useEffect(() => {
    getVideos();
  }, [relatedVideoIdList]);

  const getVideos = async () => {
    const data = await fetch(
      YOUTUBE_SEARCH_VIDEO_API(relatedVideoIdList.toString())
    );
    const json = await data.json();
    console.log(json.items, "JSON");
    setRelatedVideos(json.items);
  };

  return (
    <div className="py-4">
      {relatedVideos.map((video) => (
        <SuggestionVideoCard key={video.id} info={video} />
      ))}
    </div>
  );
};

export default SuggestionVideoContainer;
