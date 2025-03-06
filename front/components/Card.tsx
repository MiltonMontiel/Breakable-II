import { Artist } from "@/types/Artist";
import { FC } from "react";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import Box from "@mui/joy/Box";
import AspectRatio from "@mui/joy/AspectRatio";
import { Button, Chip, Typography } from "@mui/material";
import {
  InsightsOutlined,
  HeadphonesOutlined,
  ArrowOutward,
} from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import { Album } from "@/types/Album";

const ArtistCard: FC<{ artist: Artist | undefined; size: "sm" | "lg" }> = ({
  artist,
  size,
}) => {
  if (size == "lg") {
    return (
      <Card variant="plain" sx={{ width: "%100", bgcolor: "initial", p: 0 }}>
        <Box sx={{ position: "relative" }}>
          <AspectRatio ratio={"4/3"}>
            {artist?.images != undefined && (
              <Image
                src={artist?.images[0].url}
                alt={"test"}
                height={artist?.images[0].height}
                width={artist?.images[0].width}
              />
            )}
          </AspectRatio>
          <CardCover
            className="gradient-cover"
            sx={{
              "&:hover, &:focus-within": {
                opacity: 1,
              },
              opacity: 0,
              transition: "0.1s ease-in",
              background:
                "linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(32,32,32,0.9346113445378151) 48%, rgba(0,0,0,0.7973564425770308) 100%)",
            }}
          >
            <div>
              <Box
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                  justifyContent: "center",
                  gap: 1.5,
                  flexGrow: 1,
                  alignSelf: "flex-end",
                  color: "white",
                }}
              >
                <Link href={`/artist/${artist?.id}`}>
                  <Button
                    variant="contained"
                    sx={{ color: "black", background: "#1ED760" }}
                    endIcon={<ArrowOutward />}
                  >
                    <Typography variant="subtitle1" noWrap>
                      Go to artist
                    </Typography>
                  </Button>
                </Link>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Chip
                    label={`${artist?.popularity}/100`}
                    sx={{ p: 0.6 }}
                    icon={<InsightsOutlined />}
                    color="warning"
                    variant="outlined"
                  />
                  <Chip
                    label={`${(
                      (artist?.followers.total as number) / 1000000
                    ).toFixed(2)} M`}
                    icon={<HeadphonesOutlined />}
                    color="error"
                    variant="outlined"
                    sx={{ p: 0.6 }}
                  />
                </Box>
                <Typography variant="h5">{artist?.name}</Typography>
              </Box>
            </div>
          </CardCover>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
            color: "white",
            justifyContent: "space-between",
          }}
        ></Box>
      </Card>
    );
  }
};

export const AlbumCard: FC<{
  customTitle?: string;
  album: Album;
  variant: "album" | "single" | "compilation";
}> = ({ customTitle, album, variant }) => {
  return (
    <Card variant="plain" sx={{ width: "%100", bgcolor: "initial", p: 0 }}>
      <Box sx={{ position: "relative" }}>
        <AspectRatio ratio={"4/3"}>
          {album?.images != undefined && (
            <Image
              src={album?.images[0].url}
              alt={"test"}
              height={album?.images[0].height}
              width={album?.images[0].width}
            />
          )}
        </AspectRatio>
        <CardCover
          className="gradient-cover"
          sx={{
            "&:hover, &:focus-within": {
              opacity: 1,
            },
            opacity: 0,
            transition: "0.1s ease-in",
            background:
              "linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(32,32,32,0.9346113445378151) 48%, rgba(0,0,0,0.7973564425770308) 100%)",
          }}
        >
          <div>
            <Box
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                justifyContent: "center",
                gap: 1.5,
                flexGrow: 1,
                alignSelf: "flex-end",
                color: "white",
              }}
            >
              <Link href={`/album/${album?.id}`}>
                <Button
                  variant="contained"
                  sx={{ color: "black", background: "#1ED760" }}
                  endIcon={<ArrowOutward />}
                >
                  <Typography variant="subtitle1" noWrap>
                    Go to {variant}
                  </Typography>
                </Button>
              </Link>
              {customTitle != null ? (
                <Typography variant="h6">{customTitle}</Typography>
              ) : (
                <Typography variant="h5">{album?.name}</Typography>
              )}
            </Box>
          </div>
        </CardCover>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "center",
          color: "white",
          justifyContent: "space-between",
        }}
      ></Box>
    </Card>
  );
};

export default ArtistCard;
