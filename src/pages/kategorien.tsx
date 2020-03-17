import React, { ReactElement } from 'react'
import PageFrame from '../components/PageFrame';
import TagList from '../components/pages/tags/TagList';
import { Tag } from '../api/@types/Tag';
import { fetchAllTags } from '../api/tag';

export async function getStaticProps() {
  const tags = await fetchAllTags();
  return {
      props: {
        tags
      }
  };
}

export default function tags({tags}: {tags: Tag[]}): ReactElement {
  return <PageFrame title={'Tags'}>
    <TagList allTags={tags} />
  </PageFrame>;
}
