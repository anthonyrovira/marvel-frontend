import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

const CardCharacters = (props) => {
  const { character, authToken, favorites } = props;
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavorite = async () => {
    try {
      const selectedCharacter = {
        _id: character._id,
        name: character.name,
        description: character.description,
        thumbnail: character.thumbnail,
        comics: character.comics,
      };
      //console.log(selectedCharacter);
      const response = await axios.post(
        "https://marvel-hysteria9.herokuapp.com/favorites/characters",
        selectedCharacter,
        {
          headers: {
            Authorization: "Bearer " + authToken,
          },
        }
      );
      if (response.data) {
        const fav = response.data.isFavorite;
        //console.log(response.data.isFavorite);
        setIsFavorite(fav);
      } else {
        console.log("no response coming from backend");
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
        if (character._id === favorite._id) {
          isFav = true;
        }
        return isFav;
      });
      setIsFavorite(isFav);
    };
    fetchData();
  }, [character, favorites]);

  return (
    <div className="card-container">
      <div className="card-items">
        <Link to={`/character?id=${character._id}&name=${character.name}`}>
          <div className="picture-container">
            <img
              className="picture-character"
              src={`${character.thumbnail.path}/standard_xlarge.${character.thumbnail.extension}`}
              alt={character.name}
            />
          </div>
        </Link>

        {authToken && (
          <div className="fav-container btn" onClick={handleFavorite}>
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
          <h3>{character.name.toUpperCase()}</h3>
          <div className="appearances-info">
            <p>Comics :</p>
            <p>&nbsp;{character.comics.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardCharacters;
