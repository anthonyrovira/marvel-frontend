import React, { useState, useEffect } from "react";
import CardComics from "../components/CardComics";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { useDebounce } from "use-debounce";
import qs from "qs";

const Comics = (props) => {
  const { search, skip, handleSkip, authToken } = props;
  const [data, setData] = useState([]);
  const [count, setCount] = useState(1);
  const [limit, setLimit] = useState(100);
  const [debouncedSearch] = useDebounce(search, 800);
  const [isLoading, setIsLoading] = useState(true);
  const [totalComics, setTotalComics] = useState(0);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let params = {};
        if (debouncedSearch) {
          params = {
            apiKey: process.env.REACT_APP_MARVEL_API_PUBLIC_KEY,
            title: debouncedSearch,
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
          `https://lereacteur-marvel-api.herokuapp.com/comics?${queryParams}`
        );
        setData(response.data.results);
        setLimit(response.data.limit);
        setTotalComics(response.data.count);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [debouncedSearch, limit, skip]);

  useEffect(() => {
    const fetchData = async () => {
      const newCount = Math.ceil(totalComics / limit);
      setCount(newCount);
    };

    fetchData();
  }, [data, limit, count, totalComics, isLoading]);

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
          const favComics = response.data.comics;
          setFavorites(favComics);
        } else {
          console.log("no response coming from backend");
        }
      }
    };
    fetchData();
  }, []);

  //console.log(data, limit, skip, count, debouncedSearch);
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
              <h2 className="section-text">COMICS</h2>
              <div className="section-line"></div>
            </div>
            <div className="section-cards">
              {data.map((comic) => (
                <CardComics
                  key={comic._id}
                  authToken={authToken}
                  comic={comic}
                  favorites={favorites}
                  className="card-container"
                ></CardComics>
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

export default Comics;
