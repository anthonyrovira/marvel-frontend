import { FC } from "react";
import CardComics from "../components/CardComics";
import ReactPaginate from "react-paginate";
import { TComic } from "../types";
import useComics from "../hooks/useComics";

interface IComic {
  search: string;
  skip: number;
  handleSkip: (event: { selected: number }, limit: number) => void;
}

const Comics: FC<IComic> = ({ search, skip, handleSkip }) => {
  const { cookies, comicData, isLoading, count, favoritesComics, limit } = useComics(search, skip);

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
            <h2 className="section-text">COMICS</h2>
            <div className="section-line" />
          </div>

          <div className="section-cards">
            {comicData.map((comic: TComic) => (
              <CardComics
                key={comic._id}
                authToken={cookies?.user_token}
                comic={comic}
                favorites={favoritesComics}
                className="card-container"
              />
            ))}
          </div>

          <div>
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              breakLabel={"..."}
              pageCount={count}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={(e) => handleSkip(e, limit)}
              breakClassName={"break-me"}
              containerClassName={"pagination"}
              nextLinkClassName={"next-page"}
              previousLinkClassName={"prev-page"}
              pageClassName={"pages"}
              activeClassName={"activePage"}
            />
          </div>
        </section>
      )}
    </>
  );
};

export default Comics;
