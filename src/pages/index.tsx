import React, { ReactElement } from 'react'
import PageFrame from './../components/PageFrame';
import LastNewsEntries from './../components/blocks/LastNewsEntries';

export default function index(): ReactElement {
  return <>
    <PageFrame showSelectedEvent={true}>
      <LastNewsEntries />
    </PageFrame>
  </>;
}