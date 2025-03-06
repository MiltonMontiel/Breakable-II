"use client";
import ArtistPage from "@/components/ArtistPage";
import { getArtist } from "@/utils/api";
import { use } from "react";

export default function Artist({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const p = use(params);
  const artist = getArtist(p.id);

  if (artist != undefined) {
    return <ArtistPage artist={artist} />;
  }
}
