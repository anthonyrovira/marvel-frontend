export type TComic = {
  _id: string;
  title: string;
  name: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
};

export type TCharacters = {
  _id: string;
  name: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  comics: TComic[];
};

export type UserFavorites = {
  comics: TComic[];
  characters: TCharacters[];
};

export interface IDataCharacter {
  _id: string;
  name: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  comics: TComic[];
}
