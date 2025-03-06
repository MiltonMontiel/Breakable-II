"use client";
import { Box, Button, TextField } from "@mui/material";
import { Divider, Input } from "@mui/joy";
import Grid from "@mui/material/Grid2";
import { Select, Option } from "@mui/joy";
import React, { FC, useState } from "react";
import { SearchParams } from "@/types/SearchParams";
import { useRouter } from "next/navigation";

const SearchBar: FC<any> = () => {
  const router = useRouter();
  const [type, setType] = useState<SearchParams["type"]>([
    "track",
    "album",
    "artist",
  ]);
  const [query, setQuery] = useState<SearchParams["q"]>("");

  return (
    <Box mx={24} mt={4} mb={2} sx={{}}>
      <Grid container spacing={2}>
        <Grid size={6}>
          <Input
            placeholder="Search for something cool..."
            variant="outlined"
            size="lg"
            fullWidth
            onChange={(event) => setQuery(event.target.value)}
            color="success"
            startDecorator={
              <>
                <Select
                  multiple
                  variant="plain"
                  defaultValue={["track", "album", "artist"]}
                  slotProps={{
                    listbox: {
                      variant: "outlined",
                    },
                  }}
                  sx={{ ml: -1.5, "&:hover": { bgcolor: "transparent" } }}
                  onChange={(_event, newValue: string[] | any) =>
                    setType(newValue as any)
                  }
                >
                  <Option value="album">Album</Option>
                  <Option value="artist">Artist</Option>
                  <Option value="track">Track</Option>
                </Select>
                <Divider orientation="vertical" />
              </>
            }
            endDecorator={
              <>
                <Divider orientation="vertical" />
                <Button
                  color="success"
                  sx={{ mr: -1.5, "&:hover": { bgcolor: "transparent" } }}
                  onClick={() => {
                    const encoded = encodeURI(
                      `search?q=${query}&type=${type.join(",")}`
                    );
                    router.push(encoded);
                  }}
                  disabled={query == ""}
                >
                  Search
                </Button>
              </>
            }
          />
        </Grid>
        <Grid size={3}></Grid>
        <Grid size={3}></Grid>
      </Grid>
    </Box>
  );
};

export default SearchBar;
