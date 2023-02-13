import React from "react";

const Sidebar = () => {
  return (
    <div className="p-5 shadow-lg w-48">
      <ul className="pl-5">
        <li>Home</li>
        <li>Shorts</li>
        <li>Subscriptions</li>
      </ul>

      <ul className="pl-5 pt-5">
        <li>Library</li>
        <li>History</li>
        <li>Subscriptions</li>
      </ul>

      <h1 className="font-bold pt-5">Explore</h1>
      <ul className="pl-5">
        <li>Trending</li>
        <li>Music</li>
        <li>Films</li>
        <li>Live</li>
        <li>Gaming</li>
        <li>News</li>
        <li>Sport</li>
        <li>Learning</li>
      </ul>
    </div>
  );
};

export default Sidebar;
