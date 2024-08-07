import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { TCharacters } from "../types";
import useCardCharacters from "../hooks/useCardCharacters";
import { FC } from "react";

interface ICardCharacters {
  character: TCharacters;
  authToken?: string;
  favorites: { _id: string }[];
  favoriteChange?: boolean;
  setFavoriteChange?: (arg: boolean) => void;
}

const CardCharacters: FC<ICardCharacters> = ({ character, authToken, favorites, favoriteChange = false, setFavoriteChange }) => {
  const { handleFavorite, isFavorite } = useCardCharacters(authToken, character, favorites, favoriteChange, setFavoriteChange);

  return (
    <div className="card-container">
      <div className="card-items">
        <Link to={`/characters/${character._id}`}>
          <div className="picture-container">
            <img
              className="picture-character"
              src={`${character.thumbnail.path}/standard_xlarge.${character.thumbnail.extension}`}
              alt={character.name}
            />
          </div>
        </Link>

        {authToken && (
          <div className="fav-icon-container btn" onClick={handleFavorite}>
            {isFavorite ? <Star color="#d6c102" className="fav-logo" /> : <Star color="#fff" className="fav-logo" />}
          </div>
        )}

        <div className="card-info-container">
          <h3>{character.name.toUpperCase()}</h3>
          <div className="appearances-info">
            <p>Comics :</p>
            <p>&nbsp;{character?.comics?.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardCharacters;
