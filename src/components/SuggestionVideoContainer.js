import React, { useEffect, useState } from "react";
import SuggestionVideoCard from "./SuggestionVideoCard";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  YOUTUBE_RELATED_VIDEOS_ID_API,
  YOUTUBE_SEARCH_VIDEO_API,
} from "../utils/constants";

const SuggestionVideoContainer = () => {
  let [searchParams] = useSearchParams();

  const [relatedVideoIdList, setRelatedVideoIdList] = useState([]);
  const [relatedVideos, setRelatedVideos] = useState([]);

  const [nextToken, setNextToken] = useState("");
  const [page, setPage] = useState(1);

  console.log(relatedVideoIdList, "RELATED ID LIST");

  /** Get video id list **/
  useEffect(() => {
    getRelatedVideosIdList(searchParams.get("v"));
  }, [searchParams]);

  const getRelatedVideosIdList = async () => {
    const data = await fetch(
      YOUTUBE_RELATED_VIDEOS_ID_API(searchParams.get("v"))
    );
      const json = await data.json();
          console.log(json, "JSON");

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
      console.log(json, "JSON");
    setRelatedVideos(json.items);
  };

  return (
    <div className="py-4">
      {relatedVideos.map((video) => (
        <Link key={video?.id} to={"/watch?v=" + video?.id}>
          <SuggestionVideoCard key={video.id} info={video} />
        </Link>
      ))}
    </div>
  );
};

export default SuggestionVideoContainer;
