import React, { ReactElement } from 'react'
import PageFrame from '../components/PageFrame';
import VideoList from '../components/pages/video/VideoList';
import { fetchVideoIds, fetchVideos } from '../api/video';
import { Video } from '../api/@types/Video';
import { fetchMainEvent } from '../api/event';
import { Event } from '../api/@types/Event';

const pageSize = 12;
export async function getStaticProps() {
  const videoIds = await fetchVideoIds();
  const videos = await fetchVideos(videoIds.slice(0, pageSize));
  const mainEvent = await fetchMainEvent();

  return {
    props: {
      mainEvent,
      videoIds,
      videos
    }
  }
}

export default function videos({mainEvent, videoIds, videos}: {mainEvent: Event; videoIds: number[]; videos: Video[]}): ReactElement {
  return <PageFrame title={'Videos'} mainEvent={mainEvent}>
    <VideoList videoIds={videoIds} videos={videos} />
  </PageFrame>;
}
