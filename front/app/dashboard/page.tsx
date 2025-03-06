"use client";
import {
  getArtist,
  getUserProfile,
  getUserTopArtists,
  userIsLogged,
} from "@/utils/api";
import Login from "../login/app";
import ArtistCard from "@/components/Card";
import DisplayTopArtists from "@/components/DisplayTopArtists";

export default function Dashboard() {
  const isLoggedIn = userIsLogged();
  const artist = getArtist("0TnOYISbd1XYRBk9myaseg");
  const profile = getUserProfile();
  const topArtist = getUserTopArtists();

  if (!isLoggedIn) {
    return <Login />;
  } else {
    return (
      <div>
        Welcome {profile?.display_name}.
        {topArtist != undefined && (
          <DisplayTopArtists artists={topArtist?.items} />
        )}
      </div>
    );
  }
}
