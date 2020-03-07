import React, { ReactElement } from 'react'
import PageFrame from '../components/PageFrame';
import UpcomingEvents from '../components/blocks/UpcomingEvents';
import PastEvents from '../components/blocks/PastEvents';
import Divider from '../components/Divider';
import { reduxPage } from '../config/redux';

function events(): ReactElement {
  return <>
    <PageFrame>
      <UpcomingEvents />

      <div className={'spacer'} />

      <Divider />

      <PastEvents />

      <style jsx>{`
        .spacer {
          height: 2em;
        }  
      `}</style>
    </PageFrame>
  </>;
}

export default reduxPage(events);