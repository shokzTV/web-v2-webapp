import React, { ReactElement } from 'react'
import PageFrame from '../components/PageFrame';
import FeaturedEvents from '../components/pages/events/FeaturedEvents';
import Divider from '../components/Divider';
import PastEvents from '../components/pages/events/PastEvents';
import { fetchFeaturedEvents } from '../api/event';
import { Event } from '../api/@types/Event';

interface Props {
  featuredEvents: Event[];
}

export async function getStaticProps() {
  const featuredEvents = await fetchFeaturedEvents();
  return {
      props: {
        featuredEvents,
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
