import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { toggleMenu, defaultMenuOff } from "../utils/appSlice";
import { YOUTUBE_SEARCH_API } from "../utils/constants";
import { useSelector } from "react-redux";
import { cacheResults } from "../utils/searchSlice";
import { Link } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { FiBell } from "react-icons/fi";
import { RiVideoAddLine } from "react-icons/ri";
import { IoMdMic } from "react-icons/io";
import { SlMenu } from "react-icons/sl";

const Head = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const dispatch = useDispatch();
  const searchCache = useSelector((store) => store.search);
  console.log(searchCache, "CACHE RESULT");
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);

  const formRef = useRef(null);

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

  /** if click outside the form */
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        formRef.current &&
        !formRef.current.contains(event.target) &&
        !event.target.closest(".suggestion")
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [formRef]);

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
    <div
      className={
        "flex h-14 justify-between mx-2 sticky top-0  bg-white" +
        (isMenuOpen ? "" : " z-10")
      }
    >
      <div className="flex items-center gap-1 py-3">
        <div className="menu text-xs cursor-pointer hover:bg-gray-100 rounded-full p-3">
          <SlMenu
            onClick={() => toggleMenuHandler()}
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAARVBMVEX///8jHyAgHB0OBQgMAAWlpKQpJSaenZ309PUAAAAIAAD8/Pz5+fna2tqop6dvbW1oZmevrq4tKivFxMQYExRiYGC+vr7Dc4WrAAABB0lEQVR4nO3cS3LCMBAFQGIIIBPbhN/9jxqSyiIsTUnlydB9g1eSNV5MvdUKAAAAAAAAAAAAAAAAXtEwvscwDk3yHabSb2Loy/TRIOHUv8XRH+sHHMrSqR6U+hd1jHSE90P8lHC2/Lc0/0vzMy3WMdynxaFBwu+Jv4uh0cQHAAAAAAAAAIB59jG0ijdcT9sYTtcmK0PncumiuJRz/YD7bbf0ut4f3br+GvQt2PblrXrC3WbpUA/6sXrC/GeY/zvM/5aGmofHZiu0S//M/GoVDwAAAAAAAAAAZsjeuRerN1HL7hPy95fm76DNnzD/Lc3/0rxAJ3v+Xn0AAAAAAAAAAAAAAAD4T74AYhs1O+vt3ioAAAAASUVORK5CYII="
            alt="menu"
          />
        </div>
        <Link to="/">
          <img
            className="h-4 cursor-pointer"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/1200px-YouTube_Logo_2017.svg.png"
            alt="youtube-logo"
          ></img>
        </Link>
      </div>

      <div className=" pt-[14.5px] w-2/5  relative">
        <div className="flex items-center gap-2">
          <form
            className="flex border rounded-full focus-within:shadow-lg focus-within:absolute -right-[19%] bottom-[8.5px] bg-white group/item  "
            ref={formRef}
          >
            <div className="flex items-center focus-within:w-52">
              <div className="pl-3 text-xl hidden group-focus-within/item:block ">
                <IoIosSearch />
              </div>
              <input
                className="outline-none ml-3 text-sm w-full"
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                onKeyDown={handleKeyDown}
              />
            </div>

            <Link to={"result?search_query=" + searchQuery}>
              <button className="h-full self-center rounded-r-full border-l px-1 group-focus-within/item:p-2 bg-gray-50 hover:bg-gray-100 relative group">
                <IoIosSearch className="text-xl" />
                <span className="invisible group-hover:visible  opacity-80 text-xs bg-gray-600 text-white block p-2 rounded-md absolute whitespace-nowrap left-[2px] -bottom-[39px]">
                  Search
                </span>
              </button>
            </Link>
          </form>
          <div className="hidden text-xl cursor-pointer hover:bg-gray-100 rounded-full p-3 relative inline-block group">
            <IoMdMic />
            <span className="invisible group-hover:visible opacity-80 text-xs bg-gray-600 text-white block p-2 rounded-md absolute whitespace-nowrap -left-full -bottom-9">
              Search with your voice
            </span>
          </div>
        </div>
        {suggestions.length !== 0 && showSuggestions && (
          <div className="suggestion bg-white rounded-xl shadow-lg border border-gray-100 py-3 w-52 absolute top-12 right-4">
            <ul className="">
              {suggestions.map((suggestion) => (
                <Link
                  to={"result?search_query=" + searchQuery}
                  key={suggestion}
                >
                  <li
                    className="py-1 px-4 hover:bg-gray-100 flex items-center gap-3"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <IoIosSearch className="text-xl" /> {suggestion}
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden text-xl cursor-pointer hover:bg-gray-100 rounded-full p-3 relative group">
          <RiVideoAddLine />
          <span className="invisible group-hover:visible opacity-80 text-xs bg-gray-600 text-white block p-2 rounded-md absolute whitespace-nowrap -left-[2px]  -bottom-9">
            Create
          </span>
        </div>
        <div className="hidden text-xl cursor-pointer hover:bg-gray-100 rounded-full p-3 relative group">
          <FiBell />
          <span className="invisible group-hover:visible opacity-80 text-xs bg-gray-600 text-white block p-2 rounded-md absolute whitespace-nowrap -right-1/2 -bottom-9">
            Notifications
          </span>
        </div>
        <img
          className="w-6"
          src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
          alt="user"
        ></img>
      </div>
    </div>
  );
};

export default Head;
