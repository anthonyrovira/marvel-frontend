import axios, { AxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";
import { TCharacters } from "../types";

const useCardCharacters = (
  authToken: string | undefined,
  character: TCharacters,
  favorites: { _id: string }[],
  favoriteChange?: boolean,
  setFavoriteChange?: (arg: boolean) => void
) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const handleFavorite = useCallback(async () => {
    try {
      const selectedCharacter = {
        _id: character._id,
        name: character.name,
        description: character.description,
        thumbnail: character.thumbnail,
        comics: character.comics,
      };

      const response = await axios.post(`${import.meta.env.VITE_HYSTERIA_BACKEND_URL}/favorites/characters`, selectedCharacter, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.data) {
        const fav = response.data.isFavorite;
        setIsFavorite(fav);
        if (setFavoriteChange) {
          setFavoriteChange(!favoriteChange);
        }
      } else {
        console.error("no response coming from backend");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error.message);
        if (error.response?.status === 500) {
          console.error("An error occurred");
        } else {
          console.error(error.response?.data.message);
        }
      }
    }
  }, [authToken, character, favoriteChange, setFavoriteChange]);

  useEffect(() => {
    const isFavorite = favorites.some((favorite) => favorite._id === character._id);
    setIsFavorite(isFavorite);
  }, [character._id, favorites]);

  return {
    isFavorite,
    handleFavorite,
  };
};

export default useCardCharacters;
