import { get } from "./request";
import { Event } from './@types/Event';

export async function fetchMainEvent(): Promise<Event> {
    return await get<Event>('/event/main');
}