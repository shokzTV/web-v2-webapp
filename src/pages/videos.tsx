import React, { ReactElement } from 'react'
import PageFrame from '../components/PageFrame';
import VideoList from '../components/pages/video/VideoList';

export default function videos(): ReactElement {
  return <PageFrame>
    <VideoList />
  </PageFrame>;
}