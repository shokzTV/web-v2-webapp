import React, { ReactElement, useState, useEffect } from 'react';
import PageFrame from '../../components/PageFrame';
import SingleEventView from '../../components/pages/events/SingleEventView';
import { useRouter } from 'next/router';
import { Event } from '../../api/@types/Event';
import { fetchEvent } from '../../api/event';

export default function event(): ReactElement {
    const router = useRouter();
    const eventId = +router.query.eventId;
    const [event, setEvent] = useState<Event | null>(null);

    useEffect(() => {
        const load = async () => setEvent(await fetchEvent(eventId));
        if(!event && eventId) {
            load();
        }
    }, [eventId]);
    
    return <PageFrame title={event && event.name}>
        <SingleEventView event={event} />
    </PageFrame>;
}
