import React, { ReactElement } from 'react'
import PageFrame from '../components/PageFrame';
import FeaturedEvents from '../components/pages/events/FeaturedEvents';
import Divider from '../components/Divider';
import PastEvents from '../components/pages/events/PastEvents';
import { fetchFeaturedEvents } from '../api/event';
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
    return getPriority(bStart, bEnd) - getPriority(aStart, aEnd);
}

interface Props {
  featuredEvents: Event[];
}

export async function getStaticProps() {
  const featuredEvents = await fetchFeaturedEvents();
  return {
      props: {
        featuredEvents: featuredEvents.sort(sort),
      }
  };
}


export default function events({featuredEvents}: Props): ReactElement {
  return <PageFrame title={'Events'}>
    <FeaturedEvents featuredEvents={featuredEvents}/>

    <Divider double />

    <PastEvents />
  </PageFrame>;
}
