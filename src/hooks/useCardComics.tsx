import axios, { AxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";
import { TComic } from "../types";

const useCardComics = (
  authToken: string | undefined,
  comic: TComic,
  favorites: TComic[],
  favoriteChange?: boolean,
  setFavoriteChange?: (arg: boolean) => void
) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const handleFavorite = useCallback(async () => {
    try {
      const selectedComic = {
        _id: comic._id,
        title: comic.title,
        description: comic.description,
        thumbnail: comic.thumbnail,
      };
      const response = await axios.post(`${import.meta.env.VITE_HYSTERIA_BACKEND_URL}/favorites/comics`, selectedComic, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (response.data) {
        const favorite = response.data.isFavorite;
        setIsFavorite(favorite);
        if (setFavoriteChange) {
          setFavoriteChange(!favoriteChange);
        }
      } else {
        console.error("no response coming from backend");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 500) {
          console.error("An error occurred");
        } else {
          console.error(error.response?.data?.message);
        }
      }
    }
  }, [authToken, comic, favoriteChange, setFavoriteChange]);

  useEffect(() => {
    const isFavorite = favorites.some((favorite) => favorite._id === comic._id);
    setIsFavorite(isFavorite);
  }, [comic._id, favorites]);

  return {
    isFavorite,
    handleFavorite,
    favorites,
    favoriteChange,
    setFavoriteChange,
  };
};

export default useCardComics;
