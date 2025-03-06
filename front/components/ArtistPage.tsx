import { Artist } from "@/types/Artist";
import { getArtistAlbums } from "@/utils/api";
import Typography from "@mui/material/Typography";
import { FC } from "react";

const ArtistPage: FC<{ artist: Artist }> = ({ artist }) => {
  return (
    <div>
      <Typography variant="h1">{artist.name}</Typography>
      <AlbumsSection id={artist.id}/>
    </div>
  );
};

const AlbumsSection: FC<{ id: string }> = ({ id }) => {
  const albums = getArtistAlbums(id);
  if (albums != undefined) {
    return (
      <div>
        <Typography variant="h3">Albums</Typography>
        {albums.items.map((album) => (
          <div key={album.id}>{album.name}</div>
        ))}
      </div>
    );
  }
};

export default ArtistPage;
