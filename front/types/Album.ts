import { Image } from "./Image";
import { Track } from "./Track";

export type Album = {
  album_type: "album" | "single" | "compilation";
  total_tracks: number;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  label: string;
  artists: {
    id: string;
    name: string;
  }[];
  tracks: {
    total: number;
    items: Track[];
  };
};
