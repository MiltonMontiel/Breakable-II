import { Album } from "./Album"
import { Artist } from "./Artist"

export type Track = {
    artists: Artist[], 
    album: Album, 
    duration_ms: number, 
    explicit: boolean, 
    id: string, 
    name: string, 
    track_number: number, 
    external_urls: {
        spotify: string
    }
}