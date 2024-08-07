import { FC } from "react";
import CardComics from "../components/CardComics";
import CardCharacters from "../components/CardCharacters";
import { TCharacters, TComic } from "../types";
import useFavorites from "../hooks/useFavorites";

interface IFavorites {
  username?: string;
}

const Favorites: FC<IFavorites> = ({ username }) => {
  const { cookies, favoriteChange, isLoading, favCharacters, favComics, setFavoriteChange } = useFavorites();

  return (
    <>
      {isLoading ? (
        <div className="loader-container">
          <div className="loader" />
          <h2>Loading page...</h2>
        </div>
      ) : (
        <section className="wrapper section-container favorites-container">
          <div className="section-title">
            <div className="section-line" />
            <h2 className="section-text">
              {username ? username.charAt(0)?.toUpperCase() + username.slice(1) : "Your favorites"}
            </h2>
            <div className="section-line" />
          </div>
          <div className="section-container">
            <div className="portrait-section">
              <h4>
                Favorites characters <span>(Results : {favCharacters.length})</span>
              </h4>
            </div>
            <div className="section-cards">
              {favCharacters.map((character: TCharacters) => (
                <CardCharacters
                  key={character._id}
                  authToken={cookies?.user_token}
                  character={character}
                  favorites={favCharacters}
                  favoriteChange={favoriteChange}
                  setFavoriteChange={setFavoriteChange}
                />
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
                favComics.map((comic: TComic) => (
                  <CardComics
                    key={comic._id}
                    authToken={cookies?.user_token}
                    comic={comic}
                    favorites={favComics}
                    className="card-container"
                    favoriteChange={favoriteChange}
                    setFavoriteChange={setFavoriteChange}
                  />
                ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Favorites;
