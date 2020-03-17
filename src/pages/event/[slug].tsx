import React, { ReactElement } from 'react';
import PageFrame from '../../components/PageFrame';
import SingleEventView from '../../components/pages/events/SingleEventView';
import { Event } from '../../api/@types/Event';
import { fetchEvent, fetchAllEventSlugs } from '../../api/event';

export async function getStaticProps({params}) {
    const event = await fetchEvent(params.slug);
    return {
        props: {
            event
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

export default function event({event}: {event: Event}): ReactElement {
    return <PageFrame title={event && event.name}>
        <SingleEventView event={event} />
    </PageFrame>;
}
