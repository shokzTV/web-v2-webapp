import dayjs from 'dayjs';
import { Event } from '../api/@types/Event';
import { useState, useEffect, useMemo } from 'react';
import { fetchFeaturedEvents } from '../api/event';

function getPriority(start: number, end: number): number {
    const currentTs = dayjs().unix();

    if(currentTs > end) {
        return 0;
    } else if(currentTs < start) {
        return 1;
    } 

    return 2;
}

function sort({start: aStart, end: aEnd}: Event, {start: bStart, end: bEnd}: Event): number {
    return getPriority(bStart, bEnd) - getPriority(aStart, aEnd) || aStart - bStart;;
}

export function loadFeaturedEvents(): Partial<Event>[] {
    const [featured, setFeatured] = useState<Partial<Event>[] | null>(null);

    useEffect(() => {
        const loadEvent = async () => setFeatured(await fetchFeaturedEvents());
        loadEvent();
    }, []);

    return useMemo<Partial<Event>[]>(() => {
        if(featured) {
            return featured.sort(sort);
        }
        return [{id:0}, {id:0}, {id:0}, {id:0}, {id:0}];
    }, [featured]);
}