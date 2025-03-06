import { Image } from "./Image"

export type UserProfile = {
    country: string, 
    display_name: string, 
    followers: number, 
    images: Image[],
}