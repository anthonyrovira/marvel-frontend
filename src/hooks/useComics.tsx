import axios from "axios";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useDebounce } from "use-debounce";
import { TComic } from "../types";
import qs from "qs";

const useComics = (search: string, skip: number) => {
  const [cookies] = useCookies(["user_token"]);

  const [comicData, setComicData] = useState<TComic[]>([]);
  const [count, setCount] = useState<number>(1);
  const [limit, setLimit] = useState<number>(100);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [totalComics, setTotalComics] = useState<number>(0);
  const [favoritesComics, setFavoritesComics] = useState<TComic[]>([]);
  const [debouncedSearch] = useDebounce(search, 800);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let params = {};

        if (debouncedSearch) {
          params = {
            apiKey: import.meta.env.VITE_MARVEL_API_PUBLIC_KEY,
            title: debouncedSearch,
          };
        } else {
          params = {
            apiKey: import.meta.env.VITE_MARVEL_API_PUBLIC_KEY,
            limit,
            skip,
          };
        }

        const queryParams = qs.stringify(params);

        const response = await axios.get(`/api-reacteur/comics/?${queryParams}`);

        setComicData(response.data.results);
        setLimit(response.data.limit);
        setTotalComics(response.data.count);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
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
  }, [comicData, limit, count, totalComics, isLoading]);

  useEffect(() => {
    const fetchData = async () => {
      if (cookies?.user_token) {
        const response = await axios.get(`${import.meta.env.VITE_HYSTERIA_BACKEND_URL}/favorites`, {
          headers: {
            Authorization: `Bearer ${cookies.user_token}`,
          },
        });
        if (response.data) {
          const favComics = response.data.comics;
          setFavoritesComics(favComics);
        } else {
          console.error("no response coming from backend");
        }
      }
    };
    fetchData();
  }, [cookies?.user_token]);

  return {
    cookies,
    comicData,
    count,
    limit,
    isLoading,
    favoritesComics,
  };
};

export default useComics;
