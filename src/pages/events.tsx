import React, { ReactElement } from 'react'
import PageFrame from '../components/PageFrame';
import FeaturedEvents from '../components/pages/events/FeaturedEvents';
import Divider from '../components/Divider';
import PastEvents from '../components/pages/events/PastEvents';
import { fetchFeaturedEvents, fetchPastEventSlugs, fetchEventsBySlugs, fetchMainEvent } from '../api/event';
import { Event } from '../api/@types/Event';
import dayjs from 'dayjs';

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

interface Props {
  featuredEvents: Event[];
  mainEvent: Event;
  slugs: string[];
  pastEvents: Event[];
}

const pageSize = 10;
export async function getStaticProps() {
  const featuredEvents = await fetchFeaturedEvents();
  const slugs = await fetchPastEventSlugs();
  const pastEvents = await fetchEventsBySlugs(slugs.slice(0, pageSize));
  const mainEvent = await fetchMainEvent();
  return {
      props: {
        featuredEvents: featuredEvents.sort(sort),
        mainEvent,
        slugs,
        pastEvents,
      }
  };
}


export default function events({featuredEvents, mainEvent, slugs, pastEvents}: Props): ReactElement {
  return <PageFrame title={'Events'} mainEvent={mainEvent}>
    <FeaturedEvents featuredEvents={featuredEvents}/>

    <Divider double />

    <PastEvents slugs={slugs} pastEvents={pastEvents} />
  </PageFrame>;
}
