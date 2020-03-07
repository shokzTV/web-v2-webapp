import { ReactElement, useState, useEffect, useMemo } from "react";
import Header from "../../Header";
import { fetchFeaturedEvents } from "../../../api/event";
import { Event } from '../../../api/@types/Event';
import dayjs from 'dayjs';
import Row from "./FeaturedEvents/Row";

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
    return getPriority(bStart, bEnd) - getPriority(aStart, aEnd);
}

export default function FeaturedEvents(): ReactElement {
    const [featured, setFeatured] = useState<Partial<Event>[] | null>(null);

    useEffect(() => {
        const loadEvent = async () => setFeatured(await fetchFeaturedEvents());
        loadEvent();
    }, []);

    const list = useMemo<Partial<Event>[]>(() => {
        if(featured) {
            return featured.sort(sort);
        }
        return [{id:0}, {id:0}, {id:0}, {id:0}, {id:0}];
    }, [featured]);

    return <>
        <Header title={'EVENTKALENDER'} link={'ALLE EVENTS ANZEIGEN'} linkTarget={'/events'} />
        {list.map((event, index) => <Row key={event.id + '-' + index} event={event.id !== 0 ? event as Event : null} />)}
    </>;
}
