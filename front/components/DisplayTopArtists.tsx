import { FC } from "react";
import Grid from "@mui/material/Grid2";
import { Artist } from "@/types/Artist";
import ArtistCard from "./Card";
import { Box, Typography } from "@mui/material";

const DisplayTopArtists: FC<{ artists: Artist[] }> = ({ artists }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, px: 24 }}>
      <Typography variant="h3">Your top artists</Typography>
      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        {artists.map((artist) => (
            <Grid size={3} key={artist.id}>
              <ArtistCard artist={artist} size="lg" />
            </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DisplayTopArtists;
