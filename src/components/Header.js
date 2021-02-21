import React from "react";
import { Link, useHistory } from "react-router-dom";

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import user_login from "../assets/img/user_login.png";
import user_logout from "../assets/img/user_logout.png";
import marvel from "../assets/img/Marvel-Logo.jpg";

const Header = (props) => {
  const history = useHistory();
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
          <input class="menu-btn" type="checkbox" id="menu-btn" />
          <label class="menu-icon" for="menu-btn">
            <span class="navicon"></span>
          </label>
          <div className="navbar">
            <nav className="primary-navbar">
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
                <div
                  className="login-btn-container btn hide-primary"
                  onClick={() => {
                    handleLogout();
                    history.push("/");
                  }}
                >
                  <img src={user_logout} alt="Login icon" />
                  <p className="login-btn-text">Log Out</p>
                </div>
              </>
            ) : (
              <>
                <div
                  className="login-btn-container btn hide-primary"
                  onClick={handleModalVisibility}
                >
                  <img src={user_login} alt="Login icon" />
                  <p className="login-btn-text">Log In</p>
                </div>
              </>
            )}
          </div>
          <nav className="secondary-navbar">
            <Link to="/characters">
              <h1>CHARACTERS</h1>
            </Link>
            <Link to="/comics">
              <h1>COMICS</h1>
            </Link>
            {authToken ? (
              <>
                <Link to="/favorites">
                  <h1>FAVORITES</h1>
                </Link>
                <div
                  className="log-secondary"
                  onClick={() => {
                    handleLogout();
                    history.push("/");
                  }}
                >
                  <h1>Log Out</h1>
                </div>
              </>
            ) : (
              <>
                <h1 className="btn" onClick={handleModalVisibility}>
                  FAVORITES
                </h1>
                <div className="log-secondary" onClick={handleModalVisibility}>
                  <h1>Log In</h1>
                </div>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
