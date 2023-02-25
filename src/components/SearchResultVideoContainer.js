import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import SearchResultVideoCard from "./SearchResultVideoCard";
import {
  YOUTUBE_SEARCH_VIDEO_API,
  YOUTUBE_SEARCH_VIDEO_ID_API,
  YOUTUBE_CHANNEL_DETAILS_API,
} from "../utils/constants";

const SearchResultVideoContainer = () => {
  let [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search_query");
  const [videoIdList, setVideoIdList] = useState([]);
  const [searchVideosResult, setSearchVideosResult] = useState([]);
  const [nextToken, setNextToken] = useState("");
  const [page, setPage] = useState(1);
  const [channelIdList, setChannelIdList] = useState([]);
  const [channelThumbnailList, setChannelThumbnailList] = useState([]);

  console.log(videoIdList, page, "LIST");
  console.log(searchVideosResult, "VIDEO SEARCH RESULTS");

  /** Reset when Search query change **/
  useEffect(() => {
    setSearchVideosResult([]);
    setVideoIdList([]);
    setNextToken("");
    setPage(1);
  }, [searchQuery]);

  /** Get video Id **/
  useEffect(() => {
    getSearchVideosWithId();
    console.log("CALL API -- 1");
  }, [searchQuery, page]);

  const getSearchVideosWithId = async () => {
    const data = await fetch(
      YOUTUBE_SEARCH_VIDEO_ID_API(searchQuery, nextToken)
    );
    const json = await data.json();
    setVideoIdList(
      json.items
        ?.map((searchVideo) => searchVideo?.id?.videoId)
        .filter((item) => item !== undefined)
    );

    setNextToken(json.nextPageToken);
  };

  /** Get video with details **/
  useEffect(() => {
    getSearchVideos();
    console.log("CALL API -- 2");
  }, [videoIdList]);

  const getSearchVideos = async () => {
    const data = await fetch(YOUTUBE_SEARCH_VIDEO_API(videoIdList.toString()));
    const json = await data.json();
    setSearchVideosResult([...searchVideosResult, ...json.items]);
    setChannelIdList(json.items?.map((video) => video?.snippet?.channelId));
  };

  /** channel thumbnail */
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

  /** Is bottom ? **/
  useEffect(() => {
    console.log("CALL API -- 3");

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

  return (
    <div className="">
      {searchVideosResult.map((video, index) => (
        <Link key={video?.id + index} to={"/watch?v=" + video?.id}>
          <SearchResultVideoCard
            info={video}
            channelThumbnail={channelThumbnailList[index]}
          />
        </Link>
      ))}
    </div>
  );
};

export default SearchResultVideoContainer;
