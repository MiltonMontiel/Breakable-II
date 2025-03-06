import { Album } from "@/types/Album";
import { FC } from "react";
import Typography from "@mui/material/Typography";
import { Box, Chip, Grid2 } from "@mui/material";
import AspectRatio from "@mui/joy/AspectRatio";
import Image from "next/image";

const AlbumPage: FC<{ album: Album }> = ({ album }) => {
  const releaseDate = new Date(album.release_date);
  return (
    <Box my={4}>
      <Box mx={24} my={4} >

      <Typography variant="h1" >
        {album.name}
      </Typography>
      <Typography variant="h6" color="gray">
        Release date: {releaseDate.toDateString()}
      </Typography>
      <Typography variant="h6" color="gray">
        Label: {album.label}
      </Typography>
      </Box>
      <Grid2 container spacing={4} px={24}>
        <Grid2 size={6} sx={{}}>
          {album.tracks.items
            .sort((a, b) => a.track_number - b.track_number)
            .map((track) => (
              <Box sx={{display: "flex", alignContent: "center", justifyContent: "space-between", alignItems: "center"}} key={track.id}>

              <Typography variant="body1" p={1} >
                <b>{track.track_number}.- </b>
                {track.name}{" "}
                
              </Typography>

                {track.explicit ? (
                  <Chip label="explicit" color="error" size="small" />
                ) : null}

              </Box>
            ))}
        </Grid2>
        <Grid2 size={4}>
          <Box sx={{}}>
            {/* <AspectRatio
              ratio={"4/3"}
              sx={{
                display: "flex",
                alignContent: "center",
                justifyContent: "center",
              }}
            > */}
              {album?.images != undefined && (
                <Image
                  src={album?.images[0].url}
                  alt={"test"}
                  height={album?.images[0].height}
                  width={album?.images[0].width}
                />
              )}
            {/* </AspectRatio> */}
          </Box>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default AlbumPage;
