import { get } from "./request";
import { Tag } from './@types/Tag';
import { Video } from "./@types/Video";
import { Event } from "./@types/Event";
import { Article } from "./@types/Article";

export async function fetchAllTags(): Promise<Tag[]> {
    return await get<Tag[]>(`/tag/list`);
}

export async function fetchAllTagIds(): Promise<number[]> {
    const tags = await fetchAllTags();
    return tags.map(({id}) => id);
}

export async function fetchLatestTags(): Promise<Tag[]> {
    return await get<Tag[]>('/tag/recent');
}

export async function fetchTag(tagId: number): Promise<Tag> {
    return await get<Tag>(`/tag/info/${tagId}`);
}

interface Relations {
    event: Event[];
    articles: Article[];
    videos: Video[];
}

export async function fetchTagRelations(tagId: number): Promise<Relations> {
    return await get<Relations>(`/tag/relations/${tagId}`);
}