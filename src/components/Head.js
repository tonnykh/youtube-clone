import React from "react";
import { useDispatch } from "react-redux";
import { toggleMenu } from "../utils/appSlice";

const Head = () => {
  const dispatch = useDispatch();

  const toggleMenuHandler = () => dispatch(toggleMenu());

  return (
    <div className="flex h-14 shadow-lg justify-between mx-2 mb-2">
      <div className="flex items-center gap-5 py-3 px-6 cursor-pointer">
        <img
          onClick={() => toggleMenuHandler()}
          className="w-7"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAARVBMVEX///8jHyAgHB0OBQgMAAWlpKQpJSaenZ309PUAAAAIAAD8/Pz5+fna2tqop6dvbW1oZmevrq4tKivFxMQYExRiYGC+vr7Dc4WrAAABB0lEQVR4nO3cS3LCMBAFQGIIIBPbhN/9jxqSyiIsTUnlydB9g1eSNV5MvdUKAAAAAAAAAAAAAAAAXtEwvscwDk3yHabSb2Loy/TRIOHUv8XRH+sHHMrSqR6U+hd1jHSE90P8lHC2/Lc0/0vzMy3WMdynxaFBwu+Jv4uh0cQHAAAAAAAAAIB59jG0ijdcT9sYTtcmK0PncumiuJRz/YD7bbf0ut4f3br+GvQt2PblrXrC3WbpUA/6sXrC/GeY/zvM/5aGmofHZiu0S//M/GoVDwAAAAAAAAAAZsjeuRerN1HL7hPy95fm76DNnzD/Lc3/0rxAJ3v+Xn0AAAAAAAAAAAAAAAD4T74AYhs1O+vt3ioAAAAASUVORK5CYII="
          alt="menu"
        ></img>

        <a href="/">
          <img
            className="h-5"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/1200px-YouTube_Logo_2017.svg.png"
            alt="youtube-logo"
          ></img>
        </a>
      </div>

      <div className="flex w-1/2 py-2">
        <input
          className="border w-3/4 rounded-l-full border-r-white pl-4"
          type="text"
          placeholder="Search"
        />
        <button className="self-center border rounded-r-full py-[0.453rem] px-5 bg-gray-50">
          🔍
        </button>
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
