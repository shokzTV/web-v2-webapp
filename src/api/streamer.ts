import { Streamer } from "./@types/Streamer";
import { get } from "./request";

export async function fetchOnlineStreamer(): Promise<Streamer[]> {
    return await get<Streamer[]>(`/streamer/online`);
}