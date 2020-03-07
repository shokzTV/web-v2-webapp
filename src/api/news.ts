import { get } from "./request";
import { News } from "./@types/News";

export async function fetchRecentNews(): Promise<News[]> {
    return await get<News[]>('/news/latest');
}