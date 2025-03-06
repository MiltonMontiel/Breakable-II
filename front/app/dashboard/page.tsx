"use client";
import { getArtist, getUserProfile, userIsLogged } from "@/utils/api";
import Login from "../login/app";
import ArtistCard from "@/components/Card";

export default function Dashboard() {
  const isLoggedIn = userIsLogged();
  const artist = getArtist("0TnOYISbd1XYRBk9myaseg");
  const profile = getUserProfile();

  if (!isLoggedIn) {
    return <Login />;
  } else {
    return (
      <div>
        Welcome {profile?.display_name}.
        <div>
          <ArtistCard artist={artist} size={"lg"} />
        </div>
      </div>
    );
  }
}
