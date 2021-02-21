import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Cookies from "js-cookie";

import Header from "./components/Header";
import AuthModal from "./components/AuthModal";
import Page404 from "./components/Page404";
import Footer from "./components/Footer";
import Characters from "./containers/Characters";
import Comics from "./containers/Comics";
import Character from "./containers/Character";
import Favorites from "./containers/Favorites";

//* HTML
//* Etats
//* Intéractions
//* CSS

function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [authToken, setAuthToken] = useState(Cookies.get("user_token") || null);
  const [username, setUsername] = useState("");
  const [search, setSearch] = useState("");
  const [skip, setSkip] = useState(0);

  const handleModalVisibility = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleLogin = (token) => {
    setAuthToken(token);
    Cookies.set("user_token", token);
  };

  const handleLogout = () => {
    setAuthToken("");
    Cookies.remove("user_token");
  };

  const handleSkip = (event, limit) => {
    let selected = event.selected;
    let offset = Math.ceil(selected * limit);
    setSkip(offset);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  return (
    <Router>
      {isModalVisible && (
        <AuthModal
          handleModalVisibility={handleModalVisibility}
          handleLogin={handleLogin}
          setUsernameMain={setUsername}
        ></AuthModal>
      )}
      <Header
        username={username}
        search={search}
        handleSearch={handleSearch}
        authToken={authToken}
        handleLogout={handleLogout}
        isModalVisible={isModalVisible}
        handleModalVisibility={handleModalVisibility}
      ></Header>
      <Switch>
        <Route path="/character">
          <Character authToken={authToken}></Character>
        </Route>
        <Route path="/characters">
          <Characters
            authToken={authToken}
            search={search}
            skip={skip}
            handleSkip={handleSkip}
          ></Characters>
        </Route>
        <Route path="/comics">
          <Comics
            authToken={authToken}
            search={search}
            skip={skip}
            handleSkip={handleSkip}
          ></Comics>
        </Route>
        <Route path="/favorites">
          <Favorites authToken={authToken} username={username}></Favorites>
        </Route>
        <Route exact path="/">
          <Characters
            authToken={authToken}
            search={search}
            skip={skip}
            handleSkip={handleSkip}
          ></Characters>
        </Route>
        <Route path="*">
          <Page404 />
        </Route>
      </Switch>
      <Footer></Footer>
    </Router>
  );
}

export default App;
