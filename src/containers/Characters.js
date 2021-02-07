import React, { useState, useEffect } from "react";
import CardCharacters from "../components/CardCharacters";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { useDebounce } from "use-debounce";
import qs from "qs";

const Characters = (props) => {
  const { search, skip, handleSkip, authToken } = props;
  const [data, setData] = useState([]);
  const [count, setCount] = useState(1);
  const [limit, setLimit] = useState(100);
  const [debouncedSearch] = useDebounce(search, 800);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCharacters, setTotalCharacters] = useState(0);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let params = {};
        if (debouncedSearch) {
          params = {
            apiKey: process.env.REACT_APP_MARVEL_API_PUBLIC_KEY,
            name: debouncedSearch,
          };
        } else {
          params = {
            apiKey: process.env.REACT_APP_MARVEL_API_PUBLIC_KEY,
            limit: limit,
            skip: skip,
          };
        }

        const queryParams = qs.stringify(params);

        const response = await axios.get(
          `https://lereacteur-marvel-api.herokuapp.com/characters?${queryParams}`
        );
        setData(response.data.results);
        setLimit(response.data.limit);
        setTotalCharacters(response.data.count);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [debouncedSearch, limit, skip]);

  useEffect(() => {
    const fetchData = async () => {
      const newCount = Math.ceil(totalCharacters / limit);
      setCount(newCount);
    };

    fetchData();
  }, [data, limit, count, totalCharacters, isLoading]);

  useEffect(() => {
    const fetchData = async () => {
      if (authToken) {
        const response = await axios.get(
          "https://marvel-hysteria9.herokuapp.com/favorites",
          {
            headers: {
              Authorization: "Bearer " + authToken,
            },
          }
        );
        if (response.data) {
          const favCharacters = response.data.characters;
          setFavorites(favCharacters);
        } else {
          console.log("no response coming from backend");
        }
      }
    };
    fetchData();
  }, []);

  //console.log(favorites);
  return (
    <>
      {isLoading ? (
        <>
          <h1>Loading page...</h1>
          {/*//! A remplacer par des placeholders vides */}
        </>
      ) : (
        <>
          <section className="wrapper section-container">
            <div className="section-title">
              <div className="section-line"></div>
              <h2 className="section-text">CHARACTERS</h2>
              <div className="section-line"></div>
            </div>
            <div className="section-cards">
              {data.map((character) => (
                <CardCharacters
                  key={character._id}
                  character={character}
                  authToken={authToken}
                  favorites={favorites}
                ></CardCharacters>
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
        </>
      )}
    </>
  );
};

export default Characters;
