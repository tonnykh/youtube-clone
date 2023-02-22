import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toggleMenu, defaultMenuOff } from "../utils/appSlice";
import { YOUTUBE_SEARCH_API } from "../utils/constants";
import { useSelector } from "react-redux";
import { cacheResults } from "../utils/searchSlice";
import { Link } from "react-router-dom";

const Head = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const dispatch = useDispatch();
  const searchCache = useSelector((store) => store.search);
  console.log(searchCache, "CACHE RESULT");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        setSuggestions(searchCache[searchQuery]);
      } else {
        getSearchSuggestions();
      }
    }, 200);
    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const getSearchSuggestions = async () => {
    console.log(searchQuery);
    const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
    const json = await data.json();
    setSuggestions(json[1]);
    //update cache
    dispatch(
      cacheResults({
        [searchQuery]: json[1],
      })
    );
  };

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
    dispatch(defaultMenuOff());
  };

  const handleKeyDown = (e) => {
    console.log(e.key, "KEY");
    if (e.key === "Enter") setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    console.log(suggestion, "SUGGESTION NAME");
    setShowSuggestions(false);
  };

  return (
    <div className="flex h-14 justify-between mx-2 mb-2">
      <div className="flex items-center gap-5 py-3 px-5">
        <img
          onClick={() => toggleMenuHandler()}
          className="menu w-7 cursor-pointer"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAARVBMVEX///8jHyAgHB0OBQgMAAWlpKQpJSaenZ309PUAAAAIAAD8/Pz5+fna2tqop6dvbW1oZmevrq4tKivFxMQYExRiYGC+vr7Dc4WrAAABB0lEQVR4nO3cS3LCMBAFQGIIIBPbhN/9jxqSyiIsTUnlydB9g1eSNV5MvdUKAAAAAAAAAAAAAAAAXtEwvscwDk3yHabSb2Loy/TRIOHUv8XRH+sHHMrSqR6U+hd1jHSE90P8lHC2/Lc0/0vzMy3WMdynxaFBwu+Jv4uh0cQHAAAAAAAAAIB59jG0ijdcT9sYTtcmK0PncumiuJRz/YD7bbf0ut4f3br+GvQt2PblrXrC3WbpUA/6sXrC/GeY/zvM/5aGmofHZiu0S//M/GoVDwAAAAAAAAAAZsjeuRerN1HL7hPy95fm76DNnzD/Lc3/0rxAJ3v+Xn0AAAAAAAAAAAAAAAD4T74AYhs1O+vt3ioAAAAASUVORK5CYII="
          alt="menu"
        ></img>
        <Link to="/">
          <img
            className="h-5 cursor-pointer"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/1200px-YouTube_Logo_2017.svg.png"
            alt="youtube-logo"
          ></img>
        </Link>
      </div>

      <div className="w-[39rem] z-10">
        <form className="flex pt-2 pb-1">
          <input
            className="border w-3/4 rounded-l-full border-r-white pl-4"
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onKeyDown={handleKeyDown}
          />

          <Link to={"result?search_query=" + searchQuery}>
            <button className="self-center border rounded-r-full py-[0.453rem] px-5 bg-gray-50">
              🔍
            </button>
          </Link>
        </form>
        {suggestions.length !== 0 && showSuggestions && (
          <div className="bg-white w-3/4 rounded-xl shadow-lg border border-gray-100 py-3">
            <ul className="">
              {suggestions.map((suggestion) => (
                <Link
                  to={"result?search_query=" + searchQuery}
                  key={suggestion}
                >
                  <li
                    className="py-1 px-4 hover:bg-gray-100"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    🔍 {suggestion}
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="flex py-3 px-6 pr-12">
        <img
          src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
          alt="user"
        ></img>
      </div>
    </div>
  );
};

export default Head;
