import CardCharacters from "../components/CardCharacters";
import ReactPaginate from "react-paginate";
import { TCharacters } from "../types";
import useCharacters from "../hooks/useCharacters";
import { FC } from "react";

interface ICharacter {
  search: string;
  skip: number;
  handleSkip: (event: { selected: number }, limit: number) => void;
}

const Characters: FC<ICharacter> = ({ search, skip, handleSkip }) => {
  const { cookies, count, data, favorites, isLoading, limit } = useCharacters(search, skip);

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
            <h2 className="section-text">CHARACTERS</h2>
            <div className="section-line" />
          </div>
          <div className="section-cards">
            {data.map((character: TCharacters) => (
              <CardCharacters key={character._id} character={character} authToken={cookies.user_token} favorites={favorites} />
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

export default Characters;
