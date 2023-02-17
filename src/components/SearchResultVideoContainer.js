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
  const [nextToken, setNextToken] = useState("");
  const [page, setPage] = useState(1);
  const [callOnce, setCallOnce] = useState(true);

  console.log(videoIdList, page, "LIST");
  /** Get video Id **/
  useEffect(() => {
    getSearchVideosWithId();
  }, [page]);

  const getSearchVideosWithId = async () => {
    const data = await fetch(
      YOUTUBE_SEARCH_VIDEO_ID_API(searchParams.get("search_query"), nextToken)
    );
    const json = await data.json();
    console.log(json);

    setVideosWithId(json.items);
    setNextToken(json.nextPageToken);
  };

  /** Filter into id list **/
  useEffect(() => {
    filterVideoIdList();
  }, [nextToken]);

  const filterVideoIdList = () => {
    setVideoIdList([
      ...new Set(
        videosWithId
          ?.map((searchVideo) => searchVideo?.id?.videoId)
          .filter((item) => item !== undefined)
      ),
    ]);
  };
  //[...new Set(names)]

  /** Get video with details **/
  useEffect(() => {
    getSearchVideos();
  }, [videoIdList]);

  const getSearchVideos = async () => {
    if (!videoIdList.length) {
      return;
    }
    const data = await fetch(YOUTUBE_SEARCH_VIDEO_API(videoIdList.toString()));
    const json = await data.json();
    console.log(json);
    setSearchVideosResult([...searchVideosResult, ...json.items]);
    // setNextToken(json)
  };

  /** Is bottom ? **/
  useEffect(() => {
    function handleScroll() {
      const isBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;
      if (isBottom) {
        setPage((prevPage) => prevPage + 1);
        // getSearchVideosWithId();
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="pl-16">
      {searchVideosResult.map((video, index) => (
        <Link key={video?.id} to={"/watch?v=" + video?.id}>
          <SearchResultVideoCard info={video} />
        </Link>
      ))}
    </div>
  );
};

export default SearchResultVideoContainer;
