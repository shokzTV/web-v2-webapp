import { get } from "./request";
import { Event } from './@types/Event';

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