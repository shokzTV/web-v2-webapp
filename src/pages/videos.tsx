import React, { ReactElement } from 'react'
import PageFrame from '../components/PageFrame';
import VideoList from '../components/blocks/VideoList';

export default function Videos(): ReactElement {
  return <>
    <PageFrame showSelectedEvent={true}>
        <VideoList />
    </PageFrame>
  </>;
}