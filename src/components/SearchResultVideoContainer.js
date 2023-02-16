import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import SearchResultVideoCard from "./SearchResultVideoCard";
import {
  YOUTUBE_SEARCH_VIDEO_API,
  YOUTUBE_SEARCH_VIDEO_ID_API,
} from "../utils/constants";

const SearchResultVideoContainer = () => {
  let [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search_query");
  const [videosWithId, setVideosWithId] = useState([]);
  const [videoIdList, setVideoIdList] = useState([]);
  const [searchVideosResult, setSearchVideosResult] = useState([]);

  console.log(videoIdList);
  /** Get video Id **/
  useEffect(() => {
    getSearchVideosWithId();
  }, [searchQuery]);

  const getSearchVideosWithId = async () => {
    const data = await fetch(
      YOUTUBE_SEARCH_VIDEO_ID_API(searchParams.get("search_query"))
    );
    const json = await data.json();
    setVideosWithId(json.items);
  };

  /** Filter into id list **/
  useEffect(() => {
    filterVideoIdList();
  }, [videosWithId]);

  const filterVideoIdList = () => {
    setVideoIdList(
      videosWithId
        ?.map((searchVideo) => searchVideo?.id?.videoId)
        .filter((item) => item !== undefined)
    );
  };

  /** Get video with details **/
  useEffect(() => {
    getSearchVideos();
  }, [videoIdList]);

  const getSearchVideos = async () => {
    const data = await fetch(YOUTUBE_SEARCH_VIDEO_API(videoIdList.toString()));
    const json = await data.json();
    setSearchVideosResult(json.items);
  };

  return (
    <div className="pl-16">
      {searchVideosResult.map((video) => (
        <Link key={video?.id} to={"/watch?v=" + video?.id}>
          <SearchResultVideoCard key={video.id} info={video} />
        </Link>
      ))}
    </div>
  );
};

export default SearchResultVideoContainer;
