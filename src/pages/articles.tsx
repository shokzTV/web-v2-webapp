import React, { ReactElement } from 'react';
import PageFrame from '../components/PageFrame';
import ArticleList from '../components/blocks/ArticleList';

export default function Home(): ReactElement {
  return <PageFrame>
    <ArticleList />´
  </PageFrame>;
}