import { get } from "./request";
import { Event } from './@types/Event';
import { Video } from "./@types/Video";

export async function fetchMainEvent(): Promise<Event> {
    return await get<Event>('/event/main');
}

export async function fetchFeaturedEvents(): Promise<Event[]> {
    return await get<Event[]>('/event/featured');
}

export async function fetchPastEventIds(): Promise<number[]> {
    return await get<number[]>('/event/pastIds');
}

export async function fetchEventsById(ids: number[] = []): Promise<Event[]> {
    return await get<Event[]>(`/event/byId?ids[]=${ids.join('&ids[]=')}`);
}

export async function fetchEvent(id: number): Promise<Event> {
    return (await fetchEventsById([id]))[0];
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

export async function fetchAllEventIds(): Promise<number[]> {
    const pastIds = await fetchPastEventIds();
    const featuredEvents = await fetchFeaturedEvents();
    const featuredEventIds = featuredEvents.map(({id}) => id);
    return pastIds.concat(featuredEventIds);
}