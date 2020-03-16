import React, { ReactElement } from 'react'
import PageFrame from '../components/PageFrame';
import VideoList from '../components/pages/video/VideoList';
import { fetchVideoIds, fetchVideos } from '../api/video';
import { Video } from '../api/@types/Video';

const pageSize = 12;
export async function getStaticProps() {
  const videoIds = await fetchVideoIds();
  const videos = await fetchVideos(videoIds.slice(0, pageSize));

  return {
    props: {
      videoIds,
      videos
    }
  }
}

export default function videos({videoIds, videos}: {videoIds: number[]; videos: Video[]}): ReactElement {
  return <PageFrame title={'Videos'}>
    <VideoList videoIds={videoIds} videos={videos} />
  </PageFrame>;
}
