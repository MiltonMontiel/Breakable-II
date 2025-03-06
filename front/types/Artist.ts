import { Image } from "./Image";

export type Artist = {
  followers: {
    href: string;
    total: number;
  };
  genres: string[];
  id: string;
  images: Image[];
  name: string;
  popularity: number;
  uri: string;
};
