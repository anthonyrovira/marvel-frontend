import axios, { AxiosError } from "axios";
import { IDataCharacter, TCharacters, TComic } from "../types";
import { useCallback, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";

const useCharacter = () => {
  const { characterId } = useParams();
  const [cookies] = useCookies(["user_token"]);
  const [dataCharacter, setDataCharacter] = useState<IDataCharacter | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isCharacterFavorite, setIsCharacterFavorite] = useState<boolean>(false);
  const [favoritesComics, setFavoritesComics] = useState<TComic[]>([]);

  const handleFavoriteCharacter = useCallback(async () => {
    try {
      const selectedCharacter = {
        _id: characterId,
      };
      const response = await axios.post(`${import.meta.env.VITE_HYSTERIA_BACKEND_URL}/favorites/characters`, selectedCharacter, {
        headers: {
          Authorization: `Bearer ${cookies?.user_token}`,
        },
      });
      if (response.data) {
        const fav = response.data.isFavorite;
        setIsCharacterFavorite(fav);
      } else {
        console.error("no response coming from backend");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 500) {
          console.error("An error occurred");
        } else {
          console.error(error.response?.data.message);
        }
      }
    }
  }, [characterId, cookies?.user_token]);

  useEffect(() => {
    const checkCharacterFavorite = (favorites: TCharacters[] | undefined) => {
      const isFavorite = favorites?.some((favorite) => favorite._id === characterId) || false;
      setIsCharacterFavorite(isFavorite);
    };

    const fetchFavorites = async () => {
      if (cookies?.user_token) {
        try {
          const response = await axios.get(`${import.meta.env.VITE_HYSTERIA_BACKEND_URL}/favorites`, {
            headers: {
              Authorization: `Bearer ${cookies.user_token}`,
            },
          });
          if (response.data) {
            const favComics: TComic[] = response.data.comics;
            setFavoritesComics(favComics);
            const favCharatacters = response.data.characters;
            checkCharacterFavorite(favCharatacters);
          } else {
            console.error("no response coming from backend");
          }
        } catch (error) {
          if (error instanceof AxiosError) {
            console.error(error.message);
          }
        }
      }
    };

    const fetchData = async () => {
      try {
        const apiKey = import.meta.env.VITE_MARVEL_API_PUBLIC_KEY;

        const response = await axios.get(`/api-reacteur/comics/${characterId}?apiKey=${apiKey}`);

        if (response.data) {
          setDataCharacter(response.data);
        } else {
          console.error("no response coming from backend");
        }
        fetchFavorites();
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [cookies?.user_token, characterId]);

  return {
    cookies,
    dataCharacter,
    isLoading,
    isCharacterFavorite,
    favoritesComics,
    handleFavoriteCharacter,
  };
};

export default useCharacter;
