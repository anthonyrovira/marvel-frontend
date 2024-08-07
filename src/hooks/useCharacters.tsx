import { useEffect, useState } from "react";
import { TCharacters } from "../types";
import { useCookies } from "react-cookie";
import { useDebounce } from "use-debounce";
import axios from "axios";
import qs from "qs";

const useCharacters = (search: string, skip: number) => {
  const [cookies] = useCookies(["user_token"]);

  const [data, setData] = useState<TCharacters[]>([]);
  const [count, setCount] = useState<number>(1);
  const [limit, setLimit] = useState<number>(100);
  const [debouncedSearch] = useDebounce(search, 800);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [totalCharacters, setTotalCharacters] = useState<number>(0);
  const [favorites, setFavorites] = useState<{ _id: string }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let params = {};

        if (debouncedSearch) {
          params = {
            apiKey: import.meta.env.VITE_MARVEL_API_PUBLIC_KEY,
            name: debouncedSearch,
          };
        } else {
          params = {
            apiKey: import.meta.env.VITE_MARVEL_API_PUBLIC_KEY,
            limit,
            skip,
          };
        }

        const queryParams = qs.stringify(params);

        const response = await axios.get(`/api-reacteur/characters/?${queryParams}`);

        setData(response.data.results);
        setLimit(response.data.limit);
        setTotalCharacters(response.data.count);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [debouncedSearch, limit, skip]);

  useEffect(() => {
    const updateCounter = async () => {
      const newCount = Math.ceil(totalCharacters / limit);
      setCount(newCount);
    };

    updateCounter();
  }, [data, limit, count, totalCharacters, isLoading]);

  useEffect(() => {
    const fetchData = async () => {
      if (cookies.user_token) {
        const response = await axios.get(`${import.meta.env.VITE_HYSTERIA_BACKEND_URL}/favorites`, {
          headers: {
            Authorization: `Bearer ${cookies.user_token}`,
          },
        });
        if (response.data) {
          const favCharacters = response.data.characters;
          setFavorites(favCharacters);
        } else {
          console.error("no response coming from backend");
        }
      }
    };
    fetchData();
  }, [cookies.user_token]);

  return {
    cookies,
    data,
    count,
    limit,
    isLoading,
    favorites,
  };
};

export default useCharacters;
