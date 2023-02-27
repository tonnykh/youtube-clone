import React from "react";
import { Link } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";

const SuggestionsDropdown = ({
  suggestions,
  searchQuery,
  handleSuggestionClick,
}) => {
  return (
    <div className="suggestion bg-white rounded-xl shadow-lg border border-gray-100 py-3 w-[65vw] absolute top-12 right-[3%] z-30 sm:max-w-xs sm:-right-[12px] md:right-[35px]">
      <ul className="">
        {suggestions.map((suggestion) => (
          <Link to={"result?search_query=" + searchQuery} key={suggestion}>
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
  );
};

export default SuggestionsDropdown;
