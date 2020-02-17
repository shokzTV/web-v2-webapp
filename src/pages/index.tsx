import React, { ReactElement } from 'react'
import PageFrame from '../Components/PageFrame';
import LastNewsEntries from '../Components/Blocks/LastNewsEntries';

export default function index(): ReactElement {
  return <>
    <PageFrame showSelectedEvent={true}>
      <LastNewsEntries />
    </PageFrame>
  </>;
}