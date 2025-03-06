import { Album } from "@/types/Album";
import { Artist } from "@/types/Artist";
import Typography from "@mui/material/Typography";
import { FC } from "react";

const ArtistPage: FC<{ artist: Artist }> = ({ artist }) => {
  return (
    <div>
      <Typography variant="h1">{artist.name}</Typography>
    </div>
  );
};

const AlbumsSection: FC<{albums: Album[]}> = ({albums}) => {
    return(
        <div>
            <Typography variant="h3"> 
                Albums
            </Typography>
        </div>
    )
}

export default ArtistPage;
