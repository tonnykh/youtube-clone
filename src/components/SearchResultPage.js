import React from "react";
import { useSearchParams } from "react-router-dom";

const SearchResultPage = () => {
  let [searchParams] = useSearchParams();
//   console.log(searchParams.get(""));
  return <div>SearchResultPage</div>;
};

export default SearchResultPage;
