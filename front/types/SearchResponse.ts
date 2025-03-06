import { Album } from "./Album";
import { Artist } from "./Artist";
import { Track } from "./Track";

export type SearchResponse = {
  tracks: {
    total: number;
    items: Track[];
  };
  artists: {
    total: number;
    items: Artist[];
  };
  albums: {
    total: number;
    items: Album[];
  };
};
