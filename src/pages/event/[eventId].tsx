import React, { ReactElement } from 'react';
import PageFrame from '../../components/PageFrame';
import SingleEventView from '../../components/pages/events/SingleEventView';
import { Event } from '../../api/@types/Event';
import { fetchEvent, fetchAllEventIds } from '../../api/event';

export async function getStaticProps({params}) {
    const event = await fetchEvent(params.eventId);
    return {
        props: {
            event
        }
    };
}

export async function getStaticPaths() {
    const eventIds = await fetchAllEventIds();
    return {
      paths: eventIds.map(String).map((eventId) => ({ params: { eventId } })),
      fallback: true,
    };
}

export default function event({event}: {event: Event}): ReactElement {
    return <PageFrame title={event && event.name}>
        <SingleEventView event={event} />
    </PageFrame>;
}
