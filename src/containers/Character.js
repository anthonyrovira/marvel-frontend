import React from "react";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import CardComics from "../components/CardComics";

const Character = (props) => {
  const { authToken } = props;

  const search = useLocation().search;
  const name = new URLSearchParams(search).get("name");
  const id = new URLSearchParams(search).get("id");

  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isCharacterFavorite, setIsCharacterFavorite] = useState(false);
  const [favoritesComics, setFavoritesComics] = useState([]);

  const handleFavoriteCharacter = async () => {
    try {
      const selectedCharacter = {
        _id: id,
        name: name,
      };
      const response = await axios.post(
        `${process.env.REACT_APP_HYSTERIA_BACKEND_URL}/favorites/characters`,
        selectedCharacter,
        {
          headers: {
            Authorization: "Bearer " + authToken,
          },
        }
      );
      if (response.data) {
        const fav = response.data.isFavorite;
        setIsCharacterFavorite(fav);
      } else {
        console.error("no response coming from backend");
      }
    } catch (error) {
      if (error.response.status === 500) {
        console.error("An error occurred");
      } else {
        console.error(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    const checkCharacterFavorite = (favorites) => {
      let isFav = false;
      favorites.map((favorite) => {
        if (id === favorite._id) {
          isFav = true;
        }
        return isFav;
      });
      setIsCharacterFavorite(isFav);
    };

    const fetchFavorites = async () => {
      if (authToken) {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_HYSTERIA_BACKEND_URL}/favorites`,
            {
              headers: {
                Authorization: "Bearer " + authToken,
              },
            }
          );
          if (response.data) {
            const favComics = response.data.comics;
            setFavoritesComics(favComics);
            const favCharatacters = response.data.characters;
            checkCharacterFavorite(favCharatacters);
          } else {
            console.error("no response coming from backend");
          }
        } catch (error) {
          console.error(error.message);
        }
      }
    };

    const fetchData = async () => {
      try {
        const apiKey = process.env.REACT_APP_MARVEL_API_PUBLIC_KEY;

        const response = await axios.get(
          `${process.env.REACT_APP_HYSTERIA_BACKEND_URL}/comics/${id}?apiKey=${apiKey}`
        );
        if (response.data) {
          setData(response.data);
        } else {
          console.error("no response coming from backend");
        }
        fetchFavorites();
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id, authToken]);

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
          <section className="wrapper section-container">
            <div className="section-title">
              <div className="section-line"></div>
              <h2 className="section-text">{data.name}</h2>
              <div className="section-line"></div>
            </div>
            <div className="section-portrait-container">
              <div className="portrait-container">
                <img
                  className="portrait-image"
                  src={`${data.thumbnail.path}/portrait_uncanny.${data.thumbnail.extension}`}
                  alt={data.name}
                />
                {authToken && (
                  <div
                    className="favorite-btn-container btn"
                    onClick={handleFavoriteCharacter}
                  >
                    <p>Add to favorites</p>
                    {isCharacterFavorite ? (
                      <FontAwesomeIcon
                        icon={solidStar}
                        size="1x"
                        className="fav-logo"
                      ></FontAwesomeIcon>
                    ) : (
                      <FontAwesomeIcon
                        icon={emptyStar}
                        size="1x"
                        className="fav-logo"
                      ></FontAwesomeIcon>
                    )}
                  </div>
                )}
              </div>
              <div className="portrait-comics">
                {data.description && (
                  <div className="portrait-section">
                    <h4>Description</h4>
                    <p>{data.description}</p>
                  </div>
                )}
                <div className="portrait-section">
                  <h4>
                    Comics appearances{" "}
                    <span>(Results : {data.comics.length})</span>
                  </h4>
                </div>
                <div className="portrait-comics-cards">
                  {data.comics.map((comic) => (
                    <CardComics
                      key={comic._id}
                      comic={comic}
                      className="portrait-card-container"
                      authToken={authToken}
                      favorites={favoritesComics}
                    ></CardComics>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Character;
