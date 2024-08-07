import { Star } from "lucide-react";
import CardComics from "../components/CardComics";
import useCharacter from "../hooks/useCharacter";

const Character = () => {
  const { cookies, dataCharacter, favoritesComics, handleFavoriteCharacter, isCharacterFavorite, isLoading } = useCharacter();

  return (
    <>
      {isLoading ? (
        <div className="loader-container">
          <div className="loader" />
          <h2>Loading page...</h2>
        </div>
      ) : (
        <section className="wrapper section-container">
          <div className="section-title">
            <div className="section-line" />
            <h2 className="section-text">{dataCharacter?.name}</h2>
            <div className="section-line" />
          </div>
          <div className="section-portrait-container">
            <div className="portrait-container">
              <img
                className="portrait-image"
                src={`${dataCharacter?.thumbnail.path}/portrait_uncanny.${dataCharacter?.thumbnail.extension}`}
                alt={dataCharacter?.name}
              />
              {cookies?.user_token && (
                <div className="favorite-btn-container btn" onClick={handleFavoriteCharacter}>
                  <p>Add to favorites</p>
                  {isCharacterFavorite ? (
                    <Star color="#d6c102" className="fav-logo" />
                  ) : (
                    <Star color="#fff" className="fav-logo" />
                  )}
                </div>
              )}
            </div>
            <div className="portrait-comics">
              {dataCharacter?.description && (
                <div className="portrait-section">
                  <h4>Description</h4>
                  <p>{dataCharacter?.description}</p>
                </div>
              )}
              <div className="portrait-section">
                <h4>
                  Comics appearances <span>(Results : {dataCharacter?.comics?.length})</span>
                </h4>
              </div>
              <div className="portrait-comics-cards">
                {dataCharacter?.comics?.map((comic) => (
                  <CardComics
                    key={comic?._id}
                    comic={comic}
                    className="portrait-card-container"
                    authToken={cookies?.user_token}
                    favorites={favoritesComics}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Character;
