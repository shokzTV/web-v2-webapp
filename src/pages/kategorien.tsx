import React, { ReactElement } from 'react'
import PageFrame from '../components/PageFrame';
import TagList from '../components/pages/tags/TagList';
import { Tag } from '../api/@types/Tag';
import { fetchAllTags } from '../api/tag';
import { Event } from '../api/@types/Event';
import { fetchMainEvent } from '../api/event';

export async function getStaticProps() {
  const tags = await fetchAllTags();
  const mainEvent = await fetchMainEvent();
  return {
      props: {
        mainEvent,
        tags
      }
  };
}

export default function tags({mainEvent, tags}: {mainEvent: Event; tags: Tag[]}): ReactElement {
  return <PageFrame title={'Kategorien'} mainEvent={mainEvent}>
    <TagList allTags={tags} />
  </PageFrame>;
}
