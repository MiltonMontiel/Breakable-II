"use client";
import styles from "./page.module.css";
import {  getAlbum, getArtist, getUserProfile, getUserTopArtists, search} from "@/utils/api";

export default function Home() {
  const{artist} = getArtist("0TnOYISbd1XYRBk9myaseg");
  const {album} = getAlbum("4aawyAB9vmqN3uQ7FjRGTy");
  const profile = getUserProfile();
  const topArtists = getUserTopArtists();
  const searchResult = search({q: "Aphex T", type: ["album", "artist"]});
  console.log(searchResult)

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <ol>
          User: {profile?.display_name};
        </ol>
        <ol>
          {searchResult?.albums.total}
        </ol>
        <ol>
          <li>Artist: {artist?.name}</li>
          <li>Album: {album?.name}</li>
        </ol>
      {topArtists?.items.map((item) => {
        return(
          <div key={"Artist" + item.id}>
            {item.name}
          </div>
        )
      })}

      </main>
    </div>
  );
}
