import React from "react";
import { IoIosSearch } from "react-icons/io";

const SearchInput = ({
  searchQuery,
  setSearchQuery,
  setShowSuggestions,
  handleKeyDown,
  onBlur
}) => {
  return (
    <div className="flex items-center focus-within:w-[65vw] sm:max-w-xs ">
      <div className="pl-3 text-xl hidden group-focus-within/item:block ">
        <IoIosSearch />
      </div>
      <input
        className="peer outline-none ml-3 w-full lg:w-80 md:my-2"
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onFocus={() => setShowSuggestions(true)}
        onKeyDown={handleKeyDown}
        onBlur={onBlur}
      />
    </div>
  );
};

export default SearchInput;
