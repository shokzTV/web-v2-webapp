import React, { ReactElement } from 'react';
import PageFrame from '../../components/PageFrame';
import SingleEventView from '../../components/pages/events/SingleEventView';
import { Event } from '../../api/@types/Event';
import { fetchEvent, fetchAllEventSlugs, fetchMainEvent } from '../../api/event';

export async function getStaticProps({params}) {
    const event = await fetchEvent(params.slug);
    const mainEvent = await fetchMainEvent();
    return {
        props: {
            event,
            mainEvent
        }
    };
}

export async function getStaticPaths() {
    const slugs = await fetchAllEventSlugs();
    return {
      paths: slugs.map((slug) => ({ params: { slug } })),
      fallback: true,
    };
}

export default function event({event, mainEvent}: {event: Event; mainEvent: Event}): ReactElement {
    return <PageFrame title={event && event.name} mainEvent={mainEvent}>
        <SingleEventView event={event} />
    </PageFrame>;
}
