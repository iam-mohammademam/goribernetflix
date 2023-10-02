import { useState, useMemo, memo } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import logo from "../../assets/logo.png";

const Header = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [lightMode, setLightMode] = useState(false);

  useMemo(() => {
    if (lightMode) {
      document.querySelector("body").classList.add("light-mode");
    } else {
      document.querySelector("body").classList.remove("light-mode");
    }
  }, [lightMode]);

  return (
    <>
      <header className="w-screen">
        <nav className="px-10 flex items-center justify-between">
          <NavLink to="/" className="logo w-24">
            <img src={logo} alt="" className="" />
          </NavLink>
          <div className="flex items-center gap-3 navbar">
            <NavLink
              to="/"
              className={({ isActive }) => {
                return (
                  `capitalize font-semibold md:text-normal lg:text-normal text-sm raleway cursor-pointer nav_link` +
                  (!isActive ? ` ` : `text-theme uppercase`)
                );
              }}
            >
              home
            </NavLink>
            <NavLink
              to="/discover/movie"
              className="capitalize font-semibold md:text-normal lg:text-normal text-sm raleway cursor-pointer nav_link"
            >
              movies
            </NavLink>
            <NavLink
              to="/discover/tv"
              className="capitalize font-semibold md:text-normal lg:text-normal text-sm raleway cursor-pointer nav_link"
            >
              series
            </NavLink>

            {lightMode ? (
              <i
                onClick={() => setLightMode(false)}
                className="uil uil-moon text-xl text-color pl-3 cursor-pointer"
              ></i>
            ) : (
              <i
                onClick={() => setLightMode(true)}
                className="uil uil-sun text-xl text-color pl-3 cursor-pointer"
              ></i>
            )}
          </div>
        </nav>
        <div className="search_bar flex items-center bg-text px-10 w-screen mb-1">
          <input
            onKeyUp={(e) => {
              if (query && e.key === "Enter") {
                navigate(`/search/${query}`);
              }
            }}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            type="text"
            placeholder="Search for your favourite movies,series."
            className="w-100 text-bg text-md bg-transparent pr-3 py-2 border-0 outline-0 rounded-sm placeholder-gray-400"
          />
          <i
            onClick={() => {
              if (query) {
                navigate(`/search/${query}`);
              }
            }}
            className="uil uil-search text-xl text-bg px-3 cursor-pointer"
          ></i>
        </div>
      </header>
    </>
  );
};
export default memo(Header);
