import React, { useState, useEffect } from "react";

import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

const CardComics = (props) => {
  const {
    className,
    comic,
    authToken,
    favorites,
    favoriteChange,
    setFavoriteChange,
  } = props;
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavorite = async () => {
    try {
      const selectedComic = {
        _id: comic._id,
        title: comic.title,
        description: comic.description,
        thumbnail: comic.thumbnail,
      };
      const response = await axios.post(
        `${process.env.REACT_APP_HYSTERIA_BACKEND_URL}/favorites/comics`,
        selectedComic,
        {
          headers: {
            Authorization: "Bearer " + authToken,
          },
        }
      );
      if (response.data) {
        const favorite = response.data.isFavorite;
        setIsFavorite(favorite);
        if (setFavoriteChange) {
          setFavoriteChange(!favoriteChange);
        }
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
    const fetchData = () => {
      let isFav = false;
      favorites.map((favorite) => {
        if (comic._id === favorite._id) {
          isFav = true;
        }
        return isFav;
      });
      setIsFavorite(isFav);
    };
    fetchData();
  }, [comic, favorites]);

  return (
    <div className={className}>
      <div className="card-items">
        <div className="picture-container">
          <img
            className="picture-comics"
            src={`${comic.thumbnail.path}/standard_xlarge.${comic.thumbnail.extension}`}
            alt={comic.name}
          />
        </div>

        {authToken && (
          <div className="fav-icon-container btn" onClick={handleFavorite}>
            {isFavorite ? (
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
        <div className="card-info-container">
          <h3>{comic.title.toUpperCase()}</h3>
        </div>
      </div>
    </div>
  );
};

export default CardComics;
