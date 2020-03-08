import React, { ReactElement } from 'react'
import PageFrame from '../components/PageFrame';
import FeaturedEvents from '../components/pages/events/FeaturedEvents';
import Divider from '../components/Divider';
import PastEvents from '../components/pages/events/PastEvents';

export default function events(): ReactElement {
  return <PageFrame>
    <FeaturedEvents />

    <Divider double />

    <PastEvents />
  </PageFrame>;
}