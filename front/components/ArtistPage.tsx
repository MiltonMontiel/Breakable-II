import { Artist } from "@/types/Artist";
import { getArtistAlbums } from "@/utils/api";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import { AlbumCard } from "./Card";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";

const ArtistPage: FC<{ artist: Artist }> = ({ artist }) => {
  return (
    <Box mx={24} my={4}>
      <Typography variant="h1">{artist.name}</Typography>
      <AlbumsSection id={artist.id} />
    </Box>
  );
};

const AlbumsSection: FC<{ id: string }> = ({ id }) => {
  const albums = getArtistAlbums(id);
  if (albums != undefined) {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, }}>
        {albums.items.filter((album) => album.album_type == "album").length >
          0 && (
          <>
            <Typography variant="h3">Albums</Typography>
            <Grid container spacing={2} sx={{ flexGrow: 1 }}>
              {albums.items
                .filter((album) => album.album_type == "album")
                .map((album) => (
                  <Grid size={4} key={album.id}>
                    <AlbumCard album={album} variant="album" />
                  </Grid>
                ))}
            </Grid>
          </>
        )}
        {albums.items.filter((album) => album.album_type == "single").length >
          0 && (
          <>
            <Typography variant="h3">Singles</Typography>
            <Grid container spacing={2} sx={{ flexGrow: 1 }}>
              {albums.items
                .filter((album) => album.album_type == "single")
                .map((album) => (
                  <Grid size={3} key={album.id}>
                    <AlbumCard album={album} variant="single"/>
                  </Grid>
                ))}
            </Grid>
          </>
        )}
      </Box>
    );
  }
};

export default ArtistPage;
