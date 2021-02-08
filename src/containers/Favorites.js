import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import CardComics from "../components/CardComics";
import CardCharacters from "../components/CardCharacters";

const Favorites = (props) => {
  const { authToken, username } = props;
  const [favCharacters, setFavCharacters] = useState([]);
  const [favComics, setFavComics] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await axios.get(
        `https://marvel-hysteria9.herokuapp.com/user/${authToken}`,
        {
          headers: {
            Authorization: "Bearer " + authToken,
          },
        }
      );
      if (response.data) {
        const newUserData = response.data.user;
        setFavCharacters(newUserData.favorites.characters);
        setFavComics(newUserData.favorites.comics);
      } else {
        console.log("no response coming from backend");
      }
      setIsLoading(false);
    };
    fetchUserData();
  }, [authToken]);

  return (
    <>
      {isLoading ? (
        <>
          <div className="loader-container">
            <div className="loader"></div>
            <h2>Loading page...</h2>
          </div>
        </>
      ) : (
        <>
          <section className="wrapper section-container favorites-container">
            <div className="section-title">
              <div className="section-line"></div>
              <h2 className="section-text">
                {username.charAt(0).toUpperCase() + username.slice(1) ||
                  "Your favorites"}
              </h2>
              <div className="section-line"></div>
            </div>
            <div className="section-container">
              <div className="portrait-section">
                <h4>
                  Favorites characters{" "}
                  <span>(Results : {favCharacters.length})</span>
                </h4>
              </div>
              <div className="section-cards">
                {favCharacters.map((character) => (
                  <CardCharacters
                    key={character._id}
                    authToken={authToken}
                    character={character}
                    favorites={favCharacters}
                  ></CardCharacters>
                ))}
              </div>
            </div>
            <div className="section-container">
              <div className="portrait-section">
                <h4>
                  Favorites comics <span>(Results : {favComics.length})</span>
                </h4>
              </div>
              <div className="section-cards">
                {favComics.length > 0 &&
                  favComics.map((comic) => (
                    <CardComics
                      key={comic._id}
                      authToken={authToken}
                      comic={comic}
                      favorites={favComics}
                      className="card-container"
                    ></CardComics>
                  ))}
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Favorites;
