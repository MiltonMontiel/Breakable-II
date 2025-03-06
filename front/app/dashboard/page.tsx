"use client";
import {
  getUserTopArtists,
  userIsLogged,
} from "@/utils/api";
import Login from "../login/app";
import DisplayTopArtists from "@/components/DisplayTopArtists";

export default function Dashboard() {
  const isLoggedIn = userIsLogged();
  const topArtist = getUserTopArtists();

  if (!isLoggedIn) {
    return <Login />;
  } else {
    return (
      <div>
        {topArtist != undefined && (
          <DisplayTopArtists artists={topArtist?.items} />
        )}
      </div>
    );
  }
}
