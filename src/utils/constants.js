const GOOGLE_API_KEY = "AIzaSyClu2V_22XpCG2GTe1euD35_Mh5bn4eTjA";

export const YOUTUBE_VIDEOS_API =
  "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&key=" +
  GOOGLE_API_KEY;

export const YOUTUBE_SEARCH_API =
  "http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=";

export const YOUTUBE_SEARCH_VIDEO_ID_API = (search) =>
  "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=" +
  search +
  "&key=" +
  GOOGLE_API_KEY;

export const YOUTUBE_SEARCH_VIDEO_API = (videoIdList) =>
  "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=" +
  videoIdList.toString() +
  "&key=" + GOOGLE_API_KEY;
