import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import SidebarSmall from "./SidebarSmall";

const Sidebar = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  let location = (useLocation());

  if (!isMenuOpen && location.pathname === "/") return <SidebarSmall />;
  if (!isMenuOpen) return;

  return (
    <div className="p-5 shadow-lg pr-20 z-10 bg-white">
      <ul className="pl-5">
        <Link to="/">
          <li>Home</li>
        </Link>
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
