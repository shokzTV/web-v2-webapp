import { Video } from "./@types/Video";
import { get } from "./request";

export async function fetchLatestVideos(): Promise<Video[]> {
    return await get<Video[]>('/video/latest');
}