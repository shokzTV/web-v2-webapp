import { Video } from "./@types/Video";
import { get } from "./request";

export async function fetchLatestVideos(): Promise<Video[]> {
    return await get<Video[]>('/video/latest');
}

export async function fetchVideoIds(): Promise<number[]> {
    return await get<number[]>('/video/ids');
}

export async function fetchVideos(ids: number[] = []): Promise<Video[]> {
    return await get<Video[]>(`/video/list?ids[]=${ids.join('&ids[]=')}`);
}