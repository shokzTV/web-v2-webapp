import { get } from "./request";
import { Tag } from './@types/Tag';
import { Video } from "./@types/Video";
import { Event } from "./@types/Event";
import { Article } from "./@types/Article";

export async function fetchAllTags(): Promise<Tag[]> {
    return await get<Tag[]>(`/tag/list`);
}

export async function fetchAllTagSlugs(): Promise<string[]> {
    const tags = await fetchAllTags();
    return tags.map(({slug}) => slug);
}

export async function fetchLatestTags(): Promise<Tag[]> {
    return await get<Tag[]>('/tag/recent');
}

export async function fetchTag(slug: string): Promise<Tag> {
    return await get<Tag>(`/tag/bySlug/${slug}`);
}

interface Relations {
    event: Event[];
    articles: Article[];
    videos: Video[];
}

export async function fetchTagRelations(tagId: number): Promise<Relations> {
    return await get<Relations>(`/tag/relations/${tagId}`);
}