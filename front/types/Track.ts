import { Artist } from "./Artist"

export type Track = {
    artists: Artist[], 
    duration_ms: number, 
    explicit: boolean, 
    id: string, 
    name: string, 
    track_number: number, 
}