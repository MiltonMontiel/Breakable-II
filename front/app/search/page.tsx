"use client";
import { Box, Grid2, Typography } from "@mui/material";
import { SearchResponse } from "@/types/SearchResponse";
import { search } from "@/utils/api";
import { useSearchParams } from "next/navigation";
import {
  Accordion,
  AccordionDetails,
  AccordionGroup,
  AccordionSummary,
  Grid,
} from "@mui/joy";
import ArtistCard, { AlbumCard } from "@/components/Card";

export default function Search() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q");
  const type = searchParams.get("type");
  const response: SearchResponse | undefined = search({
    q: q as any,
    type: type as any,
  });

  if (response != undefined) {
    return (
      <Box sx={{ mx: 24, my: 4 }}>
        <Typography variant="h1">Results</Typography>
        <AccordionGroup>
          {response.tracks != undefined && (
            <Accordion>
              <AccordionSummary>
                <Typography variant="h3">Tracks</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid2 container spacing={2}>
                  {response.tracks.items.map((track) => (
                    <Grid2 size={3} key={track.id}>
                    <AlbumCard customTitle={`${track.name} - ${track.artists[0].name}`} album={track.album} variant={track.album.album_type} />
                    </Grid2>
                  ))}
                </Grid2>
              </AccordionDetails>
            </Accordion>
          )}
          {response.artists != undefined && (
            <Accordion>
              <AccordionSummary>
                <Typography variant="h3">Artists</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid2 container spacing={2}>
                  {response.artists.items.map((artist) => (
                    <Grid2 size={3} key={artist.id}>
                      <ArtistCard artist={artist} size="lg"/>
                    </Grid2>
                  ))}
                </Grid2>
              </AccordionDetails>
            </Accordion>
          )}
          {response.albums != undefined && (
            <Accordion>
              <AccordionSummary>
                <Typography variant="h3">Albums</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid2 container spacing={2}>
                  {response.albums.items.map((album) => (
                    <Grid2 size={3} key={album.id}>
                      <AlbumCard album={album} variant={album.album_type}/>
                    </Grid2>
                  ))}
                </Grid2>
              </AccordionDetails>
            </Accordion>
          )}
        </AccordionGroup>
      </Box>
    );
  }
}
