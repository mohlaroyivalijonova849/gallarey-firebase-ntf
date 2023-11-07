import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

function Navbar() {
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <div className="sticky-header bg-white bg-opacity-30 backdrop-filter backdrop-blur-md">
      <div className="navbar  z-10 flex items-center justify-between align-elements ">
        <div className="navbar-start">
          <div className="dropdown">
            <label
              tabIndex={0}
              className="btn btn-ghost lg:hidden"
              onClick={toggleMenu}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className={`menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 font-medium ${
                isMenuOpen ? "block" : "hidden"
              }`}
            >
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <a>About</a>
              </li>
              <li>
                <a>Contact</a>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <a>
                  LikedPhotos <span className="ba">0</span>
                </a>
              </li>
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost normal-case text-xl font-bold">
            Unsplash
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 font-medium">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <a>About</a>
            </li>
            <li>
              <a>Contact</a>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <a>
                LikedPhotos <span className="ba">0</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
