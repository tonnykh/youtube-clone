 const GOOGLE_API_KEY = "AIzaSyAJDO7pPLuGWnR_cPcVBYrQoMKg9VuJ7nI";


export const LIVE_CHAT_COUNT = 10;



export const YOUTUBE_VIDEOS_API = (nextToken) =>
  "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&pageToken=" +
  nextToken +
  "&maxResults=3&regionCode=IN&key=" +
  GOOGLE_API_KEY;

export const YOUTUBE_SEARCH_API =
  "https://cors-anywhere.herokuapp.com/http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=";

export const YOUTUBE_SEARCH_VIDEO_ID_API = (search, nextToken) =>
  // "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=" +
  // search +
  // "&pageToken=" +
  // nextToken +
  // "&key=" +
  // GOOGLE_API_KEY;
"https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=" + search + "&pageToken=" + nextToken + "&type=video&fields=items%28id%28videoId%29%2C+snippet%28description%29%29%2CnextPageToken%2CpageInfo&key=" + GOOGLE_API_KEY;

//https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=HXwPcfH1Ejw,a5e7yEhbGhk,nmnaI3TGtBo,nbfWVn9waM8,GKj9rDXZDn8&key=AIzaSyATlF26iF-kjV4MgmcSCtZpAJDyrHFe_J8

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

export const YOUTUBE_VIDEO_DETAILS_API = (videoId) =>
  "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=" +
  videoId +
  "&key=" +
  GOOGLE_API_KEY;

export const YOUTUBE_CHANNEL_DETAILS_API = (channelId) =>
  "https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=" +
  channelId +
  "&key=" +
  GOOGLE_API_KEY;

export const YOUTUBE_COMMENTS_API = (videoId, nextToken) =>
  "https://www.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&order=relevance&videoId=" +
  videoId +
  "&pageToken=" +
  nextToken +
  "&prettyPrint=true&key=" +
  GOOGLE_API_KEY;

//https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=_VB39Jo8mAQ&key=AIzaSyClu2V_22XpCG2GTe1euD35_Mh5bn4eTjA

//https://www.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&order=relevance&videoId=VQCfbmhIjzo&prettyPrint=true&key=AIzaSyDLuS3H9JYoVeVdfKizmtIC0py-QF4Z80s


// https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=cat&pageToken=CB4QAA&type=video&fields=items%28id%28videoId%29%2C+snippet%28description%29%29%2CnextPageToken&key=AIzaSyDLuS3H9JYoVeVdfKizmtIC0py-QF4Z80s

// https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=cat&type=video&fields=items%28id%28videoId%29%2C+snippet%28description%29%29%2CnextPageToken%2CpageInfo&key=AIzaSyDLuS3H9JYoVeVdfKizmtIC0py-QF4Z80s