import { Star } from "lucide-react";
import { TComic } from "../types";
import useCardComics from "../hooks/useCardComics";
import { FC } from "react";

interface ICardComics {
  comic: TComic;
  authToken?: string | undefined;
  favorites: TComic[];
  favoriteChange?: boolean;
  setFavoriteChange?: (arg: boolean) => void;
  className?: string;
}

const CardComics: FC<ICardComics> = ({ authToken, comic, favorites, favoriteChange, setFavoriteChange, className }) => {
  const { isFavorite, handleFavorite } = useCardComics(authToken, comic, favorites, favoriteChange, setFavoriteChange);

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
            {isFavorite ? <Star color="#d6c102" className="fav-logo" /> : <Star color="#fff" className="fav-logo" />}
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
