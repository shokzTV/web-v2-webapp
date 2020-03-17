import { get } from "./request";
import { Event } from './@types/Event';
import { Video } from "./@types/Video";

export async function fetchMainEvent(): Promise<Event> {
    return await get<Event>('/event/main');
}

export async function fetchFeaturedEvents(): Promise<Event[]> {
    return await get<Event[]>('/event/featured');
}

export async function fetchPastEventSlugs(): Promise<string[]> {
    return await get<string[]>('/event/pastSlugs');
}

export async function fetchEventsBySlugs(slugs: string[] = []): Promise<Event[]> {
    return await get<Event[]>(`/event/bySlug?slugs[]=${slugs.join('&slugs[]=')}`);
}

export async function fetchEvent(slug: string): Promise<Event> {
    return (await fetchEventsBySlugs([slug]))[0];
}

interface RelationResponse {
    articles: Array<{
        id: number;
        title: string;
        cover: string;
        coverWEBP: string;
        coverJP2: string;
    }>;
    videos: Video[];
}

export async function fetchEventRelations(id: number): Promise<RelationResponse> {
    return await get<RelationResponse>(`/event/relations/${id}`);
}

export async function fetchAllEventSlugs(): Promise<string[]> {
    const pastIds = await fetchPastEventSlugs();
    const featuredEvents = await fetchFeaturedEvents();
    const featuredEventIds = featuredEvents.map(({slug}) => slug);
    return pastIds.concat(featuredEventIds);
}