import React, { ReactElement } from 'react';
import PageFrame from '../../components/PageFrame';
import SingleEventView from '../../components/pages/events/SingleEventView';
import { Event } from '../../api/@types/Event';
import { fetchEvent, fetchAllEventSlugs, fetchMainEvent } from '../../api/event';
import { getImageUrl } from '../../config/image';
import Share from '../../components/block/Share';

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
    const tag = event && event.tags[0];
    return <PageFrame title={event && event.name} mainEvent={mainEvent} ogTitle={event && event.name} ogDescription={event && event.descriptionShort.length > 0 ? event.descriptionShort : null} ogImage={getImageUrl(tag && tag.image)}>
        <SingleEventView event={event} />
        
        <Share url={`https://dota2.shokz.tv/event/${event && event.slug}`} title={event && event.name} text={event && event.descriptionShort} />
    </PageFrame>;
}
