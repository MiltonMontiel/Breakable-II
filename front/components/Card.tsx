import { Artist } from "@/types/Artist";
import { FC } from "react";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import Box from "@mui/joy/Box";
import AspectRatio from "@mui/joy/AspectRatio";
import { Button, Chip, Typography } from "@mui/material";
import { InsightsOutlined, HeadphonesOutlined } from "@mui/icons-material";
import Image from "next/image";

const ArtistCard: FC<{ artist: Artist | undefined; size: "sm" | "lg" }> = ({
  artist,
  size,
}) => {
  console.log(artist);
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
                "linear-gradient(180deg, transparent 62%, rgba(0,0,0,0.00345888) 63.94%, rgba(0,0,0,0.014204) 65.89%, rgba(0,0,0,0.0326639) 67.83%, rgba(0,0,0,0.0589645) 69.78%, rgba(0,0,0,0.0927099) 71.72%, rgba(0,0,0,0.132754) 73.67%, rgba(0,0,0,0.177076) 75.61%, rgba(0,0,0,0.222924) 77.56%, rgba(0,0,0,0.267246) 79.5%, rgba(0,0,0,0.30729) 81.44%, rgba(0,0,0,0.341035) 83.39%, rgba(0,0,0,0.367336) 85.33%, rgba(0,0,0,0.385796) 87.28%, rgba(0,0,0,0.396541) 89.22%, rgba(0,0,0,0.4) 91.17%)",
            }}
          >
            <div>
              <Box
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column", 
                  alignItems: "center",
                  gap: 1.5,
                  flexGrow: 1,
                  alignSelf: "flex-end",
                color: "white"
                }}
              >
                <Button color="success">
                <Typography variant="h6" noWrap>Listen</Typography>
                </Button>
          <Box sx={{display: "flex", gap: 1}}>
            <Chip
              label={`${artist?.popularity}/100`}
              sx={{ p: 0.6 }}
              icon={<InsightsOutlined /> }
              color="warning"
            />
            <Chip
              label={`${((artist?.followers.total as number) / 1000000).toFixed(
                2
              )} M`}
              icon={<HeadphonesOutlined/>}
              color="success"
              variant="filled"
              sx={{ p: 0.6 }}
            />
          </Box>
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
        >
          <Box>
            <Typography variant="h5">{artist?.name}</Typography>
          </Box>
        </Box>
      </Card>
    );
  }
};

export default ArtistCard;
