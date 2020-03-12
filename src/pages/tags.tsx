import React, { ReactElement } from 'react'
import PageFrame from '../components/PageFrame';
import TagList from '../components/pages/tags/TagList';

export default function tags(): ReactElement {
  return <PageFrame>
    <TagList />
  </PageFrame>;
}