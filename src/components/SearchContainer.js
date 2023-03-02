import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { YOUTUBE_SEARCH_API } from "../utils/constants";
import { cacheResults } from "../utils/searchSlice";
import { IoIosSearch, IoMdMic } from "react-icons/io";
import SearchInput from "./SearchInput";
import SuggestionsDropdown from "./SuggestionsDropdown";

const SearchContainer = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const dispatch = useDispatch();
  const searchCache = useSelector((store) => store.search);
  const searchFormRef = useRef(null);

  // Fetches search suggestions and updates the cache
  const getSearchSuggestions = async () => {
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

  /**
   * Make an API call after every key press
   * Applying Debouncing with 200ms
   *    - if difference between 2 key strokes is :
   *        - less than < 200ms - DECLINE API call
   *        - more than > 200ms - make an API call if the searchQuery is not available at searchCache.
   **/

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("API");
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

  // Close the suggestion dropdown if the user clicks outside the search input form
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        searchFormRef.current &&
        !searchFormRef.current.contains(event.target) &&
        !event.target.closest(".suggestion")
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [searchFormRef]);

  // Close the suggestion dropdown if the user clicks "Enter" in the search input form
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setShowSuggestions(false);
      setTimeout(() => {
        e.target.blur();
      }, 100);
    }
  };

  const onBlur = () => {
    setTimeout(() => {
      setShowSuggestions(false);
    }, 100);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className=" pt-[14.5px] sm:py-[6.5px] w-2/5  relative">
      <div className="flex items-center gap-2 sm:justify-center group/item  ">
        <form
          className="flex border rounded-full focus-within:shadow-lg focus-within:absolute -right-[19%] bottom-[8.5px] bg-white focus-within:md:right-[0px]"
          ref={searchFormRef}
        >
          <SearchInput
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setShowSuggestions={setShowSuggestions}
            handleKeyDown={handleKeyDown}
            onBlur={onBlur}
          />
          <Link to={"result?search_query=" + searchQuery}>
            <button className="h-full self-center rounded-r-full border-l px-1 group-focus-within/item:p-2 bg-gray-50 hover:bg-gray-100 relative group md:px-3">
              <IoIosSearch className="text-xl" />
              <span className="invisible group-hover:visible  opacity-80 text-xs bg-gray-600 text-white block p-2 rounded-md absolute whitespace-nowrap left-[2px] -bottom-[39px]">
                Search
              </span>
            </button>
          </Link>
        </form>
        <div className="hidden sm:block text-xl cursor-pointer hover:bg-gray-100 rounded-full p-3 relative  group sm:group-focus-within/item:hidden ">
          <IoMdMic />
          <span className="invisible group-hover:visible opacity-80 text-xs bg-gray-600 text-white block p-2 rounded-md absolute whitespace-nowrap -left-full -bottom-9">
            Search with your voice
          </span>
        </div>
      </div>
      {suggestions.length !== 0 && showSuggestions && (
        <SuggestionsDropdown
          suggestions={suggestions}
          searchQuery={searchQuery}
          handleSuggestionClick={handleSuggestionClick}
        />
      )}
    </div>
  );
};

export default SearchContainer;
