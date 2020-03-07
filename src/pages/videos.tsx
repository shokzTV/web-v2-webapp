import React, { ReactElement } from 'react'
import PageFrame from '../components/PageFrame';
import VideoList from '../components/blocks/VideoList';
import { reduxPage } from '../config/redux';

function videos(): ReactElement {
  return <>
    <PageFrame>
        <VideoList />
    </PageFrame>
  </>;
}

export default reduxPage(videos);