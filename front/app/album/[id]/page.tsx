"use client"
import AlbumPage from "@/components/AlbumPage";
import { getAlbum } from "@/utils/api";
import { use } from "react";

export default function Artist({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const p = use(params);
  const album = getAlbum(p.id);

  if (album != undefined) {
    return (
    <AlbumPage album={album} />
    )
  }
}