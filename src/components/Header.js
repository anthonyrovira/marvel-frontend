import React from "react";
import { Link } from "react-router-dom";

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import user_login from "../assets/img/user_login.png";
import user_logout from "../assets/img/user_logout.png";
import marvel from "../assets/img/Marvel-Logo.jpg";

const Header = (props) => {
  const {
    search,
    authToken,
    handleLogout,
    handleSearch,
    handleModalVisibility,
  } = props;

  return (
    <header>
      <div className="wrapper">
        <div className="header-container">
          <Link to="/" className="header-main">
            <img src={marvel} alt="Marvel logo" />
          </Link>{" "}
          <div className="navbar">
            <nav>
              <Link to="/characters">
                <h1>CHARACTERS</h1>
              </Link>
              <Link to="/comics">
                <h1>COMICS</h1>
              </Link>
              {authToken ? (
                <Link to="/favorites">
                  <h1>FAVORITES</h1>
                </Link>
              ) : (
                <h1 className="btn" onClick={handleModalVisibility}>
                  FAVORITES
                </h1>
              )}
            </nav>
            <div className="search-bar-wrapper">
              <div className="search-bar-container">
                <FontAwesomeIcon
                  icon={faSearch}
                  size="1x"
                  className="search-logo"
                ></FontAwesomeIcon>
                <input
                  type="text"
                  placeholder="Search"
                  className="search-bar"
                  value={search}
                  onChange={handleSearch}
                />
              </div>
            </div>
            {authToken ? (
              <>
                <div className="login-btn-container btn" onClick={handleLogout}>
                  <img src={user_logout} alt="Login icon" />
                  <p className="login-btn-text">Log Out</p>
                </div>
              </>
            ) : (
              <>
                <div
                  className="login-btn-container btn"
                  onClick={handleModalVisibility}
                >
                  <img src={user_login} alt="Login icon" />
                  <p className="login-btn-text">Log In</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

{
  /*<p className="hero-quote">
            Heroes are made by the path they choose, not the powers they are
            graced with
          </p> */
}
