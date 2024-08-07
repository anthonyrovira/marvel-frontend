import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { TCharacters, TComic } from "../types";

const useFavorites = () => {
  const [cookies] = useCookies(["user_token"]);

  const [favCharacters, setFavCharacters] = useState<TCharacters[]>([]);
  const [favComics, setFavComics] = useState<TComic[]>([]);
  const [favoriteChange, setFavoriteChange] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await axios.get(`${import.meta.env.VITE_HYSTERIA_BACKEND_URL}/user/${cookies?.user_token}`, {
        headers: {
          Authorization: `Bearer ${cookies?.user_token}`,
        },
      });
      if (response.data) {
        console.log(response);
        const newUserData = response.data.user;
        setFavCharacters(newUserData.favorites.characters);
        setFavComics(newUserData.favorites.comics);
      } else {
        console.error("no response coming from backend");
      }
      setIsLoading(false);
    };
    fetchUserData();
  }, [cookies?.user_token, favoriteChange]);

  return {
    cookies,
    favoriteChange,
    favCharacters,
    favComics,
    isLoading,
    setFavoriteChange,
  };
};

export default useFavorites;
