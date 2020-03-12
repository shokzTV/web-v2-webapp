import { get } from "./request";
import { Tag } from './@types/Tag';
import { Video } from "./@types/Video";
import { Event } from "./@types/Event";


export async function fetchAllTags(): Promise<Tag[]> {
    return await get<Tag[]>(`/tag/list`);
}

export async function fetchLatestTags(): Promise<Tag[]> {
    return await get<Tag[]>('/tag/recent');
}

export async function fetchTag(tagId: number): Promise<Tag> {
    return await get<Tag>(`/tag/info/${tagId}`);
}

interface Relations {
    event: Event[];
    articles: Array<{
        id: number;
        title: string;
        cover: string;
        coverWEBP: string;
        coverJP2: string;
    }>;
    videos: Video[];
}

export async function fetchTagRelations(tagId: number): Promise<Relations> {
    return await get<Relations>(`/tag/relations/${tagId}`);
}