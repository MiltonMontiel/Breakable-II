import { Album } from "@/types/Album";
import { Artist } from "@/types/Artist";
import { SearchParams } from "@/types/SearchParams";
import { SearchResponse } from "@/types/SearchResponse";
import { TopItems } from "@/types/TopItems";
import { UserProfile } from "@/types/UserProfile";
import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export const AxiosInstance = axios.create({
  baseURL: "http://localhost:8080",
});

export const useAccessToken = () => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      AxiosInstance.get("/login")
        .then((res: any) => {
          console.log("Here");
          console.log(res.data);
          setToken(res.data);
        })
        .catch((error: any) => {
          console.error(error);
        });
    };

    fetchData();
  }, []);

  return { token };
};

export const getArtist = (id: String) => {
  const [artist, setArtist] = useState<Artist>();

  console.log("Fetching artist " + id);

  useEffect(() => {
    fetchData(`/artists/${id}`, setArtist, undefined);
  }, []);

  console.log(artist);

  return { artist };
};

export const getAlbum = (id: String) => {
  const [album, setAlbum] = useState<Album>();

  console.log("Fetching album " + id);

  useEffect(() => {
    fetchData(`/albums/${id}`, setAlbum, undefined);
  }, []);

  return { album };
};

export const getUserProfile = () => {
  const [profile, setProfile] = useState<UserProfile>();

  console.log("Fetching user profile");

  useEffect(() => {
    fetchData("/profile", setProfile, undefined);
  }, []);
  return profile;
};

export const getUserTopArtists = () => {
  const [artists, setArtists] = useState<TopItems<Artist>>();

  console.log("Fetching top artists");

  useEffect(() => {
    fetchData("/me/top/artist", setArtists, undefined);
  }, []);

  return artists;
};

export const search = (searchParams: SearchParams) => {
  const [response, setReponse] = useState<SearchResponse>();

  console.log("Featching search of " + searchParams.q + searchParams.type);

  useEffect(() => {
    fetchData("/search", setReponse, {
      q: searchParams.q,
      type: searchParams.type.join(","),
    });
  }, []);

  return response;
};

const fetchData = async <T>(
  route: string,
  setter: Dispatch<SetStateAction<T | undefined>>,
  queryParams: any | undefined
) => {
  AxiosInstance.get(route, {
    params: queryParams,
  })
    .then((res: any) => {
      setter(res.data);
    })
    .catch((error: any) => {
      console.error(error);
    });
};
