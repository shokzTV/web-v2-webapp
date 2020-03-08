import { get } from "./request";
import { Tag } from './@types/Tag';

export async function fetchLatestTags(): Promise<Tag[]> {
    return await get<Tag[]>('/tag/recent');
}