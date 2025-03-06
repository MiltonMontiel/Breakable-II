import { Image } from "./Image";

export type Album = {
  album_type: "album" | "single" | "compilation";
  total_tracks: number;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  artists: {
    id: string;
    name: string;
  };
};
