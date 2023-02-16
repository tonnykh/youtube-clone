const GOOGLE_API_KEY = "AIzaSyBfEgTj9A3C3wkWjaPczrKCZfPi8lcIOnU";

export const YOUTUBE_VIDEOS_API =
  "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=2&regionCode=IN&key=" +
  GOOGLE_API_KEY;

export const YOUTUBE_SEARCH_API =
  "https://cors-anywhere.herokuapp.com/http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=";

export const YOUTUBE_SEARCH_VIDEO_ID_API = (search) =>
  "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&q=" +
  search +
  "&key=" +
  GOOGLE_API_KEY;

export const YOUTUBE_SEARCH_VIDEO_API = (videoIdList) =>
  "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=" +
  videoIdList.toString() +
  "&key=" +
  GOOGLE_API_KEY;

export const YOUTUBE_RELATED_VIDEOS_ID_API = (videoId) =>
  "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=2&relatedToVideoId=" +
  videoId +
  "&type=video&key=" +
  GOOGLE_API_KEY;

// https://youtube.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=PFK4SWZXzlU&type=video&key=AIzaSyAnhd3fd2bt4m5PJjwMJxZLQJmDBrhzoPs

// https://youtube.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=Ks-_Mh1QhMc&type=video&key=[YOUR_API_KEY]
