export type SearchParams = {
    q: string, 
    type: ("album" | "artist" | "playlist" | "track" | "show" | "episode" | "audiobook")[]
}